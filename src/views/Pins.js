import React from 'react';
import PinsCard from '../components/Cards/PinsCard';
import getUid from '../helpers/data/authData';
import pinData from '../helpers/data/pinData';
import AppModal from '../components/AppModal';
import PinForm from '../components/Forms/PinForm';

export default class Pins extends React.Component {
  state = {
    pins: [],
    loading: true,
  };

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    const userId = getUid();
    pinData.getAllUserPins(userId).then((pins) => this.setState({ pins }));
  }

  removePin = (e) => {
    const removePin = this.state.pins.filter((pin) => pin.firebaseKey !== e.target.id);

    this.setState({
      pins: removePin,
    });

    // getPinInfo = (pinId) => {
    //   pinData.getAPin(pinId).then((response) => {
    //     this.setState({
    //       pin: response,
    //     });
    //   });
    // };

    pinData.deletePin(e.target.id)
      .then(() => {
        this.getPins();
      });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { pins } = this.state;
    const renderPins = () => (
      pins.map((pin) => <PinsCard key={pin.firebaseKey} pin={pin} removePin={this.removePin} />));
    return (
    <>
        <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
          <PinForm onUpdate={this.getPins} />
        </AppModal>
        <div>
          <h2>Here are all pins</h2>
          <div className='d-flex flex-wrap container justify-content-center'>
            {renderPins()}
        </div>
      </div>
      </>
    );
  }
}
