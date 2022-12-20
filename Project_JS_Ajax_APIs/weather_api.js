let mykey = "e741d10c34e0fdd3f4b0a66db8749a76";
let city = "Taipei";
//let url = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';
// API 要放入 $ 的符號代表query，並\在前後方加入 ` `
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${mykey}`;

async function getWeather(){
    let d = await fetch(url);
    let dj = await d.json();
    console.log(dj);
} 


getWeather()