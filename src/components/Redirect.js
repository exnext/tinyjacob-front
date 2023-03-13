import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Redirect() {
  const hash = useParams();
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  let elements;
  let timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    axios.post("http://localhost:3001/hash/hash", { hash: hash.h })
      .then((res) => {
        if (res.data.error === "unknownHash") 
          setError("Nieprawidłowy link");
        else if (res.data.error === "dbConnection") {
          setError("Brak połączenia z bazą danych");
          timer.current = setTimeout(window.location.reload(), 10 * 1000);
        } else {
          setLink(res.data.content);
          timer.current = setTimeout(() => {
            window.location.replace(res.data.content);
          }, 3 * 1000);
        }
      })
      .catch((error) => {
        setError("Brak połączenia z serwerem");
        timer.current = setTimeout(window.location.reload(), 10 * 1000);
      });
  }, [hash]);

  if (error !== "")
    elements = (
      <>
        <span>{error}</span> 
        Przejdź na stronę główną i <Link to={"/"}> spróbuj stworzyć swój własny, krótki link.</Link>
      </>
    );
  else
    elements = (
      <>
        <span>Dziękujemy za korzystanie z naszego serwisu</span>
        <span>Następuje przekierowanie do strony: <span className="underline">{link}</span></span>
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-6xl mt-8 text-slate-600"/>
      </>
    );

  return <div className="h-2/3 flex flex-col gap-4 justify-center items-center text-2xl">{elements}</div>;
}

export default Redirect;
