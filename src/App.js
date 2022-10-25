import React, { useState } from "react";
import Switch from 'react-switch'

const App = () => {
  const [todoValue, setTodoValue] = useState("");

  const [todoItems, setTodoItems] = useState([]);

  const [editId ,setEditId]= useState(0)

  const[toggleTheme, setToggleTheme]=useState({ checked:false})




  function handleClick(e) {
    e.preventDefault();
    if(editId){
      const itemToEdit= todoItems.find((item)=>{return item.id===editId})
        const updatedTodo=todoItems.map((item)=>{
          return item.id===itemToEdit.id? item={id:item.id, todoValue} : {id:item.todoValue, todoValue:item.todoValue}

        })
        setTodoItems(updatedTodo)
        setEditId(0)
        setTodoValue("")
      return;

    }

    if (todoValue !== "") {
      setTodoItems((prevItems) => {
        return [{ id: `${Date.now()}`, todoValue }, ...prevItems];
      });
    }
    setTodoValue("");
  }

  function handleBtnClick(id) {
    const newUpdateArray = todoItems.filter((items) => {
      return items.id !== id;
    });

    setTodoItems([...newUpdateArray]);
  }

  function handleEdit(id) {
    const editItem = todoItems.find((item) => {
      return item.id === id;
    });

    setTodoValue(editItem.todoValue);
    setEditId(id)

  }

  function handleToggleChange(){
    setToggleTheme({checked:!toggleTheme.checked})
  }
  console.log(toggleTheme)

 

  const todoItemsArray = todoItems.map((item) => {
    return (
      <ul className="ul-box" key={item.id}>
        <li key={item.id}>{item.todoValue}</li>
        <button onClick={() => handleEdit(item.id)}>Edit</button>
        <button
          onClick={() => {
            handleBtnClick(item.id);
          }}
        >
          X
        </button>
      </ul>
    );
  });

  return (
    <section id={toggleTheme.checked?"":"light"}>
      <div className="todo-container">
        <h1>Todo List App</h1>
        <form className="form-1">
          <input
            type="text"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <button onClick={handleClick}>{editId?"Edit":"Go"}</button>
        </form>
        <div className="list-container">{todoItemsArray}</div>
      </div>
      <div className="switch">

      <label>{toggleTheme.checked?"Dark-Mode":"Light-Mode"}</label>
      <Switch checked={toggleTheme.checked} 
      onChange={handleToggleChange}/>
      </div>
    </section>
  );
};

export default App;
