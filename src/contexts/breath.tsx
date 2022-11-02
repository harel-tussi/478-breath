import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";
import { Howl, Howler } from "howler";

export const STATE = {
  START: "start",
  INPROGRESS: "in-progress",
  END: "end",
};

type BreathContextType = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  startSession: (min: number) => void;
  step: string;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  percents: number;
  restart: () => void;
};

const BreathContext = createContext<null | BreathContextType>(null);

export const useBreath = () => {
  const context = useContext(BreathContext);
  if (!context) {
    throw new Error("useBreath must be used within a BreathProvider");
  }
  return context;
};

export const MINS = [1, 2, 5];

export const INHALE = "inhale";
export const HOLD = "hold";
export const EXHALE = "exhale";

var sound = new Howl({
  src: ["beep.mp3"],
  autoplay: false,
  loop: false,
  volume: 0.1,
});

export const STEP = {
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

export const BreathProvider = ({ children }: { children: ReactNode }) => {
  let interval = useRef(null as any);
  let timeout = useRef(null as any);
  const [state, setState] = useState("in-progress");
  const [min, setMin] = useState(0);
  const [step, setStep] = useState<keyof typeof STEP>(INHALE);
  const [seconds, setSeconds] = useState(0);
  const [percents, setPercents] = useState(0);
  const [total, setTotal] = useState(0);

  const startSession = (min: number) => {
    setMin(min);
    setState(STATE.INPROGRESS);
  };

  useEffect(() => {
    if (state !== STATE.INPROGRESS) return;
    interval.current = setInterval(() => {
      setTotal((prev) => prev + 1);
      setSeconds((prev) => {
        setPercents(((prev + 1) / STEP[step].seconds) * 100);
        return prev + 1;
      });
    }, 1 * 1000);
    timeout.current = setTimeout(() => {
      setPercents(0);
      setSeconds(0);
      setStep(STEP[step].nextStep);
      sound.play();
    }, STEP[step].seconds * 1000 + 500);
    return () => {
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    };
  }, [state, min, step]);

  useEffect(() => {
    if (total >= min * 60) {
      setState(STATE.END);
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    }
  }, [total]);

  useEffect(() => {
    if (state === STATE.END) {
      setSeconds(0);
      setPercents(0);
      setStep(INHALE);
      setTotal(0);
    }
  }, [state]);

  const restart = () => setState(STATE.START);

  return (
    <BreathContext.Provider
      value={{
        state,
        setState,
        startSession,
        step,
        seconds,
        setSeconds,
        percents,
        restart,
      }}
    >
      {children}
    </BreathContext.Provider>
  );
};
