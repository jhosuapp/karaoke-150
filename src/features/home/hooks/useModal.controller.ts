import { useState } from "react";

const useModalController = () => {
    const [openModal, setOpenModal] = useState(false);
    return {
        openModal,
        setOpenModal,
    }
}

export { useModalController }