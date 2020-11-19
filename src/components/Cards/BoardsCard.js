import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BoardsCard extends Component {
  render() {
    const { board, removeBoard } = this.props;
    return (
        <div className='card m-2'>
          <img className='card-img-top' src={board.imageUrl} alt='Board Img' />
          <div className='card-body'>
            <h5 className='card-title'>{board.name}</h5>
            <p className='card-text'>
              {board.description}
            </p>
            <Link className='btn btn-primary' to={`/boards/${board.firebaseKey}`}>
              View Pins
            </Link>
            <button className='btn btn-danger' id={board.firebaseKey} onClick={(e) => removeBoard(e)}>Delete Board</button>
          </div>
        </div>
    );
  }
}

export default BoardsCard;
