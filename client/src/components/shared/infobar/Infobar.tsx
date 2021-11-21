import React from "react";

export interface InfobarProps {
  room: string
}

const Infobar: React.FC<InfobarProps> = ({room}) => {
  return (
    <div className="notification is-info level">
      <div className="level-left">
        <h3>{room}</h3>
      </div>
      <div className="level-right">
        <a href="/">
          закрыть
        </a>
      </div>
    </div>
  )
}

export default Infobar;