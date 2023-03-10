import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Messy() {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <form
        className="Form"
        onSubmit={(e) => {
          e.preventDefault();
          axios.post("http://localhost:3001/link/link", { link: link })
            .then((res) => {
              switch (res.data.error) {
                case 'dbConnection':
                  setError('Brak połączenia z bazą danych');
                  setTimeout(window.location.reload(), 10 * 1000);
                  break;
                case 'notALink':
                  setError('Podany link jest niepoprawny');
                  break;
                default:
                  navigate(`/tiny/${res.data.content}`);
                  break;
              }
            })
            .catch((error) => {
              setError('Brak połączenia z serwerem');
            });
        }}
        >
        <h3>Link:</h3>
        <label>
          <input
            required
            type="text"
            name="url"
            className="link"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            />
        </label>
        <input type="submit" />
      </form>
      <div className="container" style={{color: 'red'}}>{error}</div>
      </>
  );
}

export default Messy;
