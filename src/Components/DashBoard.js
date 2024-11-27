// import './DashBoard.css';
// import Sidebar from './Sidebar';
// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { BsPersonCircle } from 'react-icons/bs'
// import { Link } from 'react-router-dom';
// import { url } from '../App';
// import { MdComment } from "react-icons/md";
// import { RiArticleLine } from "react-icons/ri";
// import { BsCardChecklist } from "react-icons/bs";
// import  sessionContext from './SessionContext';




// const DashBoard = () => {
//   const [user, setUser] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [todos, setTodos] = useState([]);
//   const {userContent} = useContext(sessionContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // let userId = window.sessionStorage.getItem("id");
//         // console.log("userId : ", userId);


//         const postsResponse = await axios.get(`${url}/users/${userContent}/posts`);
//         console.log(postsResponse)
//         const commentsResponse = await axios.get(`${url}/users/${userContent}/comments`);
//         const todosResponse = await axios.get(`${url}/users/${userContent}/todos`);
//         console.log("post response", postsResponse.data);
//         setPosts(postsResponse.data);
//         setComments(commentsResponse.data);
//         setTodos(todosResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [userContent]);

//   const postsCount = posts.length;
//   const commentsCount = comments.length;
//   const todosCount = todos.length;
//   console.log("post", postsCount)



//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         //let userId = window.sessionStorage.getItem("id");
//         console.log("userId : ", userContent);
//         const response = await axios.get(`${url}/users/${userContent}`);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching data: ', error);
//       }
//     };

//     fetchTodos();
//   }, [userContent]);



//   return (
//     <div className='grid-container'>
    
//       <Sidebar/>
//       <div>
//         <main className='main-container'>
//           <div className='main-title'>
//             <h3 style={{ marginTop: "20px", color: "black", cursor: "pointer" }}>DASHBOARD</h3>
//             <Link to='/'>
//               <BsPersonCircle className='icon' style={{ fontSize: "25px" }} />
//             </Link>
//           </div>
//           <div className='carded'>
//             <div className='carded-inner'>
          
//               <h3>   <RiArticleLine style={{ color: "black", fontSize: "20px" }} /> POST</h3>
//             </div>
//             <p> {postsCount}</p>
//           </div>
//           <div className='carded'>
//             <div className='carded-inner'>
//               <h3>
//               <MdComment style={{ color: "black", fontSize: "20px" }} /> COMMENTS</h3>
//             </div>
//             <p> {commentsCount}</p>
//           </div>
//           <div className='carded'>
//             <div className='carded-inner'>
//               <h3>
//               <BsCardChecklist style={{ color: "black", fontSize: "20px" }} title="Checklist Card" /> TO DOS</h3>

//             </div>
//             <p>{todosCount}</p>
//           </div>

//           <ResponsiveContainer width="90%" height={300} style={{ marginTop: "40px" }}>
//             <BarChart
//               data={[
//                 { name: 'Posts', value: posts.length },
//                 { name: 'Comments', value: comments.length },
//                 { name: 'Todos', value: todos.length }
//               ]}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//           <div className='square-modal'>
//             <h2 style={{cursor: "pointer"}}>User Details</h2>
//             <div className='table-container'>
//               <table className="styled-table">
//                 <tbody>
//                   <tr>
//                     <td>ID:</td>
//                     <td>{user?.id}</td>
//                   </tr>
//                   <tr>
//                     <td>Name:</td>
//                     <td>{user?.name}</td>
//                   </tr>
//                   <tr>
//                     <td>Username:</td>
//                     <td>{user?.username}</td>
//                   </tr>
//                   <tr>
//                     <td>Email:</td>
//                     <td>{user?.email}</td>
//                   </tr>

//                   {user?.address && (
//                     <>
//                       <tr>
//                         <td>Address:</td>
//                         <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</td>
//                       </tr>
//                     </>
//                   )}
//                   <tr>
//                     <td>Phone:</td>
//                     <td>{user?.phone}</td>
//                   </tr>
//                   <tr>
//                     <td>Website:</td>
//                     <td>{user?.website}</td>
//                   </tr>
//                   {user?.company && (
//                     <>
//                       <tr>
//                         <td>Company:</td>
//                         <td>{`${user.company.name} - ${user.company.catchPhrase}`}</td>
//                       </tr>
//                     </>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>


//     </div>




//   )
// }

// export default DashBoard

import './DashBoard.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
// import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import { BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { url } from '../App';
import { MdComment } from "react-icons/md";
import { RiArticleLine } from "react-icons/ri";
import { BsCardChecklist } from "react-icons/bs";
import sessionContext from './SessionContext';
import { Carousel } from 'react-bootstrap';




const DashBoard = () => {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [todos, setTodos] = useState([]);
  const { userContent } = useContext(sessionContext);

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${url}/users/${userContent}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [userContent]);

  const postsCount = posts.length;
  const commentsCount = comments.length;
  const todosCount = todos.length;


  const handleLogout = () => {
    console.log("User logged out.");
    window.location.href = "/login";
  };

  return (
    <div className='dashboard-container'>
     
      <Sidebar/>
      
      <main className='main-dashboard'>
        <div className='dashboard-header'>
          <div className='header-left'> 
            <div className='user-info'>
            <header className="dashboard-header-bar">
        <h1></h1>
        <div >
        <Link to="/" className="text">
          <BsPersonCircle className="profile-icons" />
          <span className="usernames" >{user?.name || 'Guest'}</span>
          </Link>
        </div>
      </header>
            </div>
          </div>
           

        </div>










        <div className='card-container'>
          <div className='stat-card'>
            <RiArticleLine className='card-icon' />
            <h4>Posts</h4>
            <p>{postsCount}</p>
          </div>
          <div className='stat-card'>
            <MdComment className='card-icon' />
            <h4>Comments</h4>
            <p>{commentsCount}</p>
          </div>
          <div className='stat-card'>
            <BsCardChecklist className='card-icon' />
            <h4>To Do</h4>
            <p>{todosCount}</p>
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


{/* <ResponsiveContainer width="100%" height={400}>
  <AreaChart data={[
    { name: 'Posts', value: postsCount },
    { name: 'Comments', value: commentsCount },
    { name: 'Todos', value: todosCount }
  ]}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Area type="monotone" dataKey="value" stroke="#3498db" fill="url(#colorUv)" />
    <defs>
      <linearGradient id="colorUv" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#ff6b81" stopOpacity={0.2}/>
      </linearGradient>
    </defs>
  </AreaChart>
</ResponsiveContainer> */}








        <div className="user-details-container">
  <div className="user-profile">
    <div className="profile-info">
      <h2>{user?.name}</h2>
      <p>@{user?.username}</p>
    </div>
  </div>

  <table className="user-details-table">
    <tbody>
      {/* General Information */}
      <tr>
        <td><strong>Email:</strong></td>
        <td>{user?.email}</td>
      </tr>
      <tr>
        <td><strong>Phone:</strong></td>
        <td>{user?.phone}</td>
      </tr>
      <tr>
        <td><strong>Website:</strong></td>
        <td><a href={`https://${user?.website}`} target="_blank" rel="noopener noreferrer">{user?.website}</a></td>
      </tr>

      {/* Address Information */}
      {user?.address && (
        <>
          <tr>
            <td><strong>Street:</strong></td>
            <td>{user?.address.street}</td>
          </tr>
          <tr>
            <td><strong>Suite:</strong></td>
            <td>{user?.address.suite}</td>
          </tr>
          <tr>
            <td><strong>City:</strong></td>
            <td>{user?.address.city}</td>
          </tr>
          <tr>
            <td><strong>Zipcode:</strong></td>
            <td>{user?.address.zipcode}</td>
          </tr>
        </>
      )}

      {/* Company Information */}
      {user?.company && (
        <>
          <tr>
            <td><strong>Company Name:</strong></td>
            <td>{user?.company.name}</td>
          </tr>
          <tr>
            <td><strong>Catchphrase:</strong></td>
            <td>{user?.company.catchPhrase}</td>
          </tr>
        </>
      )}
    </tbody>
  </table>
</div>


      </main>
    </div>
  );
}

export default DashBoard;
