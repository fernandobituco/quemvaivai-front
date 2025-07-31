import { createContext, useCallback, useContext, useState } from "react";
import LoadingOverlay from "../components/LoadingOverlay";

const LoadingContext = createContext()

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const showLoading = useCallback(() => setLoading(true), [])
  const hideLoading = useCallback(() => setLoading(false), [])

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      <LoadingOverlay open={loading} />
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)
