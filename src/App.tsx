import { useEffect, useRef, useState } from 'react';
import tenorGif from './tenor.gif';
import yellowSong from './Yellow emoji dancing meme ｜ VIDRADO EM VOCE 🇧🇷.mp3';

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const playAudio = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.loop = true;
        await audioRef.current.play();
        setShowPlayButton(false);
      }
    } catch (error) {
      console.log('Auto-play was prevented:', error);
      setShowPlayButton(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    playAudio();
  }, []);

  return (
    <div className="App" style={{ 
      width: '100%',
      height: '95%',
      overflow: 'hidden',
      margin: '0',
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ position: 'relative' }}>
        <img 
          src={tenorGif}
          alt="tenor gif" 
          style={{ height: '90vh', width: '100vw' }}
        />
        {showPlayButton && (
          <button
            onClick={playAudio}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px 40px',
              fontSize: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              zIndex: 1000
            }}
          >
            Clique para tocar música
          </button>
        )}
        <button
          onClick={toggleMute}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 1000
          }}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
      <audio 
        ref={audioRef}
        src={yellowSong}
        preload="auto"
      />
    </div>
  );
}

export default App;
