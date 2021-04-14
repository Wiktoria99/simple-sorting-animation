const rand = function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

class Bar {
    constructor(canvas, width, height, x, y, nr) {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.nr = nr;

        this.ctx = canvas.getContext('2d');
        this.color = 'gray';
    }
    setGreenColor(){   
        this.color = 'green';
    }
    setRedColor(){
        this.color = 'red';
    }
    drawRed(){ 
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.width, -this.height);
    }
    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, -this.height);
    }
    clear(){
        this.ctx.clearRect(this.x, this.y, this.width, -this.height);
    }
    move(i){
        this.x += i;
    }
}

class BarArray{
    constructor(canvas, barWidth = 19, space = 1){
        this.ctx = canvas.getContext('2d');

        this.barWidth = parseInt(barWidth);
        this.space = space;
        this.canvW = canvas.width;
        this.canvH = canvas.height;
        this.amountOfBars = this.canvW/(this.barWidth+this.space);
        this.typeOfSorting = 0;
        
        this.countSortedBars = 0;
        this.i = 0;
        this.j = 1;
        this.index_1 = 0;
        this.index_2 = 1;

        this.myBars = new Array();
        let x = 0;
        for(let i=0; i<this.amountOfBars; i++){
            let barHeight = rand(5, canvas.height);
            this.myBars[i] = new Bar(canvas, barWidth, barHeight, x, this.canvH, i);

            x += barWidth + space;
        }
        this.drawAll();
    }

    newSetOfBars(canvas){
        let slider = document.getElementById("myRange");
        this.barWidth = parseInt(slider.value);
        this.amountOfBars = parseInt(this.canvW/(this.barWidth + this.space));
        this.myBars.splice(0, this.myBars.length); 
        this.myBars = new Array();

        if(this.typeOfSorting==1){
            this.i = 1;
            this.j = 0;
        }
        else{
            this.i = 0;
            this.j = 1;
        }
        this.countSortedBars = 0;
        this.index_1 = 0;
        this.index_2 = 1;

        let x = 0;
        for(let i=0; i<this.amountOfBars; i++){
            let barHeight = rand(5, canvas.height);
            this.myBars[i] = new Bar(canvas, this.barWidth, barHeight, x, this.canvH, i);
            x += this.barWidth + this.space;
        }
        this.drawAll();
    }

    drawAll(){
        this.ctx.clearRect(0, 0, this.canvW, this.canvH);
        // bubble sort
        if(this.typeOfSorting == 0){
            for(let i=this.amountOfBars-1; i>=this.amountOfBars-this.countSortedBars; i--){
                if(i>=0 && i<this.amountOfBars)
                    this.myBars[i].setGreenColor();
            }
        }
        // insertion sort
        else if(this.typeOfSorting == 1){
            for(let i=0; i<this.countSortedBars; i++)
                this.myBars[i].setGreenColor();
            if(this.j>0 && this.j<this.amountOfBars)
                this.myBars[this.j].setRedColor(); 
        }
        for(let i=0; i<this.amountOfBars; i++){
            this.myBars[i].draw();
        }
    }

    swap(x, y){
        let temp = this.myBars[x].height;
        this.myBars[x].height = this.myBars[y].height;
        this.myBars[y].height = temp;
    }

    stop(){
        cancelAnimationFrame(requestId);
    }

    start(){
        if(this.typeOfSorting == 0)
            requestId = requestAnimationFrame(movingBars);
        else if(this.typeOfSorting == 1)
            requestId = requestAnimationFrame(movingBars_IS);
    }

    ////// BS
    bubbleSort(){
        this.typeOfSorting = 0;
        read('bubbleSortOpis.html');
    }

    prepareToMove(x, y){
        this.myBars[x].drawRed();
        this.myBars[y].drawRed();
    }

    oneMoveOfSorting(){
        this.drawAll();
        if(this.i < this.amountOfBars - 1 && this.j < this.amountOfBars){
            this.index_1 = this.i;
            this.index_2 = this.index_1 + 1;
            this.prepareToMove(this.index_1, this.index_2);
            if(this.myBars[this.index_1].height > this.myBars[this.index_2].height){
                this.swap(this.index_1, this.index_2); 
            }
            this.i += 1;
        }
        if(this.i == this.amountOfBars-this.countSortedBars - 1){
            this.i  = 0;
            this.j += 1;
            this.countSortedBars += 1;
        }
        if(this.j==this.amountOfBars){
            cancelAnimationFrame(requestId);
            this.countSortedBars += 1;
            this.drawAll();
        }
    }

    /////////// IS
    insertionSort(){
        this.typeOfSorting = 1;
        this.i = 1;
        this.j = 0;
        this.countSortedBars = 0;
        read('insertionSortOpis.html');
    }

    oneMoveOfSorting_IS(){
        this.drawAll();
        console.log('i = ' + this.i);
        console.log('j = ' + this.j);

        if(this.j == 1){
            if(this.myBars[0].height > this.myBars[1].height)
                this.swap(0, 1);
            this.i += 1;
        }
        else{
            console.log('else w oneMobe IS');
            while(this.j>=0){
                if(this.myBars[this.j+1].height < this.myBars[this.j].height )
                    this.swap(this.j, this.j+1);
                this.j -= 1;
            }
            this.i += 1;
        }
    }
}

function movingBars(){
    requestId = requestAnimationFrame(movingBars);
    bars.oneMoveOfSorting();
}

// insertion sort
function movingBars_IS(){
    requestId = requestAnimationFrame(movingBars_IS);
    if(bars.i < bars.amountOfBars){ 
        bars.j = bars.i-1;
        bars.countSortedBars += 1;
        bars.oneMoveOfSorting_IS();
    }
    else{
        bars.countSortedBars += 1;
        bars.drawAll();
        bars.stop();
    }
}