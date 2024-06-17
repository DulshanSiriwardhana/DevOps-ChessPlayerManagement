import React, { useState } from 'react';
import axios from 'axios';
import ChessDp from '../Icons/ChessDp.png';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onRoleChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [rating, setRating] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  //const Navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP request to fetch all users
      const response = await axios.post('http://localhost:8060/User/add',{
        email:email,
        password:password,
        role:"Coach",
        name:name,
        age:age,
        gender:'male',
        rating:rating
      });

      // Assuming the response contains an array of user objects
      const user = response.data;
      console.log(user);
      setEmail('');
      setName('');
      setAge('');
      setRating('');
      setPassword('');
      //Navigate('/');
    } catch (error) {
      console.error('Error signup coach:', error);
    }
  };

  return (
    <div>
        <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',paddingBottom:'100px'}}>
            <div className="container mt-5" style={{ backgroundImage:'linear-gradient(#50d959, #168c1e)', minHeight: '540px', maxHeight: '540px', width: '400px', borderRadius: '20px', boxShadow: '10px 10px 20px 10px black',opacity:'90%'}}>
            <h1 className="text-center mb-4" style={{ padding: '20px', fontWeight: 'Bold',opacity:'100%' }}>Sign up</h1>
            <div className="row justify-content-center">
                <div className="col-md-6" style={{ width: '300px',opacity:'100%' }}>
                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        type="text"
                        className="form-control"
                        id="age"
                        placeholder="Enter your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input
                        type="text"
                        className="form-control"
                        id="rating"
                        placeholder="Enter your rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                    <div className="text-center" style={{marginTop:'10px'}}>
                    <button type="submit" className="btn btn-primary" style={{backgroundColor:'#98ebeb',color:'black'}}>Signup</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default SignupForm;
