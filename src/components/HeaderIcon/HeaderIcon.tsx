import { useState } from 'react';
import './HeaderIcon.css';


type HeaderIconProps = {
  src: string
  selected?: boolean;
  doHover?: boolean;
  size?: string;
}

export default function HeaderIcon({src, selected = false, doHover = false, size = 'default'}: HeaderIconProps) {

  const [hovered, setHovered] = useState(false);
  const className = "header-icon-icon".concat(hovered? " hovered" : '', ' ', size);

  return (
    <>
      <div className='header-icon-container' onMouseEnter={() => setHovered(doHover)} onMouseLeave={() => setHovered(false)}>
        <button className='header-icon-button'>
          <img className={className} src={src}></img>
        </button>
      </div>
    </>
  );
}
