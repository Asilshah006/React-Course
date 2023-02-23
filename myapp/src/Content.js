import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const Content = () => {
  const [items , setItems] = useState([
    {
      id : 1,
      checked : false,
      item : "One Half Pound bag of cocoa covered Almonds Unsalted"
    },
    {
      id : 2,
      checked : false,
      item : "item 2"
    },
    {
      id : 3,
      checked : false,
      item : "item 3"
    },
  ])

  const handleCheck =(id) =>{
    const listItems = items.map((item)=>
        item.id === id ? {...item ,checked : !item.checked} : item);
    setItems(listItems);
    localStorage.setItem("listItems",JSON.stringify(listItems))
  }

  const handleDelete =(id)=>{
    const listItems = items.filter((item)=>
    item.id !== id );
    setItems(listItems);
    localStorage.setItem("listItems",JSON.stringify(listItems));
  }
  
    return (
    <main>
      {items.length ? (
      <ul>
        {items.map((item) =>(
          <li className='items' key={item.id}>
            <input type="checkbox" 
              onChange={()=>handleCheck(item.id)}
              checked = {item.checked} />
              <label style={(item.checked) ? {textDecoration : "line-through"} : null }>{item.item}</label>
              <FaTrashAlt onClick = {() => handleDelete(item.id)} role={'button'} tabIndex = {0}  />
          </li>
        ))}
      </ul>
      ) : (
        <p style={{marginTop: 20}}>Your List is Empty</p>
      )}
    </main>
  )
}

export default Content