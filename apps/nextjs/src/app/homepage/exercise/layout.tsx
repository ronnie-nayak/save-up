"use client";

import "./styles.css";

import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [firstDropdown, setFirstDropdown] = useState(false);
  const [secondDropdown, setSecondDropdown] = useState(false);
  function dropdownExercise() {
    setFirstDropdown(!firstDropdown);
    setSecondDropdown(false);
  }
  function dropdownYoga() {
    setSecondDropdown(!secondDropdown);
    setFirstDropdown(false);
  }
  return (
    <div className="body">
      <nav className="nav">
        <ul>
          <li>
            <a href="#" onClick={dropdownExercise}>
              <b>EXERCISE</b>
            </a>
            <div
              id="myDropdown1"
              className={`dropdown-content ${firstDropdown ? "show" : ""}`}
            >
              <a href="/homepage/exercise/bicepCurl">Bicep-Curl</a>
              <a href="/homepage/exercise/pushUps">Push-Ups</a>
              <a href="/homepage/exercise/squats">Squats</a>
              <a href="/homepage/exercise/triceps">Triceps</a>
            </div>
          </li>
          <li>
            <a href="#" onClick={dropdownYoga}>
              <b>YOGA</b>
            </a>
            <div
              id="myDropdown2"
              className={`dropdown-content ${secondDropdown ? "show" : ""}`}
            >
              <a href="/homepage/exercise/tPose">T Pose</a>
              <a href="/homepage/exercise/treePose">Tree Pose</a>
              <a href="/homepage/exercise/warriorPose">Warrior Pose</a>
            </div>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
