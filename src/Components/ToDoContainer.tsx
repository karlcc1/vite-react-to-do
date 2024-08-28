import ToDoCard from './ToDoCard';

function ToDoContainer(props : any) {
    return (
        <div>
            <div className="todo-container">
                        {props.toDoList.map((item : any) => (
                            <ToDoCard                             
                            toDoList={props.toDoList} 
                            setToDoList={props.setToDoList} 
                            key={item.ToDoItemID} 
                            item={item}/>
                    ))}
            </div>
        </div>
    )
}

export default ToDoContainer;