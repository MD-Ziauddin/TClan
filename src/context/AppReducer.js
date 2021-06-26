export default (state, action) => {
  switch (action.type) {
    case 'ADD_USERBID':
      return {
        ...state,
        userBids: [...state.userBids, action.payload],
      };

    default:
      return state;
  }
};
