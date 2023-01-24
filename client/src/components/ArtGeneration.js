import {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const ArtGeneration = (props) => {

    const {handleCulture} = props;
    const {error, setError} = props;
    const {culture, setCulture} = props;
    const navigate = useNavigate();

    console.log('===artData', culture)
    

    return (
        <div className='container'>
            <div className='pageTitleButton'>
                <h1 id="welcomeSign" >Welcome!</h1>
                <Link to="/allcritiques">
                    <button className="goToBlogButton"> Go to blog </button>
                </Link>
            </div>
            <div>
                <p>
                    This site functions as an art education and creative exercise tool. We are proud to offer a randomly generated piece of art for you to critique and leave your impressions of.
                </p>
                <p>
                    Subsequently, leave your impressions on our blog site, where your analysis will be presented for other artistically interested folks to peruse.
                </p>
            </div>
            <br/>

            {/* working on functional section, buttons, onClick = filter with axios, 
            waiting on San w/ routes to actually hook up */}

            <div className='timePeriod'>
                <p>Generate a piece of art from one of the below centuries</p>
                <button onClick={e => {handleCulture("dateBegin=1701&dateEnd=1800")}}>18th Century</button>
                <button onClick={e => {handleCulture("dateBegin=1801&dateEnd=1900")}}>19th Century</button>
                <button onClick={e => {handleCulture("dateBegin=1901&dateEnd=2000")}}>20th Century</button>
                <button onClick={e => {handleCulture("dateBegin=2001&dateEnd=2200")}}>21st Century</button>
            </div>
            <div className='artRegion'>
                <p>Generate a piece of art from one of the below world regions</p>
                <button onClick={(e) => {handleCulture("african")}}>African Art</button>
                <button onClick={(e) => {handleCulture("american")}}>American Art</button>
                <button onClick={(e) => {handleCulture("asian")}}>Asian Art</button>
                <button onClick={(e) => {handleCulture("european")}}>European Art</button>
            </div>
            <div>
            {culture.map(culture => {
        return (
        <div className='artgen-map' key={culture}>
            <Link to="/critique/new"><button> Write critique on: {culture.title} </button> </Link>
            <img id='primaryImage' src={culture.primaryImage} alt="sorry, no image available" />
            <br />
        </div>
        );
    })}
    <br/>
    <br/>
        </div>
        </div>
    )
}

export default ArtGeneration;