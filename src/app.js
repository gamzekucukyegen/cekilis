"use client";

import React, { useState, useEffect } from "react";

const names = ["gamze", "ezgi", "ece", "ceylan", "deniz"]; // Çekilişteki isimler

export default function Home() {
  const [currentUser, setCurrentUser] = useState(""); // Şu anki kullanıcı
  const [results, setResults] = useState({}); // Çekiliş sonuçları

  // Sayfa yüklendiğinde localStorage'dan verileri al
  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("results")) || {};
    setResults(savedResults);
  }, []);

  // Çekiliş fonksiyonu
  const drawName = () => {
    const formattedUser = currentUser.trim().toLowerCase(); // Kullanıcı adı küçük harfe çevrilir

    // Kullanıcının adı listede mi?
    if (!names.includes(formattedUser)) {
      alert("Lütfen adınızı doğru girin!");
      return;
    }

    // Kullanıcı daha önce çekiliş yapmışsa aynı sonucu döndür
    if (results[formattedUser]) {
      alert(`Çekiliş sonucunuz: ${results[formattedUser]}`);
      return;
    }

    // Kullanılabilir isimleri filtrele
    const availableNames = names.filter(
      (name) => name !== formattedUser && !Object.values(results).includes(name)
    );

    // Eğer hiç kullanılabilir isim kalmamışsa
    if (availableNames.length === 0) {
      alert("Tüm isimler çekilmiş. Çekiliş sona erdi!");
      return;
    }

    // Rastgele bir isim seç
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const drawnName = availableNames[randomIndex];

    // Sonuçları güncelle
    const updatedResults = { ...results, [formattedUser]: drawnName };

    setResults(updatedResults); // Yeni sonuçları state'e kaydet

    // Güncellenmiş sonuçları localStorage'a kaydet
    localStorage.setItem("results", JSON.stringify(updatedResults));

    // Çekiliş sonucunu kullanıcıya bildir
    alert(`Çekiliş sonucunuz: ${drawnName}`);
  };

  return (
    <div className="container">
      <h1>Çekiliş Uygulaması</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Adınızı yazın"
          onChange={(e) => setCurrentUser(e.target.value)} // Kullanıcı girişi
          value={currentUser} // Girdi alanını kontrol et
          className="input-box"
        />
        <button onClick={drawName} className="button">
          Çekiliş Yap
        </button>
      </div>
    </div>
  );
}
