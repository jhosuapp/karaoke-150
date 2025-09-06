import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

type Props = {
    value: number;
    className?: string;
};

const AnimatedCounter = ({ value, className }: Props) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.floor(latest));

    useEffect(() => {
        const controls = animate(count, value, {
        duration: 2, 
        ease: "easeOut",
        });

        return controls.stop; 
    }, [value, count]);

    return (
        <motion.p className={ className }>{rounded}</motion.p>
    );
};

export { AnimatedCounter }