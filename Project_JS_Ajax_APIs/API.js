//enpoint, path, query

// function getJoke{
//     let joke = fetch("https://v2.jokeapi.dev/joke/Any");
// }

// 依這個給的資料會是reponse 但不是 資料本身
// fetch 本身是promise 可以串then
// function getJoke(){
//     fetch("https://v2.jokeapi.dev/joke/Any").then((d) =>{
//         console.log(d);        
//     }).catch((e)=>{
//         console.log(e);        
//     });
// }

// getJoke();


async function getJoke(){
    let data = await fetch("https://v2.jokeapi.dev/joke/Any");
    let parseData = await data.json();//將data 化為Json的格式
    console.log(parseData);
}

getJoke();