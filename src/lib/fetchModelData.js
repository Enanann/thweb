/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 * @param {Promise}
 */
// function fetchModel(url) {
//   const models = null;
//   return models;
// }

// export default fetchModel;

import models from "../modelData/models";

async function fetchModel(url) {
  if (url === "/test/info") {
    return models.schemaInfo();
  } 
  
  if (url === "/user/list") {
    return models.userListModel();
  } 
  
  if (url.startsWith("/user/")) {
    const id = url.split("/")[2]; 
    return models.userModel(id);
  } 
  
  if (url.startsWith("/photosOfUser/")) {
    const id = url.split("/")[2]; 
    return models.photoOfUserModel(id);
  } 
  
  throw new Error("404 Not Found: Url does not exist!");
}

export default fetchModel;