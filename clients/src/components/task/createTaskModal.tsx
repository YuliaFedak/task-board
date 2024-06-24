import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState} from "react";
import {Form} from "react-bootstrap";
import "../../style/components/createTaskModal.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {useCreateTaskMutation} from "../../services/ListService";
import {CreateTask} from "../../models/ITasks";
import {IList} from "../../models/IList";

const MyTaskModal = ({list, show, onHide }: {list: IList; show: boolean; onHide: () => void; }) => {
    const [validated, setValidated] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [term, setTerm] = useState<Date | null>(new Date())
    const [priority, setPriority] = useState('High')
    const [createTask, {}] = useCreateTaskMutation()
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        setValidated(false);

        try {
           await createTask({name, description, term, priority, list } as CreateTask)

        } catch (e) {
            console.error("Error creating task:", e);
        }

        onHide();
    };



    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <h4 className="task">Create new task</h4>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>

                    <Form.Group className="mt-3 mb-2" controlId="exampleForm.ControlInput1">
                        <Form.Label>The title:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid task title.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter description"
                            value = {description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid task description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Deadline:</Form.Label>
                        <br/>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: any) => {
                                setStartDate(date);
                                setTerm(date)
                            }}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}

                        />
                    </Form.Group>
                    <Form.Label>Level of importance:</Form.Label>
                    <Form.Select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option>High</option>
                        <option>Middle</option>
                        <option>Low</option>
                    </Form.Select>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="create-button" type="submit">Create new task</Button>
                    <Button className="close-button" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
export default MyTaskModal;