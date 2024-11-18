// function getPosition() {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }

// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, aciton) {
      state.cart.push(aciton.payload);
    },
    deleteItem(state, aciton) {
      state.cart = state.cart.filter((item) => item.pizzaId !== aciton.payload);
    },
    addIngredient: {
      prepare(pizzaId, ingredient) {
        return { payload: { pizzaId, ingredient } };
      },
      reducer(state, action) {
        const item = state.cart.find(
          (item) => item.pizzaId === action.payload.pizzaId
        );
        if (item) {
          item.addIngredients.push(action.payload.ingredient);
        }
      },
    },
    removeIngredient: {
      prepare(pizzaId, ingredient) {
        return { payload: { pizzaId, ingredient } };
      },
      reducer(state, action) {
        const item = state.cart.find(
          (item) => item.pizzaId === action.payload.pizzaId
        );
        if (item) {
          item.removeIngredients.push(action.payload.ingredient);
        }
      },
    },
    deleteAddIngredient: {
      prepare(pizzaId, ingredient) {
        return { payload: { pizzaId, ingredient } };
      },
      reducer(state, action) {
        const item = state.cart.find(
          (item) => item.pizzaId === action.payload.pizzaId
        );
        if (item) {
          const newaddIngredients = item.addIngredients.filter(
            (ingredient) => ingredient !== action.payload.ingredient
          );

          item.addIngredients = newaddIngredients;
        }
      },
    },
    deleteRemoveIngredient: {
      prepare(pizzaId, ingredient) {
        return { payload: { pizzaId, ingredient } };
      },
      reducer(state, action) {
        const item = state.cart.find(
          (item) => item.pizzaId === action.payload.pizzaId
        );
        if (item) {
          const newRemoveIngredients = item.removeIngredients.filter(
            (ingredient) => ingredient !== action.payload.ingredient
          );

          item.removeIngredients = newRemoveIngredients;
        }
      },
    },
    increaseItemQuantity(state, aciton) {
      const item = state.cart.find((item) => item.pizzaId === aciton.payload);

      item.quantity++;

      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, aciton) {
      const item = state.cart.find((item) => item.pizzaId === aciton.payload);

      item.quantity--;

      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, aciton);
    },
    clearItem(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  addIngredient,
  removeIngredient,
  deleteAddIngredient,
  deleteRemoveIngredient,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearItem,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCartItems = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((num, item) => num + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((num, item) => num + item.totalPrice, 0);

export const getItemQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity || 0;
