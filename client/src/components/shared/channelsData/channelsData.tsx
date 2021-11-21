import React from 'react';
import { Rooms } from '../../../types';
import './channelsData.scss';

export interface RoomsDataProps {
  data: Rooms,
  selected: string,
  onSelect: (room: string) => void
}

const RoomsData: React.FC<RoomsDataProps> = ({ data, onSelect, selected}) => {

  const roomsElements: React.ReactNode[] = [];
  for (let key in data) {
    roomsElements.push(
      <li key={key}>
        <a
          className={selected === key ? 'is-active' : ''} 
          href={`/`}
          onClick={(e) => {
            e.preventDefault();
            onSelect(key);
          }}
        >
          {key}<span> ({data[key]})</span>
        </a>
      </li>
    );
  }

  return (
    <div className="rooms-component">
      <h2 className="is-size-4">Беседы</h2>
      <div className="menu rooms-menu">
        {
          roomsElements.length
          ? <ul className="menu-list">
              {roomsElements}
            </ul>
          : <div className="no-data has-text-dark has-text-centered">Нет активных бесед</div>
        }
      </div>
    </div>
  )
}

export default RoomsData;