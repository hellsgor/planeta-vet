import gsap from 'gsap';
/* global ScrollTrigger */
gsap.registerPlugin(ScrollTrigger);

const tweens = gsap.from('section', {
  xPercent: '-100',
  opacity: 0,
});
tweens.array.forEach((tween) => {
  tween.to();
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: 'section',
    start: 'top bottom',
    ease: 'power1.inOut',
  },
});
tl.from('section', { xPercent: '-100' }).to('section', { xPercent: '100' });
