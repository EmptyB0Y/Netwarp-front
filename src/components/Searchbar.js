import '../styles/SearchBar.css';
import { textSearchProfiles } from "../services/profiles.service"
import { Link } from "react-router-dom";
import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

export const Searchbar = () =>{
    const [result,setResult] = useState(<ul id='search-list'></ul>);

    return (
    <div id="searchbar">
        <form id='search-form' onKeyUpCapture={(e)=>{handleKeyUp(e)}}>
                <TextareaAutosize className='search-input' role='textbox' placeholder="Look someone up" name="content"/>
                <button id='search-button'>SEARCH</button>
        </form>
        <span id='search-results'>{result}</span>
    </div>
    )

    function handleKeyUp(e){
        e.preventDefault();

        if(e.target.value !== ''){
            textSearchProfiles(e.target.value).then((profiles) =>{

                if(profiles != null){
                     setResult(<div id='search-list'>
                        {profiles.map((profile) => 
                        <div className='search-result' key={profile.UserId}>
                            <Link className='search-result-link' to={'/profile/'+profile.id}>
                                <p className='result-username'>{profile.username}</p> 
                                <p className='result-description'>{profile.description}</p>
                            </Link>
                        </div>)}
                    </div>)
                }
            }); 
        }
        else{
            setResult(<ul id='search-list'></ul>)
        }
    }
}