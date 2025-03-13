"use client"

import { useState } from "react";
import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      className={`toggle-switch-container ${isOn ? "on" : "off"}`}
      onClick={() => setIsOn(!isOn)}
    >
      <div
        className={`toggle-switch-knob ${isOn ? "on" : "off"}`}
      />
    </div>
  );
}