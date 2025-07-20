
import React, { useState, useEffect, useRef } from 'react';
import { CodeIcon } from './icons/CodeIcon';
import { PlayIcon } from './icons/PlayIcon';
import { MenuIcon } from './icons/MenuIcon';
import { PanelRightIcon } from './icons/PanelRightIcon';

interface HeaderProps {
    onRunCode: () => void;
    isRunnable: boolean;
    onToggleLeftPanel: () => void;
    onToggleRightPanel: () => void;
    onToggleTerminal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRunCode, isRunnable, onToggleLeftPanel, onToggleRightPanel, onToggleTerminal }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuConfig: { [key: string]: { label: string; shortcut?: string; disabled?: boolean; action?: () => void; }[] } = {
      File: [
        { label: 'New File...', shortcut: 'Ctrl+N', disabled: true },
        { label: 'Save', shortcut: 'Ctrl+S', disabled: true },
      ],
      Edit: [
        { label: 'Undo', shortcut: 'Ctrl+Z', disabled: true },
        { label: 'Redo', shortcut: 'Ctrl+Y', disabled: true },
        { label: 'Cut', shortcut: 'Ctrl+X', disabled: true },
        { label: 'Copy', shortcut: 'Ctrl+C', disabled: true },
        { label: 'Paste', shortcut: 'Ctrl+V', disabled: true },
      ],
      View: [
        { label: 'Toggle Explorer', disabled: true },
        { label: 'Toggle Terminal', action: onToggleTerminal },
      ],
      Help: [
        { label: 'Documentation', disabled: true },
        { label: 'Show Examples', disabled: true },
      ],
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuToggle = (menu: string) => {
    setOpenMenu(prev => (prev === menu ? null : menu));
  };

  const handleItemClick = (action?: () => void) => {
    if(action) {
        action();
    }
    setOpenMenu(null);
  }

  return (
    <header className="flex items-center justify-between bg-slate-800 border-b border-slate-700 px-2 lg:px-4 py-2 flex-shrink-0 z-20">
      <div className="flex items-center gap-4">
        {/* Mobile: Hamburger Menu */}
        <button 
            onClick={onToggleLeftPanel} 
            className="lg:hidden p-2 rounded-md text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Toggle workspace"
        >
            <MenuIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <CodeIcon className="w-6 h-6 text-cyan-400" />
          <h1 className="text-lg font-semibold text-slate-200">JS Learn Studio</h1>
        </div>
        
        {/* Desktop: Text Menu */}
        <nav className="hidden lg:block relative" ref={menuRef}>
          <ul className="flex items-center gap-2">
            {Object.keys(menuConfig).map((item) => (
              <li key={item} className="relative">
                <button
                  onClick={() => handleMenuToggle(item)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${openMenu === item ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                >
                    {item}
                </button>
                {openMenu === item && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-slate-700 rounded-md shadow-lg text-sm text-slate-200 py-1 z-30 animate-fade-in">
                    {menuConfig[item].map(subItem => (
                      <button
                        key={subItem.label}
                        onClick={() => handleItemClick(subItem.action)}
                        disabled={subItem.disabled}
                        className="w-full flex justify-between items-center text-left px-3 py-1.5 hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>{subItem.label}</span>
                        {subItem.shortcut && <span className="text-xs text-slate-400">{subItem.shortcut}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={onRunCode}
          disabled={!isRunnable}
          className="flex items-center px-3 py-1 text-sm rounded-md text-slate-200 bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          <PlayIcon className="w-4 h-4 mr-2" />
          <span>Run</span>
        </button>
        
        {/* Mobile: Right Panel Toggle */}
        <button 
            onClick={onToggleRightPanel} 
            className="lg:hidden p-2 rounded-md text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Toggle assistant"
        >
            <PanelRightIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
