
type State = {
  group: boolean;
};
type Action =
  | { type: "OPEN" }
  | { type: "CLOSE" };


export const initialState: State = {
  group: false,
};


export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN":
      return { ...state, group: true };

    case "CLOSE":
      return { ...state, group: false };

    default:
      return state;
  }
}

