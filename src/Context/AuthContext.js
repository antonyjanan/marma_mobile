import React, {createContext, useState} from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle login
  const login = token => {
    setUserToken(token);
    setLoading(false);
  };

  const logout = () => {
    setUserToken(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{userToken, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
