import React from 'react';
import pinData from '../helpers/data/pinData';
import boardData from '../helpers/data/boardData';
import PinsCard from '../components/Cards/PinsCard';
import BoardForm from '../components/Forms/BoardForm';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/AppModal';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    const boardId = this.props.match.params.id;

    boardData.getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });

    this.getPins(boardId).then((response) => (
      this.setState({ pins: response })
    ));
  }

  getBoardInfo = (boardId) => {
    boardData.getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });
  }

    getPins = (boardId) => (
      pinData.getBoardPins(boardId).then((response) => {
        const pinArray = [];
        response.forEach((item) => {
          pinArray.push(pinData.getAPin(item.pinId));
        });
        return Promise.all([...pinArray]);
      })
    )

    render() {
      const { pins, board } = this.state;
      const renderPins = () => (
        pins.map((pin) => (
          <PinsCard key={pin.firebaseKey} pin={pin} />
        ))
      );
      return (
      <div>
        <AppModal title={'Update Board'} buttonLabel={'Update Board'}>
        { Object.keys(board).length && <BoardForm board={board} onUpdate={this.getBoardInfo} />}
        </AppModal>
        <AppModal title={'Add A Pin'} buttonLabel={'Add A Pin'}><PinForm boardId={this.props.match.params.id} onUpdate={this.getPins}/> </AppModal>
        <h1>{board.name}</h1>
        <div className='d-flex flex-wrap container'>{renderPins()}</div>
      </div>
      );
    }
}
