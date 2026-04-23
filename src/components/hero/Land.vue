<template>
  <div
    w-200 h-200 rounded-full absolute
    class="top-13/20 colossal-backlit-sphere"
    flex="~ items-center justify-center"
  />
</template>

<style>
.colossal-backlit-sphere {
  position: relative;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: #000;
  transform: translateY(100px);
}

.colossal-backlit-sphere::before {
  content: '';
  position: absolute;
  top: -100px;
  left: -100px;
  width: 1000px;
  height: 1000px;
  border-radius: 50%;
  opacity: 1;
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
  top: 0;
  left: 0;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  box-shadow:
    inset 0 35px 25px -10px rgba(255, 255, 255, 1),
    inset 0 60px 80px -20px rgba(255, 255, 255, 0.5);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 45%, transparent 65%);
  mask-image: linear-gradient(to bottom, black 0%, black 45%, transparent 65%);
  z-index: 1;
}
</style>
