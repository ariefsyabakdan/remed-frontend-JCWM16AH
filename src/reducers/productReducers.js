const INITIAL_STATE = {
  products_list: [],
};

export const productReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_BARANG":
      console.log("get data barang", action.payload);
      return {
        ...state,
        products_list: action.payload,
      };
    default:
      return state;
  }
};
