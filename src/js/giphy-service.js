export default class GiphyService {
  static async getGiph(query) {
    return fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${process.env.GIPHY_API_KEY}&limit=10`)
      .then(function(response)  {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .catch(function(error)  {
        return Error(error);
      });
  }
}