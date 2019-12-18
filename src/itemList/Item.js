import React, {useEffect, useState} from 'react';
import { firestore, auth } from '../firebase';
import { useHistory } from "react-router-dom";

import './item.css'

const Item = () => {
  const [itemlist, setItemList] = useState([]);
  const [itemInput, setItemInput] = useState('');
  let history = useHistory();
  // async function fetchItems(){
  //   // Get only once
  //   // const snapshot = await firestore.collection('items').get();
  //   // const items = (snapshot.docs.map(doc => { 
  //   //   return { 
  //   //     id: doc.id, ...doc.data()
  //   //   }
  //   // }));
  //   // setItemList(items);

  //   // Update with snapshot, HAVE TO RETURN UNSUBSCRIBE AND THEN ISE IT IN USEFFECT
  //   const unsubscribe = firestore.collection('items').onSnapshot(snapsopt => {
  //   const items = snapsopt.docs.map(doc => { 
  //       return { 
  //         id: doc.id, ...doc.data()
  //       }
  //   });
  //   setItemList(items);    
  //   return unsubscribe;
  // })}

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        history.push("/login");
      }
    });
    // Fetch items on Snapshot Update
    const unsubscribe = firestore.collection('items').onSnapshot(snapsopt => {
      const items = snapsopt.docs.map(doc => { 
          return { 
            id: doc.id, ...doc.data()
          }
      });
      setItemList(items);    
    });

    //Clean everything
   return () => unsubscribe();
  },[history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let today = new Date().toISOString().slice(0, 10);
    const newItem = {
      name: e.target.elements.itemValue.value,
      date: today,
      isCompleted: false,
    }
    //adaugare element in firebase
    firestore.collection('items').add(newItem);
    setItemInput('');
  }

  const handleDelete = (id) => {
    // const filteredItems = itemlist.filter(item => item.id !== id);

    //delete element din firebase
    firestore.doc(`items/${id}`).delete();
  }
  
  const handleCompleted = (id) => {
    firestore.doc(`items/${id}`).update({isCompleted: true});
  }

  return (
  <div className="list-box">
    <div className="list">
      <h2>To DO Stuff</h2>
       {
        itemlist.filter((item) => !item.isCompleted).map( item => 
          <div className="item" key={item.id}>
            <p className="item-element">{item.name}</p>
            <p className="item-element">{item.date}</p>
            <div> 
            <button onClick={ () => handleCompleted(item.id)} className="item-button">Check</button>
            <button onClick={ () => handleDelete(item.id)} className="item-button">X</button>
            </div>
           </div>)
      }
       <form onSubmit={handleSubmit} className="add-form">
        <input className="add-input" type="text"
         name="itemValue" placeholder="Insert the item name"
         value={itemInput} onChange={(e) => {setItemInput(e.target.value)}}/>
        <button className="add-item">Add a new item</button>
       </form>
    </div>
    <div className="list">
      <h2>DONE Stuff</h2>
    {
        itemlist.filter((item) => item.isCompleted).map( item => 
          <div className="item" key={item.id}>
            <p className="item-element">{item.name}</p>
            <p className="item-element">{item.date}</p>
          <div> 
          <button onClick={ () => handleDelete(item.id)} className="item-button">X</button>
          </div>
         </div>)
      }
    </div>
  </div>
  )
}

export default Item;