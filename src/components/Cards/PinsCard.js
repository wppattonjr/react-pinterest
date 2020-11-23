import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  Button,
  CardBody,
} from 'reactstrap';
import pinData from '../../helpers/data/pinData';
import getUid from '../../helpers/data/authData';
import AppModal from '../AppModal';
import PinForm from '../Forms/PinForm';

class PinsCard extends Component {
  state = {
    pins: [],
  };

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    const userId = getUid();
    pinData.getAllUserPins(userId).then((pins) => this.setState({ pins }));
  };

  getPinInfo = (pinId) => {
    pinData.getAPin(pinId).then((response) => {
      this.setState({
        pin: response,
      });
    });
  }

  removePin = (e) => {
    const removePin = this.state.pins.filter(
      (pin) => pin.firebaseKey !== e.target.id,
    );

    this.setState({
      pins: removePin,
    });

    pinData.deletePin(e.target.id).then(() => {
      this.getPins();
    });
  };

  render() {
    const { pin, removePin } = this.props;
    return (
      <div>
        <Card>
          <CardImg top width='100%' src={pin.imageUrl} alt='Card image cap' />
          <CardBody>
            <CardTitle tag='h5'>{pin.name}</CardTitle>
            <CardText>{pin.description}</CardText>
            <AppModal title={'Update Pin'} buttonLabel={'Update Pin'}>
              { Object.keys(pin).length && <PinForm pin={pin} onUpdate={this.getPinInfo} />}
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
