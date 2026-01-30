let audio: HTMLAudioElement | null = null;

export const startFocusSound = () => {
  if (audio) return;

  audio = new Audio("/sounds/noise.mp3");
  audio.loop = true;
  audio.volume = 0.35;

  audio.play().catch(() => {
    console.warn("자동재생 실패 - 유저 인터랙션 필요");
  });
};

export const stopFocusSound = () => {
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  audio = null;
};
