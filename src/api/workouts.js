const endpoint = import.meta.env.VITE_DATABASE_URL

const getUserWorkouts = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/workouts.json?orderBy="userId"&equalTo="${userId}"`, {
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

const getSingleWorkout = (fbKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/workouts/${fbKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createNewWorkout = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/workouts.json`, {
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

const updateWorkout = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/workouts/${payload.fbKey}.json`, {
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



export { createNewWorkout, updateWorkout, getUserWorkouts, getSingleWorkout }