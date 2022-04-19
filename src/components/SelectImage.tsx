import { useRef, useContext, useCallback } from 'react';
import { FileContext } from '../utils/FileProvider';

export default function SelectImage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addFiles } = useContext(FileContext);

  const selectHandler = useCallback(() => {
    const files = inputRef.current!.files!;

    if (files.length === 0) return;

    const urls: string[] = [];
    for (const file of files) {
      urls.push(URL.createObjectURL(file));
    }

    addFiles(urls);
  }, [inputRef, addFiles]);

  return (
    <form className="w-max mt-10 mx-auto">
      <Button onClick={() => inputRef.current!.click()}>Choose Images</Button>
      <input
        type="file"
        className="hidden"
        aria-hidden
        accept="image/*"
        ref={inputRef}
        multiple
        onChange={selectHandler}
      />
    </form>
  );
}

const Button: React.FC<{ onClick: React.MouseEventHandler; children: React.ReactNode }> = ({
  onClick,
  children
}) => (
  <button
    type="button"
    className="text-emerald-100 bg-emerald-900 bg-opacity-40 backdrop-blur-lg px-5 py-3 rounded-lg text-sm md:text-base"
    onClick={onClick}
  >
    {children}
  </button>
);
