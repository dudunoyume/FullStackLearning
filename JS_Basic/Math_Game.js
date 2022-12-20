let math_game = {
    number : Math.floor(Math.random()*100),
    upper_number: 100,
    lower_number: 0,

    guess(){        
        while(true){
            let guess_number = prompt("請猜數字" + this.lower_number +"~" + this.upper_number);
            guess_number = Number(guess_number);
            if (isNaN(guess_number)){
                alert("給我正確的數字");
                continue;
            } 
            
            if( guess_number == this.number){
                this.lower_number = 0;
                this.upper_number =100;
                alert("Your are right!!");
                break;

            }else if(guess_number <= this.lower_number || guess_number >= this.upper_number){
                alert("please keyin the number within the range");
            }else if(guess_number > this.number && guess_number < this.upper_number){
                this.upper_number = guess_number;
            }
            else if(guess_number < this.number && guess_number > this.lower_number){
                this.lower_number = guess_number;
            }
            else{

            }

        } 
    }

}


math_game.guess();
