import React, { useEffect, useState } from 'react'
import {Table,Button} from 'react-bootstrap';


const Todos = () => {
    const [todos,setTodos] = useState([]);
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(1);

    const callAPI = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
            setLast(json.length/10);
            const start =(page-1)*10 +1;
            const end= page * 10;
            const data = json.filter(j=>j.id>=start && j.id<=end);
            //j.id가 10보다 작은것만 필터링.
            setTodos(data);
        })

    }
    //컴포넌트가 호출이될때 생성. 한번만 호출하게됨.
    useEffect(()=>{
        callAPI();
    },[page]);

  return (
    <div className='todos'>
      <h1>🌹 To do List 🌷</h1>
      <Table striped bordered hover>
        <thead>
            <tr>
                <td></td>
                <td>ID</td>
                <td>Title</td>
            </tr>
        </thead>
        <tbody>
            {todos.map(todo=>
                <tr>
                    <td><input type="checkbox" checked={todo.completed} /></td>
                    <td>{todo.id}</td>
                    <td>{todo.title}</td>
                </tr>    
            )}
        </tbody>
      </Table>
      <div>
            <Button onClick={()=>setPage(page-1)} disabled = {page === 1}
            variant="success">Prev</Button>
            <span className='mx-4'>{page} / {last}</span>
            <Button onClick={()=>setPage(page+1)} disabled = {page ===last}
            variant="success">Next</Button>
      </div>
    </div>
  )
}

export default Todos
