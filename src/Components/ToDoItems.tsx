function ToDoItems(props : any) {

    const delItem = (id : any) => {
        console.log("delete " + id);  
        const newArr = props.toDoArr.filter((x : any) => (x.ToDoItemID !== id));      
        props.setToDoArr(newArr);

        // fetch(`https://karl-react-to-do-backend.herokuapp.com/toDoItems/${id}`, {
        //     method: 'DELETE'
        // });
    };

    const passModal = 
        <ul>
            {
                props.toDoArr && props.toDoArr.map((item : any) => (
                    <li key={item.ToDoItemID}>{item.Name}<button onClick={() => delItem(item.ToDoItemID)} className="item-del">&#x00D7;</button></li>
                ))
            }
        </ul>;

    const passCard = 
        <ul>
            {
                props.toDoArr && props.toDoArr.slice(0,8).map((item : any) => (
                    <li key={item.ToDoItemID}>{item.Name}</li>
                ))
            }
        </ul>;

    return (props.isModal ? passModal : passCard);
}

export default ToDoItems;