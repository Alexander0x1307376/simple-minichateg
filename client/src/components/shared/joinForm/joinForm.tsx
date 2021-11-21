import React from 'react';


type JoinFormFields = {
  name: string,
  room: string
}

export interface JoinFormProps {
  values: JoinFormFields,
  onSubmit: (values: JoinFormFields) => void
  onChange: (values: JoinFormFields) => void
}

const JoinForm: React.FC<JoinFormProps> = ({
  onSubmit, 
  onChange,
  values: {name, room},
}) => {

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if(name && room)
        onSubmit({name, room});
    }}>
      <h2 className="is-size-4">Войти</h2>
      <div className="field">
        <label className="label">Ник</label>
        <input
          placeholder="Имя"
          className="input"
          type="text"
          value={name}
          onChange={(event) => onChange({name: event.target.value, room})}
        />
      </div>
      <div className="field">
        <label className="label">Комната</label>
        <input
          placeholder="Канал"
          className="input"
          type="text"
          value={room}
          onChange={(event) => onChange({ name, room: event.target.value })}
        />
      </div>
      
      <div className="field">
        <div className="control">
          <button className="button is-link" type="submit">
            Войти
          </button>
        </div>
      </div>
    </form>
  );
}

export default JoinForm;