import "./App.css";
import InProgressSession from "./components/InProgressSession";
import StartSession from "./components/StartSession";
import { STATE, useBreath } from "./contexts/breath";
import { motion, AnimatePresence } from "framer-motion";
import EndSession from "./components/EndSession";

type Props = {};

const App = (props: Props) => {
  const { state } = useBreath();
  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {state === STATE.START && (
          <motion.div
            key={STATE.START}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StartSession />
          </motion.div>
        )}
        {state === STATE.INPROGRESS && (
          <motion.div
            key={STATE.INPROGRESS}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InProgressSession />
          </motion.div>
        )}
        {state === STATE.END && (
          <motion.div
            key={STATE.END}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EndSession />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
