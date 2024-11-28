import './UserDetails.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { url } from '../App';
import sessionContext from './SessionContext';
import { useNavigate } from 'react-router-dom';


const UserDetails = () => {
    const [user, setUser] = useState([]);
    const { userContent } = useContext(sessionContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (!userContent) {
            navigate('/');
            return;
        }
    }, [userContent, navigate]);

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


    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="user-details-container">
                <div className="user-profile">
                    <div className="profile-info">
                        <h2 style={{ marginLeft: "200px" }}>{user?.name}</h2>
                        <p style={{ marginLeft: "250px" }}>@{user?.username}</p>
                    </div>
                </div>

                <div className="table-container">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Email:</td>
                                <td>{user?.email}</td>
                            </tr>
                            <tr>
                                <td>Phone:</td>
                                <td>{user?.phone}</td>
                            </tr>
                            <tr>
                                <td>Website:</td>
                                <td>
                                    <a
                                        href={`https://${user?.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {user?.website}
                                    </a>
                                </td>
                            </tr>
                            {user?.address && (
                                <>
                                    <tr>
                                        <td>Street:</td>
                                        <td>{user?.address.street}</td>
                                    </tr>
                                    <tr>
                                        <td>Suite:</td>
                                        <td>{user?.address.suite}</td>
                                    </tr>
                                    <tr>
                                        <td>City:</td>
                                        <td>{user?.address.city}</td>
                                    </tr>
                                    <tr>
                                        <td>Zipcode:</td>
                                        <td>{user?.address.zipcode}</td>
                                    </tr>
                                </>
                            )}
                            {user?.company && (
                                <>
                                    <tr>
                                        <td>Company Name:</td>
                                        <td>{user?.company.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Catchphrase:</td>
                                        <td>{user?.company.catchPhrase}</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserDetails