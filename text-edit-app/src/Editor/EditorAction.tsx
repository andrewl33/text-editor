import { UPDATE_CODE, CHANGED_CODE, NEW_TEXT, LOCK_TEXT, SHARE_LINK} from '../constants';

export interface UpdateCode {
  type: UPDATE_CODE;
}

export interface ChangedCode {
  type: CHANGED_CODE;
}

export interface NewText {
  type: NEW_TEXT;
}

export interface LockText {
  type: LOCK_TEXT;
}

export interface ShareLink {
  type: SHARE_LINK;
}

export type EditorAction = UpdateCode | ChangedCode | NewText | LockText | ShareLink;

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

export const lockText = (): LockText => {
  // nothing yet
  return {
    type: LOCK_TEXT
  }
}

export const newText = (): NewText => {
  return {
    type: NEW_TEXT
  }
}

export const shareLink = (): ShareLink => {
  return {
    type: SHARE_LINK
  }
}
