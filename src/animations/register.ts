import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

let registered = false;

export function registerGsap() {
  if (registered) return gsap;
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, CustomEase, ScrollToPlugin);
  CustomEase.create('himnora', '0.16, 1, 0.3, 1');
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
  return gsap;
}

registerGsap();

export { gsap, ScrollTrigger, SplitText };
