<template>
  <svg
    xmlns="http://www.w3.org/2000/svg" width="350" height="350" viewBox="-5 -5 110 110"
  >
    <defs>
      <filter id="glow-lg" x="-300%" y="-300%" width="700%" height="700%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="blur" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="15" />
      </filter>
      <filter id="blur-sm" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="0.5" />
      </filter>
    </defs>

    <path
      transform="translate(50, 50) rotate(30) translate(-50, -50)"
      fill="currentColor"
      filter="url(#glow-lg)"
      d="M52.5 45.66 l6.14 -.69 L55 50 l3.68 4.97 l-6.18 -.65 L50.03 60 L47.5 54.34 l-6.14 .69 L45 50 L41.32 45.03 l6.18 .65 L49.97 40"
    />
    <path
      transform="translate(50, 50) scale(0.78) translate(-50, -50)"
      fill="currentColor"
      filter="url(#glow-lg)"
      d="M52.5 45.66 l6.14 -.69 L55 50 l3.68 4.97 l-6.18 -.65 L50.03 60 L47.5 54.34 l-6.14 .69 L45 50 L41.32 45.03 l6.18 .65 L49.97 40"
    />
    <circle cx="50" cy="50" r="3" fill="currentColor" filter="url(#glow-lg)" />
    <circle cx="50" cy="50" r="4" fill="currentColor" filter="url(#blur-sm)" />

    <circle cx="50" cy="50" r="16" fill="currentColor" opacity="0.6" filter="url(#blur)" />

    <path
      d="M 50 25 L 51 49 L 75 50 L 51 51 L 50 75 L 49 51 L 25 50 L 49 49 Z"
      opacity="0.8"
      filter="url(#blur-sm)"
      fill="currentColor"
    />

    <path
      v-for="i in 3"
      :key="i"
      :transform="`translate(50, 50) scale(${Math.pow(i, 1 / 1.5) * 0.8}) rotate(${i * 30}) translate(-50, -50)`"
      d="M 50 25 L 52 48 L 75 50 L 52 52 L 50 75 L 48 52 L 25 50 L 48 48 Z"
      opacity="0.8"
      filter="url(#blur-sm)"
      fill="currentColor"
    />
  </svg>
</template>
