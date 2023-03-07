import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function NameProbGet ({ url }) {
  const [response, setResponse] = useState('');

  useEffect(() => {
    (function () {
      return fetch(url)
            .then((res) => res.text())
            .then((data) => setResponse(data));
    })()
  }, [url])

  return (
    <div>
      Get i Fetch:<br/>
      {response}
    </div>
  );
}

function NameProbAxiosGet ({ url }) {
  const [response, setResponse] = useState('');

  useEffect(() => {
    (function () {
      return axios.get(url)
            .then(res => setResponse(res.data))
    })()
  }, [url])

  return (
    <p>
      Post i Fetch:<br/>
      {response}
    </p>
  );
}

function NameProbPost ({ url, name }) {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const nameObj = {name: name};
    
    (function () {
      return fetch(url, {
        method: 'POST',
        //mode: 'cors',
        cache: 'no-cache',
        //credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        //redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(nameObj),
      })
        .then(res => res.text())
        .then(data => setResponse(data));
    })()
  }, [url, name])

  return (
    <div>
      Get i Axios:<br/>
      {response}
    </div>
  );
}

function NameProbAxiosPost ({ url, name }) {
  const [response, setResponse] = useState('');

  useEffect(() => {
    (function () {
      return axios.post(url, {name: name})
            .then(res => setResponse(res.data))
    })()
  }, [url, name])

  return (
    <p>
      Post i Axios:<br/>
      {response}
    </p>
  );
}

function App() {
  return (
    <>
    <NameProbGet url={"http://localhost:3001/name-probability/Jakub"}/>
		<NameProbAxiosGet url={"http://localhost:3001/name-probability/Axios"}/>
		<br/>
    <NameProbPost url={"http://localhost:3001/name-probability"} name={"Jakub"}/>
    <NameProbAxiosPost url={"http://localhost:3001/name-probability"} name={"Axios"}/>
    </>
  );
}

export default App;
