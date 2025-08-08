import { PartialMotionVariants } from "../interfaces";
import { easeIn } from "framer-motion";

export const fadeInMotion = (delayAnimate?: number, delayExit?: number):PartialMotionVariants => {
    return {
        initial:{ opacity: 0 },
        animate:{ 
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: easeIn,
                delay: delayAnimate ?? 0
            }
        },
        exit: { 
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: easeIn,
              delay: delayExit ?? 0
            }
          }
    }
}

export const fadeUpMotion = (delayAnimate: number, delayExit: number):PartialMotionVariants => {
    return {
        initial: { opacity: 0, translateY: 100 },
        animate: {
            translateY: 0,     
            opacity: 1,                       
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 10,
                mass: 0.5,
                delay: delayAnimate,
                duration: 0.5,
            }
        },
        exit: {
            opacity: 0,
            translateY: -100,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 10,
                mass: 0.5,
                delay: delayExit, 
                duration: 0.5,
            }
        }
    }
}
export const fadeUpSecondaryMotion = ():PartialMotionVariants => {
    return {
        initial:{ opacity: 0, y: 10 },
        animate:{ opacity: 1, y: 0 },
        exit:{ opacity: 0, y: -10 }
    }
}