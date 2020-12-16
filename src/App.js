import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";

const TheContext = createContext();

function App() {
  const [state2, setState2] = useState("bla");
  const handleAnotherClick = useCallback(() => {
    setState2("bluh");
  }, []);

  const [state, setState] = useState("initial");
  const handleClick = useCallback(() => {
    if (state === "initial") {
      setState("clicked");
    } else {
      setState("initial");
    }
  }, [state]);

  useEffect(() => {
    console.log("ran", state2);
  }, [state, state2]);

  return (
    <TheContext.Provider value={state}>
      <div>
        <button onClick={handleAnotherClick}>Yo</button>
        <button onClick={handleClick}>Hey</button>
        {state === "clicked" && <MessageButton onClick={handleClick} />}
      </div>
    </TheContext.Provider>
  );
}

function MessageButton({ onClick }) {
  return (
    <div>
      <button onClick={onClick}>hey</button>
      <SomeThang />
    </div>
  );
}

const SomeThang = () => {
  const context = useContext(TheContext);
  return <div>some thang {context}</div>;
};

MessageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default App;
