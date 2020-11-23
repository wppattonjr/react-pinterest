import React, { Component } from 'react';
import firebase from 'firebase/app';
import getUser from '../../helpers/data/authData';
import pinData from '../../helpers/data/pinData';

export default class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebaseKey || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    userId: this.props.pin?.userId || '',
    description: this.props.pin?.description || '',
    websiteUrl: this.props.pin?.websiteUrl || '',
    private: this.props.pin?.private || false,
  };

  componentDidMount() {
    const userId = getUser();
    this.setState({ userId });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imageUrl: '' });

      const storageRef = firebase.starage().ref();
      const imageRef = storageRef.child(`pinterest/${this.state.userID}/${Date.now()}${e.target.files[0].name}`);

      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imageUrl) => {
          this.setState({ imageUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.firebaseKey === '') {
      pinData.createPin(this.state).then(() => {
        this.props.onUpdate?.();
        this.setState({ success: true });
      });
    } else {
      pinData.updatePin(this.state)
        .then(() => {
          this.props.onUpdate?.(this.props.pin.firebaseKey);
          this.setState({ success: true });
        });
    }
  };

  render() {
    const { success } = this.state;
    return (
      <div>
      { success && (<div className="alert alert-success" role="alert">Your Pin has been Created/Updated!</div>)}
      <form onSubmit={this.handleSubmit}>
        <h1>Pin Form</h1>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='Pin Name'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='url'
          name='websiteUrl'
          value={this.state.websiteUrl}
          onChange={this.handleChange}
          placeholder='Enter the websiteUrl for this pin'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          placeholder='Board Description'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='url'
          name='imageUrl'
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder='Enter an Image URL or Upload a File'
          className='form-control form-control-lg m-1'
          required
        />
        {/* <div className='form-group'>
          <label>Please Select A Board</label>
          <select className='form-control' id='board-selection' name='private' value='' onChange={this.handleChange}>
          </select>
        </div> */}
        <div className='form-group'>
          <label>Please Select Public or Private</label>
          <select className='form-control' id='private' name='private' value={this.state.private} onChange={this.handleChange}>
            <option>public</option>
            <option>private</option>
          </select>
        </div>
        <input
          className='m-2'
          type='file'
          id='myFile'
          name='filename'
          accept='image/*'
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
      </div>
    );
  }
}
