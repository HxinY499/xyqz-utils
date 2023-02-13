import {
  cloneElement,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
} from 'react';
import anim from 'css-animation';

function Animate(props, ref) {
  const childRef = useRef();
  const stopper = useRef();

  useImperativeHandle(ref, () => ({
    entryAnimation,
    leaveAnimation,
  }));

  const entryAnimation = () => {
    const target = childRef.current;
    console.log(childRef.current);
    anim(target, 'fade', {
      start() {
        target.classList.add('fade');
        target.style.opacity = '0';
      },
      active() {
        target.style.opacity = '1';
      },
      end() {
        target.classList.remove('fade');
      },
    });
  };

  const leaveAnimation = () => {
    const target = childRef.current;
    console.log(childRef.current);
    anim(target, 'fade', {
      start() {
        target.classList.add('fade');
        target.style.opacity = '1';
      },
      active() {
        console.log('leave-active');
        target.style.opacity = '0';
      },
      end() {
        target.classList.remove('fade');
      },
    });
  };
  useLayoutEffect(() => {
    return () => {
      leaveAnimation();
    };
  }, []);
  useEffect(() => {
    return () => {
      if (stopper.current) stopper();
      stopper.current = null;
    };
  }, []);

  return cloneElement(props.children, { ref: childRef });
}

export default forwardRef(Animate);
