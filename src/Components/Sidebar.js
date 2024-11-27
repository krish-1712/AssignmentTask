// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react'
// import './Sidebar.css';
// import { Link } from 'react-router-dom';
// import { url } from '../App';
// import sessionContext from './SessionContext';
// import { BsGrid1X2Fill }
//   from 'react-icons/bs'
// import { FaRegNewspaper } from 'react-icons/fa';
// import { AiOutlineMessage } from 'react-icons/ai'
// import { MdAssignment } from 'react-icons/md';
// import { BsPersonCircle } from 'react-icons/bs';





// function Sidebar() {
//   const [user, setUser] = useState([]);
//   const { userContent } = useContext(sessionContext);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         // let userId = window.sessionStorage.getItem("id");
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
//         <aside id="sidebar" >
//           <div className='sidebar-title'>
//             <div className='sidebar-brand'>
//               <p>ARBAAN</p>
//             </div>


//           </div>
//           <hr></hr>

//           <ul className='sidebar-list'>
//             {/* <li className='sidebar-list-item'>
//               <Link to="/dashboard">
//                 <span className="icon">
//                 </span>
//                 Dashboard
//               </Link>
//             </li> */}
//             <li className="sidebar-list-item">
//               <Link to="/dashboard" className="sidebar-link">
//                 <span className="icon">
//                 <BsGrid1X2Fill/>
//                 </span>
//                 Dashboard
//               </Link>
//             </li>



//             {/* <li className='sidebar-list-item'>
//               <Link to="/post">
//                 <span className="icon">
//                 </span>
//                 Post
//               </Link>
//             </li> */}
//             <li className="sidebar-list-item">
//               <Link to="/post" className="sidebar-link">
//                 <span className="icon">
//                 <FaRegNewspaper /> 
//                 </span>
//                    Post
//               </Link>
//             </li>
//             <li className="sidebar-list-item">
//               <Link to="/comments" className="sidebar-link">
//                 <span className="icon">
//                 <AiOutlineMessage />
//                 </span>
//                 Comments
//               </Link>
//             </li>

//             <li className="sidebar-list-item">
//               <Link to="/todos" className="sidebar-link">
//                 <span className="icon">
//                 <MdAssignment />
//                 </span>
//                 ToDos
//               </Link>
//             </li>


//             {/* <li className='sidebar-list-item'>
//               <Link to="/comments">
//                 <span className="icon">
//                 </span>
//                 Comments
//               </Link>
//             </li> */}
//             {/* <li className='sidebar-list-item'>
//               <Link to="/todos">
//                 <span className="icon">
//                 </span>
//                 ToDos
//               </Link>
//             </li> */}
//           </ul>

//           {/* <div className='header-right'>
//             <Link to="/" className="no-underline">
//               <BsPersonCircle className='icon' />
//               <h2 className='text no-underline'>{user?.name}</h2>

//             </Link>
//           </div> */}

//     <div className="header-right">
//       <Link to="/" className="text">
//         <BsPersonCircle className="profile-icon" />
//         {user?.name}
//       </Link>
//     </div>



//         </aside>


//   )
// }

// export default Sidebar



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
import { FiMenu } from 'react-icons/fi';

function Sidebar() {
  const [user, setUser] = useState(null); 
  const [isOpen, setIsOpen] = useState(true); 
  const { userContent } = useContext(sessionContext);

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
    <div className={`sidebar-container ${isOpen ? 'expanded' : 'collapsed'}`}>
   
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Sidebar"
      >
        <FiMenu size={24} />
      </button>

     
      <aside className="sidebar">
     
        <div className="sidebar-brand">
          <p>ARBAAN</p>
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
        </ul>

        {/* User Information */}
        <div className="sidebar-footer">
        <Link to="/" className="text">
          <BsPersonCircle className="profile-icon" />
          {/* <span className="username">{user?.name || 'Guest'}</span> */}
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;











// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import './Sidebar.css';
// import { Link } from 'react-router-dom';
// import { url } from '../App';
// import sessionContext from './SessionContext';
// import { BsGrid1X2Fill, BsPersonCircle } from 'react-icons/bs';
// import { FaRegNewspaper } from 'react-icons/fa';
// import { AiOutlineMessage } from 'react-icons/ai';
// import { MdAssignment } from 'react-icons/md';
// import { FiMenu } from 'react-icons/fi';

// function Sidebar() {
//   const [user, setUser] = useState(null); // Default user state as null
//   const [isOpen, setIsOpen] = useState(false); // Default state to closed
//   const { userContent } = useContext(sessionContext);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`${url}/users/${userContent}`);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
//     fetchUser();
//   }, [userContent]);

//   return (
//     <div
//       className={`sidebar-container ${isOpen ? 'expanded' : 'collapsed'}`}
//       onMouseEnter={() => setIsOpen(true)} // Open on hover
//       onMouseLeave={() => setIsOpen(false)} // Close on mouse leave
//     >
    
//       {/* <button
//         className="sidebar-toggle"
//         onClick={() => setIsOpen((prev) => !prev)}
//         aria-label="Toggle Sidebar"
//       >
//         <FiMenu size={24} />
//       </button> */}

//       {/* Sidebar */}
//       <aside className="sidebar">
//         {/* Brand */}
//         <div className="sidebar-brand">
//           <p>ARBAAN</p>
//         </div>


//         {/* Navigation Links */}
//         <ul className="sidebar-list">
//           <li className="sidebar-list-item">
//             <Link to="/dashboard" className="sidebar-link">
//               <BsGrid1X2Fill className="icon" />
//               <span className="text">Dashboard</span>
//             </Link>
//           </li>
//           <li className="sidebar-list-item">
//             <Link to="/post" className="sidebar-link">
//               <FaRegNewspaper className="icon" />
//               <span className="text">Post</span>
//             </Link>
//           </li>
//           <li className="sidebar-list-item">
//             <Link to="/comments" className="sidebar-link">
//               <AiOutlineMessage className="icon" />
//               <span className="text">Comments</span>
//             </Link>
//           </li>
//           <li className="sidebar-list-item">
//             <Link to="/todos" className="sidebar-link">
//               <MdAssignment className="icon" />
//               <span className="text">ToDos</span>
//             </Link>
//           </li>
//         </ul>

//         {/* User Information */}
//         <div className="sidebar-footer">
//           <Link to="/" className="profile-link">
//             <BsPersonCircle className="profile-icon" />
//             {isOpen && <span className="username">{user?.name || 'Guest'}</span>} {/* Show only when expanded */}
//           </Link>
//         </div>

//       </aside>
//     </div>
//   );
// }

// export default Sidebar;
