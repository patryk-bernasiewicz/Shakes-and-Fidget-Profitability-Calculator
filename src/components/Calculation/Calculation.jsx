import React from 'react';
import PropTypes from 'prop-types';
import './Calculation.css';

const toNumber = (number) => parseFloat(number.toString().replace(',', '.')) || 0;

const calculateProfitability = (rawGold, rawItemWorth, rawTime) => {
  const gold = toNumber(rawGold);
  const itemWorth = toNumber(rawItemWorth);
  const time = toNumber(rawTime);

  if (gold <= 0 || time <= 0) {
    return 0;
  }

  return (gold + itemWorth) / time;
}

const round = (number) => Math.round(number * 100) / 100;

const Calculation = ({ label, gold, itemWorth, time, onUpdate, useRef }) => {
  const [profitability, setProfitability] = React.useState(0);
  
  const handleUpdate = (event) => {
    const { name, value } = event.target;
    onUpdate(name, value);
  };

  React.useEffect(() => {
    const newProfitability = round(calculateProfitability(gold, itemWorth, time));
    setProfitability(newProfitability);
  }, [gold, itemWorth, time])

  const firstInputRef = useRef || null;

  return (
    <div className="Calculation">
      <div className="Calculation__label">{label}</div>
      <input type="text" name="gold" value={gold} onChange={handleUpdate} ref={firstInputRef} />
      <input type="text" name="itemWorth" value={itemWorth} onChange={handleUpdate} />
      <input type="text" name="time" value={time} onChange={handleUpdate} />
      <input readOnly tabIndex="-1" type="text" name="profitability" value={profitability} />
    </div>
  )
};

Calculation.propTypes = {
  label: PropTypes.string.isRequired,
  gold: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  autofocus: PropTypes.bool,
};

export default Calculation;
