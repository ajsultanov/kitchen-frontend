import React from 'react';

export default function RecipeRow(props) {

    function timeConvert() {
        const minutes = props.result.time
        const hours = minutes / 60 > 2 ? " hours " : " hour "
        const mins = minutes % 60 !== 0 ? minutes % 60 + " minutes" : ""
        if (minutes > 59) {
            return Math.floor(minutes / 60) + hours + mins
        } else {
            return minutes + " minutes"
        }
    }

    function nameShortener() {
        const name = props.result.name
        return name.length > 30 ? name.slice(0, 27) + "..." : name
    }

    function addDefaultSrc(e) {
        e.target.src = "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
    }

    return (
        <tr>
            <td><img className="row-image" src={'https://spoonacular.com/recipeImages/' + props.result.image} alt={props.result.name} onError={addDefaultSrc}/></td>
            <td>{nameShortener()}</td>
            <td>{timeConvert()}</td>
            <td>{props.result.servings}</td>
        </tr>
    )
}