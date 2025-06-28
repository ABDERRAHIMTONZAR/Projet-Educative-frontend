import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Define styled-components
const Container = styled.div`
  text-align: center;
  padding: 50px;
  font-family: Arial, sans-seri f;
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #333;
`;

const Message = styled.p`
  font-size: 1.25rem;
  margin-bottom: 20px;
  color: #666;
`;

const StyledLink = styled(Link)`
  font-size: 1.125rem;
  color: #007bff;
  text-decoration: none;
`;

const NotFound: React.FC = () => {
  return (
    <Container>
      <Heading>404 - Page Not Found</Heading>
      <Message>Oops! The page you're looking for doesn't exist.</Message>
      <StyledLink to="/">Go back to the homepage</StyledLink>
    </Container>
  );
};

export default NotFound;
