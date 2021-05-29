import React, {useState, useEffect} from 'react';
import './App.css';
import {v4 as uuidv4} from 'uuid';
import {randomColor} from "randomcolor";
import Draggable from "react-draggable";

function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  },[items])

  const addItem = () => {
    if(item.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        item,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPos: {
          x: 500,
          y: -500
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    } else {
      alert('Enter something...')
    }
  }

  const deleteItem = (id) => {
    const newItems = items.filter(item => item.id !== id)
    setItems(newItems)
  }

  const updatePos = (data, index) => {
    let newArray = [...items]
    newArray[index].defaultPos = {x: data.x, y: data.y}
    setItems(newArray)
  }

  const keyPress = (e) => {
    if(e.which === 13) {
      addItem()
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <input 
        type="text"
        placeholder="Enter something..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
        onKeyPress={(e) => keyPress(e)}
        />
        <button className="enter" onClick={addItem}>ENTER</button>
      </div>

      {
        items.map((item,index) => {
          return (
            <Draggable
            key={item.id}
            defaultPosition={item.defaultPos}
            onStop={(_, data) => {
              updatePos(data, index)
            }}
            >
              <div className="stickers-item" style={{backgroundColor: item.color}}>
                {`${item.item}`}
                <button 
                className="delete"
                onClick={() => deleteItem(item.id)}
                >
                X
                </button>
              </div>
            </Draggable>
          )
        })
      }
    </div>
  );
}

export default App;
