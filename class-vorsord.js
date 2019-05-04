class Vorsord{
    constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.multiply = 0;
        this.directions = [];
    }

    getNewCoordinates(){
        for(let i=1;i<=matrix.length;i++){
            var a = [this.x,this.y-i];
            var b = [this.x,this.y+i]; 
            this.directions.push(a);
            this.directions.push(b);
        }
        for(let j=1;j<=matrix[0].length;j++){
            var c = [this.x-j,this.y];
            var d = [this.x+j,this.y];
            this.directions.push(c);
            this.directions.push(d);
        }
       
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    eat(){
        var newCell = random(this.chooseCell(3));
        if(newCell){
            matrix[newCell[1]][newCell[0]] = 4;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0];
            this.multiply++;
            this.energy+=3;
            for (var i in gishatichArr) {
                if (newCell[0] == gishatichArr[i].x && newCell[1] == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }
            if(this.multiply >= 3){
                this.mul();
                this.multiply = 0;
            }    
        }

        else{
            this.move();
            this.energy-=3;
            if(this.energy<=0){
                this.die();
            }
        }
    }

    mul(){
        var newCell = random(this.chooseCell(0));
        if(newCell){
            var newvorsord = new Vorsord(newCell[0], newCell[1], this.index);
            vorsordArr.push(newvorsord);
            matrix[newCell[1]][newCell[0]] = 4;
        }
    }

    move(){
        var newCell = random(this.chooseCell(0));
        if(newCell){
            matrix[newCell[1]][newCell[0]] = 4;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0]; 
        }
    }

    die(){
        matrix[this.y][this.x] = 0;
        for (var i in vorsordArr) {
            if (this.x == vorsordArr[i].x && this.y == vorsordArr[i].y) {
                vorsordArr.splice(i, 1);
            }
        }
    }
}