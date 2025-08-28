import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const useKaraokeController = () => {
    const controls = useAnimation();
    const [count, setCount] = useState(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handlePlaying = (value: boolean, delay: number)=>{
        if(delay){
            setCount(3);
            setTimeout(()=>{
                setIsPlaying(value);
            },delay);
        }else{
            setIsPlaying(value);
        }
    }

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount((prev) => prev - 1);
            }, 1000);
    
            // animación de aparición
            controls.start({
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0.8],
                transition: { duration: 0.6 },
            });
    
            return () => clearTimeout(timer);
        }
    }, [count, controls]);


    return {
        count,
        controls,
        isPlaying,
        handlePlaying
    }
}

export { useKaraokeController }