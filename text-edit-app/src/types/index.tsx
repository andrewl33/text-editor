export interface StoreState {
  editor: EditorStoreState;
}
export interface EditorStoreState {
  codeText: string;
  isLoading: boolean;
  isNewPage: boolean;
  url: string;
  hasAuth: boolean;
  isLocked: boolean;
  isSaved: boolean;
}

export interface EditorProps extends EditorStoreState {
  onBatchUpdate: (codeText: string) => any,
  onCodeChange: () => any,
  onLock: () => any,
  onNew: () => any,
  onShare: () => any
}