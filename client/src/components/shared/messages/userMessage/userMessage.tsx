import React from "react";
import { Message } from "../../../../types";
import './userMessage.scss';

export interface UserMessageProps {
  message: Message,
  isCurrentUser: boolean
}

const UserMessage: React.FC<UserMessageProps> = ({ message: { text, user }, isCurrentUser}) => {

  return (
    <div className={isCurrentUser ? "message_right" : "message_left"}>
      <div className="speech-bubble is-primary">
        <p>{text}</p>
      </div>
        <span className="author">{user}</span>
    </div>
  );
}

export default UserMessage;