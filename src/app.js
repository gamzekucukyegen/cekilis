"use client";

import React, { useState, useEffect } from "react";


const names = ["gamze", "ezgi", "ece", "ceylan", "deniz"];

export default function Home() {
  const [currentUser, setCurrentUser] = useState("");
  const [results, setResults] = useState({});
  const [completedUsers, setCompletedUsers] = useState([]);

  
  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("results")) || {};
    const savedCompletedUsers = JSON.parse(localStorage.getItem("completedUsers")) || [];
    setResults(savedResults);
    setCompletedUsers(savedCompletedUsers);
  }, []);

  const drawName = () => {
    const formattedUser = currentUser.trim().toLowerCase();

    if (!names.includes(formattedUser)) {
      alert("Lütfen adınızı doğru girin!");
      return;
    }

    if (completedUsers.includes(formattedUser)) {
      alert("Zaten çekiliş yaptınız!");
      return;
    }

    const availableNames = names.filter(
      (name) => name !== formattedUser && !Object.values(results).includes(name)
    );

    if (availableNames.length === 0) {
      alert("Tüm isimler çekilmiş. Çekiliş sona erdi!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const drawnName = availableNames[randomIndex];

    const updatedResults = { ...results, [formattedUser]: drawnName };
    const updatedCompletedUsers = [...completedUsers, formattedUser];

    setResults(updatedResults);
    setCompletedUsers(updatedCompletedUsers);

    // Sonuçları localStorage'a kaydet
    localStorage.setItem("results", JSON.stringify(updatedResults));
    localStorage.setItem("completedUsers", JSON.stringify(updatedCompletedUsers));
    console.log('RESULT' , results)
    console.log('COMPLETED',completedUsers)

    alert(`Çekiliş sonucunuz: ${drawnName}`);
  };

  return (
    <div className="container">
      <h1>Çekiliş Uygulaması</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Adınızı yazın"
          onChange={(e) => setCurrentUser(e.target.value)}
          className="input-box"
        />
        <button onClick={drawName} className="button">
          Çekiliş Yap
        </button>
      </div>
    </div>
  );
}
