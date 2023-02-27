import * as React from "react"
import "./AuthForm.css"

function AuthForm(props) {
  // Controller from parent
  const { authControl, modeControl } = props

  // React States
  const [errorMessages, setErrorMessages] = React.useState({})
  const [password, setPassword] = React.useState("")

  // Auth Login info
  const database = {
    password: process.env.REACT_APP_AUTH_KEY,
  }

  const errors = {
    password: "관리자 비밀번호가 다릅니다.",
  }

  const handleCancel = () => {
    authControl(false)
    modeControl(false)
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault()

    if (database.password !== password) {
      // Invalid password
      setPassword("")
      setErrorMessages({ name: "password", message: errors.password })
    } else {
      authControl(true)
    }
  }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    )

  return (
    <>
      {renderErrorMessage("password")}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="title">관리자 비밀번호입력</div>
        <div className="input-container">
          <input
            className="pass-input"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            required
            inputmode="numeric"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input className="button-submit" type="submit" value="확인" />
        <input
          className="button-cancel"
          type="button"
          value="취소"
          onClick={handleCancel}
        />
      </form>
    </>
  )
}

export default AuthForm
