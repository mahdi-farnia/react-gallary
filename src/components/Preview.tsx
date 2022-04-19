import { useContext, useEffect } from 'react';
import { FileContext } from '../utils/FileProvider';
import { PreviewImages } from './Image';

export default function Preview() {
  const { files, setContainerId } = useContext(FileContext);

  useEffect(() => {
    setContainerId('preview_container');
  }, [setContainerId]);

  return (
    <div className="bg-[#f0f0f0]" id="preview_container">
      <div className="sticky top-0 left-0">
        {files.length === 0 ? (
          <WaterMark message="Select File&#40;s&#41; To Preview" />
        ) : (
          <PreviewImages urls={files} />
        )}
      </div>
    </div>
  );
}

const WaterMark: React.FC<{ message: string }> = ({ message }) => (
  <div className="w-full h-half-screen flex items-center justify-center">
    <h1 className="text-center font-bold text-slate-600 opacity-50 text-2xl md:text-4xl lg:text-5xl">
      {message}
    </h1>
  </div>
);
