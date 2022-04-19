import React, { createContext, useEffect, useMemo, useState } from 'react';

interface FileContextProps {
  files: string[];
  addFiles(files: string[]): void;
  setContainerId(id: string): void;
}

export const FileContext = createContext<FileContextProps>({
  files: [],
  addFiles() {},
  setContainerId(id) {}
});

const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<string[]>([]),
    [containerId, setContainerId] = useState<string>(),
    previewContainer = useMemo(() => document.getElementById(containerId || ''), [containerId]);

  useEffect(() => {
    previewContainer?.style.setProperty('height', `${(files.length || 0.5) * 10}0vh`);
  }, [files, previewContainer]);

  return (
    <FileContext.Provider
      value={{
        files,
        addFiles: (urls: string[]) => setFiles((prev) => prev.concat(urls)),
        setContainerId
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileProvider;
