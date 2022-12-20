let add = document.querySelector("form button");
// 選取button 物件
let section = document.querySelector("section");

add.addEventListener("click",e =>{
    // prevent form from submitted
    e.preventDefault();
    
    //get the input value
    // button 的父元素是 form 
    let form = e.target.parentElement;
    
    // 用這個看form 裡面的 回傳職類別
    //console.log(form.children);
    //先用這個看children的元素，選取後，再配上value 取值
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;

    if (todoText == ""){
        alert("Please Enter some text");
        return;// 目前為止都在執行 add 的 click event ，這邊讓使用return 讓下面的程式碼無法執行
    }

    //創建todo 的 div 準備裝載 每一行需要的元素 (行事曆，月日，完成按鈕，垃圾桶)
    let todo = document.createElement("div");
    todo.classList.add("todo");

    let text = document.createElement("p");
    text.classList.add("todo-text")
    text.innerText = todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoMonth +"/" + todoDate;
    // 加入行事
    todo.appendChild(text);
    // 加入時間
    todo.appendChild(time);

    // section.appendChild(todo);
    
    
    //Create green check and red  trash can
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete")
    //在font awesome 取得的 勾勾
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    //設定這個按鈕的event
    completeButton.addEventListener("click",e =>{
        let todoItem = e.target.parentElement;
        // 有done 的話加進去 沒有的話
        todoItem.classList.toggle("done");
        // 這邊必須在CSS設定 i不會回傳pointer-events: none;，而是只回傳button
        //不然他的target 能會是 i 回傳的parentElement就不是 整個div
        // console.log(e.target.parentElement);
    });

    let trashButton = document.createElement("button");

    trashButton.classList.toggle("trash");
    
    //在font awesome 取得的 垃圾桶
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    trashButton.addEventListener("click",e =>{
        let todoItem = e.target.parentElement;
        // 直接刪除
        // todoItem.remove();
        //不直接刪除的話，等待動畫執行完畢 再行刪除
        todoItem.addEventListener("animationend",() => { 
            //remove from local storage
            let text = todoItem.children[0].innerText;
            let listremove = JSON.parse(localStorage.getItem("list"));
            listremove.forEach((item,index) =>{
                if(item["todoText"] === text){
                    listremove.splice(index, 1); // 2nd parameter means remove one item only
                    localStorage.setItem("list",JSON.stringify(listremove))
                    }
            });
            todoItem.remove();
        })
        todoItem.style.animation = "scaleDOWN 0.3s forwards";
    });
    
    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    todo.style.animation = "scaleUP 0.3s forwards";

    // store data in array
    //create an object

    let mytodolist = {
        todoText:todoText,
        todoMonth:todoMonth,
        todoDate:todoDate};

    let mylist = localStorage.getItem("list");
    if (mylist == null){
        localStorage.setItem("list", JSON.stringify([mytodolist]))  
    }else{
        let mylistArray = JSON.parse(mylist);
        mylistArray.push(mytodolist);
        localStorage.setItem("list",JSON.stringify(mylistArray))
    }

    console.log(JSON.parse(localStorage.getItem("list")));


    form.children[0].value = "";// clear the input
    section.appendChild(todo);

})


// 一開始讀取的時候 執行讀取程式
function loadData(){
    let mylist = localStorage.getItem("list");
if(mylist != null){
    let mylistArray = JSON.parse(mylist);
    mylistArray.forEach(item =>{

        //create a todo
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerHTML = item.todoText;
        let time = document.createElement("p");
        time.classList.add("todo-time");
        time.innerText = item.todoMonth +"/" + item.todoDate;
        todo.appendChild(text);
        todo.appendChild(time);


        //button 的設定
        let completeButton = document.createElement("button");
        completeButton.classList.add("complete")
        //在font awesome 取得的 勾勾
        completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        //設定這個按鈕的event
        completeButton.addEventListener("click",e =>{
            let todoItem = e.target.parentElement;
            todoItem.classList.toggle("done");
        });
    
        let trashButton = document.createElement("button");
    
        trashButton.classList.toggle("trash");
        trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        trashButton.addEventListener("click",e =>{
            let todoItem = e.target.parentElement;
            todoItem.style.animation = "scaleDOWN 0.3s forwards";
            todoItem.addEventListener("animationend",() => { 
                //remove from local storage
                let text = todoItem.children[0].innerText;
                let listremove = JSON.parse(localStorage.getItem("list"));
                listremove.forEach((item,index) =>{
                    if(item["todoText"] == text){
                        listremove.splice(index, 1); // 2nd parameter means remove one item only
                        localStorage.setItem("list",JSON.stringify(listremove))
                        }
                });

                todoItem.remove();
            })
            
        });
        todo.appendChild(completeButton);
        todo.appendChild(trashButton);
        todo.style.animation = "scaleUP 0.3s forwards";

        section.appendChild(todo);
    })
}

}
//登入時讀資料
loadData();








// merge sorting 的演算法
function mergeTime(arr1, arr2){
    let result = [];
    let i = 0;
    let j = 0;

    while(i < arr1.length && j < arr2.length){
        if(Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)){
            result.push(arr2[j]);
            j++
        }else if(Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)){
            result.push(arr1[i]);
            i++;
        }else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)){
            if(Number(arr1[i].todoDate) > Number(arr2[j].todoDate)){
                result.push(arr2[j]);
                j++;
            }else{
                result.push(arr1[i]);
                i++;
            }
                

        }
    }

    while (i < arr1.length){
        result.push(arr1[i]);
        i++;
    }
    while (j <arr2.length){
        result.push(arr2[j]);
        j++
    }
    return result;
}

function mergeSort(arr){
    if(arr.length === 1){
        return arr;
    }else{
        let middle = Math.floor(arr.length/2);
        let right = arr.slice(0,middle);
        let left = arr.slice(middle, arr.length);
        return mergeTime(mergeSort(right), mergeSort(left));// 遞迴演算法
    }
}


// console.log(mergeSort(JSON.parse(localStorage.getItem("list"))));


let sssort = document.querySelector("div.sort button.sssort");
sssort.addEventListener("click", ()=>{
    let myTodoList = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list",JSON.stringify(myTodoList));

    //remove data
    let len = section.children.length;
    for (let i =0; i <len; i++){
        section.children[0].remove();
    }

    //load data
    loadData();

})


let desort = document.querySelector("div.sort button.desort");
desort.addEventListener("click", ()=>{
    let myTodoList = mergeSort(JSON.parse(localStorage.getItem("list")));
    myTodoList.reverse();
    localStorage.setItem("list",JSON.stringify(myTodoList));

    //remove data
    let len = section.children.length;
    for (let i =0; i <len; i++){
        section.children[0].remove();
    }

    //load data
    loadData();

})