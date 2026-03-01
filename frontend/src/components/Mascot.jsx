import { motion, useAnimationControls } from "framer-motion";

export const EnergyBlob = ({ energy = 7 }) => {
  const isHigh = energy >= 7;
  const isLow = energy < 3;
  const isOkay = !isHigh && !isLow;

  const colors = isHigh
    ? { light: "#e0f5eb", mid: "#a8d5ba", dark: "#6aaf8c", glow: "rgba(168,213,186,0.5)" }
    : isLow
    ? { light: "#f5d0d0", mid: "#c47a7a", dark: "#a05050", glow: "rgba(196,122,122,0.4)" }
    : { light: "#fef0c0", mid: "#f0c060", dark: "#c89020", glow: "rgba(240,192,96,0.4)" };

  const { light, mid, dark } = colors;

  const jumpControls = useAnimationControls();

  const handleClick = async () => {
    await jumpControls.start({
      y: [-30, 4, 0],
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
    });
  };

  return (
    <motion.div
      animate={jumpControls}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={handleClick}
      style={{ cursor: "pointer", width: "fit-content" }}
    >
    <motion.div
      animate={{
        scale: isHigh ? [1, 1.05, 1] : 1,
        y: isLow ? [0, 4, 0] : 0,
      }}
      transition={{ repeat: isHigh || isLow ? Infinity : 0, duration: 2, ease: "easeInOut" }}
      style={{ width: 200 }}
    >
      <svg viewBox="0 0 200 230" overflow="visible">
        <defs>
          <radialGradient id="bodyGrad" cx="35%" cy="28%" r="75%">
            <stop offset="0%" stopColor={light} />
            <stop offset="45%" stopColor={mid} />
            <stop offset="100%" stopColor={dark} />
          </radialGradient>
          <filter id="glowUltra" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="45" />
          </filter>
          <filter id="glowFar" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id="glowMid" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="glowNear" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <clipPath id="mouthClip">
            <path d="M87 120 Q100 148 113 120 Q100 124 87 120Z" />
          </clipPath>
        </defs>

        {/* Glow lager 0 — ultra bred */}
        <ellipse cx="100" cy="115" rx="72" ry="82" fill={mid} filter="url(#glowUltra)" opacity="0.6" />
        {/* Glow lager 1 — bred yttre */}
        <ellipse cx="100" cy="115" rx="72" ry="82" fill={mid} filter="url(#glowFar)" opacity="0.9" />
        {/* Glow lager 2 — mellannivå */}
        <ellipse cx="100" cy="113" rx="66" ry="76" fill={mid} filter="url(#glowMid)" opacity="1" />
        {/* Glow lager 3 — tät inre kärna */}
        <ellipse cx="100" cy="110" rx="58" ry="68" fill={light} filter="url(#glowNear)" opacity="0.9" />

        {/* Fötter */}
        <ellipse cx="72" cy="182" rx="14" ry="10" fill={dark} />
        <ellipse cx="128" cy="182" rx="14" ry="10" fill={dark} />

        {/* Kropp */}
        <rect x="30" y="36" width="140" height="144" rx="40" ry="40" fill="url(#bodyGrad)" />

        {/* Highlight */}
        <ellipse cx="72" cy="72" rx="22" ry="13" fill="white" opacity="0.28" transform="rotate(-20 72 72)" />

        {/* Ögon */}
        {isHigh ? (
          <>
            <circle cx="75" cy="92" r="18" fill="white" />
            <circle cx="125" cy="92" r="18" fill="white" />
            <circle cx="77" cy="96" r="12" fill="#1a1a1a" />
            <circle cx="127" cy="96" r="12" fill="#1a1a1a" />
            <circle cx="83" cy="88" r="5" fill="white" />
            <circle cx="133" cy="88" r="5" fill="white" />
            <circle cx="87" cy="90" r="2" fill="white" />
            <circle cx="137" cy="90" r="2" fill="white" />
          </>
        ) : isOkay ? (
          <>
            <circle cx="75" cy="92" r="18" fill="white" />
            <circle cx="125" cy="92" r="18" fill="white" />
            <circle cx="77" cy="96" r="12" fill="#1a1a1a" />
            <circle cx="127" cy="96" r="12" fill="#1a1a1a" />
            <circle cx="83" cy="88" r="5" fill="white" />
            <circle cx="133" cy="88" r="5" fill="white" />
            <circle cx="87" cy="90" r="2" fill="white" />
            <circle cx="137" cy="90" r="2" fill="white" />
          </>
        ) : (
          <>
            {/* Svettdroppe */}
            <path d="M143 58 Q148 70 143 75 Q138 70 143 58Z" fill="#9bbfe8" opacity="0.9" />
            {/* Ledsna ögon — blicken nedåt */}
            <circle cx="75" cy="92" r="18" fill="white" />
            <circle cx="125" cy="92" r="18" fill="white" />
            <circle cx="77" cy="99" r="12" fill="#1a1a1a" />
            <circle cx="127" cy="99" r="12" fill="#1a1a1a" />
            <circle cx="83" cy="93" r="5" fill="white" />
            <circle cx="133" cy="93" r="5" fill="white" />
            <circle cx="87" cy="95" r="2" fill="white" />
            <circle cx="137" cy="95" r="2" fill="white" />
          </>
        )}

        {/* Blush */}
        <ellipse cx="52" cy="114" rx="13" ry="7" fill="#c47a7a" opacity="0.3" />
        <ellipse cx="148" cy="114" rx="13" ry="7" fill="#c47a7a" opacity="0.3" />

        {/* Mun */}
        {isLow ? (
          <path d="M78 138 Q100 126 122 138" stroke="#333" strokeWidth="5" fill="none" strokeLinecap="round" />
        ) : isOkay ? (
          <path d="M86 128 Q100 140 114 128" stroke="#333" strokeWidth="5" fill="none" strokeLinecap="round" />
        ) : (
          <>
            <path d="M87 120 Q100 148 113 120 Q100 124 87 120Z" fill="#222" stroke="#222" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
            <ellipse cx="100" cy="138" rx="16" ry="12" fill="#e08080" clipPath="url(#mouthClip)" />
          </>
        )}

      </svg>
    </motion.div>
    </motion.div>
  );
};
