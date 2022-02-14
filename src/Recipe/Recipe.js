import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import "../App.css"
const URL = process.env.REACT_APP_API_URL;
const recipeKey = process.env.REACT_APP_API_KEY;

const Recipe = () => {
    const [hints, setHints] = useState([])
    const[text, setText] = useState("beans");
    const[search,setSearch]=useState("");
    const onChange = (e) => {
        setText(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        setSearch(text);
    }
    useEffect(() => { 
        axios
            .get(
                `${URL}?ingr=${text}`,
            {
             headers: {
                'x-rapidapi-key': `${recipeKey}`,
                'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com'
            },   
            })
            .then((res) => setHints(res.data.hints))
            .catch((err) => console.log(err))
     },[search])

    
    return (
        <div className="cook">
           <input  type="text" onChange={onChange} ></input>
           <button className="btn" onClick={onSubmit}>Search</button> 
           {hints.map((hint,index) => (
            <div key={index}>
                <p>{hint.food.label}</p>
                <img src={hint.food.image} alt=""/>
                <div>
                  <p>Calories: {hint.food.nutrients.ENERC_KCAL}g</p>
                  <p>Protein: {hint.food.nutrients.PROCNT}g</p>
                  <p>Carbohydrates: {hint.food.nutrients.CHOCDF}g</p>
                  <p>Fiber: {hint.food.nutrients.FIBTG}g</p>
                  <p>Fat: {hint.food.nutrients.FAT}g</p>
                </div>
               
            </div>
           ))}
        </div>
    )
}

export default Recipe
