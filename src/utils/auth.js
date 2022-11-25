class Auth {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  // регистрация
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

  // вход
  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then(this._getResponce)
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
        }
        return data;
      });
  }

  // проверка ответа
  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
}

const auth = new Auth({
  baseUrl: "https://bitfilms.touchresponce.nomoredomains.icu",
  // baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
