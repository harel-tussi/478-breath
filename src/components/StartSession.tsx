import { MINS, useBreath } from "../contexts/breath";
import { motion } from "framer-motion";

type Props = {};

const StartSession = (props: Props) => {
  const { startSession } = useBreath();
  return (
    <div className="start">
      <motion.h1
        className="start__title"
        animate={{
          opacity: [0, 1],
        }}
      >
        Choose a breathe session time
      </motion.h1>
      {MINS.map((min, index) => {
        return (
          <motion.button
            onClick={() => startSession(min)}
            className="start-session__btn"
            key={min}
            animate={{ opacity: [0, 1], y: [100, 0] }}
            transition={{ delay: 0.3 * index }}
          >
            {min} min
          </motion.button>
        );
      })}
    </div>
  );
};

export default StartSession;
