/*
Create a script that will calculate the first N prime numbers. done 
N must be received as a command-line argument done
Using ASCII characters create an animated progress bar.
The bar must fill up as work is completed
The current completed percentage must be displayed to the right of the bar. 
Use different colors for the bar’s foreground and background as well as for the numerical indicator on the right
Display the results when done
*/
const functionCheckBar = (max, current)=>{
    // for(let i = 0 ; i<max; i++){
        readline.cursorTo(process.stdout,current,3)
    process.stdout.write("#")
    // }
    // readline.cursorTo(process.stdout,0,3)
    // process.stdout.write("#")

}

const ProgressBar = require("./ProgressBar");

const readline = require("readline")
const Bar = new ProgressBar();
const calculateRangePrimes = (max)=>{
    let resultArr = [];
    let i =2;

    // Bar.init(max);
   while(resultArr.length<max){
    if(isPrime(i)){
            resultArr.push(i)
        // Bar.update(resultArr.length)
       

    }
    functionCheckBar(max, i)
    i++
   }
   console.log(`this is the result of the first ${max} prime numbers`, resultArr)
}
const isPrime=(n)=>{
    if(n<2){
        return false
    }
    for (let i  = 2 ;  i<n;i++){
        if(n%i===0){
            return false
        }
    }
    return true
}

calculateRangePrimes(process.argv[2]|| 1)



// functionCheckBar(10)