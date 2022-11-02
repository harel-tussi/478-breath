import { EXHALE, HOLD, INHALE, useBreath } from "../contexts/breath";
import { motion, AnimatePresence } from "framer-motion";
type Props = {};

const SIZE = 200;
const RADIUS = 45;
const STROKE_WIDTH = 6;
const STROKE = "#ffffff";
const EMPTY_STROKE = STROKE;
const EMPTY_STROKE_OPACITY = 0.25;

const InProgressSession = (props: Props) => {
  const { step, seconds, percents } = useBreath();
  const circumference = Math.ceil(2 * Math.PI * RADIUS);
  const fillPercents = Math.abs(
    Math.ceil((circumference / 100) * (percents - 100))
  );

  const transition = {
    duration: 1,
    delay: 0,
    ease: "easeIn",
  };

  const variants = {
    hidden: {
      strokeDashoffset: circumference,
      transition,
    },
    show: {
      strokeDashoffset: fillPercents,
      transition,
    },
  };

  return (
    <div style={{ position: "relative" }}>
      <svg
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={SIZE}
        height={SIZE}
      >
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          className="circle"
          strokeWidth={STROKE_WIDTH}
          stroke={EMPTY_STROKE}
          strokeOpacity={EMPTY_STROKE_OPACITY}
          fill="transparent"
        />
      </svg>
      <svg
        viewBox="0 0 100 100"
        width={SIZE}
        height={SIZE}
        style={{
          position: "absolute",
          transform: "rotate(-90deg)",
          overflow: "visible",
          marginLeft: -SIZE,
        }}
      >
        <motion.circle
          cx="50"
          cy="50"
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
          stroke={STROKE}
          fill="transparent"
          strokeDashoffset={fillPercents}
          strokeDasharray={circumference}
          variants={variants}
          initial="hidden"
          animate={"show"}
        />
      </svg>
      <h1
        style={{
          textAlign: "center",
          color: "white",
          top: -SIZE / 2 - 20,
          position: "relative",
        }}
      >
        {seconds}
      </h1>
      <AnimatePresence mode="wait">
        {[
          { key: INHALE, text: "Inhale slowly" },
          { key: HOLD, text: "Hold your breath" },
          { key: EXHALE, text: "Exhale slowly" },
        ].map((s) => {
          if (s.key !== step) return null;
          return (
            <motion.h2
              key={s.key}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              style={{
                textAlign: "center",
                color: "white",
              }}
            >
              {s.text}
            </motion.h2>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default InProgressSession;
