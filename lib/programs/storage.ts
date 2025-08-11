import { ProgramSortCriteria, ProgramType } from '@/types/program';

import {
  DEFAULT_SORT_CRITERIA,
  DEFAULT_TYPE,
  LOCAL_KEY_PROGRAM_LOCAL_KEY,
  LOCAL_KEY_PROGRAM_SORT_CRITERIA_KEY,
  LOCAL_KEY_PROGRAM_TYPE_KEY,
} from './constant';

/**
 * 프로그램 타입과 정렬 기준을 로컬 스토리지에 저장합니다.
 *
 * @param {ProgramType} type - 저장할 프로그램 타입.
 * @param {ProgramSortCriteria} criteria - 저장할 프로그램 정렬 기준.
 */
export const setConfigToLocalStorage = (type: ProgramType, criteria: ProgramSortCriteria) => {
  const query = {
    [LOCAL_KEY_PROGRAM_TYPE_KEY]: type,
    [LOCAL_KEY_PROGRAM_SORT_CRITERIA_KEY]: criteria,
  };
  window.localStorage.setItem(LOCAL_KEY_PROGRAM_LOCAL_KEY, JSON.stringify(query));
};

/**
 * 로컬 스토리지에서 프로그램 타입과 정렬 기준 설정을 가져옵니다.
 * 저장된 설정이 없으면 기본값을 반환합니다.
 *
 * @returns {{ type: ProgramType; sortCriteria: ProgramSortCriteria }} 로컬 스토리지에서 가져온 설정 또는 기본값.
 */
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