import { memo, useContext, useLayoutEffect, useRef } from 'react';
import { ScrollContext } from '../utils/ScrollObserver';
import s from '../styles/image-preview.module.css';

const WindowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

export const PreviewImages: React.FC<{ urls: string[] }> = ({ urls }) => {
  const { scrollY } = useContext(ScrollContext);

  // NOTE 1 is the first banner
  const index = +(scrollY / WindowHeight - 1).toFixed();

  return <ParallaxImage url={urls[index < 0 ? 0 : index]} />;
};

const ParallaxImage: React.FC<{ url: string }> = memo(
  ({ url }) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
      const { current: img } = imgRef;
      if (!img) return;

      img.onload = () => {
        // get aspect ration of image
        const ratio = img.naturalWidth / img.naturalHeight,
          width = img.height * ratio;

        // NOTE 40 is padding
        img.parentElement!.style.cssText = `width: ${width + 40}px; height: ${
          width / ratio + 40
        }px;`;
      };
    }, []);

    return (
      <div className="w-full h-screen p-10 flex items-center justify-center">
        <div
          className={`w-full h-full transition-[width, height] duration-[350ms] ease-out will-change-[width, height] p-5 ${s.neoIn}`}
        >
          <img ref={imgRef} src={url} alt={url} className="w-full h-full object-contain" />
        </div>
      </div>
    );
  },
  (prev, next) => prev.url === next.url
);
