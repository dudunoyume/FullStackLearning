import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import { createClient } from "pexels";
import Picture from "../components/Picture";

const Homepage = () => {
  const [input, setInput] = useState("");
  const [currentinput,setCurrentInput] = useState("");
  // PIXELS 的 API 金鑰
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);// 設置page的狀態
  const auth = "563492ad6f917000010000018eb8040a2d614ee0aad71f292abca3d1";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentinput}&per_page=15`;
  // 傳統API引用

  // const search = async () => {
  //   const dataFetch = await fetch(intialURL, {
    // 將url提出並作為參數
  const search = async (whichurl) => {
    setPage(2);
    const dataFetch = await fetch(whichurl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
    );

    let parseData = await dataFetch.json();
    setData(parseData.photos);
    
    //先記錄執行search當下的input值
    console.log(parseData);
  };

    // 設定一開始就使用search，fetch data when the page loads up
    useEffect(() => {
      search(initialURL);
    }, []);


  // 官方文件
    const another_search = async (query) => {
    const client = createClient(
      "563492ad6f917000010000018eb8040a2d614ee0aad71f292abca3d1"
    );
    // 如果只要跟上面一樣initial search 的功能
    // let parseData = await client.photos.curated({ per_page: 15 });
    let parseData = await client.photos.search({ query, per_page: 15 })
    setData(parseData.photos);
    console.log(parseData);

    // client.photos.curated({ per_page: 15 }).then(photos => {console.log(photos);});
  };



  // Load more picture

  const morepicture = async () =>{
    let newURL;
    if (currentinput === ""){
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`
    }else{
      newURL =  `https://api.pexels.com/v1/search?query=${currentinput}&per_page=15&page=${page}`
    }
    setPage(page+1);
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(data.concat(parseData.photos))
  }


  useEffect(() => {
    if (currentinput === ""){
      search(initialURL);
    }else{
      search(searchURL);
    }
  },[currentinput]);



  return (
    <div style={{ minHeight: "100vh" }}>
      {/* 傳到Search頁面 */}
      <Search
        search={() => {
          // 利用useEffect 來避免JS closure的問題，就是如果一樣用下面這個然後所有的都使用input，
          // 這邊來用 setCurrentInput(input)，不會馬上更新，這次closure的 currentinput， 還是會刷到前面的設定 (空的)
          setCurrentInput(input);
          // if (input === ""){
          //   search(initialURL);
          // }
          // else{
          //   search(searchURL);
          // }
          
        }}
        another_search={() =>{another_search(input)}}
        setInput={setInput}
      ></Search>
      <div className="pictures">
        {/* 前面加上 data && 是為了避免 一開始 data 是 null */}
        {data &&
          data.map((d) => {
            return <Picture data={d}></Picture>;
          })}
      </div>

      <div className="morePicture">
        <button onClick={morepicture}>Loardmore</button>
      </div>
    </div>
  );
};

export default Homepage;
