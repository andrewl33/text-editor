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
  token?: string;
  loggedIn: boolean;
  accountName?: string;
  dashboard?: {
    collections: Item[];
    files: Item[];
  };
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
  onFileClick: (fileId: string) => any;
  accountName?: string;
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
  isNewPage: boolean;
  isLocked: boolean;
  isSaved: boolean;
  openAlert: boolean;
  alertMessage: string;
  filePrompt: boolean;
  name: string;
  createDate: string;
  users: string[];
  remountEditorComponent: number;
}

/**
 * The type definition here is not extended
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/17829
 */
export interface EditorContainerProps
  extends EditorStoreState,
    EditorComponentProps {
  onAlert: () => any;
  onLock: (password: string) => Promise<void>;
  onMount: () => any;
  onNew: () => any;
  onShare: () => any;
  onAuthFile?: (pass: string) => Promise<void>;
  onAuthAccount?: (name: string, pass: string) => Promise<void>;
  onDashboard: () => any;
  onLogInPrompt: () => any;
  onLogOut: () => any;
  onClosePrompt: () => any;
  pathname: string;
  authPrompt: boolean;
}

export interface EditorComponentProps {
  onLocalUpdate: (codeText: string) => any;
  onBatchUpdate: () => any;
  onCodeChange: () => any;
  onRemoveTag?: (tagName: string) => any;
  onAddTag?: (tagName: string) => any;
  onAddUser: (name: string) => any;
  onRemoveUser: (name: string) => any;
  onNameChange: (name: string) => any;
  codeText: string;
  tags: string[];
  name: string;
  createDate: string;
  users: string[];
  isLocked: boolean;
  accountName?: string;
}

// home
export interface HomeProps {
  onNewFile: () => {};
  onNewCollection: () => {};
  onLogin: (name: string, pass: string) => {};
  toDashboard: () => {};
  onCreateAccount: (name: string, pass: string) => {};
  loggedIn: boolean;
}

export interface DashboardContainerProps extends DashboardComponentProps {
  authPrompt: boolean;
  onAuthAccount: (name: string, pass: string) => {};
  onMount: () => {};
}

export interface DashboardComponentProps {
  dashboard?: Dashboard;
  onCollectionClick: (id: string) => any;
  onFileClick: (id: string) => any;
}

export interface Dashboard {
  collections: Item[];
  files: Item[];
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
  onLock?: (password: string) => void;
  onShare?: () => {};
  onAlert: () => {};
  onDashboard?: () => {};
  onLogOut: () => {};
  onLogInPrompt: () => {};
  onHomeClick: () => {};
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

export type PromptType =
  | "Login"
  | "Create Account"
  | "Private Collection"
  | "Private File"
  | "Lock";

export interface PromptComponentProps {
  getAccountCredentials?: (accountName: string, password: string) => {};
  onClosePrompt?: () => {};
  getPassword?: (password: string) => {};
  lockItem?: (password: string) => void;
  prompt?: PromptType;
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
  onClickToPage: (id: string) => any;
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
  accountName?: string;
  onRemoveTag?: (tagName: string) => any;
  onAddTag?: (tagName: string) => any;
  onNameChange: (name: string) => any;
  onAddUser: (accountName: string) => any;
  onRemoveUser: (accountName: string) => any;
}
