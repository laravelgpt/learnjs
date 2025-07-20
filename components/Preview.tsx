import React, { useMemo } from 'react';
import { FileSystemNode, File } from '../types';

interface PreviewProps {
  activeFile: File | null;
  files: FileSystemNode[];
}

const findFileByName = (nodes: FileSystemNode[], fileName: string): File | null => {
  for (const node of nodes) {
    if (node.type === 'file' && node.name === fileName) {
      return node;
    }
    if (node.type === 'folder') {
      const found = findFileByName(node.children, fileName);
      if (found) return found;
    }
  }
  return null;
};

const getFileType = (fileName: string): string => {
    return fileName?.split('.').pop()?.toLowerCase() || '';
}

const Preview: React.FC<PreviewProps> = ({ activeFile, files }) => {
  const srcDoc = useMemo(() => {
    if (!activeFile) {
        return '<!DOCTYPE html><html><body><h1>Select a file to preview</h1></body></html>';
    }

    const fileType = getFileType(activeFile.name);
    const isTopic = activeFile.id.startsWith('topic-');
    const isReactFramework = fileType === 'tsx' || fileType === 'jsx';
    const isVueFramework = isTopic && activeFile.id.includes('vuejs') && fileType === 'js';

    // --- NEW PREVIEW LOGIC FOR FRAMEWORK TOPICS ---

    // React/Next/Nuxt Preview for single-file components
    if (isTopic && isReactFramework) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>React Preview</title>
            <script type="importmap">
              {
                "imports": {
                  "react": "https://esm.sh/react@19.1.0-beta-94eed63c49-20240425",
                  "react-dom/client": "https://esm.sh/react-dom@19.1.0-beta-94eed63c49-20240425/client",
                  "react/jsx-runtime": "https://esm.sh/react@19.1.0-beta-94eed63c49-20240425/jsx-runtime",
                  "react/jsx-dev-runtime": "https://esm.sh/react@19.1.0-beta-94eed63c49-20240425/jsx-dev-runtime"
                }
              }
            </script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <style>
              body { font-family: sans-serif; padding: 1rem; color: #e2e8f0; background-color: #1a202c; }
              #root { border: 1px solid #4a5568; padding: 20px; background-color: #2d3748; border-radius: 8px; min-height: 50px; }
              h1,h2,h3 { color: #9ae6b4; }
              button { margin: 4px; padding: 8px 12px; font-size: 14px; border: 1px solid #4a5568; border-radius: 4px; background-color: #2d3748; color: #e2e8f0; cursor: pointer; transition: background-color 0.2s; }
              button:hover { background-color: #4a5568; }
              input, textarea { font-size: 14px; padding: 8px; margin: 4px; border: 1px solid #4a5568; border-radius: 4px; background-color: #1a202c; color: white; }
            </style>
          </head>
          <body>
            <h2>Component Preview</h2>
            <div id="root"></div>
            <script type="text/babel" data-type="module">
              import React from 'react';
              import { createRoot } from 'react-dom/client';
              
              try {
                // User's code is expected to export a default component
                // or define a component named 'Component' or 'App'.
                const userCode = \`${activeFile.content.replace(/`/g, '\\`')}\`;
                
                const module = new Function('React', 'exports', \`
                  const exports = {};
                  \${userCode}
                  return exports;
                \`)(React, {});

                const ComponentToRender = module.default || module.Component || module.App;
                
                const container = document.getElementById('root');
                const root = createRoot(container);
                
                if (ComponentToRender) {
                  root.render(<ComponentToRender />);
                } else if (userCode.includes('createRoot')) {
                  // The code might be self-executing, so do nothing.
                } else {
                  root.render(<div><p style={{color: '#f56565'}}>Preview Error: Main component was not found in the code snippet. Make sure to export a default component.</p></div>);
                }
              } catch (err) {
                document.getElementById('root').innerHTML = '<pre style="color: #f56565; white-space: pre-wrap;">' + err.message + '\\n' + err.stack + '</pre>';
                console.error(err);
              }
            </script>
          </body>
        </html>
      `;
    }

    // Vue Preview for single-file components
    if (isVueFramework) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Vue Preview</title>
            <script src="https://unpkg.com/vue@3"></script>
            <style>
              body { font-family: sans-serif; padding: 1rem; color: #e2e8f0; background-color: #1a202c; }
              #app { border: 1px solid #4a5568; padding: 20px; background-color: #2d3748; border-radius: 8px; min-height: 50px; }
              h1,h2,h3 { color: #68d391; }
              button { margin: 4px; padding: 8px 12px; font-size: 14px; border: 1px solid #4a5568; border-radius: 4px; background-color: #2d3748; color: #e2e8f0; cursor: pointer; transition: background-color 0.2s; }
              button:hover { background-color: #4a5568; }
              input, textarea { font-size: 14px; padding: 8px; margin: 4px; border: 1px solid #4a5568; border-radius: 4px; background-color: #1a202c; color: white; }
            </style>
          </head>
          <body>
            <h2>Component Preview</h2>
            <div id="app"></div>
            <script type="module">
              try {
                ${activeFile.content}
              } catch (err) {
                document.getElementById('app').innerHTML = '<pre style="color: #f56565; white-space: pre-wrap;">' + err.message + '</pre>';
                console.error(err);
              }
            </script>
          </body>
        </html>
      `;
    }

    // --- EXISTING LOGIC FOR HTML/CSS/JS/PROJECTS ---
    const htmlFile = findFileByName(files, 'index.html') || (fileType === 'html' ? activeFile : null);
    if (htmlFile) {
        let bundledHtml = htmlFile.content;

        const importMap = `
        <script type="importmap">
        {
          "imports": {
            "lodash": "https://esm.sh/lodash-es@4.17.21",
            "react": "https://esm.sh/react@19.1.0",
            "react-dom/client": "https://esm.sh/react-dom@19.1.0/client",
            "vue": "https://unpkg.com/vue@3"
          }
        }
        </script>
        `;
        if (bundledHtml.includes('</head>')) {
             bundledHtml = bundledHtml.replace('</head>', `${importMap}</head>`);
        } else {
             bundledHtml = importMap + bundledHtml;
        }

        const cssRegex = /<link\s+.*?href="([^"]+\.css)"[^>]*>/g;
        bundledHtml = bundledHtml.replace(cssRegex, (match, href) => {
            const cssFile = findFileByName(files, href);
            return cssFile ? `<style>\n${cssFile.content}\n</style>` : `<!-- CSS not found: ${href} -->`;
        });

        // This regex needs to be careful not to match the import map script
        const jsRegex = /<script\s+((?!type="importmap").)*?src="([^"]+\.(?:js|ts|jsx|tsx))".*?><\/script>/g;
        bundledHtml = bundledHtml.replace(jsRegex, (match, _, src) => {
            const jsFile = findFileByName(files, src);
            if (!jsFile) return `<!-- JS not found: ${src} -->`;
            
            let jsContent = jsFile.content;

            // Simple import replacement for project files
            const importRegex = /import\s+.*?from\s+['"](lodash)['"]/g;
            jsContent = jsContent.replace(importRegex, `import _ from 'https://esm.sh/lodash-es@4.17.21'`);

            return `<script type="module">\n${jsContent}\n</script>`;
        });

        return bundledHtml;
    }

    if (fileType === 'css') {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>CSS Preview</title>
            <style>
              body { font-family: sans-serif; padding: 20px; color: #e2e8f0; background-color: #1a202c; }
              .preview-wrapper { border: 1px solid #4a5568; padding: 20px; background-color: #2d3748; border-radius: 8px; }
              h1, h2 { border-bottom: 1px solid #4a5568; padding-bottom: 5px; margin-bottom: 15px; color: #9ae6b4; }
              hr { margin: 20px 0; border: 0; border-top: 1px solid #4a5568; }
              button, input { font-size: 1em; padding: 8px 12px; margin-top: 10px; border-radius: 4px; border: 1px solid #4a5568; background-color: #1a202c; color: white; }
            </style>
            <style>${activeFile.content}</style>
          </head>
          <body>
            <h1>CSS Topic Preview</h1>
            <p>The CSS from the lesson is applied to the sample elements below.</p>
            <hr />
            <div class="preview-wrapper">
              <div class="container">
                <h2>Sample Container</h2>
                <p>This is a paragraph with a <a href="#">link</a>.</p>
                <button class="button">A Button</button>
                 <ul><li>List Item 1</li><li>List Item 2</li></ul>
              </div>
              <div class="box" style="margin-top: 20px;">A simple box element.</div>
              <input type="text" placeholder="A text input" />
            </div>
          </body>
        </html>
      `;
    }
    
    // Default JS/TS runner
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: sans-serif; padding: 1rem; color: #e2e8f0; background-color: #1a202c; }
            h2 { color: #9ae6b4; }
            #console-output { white-space: pre-wrap; word-wrap: break-word; background-color: #2d3748; padding: 10px; border-radius: 4px; margin-top: 20px; border: 1px solid #4a5568; }
            #error-output { color: #f56565; font-family: monospace; }
          </style>
        </head>
        <body>
          <h2>Console Output for ${activeFile.name}</h2>
          <pre id="console-output"></pre>
          <div id="error-output"></div>
          <script>
            try {
              const outputEl = document.getElementById('console-output');
              const originalLog = console.log;
              console.log = (...args) => {
                const output = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ');
                if (outputEl) outputEl.textContent += output + '\\n';
                originalLog.apply(console, args);
              };
              ${activeFile.content}
            } catch (err) {
              const errorEl = document.getElementById('error-output');
              if (errorEl) errorEl.textContent = err;
              console.error(err);
            }
          </script>
        </body>
      </html>
    `;
  }, [activeFile, files]);

  return (
    <div className="w-full h-full bg-slate-900">
      <iframe
        srcDoc={srcDoc}
        title="Live Preview"
        sandbox="allow-scripts allow-modals allow-same-origin"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default Preview;