import axios from 'axios'
import React, { useState, useEffect} from 'react'
import {Button, ButtonGroup, Col} from 'react-bootstrap'
import ClipLoader from "react-spinners/ClipLoader";
import ResCard from './resultCard'
import '../css/fonts.css'
import '../css/search.css'
import { css } from "@emotion/core";

const Search = (props) => {
    const option = props.target

    const [popular, setPopular] = useState(true)
    const [alphabetical, setAlphabetical] = useState(false)
    const [resultListing, setResultListing] = useState([])
    const [resultTotal, setResultTotal] = useState(0)
    const [resultSpecific, setResultSpecific] = useState([])
    const [searchName, setSearchName] = useState("")
    const [error_notfound, setErrorNotFound] = useState(false)
    const [APIerror, setAPIerror] = useState(false)
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState("D7FFF2")
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: cyan
    size: 35;
  `;

    useEffect (()=> {
        if(popular){  
            setResultListing([...resultListing.sort((a,b) => a.amount < b.amount ? 1 : -1 )])
            // in case of re-rendering doesnt work, remember to add [ ] with spread operator
            // to the setting function. This not only makes a referende but actually changes the value
        }
        else{
            setResultListing([...resultListing.sort((a,b) => a.name >  b.name ? 1 : -1 )])
        }
    },[popular])
    
    useEffect (()=> {
        setLoading(false)
        setAlphabetical(false)
        setPopular(true)
        setResultListing([])
        setResultTotal(0)
        setResultSpecific([])
    },[option])

    // Popular / Alphabetical
    const changeSortOption = (e) =>{
        setAlphabetical(!alphabetical)
        setPopular(!popular)
    }   

    // Specific name 
    const changeSearchName = (e) =>{
        setSearchName(e.target.value)
    }

    const searchAll = () =>{
        setAPIerror(false)
        setLoading(true)
        try{
            axios.get("http://localhost:4000/getData")
            .then(res =>{
                if(popular){                    
                    setResultListing(res.data.names.sort((a,b) => a.amount < b.amount ? 1 : -1 ));
                } else{
                    setResultListing(res.data.names.sort((a,b) => a.name >  b.name ? 1 : -1 ));
                }
            })
            .then(()=>{
                setLoading(false)
            })
            .catch(e =>{
                setLoading(false)
                console.error("API_ERROR", e)
                setAPIerror(true)
            })
        } catch(err){
            console.error("ERROR", err)
        }
    }

    const getTotal = () => {
        setAPIerror(false)
        setLoading(true)
        try{
            axios.get("http://localhost:4000/getTotal")
            .then(res =>{
                setResultTotal(res.data)
            })
            .then(()=>{
                setLoading(false)
            })
            .catch(e =>{
                setAPIerror(true)
                console.error("API_ERROR", e)
                setLoading(false)
            })
        } catch(err){
            console.error("ERROR", err)
        }
    }

    const searchSpecific = (e) => {
        setAPIerror(false)
        setLoading(true)
        try{
            axios.get("http://localhost:4000/getSingle/"+searchName)
            .then(res =>{
                setResultSpecific([])
                if(typeof(res.data) === 'object') {  // check that we're dealing with object
                    setResultSpecific([res.data.name, res.data.amount]) 
                }else{
                    setErrorNotFound(true)
                }
            })
            .then(()=>{
                setLoading(false)
            })
            .catch(e =>{
                setAPIerror(true)
                console.error("API_ERROR", e)
                setLoading(false)
            })
        }catch(err){
            console.error("ERROR", err)
        }
    }

    switch (option) {
        case "listing":
            return(
                <Col className="search-component"> 
                    <p className="font-text">Search for list of names</p>
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
                        { resultListing.map((elem, i) =>{
                            return(
                                <ResCard key={i.toString()} data={elem} />
                            )
                        })}
                        { loading ? <ClipLoader color={color} loading={loading} css={override} size={150} /> : <p></p>}
                        { APIerror ? <p className="font-text">API error. Check Express is running in port 4000</p> : <p></p>}
                    </div>
                </Col>
            )
        case "total":
            return(
                <Col className="search-component">
                    <p className="font-text">Search for total number of names</p>
                    <Button className="search-button font-text" onClick={getTotal}>Search</Button>
                    { resultTotal ? <p className="font-title"> {resultTotal} names in total</p> : <p></p> }
                    { loading ? <ClipLoader color={color} loading={loading} css={override} size={150} /> : <p></p>}
                    { APIerror ? <p className="font-text">API error. Check Express is running in port 4000</p> : <p></p>}
                </Col>
            )
    
        case "specific":
            return(
                <Col className="search-component">
                    <Col>
                        <p className="font-text">Type in name you want to search</p>
                        <input type="text" onChange={changeSearchName}></input>
                    </Col>
                    <Col>
                        <Button className="search-button font-text" onClick={searchSpecific}>Search Name</Button>
                    </Col>
                    
                    { resultSpecific[0] ? 
                        <div>
                            <h3 className="font-title">{resultSpecific[0]}</h3>
                            <p className="font-text">Found {resultSpecific[1]} persons named {resultSpecific[0]} </p>
                        </div> 
                    : <p></p>}
                    { error_notfound ? <p className="font-text">Error. Name not found. Check spelling and try again.</p> : <p></p>}
                    { loading ? <ClipLoader color={color} loading={loading} css={override} size={150} /> : <p></p>}
                    { APIerror ? <p className="font-text">API error. Check Express is running in port 4000</p> : <p></p>}
                </Col> 
            )
        default:
            break
    }
    return(
        <div></div>
    )
}
export default Search