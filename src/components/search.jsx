import axios from 'axios'
import React, { useState, useEffect} from 'react'
import {Button, ButtonGroup, Col} from 'react-bootstrap'
import ResCard from './resultCard'
import '../css/fonts.css'
import '../css/search.css'

const Search = (props) => {
    const option = props.target

    const [popular, setPopular] = useState(true)
    const [alphabetical, setAlphabetical] = useState(false)
    const [resultListing, setResultListing] = useState([])
    const [resultTotal, setResultTotal] = useState(0)
    const [resultSpecific, setResultSpecific] = useState("")
    const [searcName, setSearchName] = useState("")


    useEffect (()=> {
        console.log("Popular changed")
        if(popular){ setResultListing(resultListing.sort((a,b) => a.name >  b.name ? 1 : -1 ))}
        else{
            setResultListing(resultListing.sort((a,b) => a.amount < b.amount ? 1 : -1 ))
        }
    },[resultListing, popular])


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
    const searchSpecific = () => {

    }
    // Alphabetical boolean is unused because if we want to add more sorting options, we'd need it later
    const changeSortOption = (e) =>{
        if(e.target.value === "popular"){
            setPopular(true)
            setAlphabetical(false)
        } else{
            setPopular(false)
            setAlphabetical(true)
        }
    }   

    switch (option) {
        case "listing":
                return(
                        // searchs them right away
                    <Col> 
                        <ButtonGroup className="search-options font-text">
                            <label htmlFor="popular">Popular</label>
                                <input onClick={value => changeSortOption(value)} 
                                        checked={popular} 
                                        value="popular" 
                                        type="radio" 
                                        name="popular" />
                            <label htmlFor="alphab">Alphabetical</label>
                                <input onClick={value => changeSortOption(value)} 
                                        checked={alphabetical} 
                                        value="alphabetical"
                                        type="radio" 
                                        name="alphab"/>
                        </ButtonGroup>
                        <Button className="search-button font-text" onClick={searchAll}>Search</Button>
                        <div>
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
            break;
        case "total":
                return(
                    <Col>
                        <Button className="search-button font-text" onClick={getTotal}>Search</Button>

                        { resultTotal ? <h3> {resultTotal} names in total</h3> : <p>-</p> }

                    </Col>
                )
            break;
    
        case "specific":
                return(
                    <div>
                        <p>Type in name you want to search</p>
                        <input type="text" onChange={changeSearchName}></input>
                        <Button onClick={searchSpecific}>Search Name</Button>
                        <div>
                            <p>result:</p>
                            <p>{resultSpecific}</p>
                        </div>
                    </div> 
                )
            break;
    
        default:
            break;
    }
    return(
        <p>Hello from search! option: {option}</p>
        
    )
}
export default Search;