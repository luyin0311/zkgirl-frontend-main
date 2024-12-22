import { Placement } from '@c3/types';
import anime from 'animejs';

export const animate = (visible: boolean, placement: Placement, targets: anime.AnimeParams['targets']) => {
  if (visible) {
    anime({
      targets,
      scale: [0, 1],
      easing: 'easeInQuad',
      begin: e => {
        e.animatables.forEach(e2 => {
          e2.target.style.transformOrigin = 'top right';
        });
      },
      duration: 300,
    });
  } else {
    anime({
      targets,
      easing: 'easeInQuad',
      scale: [1, 0],
      begin: e => {
        e.animatables.forEach(e2 => {
          e2.target.style.transformOrigin = 'top right';
        });
      },
      duration: 300,
    });
  }
};
