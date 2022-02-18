import { createContext, useContext, useReducer } from "react";

// здесь, по сути, редаксовская логика управления состоянием чата
// но на useReducer и useContext

type ChatState = {
  user: {
    name: string;
    chatRoom: string;
  }
}

// #region действия
enum ActionTypes {
  SET_USER,
  CLEAR_USER
}
type SetUserAction = {
  type: ActionTypes.SET_USER;
  payload: {
    name: string;
    chatRoom: string;
  }
}
type ClearUserAction = {
  type: ActionTypes.CLEAR_USER;
}
// #endregion
type Action = SetUserAction | ClearUserAction;
type ChatMethods = {
  setUser: (user: ChatState['user']) => void;
  clearUser: () => void;
} 

const initialState: ChatState = {
  user: { name: '', chatRoom: '' }
};


const ChatStateContext = createContext<ChatState | undefined>(undefined);
const ChatMethodsContext = createContext<ChatMethods | undefined>(undefined);


const chatReducer = (state: ChatState, action: Action) => {
  switch(action.type) {
    
    case ActionTypes.SET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }

    case ActionTypes.CLEAR_USER: {
      return {
        ...state,
        user: { name: '', chatRoom: '' }
      }
    }

    default: {
      return state
    }
  }
}


export const useChat = (): [ChatState, ChatMethods] => {
  const stateContext = useContext(ChatStateContext);
  const methodsContext = useContext(ChatMethodsContext);
  if (!stateContext && !methodsContext) 
    throw new Error('useChat needs ChatProvider!!!');

  return [stateContext as ChatState, methodsContext as ChatMethods];
}

type ChatProviderProps = { children: React.ReactNode }

export const ChatProvider = ({children}: ChatProviderProps) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const setUser = (user: ChatState['user']) => {
    dispatch({
      type: ActionTypes.SET_USER,
      payload: user
    });
  }

  const clearUser = () => {
    dispatch({
      type: ActionTypes.CLEAR_USER
    })
  }

  return (
    <ChatStateContext.Provider value={state}>
      <ChatMethodsContext.Provider value={{setUser, clearUser}}>
        {children}
      </ChatMethodsContext.Provider>
    </ChatStateContext.Provider> 
  )
}
