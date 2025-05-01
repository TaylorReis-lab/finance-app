// import { createContext, useContext, useState, ReactNode } from 'react'
// import api from '@/services/api'

// interface AuthContextType {
//   user: any
//   login: (email: string, password: string) => Promise<void>
//   logout: () => void
//   isAuthenticated: boolean
// }

// const AuthContext = createContext<AuthContextType | null>(null)

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState(null)

//   const login = async (email: string, password: string) => {
//     const response = await api.post('/auth/login', { email, password })
//     localStorage.setItem('token', response.data.token)
//     setUser(response.data.user)
//   }

//   const logout = () => {
//     localStorage.removeItem('token')
//     setUser(null)
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         isAuthenticated: !!user
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }
