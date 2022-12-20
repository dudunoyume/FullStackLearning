// let example = new Promise((resolve, reject) => {
//   reject(new Error("not allowed"));
// });

// example
//   .then((d) => {
//     console.log(d);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

function getData(name) {
  if (name == "Wilson") {
    return new Promise((resolve, reject) => {
      resolve({
        name: "Wilson Ren",
        age: Math.floor(Math.random() * 30),
        major: "CS",
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Not allowed to acess data."));
      }, 2000);
    });
  }
}

function getMovies(age) {
  if (age < 12) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ text: "cartoon movies" });
      }, 1500);
    });
  } else if (age < 18) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ text: "teen movies" });
      }, 1500);
    });
  } else if (age > 18) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("porn movies"));
      }, 1500);
    });
  }
}

// 會return 一個 promise
getData("Wilson")
  .then((obj) => {
    console.log(obj);
    return getMovies(obj.age);
  })
  .then((meg) => {
    console.log(meg.text);
  })
  .catch((e) => {
    console.log(e);
    //這個catch 可以抓到先出錯的那個，並把error的訊息提共出來
  });
