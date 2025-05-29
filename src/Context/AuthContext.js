import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState('1 hour');
  const [user_id, setUser_id] = useState(null)
  const [loader, setLoader] = useState(false);


  const login = async (token) => {
    setUserToken(token);
    setLoading(false);

  };

  const logout = async () => {
    setUserToken(null);
    setLoading(false);

  };

  const loadToken = async () => {
    try {

      setUserToken(token);
      console.log('Token loaded from AsyncStorage:', token); // ✅ LOG HERE

    } catch (e) {
      console.log('Failed to load token');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadToken();
  }, []);


  //-----------



  return (
    <AuthContext.Provider value={{
      loader,
      setLoader, user_id, userToken, loading, selectedTime, login, logout, setUserToken, setSelectedTime, setUser_id
    }}>
      {children}
    </AuthContext.Provider>
  );
};
