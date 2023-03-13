//import logo from './logo.svg';
//import './App.css';
import Header from './Header';
import Content from './Content';
import SearchList from './SearchList';
import Footer from './Footer';
import AddItem from './AddItem';
import requestApi from './requestApi';
import { useState ,useEffect } from 'react';

function App() {
  const API_URL = "http://localhost:3500/items";
  
  const [items , setItems] = useState([]);

  const[newItem , setNewItem] = useState('');

  const [search , setSearch] = useState('');

  const[fetchError , setFetchError] = useState(null);

  const[isLoading , setIsLoading] = useState(true);

  //  console.log("Before UseEffect");

  useEffect(()=>{  // loadtime = [] only

    const fetchItems = async () =>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error ("Didn't recieve expected data")
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null)
      } catch(err){
          setFetchError(err.message);
      } finally{
          setIsLoading(false);
      }
    }

    setTimeout(() =>{
      (async ()=> fetchItems())();
    } , 2000)

  } ,[])
  
  //console.log("After UseEffect");

  const addItem = async (item) =>{
    const id = items.length ? items[items.length-1].id + 1 : 1;
    const myNewItem = {id , checked : false , item}
    const listItems = [...items , myNewItem];
    setItems(listItems);

    const postOption = {
      method : 'POST',
      headers :{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const response = await requestApi(API_URL  , postOption);
    if(response) setFetchError(response);
    
  }

  const handleCheck = async (id) =>{
    const listItems = items.map((item)=>
        item.id === id ? {...item ,checked : !item.checked} : item);
    setItems(listItems);
  
    const myItem = listItems.filter(item => item.id === id);

    const patchOption = {
      method : 'PATCH',
      headers : {
        'Content-Type' : 'application/json' 
      },
      body: JSON.stringify({checked : myItem[0].checked})
    }

    const url = `${API_URL}/${id}`;
    const response = await requestApi(url , patchOption);
    if(response) setFetchError(response);
    
  }
  
  const handleDelete = async (id)=>{
    const listItems = items.filter((item)=>
    item.id !== id );
    
    setItems(listItems);
    const url = `${API_URL}/${id}`;

    const deleteOption ={method : 'DELETE'};

    const response = await requestApi(url , deleteOption);
    if(response){
      setFetchError(response);
    }
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
     
    <main>
        {isLoading && <p>Loading Items....</p>}
        {fetchError && <p style={{color : 'red'}}>{`Error : ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
        items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}/>
      }
    </main>
     <Footer 
      length = {items.length}
      />
    </div>
  );
}

export default App;


// Styled Components (install and use)