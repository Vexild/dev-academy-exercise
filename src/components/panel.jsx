/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../css/panel.css'
import '../css/fonts.css'
import Search from './search'

const Panel = () => {

    const [display, setDisplay] = useState("")
    const [desc, setDesc] = useState("")
    const f_setDisplay = (s) =>{
        setDisplay(s.target.value);
    }

    useEffect( ()=>{
        setDesc(`Name Search App is my exercise for Solita's Dev Academy.\n
The exercise has listed four mandatory features:\n
    - searching popular names using names.json file\n
    - searching names in alphabetically (these are combined into single sorting option)\n
    - getting total of names in names.json\n
    - searching with a specific name\n
The exercise has been created using React, React-bootstrap and React-particle-js libraries in front and API endpoints using
Express.\n
    `)
    },[])
    return(
        <div>
            <Router>
                <div className="nav-line">
                        <Link to="/about">About</Link>
                        <Link to="/">Home</Link>
                </div>

            <Switch>
                <Route exact path="/about">
                    <div className="panel">
                        <p className="font-title">About Name Search</p>
                        <p className="font-text desc">{desc}</p>
                    </div>
                    
                </Route>

                <Route exact path="/">
                    <div className="panel">

                        <p className="font-title">Welcome to Name Search</p>
                        <p className="font-text">First, select the search mode</p>
                        
                        <div>
                            <ButtonGroup size="lg" aria-label="Basic example">
                                <Button className="font-text" value="listing" onClick={f_setDisplay} >Listing</Button>
                                <Button className="font-text" value="total" onClick={f_setDisplay} >Total</Button>
                                <Button className="font-text" value="specific" onClick={f_setDisplay} >Specific</Button>
                            </ButtonGroup>
                        </div>
                        <div>

                        <Search target={display} />
                        </div>
                    </div>

                </Route>
              
            </Switch>
            
            </Router>

        </div>
    )
}

export default Panel;