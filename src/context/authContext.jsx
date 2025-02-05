import React, { createContext, useContext, useEffect, useState } from 'react'

const userContext = createContext()
const authContext = ({children}) => {
    const[user, setUser] = useState(null)
    const[loading, setLoading] = useState(true)
    

    useEffect(() => {
        const verifyUser = async() =>{
            try {
                const token = localStorage.getItem('token')
                if(token){
                const response = await axios.get('https://sms-backend-eight.vercel.app/api/auth/verify',{
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    }
                })

                if(response.data.success){
                    setUser(response.data.success)
                }
            }
            else{
                setUser(null)
                setLoading(false)
            }
            } catch (error) {
                if(error.response && !error.response.data.error){
                    setUser(null)
                }
            }
        }
        verifyUser()
    }, [])

    const login = (user)=>{
        setUser(user)
    }

    const logout = ()=>{
        setUser(null)
        localStorage.removeItem("token")
    }

  return (
    <userContext.Provider value={{user, login, logout}}>
        {children}
    </userContext.Provider>
  )
}

export const useAuth =() =>useContext(userContext)
export default authContext
