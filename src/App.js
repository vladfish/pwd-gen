import { useState } from "react";
import "./styles/App.css";

function App() {
  const [uppercase, setUppercase] = useState(true);
  const [lowercasse, setLowercasse] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const [password, setPassword] = useState("P4$5W0rD!");
  const [pwdLength, setPwdLength] = useState(0);
  const [pwdStrength, setPwdStrength] = useState("TOO WEAK!");

  const [bar, setBar] = useState(0);

  const [copied, setCopied] = useState(false);

  const generatePassword = (e) => {
    e.preventDefault();

    setCopied(false);

    let charset = "";
    let newPassword = "";

    if (symbols) charset += "!@#$%^&*()";
    if (numbers) charset += "0123456789";
    if (lowercasse) charset += "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < pwdLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
    setPwdStrength(newPassword);

    if (pwdLength <= 4) {
      setPwdStrength("TOO WEAK!");
      setBar(1);
    }

    if (pwdLength >= 5 && pwdLength <= 9) {
      setPwdStrength("WEAK");
      setBar(2);
    }

    if (pwdLength >= 9 && pwdLength <= 13) {
      setPwdStrength("MEDIUM");
      setBar(3);
    }

    if (pwdLength >= 13 && pwdLength <= 20) {
      setPwdStrength("STRONG");
      setBar(4);
    }
  };

  const copying = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  /*--------slider bg size----------*/
  const MAX = 20;
  const getBackgroundSize = () => {
    return { backgroundSize: `${(pwdLength * 100) / MAX}% 100%` };
  };
  /*--------------------------*/

  return (
    <div className="container">
      <div className="title">Password Generator</div>
      <div className="pwd-display">
        <div className="pwd-text">{password}</div>
        <div className="copy-box">
          {copied ? <div className="copied">COPIED</div> : null}
          <button className="pwd-copy" onClick={() => copying()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="24"
              viewBox="0 0 21 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.909 0.659016L20.341 3.09098C20.763 3.51294 21 4.08523 21 4.68197V17.25C21 18.4926 19.9926 19.5 18.75 19.5H15V21.75C15 22.9926 13.9926 24 12.75 24H2.25C1.00734 24 0 22.9926 0 21.75V6.75C0 5.50734 1.00734 4.5 2.25 4.5H6V2.25C6 1.00734 7.00734 0 8.25 0H16.3181C16.9147 3.12036e-06 17.4871 0.237058 17.909 0.659016ZM2.53126 21.75H12.4687C12.5434 21.75 12.6149 21.7204 12.6677 21.6677C12.7204 21.6149 12.75 21.5434 12.75 21.4687V19.5H8.25C7.00734 19.5 6 18.4926 6 17.25V6.75H2.53126C2.45665 6.75 2.38512 6.77963 2.33238 6.83238C2.27963 6.88512 2.25 6.95665 2.25 7.03126V21.4687C2.25 21.5434 2.27963 21.6149 2.33238 21.6677C2.38512 21.7204 2.45665 21.75 2.53126 21.75ZM18.4687 17.25H8.53126C8.45665 17.25 8.38512 17.2204 8.33238 17.1677C8.27963 17.1149 8.25 17.0434 8.25 16.9687V2.53126C8.25 2.45665 8.27963 2.38512 8.33238 2.33238C8.38512 2.27963 8.45665 2.25 8.53126 2.25H13.5V6.375C13.5 6.99632 14.0036 7.5 14.625 7.5H18.75V16.9687C18.75 17.0434 18.7204 17.1149 18.6677 17.1677C18.6149 17.2204 18.5434 17.25 18.4687 17.25ZM15.75 5.25H18.75V4.7985C18.75 4.76156 18.7427 4.72499 18.7286 4.69086C18.7145 4.65673 18.6937 4.62572 18.6677 4.59961L16.4004 2.33236C16.3476 2.27963 16.2761 2.25 16.2014 2.25H15.75V5.25Z"
                fill="#A4FFAF"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="main">
        <div className="character-length">
          <div className="character-text">Character Length</div>
          <div className="character-input">
            <input
              type="text"
              min={0}
              max={20}
              value={pwdLength}
              onChange={(e) => setPwdLength(e.target.value)}
            />
          </div>
        </div>
        <label>
          <input
            type="range"
            min={1}
            max={MAX}
            value={pwdLength}
            onChange={(e) => setPwdLength(e.target.value)}
            className="slider"
            style={getBackgroundSize()}
          />
        </label>
        <div className="checkboxes">
          <div className="checkbox-wrapper">
            <label>
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
              <span>Include Uppercase Letters</span>
            </label>
          </div>
          <div className="checkbox-wrapper">
            <label>
              <input
                type="checkbox"
                checked={lowercasse}
                onChange={(e) => setLowercasse(e.target.checked)}
              />
              <span>Include Lower Letters</span>
            </label>
          </div>
          <div className="checkbox-wrapper">
            <label>
              <input
                type="checkbox"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
              />
              <span>Include Numbers</span>
            </label>
          </div>
          <div className="checkbox-wrapper">
            <label>
              <input
                type="checkbox"
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
              />
              <span>Include Symbols</span>
            </label>
          </div>
        </div>
        <div className="strength-meter">
          <div className="strength-meter__text">STRENGTH</div>
          <div className="strength-meter__display">
            <span>{pwdStrength}</span>
            <div className="meter-items__wrapper">
              <div
                className={`item ${
                  bar === 0 ? "border-[#E6E5EA] border-[2px]" : ""
                } ${bar === 1 ? "bg-red" : ""} ${
                  bar === 2 ? "bg-orange" : ""
                } ${bar === 3 ? "bg-yellow" : ""} ${
                  bar === 4 ? "bg-green" : ""
                }`}
              ></div>
              <div
                className={`item ml-[8px] ${
                  bar <= 1 ? "border-[#E6E5EA] border-[2px]" : ""
                } ${bar === 2 ? "bg-orange" : ""} ${
                  bar === 3 ? "bg-yellow" : ""
                } ${bar === 4 ? "bg-green" : ""}`}
              ></div>
              <div
                className={`item ml-[8px] ${
                  bar <= 2 ? "border-[#E6E5EA] border-[2px]" : ""
                } ${bar === 3 ? "bg-yellow" : ""} ${
                  bar === 4 ? "bg-green" : ""
                }`}
              ></div>
              <div
                className={`item ml-[8px] ${
                  bar <= 3 ? "border-[#E6E5EA] border-[2px]" : ""
                } ${bar === 4 ? "bg-green" : ""}`}
              ></div>
            </div>
          </div>
        </div>
        <div className="gen-btn">
          <button type="submit" className="btn" onClick={generatePassword}>
            GENERATE
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.10553 12L11.1055 6.00002L5.10553 0L3.84051 1.26501L7.681 5.10547L6.10352e-05 5.10547V6.8946L7.681 6.8946L3.84051 10.735L5.10553 12Z"
                fill="#24232C"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
