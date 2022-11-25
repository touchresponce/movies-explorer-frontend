export const baseUrl = "https://api.nomoreparties.co/beatfilm-movies";

export const getMovies = () => {
  return fetch(`${baseUrl}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return checked(res);
  });
};

const checked = (res) => {
  if (res.ok) {
    return Promise.resolve(res.json());
  }
  return Promise.reject(res.status);
};
