import axios from "axios";

const api = axios.create({
  baseURL: "https://inspiration-v2-backend.herokuapp.com"
});

api.interceptors.request.use(
  (request) => {
    // Add auth token to the authorization header
    request.headers.authorization = `Bearer ${localStorage.getItem("inspiration_v2_auth_token")}`;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  undefined, // Do nothing if no error in response
  async (error) => {
    if (error.response.status === 401) {
      // Auth was token invalid, so use refresh token to get new auth token.

      let newAuthTokenResponse;
      try {
        // Get new auth token
        newAuthTokenResponse = await axios.post(
          `${api.defaults.baseURL}/refresh`,
          undefined,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("inspiration_v2_refresh_token")}`
            }
          }
        );
      } catch (err) {
        // Refresh token was invalid. User must log in again.
        return Promise.reject(err);
      }

      // Store new auth token in local storage
      localStorage.setItem("inspiration_v2_auth_token", newAuthTokenResponse.data);

      // Use new auth token
      error.config.headers.authorization = `Bearer ${localStorage.getItem("inspiration_v2_auth_token")}`;

      // Re-send request
      return axios.request(error.config);
    } else {
      // Error not from auth token
      return Promise.reject(error);
    }
  }
);

export default api;
