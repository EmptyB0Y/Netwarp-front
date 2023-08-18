import '../styles/TopicSelector.css';
import { getTopics } from "../services/posts.service";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import arrow from '../assets/Icons/arrow-right.webp'

export const TopicSelector = () => {
    const [topics, setTopics] = useState([]);
    const [load,setLoad] = useState(false);

    useEffect(() => {
        getTopics()
        .then(data => {
            console.log(data);
            setTopics(data)
            setLoad(true)
        })
        .catch((err) => console.log(err)) 
      }, [load])

      if(load){
        return (        
            <div id='topic-selector-root-container'>
                <img alt='Go back' onClick={() => window.history.back()} id='arrow-back' src={arrow}></img>
                <h1>TOPICS</h1>
                <div id='topic-list'>
                    {topics.map(object =>
                        <Link to={'/home/'+object.topic}> <p className='topic-item' id={'topic-'+object.topic}>{object.topic}</p> </Link>
                        )}
                </div>

            </div>
        )
      }

      return (
        <div id='topic-selector-root-container'>
            <h1>TOPICS</h1>
            <p>...</p>
        </div>
    )
}