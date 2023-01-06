import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

function Modal({ isOpen, onClose, children }) {
  // Done like this to be able to animate the modal in css
  if (!isOpen) return createPortal(
    <>
      <div className="overlay closed" />
      <div className="content closed">
        {children}
      </div>
    </>,
    document.getElementById('modal')
  )

  return createPortal(
    <>
      <div onClick={onClose} className="overlay open" />
      <div className="content open">
        {children}
      </div>
    </>,  
    document.getElementById('modal')
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;