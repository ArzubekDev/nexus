type State = {
  group: boolean;
  chat: boolean;
  activeChatId: string | null; 
};

type Action =
  | { type: "OPEN_GROUP" }
  | { type: "CLOSE_GROUP" }
  | { type: "OPEN_CHAT"; payload: string } 
  | { type: "CLOSE_CHAT" };

export const initialState: State = {
  group: false,
  chat: false,
  activeChatId: null,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_GROUP":
      return { ...state, group: true };
    case "CLOSE_GROUP":
      return { ...state, group: false };
    case "OPEN_CHAT":
      return { 
        ...state, 
        chat: true, 
        activeChatId: action.payload
      };
    case "CLOSE_CHAT":
      return { ...state, chat: false, activeChatId: null };
    default:
      return state;
  }
}