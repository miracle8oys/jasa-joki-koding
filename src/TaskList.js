import { db } from "./config/firebase";
import { Table, Container, Row, Col } from "react-bootstrap";
import { query, collection, orderBy, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const TaskList = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        try {
            const tasksRef = query(collection(db, "tasks"), orderBy("isDone"));
            const getChapter = async () => {
                const data = await getDocs(tasksRef);
                setTasks(data.docs.map(doc => (
                    {
                        ...doc.data(),
                        id: doc.id
                    }
                )));
            }

            getChapter();
            
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    return ( 
        <>
            <Container>
                <Row className="admin-head">
                    <Col><p>Name</p></Col>
                    <Col><p>CreatedAt</p></Col>
                    <Col><p>Deadline</p></Col>
                    <Col><p>IsDone</p></Col>
                </Row>
                    {tasks.map(task => (
                        <Link key={task.id} to={`/task/${task.id}`}>
                            <Row>
                                <Col><p>{task.name}</p></Col>
                                <Col><p>{task.createdAt}</p></Col>
                                <Col><p>{task.deadline}</p></Col>
                                <Col>{task.isDone ? <p>True</p> : <p>False</p>}</Col>
                            </Row>
                        </Link>
                    ))}
            </Container>
        </>
     );
}
 
export default TaskList;