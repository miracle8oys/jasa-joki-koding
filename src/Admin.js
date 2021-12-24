import Authenticated from "./Authenticated";
import Authorize from "./Authorize";
import TaskList from "./TaskList";

const Admin = ({user, signOut, auth}) => {

    const handleLogout = () => {
        signOut(auth);
    }

    return ( 
        <Authenticated user={user}>
            <Authorize user={user}>
                <div className="admin-container">
                    <div className="admin">
                        <h1>Admin</h1>
                        <button onClick={handleLogout}>SignOut</button>
                        {user && <TaskList />}
                    </div>
                </div>
            </Authorize>
        </Authenticated>
     );
}
 
export default Admin;