import React from "react";
import "./FormContainer.css";

export default function FormContainer({ title, children }) {
  return (
    <div className="form-container">
      {title && <h2 className="form-title">{title}</h2>}
      {children}
    </div>
  );
}