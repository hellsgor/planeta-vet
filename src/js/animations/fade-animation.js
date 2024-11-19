import gsap from 'gsap';

const defaultProps = {
  duration: 0.3,
  scale: 1,
  zIndex: 110,
  opacity: 1,
};

export function fadeIn($element, props = null) {
  gsap.to($element, {
    startAt: {
      display: 'block',
      zIndex: props?.zIndex || defaultProps.zIndex,
      opacity: 0,
      scale: props?.scale || defaultProps.scale,
    },
    ease: 'power2.inOut',
    opacity: props?.opacity || defaultProps.opacity,
    scale: 1,
    duration: props?.duration || defaultProps.duration,
  });
}

export function fadeOut($element, props = null) {
  gsap.to($element, {
    ease: 'power2.out',
    opacity: 0,
    scale: props?.scale || 1,
    duration: props?.duration || defaultProps.duration,
    onComplete: () => {
      gsap.set($element, { display: 'none', zIndex: -1000 });
    },
  });
}
