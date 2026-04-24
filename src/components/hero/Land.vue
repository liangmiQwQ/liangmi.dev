<template>
  <div
    w-200 h-200 rounded-full bg-stone-950
    class="colossal-backlit-sphere"
  />
</template>

<style scoped>
.colossal-backlit-sphere {
  position: relative;
  transform: translateY(100px);
}

.colossal-backlit-sphere::before {
  content: '';
  position: absolute;
  inset: -100px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 5%,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.2) 40%,
    transparent 60%
  );
  filter: blur(60px);
  z-index: -1;
}

.colossal-backlit-sphere::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow:
    inset 0 35px 25px -10px rgba(255, 255, 255, 1),
    inset 0 60px 80px -20px rgba(255, 255, 255, 0.5);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 45%, transparent 65%);
  mask-image: linear-gradient(to bottom, black 0%, black 45%, transparent 65%);
  z-index: 1;
}
</style>
