import React, { useState } from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'

const Search = (props) => {
    const option = props.target
    console.log("Props",props.target)

    const [result, setResult] = useState("")
    const [searcName, setSearchName] = useState("")
    const changeSearchName = (e) =>{
        console.log("value:",e.target.value)
        setSearchName(e.target.value)
    }
    const search = () =>{
        setResult(searcName)
        console.log("Searched")
    }

    switch (option) {
        case "popular":
                return(
                        // searchs them right away
                    <div>
                        <p>Hello from Popular</p>
                        <ButtonGroup>
                            <label for="popular">Popular</label>
                            <input type="radio" name="popular"  value="popular"/>
                            <label for="alphab">Alphabetical</label>
                            <input type="radio" name="alphab" value="alpha"/>
                        </ButtonGroup>
                        <Button>Search Popular</Button>
                    </div>
                )
            break;
        case "total":
                return(
                    <div>
                        <p>Get total number of names</p>
                        <h2>NUMEBR OF NAMES</h2>

                    </div>
                )
            break;
    
        case "specific":
                return(
                    <div>
                        <p>Type in name you want to search</p>
                        <input type="text" onChange={changeSearchName}></input>
                        <Button onClick={search}>Search Name</Button>
                        <div>
                            <p>result:</p>
                            <p>{result}</p>
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