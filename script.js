const motion = document.querySelector(".trade-motion");

if (motion) {
  const label = motion.querySelector("[data-motion-label]");
  const controls = [...motion.querySelectorAll(".motion-control")];
  let modeIndex = 0;
  let timer;

  const setMode = (value) => {
    motion.dataset.mode = value;
    label.textContent = value;
    controls.forEach((control) => {
      control.classList.toggle("is-active", control.dataset.motionValue === value);
    });
    modeIndex = controls.findIndex((control) => control.dataset.motionValue === value);
  };

  const cycleMode = () => {
    modeIndex = (modeIndex + 1) % controls.length;
    setMode(controls[modeIndex].dataset.motionValue);
  };

  const startCycle = () => {
    timer = window.setInterval(cycleMode, 2400);
  };

  const stopCycle = () => {
    window.clearInterval(timer);
  };

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      stopCycle();
      setMode(control.dataset.motionValue);
      startCycle();
    });
  });

  motion.addEventListener("pointermove", (event) => {
    const bounds = motion.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    motion.style.setProperty("--tilt-x", `${x * 5}deg`);
    motion.style.setProperty("--tilt-y", `${y * -5}deg`);
  });

  motion.addEventListener("pointerleave", () => {
    motion.style.setProperty("--tilt-x", "0deg");
    motion.style.setProperty("--tilt-y", "0deg");
  });

  setMode("Sell");
  startCycle();
}
