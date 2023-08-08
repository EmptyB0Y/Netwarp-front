import { textSearchProfiles } from "../services/profiles.service"
import { Link } from "react-router-dom";
import { useState } from 'react'

export const Searchbar = () =>{
    const [result,setResult] = useState(<ul id='search-list'></ul>);

    return (
    <div className="searchbar">
        <form id='search-form' onKeyUpCapture={(e)=>{handleKeyUp(e)}}>
                <input id='search-input'></input>
                <button id='search-button'>SEARCH</button>
                <span id='search-results'>{result}</span>
        </form>
    </div>
    )

    function handleKeyUp(e){
        e.preventDefault();

        if(e.target.value !== ''){
            textSearchProfiles(e.target.value).then((profiles) =>{

                if(profiles != null){
                     setResult(<ul id='search-list'>
                        {profiles.map((profile) => 
                        <li key={profile.UserId}>
                            <Link to={'/profile/'+profile.id}> 
                                <p className='result-username'>{profile.username}</p> 
                                <p className='result-description'>{profile.description}</p>
                            </Link>
                        </li>)}
                    </ul>)
                }
            }); 
        }
        else{
            setResult(<ul id='search-list'></ul>)
        }
    }
}