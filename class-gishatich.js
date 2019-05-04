class Gishatich{
    constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.multiply = 0;
        this.directions = [];
    }

    getNewCoordinates(){
        this.directions = [
        [this.x - 1, this.y - 1],
        [this.x    , this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y    ],
        [this.x + 1, this.y    ],
        [this.x - 1, this.y + 1],
        [this.x    , this.y + 1],
        [this.x + 1, this.y + 1]
        ];
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
        var newCell = random(this.chooseCell(2));
        if(newCell){
            matrix[newCell[1]][newCell[0]] = 3;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0];
            this.multiply++;
            this.energy+=2;
            for (var i in grassEaterArr) {
                if (newCell[0] == grassEaterArr[i].x && newCell[1] == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            if(this.multiply >= 2){
                this.mul();
                this.multiply = 0;
            }    
        }

        else{
            this.move();
            this.energy-=2;
            if(this.energy<=0){
                this.die();
            }
        }
    }

    mul(){
        var newCell = random(this.chooseCell(0));
        if(newCell){
            var newgish = new Gishatich(newCell[0], newCell[1], this.index);
            gishatichArr.push(newgish);
            matrix[newCell[1]][newCell[0]] = 3;
        }
    }

    move(){
        var newCell = random(this.chooseCell(0));
        if(newCell){
            matrix[newCell[1]][newCell[0]] = 3;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0]; 
        }
    }

    die(){
        matrix[this.y][this.x] = 0;
        for (var i in gishatichArr) {
            if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
                gishatichArr.splice(i, 1);
            }
        }
    }
}