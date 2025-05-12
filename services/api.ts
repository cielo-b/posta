import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

export const createPost = async (postData: { title: string; body: string; userId: number }) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, postData);
  return response.data;
};

export const fetchComments = async (postId: number) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
  return response.data;
};

export const createComment = async (postId: number, commentData: { 
  name: string; 
  email: string; 
  body: string 
}) => {
  const response = await axios.post(
    `${API_BASE_URL}/posts/${postId}/comments`, 
    commentData
  );
  return response.data;
};