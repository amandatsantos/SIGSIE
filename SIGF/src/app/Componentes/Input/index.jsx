import { FaUser } from "react-icons/fa";
import "./InputField.css";
import ErrorMessage from "./ErrorMessage";

export default function InputField({ label, placeholder, Icon = FaUser, error }) {
  return (
    <div className="input-field-container">
      <label className="input-field-label">{label}</label>
      <div className="input-field-wrapper">
        <Icon className="input-field-icon" />
        <input
          type="text"
          placeholder={placeholder}
          className="input-field-input"
        />
      </div>
      <ErrorMessage message={error} />
    </div>
  );
}