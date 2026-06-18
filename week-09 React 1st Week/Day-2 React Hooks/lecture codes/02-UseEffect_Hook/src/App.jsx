import { useState, useEffect } from "react";
import "./App.css";

function App() {
    return (
        <div>
            <h1>React Hooks</h1>
            <Counter />
        </div>
    );
}

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCount(function (count) {
                return count + 1;
            });
        }, 1000);

        console.log("Mounted");
    }, []);

    return (
        <div>
            <h1>{count}</h1>
        </div>
    );
}

export default App;