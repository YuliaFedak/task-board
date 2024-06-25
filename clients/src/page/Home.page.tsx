import React from 'react';
import {Button, Container, Row, Col, DropdownButton, Dropdown, Card, CardText} from "react-bootstrap";
import "../style/home.css"
import plus from "../media/plus.png"
import blackPlus from "../media/blackplus.png"
import menu from "../media/menu.png"
import edit from "../media/edit.png"
import grayPlus from "../media/grayplus.png"
import bin from "../media/trash-can.png"
import calendar from "../media/calendar.png"
import MyVerticallyCenteredModal from "../components/list/createListModal";
import {formatDate} from "../components/date";
import MyTaskModal from "../components/task/createTaskModal";
import {
    useDeleteListMutation,
    useDeleteTaskMutation,
    useFetchAllListsQuery, useUpdateTaskListIdMutation
} from "../services/ListService";
import {IList} from "../models/IList";
import MyVerticallyUpdateCenteredModal from "../components/list/updateListModal";
import {ITasks} from "../models/ITasks";
import UpdateTaskModal from "../components/task/updateTaskModal";
import DisplayHistory from "../components/history/displayHistory";



const HomePage = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalUpdateShow, setModalUpdateShow] = React.useState(false);

    const [selectedList, setSelectedList] = React.useState<IList | null>(null);
    const [modal, setModal] = React.useState(false)
    // UpdateTaskModal
    const [selectedTask, setSelectedTask] = React.useState<ITasks | null>(null)
    const [modalUpdateTask, setModalUpdateTask] = React.useState(false);
    // offCanvas
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { data: list} = useFetchAllListsQuery();
    const [deleteList, {}] = useDeleteListMutation();
    const [deleteTask, {}] = useDeleteTaskMutation();
    const [updateTaskListId, {}] = useUpdateTaskListIdMutation();

    const handleRemove = (list: IList) => {
        deleteList(list)
    }

    const handleRemoveTask = (task: ITasks) => {
        deleteTask(task)
    }

    const handleSelectList = (item: IList) => {
        setSelectedList(item);
        setModalUpdateShow(true);

    };

    const handleDeselectList = () => {
        setSelectedList(null);
        setModalUpdateShow(false);
    };

    const handleSelectedListForTask = (item: IList) => {
        setSelectedList(item);
        setModal(true);
    }

    const handleUpdateTask = (task: ITasks, item: IList) => {
        setSelectedTask(task);
        setModalUpdateTask(true);
        setSelectedList(item)
    }

    const handleDeselectedTask = () => {
        setSelectedList(null)
        setSelectedTask(null)
        setModalUpdateTask(false);
    }

    const handleMoveToAnotherList = async (id: number, listId: number) => {
        try {
            await updateTaskListId({id, listId})

        } catch (e) {
            console.error("Error move to another list:", e);
        }
    }

    return (
        <Container className="page">
            <div className="d-flex justify-content-between">
            <h3>My Task Board</h3>
                <div>
                    <DisplayHistory/>
                    <Button className="btn-plus" onClick={() => setModalShow(true)}><img className="plus-img" src={plus}/>Create new list</Button>
                </div>
            </div>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Row className="horizontal-table">
                    {list && list.map(item => (
                        <Col md={3}  style={{marginTop: 25}}>
                            <td key={item.id} className="name-of-list ">
                                <div className="d-flex justify-content-between align-content-center" style={{marginTop: 5}}>
                                    {item.name}
                                    <DropdownButton className="menu-btn" title={ <img className="menu-button" src={menu} /> }>
                                        <button className='btn-bin' onClick={() => handleSelectList(item)}><Dropdown.Item eventKey="1"><img className="dropdown-img" src={edit}/> Edit</Dropdown.Item></button>
                                        <button className='btn-bin' onClick={() => handleSelectedListForTask(item)}><Dropdown.Item eventKey="2"><img className="dropdown-img" src={grayPlus}/> Add new card</Dropdown.Item></button>
                                        <button className="btn-bin" onClick={() => handleRemove(item)}><Dropdown.Item eventKey="3" className="bin"><img className="dropdown-img" src={bin}/>Delete</Dropdown.Item></button>
                                    </DropdownButton>
                                </div>
                            </td>

                            {selectedList && (
                                <MyVerticallyUpdateCenteredModal
                                    list={selectedList}
                                    show={modalUpdateShow}
                                    onHide={() => handleDeselectList()}
                                />
                            )}
                            <Button className="add-button" onClick={() => handleSelectedListForTask(item)}><img className="black-plus-img" src={blackPlus}/>Add new card</Button>
                            {selectedList && (
                                <MyTaskModal
                                    list={selectedList}
                                    show={modal}
                                    onHide={() => setModal(false)}
                                />
                            )}


                            {item.tasks.map(task => (
                                <Card style={{marginTop: 15}}>
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-content-center">
                                            <Card.Title>{task.name}</Card.Title>
                                            <DropdownButton className="menu-btn" title={ <img className="menu-button-task" src={menu} /> }>
                                                <button className='btn-bin' onClick={() => handleUpdateTask(task, item)}><Dropdown.Item eventKey="1"><img className="dropdown-img" src={edit}/> Edit</Dropdown.Item></button>
                                                <button className="btn-bin" onClick={() => handleRemoveTask(task)}><Dropdown.Item eventKey="2" className="bin"><img className="dropdown-img" src={bin}/>Delete</Dropdown.Item></button>
                                            </DropdownButton>
                                        </div>
                                        {selectedTask && selectedList && (
                                            <UpdateTaskModal
                                                list={selectedList}
                                                task={selectedTask}
                                                show={modalUpdateTask}
                                                onHide={() => handleDeselectedTask()}
                                            />
                                        )}


                                        <Card.Text>
                                            {task.description}
                                        </Card.Text>
                                        <CardText className="d-flex">
                                            <img src={calendar} className="calendar-img"/>
                                            &nbsp;&nbsp;&nbsp;
                                             <div>{formatDate(task.term.toString())}</div>
                                        </CardText>
                                        <CardText className={`priority ${task.priority.toLowerCase()}`}>&nbsp; &#8226; {task.priority}</CardText>
                                        <DropdownButton
                                            className="move-button"
                                            title="Move to:"
                                        >
                                            {list && list.map((items ) => (
                                                <Dropdown.Item key={items.id}><button onClick={() => handleMoveToAnotherList(task.id, items.id)} className="drop-moved-menu">{items.name}</button></Dropdown.Item>
                                            ))}


                                        </DropdownButton>

                                    </Card.Body>
                                </Card>
                            ))}

                        </Col>
                    ))}
            </Row>

        </Container>
    );
};

export default HomePage;
