import { Component } from "react";
import { createPortal } from "react-dom";

import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.hendleKeyDown);
  }

  hendleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  hendleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { imageModal } = this.props;
    return createPortal(
      <div className={s.overlay} onClick={this.hendleBackdropClick}>
        <div className={s.modal}>
          <img src={imageModal.dataset.source} alt={imageModal.alt} />{" "}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
