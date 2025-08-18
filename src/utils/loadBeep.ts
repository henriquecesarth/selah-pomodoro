import alarm from '../assets/audios/Short-analog-alarm-clock-sound-effect.mp3';

export const loadBeep = () => {
  const audio = new Audio(alarm);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play();
  };
};
