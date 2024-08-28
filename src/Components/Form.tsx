import React from 'react';

function Form(props : any) {

    const titleHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        props.setInputTitle(e.target.value);
    };

    const onButtonClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        // fetch(`https://karl-react-to-do-backend.herokuapp.com/toDoList/${props.inputTitle}`, {
        //     method: 'POST'
        // });
        props.setInputTitle("")
        console.log(e);
    };

    return (
        <form>
            <input value={props.inputTitle} onChange={titleHandler} type="text" className="todo-input" ref="todoInput" maxLength={12}/>
            <button onClick={onButtonClick} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
        </form>
    )
}

export default Form;