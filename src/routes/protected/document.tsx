import { Plus, Filter, Home, ChevronRight, ArrowUpNarrowWide, FileImage, FileArchive, FileCode, FileText, File, Download, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { FileItem } from './types';
import Header from '../../components/header';
import vectorImg from '../../components/images/empty.avif'
import FolderCard from './folderCard';

interface FolderItem {
  id: number;
  name: string;
  files: FileItem[];
  bg?: string;
  parentId?: number | null;
  subFolders?: FolderItem[]
}


const Breadcrumb = ({ currentPath, onNavigate }: {
  currentPath: FolderItem[];
  onNavigate: (folder: FolderItem | null) => void;
}) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <button
        onClick={() => onNavigate(null)}
        className="flex items-center hover:text-customBlue"
      >
        <Home size={16} />
      </button>
      {currentPath.map((folder) => (
        <React.Fragment key={folder.id}>
          <ChevronRight size={16} className="text-gray-400" />
          <button
            onClick={() => onNavigate(folder)}
            className="hover:text-customBlue"
          >
            {folder.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};


const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  switch (extension) {
    case 'pdf':
      return <File className="text-customBlue" size={16} />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return <FileImage className="text-blue-500" size={16} />;
    case 'zip':
    case 'rar':
    case '7z':
      return <FileArchive className="text-yellow-500" size={16} />;
    case 'js':
    case 'ts':
    case 'html':
    case 'css':
    case 'py':
    case 'java':
      return <FileCode className="text-green-500" size={16} />;
    default:
      return <FileText className="text-gray-500" size={16} />;
  }
};


const FileCard = ({ file, onDelete, index }: { file: FileItem; onDelete: (index: number) => void; index: number }) => (
  <div
    className="relative w-[200px] cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md"
    onClick={() => window.open(URL.createObjectURL(file.data), '_blank')}
  >
    <div className="flex flex-col items-center gap-2">
      {getFileIcon(file.name)}
      <div className="w-full text-center">
        <h3 className="truncate text-sm font-medium text-gray-800">{file.name}</h3>
        <p className="mt-1 text-xs text-gray-500">{file.size}</p>
      </div>
    </div>
    <div className="mt-3 flex justify-center gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          const url = URL.createObjectURL(file.data);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }}
        className="rounded p-1 text-gray-600 hover:bg-gray-100"
        title="Download"
      >
        <Download size={16} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(index);
        }}
        className="rounded p-1 text-red-500 hover:bg-gray-100"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

export default function Dashboard() {
  const [Folders, setFolders] = useState<FolderItem[]>([]);
  const [currentFolder, setCurrentFolder] = useState<FolderItem | null>(null);
  const [breadcrumbPath, setBreadCrumbPath] = useState<FolderItem[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('authenticatedUser') || '{}');

  useEffect(() => {
    if (currentUser?.id) {
      const userFolders = localStorage.getItem(`folders_${currentUser.id}`);
      const userFiles = localStorage.getItem(`files_${currentUser.id}`);

      setFolders(userFolders ? JSON.parse(userFolders) : []);
      setFiles(userFiles ? JSON.parse(userFiles) : []);
    }
  }, [currentUser?.id]);

  const findFolderPath = (
    folderId: number,
    folders: FolderItem[],
    path: FolderItem[] = []
  ): FolderItem[] | null => {
    for (const folder of folders) {
      if (folder.id === folderId) {
        return [...path, folder];
      }
      if (folder.subFolders?.length) {
        const subPath = findFolderPath(folderId, folder.subFolders, [...path, folder]);
        if (subPath) return subPath;
      }
    }
    return null;
  };

  const navigateToFolder = (folder: FolderItem | null) => {
    if (!folder) {
      setCurrentFolder(null);
      setBreadCrumbPath([]);
      return;
    }

    const path = findFolderPath(folder.id, Folders);
    if (path) {
      setCurrentFolder(folder);
      setBreadCrumbPath(path);
    }
  };

  const getCurrentFolderContent = () => {
    if (!currentFolder) {
      return {
        displayFolders: Folders.filter(f => !f.parentId),
        displayFiles: files
      };
    }

    return {
      displayFolders: currentFolder.subFolders || [],
      displayFiles: currentFolder.files
    };
  };

  const saveFolders = (updatedFolders: FolderItem[]) => {
    setFolders(updatedFolders);
    localStorage.setItem(`folders_${currentUser.id}`, JSON.stringify(updatedFolders));
  };

  const saveFiles = (updatedFiles: FileItem[]) => {
    setFiles(updatedFiles);
    localStorage.setItem(`files_${currentUser.id}`, JSON.stringify(updatedFiles));
  };

  const handleAddFolder = (parentId: number | null = null) => {
    const folderName = prompt('Enter folder name');
    if (!folderName) return;

    const newFolder: FolderItem = {
      id: Date.now(),
      name: folderName,
      files: [],
      bg: 'rgba(243, 241, 241, 0.76)',
      parentId,
      subFolders: [],
    };

    if (parentId === null) {
      // Add to root level
      const updatedFolders = [...Folders, newFolder];
      setFolders(updatedFolders);
      saveFolders(updatedFolders);
    } else {
      // Add as subfolder
      const addSubfolderRecursive = (items: FolderItem[]): FolderItem[] => {
        return items.map((folder) => {
          if (folder.id === parentId) {
            const updatedFolder: FolderItem = {
              ...folder,
              subFolders: [...(folder.subFolders || []), newFolder],
            };

            // Update currentFolder if it's the target folder
            if (currentFolder && currentFolder.id === parentId) {
              setCurrentFolder(updatedFolder);
            }

            return updatedFolder;
          }

          // Recurse into subFolders if they exist
          if (folder.subFolders?.length) {
            return {
              ...folder,
              subFolders: addSubfolderRecursive(folder.subFolders),
            };
          }

          return folder;
        });
      };

      const updatedFolders = addSubfolderRecursive(Folders);
      setFolders(updatedFolders);
      saveFolders(updatedFolders);
    }

    // Optionally, navigate to the new folder
    if (newFolder.parentId === currentFolder?.id) {
      setCurrentFolder(newFolder);
      setBreadCrumbPath([...breadcrumbPath, newFolder]);
    }

    setShowDropdown(false);
  };



  const handleDeleteFolder = (folderId: number) => {
    const deleteRecursive = (items: FolderItem[]): FolderItem[] => {
      return items.filter(item => {
        if (item.id === folderId) return false;
        if (item.subFolders) {
          item.subFolders = deleteRecursive(item.subFolders);
        }
        return true;
      });
    };

    const updatedFolders = deleteRecursive(Folders);
    saveFolders(updatedFolders);
  };

  const handleAddFileToFolder = (folderId: number) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newFile = {
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          data: file,
        };

        const updateFoldersRecursive = (items: FolderItem[]): FolderItem[] => {
          return items.map(folder => {
            if (folder.id === folderId) {
              return { ...folder, files: [...folder.files, newFile] };
            }
            if (folder.subFolders) {
              return { ...folder, subFolders: updateFoldersRecursive(folder.subFolders) };
            }
            return folder;
          });
        };

        const updatedFolders = updateFoldersRecursive(Folders);
        saveFolders(updatedFolders);
      }
    };
    fileInput.click();
  };

  const handleDeleteFileFromFolder = (folderId: number, fileIndex: number) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      const updateFoldersRecursive = (items: FolderItem[]): FolderItem[] => {
        return items.map(folder => {
          if (folder.id === folderId) {
            const newFiles = [...folder.files];
            newFiles.splice(fileIndex, 1);
            return { ...folder, files: newFiles };
          }
          if (folder.subFolders) {
            return { ...folder, subFolders: updateFoldersRecursive(folder.subFolders) };
          }
          return folder;
        });
      };

      const updatedFolders = updateFoldersRecursive(Folders);
      saveFolders(updatedFolders);
    }
  };

  const handleAddFile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newFile = {
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          data: file
        };

        saveFiles([...files, newFile]);
      }
    };
    fileInput.click();
    setShowDropdown(false);
  };

  const handleDeleteFile = (index: number) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      const updatedFiles = [...files];
      updatedFiles.splice(index, 1);
      saveFiles(updatedFiles);
    }
  };

  const { displayFolders, displayFiles } = getCurrentFolderContent();

  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="p-4">
        <div className="relative flex w-[50%] items-center gap-3">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 rounded-lg bg-customBlue px-5 py-[8px] text-sm text-white hover:bg-blue-600"
          >
            <Plus size={16} />
            Add
          </button>
          <button className="flex items-center gap-2 rounded-lg border bg-gray-200 px-5 py-[8px] text-sm hover:bg-gray-300">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-lg border bg-gray-200 px-5 py-[8px] text-sm hover:bg-gray-300">
            <ArrowUpNarrowWide size={16} />
            Sort
          </button>

          {showDropdown && (
            <div className="w-30 absolute left-0 top-12 z-20 rounded-lg border bg-white shadow-md">
              <ul>
                <li
                  onClick={() => handleAddFolder(currentFolder?.id || null)}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Create Folder
                </li>
                <li
                  onClick={handleAddFile}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Add File
                </li>
              </ul>

            </div>
          )}
        </div>
        <div className="mt-4">
          <Breadcrumb
            currentPath={breadcrumbPath}
            onNavigate={navigateToFolder}
          />
        </div>
      </div>

      <div className="m-0 flex-1 overflow-y-auto px-6 py-2">
        {/* Show folders section */}
        {displayFolders.length > 0 ? (
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Folders</h2>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6">
              {displayFolders.map((folder) => (
                <div key={folder.id} onClick={() => navigateToFolder(folder)}>
                  <FolderCard
                    id={folder.id}
                    name={folder.name}
                    files={folder.files}
                    // subFolders={folder.subFolders}
                    bg={folder.bg}
                    parentId={folder.parentId}
                    onAddFile={handleAddFileToFolder}
                    onAddFolder={handleAddFolder}
                    onDeleteFile={handleDeleteFileFromFolder}
                    onDeleteFolder={handleDeleteFolder}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : currentFolder ? (
          <div className="py-8 text-center">
            <p className="text-sm text-gray-500">This folder is empty</p>
          </div>
        ) : null}

        {displayFiles.length > 0 ? (
          <div className='mt-3'>
            <h3 className="text-md mb-2 font-semibold text-gray-500">Files</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {displayFiles.map((file, index) => (
                <FileCard
                  key={index}
                  file={file}
                  index={index}
                  onDelete={handleDeleteFile}
                />
              ))}
            </div>
          </div>
        ) : null
        }

        {/* Show vector image and text only if there are no files AND no folders */}
        {displayFolders.length === 0 && displayFiles.length === 0 && !currentFolder && (
          <div className="mt-6 py-8 text-center">
            <img
              src={vectorImg}
              alt="No files or folders"
              className="mx-auto mb-4 rounded-lg"
              style={{ maxWidth: '250px', height: 'auto' }}
            />
            <p className="text-sm text-gray-500">Nothing here yet, start adding files</p>
          </div>
        )}

        <div className="w-1/2 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}