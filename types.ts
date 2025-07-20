import { Chat, GenerateContentResponse } from '@google/genai';

export interface File {
  id: string;
  type: 'file';
  name: string;
  content: string;
}

export interface Folder {
  id:string;
  type: 'folder';
  name: string;
  children: FileSystemNode[];
}

export type FileSystemNode = File | Folder;

export interface Topic {
  title: string;
  content: string;
  prompt: string;
  projectFiles?: any[];
  fileType?: 'html' | 'css' | 'js' | 'ts';
}

export interface Subject {
  name:string;
  topics: Topic[];
}

export interface LearningContent {
  [key: string]: Subject[];
}

export interface AIMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface ChatSession {
  chat: Chat;
  history: AIMessage[];
}

export interface Problem {
  id: string;
  message: string;
  fileType: string;
  explanation: string;
  fixedCode: string;
  status: 'idle' | 'loading-explanation' | 'loading-fix' | 'fixed' | 'error-fixing';
  line?: number;
  severity: 'error' | 'warning' | 'info';
}

export interface Package {
  name: string;
  version: string;
}

export interface PackageChange {
  action: 'add' | 'remove';
  name: string;
  version: string;
}

export interface TerminalExecutionResult {
  stdout: string;
  stderr: string;
  result: string;
  packageChanges?: PackageChange[];
}

export interface TerminalSession {
    id: string;
    title: string;
    output: string;
    history: string;
}

export interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm?: (inputValue?: string) => void;
  onCancel?: () => void;
  promptInput?: boolean;
}

export type EditorAIAction = 'refactor' | 'explain' | 'comment';

export interface EditorToolbarState {
  isOpen: boolean;
  top: number;
  left: number;
  selection: {
    start: number;
    end: number;
  } | null;
}