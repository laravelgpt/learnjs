import React, { useRef } from 'react';
import { EditorToolbarState, EditorAIAction } from '../types';
import { FormatIcon } from './icons/FormatIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { MagicWandIcon } from './icons/MagicWandIcon';
import { CommentIcon } from './icons/CommentIcon';
import { ExplainIcon } from './icons/ExplainIcon';

interface EditorPanelProps {
  fileName: string;
  code: string;
  onCodeChange: (newCode: string) => void;
  onInstallDependencies: () => void;
  onFormatCode: () => void;
  onGenerateCode: (cursorPosition: number) => void;
  onEditCode: (action: EditorAIAction) => void;
  onSelectionChange: (state: EditorToolbarState) => void;
  toolbarState: EditorToolbarState;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  fileName,
  code,
  onCodeChange,
  onInstallDependencies,
  onFormatCode,
  onGenerateCode,
  onEditCode,
  onSelectionChange,
  toolbarState
}) => {
  const isPackageJson = fileName === 'package.json';
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const handleSelection = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const { selectionStart, selectionEnd } = editor;

    if (selectionStart === selectionEnd) {
      if (toolbarState.isOpen) {
        onSelectionChange({ ...toolbarState, isOpen: false });
      }
      return;
    }
    
    const top = 10;
    // The left position is now controlled by CSS for centering.
    // We only need to provide the top position and selection details.
    
    onSelectionChange({
      isOpen: true,
      top,
      left: 0, // Left is handled by CSS transform
      selection: { start: selectionStart, end: selectionEnd }
    });
  };

  return (
    <div className="flex flex-col flex-grow bg-slate-900 relative">
      <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center z-10">
        <h2 className="text-sm font-medium text-slate-300 truncate">{fileName}</h2>
        <div className="flex items-center gap-2 sm:gap-4">
            {isPackageJson && (
                <button 
                    onClick={onInstallDependencies}
                    className="px-3 py-1 text-xs font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-500 transition-colors"
                >
                    Install
                </button>
            )}
            <button onClick={() => onGenerateCode(editorRef.current?.selectionStart || 0)} className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white" title="Write with AI">
                <SparklesIcon className="w-4 h-4 text-violet-400" />
                <span className="hidden sm:inline">Write with AI</span>
            </button>
            <button onClick={onFormatCode} className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white" title="Format Code">
                <FormatIcon className="w-4 h-4"/>
                <span className="hidden sm:inline">Format</span>
            </button>
        </div>
      </div>
      <div className="flex-grow relative">
        {toolbarState.isOpen && (
            <div 
              className="absolute bg-slate-900 border border-slate-700 rounded-lg p-1 flex items-center gap-1 shadow-lg animate-fade-in z-20 w-max"
              style={{ top: `${toolbarState.top}px`, left: `50%`, transform: 'translateX(-50%)'}}
            >
                <button onClick={() => onEditCode('refactor')} className="p-2 hover:bg-slate-700 rounded-md" title="Refactor Code"><MagicWandIcon className="w-5 h-5 text-indigo-400"/></button>
                <button onClick={() => onEditCode('comment')} className="p-2 hover:bg-slate-700 rounded-md" title="Add Comments"><CommentIcon className="w-5 h-5 text-sky-400"/></button>
                <button onClick={() => onEditCode('explain')} className="p-2 hover:bg-slate-700 rounded-md" title="Explain Code"><ExplainIcon className="w-5 h-5 text-amber-400"/></button>
            </div>
        )}
        <textarea
          ref={editorRef}
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          onSelect={handleSelection}
          onBlur={() => onSelectionChange({ ...toolbarState, isOpen: false })}
          className="w-full h-full p-4 bg-transparent text-slate-300 font-mono text-sm resize-none focus:outline-none leading-relaxed"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default EditorPanel;