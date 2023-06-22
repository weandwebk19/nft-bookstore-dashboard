import { SET_ROLE } from "../actions/types";

const initialState = {
  roleType: 1,
};

const roleReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ROLE:
      return {
        ...state,
        roleType: payload.roleType,
      };
    default:
      return state;
  }
};

export default roleReducer;
