import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userToken, setUserToken] = useState('sdghjyjhghjj');
  const [loading, setLoading] = useState(true);

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
