// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState(0);

  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("INR");

  const [isSelected, setIsSelected] = useState(currency1);

  const inputValue = isSelected === currency1 ? value1 : value2;
  const inputCurrency = isSelected === currency1 ? currency1 : currency2;
  const outputCurrency = inputCurrency === currency1 ? currency2 : currency1;

  const host = "api.frankfurter.app";
  useEffect(
    function () {
      async function Test() {
        isSelected === currency1 && value1 === 0 && setValue2(0);
        isSelected === currency2 && value2 === 0 && setValue1(0);
        inputCurrency === outputCurrency && setValue2(value1);
        if (inputValue > 0 && inputCurrency !== outputCurrency) {
          const response = await fetch(
            `https://${host}/latest?amount=${inputValue}&from=${inputCurrency}&to=${outputCurrency}`
          );
          const data = await response.json();
          response.ok && isSelected === currency1
            ? setValue2(data.rates[outputCurrency])
            : setValue1(data.rates[outputCurrency]);
        }
      }
      Test();
    },
    [
      inputValue,
      inputCurrency,
      outputCurrency,
      isSelected,
      value1,
      value2,
      currency1,
      currency2,
    ]
  );

  function handleInputValue1Change(value) {
    if (!isNaN(value)) {
      setValue1(value);
      setIsSelected(currency1);
    }
  }

  function handleInputValue2Change(value) {
    if (!isNaN(value)) {
      setValue2(value);
      setIsSelected(currency2);
    }
  }

  function handleSelect1(value) {
    setCurrency1(value);
    setIsSelected(value);
  }

  function handleSelect2(value) {
    setCurrency2(value);
    setIsSelected(value);
  }

  return (
    <div className="container">
      <input
        type="text"
        // value={isSelected === currency1 ? value1 : value2}
        value={value1}
        onChange={(e) => handleInputValue1Change(Number(e.target.value))}
      />
      <select
        defaultValue={"USD"}
        onChange={(e) => handleSelect1(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p> = </p>
      <input
        type="text"
        // value={isSelected === currency2 ? value1 : value2}
        value={value2}
        onChange={(e) => handleInputValue2Change(Number(e.target.value))}
      />
      <select
        defaultValue={"INR"}
        onChange={(e) => handleSelect2(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
    </div>
  );
}
