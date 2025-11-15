import { Navigate } from "react-router-dom"

export default function Protected ({children, login}){
    // console.log("protected", login)
    if(!login){
        return <Navigate to="/login" replace />
    }
    return children
}