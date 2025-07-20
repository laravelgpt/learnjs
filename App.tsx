



import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { File, Folder, FileSystemNode, Subject, Topic, ChatSession, Problem, Package, ModalState, EditorToolbarState, EditorAIAction, LearningContent, TerminalSession } from './types';
import { DEFAULT_FILESYSTEM, LEARNING_CONTENT, INITIAL_TERMINAL } from './constants';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import EditorPanel from './components/EditorPanel';
import RightPanel from './components/RightPanel';
import BottomPanel from './components/BottomPanel';
import Modal from './components/Modal';
import Resizer from './components/Resizer';
import { startChat, getAiFix, findProblemsInCode, executeNodeCode, formatCode, generateCode, editCode } from './services/geminiService';
import JSZip from 'jszip';

// Utility to add unique IDs to the initial file system
const addIdsToFS = (nodes: any[]): FileSystemNode[] => {
    return nodes.map(node => {
        const id = crypto.randomUUID();
        if (node.type === 'folder') {
            return { ...node, id, children: addIdsToFS(node.children) };
        }
        return { ...node, id };
    });
};

const getFileType = (fileName: string): string => {
    return fileName?.split('.').pop()?.toLowerCase() || '';
}

const initialFiles = addIdsToFS(DEFAULT_FILESYSTEM);

const findNodeById = (nodes: FileSystemNode[], nodeId: string): FileSystemNode | null => {
    for (const node of nodes) {
        if (node.id === nodeId) return node;
        if (node.type === 'folder') {
            const found = findNodeById(node.children, nodeId);
            if (found) return found;
        }
    }
    return null;
}

const findFileByName = (nodes: FileSystemNode[], name: string): File | null => {
    for (const node of nodes) {
      if (node.type === 'file' && node.name === name) {
        return node;
      }
      if (node.type === 'folder') {
        const found = findFileByName(node.children, name);
        if (found) return found;
      }
    }
    return null;
};

const getBoilerplateForFile = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();

  // Special case for package.json
  if (fileName === 'package.json') {
    return `{
  "name": "my-new-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {}
}`;
  }

  switch (extension) {
    case 'html':
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello, World!</h1>
  <script src="script.js"></script>
</body>
</html>`;
    case 'css':
      return `body {
  font-family: sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f0f0f0;
}

h1 {
  color: #333;
}`;
    case 'js':
      return `console.log("Hello from ${fileName}!");

// Example function
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');`;
    case 'ts':
      return `console.log("Hello from ${fileName}!");

// Example function with types
function greet(name: string): void {
  console.log(\`Hello, \${name}!\`);
}

greet('World');`;
    case 'json':
      return `{
  "key": "value"
}`;
    default:
      return `// New file: ${fileName}\n`;
  }
};


const findFirstFile = (nodes: FileSystemNode[]): File | null => {
    for (const node of nodes) {
        if (node.type === 'file' && node.name !== 'package.json') return node;
        if (node.type === 'folder') {
            const file = findFirstFile(node.children);
            if (file) return file;
        }
    }
    return null;
};

const initialActiveFile = findFirstFile(initialFiles);

// --- Constants for Panel Sizes ---
const MIN_EDITOR_WIDTH = 300;
const MIN_EDITOR_HEIGHT = 200;

const MINIMIZED_LEFT_WIDTH = 64;
const MINIMIZED_RIGHT_WIDTH = 56;
const MINIMIZED_BOTTOM_HEIGHT = 44; // Height of the tab bar

const isDesktop = () => window.innerWidth >= 1024;

const App: React.FC = () => {
  const processedLessons = useMemo(() => {
    const newLessons: LearningContent = JSON.parse(JSON.stringify(LEARNING_CONTENT)); // Deep copy to avoid mutating constant
    const extensionMap: { [key: string]: 'html' | 'css' | 'js' | 'ts' } = {
        html: 'html',
        css: 'css',
        javascript: 'js',
        typescript: 'ts',
    };
    for (const key in newLessons) {
        if (Object.prototype.hasOwnProperty.call(newLessons, key)) {
            const subjectKey = key as keyof LearningContent;
            if (extensionMap[subjectKey]) {
                newLessons[subjectKey].forEach(subject => {
                    subject.topics.forEach(topic => {
                        topic.fileType = extensionMap[subjectKey];
                    });
                });
            }
        }
    }
    return newLessons;
  }, []);

  const [files, setFiles] = useState<FileSystemNode[]>(initialFiles);
  const [lessons, setLessons] = useState<LearningContent>(processedLessons);
  
  const [activeFile, setActiveFile] = useState<File | null>(initialActiveFile);
  const [previewFiles, setPreviewFiles] = useState<FileSystemNode[] | null>(null);

  const [code, setCode] = useState<string>(activeFile?.content || '// Select a file to start editing');
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const [problems, setProblems] = useState<Problem[]>([]);
  const [bottomTab, setBottomTab] = useState<'problems' | 'terminal'>('terminal');

  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, title: '', message: ''});
  const [editorToolbar, setEditorToolbar] = useState<EditorToolbarState>({ isOpen: false, top: 0, left: 0, selection: null });

  // Panel State
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(isDesktop());
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(isDesktop());
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(true);
  const [isPreviewFullScreen, setIsPreviewFullScreen] = useState(false);

  const [leftPanelWidth, setLeftPanelWidth] = useState(288);
  const [rightPanelWidth, setRightPanelWidth] = useState(448);
  const [bottomPanelHeight, setBottomPanelHeight] = useState(isDesktop() ? 256 : MINIMIZED_BOTTOM_HEIGHT);
  
  const prevPanelSizes = useRef({ left: 288, right: 448, bottom: 256 });
  const [resizingDirection, setResizingDirection] = useState<'horizontal' | 'vertical' | null>(null);


  // Terminal State
  const initialSessionId = useMemo(() => crypto.randomUUID(), []);
  const [terminalSessions, setTerminalSessions] = useState<TerminalSession[]>([
    { id: initialSessionId, title: 'Terminal 1', output: INITIAL_TERMINAL, history: '' }
  ]);
  const [activeTerminalId, setActiveTerminalId] = useState<string>(initialSessionId);
  const terminalCounter = useRef(1);


  const packages = useMemo<Package[]>(() => {
    const packageJsonFile = findFileByName(files, 'package.json');
    if (!packageJsonFile) return [];
    try {
        const pkgJson = JSON.parse(packageJsonFile.content);
        const deps = pkgJson.dependencies || {};
        const devDeps = pkgJson.devDependencies || {};
        const allDeps = {...deps, ...devDeps};
        return Object.entries(allDeps).map(([name, version]) => ({ name, version: version as string }));
    } catch (e) {
        console.error("Error parsing package.json:", e);
        return [];
    }
  }, [files]);
  
  const handleCloseModal = () => {
      setModalState(prev => ({ ...prev, isOpen: false }));
  }

  const isRunnable = activeFile ? getFileType(activeFile.name) === 'js' : false;

  // Auto-detect syntax errors on code change
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!activeFile || !code) return;

      const fileType = getFileType(activeFile.name);
      const supportedFileTypes = ['js', 'html', 'css', 'json'];

      if (!supportedFileTypes.includes(fileType)) {
          setProblems([]);
          return;
      }
      
      try {
        const validationResults = await findProblemsInCode(code, fileType);
        if (validationResults.length > 0) {
            const newProblems: Problem[] = validationResults
              .filter(p => p && p.message && p.fileType && p.severity)
              .map(p => ({
                id: crypto.randomUUID(),
                message: p.message,
                fileType: p.fileType,
                severity: p.severity,
                line: p.line,
                explanation: '',
                fixedCode: '',
                status: 'idle',
            }));
            setProblems(newProblems);
            if (newProblems.some(p => p.severity === 'error')) {
                setBottomTab('problems');
            }
        } else {
            setProblems([]);
        }
      } catch (e) {
        console.error("AI problem detection failed:", e);
        setProblems([]);
      }
    }, 1000); // Debounce for 1s

    return () => {
      clearTimeout(handler);
    };
  }, [code, activeFile]);


  const handleFileSelect = useCallback((file: File) => {
    setActiveFile(file);
    setCode(file.content);
    setPreviewFiles(null); // Clear topic-specific preview
    setEditorToolbar(prev => ({ ...prev, isOpen: false }));
    if(!isDesktop()) setIsLeftPanelOpen(false);
  }, []);

  const handleTopicSelect = useCallback((topic: Topic) => {
    const fileExtension = topic.fileType || 'js';
    const topicFile: File = {
        id: `topic-${topic.title.replace(/\s+/g, '-')}`,
        type: 'file',
        name: `${topic.title}.${fileExtension}`,
        content: topic.content,
    };
    setActiveFile(topicFile);
    setCode(topic.content);
    setEditorToolbar(prev => ({ ...prev, isOpen: false }));

    if (topic.projectFiles) {
        setPreviewFiles(addIdsToFS(topic.projectFiles));
    } else {
        setPreviewFiles(null);
    }

    if(!isDesktop()) setIsLeftPanelOpen(false);
  }, []);

  const initChat = useCallback(() => {
    if (!chatSession) {
      const newChat = startChat();
      setChatSession({
        chat: newChat,
        history: [{ sender: 'ai', text: 'Hello! I am your AI assistant. How can I help you with JavaScript today?' }],
      });
      return newChat;
    }
    return chatSession.chat;
  }, [chatSession]);

  const handleSendMessage = useCallback(async (message: string) => {
    setIsAiLoading(true);
    const currentChat = initChat();
    
    setChatSession(prev => prev ? {
        ...prev,
        history: [...prev.history, { sender: 'user', text: message }]
    } : null);

    try {
        const stream = await currentChat.sendMessageStream({ message });
        
        let aiResponse = '';
        setChatSession(prev => prev ? {
            ...prev,
            history: [...prev.history, { sender: 'ai', text: '' }]
        } : null);

        for await (const chunk of stream) {
            aiResponse += chunk.text;
            setChatSession(prev => {
                if (!prev) return null;
                const newHistory = [...prev.history];
                newHistory[newHistory.length - 1] = { sender: 'ai', text: aiResponse };
                return { ...prev, history: newHistory };
            });
        }
    } catch (error) {
        console.error("AI chat error:", error);
        setChatSession(prev => {
            if (!prev) return null;
            const newHistory = [...prev.history];
            newHistory[newHistory.length - 1] = { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
            return { ...prev, history: newHistory };
        });
    } finally {
        setIsAiLoading(false);
    }
  }, [initChat, chatSession]);
  
  const handleCodeUpdate = (newCode: string, fileIdToUpdate?: string) => {
    const targetFileId = fileIdToUpdate || activeFile?.id;
    if (!targetFileId) return;

    if (targetFileId === activeFile?.id) {
        setCode(newCode); // Update editor immediately
    }
    
    if (!targetFileId.startsWith('topic-')) {
        const updatedFile = { ...findNodeById(files, targetFileId), content: newCode } as File;
        if(targetFileId === activeFile?.id) {
            setActiveFile(updatedFile);
        }

        const updateFileInTree = (nodes: FileSystemNode[]): FileSystemNode[] => {
            return nodes.map(node => {
                if (node.id === targetFileId && node.type === 'file') {
                    return { ...node, content: newCode };
                }
                if (node.type === 'folder') {
                    return { ...node, children: updateFileInTree(node.children) };
                }
                return node;
            });
        };
        setFiles(currentFiles => updateFileInTree(currentFiles));
    }
  }

  const handleDeleteNode = useCallback((nodeId: string) => {
    const nodeToDelete = findNodeById(files, nodeId);
    if (!nodeToDelete) return;

    setModalState({
        isOpen: true,
        title: `Delete ${nodeToDelete.type}`,
        message: `Are you sure you want to delete "${nodeToDelete.name}"? This action cannot be undone.`,
        onConfirm: () => {
             const removeNode = (nodes: FileSystemNode[]): FileSystemNode[] => {
                return nodes.filter(node => node.id !== nodeId).map(node => {
                    if (node.type === 'folder') {
                        return { ...node, children: removeNode(node.children) };
                    }
                    return node;
                });
            };
            setFiles(currentFiles => removeNode(currentFiles));
            if (activeFile?.id === nodeId) {
                setActiveFile(null);
                setCode('// Select a file to start editing');
            }
            handleCloseModal();
        },
        onCancel: handleCloseModal,
    });
  }, [files, activeFile]);

  const handleRenameNode = useCallback((nodeId: string, newName: string) => {
      const rename = (nodes: FileSystemNode[]): FileSystemNode[] => {
          return nodes.map(node => {
              if (node.id === nodeId) {
                  return { ...node, name: newName };
              }
              if (node.type === 'folder') {
                  return { ...node, children: rename(node.children) };
              }
              return node;
          });
      };
      setFiles(currentFiles => rename(currentFiles));
      if (activeFile?.id === nodeId) {
          setActiveFile(prev => prev ? { ...prev, name: newName } : null);
      }
  }, [activeFile]);

  const handleCreateNode = useCallback((parentId: string | null, type: 'file' | 'folder', name: string) => {
      const newNode: FileSystemNode = type === 'file'
        ? { id: crypto.randomUUID(), type: 'file', name, content: getBoilerplateForFile(name) }
        : { id: crypto.randomUUID(), type: 'folder', name, children: [] };
      if (parentId === null) {
          setFiles(currentFiles => [...currentFiles, newNode]);
          return;
      }
      const addNode = (nodes: FileSystemNode[]): FileSystemNode[] => {
          return nodes.map(node => {
              if (node.id === parentId && node.type === 'folder') {
                  return { ...node, children: [...node.children, newNode] };
              }
              if (node.type === 'folder') {
                  return { ...node, children: addNode(node.children) };
              }
              return node;
          });
      };
      setFiles(currentFiles => addNode(currentFiles));
  }, []);

  const handleRunCode = () => {
    if (!isRunnable || !isBottomPanelOpen) return;
    
    let output = `> Running ${activeFile?.name || 'script'}...\n\n`;
    setProblems([]);
    const customConsole = {
        log: (...args: any[]) => {
            output += args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ') + '\n';
        },
        error: (...args: any[]) => { output += `❌ ERROR: ${args.map(String).join(' ')}\n`; },
        warn: (...args: any[]) => { output += `⚠️ WARN: ${args.map(String).join(' ')}\n`; }
    };

    try {
        const userCodeRunner = new Function('console', code);
        userCodeRunner(customConsole);
    } catch (error: any) {
        const newProblem: Problem = {
            id: crypto.randomUUID(),
            message: error.message,
            fileType: 'js',
            explanation: '',
            fixedCode: '',
            status: 'idle',
            severity: 'error',
        };
        setProblems([newProblem]);
        setBottomTab('problems');
        output += `💥 Uncaught Exception: ${error.message}\n`;
    }

    output += `\n> Execution finished.`;
    setTerminalSessions(sessions => sessions.map(s => s.id === activeTerminalId ? {...s, output: s.output + `\n\n${output}`} : s));
    if (problems.length === 0) {
       setBottomTab('terminal');
    }
  };
  
  const handleTerminalCommand = async (command: string) => {
    if (!activeTerminalId || !isBottomPanelOpen) return;

    const activeSession = terminalSessions.find(s => s.id === activeTerminalId);
    if (!activeSession) return;

    const commandPrompt = `\n\n$ ${command}\n`;
    setTerminalSessions(currentSessions =>
      currentSessions.map(s =>
        s.id === activeTerminalId
          ? { ...s, output: s.output + commandPrompt }
          : s
      )
    );

    try {
        const result = await executeNodeCode(activeSession.history, command, packages);
        
        if (result.packageChanges && result.packageChanges.length > 0) {
            const packageJsonFile = findFileByName(files, 'package.json');
            if (packageJsonFile) {
                try {
                    const pkgJson = JSON.parse(packageJsonFile.content);
                    pkgJson.dependencies = pkgJson.dependencies || {};
                    for (const change of result.packageChanges) {
                        if (change.action === 'add') {
                            pkgJson.dependencies[change.name] = change.version;
                        } else if (change.action === 'remove') {
                            delete pkgJson.dependencies[change.name];
                        }
                    }
                    handleCodeUpdate(JSON.stringify(pkgJson, null, 2), packageJsonFile.id);
                } catch (e) {
                     console.error("Could not update package.json", e);
                }
            }
        }

        let newOutput = '';
        if (result.stdout) newOutput += result.stdout;
        if (result.stderr) newOutput += `💥 ${result.stderr}\n`;
        if (result.result !== 'undefined' && result.result && !result.stdout.includes(result.result)) {
            newOutput += `=> ${result.result}\n`;
        }

        const newHistoryEntry = `> ${command}\n${newOutput}`;
        setTerminalSessions(currentSessions => currentSessions.map(s => 
          s.id === activeTerminalId 
            ? {...s, output: s.output + newOutput, history: s.history + '\n' + newHistoryEntry}
            : s
        ));

    } catch (e: any) {
        const errorMsg = `💥 Failed to execute command: ${e.message}\n`;
        const newHistoryEntry = `> ${command}\n${errorMsg}`;
         setTerminalSessions(currentSessions => currentSessions.map(s => 
          s.id === activeTerminalId 
            ? {...s, output: s.output + errorMsg, history: s.history + '\n' + newHistoryEntry}
            : s
        ));
    }
  };
  
  const handleClearTerminal = () => {
    if(!activeTerminalId) return;
    setTerminalSessions(sessions => sessions.map(s => s.id === activeTerminalId ? {...s, output: INITIAL_TERMINAL, history: ''} : s));
  };

  const handleNewTerminal = () => {
    terminalCounter.current++;
    const newSession: TerminalSession = {
      id: crypto.randomUUID(),
      title: `Terminal ${terminalCounter.current}`,
      output: INITIAL_TERMINAL,
      history: ''
    };
    setTerminalSessions(sessions => [...sessions, newSession]);
    setActiveTerminalId(newSession.id);
    setBottomTab('terminal');
    if (!isBottomPanelOpen) setIsBottomPanelOpen(true);
  };

  const handleCloseTerminal = (idToClose: string) => {
    const sessionIndex = terminalSessions.findIndex(s => s.id === idToClose);
    if (sessionIndex === -1) return;

    const newSessions = terminalSessions.filter(s => s.id !== idToClose);
    
    if (activeTerminalId === idToClose) {
      if (newSessions.length > 0) {
        const newActiveIndex = Math.max(0, sessionIndex - 1);
        setActiveTerminalId(newSessions[newActiveIndex].id);
      } else {
        setActiveTerminalId('');
      }
    }
    setTerminalSessions(newSessions);
    if(newSessions.length === 0) setIsBottomPanelOpen(false);
  };

  const handleInstallDependencies = useCallback(() => {
    const packageJsonFile = findFileByName(files, 'package.json');
    if (!packageJsonFile) {
        setModalState({ isOpen: true, title: 'Error', message: 'No package.json file found.', onCancel: handleCloseModal });
        return;
    }
    try {
        if (!isBottomPanelOpen) setIsBottomPanelOpen(true);
        const pkgJson = JSON.parse(packageJsonFile.content);
        const deps = Object.keys(pkgJson.dependencies || {});
        const devDeps = Object.keys(pkgJson.devDependencies || {});
        const allDeps = [...deps, ...devDeps];
        if (allDeps.length === 0) {
            setModalState({ isOpen: true, title: 'No Dependencies', message: 'There are no dependencies to install.', onCancel: handleCloseModal });
            return;
        }
        const command = `npm install ${allDeps.join(' ')}`;
        setBottomTab('terminal');
        handleTerminalCommand(command);

    } catch (e: any) {
        setModalState({ isOpen: true, title: 'Error', message: `Could not parse package.json: ${e.message}`, onCancel: handleCloseModal });
    }

  }, [files, isBottomPanelOpen, handleTerminalCommand]);

  const handleToggleBottomPanel = () => {
    if (isBottomPanelOpen) {
      if (bottomPanelHeight > MINIMIZED_BOTTOM_HEIGHT) {
        handleToggleMinimizeBottom();
      } else {
        setIsBottomPanelOpen(false);
      }
    } else {
      setIsBottomPanelOpen(true);
      setBottomPanelHeight(prevPanelSizes.current.bottom);
    }
  };

  const handleNewFile = useCallback(() => {
    setModalState({
        isOpen: true,
        title: 'Create New File',
        message: 'Enter the name for the new file:',
        onConfirm: (fileName?: string) => {
            if (fileName && fileName.trim()) {
                handleCreateNode(null, 'file', fileName.trim());
            }
            handleCloseModal();
        },
        onCancel: handleCloseModal,
        promptInput: true
    });
  }, [handleCreateNode]);

  const handleShowExample = useCallback(() => {
    const exampleSubject = lessons.javascript.find(s => s.name === 'JavaScript Fundamentals');
    const exampleTopic = exampleSubject?.topics.find(t => t.title === 'Variables (let, const, var)');
    if (exampleTopic) {
      handleTopicSelect(exampleTopic);
    }
  }, [handleTopicSelect, lessons]);

  const handleExportProject = async () => {
    const zip = new JSZip();
    const srcFolder = zip.folder('src');
    if (!srcFolder) {
      setModalState({ isOpen: true, title: 'Export Error', message: 'Could not create project folder.', onCancel: handleCloseModal });
      return;
    }
    
    const addFolderToZip = (nodes: FileSystemNode[], folder: JSZip) => {
      nodes.forEach(node => {
        if (node.type === 'folder') {
          const childFolder = folder.folder(node.name);
          if (childFolder) addFolderToZip(node.children, childFolder);
        } else {
          folder.file(node.name, node.content);
        }
      });
    };
    addFolderToZip(files, srcFolder);

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'js-learn-studio-project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Failed to export project:", e);
      setModalState({ isOpen: true, title: 'Export Error', message: 'An unexpected error occurred while exporting the project.', onCancel: handleCloseModal });
    }
  };

  const handleImportProject = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.zip';
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;
      const file = target.files[0];
      
      setModalState({
        isOpen: true,
        title: 'Confirm Import',
        message: `Are you sure you want to import "${file.name}"? This will replace your current workspace.`,
        onConfirm: async () => {
          handleCloseModal();
          await loadZipFile(file);
        },
        onCancel: handleCloseModal
      });
    };
    input.click();
  };

  const loadZipFile = async (file: globalThis.File) => {
      const zip = new JSZip();
      try {
        const content = await zip.loadAsync(file);
        
        const srcFolder = content.folder('src');
        if (!srcFolder) {
            throw new Error("Zip file does not contain a 'src' directory.");
        }

        const readFile = async (entry: JSZip.JSZipObject): Promise<File> => ({
          id: crypto.randomUUID(),
          type: 'file',
          name: entry.name.split('/').pop()!,
          content: await entry.async('string'),
        });
        
        const buildFS = async (currentFolder: JSZip, path: string): Promise<FileSystemNode[]> => {
            const nodes: FileSystemNode[] = [];
            const promises: Promise<void>[] = [];
            
            currentFolder.forEach((relativePath, zipEntry) => {
                if (zipEntry.name.startsWith(path) && zipEntry.name.replace(path, '').split('/').filter(p => p).length === 1) {
                    if (zipEntry.dir) {
                        promises.push(
                            buildFS(currentFolder, zipEntry.name).then(children => {
                                nodes.push({
                                    id: crypto.randomUUID(),
                                    type: 'folder',
                                    name: zipEntry.name.replace(path, '').replace(/\/$/, ''),
                                    children,
                                });
                            })
                        );
                    } else {
                       promises.push(
                           readFile(zipEntry).then(file => {
                               nodes.push(file)
                           })
                       );
                    }
                }
            });

            await Promise.all(promises);
            return nodes.sort((a,b) => a.name.localeCompare(b.name));
        }

        const fileSystem = await buildFS(srcFolder, 'src/');

        setFiles(fileSystem);
        const firstFile = findFirstFile(fileSystem);
        setActiveFile(firstFile);
        setCode(firstFile?.content || '// Project imported.');
        setTerminalSessions([
          { id: crypto.randomUUID(), title: 'Terminal 1', output: INITIAL_TERMINAL, history: '' }
        ]);
        setProblems([]);
        setModalState({ isOpen: true, title: 'Success', message: 'Project imported successfully!', onCancel: handleCloseModal });

      } catch (e: any) {
        console.error("Failed to import project:", e);
        setModalState({ isOpen: true, title: 'Import Error', message: `Could not import project: ${e.message}`, onCancel: handleCloseModal });
      }
  }

  const updateProblem = (id: string, updates: Partial<Problem>) => {
    setProblems(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleRequestFix = async (problemId: string, autoApply: boolean = false) => {
    const problem = problems.find(p => p.id === problemId);
    if (!problem) return;

    updateProblem(problemId, { status: autoApply ? 'loading-fix' : 'loading-explanation' });
    try {
        const fix = await getAiFix(code, problem.message, problem.fileType);
        if (autoApply) {
            handleCodeUpdate(fix.fixedCode, activeFile?.id);
            updateProblem(problemId, { ...fix, status: 'fixed' });
        } else {
            updateProblem(problemId, { ...fix, status: 'idle' });
        }
    } catch (error) {
        console.error("AI fix error:", error);
        updateProblem(problemId, { status: 'error-fixing' });
    }
  };
  
  const handleApplyFix = (problemId: string) => {
    const problem = problems.find(p => p.id === problemId);
    if (problem && problem.fixedCode) {
        handleCodeUpdate(problem.fixedCode, activeFile?.id);
        updateProblem(problemId, { status: 'fixed' });
    }
  };
  
  // Editor AI Features
  const handleFormatCode = async () => {
    if (!activeFile) return;
    try {
      const formattedCode = await formatCode(code, getFileType(activeFile.name));
      handleCodeUpdate(formattedCode);
    } catch(e) {
      console.error("Failed to format code:", e);
      setModalState({isOpen: true, title: "Format Error", message: "Could not format the code.", onCancel: handleCloseModal});
    }
  }

  const handleGenerateCode = async (cursorPosition: number) => {
    setModalState({
      isOpen: true,
      title: "Write Code with AI",
      message: "Describe the code you want to generate (e.g., 'a function that sorts an array of objects by name').",
      promptInput: true,
      onConfirm: async (prompt) => {
        handleCloseModal();
        if (!prompt || !activeFile) return;
        try {
          const generatedCode = await generateCode(prompt, getFileType(activeFile.name), code, cursorPosition);
          const newCode = code.slice(0, cursorPosition) + '\n' + generatedCode + '\n' + code.slice(cursorPosition);
          handleCodeUpdate(newCode);
        } catch (e) {
          console.error("Failed to generate code:", e);
          setModalState({isOpen: true, title: "AI Error", message: "Could not generate the code.", onCancel: handleCloseModal});
        }
      },
      onCancel: handleCloseModal,
    })
  }
  
  const handleEditCode = async (action: EditorAIAction) => {
    if (!editorToolbar.selection || !activeFile) return;
    
    const { start, end } = editorToolbar.selection;
    const selectedCode = code.slice(start, end);
    const fileType = getFileType(activeFile.name);
    
    setEditorToolbar(prev => ({...prev, isOpen: false}));

    try {
      const result = await editCode(selectedCode, fileType, action);
      if (action === 'explain') {
        setModalState({ isOpen: true, title: 'AI Code Explanation', message: result, onCancel: handleCloseModal });
      } else {
        const newCode = code.slice(0, start) + result + code.slice(end);
        handleCodeUpdate(newCode);
      }
    } catch (e) {
       console.error(`AI action '${action}' failed:`, e);
       setModalState({isOpen: true, title: "AI Error", message: `Could not perform AI action: ${action}`, onCancel: handleCloseModal});
    }
  }

  // --- Resizing & Panel Management Logic ---
  const mainContainerRef = useRef<HTMLDivElement>(null);
  
  const handleToggleMinimizeLeft = () => {
    if (leftPanelWidth > MINIMIZED_LEFT_WIDTH) {
      prevPanelSizes.current.left = leftPanelWidth;
      setLeftPanelWidth(MINIMIZED_LEFT_WIDTH);
    } else {
      setLeftPanelWidth(prevPanelSizes.current.left);
    }
  };

  const handleToggleMinimizeRight = () => {
    if (rightPanelWidth > MINIMIZED_RIGHT_WIDTH) {
      prevPanelSizes.current.right = rightPanelWidth;
      setRightPanelWidth(MINIMIZED_RIGHT_WIDTH);
    } else {
      setRightPanelWidth(prevPanelSizes.current.right);
    }
  };

  const handleToggleMinimizeBottom = () => {
    if (bottomPanelHeight > MINIMIZED_BOTTOM_HEIGHT) {
      prevPanelSizes.current.bottom = bottomPanelHeight;
      setBottomPanelHeight(MINIMIZED_BOTTOM_HEIGHT);
    } else {
      setBottomPanelHeight(prevPanelSizes.current.bottom);
    }
  };

  const handleTogglePreviewFullScreen = () => {
    setIsPreviewFullScreen(prev => {
        const enteringFullScreen = !prev;
        if (enteringFullScreen) {
            setIsRightPanelOpen(true);
            if (rightPanelWidth <= MINIMIZED_RIGHT_WIDTH) {
                setRightPanelWidth(prevPanelSizes.current.right);
            }
        }
        return enteringFullScreen;
    });
  };

  const handleLeftResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setResizingDirection('vertical');
    const startX = e.clientX;
    const startWidth = leftPanelWidth;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const newWidth = startWidth + dx;
      const containerWidth = mainContainerRef.current?.offsetWidth || window.innerWidth;
      const rightWidth = isRightPanelOpen ? rightPanelWidth : 0;
      
      if (newWidth > MINIMIZED_LEFT_WIDTH && containerWidth - newWidth - rightWidth > MIN_EDITOR_WIDTH) {
        setLeftPanelWidth(newWidth);
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setResizingDirection(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleRightResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setResizingDirection('vertical');
    const startX = e.clientX;
    const startWidth = rightPanelWidth;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = startX - moveEvent.clientX;
      const newWidth = startWidth + dx;
      const containerWidth = mainContainerRef.current?.offsetWidth || window.innerWidth;
      const leftWidth = isLeftPanelOpen ? leftPanelWidth : 0;
      
      if (newWidth > MINIMIZED_RIGHT_WIDTH && containerWidth - newWidth - leftWidth > MIN_EDITOR_WIDTH) {
        setRightPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setResizingDirection(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleBottomResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setResizingDirection('horizontal');
    const startY = e.clientY;
    const startHeight = bottomPanelHeight;
    const centerPanel = mainContainerRef.current?.querySelector('#center-panel') as HTMLElement;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dy = startY - moveEvent.clientY;
      const newHeight = startHeight + dy;
      const containerHeight = centerPanel?.offsetHeight || window.innerHeight;

      if (newHeight > MINIMIZED_BOTTOM_HEIGHT && containerHeight - newHeight > MIN_EDITOR_HEIGHT) {
        setBottomPanelHeight(newHeight);
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setResizingDirection(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };


  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-300 font-sans overflow-hidden">
      {resizingDirection && (
        <div 
          className={`fixed inset-0 z-50 ${resizingDirection === 'vertical' ? 'cursor-col-resize' : 'cursor-row-resize'}`}
        />
      )}
      <Header
        onRunCode={handleRunCode}
        isRunnable={isRunnable}
        onToggleLeftPanel={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
        onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
        onToggleBottomPanel={handleToggleBottomPanel}
        onNewFile={handleNewFile}
        onShowExample={handleShowExample}
        hasActiveFile={!!activeFile}
        onImportProject={handleImportProject}
        onExportProject={handleExportProject}
      />
      <main ref={mainContainerRef} className="flex flex-grow relative overflow-hidden">
        {isPreviewFullScreen ? (
           <div className="flex-grow">
              <RightPanel
                  files={previewFiles || files}
                  activeFile={activeFile}
                  messages={chatSession?.history || []}
                  isLoading={isAiLoading}
                  onSendMessage={handleSendMessage}
                  initChat={initChat}
                  isMinimized={false} // Not minimized in fullscreen
                  onToggleMinimize={() => {}} // No-op
                  onClose={handleTogglePreviewFullScreen} // Close exits fullscreen
                  isFullScreen={true}
                  onToggleFullScreen={handleTogglePreviewFullScreen}
              />
          </div>
        ) : (
          <>
            {/* Left Panel (Desktop) */}
            {isLeftPanelOpen && isDesktop() &&
              <div style={{ flexBasis: `${leftPanelWidth}px`}}>
                <LeftPanel
                  files={files}
                  lessons={lessons}
                  packages={packages}
                  onFileSelect={handleFileSelect}
                  onTopicSelect={handleTopicSelect}
                  activeFile={activeFile}
                  onCreateNode={handleCreateNode}
                  onRenameNode={handleRenameNode}
                  onDeleteNode={handleDeleteNode}
                  onInstallDependencies={handleInstallDependencies}
                  isMinimized={leftPanelWidth <= MINIMIZED_LEFT_WIDTH}
                  onToggleMinimize={handleToggleMinimizeLeft}
                  onClose={() => setIsLeftPanelOpen(false)}
                />
              </div>
            }
            {isLeftPanelOpen && isDesktop() && <Resizer direction="vertical" onMouseDown={handleLeftResize} isVisibleOnDesktop={true} />}

            {/* Center Content */}
            <div id="center-panel" className="flex flex-col flex-grow overflow-hidden">
              <div className="flex-grow overflow-hidden">
                 <EditorPanel 
                    fileName={activeFile?.name || 'Untitled'} 
                    code={code} 
                    onCodeChange={(newCode) => {
                        handleCodeUpdate(newCode);
                        setEditorToolbar(prev => ({...prev, isOpen: false}));
                    }}
                    onInstallDependencies={handleInstallDependencies}
                    onFormatCode={handleFormatCode}
                    onGenerateCode={handleGenerateCode}
                    onEditCode={handleEditCode}
                    onSelectionChange={setEditorToolbar}
                    toolbarState={editorToolbar}
                 />
              </div>
              {isBottomPanelOpen && <Resizer direction="horizontal" onMouseDown={handleBottomResize} isVisibleOnDesktop={true}/>}
              {isBottomPanelOpen &&
                <div style={{ height: `${bottomPanelHeight}px` }}>
                   <BottomPanel 
                      problems={problems} 
                      terminalSessions={terminalSessions}
                      activeTerminalId={activeTerminalId}
                      activeTab={bottomTab}
                      onTabChange={setBottomTab}
                      onRequestFix={handleRequestFix}
                      onApplyFix={handleApplyFix}
                      onTerminalCommand={handleTerminalCommand}
                      onClearTerminal={handleClearTerminal}
                      onNewTerminal={handleNewTerminal}
                      onCloseTerminal={handleCloseTerminal}
                      onSwitchTerminal={setActiveTerminalId}
                      isMinimized={bottomPanelHeight <= MINIMIZED_BOTTOM_HEIGHT}
                      onToggleMinimize={handleToggleMinimizeBottom}
                      onClose={() => setIsBottomPanelOpen(false)}
                    />
                </div>
              }
            </div>

            {/* Right Panel (Desktop) */}
            {isRightPanelOpen && isDesktop() && <Resizer direction="vertical" onMouseDown={handleRightResize} isVisibleOnDesktop={true}/>}
            {isRightPanelOpen && isDesktop() &&
                <div style={{ flexBasis: `${rightPanelWidth}px` }}>
                  <RightPanel
                      files={previewFiles || files}
                      activeFile={activeFile}
                      messages={chatSession?.history || []}
                      isLoading={isAiLoading}
                      onSendMessage={handleSendMessage}
                      initChat={initChat}
                      isMinimized={rightPanelWidth <= MINIMIZED_RIGHT_WIDTH}
                      onToggleMinimize={handleToggleMinimizeRight}
                      onClose={() => setIsRightPanelOpen(false)}
                      isFullScreen={false}
                      onToggleFullScreen={handleTogglePreviewFullScreen}
                  />
                </div>
            }
          </>
        )}

        {/* Mobile Overlays */}
        {!isPreviewFullScreen && !isDesktop() && (
          <>
            <div className={`fixed top-0 left-0 z-40 h-full w-full max-w-xs sm:max-w-sm bg-slate-800 transition-transform duration-300 ease-in-out ${isLeftPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <LeftPanel
                files={files}
                lessons={lessons}
                packages={packages}
                onFileSelect={handleFileSelect}
                onTopicSelect={handleTopicSelect}
                activeFile={activeFile}
                onCreateNode={handleCreateNode}
                onRenameNode={handleRenameNode}
                onDeleteNode={handleDeleteNode}
                onInstallDependencies={handleInstallDependencies}
                isMinimized={false} // Minimize not applicable on mobile overlay
                onToggleMinimize={() => {}}
                onClose={() => setIsLeftPanelOpen(false)}
              />
            </div>

             <div className={`fixed top-0 right-0 h-full w-full sm:max-w-md z-40 bg-slate-800 transition-transform duration-300 ease-in-out ${isRightPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <RightPanel
                files={previewFiles || files}
                activeFile={activeFile}
                messages={chatSession?.history || []}
                isLoading={isAiLoading}
                onSendMessage={handleSendMessage}
                initChat={initChat}
                isMinimized={false} // Minimize not applicable on mobile overlay
                onToggleMinimize={() => {}}
                onClose={() => setIsRightPanelOpen(false)}
              />
            </div>
            
            {(isLeftPanelOpen || isRightPanelOpen) && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 transition-opacity"
                    onClick={() => {
                      setIsLeftPanelOpen(false);
                      setIsRightPanelOpen(false);
                    }}
                />
            )}
          </>
        )}
      </main>
       <Modal
          isOpen={modalState.isOpen}
          title={modalState.title}
          message={modalState.message}
          onConfirm={modalState.onConfirm}
          onCancel={modalState.onCancel || handleCloseModal}
          promptInput={modalState.promptInput}
      />
    </div>
  );
};

export default App;