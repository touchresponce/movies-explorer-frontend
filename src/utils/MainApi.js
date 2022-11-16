class MainApi {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  // _getHeaders() {
  //   const jwt = localStorage.getItem("jwt");
  //   return {
  //     Authorization: `Bearer ${jwt}`,
  //     ...this._headers,
  //   };
  // }

  // проверка ответа
  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
}

const mainApi = new MainApi({
  // baseUrl: "https://bitfilms.touchresponce.nomoredomains.icu",
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
