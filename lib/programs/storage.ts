import { ProgramSortCriteria, ProgramType } from '@/types/program';

import {
  DEFAULT_SORT_CRITERIA,
  DEFAULT_TYPE,
  LOCAL_KEY_PROGRAM_LOCAL_KEY,
  LOCAL_KEY_PROGRAM_SORT_CRITERIA_KEY,
  LOCAL_KEY_PROGRAM_TYPE_KEY,
} from './constant';

export const setConfigToLocalStorage = (type: ProgramType, criteria: ProgramSortCriteria) => {
  const query = {
    [LOCAL_KEY_PROGRAM_TYPE_KEY]: type,
    [LOCAL_KEY_PROGRAM_SORT_CRITERIA_KEY]: criteria,
  };
  window.localStorage.setItem(LOCAL_KEY_PROGRAM_LOCAL_KEY, JSON.stringify(query));
};

export const getConfigFromLocalStorage = () => {
  const jsonData = window.localStorage.getItem(LOCAL_KEY_PROGRAM_LOCAL_KEY);

  if (!jsonData) {
    return {
      type: DEFAULT_TYPE,
      sortCriteria: DEFAULT_SORT_CRITERIA,
    };
  }

  const data = JSON.parse(jsonData);
  return {
    type: data[LOCAL_KEY_PROGRAM_TYPE_KEY],
    sortCriteria: data[LOCAL_KEY_PROGRAM_SORT_CRITERIA_KEY],
  };
};
