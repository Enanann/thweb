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

// import models from "../modelData/models";

async function fetchModel(url) {
  const backend = `https://3dr9ls-8081.csb.app/api${url}`;

  try {
    const response = await fetch(backend);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch từ server:", error);
    throw error;
  }
}

export default fetchModel;
