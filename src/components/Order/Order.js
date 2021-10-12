import React from "react";
import "./Order.css";

const order = props => {
    let ingredients = [];
    for (let ing in props.ingredients) {
        ingredients.push({ name: ing, amount: props.ingredients[ing] });
    }
    const ingredientsOutput = ingredients.map(ig => {
        return (
            <span
                style={{
                    textTransform: "capitalize",
                    display: "inline-block",
                    margin: "0 8px",
                    border: "1px solid #ded59b",
                    padding: "5px",
                    borderRadius: "2px"
                }}
                key={ig.name}
            >
                {ig.name}: {ig.amount}
            </span>
        );
    });
    return (
        <div className="Order">
            <p>Ingredients: {ingredientsOutput}</p>
            <p>
                Total Price: <strong>{props.price.toFixed(2)}$</strong>
            </p>
        </div>
    );
};

export default order;
