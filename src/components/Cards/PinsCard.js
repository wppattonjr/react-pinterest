import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  Button,
  CardBody,
} from 'reactstrap';

class PinsCard extends Component {
  render() {
    const { pin, removePin } = this.props;
    return (
      <div>
        <Card>
          <CardImg top width='100%' src={pin.imageUrl} alt='Card image cap' />
          <CardBody>
            <CardTitle tag='h5'>{pin.name}</CardTitle>
            <CardText>{pin.description}</CardText>
            <Button
              clsasname='btn btn-danger'
              id={pin.firebaseKey}
              onClick={(e) => removePin(e)}
            >
              Delete Pin
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default PinsCard;
