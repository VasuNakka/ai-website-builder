export interface ProjectTheme {
  primary: string;
  secondary: string;
  accent: string;
  fontSans: string;
  fontDisplay: string;
  mode: 'light' | 'dark';
}

export interface ProjectPage {
  name: string;
  path: string;
  previewHtml: string;
}

export interface ProjectFiles {
  [path: string]: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  prompt: string;
  theme: ProjectTheme;
  currentPage: string;
  pages: ProjectPage[];
  files: ProjectFiles;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface GenerationRequest {
  prompt: string;
}

export interface ChatRequest {
  project: Project;
  message: string;
  history: { role: 'user' | 'assistant'; content: string }[];
}
