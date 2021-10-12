import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData.js";
import { connect } from "react-redux";
//import * as actions from "../../store/actions/index";

class Checkout extends React.Component {
    //no need after using redux
    // state = {
    //     ingredients: null,
    //     price: 0
    // };
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price;
    //     console.log(query.entries());
    //     for (var param of query.entries()) {
    //         if (param[0] === "price") {
    //             price = +param[1];
    //         } else ingredients[param[0]] = +param[1];
    //     }
    //     this.setState({ ingredients: ingredients, price: price });
    // }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinueHandler = () => {
        this.props.history.push("/checkout/contact-data");
    };

    render() {
        let Summary = <Redirect to="/" />;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? (
                <Redirect to="/" />
            ) : null;
            Summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        onCancel={this.checkoutCancelHandler}
                        onContinue={this.checkoutContinueHandler}
                    />
                    <Route
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData}
                        // render={props => (
                        //     <ContactData
                        //         ingredients={this.props.ingredients}
                        //         price={this.props.price}
                        //         {...props}
                        //     />
                        // )}
                    />
                </div>
            );
        }

        return Summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);
