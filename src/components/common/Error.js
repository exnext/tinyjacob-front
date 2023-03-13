import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Error({ error }) {

  if (error !== '')
    return (
      <span className="h-4 w-full text-center text-sm text-red-500"><FontAwesomeIcon icon={faTriangleExclamation} /> {error} <FontAwesomeIcon icon={faTriangleExclamation} /></span>
    );
  else 
    return (
      <span className="h-4 text-sm"></span>
    );      
}
