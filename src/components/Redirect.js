import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Redirect() {
  const hash = useParams();
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.post("http://localhost:3001/hash/hash", { hash: hash.h })
      .then((res) => {
        if (res.data.error === 'unknownHash')
          setError('Nieprawidłowy link');
        else if (res.data.error === 'dbConnection') {
          setError('Brak połączenia z bazą danych');
          setTimeout(window.location.reload(), 10 * 1000);
        } else {
          setLink(res.data.content);
          setTimeout(() => {
            window.location.replace(res.data.content);
          }, 3 * 1000);
        }
      })
      .catch((error) => {
        setError('Brak połączenia z serwerem');
      });
  }, [hash]);

  if (error !== '') {
    
    return (
      <div className="container">
        {error}. Przejdź na stronę główną i<Link to={'/'}> spróbuj stworzyć swój własny, krótki link.</Link>
      </div>
    );
  }

  return (
    <div className="container">
      Dziękujemy za korzystanie z naszeg serwisu :D <br/> 
      Następuje przekierowanie do strony: {link}
    </div>
  );
}

export default Redirect;
