import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardText, CardBody, CardTitle,
} from 'reactstrap';

class BoardsCard extends Component {
  render() {
    const { board, removeBoard } = this.props;
    return (
      <div className="w-50">
      <Card>
        <CardBody>
          <CardTitle tag="h5">{board.name}</CardTitle>
        </CardBody>
        <img src={board.imageUrl} alt="" />
        <CardBody>
          <CardText>{board.description}</CardText>
          <Link className='btn btn-primary' to={`/boards/${board.firebaseKey}`}>
              View Pins
            </Link>
            <button className='btn btn-danger' id={board.firebaseKey} onClick={(e) => removeBoard(e)}>Delete Board</button>
        </CardBody>
      </Card>
    </div>
    );
  }
}

export default BoardsCard;
