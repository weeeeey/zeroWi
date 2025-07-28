import { RoutineSortCriteria, RoutineType } from '@/types/routine';

import {
  LOCAL_KEY_ROUTINE_LOCAL_KEY,
  LOCAL_KEY_ROUTINE_SORT_CRITERIA_KEY,
  LOCAL_KEY_ROUTINE_TYPE_KEY,
} from './constant';

export const setConfigToLocalStorage = (type: RoutineType, criteria: RoutineSortCriteria) => {
  const query = {
    [LOCAL_KEY_ROUTINE_TYPE_KEY]: type,
    [LOCAL_KEY_ROUTINE_SORT_CRITERIA_KEY]: criteria,
  };
  window.localStorage.setItem(LOCAL_KEY_ROUTINE_LOCAL_KEY, JSON.stringify(query));
};
export const getConfigFromLocalStorage = () => {
  const jsonData = window.localStorage.getItem(LOCAL_KEY_ROUTINE_LOCAL_KEY);
  if (!jsonData) return null;
  const data = JSON.parse(jsonData);
  return {
    type: data[LOCAL_KEY_ROUTINE_TYPE_KEY],
    sortCriteria: data[LOCAL_KEY_ROUTINE_SORT_CRITERIA_KEY],
  };
};
