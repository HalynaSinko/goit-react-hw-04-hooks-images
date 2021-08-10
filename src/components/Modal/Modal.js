import { useEffect } from "react";
import { createPortal } from "react-dom";

import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ imageModal, onClose }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  function handleKeyDown(e) {
    if (e.code === "Escape") {
      onClose();
    }
  }

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={imageModal.dataset.source} alt={imageModal.alt} />
      </div>
    </div>,
    modalRoot
  );
}
