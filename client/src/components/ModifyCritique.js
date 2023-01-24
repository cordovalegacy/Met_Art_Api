import React, { useEffect } from 'react';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const ModifyCritique = (props) => {

    const {opinionList, setOpinionList} = props;
    const {culture, setCulture} = props;

    const [author, setAuthor] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState("");
    const [opinionContent, setOpinionContent] = useState("");
    const [errors, setErrors] = useState({});

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/art/critique/${id}`)
        .then((res) => {
            setAuthor(res.data.author);
            setEmail(res.data.email);
            setRating(res.data.rating);
            setOpinionContent(res.data.opinionContent);
        })
        .catch((errors) => console.log(errors.res))
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/art/critique/edit/${id}`, {
            author,
            email,
            rating,
            opinionContent,
        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate('/allcritiques');
        })
        .catch((err) => {
            console.log(err.response.status);
            console.log(err.response.data.error.errors);
            setErrors(err.response.data.error.errors);
        });
    }

    console.log(culture);
    console.log(opinionList);
    

    return (
        <div className='container'>
            <div className='pageTitleButton' key={culture}>
                
                <h2 id='critique-header'>Modify The Critique of {culture[0].title} </h2>
                <div className='button-spacer'>
                    <Link to="/allcritiques">
                        <button className="goToBlogButton"> Go to blog </button>
                    </Link>
                    <Link to="/">
                        <button className="goToBlogButton"> Go to home </button>
                    </Link>
                </div>
            </div>
            <div className='allArtData'>
                <div className='artData'>
                    <h6>Artist: {culture[0].artistDisplayName} </h6>
                    <h6>Object: {culture[0].objectName}</h6>
                    <h6>Time Period: {culture[0].objectBeginDate} to {culture[0].objectEndDate} </h6>
                    <h6>Region: {culture[0].culture}</h6>
                    <h6>Nationality: {culture[0].artistNationality}</h6>
                    <h6>Description: {culture[0].creditLine}</h6>
                </div>
                <div className='artData'>
                    <h6>This piece is housed in the department of: {culture[0].department}</h6>
                    <img id='primaryImage' src={culture[0].primaryImage} alt="sorry there is no image available"/>
                </div>
            </div>
            <br/>
            <form>
            <div className="form-group">
                <div className="column">
                <label htmlFor="author">Author:</label>
                <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                />
                {errors.author ? <p id='error-red'>{errors.author.message}</p> : null}
                <label htmlFor="authorEmail">Author Email:</label>
                <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
                {errors.email ? <p id='error-red'>{errors.email.message}</p> : null}
                <label htmlFor="rating">Rating:</label>
                <input name="rating"
                type="text"
                className="form-control"
                placeholder="Enter a rating from 1-10"
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                />
                {errors.rating ? <p id='error-red'>{errors.rating.message}</p> : null}
                <label htmlFor="content">Content:</label>
                <textarea name="content" cols="20" rows="12"
                type="textarea"
                className="form-control"
                placeholder="Write your critique here"
                onChange={(e) => setOpinionContent(e.target.value)}
                value={opinionContent}
                ></textarea>
                {errors.opinionContent ? <p id='error-red'>{errors.opinionContent.message}</p> : null}
                </div>
            </div>
            <span className='deletePost'>
            <button onClick={submitHandler} className="btn btn-primary">Add Critique </button>
            </span>
            </form>
            <br/>
            <br/>
        </div>
    )
}

export default ModifyCritique;