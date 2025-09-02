import React, { useRef, useEffect } from 'react';
import styles from './modalYoutube.module.css';

interface ModalYoutubeProps {
  open: boolean;
  onClose: () => void;
  url: string;
}

const getYoutubeId = (url: string) => {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return match ? match[1] : '';
};

const ModalYoutube: React.FC<ModalYoutubeProps> = ({ open, onClose, url }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoId = getYoutubeId(url);

  useEffect(() => {
    if (!open && iframeRef.current) {
      // Stop video by resetting src
      iframeRef.current.src = '';
    } else if (open && iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  }, [open, videoId]);

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal">
          ×
        </button>
        <div className={styles.videoWrapper}>
          <iframe
            ref={iframeRef}
            width="560"
            height="315"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="YouTube video"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalYoutube;
