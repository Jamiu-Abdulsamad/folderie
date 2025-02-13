export interface FileItem {
  name: string;
  size: string;
  data: File;
  type?: string;
  url?: string;
}

export interface FolderItem {
  id: number;
  name: string;
  files: FileItem[];
  bg?: string;
  // subFolders?: FolderItem[];
}