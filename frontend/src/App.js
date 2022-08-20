import * as React from "react";
import NumberFormat from "react-number-format";
import AuthForm from "./AuthForm";
import axios from "axios";
import "./App.css";

function App() {
  const [auth, setAuth] = React.useState(false);
  const [changeMode, setChangeMode] = React.useState(false);
  const [prizeId, setPrizeId] = React.useState(null);
  const [currentAmount, setCurrentAmount] = React.useState(0);
  const [changePrice, setChangePrice] = React.useState(0);

  React.useEffect(() => {
    // Get latest prize data from backend
    axios
      .get("/api/hole-in-one/latest")
      .then((res) => {
        const { content } = res.data;
        setPrizeId(content._id);
        setCurrentAmount(content.currentPrice);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (targetAmount) => {
    setCurrentAmount(currentAmount + targetAmount);
    setChangePrice(changePrice + targetAmount);
  };

  const submitPrice = () => {
    // Return function, when not chnaged
    if (changePrice === 0) return;
    // Create Post data
    const postData = {
      changePrice: changePrice,
    };

    // Call Backend API for updating prize data
    axios
      .put(`/api/hole-in-one/${prizeId}`, postData)
      .then((res) => {
        if (res.data.result === "SUCCESS") {
          // Set updated amount
          setCurrentAmount(res.data.updatedAmount);
          // Reset All state variables
          setAuth(false);
          setChangeMode(false);
          setChangePrice(0);
        } else setCurrentAmount(currentAmount);
      })
      .catch((e) => {
        console.log(e);
      });
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
            onClick={(e) => handleChange(100000)}
          >
            + 10만원
          </button>
          <button
            className="button-decrease"
            type="button"
            onClick={(e) => handleChange(-100000)}
          >
            - 10만원
          </button>
          <button
            className="button-increase"
            type="button"
            onClick={(e) => handleChange(50000)}
          >
            + 5만원
          </button>
          <button
            className="button-decrease"
            type="button"
            onClick={(e) => handleChange(-50000)}
          >
            - 5만원
          </button>
        </div>
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
            - 1천원
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
              value={currentAmount}
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
