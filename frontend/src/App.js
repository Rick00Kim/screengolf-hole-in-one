import * as React from "react";
import NumberFormat from "react-number-format";
import AuthForm from "./AuthForm";
import "./App.css";

function App() {
  const [totalAmount, setTotalAmount] = React.useState(5000000);
  const [changeMode, setChangeMode] = React.useState(false);
  const [auth, setAuth] = React.useState(false);

  const handleChange = (targetAmount) => {
    setTotalAmount(totalAmount + targetAmount);
  };

  const resetChangeMode = () => {
    setAuth(false);
    setChangeMode(false);
  };

  const defaultGroup = () => {
    return (
      <div className="buttonGroup">
        <button
          className="button-increase"
          type="button"
          onClick={(e) => setChangeMode(true)}
        >
          누적금액변경
        </button>
      </div>
    );
  };

  const authIndex = () => {
    return auth ? amountButtonActive() : <AuthForm authControl={setAuth} />;
  };

  const amountButtonActive = () => {
    return (
      <React.Fragment>
        <div className="buttonGroup">
          <button
            className="button-increase"
            type="button"
            onClick={(e) => handleChange(10000)}
          >
            + 1만원
          </button>
          <button
            className="button-decrease"
            type="button"
            onClick={(e) => handleChange(-10000)}
          >
            - 1만원
          </button>
          <button
            className="button-increase"
            type="button"
            onClick={(e) => handleChange(1000)}
          >
            + 1천원
          </button>
          <button
            className="button-decrease"
            type="button"
            onClick={(e) => handleChange(-1000)}
          >
            - 천원
          </button>
        </div>
        <div className="buttonGroup">
          <button
            className="button-apply"
            type="button"
            onClick={(e) => resetChangeMode()}
          >
            변경내용적용
          </button>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <p style={{ fontSize: "7em", marginTop: `3%`, marginBottom: `3%` }}>
          🎉 홀인원이벤트 ⛳️
        </p>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: "8em" }}>누적금액</div>
          <div style={{ fontSize: "25em", color: "#ffea00" }}>
            <NumberFormat
              thousandsGroupStyle="thousand"
              value={totalAmount}
              decimalSeparator="."
              displayType="text"
              type="text"
              thousandSeparator={true}
              allowNegative={true}
            />
            원
          </div>
        </div>
        {changeMode ? authIndex() : defaultGroup()}
      </header>
    </div>
  );
}

export default App;
