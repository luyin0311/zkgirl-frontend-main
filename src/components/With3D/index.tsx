import { motion, useSpring } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

// Learn more: https://www.framer.com/docs/guides/overrides/

//Spring animation parameters
const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 40,
};

/**
 * 3D Card
 * Created By Joshua Guo
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */

export type With3DProps = {
  width: number | string;
  height: number | string;
} & { [k: string]: any };
export function with3D(Component: React.FC<any>): React.FC<With3DProps> {
  const Comp = (props: With3DProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
      setIsFlipped(prevState => !prevState);
    };

    const [rotateXaxis, setRotateXaxis] = useState(0);
    const [rotateYaxis, setRotateYaxis] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: React.MouseEvent) => {
      const element = ref.current;
      if (!element) {
        return;
      }
      const elementRect = element.getBoundingClientRect();
      const elementWidth = elementRect.width;
      const elementHeight = elementRect.height;
      const elementCenterX = elementWidth / 2;
      const elementCenterY = elementHeight / 2;
      const mouseX = event.clientY - elementRect.y - elementCenterY;
      const mouseY = event.clientX - elementRect.x - elementCenterX;
      const degreeX = (mouseX / elementWidth) * 10; //The number is the rotation factor
      const degreeY = (mouseY / elementHeight) * 10; //The number is the rotation factor
      setRotateXaxis(degreeX);
      setRotateYaxis(degreeY);
    };

    const handleMouseEnd = () => {
      setRotateXaxis(0);
      setRotateYaxis(0);
    };

    const dx = useSpring(0, spring);
    const dy = useSpring(0, spring);

    useEffect(() => {
      dx.set(-rotateXaxis);
      dy.set(rotateYaxis);
    }, [dx, dy, rotateXaxis, rotateYaxis]);

    return (
      <motion.div
        className="motion3d"
        onClick={handleClick}
        transition={spring}
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          width: `${props.width}`,
          height: `${props.height}`,
        }}
      >
        <motion.div
          ref={ref}
          whileHover={{ scale: 1 }} //Change the scale of zooming in when hovering
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseEnd}
          transition={spring}
          style={{
            width: '100%',
            height: '100%',
            rotateX: dx,
            rotateY: dy,
          }}
        >
          <div
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
              width: '100%',
              height: '100%',
            }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? -0 : 0 }}
              transition={spring}
              style={{
                width: '100%',
                height: '100%',
                zIndex: isFlipped ? 0 : 1,
                backfaceVisibility: 'hidden',
                position: 'absolute',
              }}
            >
              <Component
                {...props}
                variant="Front"
                style={{
                  width: '100%',
                  // height: '100%',
                }}
              />
            </motion.div>
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: isFlipped ? 0 : 0 }}
              transition={spring}
              style={{
                width: '100%',
                height: '100%',
                zIndex: isFlipped ? 1 : 0,
                backfaceVisibility: 'hidden',
                position: 'absolute',
              }}
            >
              <Component
                {...props}
                variant="Back"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };
  // Comp
  return Comp;
}
