import './App.css';
import React, { useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";


// Azure bilgileri
const speechKey = "key";
const speechRegion = "westeurope"; 

function App() {
  const [soru, setSoru] = useState("");
  const [cevap, setCevap] = useState("");
  const [voiceName, setVoiceName] = useState("tr-TR-EmelNeural");
  const [isTalking, setIsTalking] = useState(false);


  //  Soru-cevap eşleşmeleri
  const cevaplar = {
    "merhaba": "Merhaba! Nasılsın?",
    "nasılsın": "İyiyim, teşekkür ederim. Sen nasılsın?",
    "ne yapıyorsun": "Sana yardım etmeye çalışıyorum!",
    "görüşürüz": "Görüşmek üzere!",
  
  };

  const cevapVer = () => {
    const temizSoru = soru.trim().toLowerCase();

    const secilenCevap = cevaplar[temizSoru] || "Bu soruya cevabım yok.";

    setCevap(secilenCevap);
    sesiOku(secilenCevap);
  };

const sesiOku = (metin) => {
  setIsTalking(true); // animasyonu başlat

  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(speechKey, speechRegion);
  speechConfig.speechSynthesisVoiceName = voiceName;
  const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
  const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

  synthesizer.speakTextAsync(
    metin,
    () => {
      setIsTalking(false); // animasyonu durdur
      synthesizer.close();
    },
    (error) => {
      console.error(error);
      setIsTalking(false);
      synthesizer.close();
    }
  );
};


 return (
    <div style={{ textAlign: "center", fontFamily: "Arial", minHeight: "100vh" }}>
      {/* Logo en üstte */}
      <div style={{ background: "#fff", padding: "10px" }}>
        <img
          src="/kocsistem_cover.png"
          alt="KoçSistem Logo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      {/* İçerik ortalanmış */}
      <div style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", marginTop: "50px"
      }}>
        <h2>🧠 Soru-Cevap Sistemi</h2>
        <input
          type="text"
          placeholder="Bir şey sor..."
          value={soru}
          onChange={(e) => setSoru(e.target.value)}
          style={{ padding: "10px", width: "300px", fontSize: "16px" }}
        />
        <button
          onClick={cevapVer}
          style={{ marginTop: "10px", padding: "10px 20px" }}
        >
          Gönder
        </button>

        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          <strong>Cevap:</strong> {cevap}
        </p>
      
  
  

<div style={{
  position: "fixed",
  bottom: "20px",
  right: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
}}>
  <button
    onClick={() => setVoiceName("tr-TR-EmelNeural")}
    style={{
      padding: "10px 15px",
      backgroundColor: "#E91E63",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px"
    }}
  >
    Emel Sesine Geç
  </button>

  <button
    onClick={() => setVoiceName("tr-TR-AhmetNeural")}
    style={{
      padding: "10px 15px",
      backgroundColor: "#3F51B5",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px"
    }}
  >
    Ahmet Sesine Geç
  </button>
  {/* Koç maskotu sabit */}
<img
  src={require('./maskot-body.png')}
  alt="Koç Maskot"
  style={{
    position: 'fixed',
    bottom: 0,
    left: '30px',
    width: '600px',
    zIndex: 5
  }}
/>

{/* Çene parçası hareketli */}
<img
  src={require('./maskot-jaw.png')}
  alt="Koç Çenesi"
  className={isTalking ? "talking-jaw" : ""}
  style={{
    position: 'fixed',
    bottom: '-0px',
    left: '30px',
    width: '600px',
    zIndex: 100,
  }}
/>


</div>
      </div>
    </div>
    
  );
  
}

export default App;

