export interface StoreState {
  authentication: AuthStoreState;
  collection: CollectionStoreState;
  editor: EditorStoreState;
  router: RouterStoreState;
}

/**
 *
 * Connected Components
 *
 */

// authentication
export interface AuthStoreState {
  loggedIn: boolean;
  accountName?: string;
  dashboard?: DashboardProps;
  openAlert: boolean;
  alertMessage?: string;
  authPrompt: boolean;
}

// Collection
export interface CollectionStoreState extends CollectionSharedProps {
  openAlert: boolean;
  alertMessage: string;
  collectionPrompt: boolean;
}

export interface CollectionContainerProps extends CollectionComponentProps {
  collectionPrompt: boolean;
  onMount: () => {};
  authPrompt: boolean;
  onAuthCollection: (password: string) => any;
  onAuthAccount: (accountName: string, password: string) => any;
}

export interface CollectionComponentProps extends CollectionSharedProps {
  onNameChange: (name: string) => {};
  onAddUser: (accountName: string) => any;
  onRemoveUser: (accountName: string) => any;
  onAddFile: (fileId: string) => any;
  onRemoveFile: (fileId: string) => any;
}

export interface CollectionSharedProps {
  items: Item[];
  name: string;
  createDate: string;
  users: string[];
  isLocked: boolean;
}

// Editor
export interface EditorStoreState {
  codeText: string;
  tags: string[];
  // isLoading: boolean;
  isNewPage: boolean;
  isLocked: boolean;
  isSaved: boolean;
  openAlert: boolean;
  alertMessage: string;
  filePrompt: boolean;
  name: string;
  createDate: string;
  users: string[];
}

/**
 * The type definition here is not extended
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/17829
 */
export interface EditorContainerProps
  extends EditorStoreState,
    EditorComponentProps {
  onAlert: () => any;
  onLock: () => any;
  onMount: () => any;
  onNew: () => any;
  onShare: () => any;
  onAuthFile?: () => any;
  onAuthAccount?: () => any;
  onDashboard: () => any;
  onLogInPrompt: () => any;
  onLogOut: () => any;
  onClosePrompt: () => any;
  pathname: string;
  authPrompt: boolean;
}

export interface EditorComponentProps {
  onBatchUpdate: (codeText: string) => any;
  onCodeChange: () => any;
  onRemoveTag?: (tagName: string) => any;
  onAddTag?: (tagName: string) => any;
  onAddUser: (name: string) => any;
  onRemoveUser: (name: string) => any;
  onNameChange: (name: string) => any;
  codeText: string;
  tags: string[];
  // isLoading: boolean;
  name: string;
  createDate: string;
  users: string[];
  isLocked: boolean;
}

// home
export interface HomeProps {
  onNewFile: () => {};
  onNewCollection: () => {};
  onLogin: (name: string, pass: string) => {};
  toDashboard: () => {};
  loggedIn: boolean;
}

// user
export interface UserStoreState extends UserProps {
  dashboard: DashboardProps;
}

export interface UserProps {
  loggedIn: boolean;
  accountName?: string;
}

export interface DashboardProps {
  collections: Item[];
  files: Item[];
  // TODO: Add eventually
  // onAddFile: (fileId: string) => any;
  // onAddCollection: (collectionId: string) => any;
  // onRemoveFile: (fileId: string) => any;
  // onRemoveCollection: (collectionId: string) => any;
}

// router
export interface RouterStoreState {
  action: string;
  location: {
    hash: string;
    pathname: string;
    search: string;
  };
}

/**
 *
 * Helpers
 *
 */

// header
export interface HeaderProps extends PromptComponentProps {
  onNew?: () => {};
  onLock?: () => {};
  onShare?: () => {};
  onAlert: () => {};
  onDashboard?: () => {};
  onLogOut: () => {};
  onLogInPrompt: () => {};
  accountName?: string;
  loggedIn: boolean;
  pathname?: string;
  isShareable?: boolean;
  openAlert: boolean;
  alertMessage?: string;
  pageName: string;
  onPrompt?: boolean;
}

// header/prompts
export interface PromptComponentProps {
  getAccountCredentials?: (accountName: string, password: string) => {};
  onClosePrompt?: () => {};
  getPassword?: (password: string) => {};
  prompt?: "Login" | "Create Account" | "Private Collection" | "Private File";
}

export interface Item {
  id: string;
  name: string;
  tags?: string[];
  date: string;
}

// lists
export interface ListProps {
  header: "Collections" | "Files";
  items: Item[];
  onRemove?: (id: string) => any;
  onAdd?: (id: string) => any;
}

// sidebar
export interface SidebarProps {
  name: string;
  pageType: "file" | "collection";
  tagList?: string[];
  allTagsList?: string[];
  createDate: string;
  isPrivate: boolean;
  users: string[];
  onRemoveTag?: (tagName: string) => any;
  onAddTag?: (tagName: string) => any;
  onNameChange: (name: string) => any;
  onAddUser: (accountName: string) => any;
  onRemoveUser: (accountName: string) => any;
}
