import axios from 'axios';
import boardData from './boardData';

const baseUrl = 'https://react-pinterest-30781.firebaseio.com';

const getAPin = (pinId) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pins/${pinId}.json`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const getAllPins = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pins.json`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const createPin = (data) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/pins.json`, data)
    .then((response) => {
      axios
        .patch(`${baseUrl}/pins/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(resolve);
    })
    .catch((error) => reject(error));
});

const pinToBoard = (pinBoardsObj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/pins-boards.json`, pinBoardsObj)
    .then((response) => {
      axios
        .patch(`${baseUrl}/pins-boards/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(resolve);
    })
    .catch((error) => reject(error));
});

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const getAllUserPins = (userId) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pins.json?orderBy="userId"&equalTo="${userId}"`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const updatePin = (object) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseUrl}/pins/${object.firebaseKey}.json`, object)
    .then((response) => {
      resolve(response);
    }).catch((error) => reject(error));
});

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const getOnlyPublicPins = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pins.json?orderBy="private"&equalTo="public"`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch((error) => reject(error));
});

const deletePinsBoards = (pinId) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pins-boards.json?orderBy="pinId"&equalTo="${pinId}"`)
    .then((response) => {
      const arrayForResponse = Object.values(response);
      arrayForResponse.forEach((responseArray) => {
        const pinsBoardsIdsArray = Object.keys(responseArray);
        pinsBoardsIdsArray.forEach((id) => {
          boardData.deletePinsBoards(id);
        });
      });
    });
});

export default {
  getBoardPins,
  getAPin,
  getAllPins,
  getAllUserPins,
  createPin,
  updatePin,
  pinToBoard,
  deletePin,
  getOnlyPublicPins,
  deletePinsBoards,
};
