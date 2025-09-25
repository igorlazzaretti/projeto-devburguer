import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  // Recebe as informações do Usuário e adiciona no state e no localStorage
  const putUserData = (userInfo) => {
    setUserInfo(userInfo);
    localStorage.setItem('devburguer:userData', JSON.stringify(userInfo));
  }
  // Logout do Usuário
    const logout = () => {
    setUserInfo({});
    localStorage.removeItem('devburguer:userData');
  }
  // Mantém o userInfo atualizado com o localStorage
  useEffect(() => {
    const userInfoLocal = localStorage.getItem('devburguer:userData');
    if(userInfoLocal) {
      setUserInfo(JSON.parse(userInfoLocal));
    }
    }, []);

  return (
    <UserContext.Provider value={{ userInfo, putUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if(!context) {
    throw new Error('useUser must be a valid context');
  }
  return context;
}