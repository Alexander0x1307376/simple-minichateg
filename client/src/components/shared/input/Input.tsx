import React from "react";

export interface InputProps {
  setMessage: (value: string) => void,
  sendMessage: () => void,
  message: string
}

const Input: React.FC<InputProps> = ({ setMessage, sendMessage, message }) => {

  return (
    <form>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="сообщение"
            value={message}
            onChange={event => setMessage(event.target.value)}
            onKeyPress={event =>
              event.key === 'Enter'
                ? () => {
                  event.preventDefault();
                  sendMessage();
                }
                : null}
          />
        </div>
        <div className="control">
          <button className="button is-info" onClick={(event) =>{
            event.preventDefault();
            sendMessage()
          }}>Отправить</button>
        </div>
      </div>
      
    </form>
  )
}

export default Input;