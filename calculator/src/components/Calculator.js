import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {

  const [input, setInput] = useState('0');
  const [previousNumber, setPreviousNumber] = useState(null);
  const [currentOperator, setCurrentOperator] = useState(null);
  const [shouldClearInput, setShouldClearInput] = useState(false);



  const handleButtonClick = (value) => {
    
    if (value === '.' && input.includes('.')) {
      return;
    }

    if (shouldClearInput) {

      setInput(value);
      setShouldClearInput(false);
    } 
      else {
        setInput((prevInput) => {
          if (prevInput === '0' && value === '.') {
            return prevInput + value; 
          } else if (prevInput === '0' && value !== '.') {
            return value;
          } else {
            return prevInput + value;
          }
        });
      };
  };


   const handleOperatorClick = (operator) => {

    if (previousNumber !== null && currentOperator !== null) {

      handleCalculate();
      setPreviousNumber(parseFloat(input));
      setCurrentOperator(operator);
      setShouldClearInput(true);
    } 
      else {
        setPreviousNumber(parseFloat(input));
        setCurrentOperator(operator);
        setShouldClearInput(true);
      };
  };

  const handleBackspace = () => {

    setInput((prevInput) => prevInput.length === 0 ? '0' : prevInput.slice(0, -1));
  };

  const handleToggleSign = () => {

    setInput((prevInput) => {

      if (prevInput[0] === '-') {
        return prevInput.slice(1);
      } 
        else {
          return '-' + prevInput;
        };
    });
  };

  const handleCalculate = () => {

    if (previousNumber !== null && currentOperator !== null) {

      try {
        const result = calculateExpressionWithTwoNumbers(previousNumber, parseFloat(input), currentOperator);
        setInput(result.toString());
        setPreviousNumber(null);
        setCurrentOperator(null);
        setShouldClearInput(true);
      } 
      catch (error) {

        setInput('Error');
        setPreviousNumber(null);
        setCurrentOperator(null);
        setShouldClearInput(true);
      }
    } 
  };

  const handleClear = () => {

    setInput('0');
    setPreviousNumber(null);
    setCurrentOperator(null);
    setShouldClearInput(false);
  };

  const calculateExpressionWithTwoNumbers = (firstNumber, secondNumber, operator) => {
    
    switch (operator) {
      case '+':
        return (firstNumber + secondNumber).toFixed(6);
      case '-':
        return (firstNumber - secondNumber).toFixed(6);
      case '*':
        return (firstNumber * secondNumber).toFixed(6);
      case '/':
        if (secondNumber !== 0) {

          return (firstNumber / secondNumber).toFixed(6);
        } 
          else {
            throw new Error('Division by zero');
          };
      case '%':
        if (secondNumber === 0) {

          return (firstNumber / 100).toFixed(6);
        } 
          else {
            return (secondNumber / 100).toFixed(6)
          };
      default:
        throw new Error('Error operator');
    }
  };

  const handleKeyDown = (event) => {

    const key = event.key;

    if (!isNaN(key) || key === '.') {
      handleButtonClick(key);
    } 
      else if (key === '=' || key === 'Enter') {
        handleCalculate();
      }
        else if ('+-*/%'.includes(key)) {
          handleOperatorClick(key);
        } 
          else if (key === 'Backspace') {
            handleBackspace();
          } 
            else if (key === 'Escape') {
              handleClear();
            }
  };

  useEffect(() => {

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, currentOperator]);

  return (
    <div className="calculator">
      <div className="input-output">
        <label htmlFor="evm">Calculator</label>
        <input type="text" id="evm" value={input} onChange={(e) => setInput(e.target.value) }/>
      </div>
      <div className="buttons">
        <div className="button-col">
          <div className="button-row">
            <button onClick={handleClear}>C</button>
            <button onClick={handleBackspace}>←</button>
            <button onClick={() => handleOperatorClick('%')}>%</button>
            <button onClick={() => handleOperatorClick('/')}>/</button>
          </div>
          <div className="button-row">
            <button onClick={() => handleButtonClick('1')}>1</button>
            <button onClick={() => handleButtonClick('2')}>2</button>
            <button onClick={() => handleButtonClick('3')}>3</button>
            <button onClick={() => handleOperatorClick('*')}>*</button>
          </div>
          <div className="button-row">
            <button onClick={() => handleButtonClick('4')}>4</button>
            <button onClick={() => handleButtonClick('5')}>5</button>
            <button onClick={() => handleButtonClick('6')}>6</button>
            <button onClick={() => handleOperatorClick('-')}>-</button>
          </div>
          <div className="button-row">
            <button onClick={() => handleButtonClick('7')}>7</button>
            <button onClick={() => handleButtonClick('8')}>8</button>
            <button onClick={() => handleButtonClick('9')}>9</button>
            <button onClick={() => handleOperatorClick('+')}>+</button>
          </div>
          <div className="button-row">
            <button onClick={handleToggleSign}>±</button>
            <button onClick={() => handleButtonClick('0')}>0</button>
            <button onClick={() => handleButtonClick('.')}>.</button>
            <button onClick={handleCalculate}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;