import "./styles.css";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
export default function App() {
  const initSteps = [
    { name: "1", active: true },
    { name: "2", active: false },
    { name: "3", active: false }
  ];
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState(initSteps);

  const next = () => {
    let stepValue = step < steps.length - 1 ? step + 1 : steps.length - 1;
    setStep(stepValue);
  };
  const previous = () => {
    let stepValue = step > 0 ? step - 1 : 0;
    setStep(stepValue);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <button id="progress-prev" onClick={() => previous()} class="btn">
        Prev
      </button>
      <button id="progress-next" onClick={() => next()} class="btn">
        Next
      </button>

      <ProgressBar steps={steps} activeStep={step} />
    </div>
  );
}
