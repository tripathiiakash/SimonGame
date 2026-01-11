let started= false;
let userSeq= [];
let gameSeq= [];
let lvl= 0;
let highestScore= 0;
let h2= document.querySelector("h2");
let btns = [ 'red', 'green', 'yellow', 'blue'];

document.addEventListener("keypress", function(){
    if(started == false){
        started= true;
        levelUp();
    }
    
});

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    }, 300);
}

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash")
    }, 300);
}

function levelUp(){
    userSeq= [];
    lvl++;
    h2.innerText= `Level ${lvl}`;
    let randIdx= Math.floor(Math.random()* 4);//it will generate btn idxes from 0 to 3
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);//selecting the btn class
    gameFlash(randBtn);
    gameSeq.push(randColor);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
           setTimeout( levelUp, 500);//don't write paranthesis after func bcz assigning ho rhi hai
        }
    } else {
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = 'white';
        }, 300);

        highestScore = max(highestScore, lvl);
        h2.innerHTML= `GAME OVER! Your score was <b>${lvl}</b>.<br>Press any key to Restart.<br>Highest score is ${highestScore}.`;
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute('id')
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns= document.querySelectorAll(".box");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    lvl = 0;
    gameSeq = [];
    userSeq = [];

}

function max(a,b){
    if(a>b)return a;
    else return b;
}