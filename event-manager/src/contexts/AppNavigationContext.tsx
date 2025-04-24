import { createContext, useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const AppNavigationContext = createContext<NavigateFunction>(() => {});

export const AppNavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <AppNavigationContext.Provider value={navigate}>
      {children}
    </AppNavigationContext.Provider>
  );
};

export const useAppNavigation = () => useContext(AppNavigationContext);
