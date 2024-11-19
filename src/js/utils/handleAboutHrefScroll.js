import gsap from 'gsap';
/* gsap plugins */
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export function handleAboutHrefScroll() {
  const href = window.localStorage.getItem('about_href');
  setTimeout(function () {
    gsap.to(window, { duration: 0.5, scrollTo: { y: href, offsetY: 250 } });
  }, 300);
}
