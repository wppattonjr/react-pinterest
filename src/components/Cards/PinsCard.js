import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  Button,
  CardBody,
} from 'reactstrap';
import AppModal from '../AppModal';
import PinForm from '../Forms/PinForm';

class PinsCard extends Component {
  render() {
    const { pin, removePin, onUpdate } = this.props;
    return (
      <div>
        <Card>
          <CardImg top width='100%' src={pin.imageUrl} alt='Card image cap' />
          <CardBody>
            <CardTitle tag='h5'>{pin.name}</CardTitle>
            <CardText>{pin.description}</CardText>
            <AppModal title={'Update Pin'} buttonLabel={'Update Pin'}>
              { Object.keys(pin).length && <PinForm pin={pin} onUpdate={onUpdate} />}
            </AppModal>
            <Button
              className='btn btn-danger'
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
