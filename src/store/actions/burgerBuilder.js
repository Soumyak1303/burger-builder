import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios
            .get("/ingredients.json")
            .then(response => {
                dispatch(setIngredients(response.data));
                //this.setState({ ingredients: response.data });
            })
            .catch(error => {
                // console.log(error);
                // this.setState({ error: true });
                dispatch(fetchIngredientFailed());
            });
    };
};
