import * as React from "react";
import NumberFormat from "react-number-format";
import AuthForm from "./AuthForm";
import "./App.css";

function App() {
  const [totalAmount, setTotalAmount] = React.useState(5000000);
  const [changedPrice, setChangedPrice] = React.useState(0);
  const [changeMode, setChangeMode] = React.useState(false);
  const [auth, setAuth] = React.useState(false);

  const handleChange = (targetAmount) => {
    setTotalAmount(totalAmount + targetAmount);
    setChangedPrice(changedPrice + targetAmount);
  };

  const submitPrice = () => {
    setAuth(false);
    setChangeMode(false);
    console.log(changedPrice);
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
            onClick={(e) => submitPrice()}
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
        <p className="event-title">🎉 홀인원이벤트 ⛳️</p>
        <div style={{ flexGrow: 1 }}>
          <div className="event-amount-comment">누적금액</div>
          <div className="event-amount">
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
