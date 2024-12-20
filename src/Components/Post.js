import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Post.css';
import { url } from '../App';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import sessionContext from './SessionContext';
import { useNavigate } from 'react-router-dom';


const Post = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedBody, setEditedBody] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const { userContent } = useContext(sessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContent) {
      navigate('/');
      return;
    }
  }, [userContent, navigate]);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("userId : ", userContent);

        const response = await axios.get(`${url}/users/${userContent}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchPosts();
  }, [userContent]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${url}/posts/${postId}`);
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting post: ', error);
    }
  };

  const handleGetPost = (post) => {
    setSelectedPost(post);
    setEditedBody(post.body);
    console.log("clicked")
    setShowModal(true);
  };

  const handleSave = () => {
    console.log('Edited Body:', editedBody);
    setShowModal(false);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const nextPage = () => {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const maxPage = Math.ceil(posts.length / postsPerPage);

  return (
    <div className='grid-container'>
      <Sidebar />
      <div>
        <table className="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id} onClick={() => handleGetPost(post)}>
                <td>{post.title}</td>
                <td>
                  <div>
                    <MdEdit className="edit-icon" onClick={(e) => {
                      e.stopPropagation();
                      handleGetPost(post);
                    }} />

                    <MdDelete className="delete-icon" onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post.id);
                    }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-container">
          <button onClick={prevPage} disabled={currentPage === 1}>
            <FaChevronLeft />
          </button>
          <span>{currentPage}</span>
          <button onClick={nextPage} disabled={currentPage === maxPage}>
            <FaChevronRight />
          </button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title className="title">{selectedPost?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="body">
            <textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              rows={6}
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)} className="close_icon">
              Close
            </Button>
            <Button variant="primary" onClick={handleSave} className="save_icon">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>

  );
};

export default Post;

