import { useEffect, useState } from "react";
import "./App.css";

type Props = {};

const mins = [1, 2, 5];

const STATE = {
  START: "start",
  INPROGRESS: "in-progress",
  END: "end",
};

const INHALE = "inhale";
const HOLD = "hold";
const EXHALE = "exhale";

const STEP = {
  [INHALE]: {
    seconds: 4,
    nextStep: HOLD,
  },
  [HOLD]: {
    seconds: 7,
    nextStep: EXHALE,
  },
  [EXHALE]: {
    seconds: 8,
    nextStep: INHALE,
  },
} as const;

const App = (props: Props) => {
  const [state, setState] = useState("start");
  const [min, setMin] = useState(0);
  const [step, setStep] = useState<keyof typeof STEP>(INHALE);
  const [seconds, setSeconds] = useState(1);

  const startSession = (min: number) => {
    setMin(min);
    setState(STATE.INPROGRESS);
  };

  useEffect(() => {
    let interval: any = null;
    if (state !== STATE.INPROGRESS) return;
    interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1 * 1000);
    setTimeout(() => {
      setSeconds(1);
      setStep(STEP[step].nextStep);
    }, STEP[step].seconds * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [state, min, step]);

  return (
    <div className="app">
      {state === STATE.START && (
        <div className="start">
          <h1 className="start__title">Choose a breathe session time</h1>
          {mins.map((min) => {
            return (
              <button
                onClick={() => startSession(min)}
                className="start-session__btn"
                key={min}
              >
                {min} min
              </button>
            );
          })}
        </div>
      )}
      {state === STATE.INPROGRESS && (
        <h1 style={{ color: "white" }}>{seconds}</h1>
      )}
    </div>
  );
};

export default App;
