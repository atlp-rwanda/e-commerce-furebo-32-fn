// Signup.tsx

import React from 'react';
import Header from './Header';
import SignupForm from './SignupForm'; 

const Signup: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
