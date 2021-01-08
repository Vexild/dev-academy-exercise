import React from 'react'
import {Button, ButtonGroup, Row, Col, Container} from 'react-bootstrap'
import '../css/fonts.css'
import '../css/card.css'

const ResCard = (props) =>{

    return(
        <Container>
            <Row className="card">
                <Col md={4}>
                <p className="font-text">
                    {props.data.name}
                </p>
                </Col>
                <Col md={4}>
                <p classNAme="card-amount">
                    {props.data.amount}
                </p>
                </Col>
            </Row>
        </Container>
    )
}
export default ResCard;