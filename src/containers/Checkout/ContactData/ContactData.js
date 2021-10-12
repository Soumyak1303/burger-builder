import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../.././../store/actions/index";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Enter your name"
                },
                value: "",
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: "",
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Zipcode"
                },
                value: "",
                validations: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: "",
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Enter your email"
                },
                value: "",
                validations: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "fastest" },
                        { value: "cheapest", displayValue: "cheapest" }
                    ]
                },
                value: "fastest",
                touched: false,
                valid: true,
                validations: {}
            }
        },
        isFormValid: false,
        loading: false
    };

    orderHandler = event => {
        event.preventDefault();
        const orderValues = {};
        for (let element in this.state.orderForm) {
            orderValues[element] = this.state.orderForm[element].value;
        }
        //this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: orderValues
        };

        this.props.onOrderPurchase(order);
        // axios
        //     .post("/orders.json", order)
        //     .then(response => {
        //         this.setState({ loading: false });
        //         console.log(response);
        //         this.props.history.push("/");
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false });
        //         console.log(error);
        //     });
    };

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    inputChangeHandler = (event, inputElement) => {
        const updatedForm = { ...this.state.orderForm };
        const updatedInputElement = { ...updatedForm[inputElement] };
        updatedInputElement.value = event.target.value;
        updatedInputElement.valid = this.checkValidity(
            updatedInputElement.value,
            updatedInputElement.validations
        );
        updatedInputElement.touched = true;
        updatedForm[inputElement] = updatedInputElement;

        let isFormValid = true;
        for (let element in updatedForm) {
            isFormValid = updatedForm[element].valid && isFormValid;
        }
        this.setState({ orderForm: updatedForm, isFormValid: isFormValid });
        console.log(updatedInputElement);
    };

    render() {
        const formElements = Object.keys(this.state.orderForm).map(key => {
            const elementProps = this.state.orderForm[key];
            return (
                <Input
                    key={key}
                    elementType={elementProps.elementType}
                    elementConfig={elementProps.elementConfig}
                    value={elementProps.value}
                    invalid={!elementProps.valid}
                    shouldValidate={elementProps.validations}
                    touched={elementProps.touched}
                    onChange={event => this.inputChangeHandler(event, key)}
                />
            );
        });

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements}
                <Button btnType="Success" disabled={!this.state.isFormValid}>
                    ORDER
                </Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className="ContactData">
                <h4>Please enter you contact details</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderPurchase: orderData => dispatch(actions.purchaseBurger(orderData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(ContactData, axios));
