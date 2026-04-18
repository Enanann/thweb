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
    // Gọi HTTP GET Request tới Backend
    const response = await fetch(backend);

    // Kiểm tra xem server có trả về lỗi (404, 500...) không
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    // Chuyển đổi dữ liệu thô nhận được thành object JSON
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    // In ra lỗi để dễ debug nếu sập mạng hoặc server chết
    console.error("Lỗi khi fetch từ server:", error);
    throw error;
  }
}

export default fetchModel;
