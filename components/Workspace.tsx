import React, { useState, useEffect, useRef } from 'react';
import { File, FileSystemNode, Package } from '../types';
import { FolderIcon } from './icons/FolderIcon';
import { FileIcon } from './icons/FileIcon';
import { NewFileIcon } from './icons/NewFileIcon';
import { NewFolderIcon } from './icons/NewFolderIcon';
import { PackageIcon } from './icons/PackageIcon';
import { PackageJsonIcon } from './icons/PackageJsonIcon';

// Sub-component for the creation input field
interface CreationNodeProps {
  type: 'file' | 'folder';
  level: number;
  onCommit: (name: string) => void;
  onCancel: () => void;
}
const CreationNode: React.FC<CreationNodeProps> = ({ type, level, onCommit, onCancel }) => {
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommit = () => {
    if (name.trim()) {
      onCommit(name.trim());
    } else {
      onCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommit();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const indent = { paddingLeft: `${level * 1.25 + 0.5}rem` };
  const Icon = type === 'file' ? FileIcon : FolderIcon;

  return (
    <div className="w-full flex items-center gap-2 text-left pr-2 py-1.5" style={indent}>
      <Icon className={`w-5 h-5 ${type === 'folder' ? 'text-cyan-400' : 'text-slate-500'} flex-shrink-0`} />
      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleCommit}
        onKeyDown={handleKeyDown}
        className="bg-slate-900 text-white w-full h-6 focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded-sm px-1 text-sm"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};


interface NodeProps {
  node: FileSystemNode;
  level: number;
  activeFile: File | null;
  renamingNodeId: string | null;
  creationState: { parentId: string | null; type: 'file' | 'folder'; } | null;
  onFileSelect: (file: File) => void;
  onSetContextMenu: (e: React.MouseEvent, node: FileSystemNode) => void;
  onSetRenamingNodeId: (id: string | null) => void;
  onRenameNode: (nodeId: string, newName: string) => void;
  onCommitCreation: (name: string) => void;
  onCancelCreation: () => void;
}

const Node: React.FC<NodeProps> = ({ 
  node, onFileSelect, level, activeFile, onSetContextMenu,
  renamingNodeId, onSetRenamingNodeId, onRenameNode,
  creationState, onCommitCreation, onCancelCreation
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState(node.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const isRenaming = renamingNodeId === node.id;

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const indent = { paddingLeft: `${level * 1.25}rem` };

  const handleRename = () => {
    if (inputValue.trim() && inputValue.trim() !== node.name) {
      onRenameNode(node.id, inputValue.trim());
    }
    onSetRenamingNodeId(null);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleRename();
    if (e.key === 'Escape') onSetRenamingNodeId(null);
  };

  if (node.type === 'folder') {
    return (
      <div>
        <div
          onContextMenu={(e) => onSetContextMenu(e, node)}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-2 text-left px-2 py-1.5 text-sm text-slate-300 hover:bg-slate-700/50 rounded cursor-pointer transition-colors"
        >
          <div style={indent} className="flex items-center gap-2 flex-grow min-w-0">
             <svg className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <FolderIcon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            {isRenaming ? (
               <input 
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onBlur={handleRename}
                onKeyDown={handleKeyDown}
                className="bg-slate-900 text-white w-full focus:outline-none"
                onClick={e => e.stopPropagation()}
              />
            ) : (
              <span className="truncate">{node.name}</span>
            )}
          </div>
        </div>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden`} style={{maxHeight: isOpen ? '1000px' : '0'}}>
            {node.children.map((child) => (
              <Node key={child.id} node={child} level={level + 1} {...{ onFileSelect, activeFile, onSetContextMenu, renamingNodeId, onSetRenamingNodeId, onRenameNode, creationState, onCommitCreation, onCancelCreation }} />
            ))}
            {creationState?.parentId === node.id && (
                <CreationNode type={creationState.type} level={level + 1} onCommit={onCommitCreation} onCancel={onCancelCreation} />
            )}
        </div>
      </div>
    );
  }

  const isActive = activeFile?.id === node.id;
  const isPackageJson = node.name === 'package.json';
  const NodeIcon = isPackageJson ? PackageJsonIcon : FileIcon;

  return (
    <div
      onContextMenu={(e) => onSetContextMenu(e, node)}
       onClick={() => onFileSelect(node)}
      className={`w-full flex items-center gap-2 text-left px-2 py-1.5 text-sm rounded cursor-pointer transition-colors focus:outline-none ${isActive ? 'bg-cyan-400/20 text-cyan-300' : 'text-slate-400 hover:bg-slate-700/50'}`}
    >
        <div style={indent} className="flex items-center gap-2 flex-grow min-w-0 pl-4">
          <NodeIcon className={`w-5 h-5 ${isPackageJson ? 'text-orange-400' : 'text-slate-500'} flex-shrink-0`} />
           {isRenaming ? (
               <input
                ref={inputRef} 
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onBlur={handleRename}
                onKeyDown={handleKeyDown}
                className="bg-slate-900 text-white w-full focus:outline-none"
                onClick={e => e.stopPropagation()}
               />
            ) : (
              <span className="truncate">{node.name}</span>
            )}
        </div>
    </div>
  );
};

interface WorkspaceProps {
  files: FileSystemNode[];
  packages: Package[];
  activeFile: File | null;
  onFileSelect: (file: File) => void;
  onCreateNode: (parentId: string | null, type: 'file' | 'folder', name: string) => void;
  onRenameNode: (nodeId: string, newName:string) => void;
  onDeleteNode: (nodeId: string) => void;
  onInstallDependencies: () => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ files, packages, onFileSelect, activeFile, onCreateNode, onRenameNode, onDeleteNode, onInstallDependencies }) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; node: FileSystemNode } | null>(null);
  const [renamingNodeId, setRenamingNodeId] = useState<string | null>(null);
  const [creationState, setCreationState] = useState<{ parentId: string | null; type: 'file' | 'folder' } | null>(null);
  const [isDepsOpen, setIsDepsOpen] = useState(true);

  const handleSetContextMenu = (e: React.MouseEvent, node: FileSystemNode) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, node });
  };
  
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleRename = () => {
    if (contextMenu) {
      setRenamingNodeId(contextMenu.node.id);
      setContextMenu(null);
    }
  };

  const handleDelete = () => {
    if (contextMenu) {
      onDeleteNode(contextMenu.node.id);
      setContextMenu(null);
    }
  };

  const handleCreateItem = (type: 'file' | 'folder', parentId: string | null) => {
      setContextMenu(null);
      setRenamingNodeId(null);
      setCreationState({ parentId, type });
  };
  
  const handleCommitCreation = (name: string) => {
      if (creationState) {
          onCreateNode(creationState.parentId, creationState.type, name);
      }
      setCreationState(null);
  };
  
  return (
    <div className="p-2 relative flex flex-col h-full">
      {/* Explorer Section */}
      <div>
        <div className="flex justify-between items-center px-2 mb-2">
          <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Explorer</h3>
          <div className="flex gap-2">
              <button onClick={() => handleCreateItem('file', null)} className="text-slate-400 hover:text-white transition-colors" aria-label="New File"><NewFileIcon className="w-4 h-4" /></button>
              <button onClick={() => handleCreateItem('folder', null)} className="text-slate-400 hover:text-white transition-colors" aria-label="New Folder"><NewFolderIcon className="w-4 h-4"/></button>
          </div>
        </div>
        {files.map((node) => (
          <Node
            key={node.id}
            node={node}
            level={0}
            activeFile={activeFile}
            renamingNodeId={renamingNodeId}
            creationState={creationState}
            onFileSelect={onFileSelect}
            onSetContextMenu={handleSetContextMenu}
            onSetRenamingNodeId={setRenamingNodeId}
            onRenameNode={onRenameNode}
            onCommitCreation={handleCommitCreation}
            onCancelCreation={() => setCreationState(null)}
          />
        ))}

        {creationState?.parentId === null && (
            <CreationNode type={creationState.type} level={0} onCommit={handleCommitCreation} onCancel={() => setCreationState(null)} />
        )}
      </div>

      {/* Dependencies Section */}
      <div className="mt-4 pt-2 border-t border-slate-700">
        <button
          onClick={() => setIsDepsOpen(!isDepsOpen)}
          className="w-full flex justify-between items-center px-2 mb-2 text-left"
        >
          <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Dependencies</h3>
           <svg className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform ${isDepsOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
         <div className={`transition-all duration-300 ease-in-out overflow-hidden`} style={{maxHeight: isDepsOpen ? '500px' : '0'}}>
            {packages.length > 0 ? (
              packages.map(pkg => (
                <div key={pkg.name} className="flex items-center gap-2 px-2 py-1 text-sm text-slate-400">
                    <PackageIcon className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    <span className="truncate">{pkg.name}</span>
                    <span className="text-xs text-slate-500 flex-shrink-0">{pkg.version}</span>
                </div>
              ))
            ) : (
              <p className="px-2 text-xs text-slate-500">No packages installed.</p>
            )}
        </div>
      </div>


      {contextMenu && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="absolute z-20 w-48 bg-slate-700 rounded-md shadow-lg text-sm text-slate-200 py-1 animate-fade-in"
        >
          {contextMenu.node.type === 'folder' && (
            <>
              <button onClick={() => handleCreateItem('file', contextMenu.node.id)} className="block w-full text-left px-3 py-1.5 hover:bg-slate-600 transition-colors">New File</button>
              <button onClick={() => handleCreateItem('folder', contextMenu.node.id)} className="block w-full text-left px-3 py-1.5 hover:bg-slate-600 transition-colors">New Folder</button>
              <div className="h-px my-1 bg-slate-600" />
            </>
          )}
          {contextMenu.node.name === 'package.json' && (
             <>
              <button onClick={onInstallDependencies} className="block w-full text-left px-3 py-1.5 hover:bg-slate-600 transition-colors">Install Dependencies</button>
              <div className="h-px my-1 bg-slate-600" />
            </>
          )}
          <button onClick={handleRename} className="block w-full text-left px-3 py-1.5 hover:bg-slate-600 transition-colors">Rename</button>
          <button onClick={handleDelete} className="block w-full text-left px-3 py-1.5 hover:bg-slate-600 text-red-400 transition-colors">Delete</button>
        </div>
      )}
    </div>
  );
};

export default Workspace;