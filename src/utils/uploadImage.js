/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 10:54:57
 * @LastEditTime : 2021-02-28 12:43:47
 * @FilePath     : /src/utils/uploadImage.js
 */
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
              resolve(responseData);
          })
          .catch((err)=> {
              reject(err);
          });
  });
}

export default uploadImage;