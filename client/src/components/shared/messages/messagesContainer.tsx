import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import { Message } from "../../../types";
import UserMessage from "./userMessage/userMessage";
import './messagesContainer.scss';
import SystemMessage from "./systemMessage/systemMessage";

interface MessageItemProps {
  message: Message,
  userName: string
}

const MessageItem: React.FC<MessageItemProps> = ({ message, userName }) => {
  const trimmedName = userName.trim().toLowerCase();
  if (message.user === 'chat_system')
    return <SystemMessage text={message.text} />;
    
  const isSentByCurrentUser = message.user === trimmedName;
  return <UserMessage message={message} isCurrentUser={isSentByCurrentUser}/>
}


export interface MessagesProps {
  messages: Message[],
  name: string
}

const MessagesContainer: React.FC<MessagesProps> = ({messages, name}) => {

  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <MessageItem message={message} userName={name} />
        </div>)
      )}
    </ScrollToBottom>
  )
}

export default MessagesContainer;