// reducer/useReducer.ts

type State = {
  group: boolean;
  chat: boolean;
  activeChatId: string | null; // 1. Бул жерге коштук
};

type Action =
  | { type: "OPEN_GROUP" }
  | { type: "CLOSE_GROUP" }
  | { type: "OPEN_CHAT"; payload: string } // 2. payload коштук
  | { type: "CLOSE_CHAT" };

export const initialState: State = {
  group: false,
  chat: false,
  activeChatId: null, // 3. Баштапкы абалы бош
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
        activeChatId: action.payload // Эми ката бербейт
      };
    case "CLOSE_CHAT":
      return { ...state, chat: false, activeChatId: null };
    default:
      return state;
  }
}