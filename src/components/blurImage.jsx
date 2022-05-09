import * as React from 'react';
import clsx from 'clsx';
import Loader from './UI/Loader/Loader';

function BlurImage({ img, ...rest }) {
  const [visible, setVisible] = React.useState(false);
  const imgRef = React.useRef(null);

  const { src, srcSet, sizes } = img.props;
  React.useLayoutEffect(() => {
    if (imgRef.current?.complete) {
      setVisible(true);
    };
  }, []);

  React.useEffect(() => {
    if (!imgRef.current) return;
    if (imgRef.current.complete) return;

    let current = true;
    imgRef.current.addEventListener('load', () => {
      if (!imgRef.current || !current) return;
      setVisible(true);
    });

    return () => {
      current = false;
    };
  }, [src, srcSet, sizes]);

  const imgEl = React.cloneElement(img, {
    ref: imgRef,
    key: img.props.src,
    className: clsx(
      img.props.className,
      ' w-full h-full object-cover transition-opacity',
      { 'opacity-0': !visible },
    ),
  });

  return (
      <div
        className={`${clsx(rest.className, 'w-full h-70')}`}
        style={
          !visible
            ? {
                ...rest.style,
                backgroundSize: 'cover',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }
            : rest.style
        }
      >
        {!visible && <Loader style={{position: "absolute"}}/>}
        {imgEl}
      </div>
  );
}
export { BlurImage };