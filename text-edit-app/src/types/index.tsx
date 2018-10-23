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
export interface CollectionStoreState extends CollectionComponentProps {
  openAlert: boolean;
  alertMessage: string;
  collectionPrompt: boolean;
}

export interface CollectionComponentProps {
  items: Item[] | null;
  name: string;
  createDate: string;
  users: string[];
  isLocked: boolean;
}

// Editor
export interface EditorStoreState {
  codeText: string;
  tags: string[];
  isLoading: boolean;
  isNewPage: boolean;
  hasAuth: boolean;
  isLocked: boolean;
  isSaved: boolean;
  openAlert: boolean;
  alertMessage: string;
  filePrompt: boolean;
  name: string;
  createDate: string;
  users: string[];
}

export interface EditorProps extends EditorStoreState {
  onBatchUpdate: (codeText: string) => any;
  onCodeChange: () => any;
  onAlert: () => any;
  onLock: () => any;
  onMount: () => any;
  onNew: () => any;
  onShare: () => any;
  onAuthFile?: () => any;
  onAuthAccount?: () => any;
  onRemoveTag?: (tagName: string) => any;
  onAddTag?: (tagName: string) => any;
  onNameChange: (name: string) => any;
  pathname: string;
  authPrompt: boolean;
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
  collections: Item[] | null;
  files: Item[] | null;
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
  getPassword?: (password: string) => {};
  prompt?: "Login" | "Create Account" | "Private Collection" | "Private File";
}

export interface Item {
  uuid: string;
  name: string;
  tags?: string[];
  date: string;
}

// lists
export interface ListProps {
  header: "Collections" | "Files";
  items: Item[] | null;
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
}
