import React from 'react'
import {Button, ButtonGroup, Row, Col, Container} from 'react-bootstrap'
import '../css/fonts.css'
import '../css/card.css'

const ResCard = (props) =>{

    return(
        <div>
            <Row  className="result-card">
                <Col md={8}>
                    <p className="font-text card-name">
                        {props.data.name}
                    </p>
                </Col>
                <Col md={2}>
                    <p className="font-text card-amount">
                        {props.data.amount}
                    </p>
                </Col>
            </Row>
        </div>
    )
}
export default ResCard;