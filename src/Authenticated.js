import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Authenticated = ({children, user}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate("/login");
        } 
    }, [user]);
    return children
        
}
 
export default Authenticated;