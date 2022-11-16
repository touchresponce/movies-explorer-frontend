class MainApi {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  // методы
  _getHeaders() {
    const jwt = localStorage.getItem("jwt");
    return {
      Authorization: `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then(this._getResponce);
  }

  // проверка ответа
  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const mainApi = new MainApi({
  baseUrl: "https://bitfilms.touchresponce.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
