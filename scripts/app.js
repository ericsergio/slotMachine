class Orientation {
    constructor(id) {    
        this.id = id;
    }
};

const getOrientation = () => {
    return window.innerHeight / window.innerWidth > 1 ? 0 : 1
};


class Sequence {
    constructor(percent, symbol, multipliers, symbolArr, symbolArrLength, paylines, imageFileNames, payLineCounts, currentWinLineCounts, winningPayLines, winningSymbol) {
        //this.percent = percent || [.14, .14, .11, .11, .11, .11, .11, .05, .05, .04];
        this.percent = percent || [.15, .15,  .1,  .1,  .1,  .1,  .2,  .03, .03, .04];
        this.symbol = symbol || [  '9', '10', 'J', 'Q', 'K', 'A', 'W', 'C', 'G', 'B'];
        this.multipliers = multipliers || [1, 1, 1.1111, 1.1111, 1.1111, 1.1111, 3, 1.5, 1.5, 3]
        this.symbolArr = symbolArr || [];
        this.symbolArrLength = symbolArrLength || 100;
        this.payLines = [[0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [0,6,12,8,4], 
        [10,6,2,8,14], [10,6,12,8,14], [5,11,7,13,9], [0,6,2,8,4], [5,1,7,3,9]];
        this.imageFileNames = ['9.png', '10.png', 'j.png', 'q.png', 'k.png', 'a.png', 'wild.png', 'cherry.png', 'grape.png', 'jackpot.png'];
        this.payLineCounts = []; //all counts including the zeros
        this.currentWinLineCounts = []; //the counts that are not 0
        this.winningPayLines = []; //the arrays of symbols for the paylines
        this.winningSymbol = [];
    }
 }



 class Player {
    constructor(bank, currentWager) {
        this.bank = bank;
        this.currentWager = currentWager || null;
    }
 }

 window.onload = () => {
    Orientation.ScreenOrientation = new Orientation(getOrientation());
    const bets = [45, 90, 135, 270];
    Player.current = new Player(10000, bets[1]);
    let betButtons = $('#betButtons');
    $('#playerBank').text(`$${(Player.current.bank / 100).toFixed(2)}`)
    for(let i in bets) {
        betButtons.append(`<li id = 'wager${bets[i]}'>${bets[i]}</li>`)
    }
    betButtons.children().each(function(){
        $(this).on('click', function() {
            Player.current.currentWager = Number($(this).text());
            console.log(Player.current.currentWager);
            updateWager();
        })
    })
    $('#currentWager').text(Player.current.currentWager);
    $('#spinWinnings').hide();
}

const updateWager = () => {
    $('#currentWager').text(Player.current.currentWager);
}

 const drawPayLines = () => {
    const canvas = document.getElementById("slotCanvas");
    const ctx = canvas.getContext("2d");
    let width = Number($('#grid').css('width').replace('px', ''));
    let height = Number($('#grid').css('height').replace('px', ''));
    let canvasWidth = width;
    let canvasHeight = height;
    
    canvas.style.width = `${canvasWidth - 10}px`;
    canvas.style.height = `${canvasHeight - 10}px`;

    const A1Left = $('#row1 .first').offset().left;
    const B1Left = $('#row1 .second').offset().left;
    const A1Top = $('#row1 .first').offset().top;
    const B1Top = $('#row2 .first').offset().top;
    const A1Width = Number($('#row1 .first').css('width').replace('px', ''));
    const A1Height = Number($('#row1 .first').css('height').replace('px', ''));
    const colSpace = B1Left - A1Left - A1Width;
    const rowSpace = B1Top - A1Top - A1Height;    
    const canvWidth = (A1Width * 5) + (colSpace * 4);
    const canvHeight = (A1Height * 3) + (rowSpace * 2);

    $('#slotCanvas').css({
        'position':`absolute`,
        'top':`${A1Top}`,
        'left':`${A1Left}`,
        'width':`${canvWidth}`,
        'height':`${canvHeight}`
    });
    
    let canvas_height = $('#slotCanvas')[0].height;
    let canvas_width = $('#slotCanvas')[0].width;
    
        
    //[0,1,2,3,4]    
    const row1Line = () => {
        ctx.beginPath();
        ctx.moveTo(`${canvas_width * .1}`,`${canvas_height * .16}`);
        ctx.lineTo(`${canvas_width * .9}`, `${canvas_height * .16}`);
        ctx.strokeStyle = 'rgb(45, 45, 90)';
        ctx.lineWidth = 8;
        ctx.stroke();
    }
    //row1Line();
    
    //[5,6,7,8,9]
        const row2Line = () => {
        ctx.beginPath();
        ctx.moveTo(`${canvas_width * .1}`,`${canvas_height * .5}`);
        ctx.lineTo(`${canvas_width * .9}`, `${canvas_height * .5}`);
        ctx.strokeStyle = 'rgb(145, 245, 90)';
        ctx.lineWidth = 12;
        ctx.stroke();
    }
    //row2Line();
    //[10,11,12,13,14]
    const row3Line = () => {
        ctx.beginPath();
        ctx.moveTo(`${canvas_width * .1}`,`${canvas_height * .832}`);
        ctx.lineTo(`${canvas_width * .9}`, `${canvas_height * .832}`);
        ctx.strokeStyle = 'rgb(255, 45, 19)';
        ctx.lineWidth = 12;
        ctx.stroke();
    }
    //row3Line();
    //[0,6,2,8,4]
    const row1w = () => {
        ctx.beginPath();
        ctx.moveTo(`${canvas_width * .1}`,`${canvas_height * .16}`);
        ctx.lineTo(`${canvas_width * .3}`,`${canvas_height * .5}`);
        ctx.lineTo(`${canvas_width * .5}`,`${canvas_height * .16}`);
        ctx.lineTo(`${canvas_width * .7}`,`${canvas_height * .5}`);
        ctx.lineTo(`${canvas_width * .9}`,`${canvas_height * .16}`);
        ctx.strokeStyle = 'rgb(224, 175, 19)';
        ctx.lineWidth = 8;
        ctx.stroke();
    }
    //row1w();
    //[5,1,7,3,9]
    const row2m = () => {
        ctx.beginPath();
        ctx.moveTo(`${canvas_width * .1}`,`${canvas_height * .5}`);
        ctx.lineTo(`${canvas_width * .3}`,`${canvas_height * .16}`);
        ctx.lineTo(`${canvas_width * .5}`,`${canvas_height * .5}`);
        ctx.lineTo(`${canvas_width * .7}`,`${canvas_height * .16}`);
        ctx.lineTo(`${canvas_width * .9}`,`${canvas_height * .5}`);
        ctx.strokeStyle = 'rgb(04, 255, 49)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //row2m();
    //[5,11,7,13,9]
    const row2w = () => {
        ctx.beginPath();
        ctx.moveTo(`${canvas_width * .1}`,`${canvas_height * .5}`);
        ctx.lineTo(`${canvas_width * .3}`,`${canvas_height * .832}`);
        ctx.lineTo(`${canvas_width * .5}`,`${canvas_height * .5}`);
        ctx.lineTo(`${canvas_width * .7}`,`${canvas_height * .832}`);
        ctx.lineTo(`${canvas_width * .9}`,`${canvas_height * .5}`);
        ctx.strokeStyle = 'rgb(104, 105, 149)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //row2w();
    //[10,6,12,8,14]
    const row3m = () => {
        ctx.beginPath();
        ctx.moveTo(`${canvas_width * .1}`,`${canvas_height * .832}`);
        ctx.lineTo(`${canvas_width * .3}`,`${canvas_height * .5}`);
        ctx.lineTo(`${canvas_width * .5}`,`${canvas_height * .832}`);
        ctx.lineTo(`${canvas_width * .7}`,`${canvas_height * .5}`);
        ctx.lineTo(`${canvas_width * .9}`,`${canvas_height * .832}`);
        ctx.strokeStyle = 'rgb(10, 205, 49)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //row3m();
    //[10,6,2,8,14]
    const row3A = () => {
        ctx.beginPath();
        ctx.moveTo(`${canvas_width * .1}`,`${canvas_height * .832}`);
        ctx.lineTo(`${canvas_width * .5}`,`${canvas_height * .16}`);
        ctx.lineTo(`${canvas_width * .9}`,`${canvas_height * .832}`);
        ctx.strokeStyle = 'rgb(109, 120, 226)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //row3A();
    //[0,6,12,8,4]
    const row1V = () => {
        ctx.beginPath();
        ctx.moveTo(`${canvas_width * .1}`,`${canvas_height * .16}`);
        ctx.lineTo(`${canvas_width * .5}`,`${canvas_height * .832}`);
        ctx.lineTo(`${canvas_width * .9}`,`${canvas_height * .16}`);
        ctx.strokeStyle = 'rgb(209, 12, 06)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //row1V();



    let doPayLine = [row1Line, row2Line, row3Line, row1V, row3A, row3m, row2w, row1w, row2m];
    /*const applySpinResults = (amount) => {

    }*/
    for(let i = 0;i < Sequence.newSequence.payLineCounts.length;i++) {
        if(Sequence.newSequence.payLineCounts[i] > 0) {
            let multiplyer = Sequence.newSequence.payLineCounts[i];
            let playerBet = Player.current.currentWager;
            let spinResult = multiplyer * playerBet;
            doPayLine[i]();            
        }
    }
 }

 const clearPayLines = () => {
    const canvas = document.getElementById("slotCanvas");
  
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };


const rndSwap = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

const doBet = () => {
    Player.current.bank -= Player.current.currentWager;
    $('#playerBank').text(`$${(Player.current.bank / 100).toFixed(2)}`);
}

 async function Spin() {
    $('#spinWinnings').hide(300);
    Sequence.newSequence = new Sequence();
    $('#grid ul li').each(function() {
        $(this).text('');
        $(this).css('backgroundImage', 'none');
    });

    clearPayLines();
    for(let i = 0; i < Sequence.newSequence.percent.length; i++) {
        for(let n = 0; n < (Sequence.newSequence.symbolArrLength * Sequence.newSequence.percent[i]);n++) {
            Sequence.newSequence.symbolArr.push(Sequence.newSequence.symbol[i])
        }
    }
    const shuffle = () => {
        for(let i = 0;i < Sequence.newSequence.symbolArr.length;i++) {
            let r = rndSwap(0, 100);
            let current = Sequence.newSequence.symbolArr[i];
            let swap = Sequence.newSequence.symbolArr[r];
            Sequence.newSequence.symbolArr[i] = swap;
            Sequence.newSequence.symbolArr[r] = current;
        }
    }    
    shuffle();
    let arr = Sequence.newSequence.symbolArr;
    let symbolArr = Sequence.newSequence.symbol;
    let imgArr = Sequence.newSequence.imageFileNames;
    let columns = ['.first', '.second', '.third', '.fourth', '.fifth'];
    //outer loop loops through each column, so initially will spin the first character in each row and so on.
    for(let o = 0;o < columns.length; o++ ) {
        //have i decrement by o * 10 to let the spin slow down as each column finishes
        for (let i = 1; i < (columns.length * 10) - (o * 10); i++) {
            let sleepVal;
            o < 3 ? sleepVal = 20 : sleepVal = 20 * o;            
            await sleep(sleepVal);
            $(`#grid ul ${columns[o]}`).each(function() {
                 $(this).text(`${arr[rndSwap(0, 99)]}`).css('color', 'transparent');
                 //swap the invisible text characters with the corresponding background images 
                 $(this).css({
                    'backgroundImage': `url('assets/spinicons/${imgArr[symbolArr.indexOf($(this).text())]}`,
                    'backgroundRepeat': `no-repeat`,
                    'backgroundSize': `100px 100px`
                });
            });
        };
        shuffle();
    }
     doBet();
     for(let i in Sequence.newSequence.payLines) {
        for(let n in Sequence.newSequence.payLines[i]) {
            let idx = Sequence.newSequence.payLines[i][n];
            Sequence.newSequence.payLines[i][n] = $($('#grid ul').children()[idx]).text();
        }
     }
     let obj = Sequence.newSequence.payLines;
     let sym = Sequence.newSequence.symbol;
     for(let i in obj) {
        let count = 0;
        for(let n = 0;n < (obj[i].length - 1);n++) {
            next = n + 1;
            let first = obj[i][0];
            let second = obj[i][1];
            let wild = sym[6];
            let third = obj[i][2];
            if(
                (first === second && first === third) ||
                (first === second && third === wild) ||
                (first === wild && second === third) ||
                (first === wild && second === wild) ||
                (first === wild && third === wild) ||
                (second === wild && first === third) ||                
                (second === wild && third === wild)                
            ) {
                count += 1;
            }
        }
        Sequence.newSequence.payLineCounts.push(count);
     }
     for(let i in Sequence.newSequence.payLineCounts) {
        if(Sequence.newSequence.payLineCounts[i] > 0) {
            Sequence.newSequence.winningPayLines.push(Sequence.newSequence.payLines[i])
            Sequence.newSequence.currentWinLineCounts.push(Sequence.newSequence.payLineCounts[i])
        }
    }
    let winObj = Sequence.newSequence.winningPayLines;    
    for(let i in winObj) {
        for(let n = 0; n < 3;n++) {
            let current = winObj[i][n];
            let wild = sym[6];
            if(current != wild) {
                Sequence.newSequence.winningSymbol.push(current);
                break;
            } else if(current === wild && n === 2) {
                Sequence.newSequence.winningSymbol.push(wild);
                break;
            }
        }
    }
    let winSymbol = Sequence.newSequence.winningSymbol;
    let currWinCount = Sequence.newSequence.currentWinLineCounts;
    for(let i in winObj) {
        for(let n=2;n<5;n++) {
            let current = winObj[i][n];
            let previous = winObj[i][n-1];
            let wild = sym[6];
            if(((current === winSymbol[i]) || (current === wild)) && n === 3) {                
                currWinCount[i] += 2;
            }
            if((n === 4) && ((previous === winSymbol[i]) || (previous === wild)) && ((current === winSymbol[i]) || (current === wild))) {
                currWinCount[i] += 4;
            }            
        }
    }
    let calcWin = Sequence.newSequence.currentWinLineCounts;
    let lineWinnings = 0;
    let spinWinnings = 0;
    let bet = Player.current.currentWager;
    for(let i = 0;i < calcWin.length; i++) {        
        console.log(Sequence.newSequence.winningSymbol[i])
        switch (Sequence.newSequence.winningSymbol[i]) {
            case '9':
                lineWinnings += (bet * (calcWin[i] / 4)) * (calcWin[i] / 4);
                break;
            case '10':
                lineWinnings += (bet * (calcWin[i] / 4)) * (calcWin[i] / 4);
                break;
            case 'J':
                lineWinnings += (bet * (calcWin[i] / 4)) * (calcWin[i] / 2);
                break;
            case 'Q':
                lineWinnings += (bet * (calcWin[i] / 4)) * (calcWin[i] / 2);
                break;
            case 'A':
                lineWinnings += (bet * (calcWin[i] / 4)) * (calcWin[i] / 2);
                break;
            case 'W':
                lineWinnings += (bet * (calcWin[i] / 4)) * (calcWin[i] / 2);
                break;
            case 'C':
                lineWinnings += (bet * (calcWin[i] / 4)) * (calcWin[i] / 2);
                break;
            case 'G':
                lineWinnings += (bet * (calcWin[i] / 4)) * (calcWin[i] / 2);
                break;
            case 'B':
                lineWinnings += (bet * (calcWin[i] / 4)) * calcWin[i] * 2;
                break;
            default:
        }
        spinWinnings += lineWinnings;
    }
    Player.current.bank += spinWinnings;
    if(spinWinnings > 0) {
        $('#spinWinnings').show(300);
        $('#spinWinnings').text((spinWinnings / 100).toFixed(2));
        //$('#spinWinnings').fadeout(5000);
    }
    $('#playerBank').text(`$${(Player.current.bank / 100).toFixed(2)}`);
    /*console.log(`Sequence.newSequence.payLineCounts: ${Sequence.newSequence.payLineCounts}\n 
    Sequence.newSequence.currentWinLineCounts: ${Sequence.newSequence.currentWinLineCounts}\n 
    Sequence.newSequence.winningPayLines: ${Sequence.newSequence.winningPayLines}\n 
    Sequence.newSequence.winningSymbol: ${Sequence.newSequence.winningSymbol}`);*/
    drawPayLines();     
 }
 //Spin();
 

 
