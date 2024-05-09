const endpoint = import.meta.env.VITE_DATABASE_URL

const getUserSessions = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sessions.json?orderBy="userId"&equalTo="${userId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleSession = (fbKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/sessions/${fbKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createSession = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sessions.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateSession = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sessions/${payload.fbKey}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });



export { createSession, updateSession, getUserSessions, getSingleSession }