import { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  function increaseCount() {
    setCount1((prev) => prev + 1);
  }

  function decreaseCount() {
    setCount2((prev) => prev - 1);
  }

  function resetCounts() {
    setCount1(0);
    setCount2(0);
  }

  return (
    <div className="app-container">
      <h1 className="app-heading">useEffect Cleanup and Dependency Array</h1>
      <Counter count1={count1} count2={count2} />
      <div className="button-group">
        <button className="btn btn-increase" onClick={increaseCount}>
          Increase Count
        </button>
        <button className="btn btn-decrease" onClick={decreaseCount}>
          Decrease Count
        </button>
        <button className="btn btn-reset" onClick={resetCounts}>
          Reset
        </button>
      </div>
    </div>
  );
}

function Counter(props) {
  console.log("Counter Component is Rendered");

  useEffect(function () {
    console.log("Counter Component is mounted");
    return function () {
      console.log("Counter Component is unmounted");
    };
  }, []);

  useEffect(
    function () {
      console.log("Count has changed");
      return function () {
        console.log("Cleanup inside second useEffect");
      };
    },
    [props.count1]
  );

  return (
    <div className="counter-display">
      <h2>Counter1: {props.count1}</h2>
      <h2>Counter2: {props.count2}</h2>
    </div>
  );
}

export default App;