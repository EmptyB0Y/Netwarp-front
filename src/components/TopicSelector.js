import '../styles/TopicSelector.css';
import { getTopics } from "../services/posts.service";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

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
                <h1>TOPICS</h1>
                <div id='topic-list'>
                    {topics.map(object =>
                        <Link to={'/home/'+object.topic}> {object.topic} </Link>
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