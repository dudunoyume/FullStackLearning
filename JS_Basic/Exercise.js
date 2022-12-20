function printMany(){
    for(let i = 1;i < 101;i++){
        console.log(i);
    }
}
printMany();

function printEvery3(){
    for(let i = 1;i <= 88;i=i+3){
        console.log(i);
    }
}
printEvery3();

function stars(n){
    star = "";
    for(let i =0; i < n;i++){
        star = star + "*";    
    }
    console.log(star);
}
stars(3);
stars(10);

function isUpperCase(str){
    AlphaBeta = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    first_word = str.split("")[0];
    for(let i=0;i < AlphaBeta.length;i++){
        if(first_word == AlphaBeta[i]){
            console.log("true");
            return(true);
        }
        console.log("false");
        return(false);
    }
    
}


function isUpperCase_1(str){
    if(str.length == 0){
        return false;
    }
    return str[0] == str[0].toUppercase();
}

isUpperCase("");

function isAllUpperCase(str){
    AlphaBeta = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    word = str.split("");
    AlphaBeta = AlphaBeta.toLowerCase()

    for(let i=0; i < word.length; i++){
        for(let j=0; j < AlphaBeta.length; j++){
            if( word[i] == AlphaBeta[j]){
                console.log("false");
                return false;
            }

        }
    }
    console.log("true");
    return(true);
}



isAllUpperCase("SDDDDsANJKHBJKGH");


function position(str){
    AlphaBeta = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    a ="";
    posi = str.length;
    AlphaBeta_split = "";
    for(let i =0 ; i < AlphaBeta.length ; i++){
        a = str.split(AlphaBeta[i]);        
        if(a[0].length < posi){
            posi = a[0].length;
            AlphaBeta_split = AlphaBeta[i];
        }        
    }
    if(posi == str.length){
        console.log(-1);
    }else{
        console.log(AlphaBeta_split + " "+ String(posi))
    }


}
position("soooo");

function findSmallCount(arr,int){
    let n = 0;
    for(let i =0; i < arr.length; i++){
        if(int > arr[i]){
            n++;
        }
    }
    console.log(n);
    return(n);

}

findSmallCount([1, 2, 3], 2); // returns 1
findSmallCount([1, 2, 3, 4, 5], 0);



function findSmallerTotal(arr,int){
    n = 0;
    for(let i =0; i < arr.length; i++){
        if(int > arr[i]){
            n = n + arr[i];
        }
    }
    console.log(n);
    return(n);

}

findSmallerTotal([1, 2, 3], 3) // returns 3
findSmallerTotal([1, 2, 3], 1) // returns 0
findSmallerTotal([3, 2, 5, 8, 7], 999) // returns 25
findSmallerTotal([3, 2, 5, 8, 7], 0) // returns 0


function findAllSmall(arr,int){
    let n = [];
    for(let i =0; i < arr.length; i++){
        if(int > arr[i]){
            n.push(arr[i]);
        }
    }
    console.log(n);
    return(n);

}

findAllSmall([1, 2, 3], 10); // returns [1, 2, 3]
findAllSmall([1, 2, 3], 2); // returns [1]
findAllSmall([1, 3, 5, 4, 2], 4); // returns [1, 3, 2]

function sum(arr){
    n = 0;
    for(let i = 0; i < arr.length; i ++){
        n = n + arr[i];
    }
    console.log(n);
    return(n);
}

sum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // returns 55
sum([]); // return 0
sum([-10, -20, -30]); // return -60


function stars1(n){
    sta = "";
    for(let i = 0; i < n;i++){
        sta = sta + "*";
        //console.log(sta);
    }
    return sta;
}

stars1(1);

stars1(4);


function makeStars(t){
    sta = "";
    for(let i = 1; i <= t;i++){
        sta = sta + stars1(i)+"\n";
    }
    console.log(sta);
}

makeStars(1);

makeStars(2);

makeStars(5);


function stars2(n){
    sta = "";
    let sta_arr = [];
    for(let i = 0; i < n;i++){
        sta = sta + "*";
        sta_arr.push(sta);
        console.log(sta_arr[i]);
    }
    j = n;
    while(j > 1){
        console.log(sta_arr[j-2]);
        j--;      
    }

}



stars2(1);

stars2(2);

stars2(3);

stars2(4);

function table(n){
    for(i = 1;i <= 9;i++){
        console.log(String(n)+" x "+ String(i)+" = "+String(n*i))
    }
}
table(3);


function table9to9(){
    for(j = 1;j <=9;j++){
        for(i = 1;i <= 9;i++){
            console.log(String(j)+" x "+ String(i)+" = "+String(j*i));
        }
    }
}

table9to9();


function fib(n){
    a = 0;
    b = 1;
    c = 0;
    for(i =0; i < n; i++){
        a = b;
        b = c;
        c = a+b;
        console.log(a);
        console.log(b);
        console.log(c);
    }
    console.log(c);
}

fib(0);
fib(1); 
fib(2); 
fib(3); 
fib(8);


function reverse(str){
    str_2 = "";
    for(let i = str.length -1 ; i >= 0; i--){
        str_2 = str_2 + str[i];
    }
    console.log(str_2);
}

reverse("abcd"); 
reverse("I am a good guy.");

function swap(str){
    str_2 = str.toLowerCase();
    str_out ="";
    for(let i = 0 ; i < str.length ; i++){
        if(str_2[i] == str[i]){
            str_out = str_out + str_2[i].toUpperCase();
        }else{
            str_out = str_out + str_2[i];
        }

    }
    console.log(str_out);
}

swap("Aloha"); // returns "aLOHA"
swap("Love you.");

function findMin(arr){
    The_Min = arr[0];
    for(let i = 1; i < arr.length; i ++){
        if ( arr[i] < The_Min){
            The_Min = arr[i];
        }
    }
    console.log(The_Min);
    
}


findMin([1, 2, 5, 6, 99, 4, 5]); // returns 1
findMin([]); // returns undefined
findMin([1, 6, 0, 33, 44, 88, -10]); // returns -10


function findNthMin(arr,min_th){
    for(let i = 0; i < arr.length; i++){
        min_th2 = 1;
        for(let j = 0; j < arr.length; j++){  
            if(arr[i] > arr[j]){
                min_th2++;
            }
        }
        if(min_th2 == min_th){
            min_position = i
            //console.log(arr[min_position]);
            return(arr[min_position]);    
        }
    }   
}

findNthMin([1, 2, 3, 4, 5], 1);
findNthMin([1, 3, 5, 7, 9], 3);


function mySort(arr){
    arr_output = [];

    for(let i = 0; i < arr.length; i++){
        a = findNthMin(arr,i+1);
        arr_output.push(a);
        
    }
    console.log(arr_output);
}



mySort([17, 0, -3, 2, 1, 0.5]);


function isPrime(int){
    if(int == 1){
        console.log(false);
        return false
    }
    n = 0;
    for(i = 1; i < int; i++){
        if(int%i == 0){
            n++
        }
        if(n == 2){
            console.log(false);
            return false;
        }
    }
    console.log(true);
    return true;
}


isPrime(1); // returns false
isPrime(5); // returns true
isPrime(91); // returns false
isPrime(1000000);


function confirmEnding(str_1,str_2){
    for(let i = 0; i < str_2.length;i ++){
        if(str_1[str_1.length-1-i] != str_2[str_2.length-1-i]){
            console.log(false);
            return false;
        }
    }
    console.log(true);
    return true;
}
confirmEnding("Bastian", "n"); // true
confirmEnding("Connor", "n"); // false
confirmEnding("Open sesame", "same"); 


function findDuplicate(arr){
    for(let i = 0; i < arr.length;i++){
        n = i +1;
        for(let j = n;j < arr.length;j++){
            if(arr[i]==arr[j]){
                console.log(true);
                return true;
            }
        }
    }
    console.log(false);
    return false
}


findDuplicate([1, 3, 5, 7, 9, 3]); // returns true
findDuplicate([]); // returns false
findDuplicate([3, 4, 5, 6, 7, 10000, 0]); // returns false 

function palindrome(str){
    str = str.toLowerCase();
    for(let i = 0; i < str.length; i ++){
        if(str[i] != str[str.length-1-i]){
            console.log(false);
            return false
        }
    }
    console.log(true);
    return true;
}

palindrome("bearaeb"); // true
palindrome("Whatever revetahw"); // true
palindrome("Aloha, how are you today?"); // false





function pyramid(int){
    star ="";
    space = "";

    for(let i = 0; i < 2*int-1; i++){
        star = star + "*";
        space = space + " ";
    }

    for(let i = 0; i < int; i++){
        new_star = star.slice(int-i-1,int+i);
        new_space = space.slice(i,int-1);

        console.log(new_space+new_star+new_space);
    }
}

pyramid(1);
//*
pyramid(2);
//  *
// ***
pyramid(4);
//    *
//   ***
//  *****
// *******




function inversePyramid(int){
    star ="";
    space = "";

    for(let i = 0; i < 2*int-1; i++){
        star = star + "*";
        space = space + " ";
    }

    for(let i = 0; i < int; i++){
        new_star = star.slice(i,2*int-i-1);
        new_space = space.slice(int-i,int);

        console.log(new_space+new_star+new_space);
    }
}

inversePyramid(4);

function factorPrime(int){
    factor_arr = [];
    j = int
    while(j != 1){
        for(let i = 2; i <j +1; i++){
            if(j%i == 0){
                factor_arr.push(i);
                n = i;
                break
            }           
        
        }
        j = j/n;
    }
    console.log(factor_arr)

}

factorPrime(120)

function intersection(arr_1,arr_2){
    arr_output = [];
    for(let i = 0 ; i<arr_1.length; i++){
        for(let j =0;j<arr_2.length;j++){
            if(arr_1[i] == arr_2[j]){
                arr_output.push(arr_1[i]);
                break;
            }
        }
    }
    console.log(arr_output);
    
}


intersection([1, 3, 4, 6, 10], [5, 11, 4, 3, 100, 144, 0]);

function innner_flatten(element){
    arr = [];
    for(let i =0 ; i < element.length; i++){
        if(typeof(element[i]) == "number"){
            arr.push(element[i]);
        }else{
            next = element[i];
            for(let j =0 ; j < next.length; j++){
                arr.push(next[j]);
            }
        }
                
    }
    return(arr);
}

function flatten(arr){
    while(true){
        arr = innner_flatten(arr);
        j = 0;
        //檢查內部是否有矩陣
        for (i =0 ; i < arr.length; i ++){     
            if(typeof(arr[i]) == "object"){
                j++;
                //如果有矩陣就加一
            }
        }
        //如果都沒有就輸出
        if(j == 0)
        {
            console.log(arr);
            return(arr);
        }
    }

}


flatten([1, [[], 2, [0, [1]], [3]], [1, 3, [3], [4, [1]], [2]]]);


// oooo = [1];
// console.log(isNaN(Number(oooo)));


//ooo = [];
//console.log(typeof(ooo[0]));

