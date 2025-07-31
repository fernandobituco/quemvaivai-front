import { createContext, useContext, useState, useCallback } from "react";
import NotificationSnackbar from "../components/NotificationSnackBar";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  const showNotification = useCallback((message, severity = "error") => {
    setNotification({ message, severity })
  }, [])

  const clearNotification = () => setNotification(null)

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <NotificationSnackbar
        open={!!notification}
        message={notification?.message}
        severity={notification?.severity}
        onClose={clearNotification}
      />
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext);
