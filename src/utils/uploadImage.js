import {PostRequest} from "../../../utils/request";


function uploadImage(url,params){
  return new Promise(function (resolve, reject) {
      let formData = new FormData();
      for (var key in params){
          formData.append(key, params[key]);
      }
      let file = {uri: params.path, type: 'application/octet-stream', name: 'image.jpg'};
      formData.append("file", file);
      PostRequest(url, {
          headers: {
              'Content-Type': 'multipart/form-data;charset=utf-8',
              "x-access-token": token,
          },
          body: formData,
      }).then((response) => response.json())
          .then((responseData)=> {
              console.log('uploadImage', responseData);
              resolve(responseData);
          })
          .catch((err)=> {
              console.log('err', err);
              reject(err);
          });
  });
}

export default uploadImage;