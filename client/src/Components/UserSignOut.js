import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Component that uses a context method to clear user
// auth and redirect. 
export default ({ context }) => {
  
  useEffect(() => context.actions.signOut() );
  return (
    <Redirect to="/" />
  );
}
