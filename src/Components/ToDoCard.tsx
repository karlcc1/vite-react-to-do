import React, { useState, useEffect } from 'react';
import ToDoItems from './ToDoItems';
import Modal from 'react-modal';
import './ToDoCard.css';
Modal.setAppElement('#root');

const modalStyles = {
    content: {
        margin: "auto",
        height: "400px",
        width: "350px",
        transition: "5s",
        backgroundColor: "blanchedalmond",
        borderRadius: "2%",
        border: "0"
    }
}

function ToDoCard(props: any) {
    const [inputText, setInputText] = useState("");
    const [titleChange, setTitleChange] = useState("");
    const [toDoArr, setToDoArr] = useState([] as any);
    const [modalOpen, setModalOpen] = useState(false);

    // const [testArr, setTestArr] = useState([] as any[]);

    const fetchItems = () => {
        // fetch(`https://karl-react-to-do-backend.herokuapp.com/toDoItems/${props.item.ToDoListID}`)
        //   .then(res => res.json())
        //   .then(res => setToDoArr(res)
        //   );        
    };

    useEffect(() => {
        fetchItems();
      }, []);

    const itemClick = () => {
        setModalOpen(true);
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log("new entry add");
            
            // fetch(`https://karl-react-to-do-backend.herokuapp.com/toDoItems/${props.item.ToDoListID}/${inputText}`, {
            //     method: 'POST'})
            //     .then(res => res.text())
            //     .then(res => {
            //         setToDoArr([...toDoArr, {ToDoItemID: res, ToDoListID: props.item.ToDoListID, Name: inputText}]);
            //     });
            
            setToDoArr([...toDoArr, {ToDoItemID: Math.floor(Math.random() * 1000000), ToDoListID: props.item.ToDoListID, Name: inputText}]);
            setInputText("");
        }
    };

    const deleteList = () => {
        console.log("deletelist " + props.item.ToDoListID);
        const newArr = props.toDoList.filter((x : any) => (x.ToDoListID !== props.item.ToDoListID));  
        props.setToDoList(newArr);
        // fetch(`https://karl-react-to-do-backend.herokuapp.com/toDoList/${props.item.ToDoListID}`, {
        //     method: 'DELETE'
        // });
        setModalOpen(false);
        setTitleChange("");
        // window.location.reload();
    };

    const titleChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        setTitleChange(e.target.value);
        const newArr = props.toDoList.map((x : any) => {
            if (x.ToDoListID === props.item.ToDoListID) {
                return {ToDoListID: x.ToDoListID, Title: e.target.value}
            }
            else { return x; }
        });
        props.setToDoList(newArr);
        // fetch(`https://karl-react-to-do-backend.herokuapp.com/toDoList/${props.item.ToDoListID}/${e.target.value}`, {
        //     method: 'PUT'
        // });
    };

    const afterOpenModal = () => {
        console.log("modal open");
        setTitleChange(props.item.Title);
    };

    return (
        <div>
            <div className="todo-card" onClick={itemClick}>
                <h2>{props.item.Title}</h2>
                <ToDoItems 
                toDoArr={toDoArr} 
                isModal={false} />
            </div>
            <Modal 
            isOpen={modalOpen} 
            onRequestClose={() => setModalOpen(false)} 
            onAfterOpen={afterOpenModal}
            style={modalStyles}>
                <input 
                className="title-input"
                onChange={titleChangeHandler} 
                value={titleChange}
                maxLength={12}/>
                    <button onClick={deleteList} className="item-del">&#x00D7;</button>
                    <ToDoItems 
                    toDoArr={toDoArr}
                    setToDoArr={setToDoArr}
                    isModal={true} />                
                <input 
                className="new-note-input"
                onKeyPress={handleKeyPress}
                onChange={inputHandler}
                value={inputText}
                placeholder="Add note . . ."
                maxLength={23}
                type="text" />
            </Modal>
        </div>
    );
}

export default ToDoCard;