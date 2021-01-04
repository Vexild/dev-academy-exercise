/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";import '../css/panel.css'
import Search from './search'

const Panel = () => {

    const [display, setDisplay] = useState("")
    const f_setDisplay = (s) =>{
        setDisplay(s.target.value);
    }
    return(
        <div className="panel">
            <p className="font-title">Welcome to Name Search</p>
            <p className="font-text">First, select the search mode</p>
            
            <Row>
                <ButtonGroup size="lg" aria-label="Basic example">
                    <Button value="popular" onClick={f_setDisplay} >Popular</Button>
                    <Button value="total" onClick={f_setDisplay} >Total</Button>
                    <Button value="specific" onClick={f_setDisplay} >Specific</Button>
                </ButtonGroup>

            </Row>
            <Search target={display} />
            {/* <p>{display}</p>  */}

            <Col>
                
               

                {/* <Route exact path="/" render={() => (
                    <Container>
                            <p>ASD</p>
                        </Container>
                )} />
                <Route exact path="/menu" render={() => (
                    <Container>
                        <p>ASD</p>
                    </Container>
                )} />
                <Route path="/menu/:id" render={() => {
                    return (
                    <Container>
                        <p>ASD</p>
                        </Container>
                    )}} />
                <Route path="/aboutus" render={() => (
                    <Container>
                        <p>ASD</p>
                    </Container>
                    )} />
                <Route path="/order" render={() => (
                    <Container>
                        <Row className="centered">
                        <p>ASD</p>
                        </Row>
                    </Container>
                    )} />
                <Route path="/spillage" render={() => (
                    <Container>
                        <Row className="centered">
                        <p>ASD</p>
                        </Row>
                    </Container>                
                    )} /> */}
            </Col>

        </div>
    )
}

export default Panel;