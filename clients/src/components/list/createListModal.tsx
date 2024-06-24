import {Button, Form, Modal} from "react-bootstrap";
import React, {useState} from "react";
import "../../style/components/createListModals.css"
import {useCreateListMutation} from "../../services/ListService";
import {CreateList} from "../../models/IList";

const MyVerticallyCenteredModal = (props: any) => {
    const [validated, setValidated] = useState(false)
    const [name, setName] = useState('')
    const [createList, {}] = useCreateListMutation()

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
            await createList({name, body: name} as CreateList)

        } catch (e) {
            console.error("Error creating list:", e);
        }

        props.onHide();
    };



    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <h4 className="task">Create new list</h4>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Modal.Body>
                    <Form.Group className="mt-3 mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>The name of the task list :</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid list name.
                        </Form.Control.Feedback>
                    </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button className="create-button" type="submit">Create new list</Button>
                <Button className="close-button" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;