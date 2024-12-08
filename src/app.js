"use client";

import React, { useState, useEffect } from "react";

const names = ["gamze", "ezgi", "ece", "ceylan", "deniz"];

export default function Home() {
  const [currentUser, setCurrentUser] = useState(""); 
  const [results, setResults] = useState({}); 
  const [availableNames, setAvailableNames] = useState([]); 

 
  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("results")) || {};
    setResults(savedResults);

    const usedNames = Object.values(savedResults);
    const remainingNames = names.filter((name) => !usedNames.includes(name));
    setAvailableNames(remainingNames); 
  }, []);

  const drawName = () => {
    const formattedUser = currentUser.trim().toLowerCase(); 

    // Kullanıcının adı listede mi?
    if (!names.includes(formattedUser)) {
      alert("Lütfen adınızı doğru girin!");
      return;
    }


    if (results[formattedUser]) {
      alert(`Çekiliş sonucunuz: ${results[formattedUser]}`);
      return;
    }

  
    const validNames = availableNames.filter((name) => name !== formattedUser);


    if (validNames.length === 0) {
      alert("Tüm isimler çekilmiş. Çekiliş sona erdi!");
      return;
    }

   
    const randomIndex = Math.floor(Math.random() * validNames.length);
    const drawnName = validNames[randomIndex];

 
    const updatedResults = { ...results, [formattedUser]: drawnName };
    setResults(updatedResults);

  
    setAvailableNames(validNames.filter((name) => name !== drawnName));

   
    localStorage.setItem("results", JSON.stringify(updatedResults));

   
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
          value={currentUser} 
          className="input-box"
        />
        <button onClick={drawName} className="button">
          Çekiliş Yap
        </button>
      </div>
    </div>
  );
}
