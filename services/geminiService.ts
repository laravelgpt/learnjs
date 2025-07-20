import { GoogleGenAI, Chat, Type } from '@google/genai';
import { Problem, Package, TerminalExecutionResult, EditorAIAction } from './types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = 'gemini-2.5-flash';

const getLanguageName = (fileType: string): string => {
    const languageMap: { [key: string]: string } = {
        js: 'JavaScript',
        ts: 'TypeScript',
        tsx: 'TypeScript (React)',
        css: 'CSS',
        html: 'HTML',
        json: 'JSON',
    };
    return languageMap[fileType] || 'code';
};

export const startChat = (): Chat => {
  return ai.chats.create({
    model,
    config: {
      systemInstruction: 'You are a friendly and expert JavaScript programming assistant. You help users understand code, fix bugs, and learn new concepts. Provide clear, concise explanations and code examples where appropriate. Format your code snippets using markdown.',
    },
  });
};

export const findProblemsInCode = async (code: string, fileType: string): Promise<Omit<Problem, 'id' | 'explanation' | 'fixedCode' | 'status'>[]> => {
  const language = getLanguageName(fileType);

  const response = await ai.models.generateContent({
    model: model,
    contents: `Act as an expert code reviewer and linter. Analyze the following ${language} code. Identify any errors, warnings for potential bugs or bad practices, and informational suggestions for code quality. Provide the line number for each issue. If there are no issues, return an empty array.

Code:
\`\`\`${fileType}
${code}
\`\`\``,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                line: { type: Type.NUMBER, description: "The line number where the issue occurs." },
                severity: { type: Type.STRING, description: "The severity of the issue: 'error', 'warning', or 'info'." },
                message: { type: Type.STRING, description: "A concise description of the issue." },
            },
            required: ["line", "severity", "message"],
        }
      }
    }
  });
  
  const jsonStr = response.text.trim();
  try {
    const results = JSON.parse(jsonStr);
    return results.map((r: any) => ({ ...r, fileType }));
  } catch (e) {
    console.error("Failed to parse AI validation response:", jsonStr, e);
    return [];
  }
};

export const executeNodeCode = async (history: string, command: string, packages: Package[]): Promise<TerminalExecutionResult> => {
  const response = await ai.models.generateContent({
    model: model,
    contents: `You are a sandboxed Node.js REPL environment with access to all public npm packages.
The user will provide the session history, a list of currently installed packages, and a new command.
Execute the new command within the context of the history and installed packages, then return the output.
You can handle require() and dynamic import() for any public npm package.
Maintain variable state between commands.

The following packages are already installed and available:
${JSON.stringify(packages, null, 2)}

You must handle npm commands: 'install', 'update', 'uninstall'.
If an npm command is used, populate the 'packageChanges' array in your response.
- For 'install' or 'update', use the action 'add' and find the latest version of the package.
- For 'uninstall', use the action 'remove'. The version can be an empty string.

Session History:
${history || '(empty)'}

New Command:
${command}
`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          stdout: { type: Type.STRING, description: "Content written to standard output (e.g., console.log)." },
          stderr: { type: Type.STRING, description: "Content written to standard error (e.g., exceptions)." },
          result: { type: Type.STRING, description: "The return value of the executed command, or 'undefined'." },
          packageChanges: {
            type: Type.ARRAY,
            description: "A list of packages that were added or removed.",
            items: {
                type: Type.OBJECT,
                properties: {
                    action: { type: Type.STRING, description: "The action: 'add' or 'remove'."},
                    name: { type: Type.STRING, description: "The name of the npm package."},
                    version: { type: Type.STRING, description: "The version of the package."}
                },
                required: ["action", "name", "version"]
            }
          }
        },
        required: ["stdout", "stderr", "result"],
      },
    },
  });

  const jsonStr = response.text.trim();
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse AI terminal response:", jsonStr, e);
    return {
      stdout: "",
      stderr: "Error: AI response was not valid JSON.",
      result: "undefined"
    };
  }
};

export const getAiFix = async (code: string, errorMessage: string, fileType: string): Promise<{ explanation: string, fixedCode: string }> => {
  const language = getLanguageName(fileType);
  
  const response = await ai.models.generateContent({
    model: model,
    contents: `Analyze the following ${language} code and the error it produced. Explain the bug and provide the complete, corrected code.

Error: "${errorMessage}"

Code:
\`\`\`${fileType}
${code}
\`\`\``,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          explanation: {
            type: Type.STRING,
            description: "A short explanation of the error and how the fix corrects it."
          },
          fixedCode: {
            type: Type.STRING,
            description: "The full, corrected code."
          }
        },
        required: ["explanation", "fixedCode"]
      }
    }
  });

  const jsonStr = response.text.trim();
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse AI fix response:", jsonStr);
    throw new Error("AI did not return a valid JSON object for the fix.");
  }
};

export const formatCode = async (code: string, fileType: string): Promise<string> => {
    const language = getLanguageName(fileType);
    const response = await ai.models.generateContent({
        model: model,
        contents: `Format the following ${language} code according to industry best practices (e.g., indentation, spacing). Only return the formatted code, without any explanation or markdown formatting.

Code:
${code}`
    });
    return response.text.trim();
};

export const generateCode = async (prompt: string, fileType: string, existingCode: string, cursorPos: number): Promise<string> => {
    const language = getLanguageName(fileType);
    const codeBeforeCursor = existingCode.slice(0, cursorPos);
    const codeAfterCursor = existingCode.slice(cursorPos);

    const response = await ai.models.generateContent({
        model: model,
        contents: `Act as an expert ${language} developer. Your task is to write a block of code based on the user's prompt.
You are given the existing code in the file, with a marker "<--CURSOR-->" indicating where the new code should be inserted.
The new code should be contextually appropriate and fit seamlessly with the surrounding code.
Only return the raw code for insertion, without any explanation or markdown formatting.

Prompt: "${prompt}"

Existing Code:
\`\`\`${fileType}
${codeBeforeCursor}<--CURSOR-->${codeAfterCursor}
\`\`\``
    });
    return response.text.trim();
};

export const editCode = async (code: string, fileType: string, action: EditorAIAction): Promise<string> => {
    const language = getLanguageName(fileType);
    let promptAction = '';
    switch(action) {
        case 'refactor':
            promptAction = 'Refactor the following code for clarity, performance, and best practices.';
            break;
        case 'comment':
            promptAction = 'Add comments to the following code to explain its functionality. If the code is simple, add a single block comment at the top.';
            break;
        case 'explain':
            promptAction = 'Explain the following code snippet. Describe its purpose, how it works, and its main components in a clear, concise way.';
            break;
    }
    
    const response = await ai.models.generateContent({
        model: model,
        contents: `${promptAction}

Code to analyze:
\`\`\`${fileType}
${code}
\`\`\`
${(action === 'explain') ? 
    'Your response should be a natural language explanation.' : 
    'Only return the modified code block, without any explanation or markdown formatting.'
}`
    });
    
    return response.text.trim();
};