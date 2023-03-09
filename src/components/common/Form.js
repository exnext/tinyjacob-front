import React, { useState } from "react";
import axios from 'axios';

function LinkInput() {
  const [link, setLink] = React.useState('');
  const [result, setResult] = React.useState('');

  return (
    <div className='container'>
      <label>
        Link:&nbsp;
        <input type="url" name="link" value={link} 
        onChange={(e) => {
          setLink(e.target.value);
        }}
        onBlur={(e) => {
          axios.post('http://localhost:3001/link', {'link': link})
          .then((res) => setResult(res.data));
        }}/>
      </label>
      {result !== '' && <span>Odpowiedź: {result}</span>}
    </div>
  );
}

function RadioInput() {
  const [term, setTerm] = React.useState();
  const terms = ['rok', '24h'];

  return (
    <div className='container'>
      Termin dostępności:
      {terms.map((option) => (
        <label key={option}>
          <input type="radio" name="deadline" value={option} checked={term === option} 
          onChange={(e) => {
            setTerm(e.target.value);
          }}/>
          &nbsp;{option}
        </label>
      ))}
      {term !== undefined && <span>Wynik: {term}</span>}
    </div>
  );
}

function CheckboxInput() {
  const defaultColors = {
    red: false,
    green: false,
    blue: false,
  };
  const translation = {
    red: 'czerwony',
    green: 'zielony',
    blue: 'niebieski',
  };
  const colorsList = Object.keys(defaultColors);
  const [colors, setColors] = React.useState(defaultColors);

  return (
    <div className='container'>
      Kolory w tle:
      {colorsList.map((option) => (
        <label key={option}>
          <input type="checkbox" name="color" value={option} 
          checked={colors[option] === true} 
          onChange={(e) => {
            setColors({
              ...colors,
              [option]: e.target.checked,
            });
          }}/>
          &nbsp;{translation[option]}
        </label>
      ))}
      <span>Wynik: {JSON.stringify(colors)}</span>
    </div>
  );
}

function Form() {
  return (
    <form className='Form'>
        <LinkInput/>
        <RadioInput/>
        <CheckboxInput/>
    </form>
  );
}

export default Form;