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
    const [api, setApi] = useState([])
    const f_setDisplay = (s) =>{
        setDisplay(s.target.value);
    }

    useEffect( ()=>{
        setDesc(`Name Search App is my exercise for Solita's Dev Academy.
The exercise has listed four mandatory features:\n
- searching popular names using names.json file
- searching names in alphabetically (these are combined into single sorting option)
- getting total of names in names.json
- searching with a specific name\n
The exercise has been created using React, React-bootstrap, React-spinners and React-particle-js libraries in front and API endpoints using Express.
    `)
        setApi([`Name searchs uses following endpoints in port 4000 using Express:` ,
        `Possible TODO endpoints for future implementations (example for database):`])
    },[])
    return(
        <div>
            <Router>
                <div className="nav-line">
                        <Link to="/api">API</Link>
                        <Link to="/about">About</Link>
                        <Link to="/">Home</Link>
                </div>

            <Switch>
                <Route exact path="/api">
                    <div className="panel">
                        <p className="font-title">Name Search API</p>
                        <p className="font-text desc">{api[0]}</p>
                        <table className="font-text desc">
                            <tbody>
                                <tr>
                                    <th>/getData</th><th>GET</th><th>Returns all names. No sorting.</th>
                                </tr>
                                <tr>
                                    <th>/getTotal</th><th>GET</th><th>Returns total length of names.</th>
                                </tr>
                                <tr>
                                    <th>/getSingle:name </th><th>GET</th><th>Returns first match with find() method.</th>
                                </tr>
                            </tbody>
                        </table>
                        <p className="font-text desc">{api[1]}</p>
                        <table className="font-text desc">
                            <tbody>

                                <tr>
                                    <th>/modifyName:name</th><th>UPDATE</th><th>Updates single name in DB or JSON file.</th>
                                </tr>
                                <tr>
                                    <th>/modifyMultiple:nameList</th><th>UPDATE</th><th>Updates multiple names in DB or JSON file.</th>
                                </tr>
                                <tr>
                                    <th>/removeName:name</th><th>DELETE</th><th>Removes name.</th>
                                </tr>
                                <tr>
                                    <th>/addNAme:nameObject </th><th>POST</th><th>Add element with correspondig fields.</th>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </Route>
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
                    
                        <ButtonGroup size="lg" aria-label="Basic example">
                            <Button className="font-text" value="listing" onClick={f_setDisplay} >Listing</Button>
                            <Button className="font-text" value="total" onClick={f_setDisplay} >Total</Button>
                            <Button className="font-text" value="specific" onClick={f_setDisplay} >Specific</Button>
                        </ButtonGroup>
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