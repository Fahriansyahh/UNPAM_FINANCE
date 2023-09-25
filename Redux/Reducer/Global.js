const initiliState = {
  Global: "halo",
};

const Global = (state = initiliState, action) => {
  if (action.type === "CashflowKey") {
    return {
      ...state,
      CashflowKey: action.payload,
    };
  }
  if (action.type === "UnitKey") {
    return {
      ...state,
      UnitKey: action.payload,
    };
  }
  if (action.type === "Permission") {
    return {
      ...state,
      Permission: action.payload,
    };
  }

  return state;
};

export default Global;
