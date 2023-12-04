class Orientation {
    constructor(id) {    
        this.id = id;
    }
};

const getOrientation = () => {
    return window.innerHeight / window.innerWidth > 1 ? 0 : 1
};


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
    // Set display size (css pixels).
    //const size = 280;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    
    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = Math.floor(canvasWidth * scale);
    canvas.height = Math.floor(canvasHeight * scale);
    
    // Normalize coordinate system to use CSS pixels.
    ctx.scale(scale, scale);

    const x = canvasWidth * devicePixelRatio;
    const y = canvasHeight * devicePixelRatio;
    console.log(devicePixelRatio)

    $('#row1 .first').css('border', 'solid orange 2px');
    const A1Margin = $('#row1 .first').offset().top - $('#grid').offset().top;
    const A1LeftMargin = $('#row1 .first').offset().left - $('#grid').offset().left;
    A1HeightDiv2 = (Number($('#row1 .first').css('height').replace('px', '')) / 2);
    A1WidthDiv2 = Number($('#row1 .first').css('width').replace('px', '')) / 2;
    let cWidth = Number($('#slotCanvas').css('width').replace('px', ''))
    //const A1y = $('#row1 .first').offset().top - $('#grid').offset().top;
    //const A1x = $('#row1 .first').offset().left - $('#grid').offset().left;
    
    //[0,1,2,3,4]
    const row1Line = () => {
        ctx.beginPath();
        ctx.moveTo(`${A1WidthDiv2 + A1LeftMargin}`,`${A1HeightDiv2 + (A1Margin * 2)}`);
        ctx.lineTo(`${cWidth - A1WidthDiv2}`, `${A1HeightDiv2 + (A1Margin * 2)}`);
        ctx.strokeStyle = 'rgb(45, 45, 90)';
        ctx.lineWidth = 12;
        ctx.stroke();
    }
    //row1Line();
    
    //[5,6,7,8,9]
        const row2Line = () => {
        ctx.beginPath();
        if(getOrientation() > 0) {
            ctx.moveTo(`${A1WidthDiv2 + A1LeftMargin}`,`${(A1HeightDiv2 * 3) + (A1Margin * 3.5)}`);
            ctx.lineTo(`${cWidth - A1WidthDiv2}`, `${(A1HeightDiv2 * 3) + (A1Margin * 3.5)}`);
        } else {
            ctx.moveTo(`${A1WidthDiv2 + A1LeftMargin}`,`${(A1HeightDiv2 * 3) + (A1Margin * 4)}`);
            ctx.lineTo(`${cWidth - A1WidthDiv2}`, `${(A1HeightDiv2 * 3) + (A1Margin * 4)}`);
        }
        ctx.strokeStyle = 'rgb(145, 245, 90)';
        ctx.lineWidth = 12;
        ctx.stroke();
    }
    //row2Line();
    //[10,11,12,13,14]
    const row3Line = () => {
        ctx.beginPath();
        if(getOrientation() > 0) {
            ctx.moveTo(`${A1WidthDiv2 + A1LeftMargin}`,`${(A1HeightDiv2 * 6) + (A1Margin * 4)}`);
            ctx.lineTo(`${cWidth - A1WidthDiv2}`, `${(A1HeightDiv2 * 6) + (A1Margin * 4)}`);
        } else {
            ctx.moveTo(`${A1WidthDiv2 + A1LeftMargin}`,`${(A1HeightDiv2 * 6) + (A1Margin * 3)}`);
            ctx.lineTo(`${cWidth - A1WidthDiv2}`, `${(A1HeightDiv2 * 6) + (A1Margin * 3)}`);
        }

        ctx.strokeStyle = 'rgb(255, 45, 19)';
        ctx.lineWidth = 12;
        ctx.stroke();
    }
    //row3Line();
    //[0,6,2,8,4]
    const row1w = () => {
        ctx.beginPath();
        ctx.moveTo(`${A1WidthDiv2 + A1LeftMargin}`,`${A1HeightDiv2 + (A1Margin * 2)}`);
        ctx.lineTo(`${(A1WidthDiv2 * 3) + A1LeftMargin * 2}`, `${(A1HeightDiv2 * 3) + (A1Margin * 3.5)}`);
        ctx.lineTo(`${(cWidth / 2) + (A1LeftMargin / 2)}`, `${A1HeightDiv2 + (A1Margin * 2)}`);
        ctx.lineTo(`${((A1WidthDiv2 * 6) + A1LeftMargin * 4.5)}`, `${(A1HeightDiv2 * 3) + (A1Margin * 3.5)}`);
        ctx.lineTo(`${cWidth - A1WidthDiv2}`, `${A1HeightDiv2 + (A1Margin * 2)}`);
        ctx.strokeStyle = 'rgb(224, 175, 19)';
        ctx.lineWidth = 8;
        ctx.stroke();
    }
    //row1w();
    //[5,1,7,3,9]
    const row2m = () => {
        ctx.beginPath();
        ctx.moveTo(`${A1WidthDiv2 + A1LeftMargin}`,`${(A1HeightDiv2 + (A1Margin * 2)) * 2.5}`);
        ctx.lineTo(`${(A1WidthDiv2 * 3) + A1LeftMargin * 2}`, `${A1HeightDiv2 + (A1Margin * 2)}`);
        ctx.lineTo(`${(cWidth / 2) + (A1LeftMargin / 2)}`, `${(A1HeightDiv2 + (A1Margin * 2)) * 2.5}`);
        ctx.lineTo(`${((A1WidthDiv2 * 6) + A1LeftMargin * 4.5)}`, `${A1HeightDiv2 + (A1Margin * 2)}`);
        ctx.lineTo(`${cWidth - A1WidthDiv2}`, `${(A1HeightDiv2 + (A1Margin * 2)) * 2.5}`);
        ctx.strokeStyle = 'rgb(04, 255, 49)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //row2m();
    //[5,11,7,13,9]
    const row2w = () => {
        ctx.beginPath();
        ctx.moveTo(`${A1WidthDiv2 + A1LeftMargin}`,`${(A1HeightDiv2 + (A1Margin * 2)) * 2.5}`);
        ctx.lineTo(`${(A1WidthDiv2 * 3) + A1LeftMargin * 2}`, `${((A1HeightDiv2 * 3) + (A1Margin * 3.5)) * 1.75}`);
        ctx.lineTo(`${(cWidth / 2) + (A1LeftMargin / 2)}`, `${(A1HeightDiv2 + (A1Margin * 2)) * 2.5}`);
        ctx.lineTo(`${((A1WidthDiv2 * 6) + A1LeftMargin * 4.5)}`, `${((A1HeightDiv2 * 3) + (A1Margin * 3.5)) * 1.75}`);
        ctx.lineTo(`${cWidth - A1WidthDiv2}`, `${(A1HeightDiv2 + (A1Margin * 2)) * 2.5}`);
        ctx.strokeStyle = 'rgb(104, 105, 149)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //row2w();
    //[10,6,12,8,14]
    const row3m = () => {
        ctx.beginPath();
        ctx.moveTo(`${A1WidthDiv2 + A1LeftMargin}`,`${(A1HeightDiv2 * 6) + (A1Margin * 4)}`);
        ctx.lineTo(`${(A1WidthDiv2 * 3) + A1LeftMargin * 2}`, `${(A1HeightDiv2 * 3) + (A1Margin * 3.5)}`);
        ctx.lineTo(`${(cWidth / 2) + (A1LeftMargin / 2)}`, `${(A1HeightDiv2 + (A1Margin * 2)) * 4}`);
        ctx.lineTo(`${((A1WidthDiv2 * 6) + A1LeftMargin * 4.5)}`, `${(A1HeightDiv2 * 3) + (A1Margin * 3.5)}`);
        ctx.lineTo(`${cWidth - A1WidthDiv2}`, `${((A1HeightDiv2 * 2.25) + (A1Margin * 2)) * 2.5}`);
        ctx.strokeStyle = 'rgb(10, 205, 49)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //[10,6,2,8,14]
    const row3A = () => {
        ctx.beginPath();
        ctx.moveTo(`${A1WidthDiv2 + A1LeftMargin}`,`${(A1HeightDiv2 * 6) + (A1Margin * 4)}`);
        ctx.lineTo(`${(cWidth / 2) + (A1LeftMargin / 2)}`, `${A1HeightDiv2 + (A1Margin * 2)}`);
        ctx.lineTo(`${cWidth - A1WidthDiv2}`, `${((A1HeightDiv2 * 2.25) + (A1Margin * 2)) * 2.5}`);
        ctx.strokeStyle = 'rgb(109, 120, 226)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //row3A();
    //[0,6,12,8,4]
    const row1V = () => {
        ctx.beginPath();
        ctx.moveTo(`${A1WidthDiv2 + A1LeftMargin}`,`${A1HeightDiv2 + (A1Margin * 2)}`);
        ctx.lineTo(`${(cWidth / 2) + (A1LeftMargin / 2)}`, `${(A1HeightDiv2 + (A1Margin * 2)) * 4}`);
        ctx.lineTo(`${cWidth - A1WidthDiv2}`, `${A1HeightDiv2 + (A1Margin * 2)}`);
        ctx.strokeStyle = 'rgb(209, 12, 06)';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
    //row1V();

    //row1Line();
    //row2Line();
    //row3Line();
    //row1V();
    //row3A();
    //row3m();
    //row2w();
    //row1w();
    //row2m();

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
 

 
