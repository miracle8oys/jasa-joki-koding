import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { useEffect, useState } from "react";
import Authorize from "./Authorize";
const TaskDetail = () => {

    const {task_id} = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState("");
    const [changes, setChanges] = useState(0);
    const taskRef = doc(db, "tasks", task_id);

    useEffect(() => {
        const getTask = async () => {
            const task = await getDoc(taskRef);
            setData(task.data());
        }
        getTask();
    }, [changes]);

    const handleUpdate = async () => {
        await updateDoc(taskRef, {
            isDone: true
        });
        setChanges(current => current + 1);
    }

    return ( 
        <Authorize>
            <div className="task-detail">
                <button onClick={() => navigate(-1)}>Back</button>
                <h5>{data.name}</h5>
                <h5>{data.semester}</h5>
                <h5>{data.telp}</h5>
                <h5>{data.createdAt}</h5>
                <h5>{data.deadline}</h5>
                <h5>{data.desc}</h5>
                <h5>{data.isDone ? <p>True</p> : <p>False</p>}</h5>
                <div>
                    <button onClick={handleUpdate} className="btn-detail">Done</button>
                </div>
            </div>
        </Authorize>
     );
}
 
export default TaskDetail;