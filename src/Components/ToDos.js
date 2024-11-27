import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import Sidebar from './Sidebar';
import './ToDos.css';
import { BsPersonCircle }
  from 'react-icons/bs'
import { Link } from 'react-router-dom';
import  sessionContext from './SessionContext';



const ToDos = () => {
  const [todos, setToDos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(3);
  const {userContent} = useContext(sessionContext);


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // let userId = window.sessionStorage.getItem("id");
        console.log("userId : ", userContent);
       
        const response = await axios.get(`${url}/users/${userContent}/todos`);
        setToDos(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchTodos();
  }, [userContent]);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const nextPage = () => {
    if (currentPage < Math.ceil(todos.length / todosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const maxPage = Math.ceil(todos.length / todosPerPage);
  return (
    <div className='grid-container'>
      <Sidebar />
      <div>
        <div className="posts-containers">
        {/* <h4 style={{color:"black", marginTop:"30px"}}>TODOS</h4> */}
          {currentTodos.map((todo) => (
            <div className="cards" key={todo.id}>
              <h2 className='title'> {todo.title}</h2>
              <p>Completed: {todo.completed ? 'true' : 'false'}</p>
            </div>
          ))}
        </div>
        <div className="paginations">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>{currentPage}</span>
          <button onClick={nextPage} disabled={currentPage === maxPage}>
            Next
          </button>

        </div>
      </div>
    </div>
  );
};

export default ToDos;
