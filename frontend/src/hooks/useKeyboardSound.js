const keyStrokeSounds = [
    new Audio("/Sounds/keystroken1.mp3"),
    new Audio("/Sounds/keystroken2.mp3"),
    new Audio("/Sounds/keystroken3.mp3"),
    new Audio("/Sounds/keystroken4.mp3"),
];

function usekeyboardSound() {
    const playRandomKeyStrokeSound = () => {
      const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];

      randomSound.currentTime = 0; //this is for a vetter UX,
      randomSound.play().catch((error) => console.log("Audio play failed:", error));
        };

    return {playRandomKeyStrokeSound}
}

export default usekeyboardSound;