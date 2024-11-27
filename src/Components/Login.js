// import React, { useContext, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import './Login.css';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { url } from '../App';
// import { useNavigate } from 'react-router-dom';
// import * as yup from 'yup';
// import { useFormik } from 'formik';
// //import  {useDataContext, DataProvider} from './DataProvider'; 
// import  sessionContext from './SessionContext';




// const userSchemaValidation = yup.object({
//   selectedOption: yup.string().notOneOf(['', 'Select a Name'], 'Please select a name').required('Name is required'),
// });

// const Login = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const {setUserContent} = useContext(sessionContext);



//   useEffect(() => {
//     axios.get(`${url}/users`)
//       .then((response) => {
//         toast.success(response.data.message);
//         setUsers(response.data);
       
//       })
//       .catch((error) => {
//         console.log('Error fetching users:', error);
//         toast.error(error.response.data.message);
//       });
//   }, []);

//   const { handleSubmit, handleChange, errors, touched, values } = useFormik({
//     initialValues: {
//       selectedOption: '',
//     },
//     validationSchema: userSchemaValidation,
//     onSubmit: async (values) => {
//       try {

//         const selectedUser = users.find(user => user.name === values.selectedOption);
//         if (selectedUser) {
//           const res = await axios.post(`${url}/users`, selectedUser);
//           console.log(res);
//           toast.success(res.data.message);
        
  
//          // window.sessionStorage.setItem("id", selectedUser.id);
//          setUserContent(selectedUser.id);
//           navigate('/dashboard')
//         } else {
//           console.log('User not found!');
//         }
//       } catch (error) {
//         console.log('Error:', error.message);
//         toast.error(error.res.data.message);
//       }
//     },
//   });



//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           <div className="col-sm s" style={{ marginTop: '200px' }}>
//             <h1>Select User</h1>
//             <form action="/action_page.php" method="post">
//               <div class="imgcontainer">
//                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeKMiJbYhWXmdpHS7rdmKcjobdPm3T4YlJ80frW1BtiA&s" alt="Avatar" class="avatar"></img>
//               </div>
//               <div class="container">
//                 <select
//                   className="form-select"
//                   aria-label="Default select example"
//                   name="selectedOption"
//                   value={values.selectedOption}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select a Name</option>
//                   {users.map((user) => (
//                     <option key={user.id} value={user.name}>
//                       {user.name}
//                     </option>
//                   ))}
//                 </select>
//                 {touched.selectedOption && errors.selectedOption ? (
//                   <p style={{ color: 'crimson', marginLeft: "150px" }}>{errors.selectedOption}</p>
//                 ) : (
//                   ''
//                 )}
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   onClick={handleSubmit}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;









import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import sessionContext from './SessionContext';
import { url } from '../App';

const userSchemaValidation = yup.object({
  selectedOption: yup.string().notOneOf(['', 'Select a Name'], 'Please select a name').required('Name is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { setUserContent } = useContext(sessionContext);

  useEffect(() => {
    axios.get(`${url}/users`)
      .then((response) => {
        toast.success(response.data.message);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log('Error fetching users:', error);
        toast.error(error.response.data.message);
      });
  }, []);

  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
    initialValues: { selectedOption: '' },
    validationSchema: userSchemaValidation,
    onSubmit: async (values) => {
      try {
        const selectedUser = users.find(user => user.name === values.selectedOption);
        if (selectedUser) {
          const res = await axios.post(`${url}/users`, selectedUser);
          console.log(res);
          toast.success(res.data.message);
          setUserContent(selectedUser.id);
          navigate('/dashboard');
        } else {
          console.log('User not found!');
        }
      } catch (error) {
        console.log('Error:', error.message);
        toast.error(error.response?.data?.message || 'Error occurred!');
      }
    },
  });

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Select User</h1>
        <div className="avatar-container">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeKMiJbYhWXmdpHS7rdmKcjobdPm3T4YlJ80frW1BtiA&s" alt="Avatar" className="avatar"/>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <select
              className="form-select"
              name="selectedOption"
              value={values.selectedOption}
              onChange={handleChange}
              aria-label="Select user"
            >
              <option value="">Select a Name</option>
              {users.map(user => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))}
            </select>
            {touched.selectedOption && errors.selectedOption && (
              <div className="error-message">{errors.selectedOption}</div>
            )}
          </div>
          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;