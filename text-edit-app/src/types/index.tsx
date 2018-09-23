export interface StoreState {
  editor: EditorStoreState;
  router: {
    action: string;
    location: {
      hash: string;
      pathname: string;
      search: string;
    }
  }
}
export interface EditorStoreState {
  codeText: string;
  isLoading: boolean;
  isNewPage: boolean;
  hasAuth: boolean;
  isLocked: boolean;
  isSaved: boolean;
  openAlert: boolean;
  alertMessage: string;
}

export interface EditorProps extends EditorStoreState {
  onBatchUpdate: (codeText: string) => any,
  onCodeChange: () => any,
  onAlert: () => any,
  onLock: () => any,
  onMount: () => any,
  onNew: () => any,
  onShare: () => any,
  pathname: string
}