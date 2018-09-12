import { UPDATE_CODE, CHANGED_CODE } from '../constants';

export interface UpdateCode {
  type: UPDATE_CODE;
}

export interface ChangedCode {
  type: CHANGED_CODE;
}

export type EditorAction = UpdateCode | ChangedCode;

export const updateCode = (): UpdateCode => {
  return {
    type: UPDATE_CODE
  }
}

export const changeCode = (): ChangedCode => {
  return {
    type: CHANGED_CODE
  }
}
