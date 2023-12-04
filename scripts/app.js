class Sequence {
    constructor(percent, symbol, multipliers, symbolArr, symbolArrLength, paylines, payLineCounts, currentWinLineCounts, winningPayLines, winningSymbol) {
        //this.percent = percent || [.14, .14, .11, .11, .11, .11, .11, .05, .05, .04];
        this.percent = percent || [.15, .15,  .1,  .1,  .1,  .1,  .2,  .03, .03, .04];
        this.symbol = symbol || [  '9', '10', 'J', 'Q', 'K', 'A', 'W', 'C', 'G', 'B'];
        this.multipliers = multipliers || [1, 1, 1.1111, 1.1111, 1.1111, 1.1111, 3, 1.5, 1.5, 3]
        this.symbolArr = symbolArr || [];
        this.symbolArrLength = symbolArrLength || 100;
        this.payLines = [[0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [0,6,12,8,4], 
        [10,6,2,8,14], [10,6,12,8,14], [5,11,7,13,9], [0,6,2,8,4], [5,1,7,3,9]];
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
    
    // Set display size (css pixels).
    const size = 280;
    canvas.style.width = `${size + 260}px`;
    canvas.style.height = `${size}px`;
    
    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = Math.floor(size * scale);
    canvas.height = Math.floor(size * scale);
    
    // Normalize coordinate system to use CSS pixels.
    ctx.scale(scale, scale);

    const x = size / 2;
    const y = size / 2;

    //[0,1,2,3,4]
    const row1Line = () => {
        ctx.beginPath();
        ctx.moveTo(25,25);
        ctx.lineTo(265, 25);
        ctx.strokeStyle = 'rgb(45, 45, 90)';
        ctx.lineWidth = 12;
        ctx.stroke();
    }
    //[5,6,7,8,9]
        const row2Line = () => {
        ctx.beginPath();
        ctx.moveTo(25,125);
        ctx.lineTo(265, 125);        
        ctx.strokeStyle = 'rgb(145, 245, 90)';
        ctx.lineWidth = 12;
        ctx.stroke();
    }
    //[10,11,12,13,14]
    const row3Line = () => {
        ctx.beginPath();
        ctx.moveTo(25,225);
        ctx.lineTo(265, 225);        
        ctx.strokeStyle = 'rgb(255, 45, 19)';
        ctx.lineWidth = 12;
        ctx.stroke();
    }
    //[0,6,2,8,4]
    const row1w = () => {
        ctx.beginPath();
        ctx.moveTo(25,25);
        ctx.lineTo(85, 125);
        ctx.lineTo(145, 25);
        ctx.lineTo(205, 125);
        ctx.lineTo(265, 25);
        ctx.strokeStyle = 'rgb(224, 175, 19)';
        ctx.lineWidth = 8;
        ctx.stroke();
    }
    //[5,1,7,3,9]
    const row2m = () => {
        ctx.beginPath();
        ctx.moveTo(25,125);
        ctx.lineTo(85, 25);
        ctx.lineTo(145, 125);
        ctx.lineTo(205, 25);
        ctx.lineTo(265, 125);
        ctx.strokeStyle = 'rgb(04, 255, 49)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //[5,11,7,13,9]
    const row2w = () => {
        ctx.beginPath();
        ctx.moveTo(25,125);
        ctx.lineTo(85, 225);
        ctx.lineTo(145, 125);
        ctx.lineTo(205, 225);
        ctx.lineTo(265, 125);
        ctx.strokeStyle = 'rgb(104, 105, 149)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //[10,6,12,8,14]
    const row3m = () => {
        ctx.beginPath();
        ctx.moveTo(25,225);
        ctx.lineTo(85, 125);
        ctx.lineTo(145, 225);
        ctx.lineTo(205, 125);
        ctx.lineTo(265, 225);
        ctx.strokeStyle = 'rgb(10, 205, 49)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //[10,6,2,8,14]
    const row3A = () => {
        ctx.beginPath();
        ctx.moveTo(25,225);    
        ctx.lineTo(145, 25);    
        ctx.lineTo(265, 225);
        ctx.strokeStyle = 'rgb(109, 120, 226)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //[0,6,12,8,4]
    const row1V = () => {
        ctx.beginPath();
        ctx.moveTo(25,25);
        ctx.lineTo(145, 225);    
        ctx.lineTo(265, 25);
        ctx.strokeStyle = 'rgb(209, 12, 06)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    let doPayLine = [row1Line, row2Line, row3Line, row1V, row3A, row3m, row2w, row1w, row2m];
    /*const applySpinResults = (amount) => {

    }*/
    for(let i = 0;i < Sequence.newSequence.payLineCounts.length;i++) {
        if(Sequence.newSequence.payLineCounts[i] > 0) {
            let multiplyer = Sequence.newSequence.payLineCounts[i];
            let playerBet = Player.current.currentWager;
            let spinResult = multiplyer * playerBet;
            //console.log(`${Sequence.newSequence.payLineCounts[i]}`);
            //console.log(`${spinResult}`);
            doPayLine[i]();
            //console.log(Sequence.newSequence.payLines[i])
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
    for (let i = 1; i < rndSwap(0, 99) ; i++) {
       await sleep(70);
       $('#row1 .first').text(`${arr[rndSwap(0, 99)]}`);
       $('#row2 .first').text(`${arr[rndSwap(0, 99)]}`);
       $('#row3 .first').text(`${arr[rndSwap(0, 99)]}`);
    }
    shuffle();
    for (let i = 1; i < rndSwap(0, 99) ; i++) {
        await sleep(80);
        $('#row1 .second').text(`${arr[rndSwap(0, 99)]}`);
        $('#row2 .second').text(`${arr[rndSwap(0, 99)]}`);
        $('#row3 .second').text(`${arr[rndSwap(0, 99)]}`);
     }
     shuffle();
     for (let i = 1; i < rndSwap(0, 99) ; i++) {
        await sleep(90);
        $('#row1 .third').text(`${arr[rndSwap(0, 99)]}`);
        $('#row2 .third').text(`${arr[rndSwap(0, 99)]}`);
        $('#row3 .third').text(`${arr[rndSwap(0, 99)]}`);
     }
     shuffle();
     for (let i = 1; i < rndSwap(0, 99) ; i++) {
        await sleep(150);
        $('#row1 .fourth').text(`${arr[rndSwap(0, 99)]}`);
        $('#row2 .fourth').text(`${arr[rndSwap(0, 99)]}`);
        $('#row3 .fourth').text(`${arr[rndSwap(0, 99)]}`);
     }
     shuffle();
     for (let i = 1; i < rndSwap(0, 99) ; i++) {
        await sleep(200);
        $('#row1 .fifth').text(`${arr[rndSwap(0, 99)]}`);
        $('#row2 .fifth').text(`${arr[rndSwap(0, 99)]}`);
        $('#row3 .fifth').text(`${arr[rndSwap(0, 99)]}`);
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
            let fourth = obj[i][3];
            let fifth = obj[i][4];
            let current = obj[i][n];
            let nxt = obj[i][next];
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
        console.log(`==${calcWin[i]}`);
        console.log(Sequence.newSequence.winningSymbol[i])
        switch (Sequence.newSequence.winningSymbol[i]) {
            case '9':
                lineWinnings += (bet * (calcWin[i] / 4)) * 1;
                break;
            case '10':
                lineWinnings += (bet * (calcWin[i] / 4)) * 1;
                break;
            case 'J':
                lineWinnings += (bet * (calcWin[i] / 4)) * 1.11;
                break;
            case 'Q':
                lineWinnings += (bet * (calcWin[i] / 4)) * 1.11;
                break;
            case 'A':
                lineWinnings += (bet * (calcWin[i] / 4)) * 1.11;
                break;
            case 'W':
                lineWinnings += (bet * (calcWin[i] / 4)) * 3;
                break;
            case 'C':
                lineWinnings += (bet * (calcWin[i] / 4)) * 1.75;
                break;
            case 'G':
                lineWinnings += (bet * (calcWin[i] / 4)) * 1.75;
                break;
            case 'B':
                lineWinnings += (bet * (calcWin[i] / 4)) * 3.75;
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
 Spin();
 

 
