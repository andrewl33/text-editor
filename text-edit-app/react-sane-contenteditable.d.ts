import * as React from 'react';

export type TagNameFunc<T> = () => T;
export interface RefObject<T> {
  current: T | null
}
export interface ContentEditableProps {
  content?: string,
  editable?: boolean,
  focus?: boolean,
  maxLength?: number,
  multiLine?: boolean,
  sanitise?: boolean,
  caretPosition?: 'start' | 'end',
  tagName?: string | TagNameFunc<string>, // The element to make contenteditable. Takes an element string ('div', 'span', 'h1') or a styled component
  innerRef?<T>(): RefObject<T>,
  onBlur?(e: React.SyntheticEvent): void,
  onKeyDown?(e: React.SyntheticEvent): void,
  onPaste?(e: React.SyntheticEvent): void,
  onChange?(e: React.SyntheticEvent, s: string): void,
  styled?: boolean
}

// problems with merging types of onChange from React's HTMLDivAttributes
interface DefaultHTMLAttributes {
  accessKey?: string;
  className?: string;
  contentEditable?: boolean;
  contextMenu?: string;
  dir?: string;
  draggable?: boolean;
  hidden?: boolean;
  id?: string;
  lang?: string;
  placeholder?: string;
  slot?: string;
  spellCheck?: boolean;
  style?: React.CSSProperties;
  tabIndex?: number;
  title?: string;
}


declare class ContentEditable extends React.Component<ContentEditableProps & DefaultHTMLAttributes, any> {}

export default ContentEditable;