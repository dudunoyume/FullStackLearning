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



// async await try catch
// 讓 promise 的同步程式碼，變為同步

async function showMovie(){
    try{
        const obj = await getData("Wilson");
        const movie = await getMovies(obj.age);
        console.log(movie.text);
    }catch(e){
        console.log(e);
    }
}

showMovie();