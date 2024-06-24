import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import {useUpdateTaskMutation} from "../../services/ListService";
import {CreateTask, ITasks, UpdateTask} from "../../models/ITasks";
import {IList} from "../../models/IList";

const UpdateTaskModal = ({list, task, show, onHide }: {list: IList, task: ITasks; show: boolean; onHide: () => void; }) => {
    const [validated, setValidated] = useState(false)
    const [name, setName] = useState(task.name)
    const [description, setDescription] = useState(task.description)
    const [term, setTerm] = useState<Date | null>(task.term)
    const [priority, setPriority] = useState(task.priority)
    const [updateTask, {}] = useUpdateTaskMutation()
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
            await updateTask({id: task.id, name, description, term, priority, list } as UpdateTask)

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
                <h4 className="task">Update task</h4>
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
                            selected={term}
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
                    <Button className="create-button" type="submit">Update task</Button>
                    <Button className="close-button" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdateTaskModal;