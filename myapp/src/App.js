//import logo from './logo.svg';
//import './App.css';
import Header from './Header';
import Content from './Content';
import SearchList from './SearchList';
import Footer from './Footer';
import AddItem from './AddItem';
import { useState ,useEffect } from 'react';

function App() {
  
  const [items , setItems] = useState(JSON.parse(localStorage.getItem('listItems')) || []);

  const[newItem , setNewItem] = useState('');

  const [search , setSearch] = useState('');


//  console.log("Before UseEffect");

  useEffect(()=>{  // loadtime = [] only
      localStorage.setItem("listItems" , JSON.stringify(items))
  } ,[items])
  
  //console.log("After UseEffect");

  const addItem =(item) =>{
    const id = items.length ? items[items.length-1].id + 1 : 1;
    const myNewItem = {id , checked : false , item}
    const listItems = [...items , myNewItem];
    setItems(listItems);
  }

  const handleCheck =(id) =>{
    const listItems = items.map((item)=>
        item.id === id ? {...item ,checked : !item.checked} : item);
    setItems(listItems);
  }
  const handleDelete =(id)=>{
    const listItems = items.filter((item)=>
    item.id !== id );
    setItems(listItems);;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem);
    setNewItem('');
  }


  return (
    <div className="App">
     <Header title = "Groceries List" />
     <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
        
        />

        <SearchList 
            search = {search}
            setSearch = {setSearch}
            />
     <Content
        items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}/>
     <Footer 
      length = {items.length}
      />
    </div>
  );
}

export default App;


// Styled Components (install and use)