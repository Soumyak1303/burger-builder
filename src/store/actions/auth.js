import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCESS,
        // authData: authData
        idToken: idToken,
        userId: userId
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2YacZ-V1dIkGibwRJoEmfbUvFuiSqquo";
        //https://identitytoolkit.googleapis.com
        //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
        // "https://api.allorigins.win/get?url=" +
        // encodeURIComponent(
        //     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2YacZ-V1dlkGibwRJoEmfbUvFuiSqquo"
        // );
        //"https://cors-anywhere.herokuapp.com/https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AlzaSyA2YacZ-V1dlkGibwRJoEmfbUvFuiSqquo";
        if (!isSignUp)
            url =
                // "https://api.allorigins.win/get?url=" +
                // encodeURIComponent(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2YacZ-V1dlkGibwRJoEmfbUvFuiSqquo";
        //);
        axios
            .post(url, authData)
            .then(response => {
                console.log(response);
                //console.log(JSON.parse(response.data.contents));
                response = JSON.parse(response.data.contents);
                console.log(response);
                dispatch(authSuccess(response.idToken, response.localId));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            });
    };
};
