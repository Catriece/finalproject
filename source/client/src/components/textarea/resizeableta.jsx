import React, { useState } from "react";
import "./resizeableta.css"; // Import your CSS file

const ResizableTextArea = ({
  placeholder,
  className,
  value,
  onChange,
  style,
}) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
    // Auto adjust the textarea's height
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  return (
    <textarea
      required
      className={`resizable-textarea ${className}`}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      style={style}
    />
  );
};

export default ResizableTextArea;
