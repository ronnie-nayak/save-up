"use client";

import "./styles.css";

import { useState } from "react";
import Link from "next/link";

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
              <Link href="/homepage/exercise/bicepCurl">Bicep-Curl</Link>
              <Link href="/homepage/exercise/pushUps">Push-Ups</Link>
              <Link href="/homepage/exercise/squats">Squats</Link>
              <Link href="/homepage/exercise/triceps">Triceps</Link>
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
              <Link href="/homepage/exercise/tPose">T Pose</Link>
              <Link href="/homepage/exercise/treePose">Tree Pose</Link>
              <Link href="/homepage/exercise/warriorPose">Warrior Pose</Link>
            </div>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
