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

    if (fileType === 'html') {
      let bundledHtml = activeFile.content;

      // Replace CSS <link> tags with <style> tags containing the content
      const cssRegex = /<link\s+.*?href="([^"]+\.css)"[^>]*>/g;
      bundledHtml = bundledHtml.replace(cssRegex, (match, href) => {
        const cssFile = findFileByName(files, href);
        if (cssFile) {
          return `<style>\n${cssFile.content}\n</style>`;
        }
        return `<!-- CSS file not found: ${href} -->`;
      });

      // Replace JS <script> tags with inline scripts
      const jsRegex = /<script\s+.*?src="([^"]+\.js)".*?><\/script>/g;
      bundledHtml = bundledHtml.replace(jsRegex, (match, src) => {
        const jsFile = findFileByName(files, src);
        if (jsFile) {
          return `<script>\n${jsFile.content}\n</script>`;
        }
        return `<!-- JS file not found: ${src} -->`;
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
              body { 
                font-family: sans-serif; padding: 20px; color: #333; 
                background-color: #f8f9fa;
              }
              .preview-wrapper {
                  border: 1px solid #dee2e6;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 8px;
              }
              h1, h2 { border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px; }
              hr { margin: 20px 0; border: 0; border-top: 1px solid #eee; }
              button, input { font-size: 1em; padding: 8px 12px; margin-top: 10px; }
            </style>
            <style>
              ${activeFile.content}
            </style>
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
                 <ul>
                  <li>List Item 1</li>
                  <li>List Item 2</li>
                </ul>
              </div>
              <div class="box" style="margin-top: 20px;">A simple box element.</div>
              <input type="text" placeholder="A text input" />
            </div>
          </body>
        </html>
      `;
    }
    
    // For JS/TS files, use the simple script runner.
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: sans-serif; padding: 1rem; color: #333; }
            #console-output { 
                white-space: pre-wrap; 
                word-wrap: break-word; 
                background-color: #f1f3f5; 
                padding: 10px; 
                border-radius: 4px; 
                margin-top: 20px;
                border: 1px solid #dee2e6;
            }
            #error-output {
                color: red;
                font-family: monospace;
            }
          </style>
        </head>
        <body>
          <h1>Previewing ${activeFile.name}</h1>
          <div id="app"></div>
          <pre id="console-output"></pre>
          <div id="error-output"></div>
          <script>
            // Basic error handling
            try {
              const outputEl = document.getElementById('console-output');
              // Capture console.log and display it
              const originalLog = console.log;
              console.log = (...args) => {
                const output = args.map(arg => {
                  try {
                    return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
                  } catch(e) {
                    return 'Unserializable Object';
                  }
                }).join(' ');
                if(outputEl) outputEl.textContent += output + '\\n';
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
    <div className="w-full h-full bg-white">
      <iframe
        srcDoc={srcDoc}
        title="Live Preview"
        sandbox="allow-scripts allow-modals"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default Preview;