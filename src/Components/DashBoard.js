import './DashBoard.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { url } from '../App';
import { MdComment } from "react-icons/md";
import { RiArticleLine } from "react-icons/ri";
import sessionContext from './SessionContext';

const DashBoard = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [todos, setTodos] = useState([]);
  const { userContent } = useContext(sessionContext);
  const navigate = useNavigate();



  const handleClicks = () => {
    navigate('/post');
  };
  const handleClicked = () => {
    navigate('/comments');
  };
  const handleClicking = () => {
    navigate('/todos');
  };

  useEffect(() => {
    if (!userContent) {
      navigate('/');
      return;
    }
  }, [userContent, navigate]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get(`${url}/users/${userContent}/posts`);
        const commentsResponse = await axios.get(`${url}/users/${userContent}/comments`);
        const todosResponse = await axios.get(`${url}/users/${userContent}/todos`);

        setPosts(postsResponse.data);
        setComments(commentsResponse.data);
        setTodos(todosResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userContent]);

  const postsCount = posts.length;
  const commentsCount = comments.length;
  const todosCount = todos.length;

  return (
    <div className='dashboard-container'>

      <Sidebar />

      <main className='main-dashboard'>
        <div className='dashboard-header'>
          <div className='header-left'>
            <div className='user-info'>
              <header className="dashboard-header-bar">
                <div>
                </div>
              </header>
            </div>
          </div>
        </div>
        <div className='card-container'>
          <div className='stat-card'>
            <div onClick={handleClicks} style={{ cursor: 'pointer' }}>
              <RiArticleLine className='card-icon' />
              <h4>Posts</h4>
              <p>{postsCount}</p>
            </div>
          </div>
          <div className='stat-card'>
            <div onClick={handleClicked} style={{ cursor: 'pointer' }}>
              <MdComment className='card-icon' />
              <h4>Comments</h4>
              <p>{commentsCount}</p>
            </div>
          </div>
          <div className='stat-card'>
            <div onClick={handleClicking} style={{ cursor: 'pointer' }}>
              <MdComment className='card-icon' />
              <h4>TODOS</h4>
              <p>{todosCount}</p>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={[
            { name: 'Posts', value: postsCount },
            { name: 'Comments', value: commentsCount },
            { name: 'Todos', value: todosCount }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#ff6b81" />
          </BarChart>
        </ResponsiveContainer>
      </main>
    </div>
  );
}

export default DashBoard;
