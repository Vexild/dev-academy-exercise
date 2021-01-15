import React from 'react'
import { Row, Col} from 'react-bootstrap'
import '../css/fonts.css'
import '../css/card.css'

const ResCard = (props) =>{

    return(
        <div>
            <Row  className="result-card justify-content-md-center">
                <Col xs md={2}>
                    <p className="font-text card-name">
                        {props.data.name}
                    </p>
                </Col>
                <Col xs md={2}>
                    <p className="font-text card-amount">
                        {props.data.amount}
                    </p>
                </Col>
            </Row>
        </div>
    )
}
export default ResCard;