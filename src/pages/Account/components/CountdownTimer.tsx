import React, { useState, useEffect } from "react";

const CountdownTimer: React.FC<{
  hours: number;
  minutes: number;
  seconds: number;
  onComplete?: () => void;
}> = ({ hours: initialHours, minutes: initialMinutes, seconds: initialSeconds, onComplete }) => {
  const calcTotalSeconds = () =>
    initialHours * 3600 + initialMinutes * 60 + initialSeconds;

  const [totalSeconds, setTotalSeconds] = useState<number>(calcTotalSeconds());

  useEffect(() => {
    setTotalSeconds(calcTotalSeconds()); // Reset when props change

    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialHours, initialMinutes, initialSeconds, onComplete]);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const format = (n: number) => (n < 10 ? `0${n}` : n.toString());

  return (
    <div className="flash-time">
      {days > 0 && <span className="time-value">{days} ngày</span>}{" "}
      {(days > 0 || hours > 0) && <span className="time-value">{format(hours)} giờ</span>}{" "}
      {(days > 0 || minutes > 0) && <span className="time-value">{format(minutes)} phút</span>}{" "}
      <span className="time-value">{format(seconds)} giây</span>
    </div>
  );
};

export default CountdownTimer;
