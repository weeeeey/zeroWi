import { useEffect, useReducer } from 'react';

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
  | { type: 'adjust_rest_time'; payload: { value: number } }; // 휴식 시간 조절 액션 추가

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
    case 'tick_rest':
      // 휴식 시간이 0이 되면 운동 모드로 전환
      if (state.restTime <= 1) {
        return {
          ...state,
          isResting: false, // 휴식 종료, 운동 시작
          restTime: 0,
        };
      }
      return {
        ...state,
        restTime: state.restTime - 1,
      };
    case 'end_workout':
      return initialState;
    case 'adjust_rest_time': {
      const newRestTime = state.restTime + action.payload.value;
      // 새로운 휴식 시간이 0 이하이면 운동 모드로 전환
      if (newRestTime <= 0) {
        return {
          ...state,
          isResting: false,
          restTime: 0,
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
 */
export const useExerciseTime = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isResting, exerciseTime, restTime } = state;

  const startExercise = () => {
    dispatch({ type: 'start_exercise' });
  };
  const startRest = (restDuration: number) => {
    dispatch({ type: 'start_rest', payload: { restDuration } });
  };
  const endWorkout = () => {
    dispatch({ type: 'end_workout' });
  };

  const adjustRestTime = (value: number) => {
    dispatch({ type: 'adjust_rest_time', payload: { value } });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (!isResting) {
      // 운동 중일 때

      timer = setInterval(() => {
        dispatch({ type: 'tick_exercise' });
      }, 1000);
    } else {
      // 휴식 중일 때
      timer = setInterval(() => {
        dispatch({ type: 'tick_rest' });
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
