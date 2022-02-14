import React from 'react'
import listStyles from './Utils';
// import fetchGroceries from './api';
import { useState } from 'react';

const List = () => {
    const[text, setText] = useState("");
    const[list, setList] = useState([]);

    const onChange = (e) => {
        setText(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if(text === ""){ return } 
        else{setList([...list, text])}
        setText("")
    }
    const upDate = (index) => {
        const todoList = [...list];
        if(text === ""){ return }
        else{todoList[index] = text};
        setList(todoList)
        setText("")
    }
    const removeItem = (index) => {
        const filterList = [...list].filter((item, itemIndex) => {
            return index !== itemIndex 
        })
        setList(filterList)
    }
    return (
        <>
            <div style={listStyles.div}>
                <input style={listStyles.input} value={text} type="text" onChange={onChange}></input> 
                <button style={listStyles.button} type="submit" onClick={onSubmit}>Add</button>
            </div>
            <ul style={listStyles.ul}>
                {list.map((item,index) => 
                <li style={listStyles.li} key={index}>{item}<div>
                <button style={listStyles.update} onClick={()=>upDate(index)}>edit</button>
                <button style={listStyles.update} onClick={()=>removeItem(index)}>delete</button></div></li>)}
            </ul>
        </>
    )
}

export default List

