import React, { useEffect, useState } from 'react';
import { Folder, Plus, Download, Trash2, X, Ellipsis, File } from 'lucide-react';
import { FileItem } from './types';

interface FolderCardProps {
  id: number;
  name: string;
  files: FileItem[];
  subFolders?: FolderCardProps[];
  bg?: string;
  onAddFile: (folderId: number) => void;
  onAddFolder: (parentFolderId: number) => void;
  onDeleteFolder: (folderId: number) => void;
  onDeleteFile: (folderId: number, fileIndex: number) => void;
  parentId?: number | null;
}

const FolderCard: React.FC<FolderCardProps> = ({
  id,
  name,
  files,
  subFolders = [],
  bg,
  onAddFile,
  onAddFolder,
  onDeleteFile,
  onDeleteFolder
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`#dropdown-${id}`)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown, id]);

  const calculateTotalSize = () => {
    if (files.length === 0) return '0 KB';

    const totalKB = files.reduce((sum, file) => {
      const sizeNum = parseFloat(file.size.split(' ')[0]);
      return sum + sizeNum;
    }, 0);

    if (totalKB > 1024) {
      return `${(totalKB / 1024).toFixed(2)} MB`;
    }
    return `${totalKB.toFixed(2)} KB`;
  };

  const handleFileClick = (file: FileItem) => {
    if (file.data) {
      const fileUrl = URL.createObjectURL(file.data);
      window.open(fileUrl, '_blank');
    }
  };

  const handleDownload = (file: FileItem) => {
    if (file.data) {
      const url = URL.createObjectURL(file.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const FileCard = ({ file, index }: { file: FileItem; index: number }) => (
    <div
      className="relative w-[200px] cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md"
      onClick={() => handleFileClick(file)}
    >
      <div className="flex flex-col items-center gap-2">
        <File className="h-12 w-12 text-gray-400" />
        <div className="w-full text-center">
          <h3 className="truncate text-sm font-medium text-gray-800">{file.name}</h3>
          <p className="mt-1 text-xs text-gray-500">{file.size}</p>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload(file);
          }}
          className="rounded p-1 text-gray-600 hover:bg-gray-100"
          title="Download"
        >
          <Download size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteFile(id, index);
          }}
          className="rounded p-1 text-red-500 hover:bg-gray-100"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div
        className="relative w-[200px] rounded-lg border bg-gray-50 p-4 shadow-sm transition-all hover:shadow-md"
        style={{ background: bg }}
      >
        <div
          className="flex cursor-pointer flex-col items-start gap-2"
          onClick={() => setShowModal(true)}
        >
          <Folder className="mt-0 h-8 w-8 text-customBlue" />
          <div className="flex w-full flex-col">
            <p className="text-md truncate font-semibold text-gray-800">{name}</p>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
              <span>{files.length} {files.length === 1 ? 'file' : 'files'}</span>
              <span>{calculateTotalSize()}</span>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
          className="absolute right-3 top-3 mt-2 rounded-full p-2 text-white hover:bg-gray-300"
          title="Actions"
        >
          <Ellipsis className="text-gray-600" size={16} />
        </button>

        {showDropdown && (
          <div
            id={`dropdown-${id}`}
            className="absolute right-0 top-14 z-50 w-32 rounded-lg border bg-white shadow-md"
          >
            <ul>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  onAddFolder(id); // Pass the current folder's ID as the parent
                  setShowDropdown(false);
                }}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
              >
                Create Folder
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  onAddFile(id);
                  setShowDropdown(false);
                }}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
              >
                Add File
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  const isConfirmed = window.confirm(`Are you sure you want to delete the folder "${name}"?`);
                  if (isConfirmed) {
                    onDeleteFolder(id);
                  }
                  setShowDropdown(false);
                }}
                className="cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Delete Folder
              </li>
            </ul>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-[80vh] w-[90%] max-w-6xl overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-semibold">{name}</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAddFolder(id)}
                  className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  <Plus size={16} />
                  New Folder
                </button>
                <button
                  onClick={() => onAddFile(id)}
                  className="flex items-center gap-2 rounded-md bg-customBlue px-3 py-2 text-sm text-white hover:bg-blue-600"
                >
                  <Plus size={16} />
                  Add Files
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Sub-folders section */}
            {subFolders && subFolders.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium">Folders</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {subFolders.map((folder) => (
                    <FolderCard
                      key={folder.id}
                      {...folder}
                      parentId={id}
                      onAddFile={onAddFile}
                      onAddFolder={onAddFolder}
                      onDeleteFile={onDeleteFile}
                      onDeleteFolder={onDeleteFolder}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Files section */}
            <div>
              <h3 className="mb-3 text-lg font-medium">Files</h3>
              {files.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {files.map((file, index) => (
                    <FileCard key={index} file={file} index={index} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No files in this folder</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FolderCard;