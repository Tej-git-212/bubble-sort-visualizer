import './App.css';
import React, { useState, useEffect, useRef } from "react";

function App() {
  var [n, setN] = useState(0);
  var [array, setArray] = useState([]);
  var [sortHistory, setSortHistory] = useState([[...array]]);
  var [loopingVar, setLoopingVar] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    setArray(sortHistory[loopingVar]);
  }, [loopingVar, sortHistory]);

  const reset = () => {
    setN(0)
    setArray([])
    //setSortHistory([...array])
    //setLoopingVar(0)
    setPlaying(false)
  }


  useEffect(() => {
    if (loopingVar < sortHistory.length - 1 && playing) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setLoopingVar(loopingVar + 1);
      }, 500);
    } else {
      setPlaying(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loopingVar, playing]);

  const play = () => {
    setPlaying(true);
  };

  const handleChange = (e) => {
    // if(Number.isInteger(e.target.value) === true) {
      setN(Number(e.target.value)); 
  };

  const generateArray = () => {
    for(var p = 0; p < n; p++) {
      var r = Math.floor(Math.random() * 100);
      array.push(r);
    }
    console.log(array);
  }

  const bubblesort = () => {
    var historyArray = [[...array]];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          var swap = array[j];
          array[j] = array[j + 1];
          array[j + 1] = swap;
          historyArray.push([...array]);
        }
      }
    }
    console.log(historyArray);
    setSortHistory(historyArray);
    play();
  };

  return (
    <div>
    <h1>Bubble Sort Visualization</h1>
      <div className="container">
        <input className="input" type="text" onChange={handleChange} placeholder="Enter n"/>
        <button type="submit" onClick={generateArray} className="buttons">Generate Array</button>
        <button className="button" onClick={() => bubblesort()}>
          Sort
        </button>
        <button type="submit" id="reset" onClick={reset}>Reset</button>
      </div>
      <div id="graph">
      {array.map(element => (
        <div className="App" style={{ height: (element + 1) * 4, border : "1.5px solid black" }}>
            {element}
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;
