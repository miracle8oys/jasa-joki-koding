import { useState } from "react";
import { Form, Button} from "react-bootstrap";
import { db } from "./config/firebase";
import {collection, addDoc} from "firebase/firestore";
import "./App.css";
const Home = () => {

    const [name, setName] = useState('');
    const [telp, setTelp] = useState(0);
    const [semester, setSemester] = useState(0);
    const [deadline, setDate] = useState('');
    const [desc, setDesc] = useState('');
    const [msg, setMsg] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!telp || !desc) {
            setMsg("No telp dan Deskripsi diperlukan");
            return false;
        }

        const producRef = collection(db, "tasks");
        const date = new Date();
        const fullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        addDoc(producRef, {
            name,
            telp,
            semester,
            deadline,
            desc,
            isDone: false,
            createdAt: fullDate
        }).then(() => {
            setMsg("Anda Kan Segera Dihubungi melalui whatsapp");
            setIsOpen(false);
        });
    }

    const MODAL_STYLES = {
        position: 'fixed',
        width: '50%',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '50px',
        zIndex: 1000
      }

    return ( 
            <div className="home">
                {!isOpen &&
                    <div className="container">
                        <div className="introduce">
                            <h1>Jasa Joki Koding</h1>
                            <p>Kami menyediakan jasa joki untuk tugas programing dan membantu anda dalam memahami tools-tools yang digunakan untuk pemrograman</p>
                            <h6>Perlu bantuan kami?</h6>
                            <i onClick={() => setIsOpen(true)} className="fas fa-plus-circle true-btn"></i>
                        </div>
                    </div>
                }
                {isOpen &&
                
                    <div className="form-container" style={MODAL_STYLES}>
                    <div className="register">
                        <h1>Submission Form</h1>
                        {msg && <h5>{msg}</h5>}
                        <Form onSubmit={handleSubmit}>
                        <div className="row close-row">
                            <i onClick={() => setIsOpen(false)} className="far fa-times-circle close-btn"></i>
                        </div>
                        <div className="form-input">
                                <div className="split-form">
                                    <Form.Group className="mb-2" controlId="formBasicEmail">
                                        <Form.Label>Nama</Form.Label>
                                        <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Input Your Name.." />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="formBasicPassword">
                                        <Form.Label>Semester</Form.Label>
                                        <Form.Control onChange={(e) => setSemester(e.target.value)} type="number" placeholder="Input Semester.." />
                                    </Form.Group>
                                </div>
                                <div className="split-form">
                                    <Form.Group className="mb-2" controlId="formBasicPassword">
                                        <Form.Label>No Telp</Form.Label>
                                        <Form.Control onChange={(e) => setTelp(e.target.value)} type="number" placeholder="Telp" />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="formBasicPassword">
                                        <Form.Label>Tgl Deadline</Form.Label>
                                        <Form.Control onChange={(e) => setDate(e.target.value)} type="date" placeholder="Deadline" />
                                    </Form.Group>

                                </div>
                        </div>
                                <div className="desc-form">
                                <Form.Group className="mb-2 input-desc" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Deskripsi Tugas</Form.Label>
                                    <Form.Control onChange={(e) => setDesc(e.target.value)} as="textarea" rows={3} />
                                </Form.Group>
                                </div>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
  
                }
            </div>
     );
}
 
export default Home;