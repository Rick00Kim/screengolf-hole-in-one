import * as React from "react"
import NumberFormat from "react-number-format"
import AuthForm from "./AuthForm"
import axios from "axios"
import { backendResultCodes } from "./Constants"
import "./App.css"

function App() {
  const [auth, setAuth] = React.useState(false)
  const [changeMode, setChangeMode] = React.useState(false)
  const [prizeId, setPrizeId] = React.useState(null)
  const [currentAmount, setCurrentAmount] = React.useState(0)
  const [changePrice, setChangePrice] = React.useState(0)
  const [initFlag, setInitFlag] = React.useState(false)

  React.useEffect(() => {
    // Get latest prize data from backend
    axios
      .get("/api/hole-in-one/latest")
      .then((res) => {
        const { content } = res.data
        if (content === undefined) {
          setInitFlag(true)
        } else {
          setPrizeId(content._id)
          setCurrentAmount(content.currentPrice)
          setInitFlag(false)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  const handleChange = (targetAmount) => {
    setCurrentAmount(currentAmount + targetAmount)
    setChangePrice(changePrice + targetAmount)
  }

  const submitPrice = () => {
    // Return function, when not chnaged
    if (changePrice === 0) {
      setAuth(false)
      setChangeMode(false)
      return
    }

    if (initFlag) {
      const postData = {
        initPrice: changePrice,
      }
      // Call Backend API for creating new prize data
      axios
        .post(`/api/hole-in-one`, postData)
        .then((res) => {
          const responseData = res.data
          if (responseData.result === backendResultCodes.SUCCESS) {
            // Set init amount
            setCurrentAmount(responseData.content.currentPrice)
            // Reset All state variables
            setAuth(false)
            setChangeMode(false)
            setChangePrice(0)
            setInitFlag(false)
            setPrizeId(responseData.content._id)
          } else setCurrentAmount(currentAmount)
        })
        .catch((e) => {
          console.log(e)
        })
    } else {
      // Create Put data
      const putData = {
        changePrice: changePrice,
      }

      // Call Backend API for updating prize data
      axios
        .put(`/api/hole-in-one/${prizeId}`, putData)
        .then((res) => {
          const responseData = res.data
          if (responseData.result === backendResultCodes.SUCCESS) {
            // Set updated amount
            setCurrentAmount(responseData.updatedAmount)
            // Reset All state variables
            setAuth(false)
            setChangeMode(false)
            setChangePrice(0)
          } else setCurrentAmount(currentAmount)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  const defaultGroup = () => {
    return (
      <div className="buttonGroup">
        <button
          className="button-increase"
          type="button"
          onClick={(e) => setChangeMode(true)}
        >
          {initFlag ? "초기금액설정" : "누적금액변경"}
        </button>
      </div>
    )
  }

  const authIndex = () => {
    return auth ? (
      amountButtonActive()
    ) : (
      <AuthForm authControl={setAuth} modeControl={setChangeMode} />
    )
  }

  const amountButtonActive = () => {
    return (
      <React.Fragment>
        {initFlag ? (
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
        ) : (
          ""
        )}
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
            {initFlag ? "홀인원이벤트시작" : "변경내용적용"}
          </button>
        </div>
      </React.Fragment>
    )
  }

  const initPrizeLayout = () => {
    return (
      <div style={{ flexGrow: 1 }}>
        <div className="event-amount-comment">초기금액설정</div>
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
    )
  }

  const processPrizeLayout = () => {
    return (
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
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <p className="event-title">🎉 홀인원이벤트 ⛳️</p>
        {initFlag ? initPrizeLayout() : processPrizeLayout()}
        {changeMode ? authIndex() : defaultGroup()}
      </header>
    </div>
  )
}

export default App
