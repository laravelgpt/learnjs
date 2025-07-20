import React, { useRef, useEffect, useState } from 'react';
import { BugIcon } from './icons/BugIcon';
import { TerminalIcon } from './icons/TerminalIcon';
import { MagicWandIcon } from './icons/MagicWandIcon';
import { Problem, TerminalSession } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { PlusIcon } from './icons/PlusIcon';
import { XIcon } from './icons/XIcon';
import { INITIAL_TERMINAL } from '../constants';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronUpIcon } from './icons/ChevronUpIcon';


// Inlined SVG icon components for problem severities
const ErrorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...props}><path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM5.312 6.016a.438.438 0 0 0 0 .62l1.078 1.078-1.078 1.078a.438.438 0 0 0 .62.62l1.078-1.078 1.078 1.078a.438.438 0 0 0 .62-.62L9.31 8.792l1.078-1.078a.438.438 0 0 0-.62-.62L8.69 7.094l-1.078-1.078a.438.438 0 0 0-.62 0 .438.438 0 0 0 0 .62z"/></svg>
);
const WarningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...props}><path d="M15.397 12.353 9.162 1.283a1.434 1.434 0 0 0-2.524 0L.397 12.353A1.434 1.434 0 0 0 1.66 14.5h12.478a1.434 1.434 0 0 0 1.26-2.147zM8 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-1-3V5h2v4H7z"/></svg>
);
const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...props}><path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM7 5a1 1 0 1 0 2 0 1 1 0 1 0-2 0zm2 8H7V8h2v5z"/></svg>
);

interface BottomPanelProps {
  problems: Problem[];
  terminalSessions: TerminalSession[];
  activeTerminalId: string;
  activeTab: 'problems' | 'terminal';
  onTabChange: (tab: 'problems' | 'terminal') => void;
  onRequestFix: (problemId: string, autoApply: boolean) => void;
  onApplyFix: (problemId: string) => void;
  onTerminalCommand: (command: string) => void;
  onClearTerminal: () => void;
  onNewTerminal: () => void;
  onCloseTerminal: (id: string) => void;
  onSwitchTerminal: (id: string) => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
}

const BottomPanel: React.FC<BottomPanelProps> = ({
  problems,
  terminalSessions,
  activeTerminalId,
  activeTab,
  onTabChange,
  onRequestFix,
  onApplyFix,
  onTerminalCommand,
  onClearTerminal,
  onNewTerminal,
  onCloseTerminal,
  onSwitchTerminal,
  isMinimized,
  onToggleMinimize,
  onClose,
}) => {
  const terminalOutputRef = useRef<HTMLPreElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const [command, setCommand] = useState('');
  
  const activeSession = terminalSessions.find(s => s.id === activeTerminalId);

  useEffect(() => {
    if (terminalOutputRef.current && activeTab === 'terminal') {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [activeSession?.output, activeTab]);
  
  useEffect(() => {
    if (activeTab === 'terminal') {
        commandInputRef.current?.focus();
    }
  }, [activeTab, activeTerminalId]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onTerminalCommand(command);
      setCommand('');
    }
  };

  const handleTabClick = (tab: 'problems' | 'terminal') => {
    if (isMinimized) {
      onToggleMinimize();
    }
    onTabChange(tab);
  };

  const tabButtonClasses = (tabName: 'problems' | 'terminal') => {
    const base = 'flex items-center gap-2 px-2 sm:px-4 py-2 text-sm font-medium focus:outline-none transition-all duration-200';
    const inactive = 'text-slate-400 hover:bg-slate-700 hover:text-slate-200 border-t-2 border-transparent';
    if (activeTab !== tabName) return `${base} ${inactive}`;

    if (tabName === 'problems') return `${base} bg-slate-900 text-red-400 border-t-2 border-red-400`;
    if (tabName === 'terminal') return `${base} bg-slate-900 text-cyan-400 border-t-2 border-cyan-400`;

    return `${base} ${inactive}`;
  };

  const renderProblems = () => {
    if (problems.length === 0) {
      return (
        <div className="text-slate-500 px-4 py-2">
          No problems have been detected.
        </div>
      );
    }
    const severityMap = {
        error: { Icon: ErrorIcon, color: 'text-red-500' },
        warning: { Icon: WarningIcon, color: 'text-yellow-500' },
        info: { Icon: InfoIcon, color: 'text-blue-500' },
    };

    return (
      <div className="p-2 space-y-2">
        {problems.map((problem) => {
          const { Icon, color } = severityMap[problem.severity] || severityMap.info;
          return (
          <div key={problem.id} className="bg-slate-800 p-3 rounded-md">
            <div className="flex items-start gap-3">
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${color}`} />
              <div className="flex-grow">
                <p className="text-slate-300 text-sm mb-2 font-mono">
                  {problem.message}
                  {problem.line && <span className="text-slate-500 ml-2">(line {problem.line})</span>}
                </p>
                
                {problem.explanation && (
                  <div className="mt-2 pt-2 border-t border-slate-700">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">Suggested Fix</h4>
                      <p className="text-sm text-slate-400 mb-2">{problem.explanation}</p>
                      <pre className="bg-slate-900 p-2 rounded-md text-xs overflow-x-auto"><code>{problem.fixedCode}</code></pre>
                  </div>
                )}
                
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <button
                    onClick={() => onRequestFix(problem.id, true)}
                    disabled={problem.status === 'loading-fix' || problem.status === 'fixed'}
                    className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                  >
                    <MagicWandIcon className="w-4 h-4" />
                    {problem.status === 'loading-fix' ? 'Fixing...' : problem.status === 'fixed' ? 'Fixed' : 'Auto-Fix'}
                  </button>
                  
                  {!problem.explanation && (
                     <button onClick={() => onRequestFix(problem.id, false)}  disabled={problem.status === 'loading-explanation'} className="px-3 py-1 text-sm text-slate-300 rounded-md hover:bg-slate-700 transition-colors">
                        {problem.status === 'loading-explanation' ? 'Analyzing...' : 'Show Fix Details...'}
                     </button>
                  )}
                  
                  {problem.explanation && problem.status !== 'fixed' && (
                    <button onClick={() => onApplyFix(problem.id)} className="px-3 py-1 text-sm font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-500 transition-colors">
                        Apply Fix
                    </button>
                  )}
                </div>
                {problem.status === 'error-fixing' && <p className="text-xs text-red-400 mt-2">Sorry, the AI could not generate a fix. Please try again.</p>}
              </div>
            </div>
          </div>
        )})}
      </div>
    );
  };

  const renderTerminal = () => (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 flex justify-between items-center border-b border-slate-700 bg-slate-800">
        <div className="flex items-center overflow-x-auto">
          {terminalSessions.map(session => {
            const isSessionActive = session.id === activeTerminalId;
            return (
              <div key={session.id} className={`flex items-center border-r border-slate-700 transition-colors ${isSessionActive ? 'bg-slate-900' : 'hover:bg-slate-700/50'}`}>
                <button onClick={() => onSwitchTerminal(session.id)} className={`px-4 py-2 text-sm whitespace-nowrap ${isSessionActive ? 'text-cyan-300' : 'text-slate-400'}`}>
                    {session.title}
                </button>
                {terminalSessions.length > 1 && (
                    <button onClick={() => onCloseTerminal(session.id)} className="p-2 text-slate-500 hover:text-white hover:bg-red-500/50 rounded-full mr-2">
                        <XIcon className="w-3 h-3"/>
                    </button>
                )}
              </div>
            )
          })}
        </div>
        <div className="flex items-center px-2">
            <button onClick={onNewTerminal} className="p-2 text-slate-400 hover:text-white transition-colors" title="New Terminal">
                <PlusIcon className="w-4 h-4"/>
            </button>
            <button onClick={onClearTerminal} className="p-2 text-slate-400 hover:text-white transition-colors" title="Clear Terminal">
                <TrashIcon className="w-4 h-4"/>
            </button>
        </div>
      </div>
      <div className="h-full flex flex-col p-4" onClick={() => commandInputRef.current?.focus()}>
          <pre ref={terminalOutputRef} className="flex-grow whitespace-pre-wrap break-words font-mono text-sm text-slate-400">{activeSession?.output || INITIAL_TERMINAL}</pre>
          <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 mt-2">
              <span className="text-cyan-400">$</span>
              <input
                  ref={commandInputRef}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Type a command (e.g. 'npm install lodash')"
                  className="flex-grow bg-transparent focus:outline-none text-slate-300 font-mono text-sm"
                  autoComplete="off"
                  spellCheck="false"
              />
          </form>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-slate-800">
      <div className="flex justify-between border-b border-slate-700">
        <div className="flex">
            <button
              onClick={() => handleTabClick('problems')}
              className={tabButtonClasses('problems')}
            >
              <BugIcon className="w-5 h-5" />
              <span>Problems ({problems.length})</span>
            </button>
            <button
              onClick={() => handleTabClick('terminal')}
              className={tabButtonClasses('terminal')}
            >
              <TerminalIcon className="w-5 h-5" />
              <span>Terminal</span>
            </button>
        </div>
        <div className="flex items-center px-2 gap-2">
            <button onClick={onToggleMinimize} className="text-slate-400 hover:text-white" title={isMinimized ? 'Restore Panel' : 'Minimize Panel'}>
                {isMinimized ? <ChevronUpIcon className="w-5 h-5"/> : <ChevronDownIcon className="w-5 h-5"/>}
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white" title="Close Panel">
                <XIcon className="w-5 h-5"/>
            </button>
        </div>
      </div>
      <div className={`flex-grow overflow-y-auto bg-slate-900 ${isMinimized ? 'hidden' : ''}`}>
        {activeTab === 'problems' && renderProblems()}
        {activeTab === 'terminal' && renderTerminal()}
      </div>
    </div>
  );
};

export default BottomPanel;