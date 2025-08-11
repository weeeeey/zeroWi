import { useCallback, useEffect, useReducer } from 'react';

/**
 * 운동 상태를 정의합니다.
 */
interface ExerciseState {
  isResting: boolean; // 현재 휴식 중인지 여부
  exerciseTime: number; // 운동 시간 (초)
  restTime: number; // 휴식 시간 (초)
}

/**
 * 운동 상태 변경을 위한 액션 타입과 페이로드를 정의합니다.
 */
type Action =
  | { type: 'start_exercise' } // 운동 시작 액션
  | { type: 'start_rest'; payload: { restDuration: number } } // 휴식 시작 액션 (휴식 시간 포함)
  | { type: 'tick_exercise' } // 운동 시간 1초 증가 액션
  | { type: 'tick_rest' } // 휴식 시간 1초 감소 액션
  | { type: 'end_workout' } // 운동 종료 액션
  | { type: 'adjust_rest_time'; payload: { value: number } }; // 휴식 시간 조정 액션 (조정 값 포함)

/**
 * 초기 운동 상태입니다.
 */
const initialState: ExerciseState = {
  isResting: false,
  exerciseTime: 0,
  restTime: 0,
};

/**
 * 운동 상태를 관리하는 Reducer 함수입니다.
 * 액션에 따라 상태를 변경합니다.
 *
 * @param {ExerciseState} state - 현재 운동 상태.
 * @param {Action} action - 디스패치된 액션.
 * @returns {ExerciseState} 변경된 새로운 운동 상태.
 */
const reducer = (state: ExerciseState, action: Action): ExerciseState => {
  switch (action.type) {
    case 'start_exercise':
      return {
        ...state,
        isResting: false,
        exerciseTime: 0,
        restTime: 0,
      };
    case 'start_rest':
      return {
        ...state,
        isResting: true,
        restTime: action.payload.restDuration,
      };
    case 'tick_exercise':
      return {
        ...state,
        exerciseTime: state.exerciseTime + 1,
      };
    case 'tick_rest': {
      const newRestTime = state.restTime - 1;
      if (newRestTime <= 0) {
        return {
          ...state,
          isResting: false,
          restTime: 0,
          exerciseTime: 0,
        };
      }
      return {
        ...state,
        restTime: newRestTime,
      };
    }
    case 'end_workout':
      return initialState;
    case 'adjust_rest_time': {
      const newRestTime = state.restTime + action.payload.value;
      if (newRestTime <= 0) {
        return {
          ...state,
          isResting: false,
          restTime: 0,
          exerciseTime: 0,
        };
      }
      return {
        ...state,
        restTime: newRestTime,
      };
    }
    default:
      return state;
  }
};

/**
 * 운동 시간, 휴식 시간을 관리하는 커스텀 훅입니다.
 * 운동 중/휴식 중 상태 전환 및 각 시간의 증가/감소를 처리합니다.
 *
 * 로직:
 * - `isResting`이 `false`일 때: `exerciseTime`이 1초마다 1씩 증가합니다.
 * - `isResting`이 `true`일 때: `restTime`이 1초마다 1씩 감소합니다.
 * - `restTime`이 0 이하가 되면 자동으로 `isResting`은 `false`가 되고 `exerciseTime`은 0부터 다시 시작합니다.
 *
 * @returns {object} 운동 상태 및 제어 함수들을 포함하는 객체.
 * @returns {boolean} return.isResting - 현재 휴식 중인지 여부.
 * @returns {number} return.exerciseTime - 현재 운동 시간 (초).
 * @returns {number} return.restTime - 현재 남은 휴식 시간 (초).
 * @returns {function(): void} return.startExercise - 운동 시간을 0부터 시작하고 운동 모드로 전환합니다.
 * @returns {function(restDuration: number): void} return.startRest - 주어진 시간으로 휴식을 시작하고 휴식 모드로 전환합니다.
 * @returns {function(): void} return.endWorkout - 운동을 종료하고 상태를 초기화합니다.
 * @returns {function(value: number): void} return.adjustRestTime - 휴식 시간을 주어진 값만큼 조정합니다.
 */
export const useExerciseTime = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isResting, exerciseTime, restTime } = state;

  const startExercise = useCallback(() => {
    dispatch({ type: 'start_exercise' });
  }, []);

  const startRest = useCallback((restDuration: number) => {
    dispatch({ type: 'start_rest', payload: { restDuration } });
  }, []);

  const endWorkout = useCallback(() => {
    dispatch({ type: 'end_workout' });
  }, []);

  const adjustRestTime = useCallback((value: number) => {
    dispatch({ type: 'adjust_rest_time', payload: { value } });
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isResting) {
      timer = setInterval(() => {
        dispatch({ type: 'tick_rest' });
      }, 1000);
    } else {
      timer = setInterval(() => {
        dispatch({ type: 'tick_exercise' });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isResting]);

  return {
    isResting,
    exerciseTime,
    restTime,
    startExercise,
    startRest,
    endWorkout,
    adjustRestTime,
  };
};