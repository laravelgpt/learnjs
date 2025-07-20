import React, { useState } from 'react';
import Preview from './Preview';
import AIAssistant from './AIAssistant';
import { AIMessage, FileSystemNode, File } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { MinimizeIcon } from './icons/MinimizeIcon';
import { MaximizeIcon } from './icons/MaximizeIcon';
import { XIcon } from './icons/XIcon';
import { EnterFullScreenIcon } from './icons/EnterFullScreenIcon';
import { ExitFullScreenIcon } from './icons/ExitFullScreenIcon';

interface RightPanelProps {
  files: FileSystemNode[];
  activeFile: File | null;
  messages: AIMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  initChat: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
}

type ActiveTab = 'preview' | 'assistant';

const RightPanel: React.FC<RightPanelProps> = ({ 
  files, activeFile, messages, isLoading, onSendMessage, initChat,
  isMinimized, onToggleMinimize, onClose,
  isFullScreen = false, onToggleFullScreen = () => {}
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('preview');

  const tabConfig: Record<ActiveTab, { icon: React.FC<any>, color: string, ring: string, label: string, title: string }> = {
    preview: { icon: PlayIcon, color: 'text-orange-400', ring: 'focus:ring-orange-400', label: 'Live Preview', title: 'Live Preview' },
    assistant: { icon: SparklesIcon, color: 'text-violet-400', ring: 'focus:ring-violet-400', label: 'AI Assistant', title: 'AI Assistant' },
  };

  const tabButtonClasses = (tabName: ActiveTab) => {
    const base = 'p-2.5 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';
    const inactive = 'text-slate-400 hover:bg-slate-700 hover:text-slate-300';
    
    if (activeTab !== tabName) return `${base} ${inactive}`;
    
    const { color, ring } = tabConfig[tabName];
    return `${base} bg-slate-700 ${color} ${ring}`;
  };

  const handleTabClick = (tabName: ActiveTab) => {
    if (isMinimized) {
      onToggleMinimize();
    }
    if (tabName === 'assistant' && messages.length === 0) {
      initChat();
    }
    setActiveTab(tabName);
  };

  return (
    <div className="bg-slate-800 border-l border-slate-700 flex flex-shrink-0 w-full h-full">
      {/* Content Panel */}
      <div className={`flex flex-col flex-grow overflow-hidden bg-slate-900 transition-all duration-300 ${isMinimized && !isFullScreen ? 'w-0' : 'flex-1'}`}>
         <div className="flex justify-between items-center p-3 border-b border-slate-700 flex-shrink-0">
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              {isFullScreen ? 'Live Preview' : tabConfig[activeTab].title}
            </h2>
            <div className="flex items-center gap-2">
                <button onClick={onToggleFullScreen} className="text-slate-400 hover:text-white" title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}>
                    {isFullScreen ? <ExitFullScreenIcon className="w-4 h-4"/> : <EnterFullScreenIcon className="w-4 h-4"/>}
                </button>

                {!isFullScreen && (
                  <>
                    <button onClick={onToggleMinimize} className="text-slate-400 hover:text-white" title={isMinimized ? 'Restore Panel' : 'Minimize Panel'}>
                        {isMinimized ? <MaximizeIcon className="w-4 h-4"/> : <MinimizeIcon className="w-4 h-4"/>}
                    </button>
                     <button onClick={onClose} className="text-slate-400 hover:text-white" title="Close Panel">
                        <XIcon className="w-4 h-4"/>
                    </button>
                  </>
                )}
            </div>
        </div>
        <div className={`flex-grow overflow-hidden ${isMinimized && !isFullScreen ? 'hidden' : ''}`}>
            {(activeTab === 'preview' || isFullScreen) && <Preview activeFile={activeFile} files={files} />}
            {activeTab === 'assistant' && !isFullScreen && (
              <AIAssistant
                messages={messages}
                isLoading={isLoading}
                onSendMessage={onSendMessage}
              />
            )}
        </div>
      </div>

      {/* Vertical Icon Bar */}
      {!isFullScreen && (
        <div className="w-14 bg-slate-900 border-l border-slate-700 flex flex-col items-center py-4 gap-4 flex-shrink-0">
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
      )}
    </div>
  );
};

export default RightPanel;