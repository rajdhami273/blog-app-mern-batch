import { createPortal } from "react-dom";

export const openModal = (Component, props) => {
  return createPortal(<Component {...props} />, document.body);
};
