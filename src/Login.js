import { useEffect } from "react";
import {Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Login = ({signInWithGoogle, user}) => {

    const navigate = useNavigate();
    const handleLogin = () => {
        signInWithGoogle();
    }

    useEffect(() => {
        if (user) {
            navigate("/admin");
        }
    }, [user]);

    return ( 
        <Button onClick={handleLogin}>Login</Button>
     );
}
 
export default Login;