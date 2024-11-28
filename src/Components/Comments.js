import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Comments.css';
import { url } from '../App';
import Sidebar from './Sidebar';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import sessionContext from './SessionContext';
import { useNavigate } from 'react-router-dom';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(4);
  const { userContent } = useContext(sessionContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!userContent) {
      navigate('/');
      return;
    }
  }, [userContent, navigate]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("userId : ", userContent);

        const response = await axios.get(`${url}/users/${userContent}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchComments();
  }, [userContent]);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const nextPage = () => {
    if (currentPage < Math.ceil(comments.length / commentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const maxPage = Math.ceil(comments.length / commentsPerPage);
  return (
    <div className='grid-container'>
      <Sidebar />
      <div>

        <div className="posts-container">
          {currentComments.map((comment) => (
            <div className="card" key={comment.id}>
              <h2> {comment.name}</h2>
              <p> {comment.email}</p>
              <p> {comment.body}</p>
            </div>
          ))}
        </div>
        <div className="pagination-container">
          <button onClick={prevPage} disabled={currentPage === 1}>
            <FaChevronLeft />
          </button>
          <span>{currentPage}</span>
          <button onClick={nextPage} disabled={currentPage === maxPage}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Comments