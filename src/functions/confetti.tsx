import confetti from "canvas-confetti";

export const handleConfetti = () => {
    const end = Date.now() + 1.5 * 1000; // 1.5 seconds
    const colors1 = ["#112deb", "#11d8eb", "#dd11eb", "#00f", "#f00"];
    const colors2 = ["#16e74f", "#4863ff",  "#ddeb11", "#f1a",];

    const frame = () => {
      if (Date.now() > end) return;
 
      confetti({
        particleCount: 5, 
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors1,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors2,
      });
 
      requestAnimationFrame(frame);
    };
 
    frame();
  };