import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { url } from '../App';
import sessionContext from './SessionContext';
import { BsGrid1X2Fill, BsPersonCircle } from 'react-icons/bs';
import { FaRegNewspaper } from 'react-icons/fa';
import { AiOutlineMessage } from 'react-icons/ai';
import { MdAssignment } from 'react-icons/md';
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



function Sidebar() {
  const [user, setUser] = useState(null);
  const { userContent } = useContext(sessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContent) {
      navigate('/');
      return;
    }
  }, [userContent, navigate]);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${url}/users/${userContent}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [userContent]);

  return (
    <>
      <header className="header">

        <p style={{ marginLeft: "20px", marginTop: "14px", fontWeight: '25px' }}>ARBAAN</p>
        <span style={{ margin: '0 7px', fontSize: '18px', paddingTop: "10px" }}>|</span>
        <div style={{ display: 'flex', marginLeft: "0", paddingTop: "3px" }}>

          <BsPersonCircle className="profile-icons" />

          <span className="usernames">{user?.name || 'Guest'}</span>

        </div>
      </header>
      <div className="sidebar-container ">
        <aside className="sidebar">
          <div className="sidebar-brand">

          </div>
          <ul className="sidebar-list">
            <li className="sidebar-list-item">
              <Link to="/dashboard" className="sidebar-link">
                <BsGrid1X2Fill className="icon" />
                <span className="text">Dashboard</span>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/post" className="sidebar-link">
                <FaRegNewspaper className="icon" />
                <span className="text">Post</span>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/comments" className="sidebar-link">
                <AiOutlineMessage className="icon" />
                <span className="text">Comments</span>
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/todos" className="sidebar-link">
                <MdAssignment className="icon" />
                <span className="text">ToDos</span>
              </Link>
            </li>
            <li className="sidebar-list-items ">
              <Link to="/user" className="sidebar-link">
                <BsPersonCircle className="icon" />
                <span className="text">Profile</span>
              </Link>
            </li>
            <li className="sidebar-lists-items ">
              <Link to="/" className="sidebar-link">
                <FaSignOutAlt className="icon" />
                <span className="text">Logout</span>
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}

export default Sidebar;







