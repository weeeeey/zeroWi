import { useCallback, useEffect, useReducer } from 'react';

// 상태의 타입을 정의합니다.
interface ExerciseState {
  isResting: boolean;
  exerciseTime: number;
  restTime: number;
}

// 액션 타입과 페이로드 타입을 정의합니다.
type Action =
  | { type: 'start_exercise' }
  | { type: 'start_rest'; payload: { restDuration: number } }
  | { type: 'tick_exercise' }
  | { type: 'tick_rest' }
  | { type: 'end_workout' }
  | { type: 'adjust_rest_time'; payload: { value: number } };

// 초기 상태를 정의합니다. (운동 중으로 시작)
const initialState: ExerciseState = {
  isResting: false,
  exerciseTime: 0,
  restTime: 0,
};

// Reducer 함수
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
      // 휴식 시간이 0 이하가 되면 운동 모드로 전환하고 운동 시간을 0부터 시작
      if (newRestTime <= 0) {
        return {
          ...state,
          isResting: false,
          restTime: 0,
          exerciseTime: 0, // 운동 시간을 0부터 시작
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
      // 새로운 휴식 시간이 0 이하이면 운동 모드로 전환하고 운동 시간을 0부터 시작
      if (newRestTime <= 0) {
        return {
          ...state,
          isResting: false,
          restTime: 0,
          exerciseTime: 0, // 운동 시간을 0부터 시작
        };
      }
      // 그 외의 경우 휴식 시간만 업데이트
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
 * 운동 시간, 휴식 시간을 관리하는 커스텀 훅
 *
 * 로직:
 * - 휴식 시간이 0이 되면 운동 시간이 0부터 시작해서 1초마다 +1
 * - isResting이 true가 되면 휴식 시간이 주어진 value로부터 시작해서 1초마다 -1
 * - 휴식 시간이 0이하가 되면 자동으로 isResting은 false가 되고 운동 시간이 1초마다 1씩 증가
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
      // 휴식 중일 때 - 1초마다 휴식 시간 감소
      timer = setInterval(() => {
        dispatch({ type: 'tick_rest' });
      }, 1000);
    } else {
      // 운동 중일 때 - 1초마다 운동 시간 증가
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
