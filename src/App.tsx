import React, { useState, useEffect, useRef } from 'react';
import Header from './Components/Header';
import ToDoContainer from './Components/ToDoContainer';
import './App.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');

function App() {
  const [inputTitle, setInputTitle] = useState("");
  const [toDoList, setToDoList] = useState([] as any);
  const [appModalOpen, setAppModalOpen] = useState(false);

  const fetchToDoList = () => {
    console.log("fetchToDoList()");
    // fetch("https://karl-react-to-do-backend.herokuapp.com/toDoList")
    //   .then(res => res.json())
    //   .then(res => setToDoList(res)
    //   ).catch(err => console.log(err));
  };

  useEffect(() => {
    fetchToDoList();
  }, []);

  const addButton = () => {
    console.log("addbutton()");
    setAppModalOpen(true);
  }

  const appModalStyles = {
    content: {
        margin: "auto",
        marginTop: "5%",
        height: "100px",
        width: "80%",
        backgroundColor: "whitesmoke",
        borderRadius: "0",
        border: "0"
    }
  }

  const titleHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
      setInputTitle(e.target.value);
  };

  var firstPost = useRef(false);

  const postTitle = () => {
    console.log("postTitle()");
    // fetch(`https://karl-react-to-do-backend.herokuapp.com/toDoList/${inputTitle}`, {
    //     method: 'POST'
    // }).then(res => res.json())
    // .then(res => {
    //   const newArr = toDoList.map((x : any) => {
    //       if (x.ToDoListID === 0) {
    //           return {ToDoListID: res, Title: x.Title}
    //       }
    //       else { return x; }
    //   });
    //   return newArr;
    // }).then(newArr => setToDoList(newArr))
    // .catch(err => console.log(err));

    firstPost.current = false;
    setInputTitle("");
  };

  useEffect(() => {
    console.log("useEffect", firstPost);
    if (firstPost.current) { postTitle(); }
  }, [toDoList]);

  const onButtonClickHandler = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToDoList([...toDoList, {ToDoListID: 0, Title: inputTitle}]); 
    setAppModalOpen(false);
  };

  const onButtonClick = (e : React.MouseEvent<HTMLButtonElement>) => {
    firstPost.current = true;
    console.log("onButtonClick", firstPost);
    onButtonClickHandler(e);
  };

  const titleInputRef : any = useRef();

  function afterOpenModal() {
      titleInputRef.current!.focus();
    }

  return (
    <div className="App">
      <Header />
      <ToDoContainer 
      toDoList={toDoList}
      setToDoList={setToDoList} />

      <Modal
      isOpen={appModalOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={() => setAppModalOpen(false)}
      style={appModalStyles}>
        <h2 className="app-modal-header">Create New List</h2>

        <form>
            <input ref={titleInputRef} value={inputTitle} onChange={titleHandler} type="text" className="todo-input" maxLength={12}/>
            <button onClick={onButtonClick} className="todo-button" type="submit" />
        </form>

      </Modal>

      <button className="new-button" onClick={addButton}>+</button>
    </div>
  );
}

export default App;
