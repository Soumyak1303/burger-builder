import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.6,
    meat: 0.8
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredients = updateObject(state.ingredients, {
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            });
            return updateObject(state, {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            });
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngs = updateObject(state.ingredients, {
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            });
            return updateObject(state, {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            });

        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4
            });
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return updateObject(state, { error: true });
        default:
            return state;
    }
};

export default reducer;
