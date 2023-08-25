import '../styles/GifSearch.css'
import plus from '../assets/Icons/plus.png'
import React, {useEffect, useState} from 'react'

export const GifSearch = ({place}) =>{

    const [gifs, setGifs] = useState([]);
    const [term, updateTerm] = useState('');
    const [iterations,setIterations] = useState(10);

    useEffect(()=>{
        fetchGifs().then(()=>{
            gifs.map((gif)=>{
                console.log(gif);
            })
        });
      
    },[term]);

    async function fetchGifs() {
        try {
        const API_KEY = 'EP7RKmRrQ1bMjBgJAFIR01e0FLIh7ds8';
        const BASE_URL = 'https://api.giphy.com/v1/gifs/search';
        
        fetch(`${BASE_URL}?api_key=${API_KEY}&q=${term}`)
        .then((resJson)=>{
            resJson.json().then((res)=>{
                setGifs(res.data);
            });
        });
        } catch (error) {
        console.warn(error);
        }
    }

    function handleGifSearch(e) {
        let newTerm = e.target.value;
        updateTerm(newTerm);
    }

    function handleClickLoadMore(e){
        e.stopPropagation();
        setIterations(iterations+10);
    }

    function handleClickGif(e){
        console.log(document.getElementById(place));
        document.getElementById(place).value += " :"+e.target.src+":";
    }

    return (
        <div className={'gif-search'}>
            <div className='gif-search-top'>
                <input className='gif-search-input' onInput={(e) => handleGifSearch(e)} width='20' height='20' multiple/>
            </div>
            <ul className='gif-list'>
                {gifs.slice(0,iterations).map((gif)=>
                    <li className='gif' onClick={(e)=>handleClickGif(e)} id={gif.id} key={gif.id}>
                        <img src={gif.images.fixed_height.url}></img>
                    </li>
                )}
            </ul>
            <img src={plus} className='load-gifs-button' onClick={(e) => handleClickLoadMore(e)}></img>
        </div>
    );
}