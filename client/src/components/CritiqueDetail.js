import { useState, useEffect } from "react";
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';


const CritiqueDetail = (props) => {

    const {id} = useParams();
    const [artList, setArtList] = useState({});
    const {opinionList, setOpinionList} = props;

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/art/critique/${id}`)
        .then((res) => {
            console.log(res.data);
            setOpinionList(res.data);
        })
        .catch((err) => {
            console.log(err);
    });
}, []);

const sendHandler = (e) => {
    e.preventDefault();
    emailjs.send('service_id', 'template_8', opinionList, 'LW4RMYIvhRvf0Fz9c')
        .then((res) => {
            console.log("SUCCESS", res.data);
        }, (err) => {
            console.log(err);
        });

    axios.delete(`http://localhost:5000/api/art/critique/${id}`)
    .then((res) => {
        console.log(res.data);
        navigate('/');
    })
    .catch((err) => console.log(err))
};

    return(
        <div className='container'>
            <div className='pageTitleButton' key={opinionList}>
                <h2 id='critique-header'>Give Your Critique of: {opinionList.title} </h2>
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
                    <h4>Critique Author: {opinionList.author}</h4>
                    <br/>
                    <h6>Artist: {opinionList.artistDisplayName} </h6>
                    <h6>Object: {opinionList.objectName}</h6>
                    <h6>Time Period: {opinionList.objectBeginDate} to {opinionList.objectEndDate} </h6>
                    <h6>Region: {opinionList.culture}</h6>
                    <h6>Nationality: {opinionList.artistNationality}</h6>
                    <h6>Description: {opinionList.creditLine}</h6>
                    <h6>Rating: {opinionList.rating}</h6>
                    <h6>Critique Content: {opinionList.opinionContent}</h6>
                </div>
                <div className='artData'>
                    <h6>This piece is housed in the department: {opinionList.department} </h6>
                    <img id='primaryImage' src={opinionList.primaryImage} alt="sorry there is no image available"/>
                </div>
            </div>
            <button onClick={sendHandler}>Receive Email about {opinionList.title} and Delete from Blog</button>
            <br/>
            <br/>
            </div>
    )
}   

export default CritiqueDetail;