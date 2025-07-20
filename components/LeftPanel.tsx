import React, { useState } from 'react';
import { File, FileSystemNode, Topic, Package, LearningContent } from '../types';
import Workspace from './Workspace';
import Learn from './Learn';
import { FolderIcon } from './icons/FolderIcon';
import { XIcon } from './icons/XIcon';
import { HtmlIcon } from './icons/HtmlIcon';
import { CssIcon } from './icons/CssIcon';
import { JavaScriptIcon } from './icons/JavaScriptIcon';
import { TypeScriptIcon } from './icons/TypeScriptIcon';
import { MinimizeIcon } from './icons/MinimizeIcon';
import { MaximizeIcon } from './icons/MaximizeIcon';
import { NextjsIcon } from './icons/NextjsIcon';
import { VuejsIcon } from './icons/VuejsIcon';
import { NuxtjsIcon } from './icons/NuxtjsIcon';


interface LeftPanelProps {
  files: FileSystemNode[];
  lessons: LearningContent;
  packages: Package[];
  activeFile: File | null;
  onFileSelect: (file: File) => void;
  onTopicSelect: (topic: Topic) => void;
  onCreateNode: (parentId: string | null, type: 'file' | 'folder', name: string) => void;
  onRenameNode: (nodeId: string, newName: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onInstallDependencies: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
}

type LearnTab = keyof LearningContent;
const learnTabs: LearnTab[] = ['html', 'css', 'javascript', 'typescript', 'nextjs', 'vuejs', 'nuxtjs'];

type ActiveTab = 'workspace' | LearnTab;

const LeftPanel: React.FC<LeftPanelProps> = ({ 
  files, 
  lessons, 
  packages,
  activeFile,
  onFileSelect, 
  onTopicSelect, 
  onCreateNode,
  onRenameNode,
  onDeleteNode,
  onInstallDependencies,
  isMinimized,
  onToggleMinimize,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('vuejs');

  const tabConfig: Record<ActiveTab, { icon: React.FC<any>, color: string, ring: string, label: string, title: string }> = {
    workspace: { icon: FolderIcon, color: 'text-cyan-400', ring: 'focus:ring-cyan-400', label: 'Workspace', title: 'Workspace'},
    html: { icon: HtmlIcon, color: 'text-orange-400', ring: 'focus:ring-orange-400', label: 'Learn HTML', title: 'HTML'},
    css: { icon: CssIcon, color: 'text-blue-400', ring: 'focus:ring-blue-400', label: 'Learn CSS', title: 'CSS'},
    javascript: { icon: JavaScriptIcon, color: 'text-yellow-400', ring: 'focus:ring-yellow-400', label: 'Learn JavaScript', title: 'JavaScript'},
    typescript: { icon: TypeScriptIcon, color: 'text-sky-400', ring: 'focus:ring-sky-400', label: 'Learn TypeScript', title: 'TypeScript' },
    nextjs: { icon: NextjsIcon, color: 'text-slate-300', ring: 'focus:ring-slate-300', label: 'Learn Next.js', title: 'Next.js' },
    vuejs: { icon: VuejsIcon, color: 'text-green-400', ring: 'focus:ring-green-400', label: 'Learn Vue.js', title: 'Vue.js' },
    nuxtjs: { icon: NuxtjsIcon, color: 'text-emerald-400', ring: 'focus:ring-emerald-400', label: 'Learn Nuxt.js', title: 'Nuxt.js' },
  };

  const handleTabClick = (tabName: ActiveTab) => {
    if (isMinimized) {
      onToggleMinimize();
    }
    setActiveTab(tabName);
  };

  const tabButtonClasses = (tabName: ActiveTab) => {
    const base = 'p-2.5 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';
    const inactive = 'text-slate-400 hover:bg-slate-700 hover:text-slate-300';
    
    if (activeTab !== tabName) return `${base} ${inactive}`;
    
    const { color, ring } = tabConfig[tabName];
    return `${base} bg-slate-700 ${color} ${ring}`;
  };

  return (
    <div className="flex flex-shrink-0 h-full w-full bg-slate-800 border-r border-slate-700">
      {/* Icon-based Tab Menu */}
      <div className="w-16 bg-slate-900 border-r border-slate-700 flex flex-col items-center py-4 gap-4 flex-shrink-0">
        {Object.keys(tabConfig).map(key => {
            const tabKey = key as ActiveTab;
            const { icon: Icon, label } = tabConfig[tabKey];
            return (
              <button
                key={tabKey}
                onClick={() => handleTabClick(tabKey)}
                className={tabButtonClasses(tabKey)}
                aria-label={label}
                title={label}
              >
                <Icon className="w-6 h-6" />
              </button>
            )
        })}
      </div>
      
      {/* Content Panel */}
      <div className={`flex flex-col flex-grow transition-all duration-300 ${isMinimized ? 'w-0' : 'w-64'}`}>
        <div className="flex justify-between items-center p-3 border-b border-slate-700 flex-shrink-0">
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">{tabConfig[activeTab].title}</h2>
            <div className="flex items-center gap-2">
                <button onClick={onToggleMinimize} className="text-slate-400 hover:text-white" title={isMinimized ? 'Restore Panel' : 'Minimize Panel'}>
                    {isMinimized ? <MaximizeIcon className="w-4 h-4"/> : <MinimizeIcon className="w-4 h-4"/>}
                </button>
                 <button onClick={onClose} className="text-slate-400 hover:text-white" title="Close Panel">
                    <XIcon className="w-4 h-4"/>
                </button>
            </div>
        </div>

        <div className={`flex-grow overflow-y-auto ${isMinimized ? 'hidden' : ''}`}>
          {activeTab === 'workspace' && (
            <Workspace 
              files={files} 
              packages={packages}
              onFileSelect={onFileSelect} 
              activeFile={activeFile}
              onCreateNode={onCreateNode}
              onRenameNode={onRenameNode}
              onDeleteNode={onDeleteNode}
              onInstallDependencies={onInstallDependencies}
            />
          )}
          {learnTabs.includes(activeTab as LearnTab) && <Learn lessons={lessons[activeTab as LearnTab]} onTopicSelect={onTopicSelect} />}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;