import React, { useEffect } from "react";
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Redirect() {
    const hash = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:3001/hash/hash', {'hash': hash.h})
            .then((res) => {
                window.location.replace(res.data);
            })
    }, [hash, navigate])  

    return (
        <div className="Container">
            Dziękujemy za korzystanie z naszej strony :D
        </div>
    );
}

export default Redirect;