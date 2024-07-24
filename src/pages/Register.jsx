import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { Button as MuiButton, Input as MuiInput } from '@mui/material';
import RegisterBG from '../assets/img/account/RegisterBG.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: url(${RegisterBG});
  background-size: cover;
  background-position: center -10%;
  background-repeat: no-repeat;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const StyledInput = styled(MuiInput)`
  margin-bottom: 15px;
  width: 100%;
`;

const Agreement = styled.span`
  margin: 15px 0;
  font-size: 14px;
  text-align: center;
`;

const StyledButton = styled(MuiButton)`
  && {
    background-color: #9FE2BF;
    color: black;
    &:hover {
    background-color: #7fbd9a;
  }}
`;

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/register', { username, password, email, firstName, lastName });
      alert(res.data.message);
    } catch (error) {
      console.error('Error registering:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Registration failed');
    }
};

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Title>CREATE AN ACCOUNT</Title>
          <StyledInput placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <StyledInput placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <StyledInput placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <StyledInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <StyledInput placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <StyledInput placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Agreement>
            By creating an account I consent to the processing of my personal data for educational purposes.
          </Agreement>
          <StyledButton type="submit" variant="contained">CREATE</StyledButton>
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Register;
