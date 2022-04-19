import { useContext, useRef } from 'react';
import SelectImage from './SelectImage';
import s from '../styles/banner.module.css';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { ScrollContext } from '../utils/ScrollObserver';

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useContext(ScrollContext);

  const { current: section } = sectionRef;
  let progress = 0;

  if (section) {
    progress = Math.min(1, scrollY / section.clientHeight);
  }

  return (
    <section
      className={`h-screen sticky top-0 left-0 -z-[1] text-center py-20 px-10 flex flex-col items-center justify-center ${s.bannerImage}`}
      ref={sectionRef}
      style={{
        transform: `translateY(-${progress * 20}vh)`
      }}
    >
      <h1 className="[text-shadow:0_4px_10px_rgba(0,0,0,1)] text-white text-5xl md:text-6xl lg:text-8xl font-extrabold">
        React Gallary
      </h1>
      <p className="[text-shadow:0_4px_5px_rgba(0,0,0,1)] text-white font-bold text-sm lg:text-base mt-6">
        Select Your Favorite Images To Start
      </p>
      <SelectImage />
      <ChevronDownIcon
        className={`w-12 h-12 absolute bottom-1 left-1/2 ${s.pointDown}`}
        color="#fff"
        strokeWidth={1}
      />
    </section>
  );
}
