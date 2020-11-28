import axios from 'axios';

const baseUrl = 'https://react-pinterest-30781.firebaseio.com';

const addAPinToBoard = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseUrl}/pin-boards.json`, obj).then((response) => {
      axios.patch(`${baseUrl}/pin-boards/${response.data.name}.json`, { firebaseKey: response.data.name })
        .then((patchTheResponse) => {
          resolve(patchTheResponse);
        }).catch((error) => reject(error));
    });
});

export default { addAPinToBoard };
