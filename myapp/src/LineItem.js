import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
const LineItem = ({item , handleCheck , handleDelete}) => {
  return (
    <li className='items' key={item.id}>
    <input type="checkbox" 
      onChange={()=>handleCheck(item.id)}
      checked = {item.checked} />
      <label style={(item.checked) ? {textDecoration : "line-through"} : null }>{item.item}</label>
      <FaTrashAlt onClick = {() => handleDelete(item.id)} role={'button'} tabIndex = {0}  />
  </li>
  )
}

export default LineItem