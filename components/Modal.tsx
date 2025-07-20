import React, { useState, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm?: (inputValue?: string) => void;
  onCancel: () => void;
  promptInput?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, message, onConfirm, onCancel, promptInput = false }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && promptInput && inputRef.current) {
      inputRef.current.focus();
    }
    if(isOpen && !promptInput) {
        setInputValue('');
    }
  }, [isOpen, promptInput]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if(onConfirm) onConfirm(inputValue);
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in" aria-modal="true" onMouseDown={onCancel}>
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md m-4 border border-slate-700" onMouseDown={e => e.stopPropagation()}>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
          <p className="text-slate-400 text-sm mb-4">{message}</p>
          {promptInput && (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        </div>
        <div className="bg-slate-700/50 px-6 py-3 flex justify-end gap-3 rounded-b-lg">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-600 rounded-md hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            {onConfirm ? 'Cancel' : 'Close'}
          </button>
          {onConfirm && (
            <button
              onClick={handleConfirm}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;