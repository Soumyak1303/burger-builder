import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL
    };
};

export const purchaseBurgerStart = orderData => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
            .post("/orders.json", orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
                // this.setState({ loading: false });
                // console.log(response);
                // this.props.history.push("/");
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
                // this.setState({ loading: false });
                // console.log(error);
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrderSucess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCESS,
        orders: orders
    };
};

export const fetchOrderFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios
            .get("/orders.json")
            .then(res => {
                // console.log(res);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSucess(fetchedOrders));
                // this.setState({ loading: false, order: fetchedOrders });
                // console.log(this.state.order)
            })
            .catch(err => {
                dispatch(fetchOrderFail(err));
                //    this.setState({ loading: false });
            });
    };
};
