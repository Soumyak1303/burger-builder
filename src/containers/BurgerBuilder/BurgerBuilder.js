import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Auxx from "../../hoc/Auxx/Auxx";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index"; //can omit index
//import {withRouter} from 'react-router-dom';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        // axios
        //     .get("/ingredients.json")
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({ error: true });
        //     });
        this.props.onInitIngredients();
    }

    // addIngredientHandler = type => {
    //     let updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = this.props.ings[type] + 1;
    //     const updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // };

    // removeIngredientHandler = type => {
    //     let updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     if (updatedIngredients[type] === 0) return;
    //     updatedIngredients[type] = this.props.ings[type] - 1;
    //     const updatedPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // };

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, ele) => {
                return sum + ele;
            }, 0);
        return sum > 0;
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // alert(`you've continued!`);
        // const queryParams = [];
        // for (var i in this.props.ings) {
        //     queryParams.push(
        //         encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i])
        //     );
        // }
        // queryParams.push("price=" + this.props.totalPrice);
        // const queryString = queryParams.join("&");
        // this.props.history.push({
        //     pathname: "/checkout",
        //     search: "?" + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.error ? (
            <p>Error Occured. Please come back later :'(</p>
        ) : (
            <Spinner />
        );
        let orderSummary = null;

        if (this.props.ings) {
            burger = (
                <Auxx>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Auxx>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.props.totalPrice}
                />
            );
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        return (
            <Auxx>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxx>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
