import React, {useState} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import history from "../../media/history.png";
import {Button} from "react-bootstrap";
import {useFetchAllHistoryQuery} from "../../services/ListService";
import '../../style/components/displayHistory.css'
import {formatDateAndTime} from "../date";

const DisplayHistory = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {data: items} = useFetchAllHistoryQuery()

    console.log(items)

    return (
        <>
            <Button className="btn-history" onClick={handleShow}><img alt="reverse" className="history-img" src={history}/> History</Button>
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>History</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <>
                    {items && items.map(item => (
                        <div key={item.id}>
                            <div className='date'>{formatDateAndTime(item.createdAt.toString()) }</div>
                            <p>{item.history}</p>
                        </div>
                            ))}
                    </>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default DisplayHistory;
