import { memo } from "react";

function _Button({ children, ...props }) {
  console.log("I was re-rendered");
  return <button {...props}>{children}</button>;
}

export const Button = memo(_Button);

/**
 * sum(props) {}
 *
 * props -> an Object with all the attributes passed to this component
 *
 * props.children
 *
 */
