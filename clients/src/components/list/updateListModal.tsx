import {Button, Form, Modal} from "react-bootstrap";
import React, {useState} from "react";
import "../../style/components/createListModals.css"
import {useUpdateListMutation} from "../../services/ListService";
import {IList} from "../../models/IList";

const MyVerticallyUpdateCenteredModal = ({list, show, onHide }: {list: IList; show: boolean; onHide: () => void; }) => {
    const [validated, setValidated] = useState(false)
    const [name, setName] = useState(list.name)
    const [updateList, {}] = useUpdateListMutation()


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
            await updateList({id: list.id, name: name})
        } catch (e) {
            console.error("Error creating list:", e);
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
                <h4 className="task">Update list</h4>
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
                    <Button className="create-button" type="submit">Update list</Button>
                    <Button className="close-button" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default MyVerticallyUpdateCenteredModal;
