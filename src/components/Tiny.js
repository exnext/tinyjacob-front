import React from "react";
import { useParams, Link } from 'react-router-dom';

function Tiny() {
    const hash = useParams();

    if (hash.h === 'false')
        return (
            <div className="Container">Błąd połączenia</div>
        );

    return (
        <div className="Container">
            Twój skrócony link to: <Link to={'http://localhost:3000/' + hash.h}>localhost:3000/{hash.h}</Link>
        </div>
    );
}

export default Tiny;