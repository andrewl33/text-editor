import { NEW_TEXT, LOCK_TEXT, SHARE_LINK } from '../constants';

export interface NewText {
  type: NEW_TEXT;
}

export interface LockText {
  type: LOCK_TEXT;
}

export interface ShareLink {
  type: SHARE_LINK;
}

export type HeaderAction = NewText | LockText | ShareLink;

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