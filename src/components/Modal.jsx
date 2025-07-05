import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

function Modal({ children, onClose }) {
  const { header, body, footer } = extractChildren(children);
  const modalRoot = document.getElementById("modal-root");
  const [currentModalRoot] = useState(document.createElement("div"));

  useEffect(() => {
    modalRoot.appendChild(currentModalRoot);
    return () => {
      currentModalRoot.remove();
    };
  }, [modalRoot, currentModalRoot]);
  return createPortal(
    <div className={styles.modal}>
      <button onClick={onClose}>Close</button>
      <div className="modal-header">{header}</div>
      <div className="modal-content">{body}</div>
      <div className="modal-footer">{footer}</div>
    </div>,
    currentModalRoot
  );
}

function ModalHeader({ children }) {
  return <div>{children}</div>;
}

function ModalBody({ children }) {
  return <div>{children}</div>;
}

function ModalFooter({ children }) {
  return <div>{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;

// TODO: This is a temporary solution to extract the children from the Modal component.
// We need to find a better way to do this.
function extractChildren(children) {
  let header = null;
  let body = null;
  let footer = null;
  React.Children.map(children, (child) => {
    console.log(child.type === Modal.Header);
    if (child.type === Modal.Header) {
      header = child;
    }
    if (child.type === Modal.Body) {
      body = child;
    }
    if (child.type === Modal.Footer) {
      footer = child;
    }
  });
  return { header, body, footer };
}
