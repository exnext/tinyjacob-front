import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function Tiny() {
  const hash = useParams();
  const [elements, setElements] = useState(<></>);
  let timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    if (hash.h === "false") {
      setElements(<h2 className="text-red-500">Błąd połączenia</h2>);
      timer.current = setTimeout(() => {
        window.location.reload()
      }, (10 * 1000));
    } else {
      setElements(
        <>
          <h2 className="font-semibold t">Twój skrócony link to:</h2>
          <Link className="text-blue-700 hover:text-blue-800" to={"/" + hash.h}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />{" "}
            <span className="underline">http://localhost:3000/{hash.h}</span>
          </Link>
        </>
      );
    }
}, [hash.h, timer])

  return (
    <div className="h-2/3 flex flex-col gap-2 justify-center items-center text-2xl">
      {elements}
    </div>
  );
}

export default Tiny;
