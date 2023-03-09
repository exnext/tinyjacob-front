import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Messy() {
    const [link, setLink] = useState('');
    const navigate = useNavigate();

    return (
        <form className="Form" onSubmit={(e) => {
            e.preventDefault();
            axios.post('http://localhost:3001/link/link', {'link': link})
                .then((res) => navigate(`/tiny/${res.data}`));
        }}>
            <h3>Link:</h3>
            <label>
                <input required type="text" name="url" className="link" value={link} 
                onChange={(e) => {
                setLink(e.target.value);
                }}/>
            </label>
            <input type="submit"/>
        </form>
    );
}

export default Messy;