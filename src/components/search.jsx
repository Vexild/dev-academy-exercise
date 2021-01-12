import axios from 'axios'
import React, { useState, useEffect} from 'react'
import {Button, ButtonGroup, Col, Row} from 'react-bootstrap'
import ResCard from './resultCard'
import '../css/fonts.css'
import '../css/search.css'

const Search = (props) => {
    const option = props.target

    const [popular, setPopular] = useState(true)
    const [alphabetical, setAlphabetical] = useState(false)
    const [resultListing, setResultListing] = useState([])
    const [resultTotal, setResultTotal] = useState(0)
    const [resultSpecific, setResultSpecific] = useState([])
    const [searchName, setSearchName] = useState("")
    const [error, setError] = useState(false)


    useEffect (()=> {
        if(popular){ setResultListing(resultListing.sort((a,b) => a.name >  b.name ? 1 : -1 ))}
        else{
            setResultListing(resultListing.sort((a,b) => a.amount < b.amount ? 1 : -1 ))
        }
    },[resultListing, popular])
    
    useEffect (()=> {
        console.log("Reset")
        setAlphabetical(false)
        setPopular(true)
        setResultListing([])
        setResultTotal(0)
        setResultSpecific([])
    },[option])


    const changeSearchName = (e) =>{
        console.log("value:",e.target.value)
        setSearchName(e.target.value)
    }
    const searchAll = () =>{
        console.log("Searched")
        try{

            axios.get("http://localhost:4000/getData")
            .then(res =>{
                if(popular){
                    setResultListing(res.data.names.sort((a,b) => a.amount < b.amount ? 1 : -1 ));
                } else{
                    setResultListing(res.data.names.sort((a,b) => a.name >  b.name ? 1 : -1 ));
                }
                console.log("State of result: ",resultListing);
            })
        } catch(err){
            console.error("ERROR", err);
        }
    }
    const getTotal = () => {
        try{

            axios.get("http://localhost:4000/getTotal")
            .then(res =>{
                setResultTotal(res.data);
                console.log("SearchTotal: ",res.data, res)
               
            })
        } catch(err){
            console.error("ERROR", err);
        }
    }
    const searchSpecific = (e) => {
        setError(false)
        try{
            axios.get("http://localhost:4000/getSingle/"+searchName)
            .then(res =>{
                setResultSpecific([])
                if(typeof(res.data) === 'object') {  // check that we're dealing with object
                    setResultSpecific([res.data.name, res.data.amount]) 
                }else{
                    setError(true)
                }
            })
        }catch(err){
            console.error("ERROR", err);
        }
    }
    const changeSortOption = (e) =>{
        setAlphabetical(!alphabetical)
        setPopular(!popular)
    }   

    switch (option) {
        case "listing":
                return(
                        // searchs them right away
                    <Col className="search-component"> 
                        <Col>       
                            <ButtonGroup className="search-options font-text radio-btn-line">
                                <label htmlFor="popular">Popular</label>
                                    <input  onChange={value => changeSortOption(value)}
                                            checked={popular} 
                                            value="popular" 
                                            type="radio" 
                                            name="popular" />
                                <label htmlFor="alphab">Alphabetical</label>
                                    <input  onChange={value => changeSortOption(value)}
                                            checked={alphabetical} 
                                            value="alphabetical"
                                            type="radio" 
                                            name="alphab"/>
                            </ButtonGroup>
                        </Col>
                        <Button className="search-button font-text" onClick={searchAll}>Search</Button>
                        <div className="result-listing">
                        {resultListing.length >0 ? <p className="font-text">Found following names:</p> : <p></p>} 
                        { resultListing.map((elem) =>{
                                return(
                                    <div>
                                        <ResCard data={elem} />
                                    </div>
                                )
                            }) }
                        </div>
                    </Col>
                )
        case "total":
                return(
                    <Col className="search-component">
                        <Button className="search-button font-text" onClick={getTotal}>Search</Button>

                        { resultTotal ? <p className="font-title"> {resultTotal} names in total</p> : <p></p> }

                    </Col>
                )
    
        case "specific":
                return(
                    <Col className="search-component">
                        <Col>
                            <p>Type in name you want to search</p>
                            <input type="text" onChange={changeSearchName}></input>
                        </Col>
                        <Col>
                            <Button className="search-button font-text" onClick={searchSpecific}>Search Name</Button>
                        </Col>
                        
                        { error ?
                            <div>
                                <p className="font-text">Error. Name not found. Check spelling and try again.</p>
                            </div>
                        : <p></p>}
                        { resultSpecific[0] ? 
                            <div>
                                <h3 className="font-title">{resultSpecific[0]}</h3>
                            <p className="font-text">Found {resultSpecific[1]} persons named {resultSpecific[0]} </p>
                            </div> 
                        : <p></p>}
                    </Col> 
                )
    
        default:
            break;
    }
    return(
        <div></div>
    )
}
export default Search;