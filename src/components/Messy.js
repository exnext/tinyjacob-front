import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Error from "./common/Error";

function Messy() {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <form
        className="h-2/3 pt-5 pl-5 flex flex-col flex-wrap items-center justify-center gap-5 text-lg"
        onSubmit={(e) => {
          e.preventDefault();
          axios.post("http://localhost:3001/link/link", { link: link })
            .then((res) => {
              switch (res.data.error) {
                case "dbConnection":
                  setError("Brak połączenia z bazą danych");
                  setTimeout(window.location.reload(), 10 * 1000);
                  break;
                case "notALink":
                  setError("Podany link jest niepoprawny");
                  break;
                default:
                  navigate(`/tiny/${res.data.content}`);
                  break;
              }
            })
            .catch((error) => {
              setError("Brak połączenia z serwerem");
            });
        }}
      >
        <label className="flex flex-col gap-2.5 font-semibold">
          Link:
          <input
            required
            type="text"
            name="url"
            className="form-input w-80 rounded border-gray-600 focus:border-slate-600 focus:ring-slate-600 font-normal"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
              setError("");
            }}
          />
          <Error error={error} />
        </label>
        <input
          type="submit"
          className="form-submit w-36"
          value={"Skróć ten link!"}
        />
      </form>
    </>
  );
}

export default Messy;
