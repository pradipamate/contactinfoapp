const TaskBook = [];

export default (state = TaskBook, action) => {
  switch (action.type) {
    case "ADD_LIST":
    return [...state, action.payload];

    case "FOR_UPDATED":
        let EditData = action.payload;
        const Data = state.find((item) => item.id === EditData.id);
        Data.fullname = EditData.fullname;
        Data.email = EditData.email;
        Data.phonenumber = EditData.phonenumber;
        Data.companyname = EditData.companyname;
        Data.address = EditData.address;
        return [...state];

    default:
      return state;
  }
};

