import {useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const OpinionGallery = (props) => {

    const [opinionList, setOpinionList] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/art/critique/all`)
        .then((res) => {
            console.log(res.data);
            setOpinionList(res.data);
        })
        .catch((err) => console.log(err));
    },[]);

    const deleteOpinion = (idFromBelow) => {
        console.log('====idFromBelow', idFromBelow)
        axios.delete(`http://localhost:5000/api/art/critique/${idFromBelow}`)
        .then((res) => {
            console.log(res.data);
            setOpinionList(opinionList.filter((opinion, index) => opinion._id !== idFromBelow));
        })
        .catch((err) => console.log(err))
    };

    console.log(opinionList);

    return (
            <div className="container">
                <div className="font-link">
                <div className="col-12">
                <div className='pageTitleButton'>
                    <h1>Art Critique Gallery</h1>
                    <Link to="/">
                        <button className="goToBlogButton"> Go to Art Generation </button>
                    </Link>
                </div>
                <div className="body">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Actions</th>
                        </tr> 
                    </thead>
                    <tbody>
                    {opinionList.map((opinion, index) => {
                        return (
                            <tr key={opinion._id}>
                                <button className='title-link'><Link to={`/critique/${opinion._id}`}>{opinion.title}</Link></button>
                                <td>{opinion.artistDisplayName}</td>
                                <td>{opinion.rating}</td>
                                <td className="links">
                                    <button id='buttonhover' onClick={()=> navigate(`/critique/edit/${opinion._id}`)}>Edit</button>
                                    <button onClick={()=> deleteOpinion(opinion._id)}>Delete</button>
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
);
}

export default OpinionGallery
