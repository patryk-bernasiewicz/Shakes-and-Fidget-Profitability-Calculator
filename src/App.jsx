import React from 'react';
import './App.css';

import Calculation from './components/Calculation/Calculation';
import ResetButton from './components/ResetButton/ResetButton';

const initialState = { gold: '0', itemWorth: '0', time: '0' };
const createBaseArray = (length = 3) => new Array(length).fill(null);

function App() {
  const fieldsCount = 3;
  const [data, setData] = React.useState(createBaseArray(fieldsCount).map(() => ({ ...initialState })));
  const firstInput = React.useRef();

  const handleUpdate = (index) => (name, value) => {
    if (!/^[\d,.]{0,5}$/.test(value)) {
      return;
    }

    const newData = [...data];
    newData[index] = { ...newData[index], [name]: value };
    setData(newData);
  };

  const handleReset = () => {
    const { current } = firstInput;
    const newData = [...data].map(() => ({ ...initialState }));
    setData(newData);
    if (current) {
      current.focus();
      setTimeout(() => {
        current.select();
      }, 0);
    }
  };

  return (
    <div className="App">
      <div className="App__headings">
        <div className="App__explanation">
          Gold
        </div>
        <div className="App__explanation">
          Item worth
        </div>
        <div className="App__explanation">
          Time
        </div>
        <div className="App__explanation">
          Profitability
        </div>
      </div>
      {createBaseArray(fieldsCount).map((_, index) =>
        <Calculation
          key={index}
          label={`Quest ${index + 1}`}
          gold={data[index].gold.toString()}
          itemWorth={data[index].itemWorth.toString()}
          time={data[index].time.toString()}
          profitability={data[index].profitability}
          onUpdate={handleUpdate(index)}
          useRef={index === 0 ? firstInput : null}
        />
      )}
      <ResetButton onClick={handleReset} />
    </div>
  );
}

export default App;
