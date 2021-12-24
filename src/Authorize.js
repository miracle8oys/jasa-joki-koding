import { query, collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Authorize = ({user, children}) => {

    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        try {
            if (!!user) {
                const adminRef = query(collection(db, "admin"));
                const getAdmin = async () => {
                    const data = await getDocs(adminRef);
                    setAdmin(data.docs.map(doc => (
                        {
                            ...doc.data(),
                            id: doc.id
                        }
                    )))
                }
    
                getAdmin();
            }
            
        } catch (error) {
            console.log(error.name);
        }
    }, [user]);

    useEffect(() => {
        if (admin) {
            const result = admin.filter(ad => ad.uid === user.uid);
            checkResult(result);
        }
    }, [admin]);

    function checkResult(result) {
        if (result.length === 0) {
            navigate('/');
        }
    }

    return children
    
}
 
export default Authorize;