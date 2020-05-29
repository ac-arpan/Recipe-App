import React from 'react'
import style from '../recipe.module.css'

function Recipe({title,calories,image,ingredients}) {
    return (
        <div className = {style.recipe}>
            <h1> Dish Name : {title}</h1>
            <p> Calories : {calories}</p>
            <img className={style.image} src={image} alt ="" />
            <h2>Ingredients</h2>
            <ol>
                {ingredients.map(ingredient => <li>{ingredient.text}</li>)}
            </ol>
        </div>
    )
}

export default Recipe
