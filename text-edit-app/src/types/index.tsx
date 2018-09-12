export interface StoreState {
  global: GlobalStoreState;
  editor: EditorStoreState;
}

export interface GlobalStoreState {
  isLoading: boolean;
  isNewPage: boolean;
  url: string;
  hasAuth: boolean;
  isLocked: boolean;
  isSaved: boolean;
}

export interface EditorStoreState {
  codeText: string;
}
