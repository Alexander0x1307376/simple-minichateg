import React from "react";

export interface SystemMessageProps {
  text: string;
}

const SystemMessage: React.FC<SystemMessageProps> = ({text}) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  )
}

export default SystemMessage;