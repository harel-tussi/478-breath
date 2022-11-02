import { useBreath } from "../contexts/breath";

type Props = {};

const EndSession = (props: Props) => {
  const { restart } = useBreath();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button className="start-session__btn" onClick={restart}>
        Restart
      </button>
    </div>
  );
};

export default EndSession;
