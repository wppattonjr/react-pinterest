import React, { Component } from 'react';
import firebase from 'firebase/app';
import getUser from '../../helpers/data/authData';
import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';

export default class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebaseKey || '',
    name: this.props.pin?.name || '',
    imageUrl: this.props.pin?.imageUrl || '',
    userId: this.props.pin?.userId || '',
    websiteUrl: this.props.pin?.websiteUrl || '',
    private: this.props.pin?.private || 'private',
    success: false,
    boards: [],
  };

  boardsRef = React.createRef();

  componentDidMount() {
    const userId = getUser();
    this.getBoards(userId).then((response) => {
      this.setState({
        userId,
        boards: response,
      });
    });
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
      const aNewPin = {
        name: this.state.name,
        imageUrl: this.state.imageUrl,
        firebaseKey: this.state.firebaseKey,
        websiteUrl: this.state.websiteUrl,
        userId: this.state.userId,
        private: this.state.private,
      };
      pinData.createPin(aNewPin).then((response) => {
        const pinsToBoard = {
          userId: this.state.userId,
          pinId: response.data.firebaseKey,
          boardId: this.boardsRef.current.value,
        };
        boardData.createPinOnBoard(pinsToBoard);
      }).then(() => {
        this.props.onUpdate?.(this.props.boardId);
        this.setState({
          success: true,
        });
      });
    } else {
      pinData.deletePinsBoards(this.state.firebaseKey);
      const updatedPins = {
        name: this.state.name,
        imageUrl: this.state.imageUrl,
        websiteUrl: this.state.websiteUrl,
        firebaseKey: this.state.firebaseKey,
        userId: this.state.userId,
        private: this.state.private,
      };
      pinData.updatePin(updatedPins).then(() => {
        const updatedPinsBoards = {
          userId: this.state.userId,
          pinId: this.state.firebaseKey,
          boardId: this.boardsRef.current.value,
        };
        boardData.createPinOnBoard(updatedPinsBoards);
        this.props.onUpdate?.(this.props.pin.firebaseKey);
        this.setState({
          success: true,
        });
      });
    }
  };

  getBoards = (uid) => (
    boardData.getAllUserBoards(uid).then((response) => response)
  )

  render() {
    const {
      success,
      name,
      imageUrl,
      websiteUrl,
      boards,
    } = this.state;
    return (
      <div>
      { success && (<div className="alert alert-success" role="alert">Your Pin has been Created/Updated!</div>)}
      <form onSubmit={this.handleSubmit}>
        <h1>Pin Form</h1>
        <input
          type='text'
          name='name'
          value={name}
          onChange={this.handleChange}
          placeholder='Pin Name'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='url'
          name='websiteUrl'
          value={websiteUrl}
          onChange={this.handleChange}
          placeholder='Enter the websiteUrl for this pin'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='url'
          name='imageUrl'
          value={imageUrl}
          onChange={this.handleChange}
          placeholder='Enter an Image URL or Upload a File'
          className='form-control form-control-lg m-1'
          required
        />
        <div className='form-group'>
          <label>Please Select A Board</label>
          <select ref={this.boardsRef} className='form-control'>
            {Object.keys(boards).length && boards.map((board) => (
              <option key={board.firebaseKey} value={board.firebaseKey}>{board.name}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label>Would you like this pin to be public?</label>
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
