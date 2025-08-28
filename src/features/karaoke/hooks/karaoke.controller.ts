import { useState } from "react";

const useKaraokeController = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handlePlaying = (value: boolean)=>{
        setIsPlaying(value);
    }


    return {
        isPlaying,
        handlePlaying
    }
}

export { useKaraokeController }