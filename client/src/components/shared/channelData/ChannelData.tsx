import React from "react";
import './ChannelData.scss';


export interface TextContainerProps {
  channelName?: string
  users: {
    id: string,
    name: string
  }[]
}

const ChannelData: React.FC<TextContainerProps> = ({ users, channelName}) => {
  return (
    <div className="chat_data card">
      <div className="card-header">
        <p className="card-header-title">Беседа {channelName || ''}</p>
      </div>
      <div className="card-content">
        <div className="content">
          <p>Людей в беседе: {users.length}</p>
          <ul>
            {
              users.map(user => <li key={user.id}>{user.name}</li>)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChannelData;