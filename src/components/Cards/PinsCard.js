import React from 'react';
import { Link } from 'react-router-dom';

export default function PinsCard({ pin }) {
  return (
    <Link className='whole-card' to={`/pins/${pin.firebaseKey}`}>
      <div
        style={{ backgroundImage: `url(${pin.imageUrl})` }}
        className='card board-card m-2'
      >
        <div className='card-body'>
          <h5 className='card-title'>{pin.name}</h5>
          <p className='card-text'>{pin.description}</p>
        </div>
      </div>
    </Link>
  );
}
