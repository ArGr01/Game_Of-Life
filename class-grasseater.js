class GrassEater {
    constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
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

    mul(){
        var newCell = random(this.chooseCell(0));
        if(newCell){
            var newEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newEater);
            matrix[newCell[1]][newCell[0]] = 2;
        }
    }

    move(){
        var newCell = random(this.chooseCell(0));
        if(newCell){
            matrix[newCell[1]][newCell[0]] = 2;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0]; 
        }
    }

    eat(){
        var newCell = random(this.chooseCell(1));
        if(newCell){
            matrix[newCell[1]][newCell[0]] = 2;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0];
            this.multiply++;
            this.energy++;
            for (var i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if(this.multiply >= 5){ 
                this.mul();
                this.multiply = 0;  
            }    
        }

        else{
            this.move();
            this.energy--;
            if(this.energy<=0){
                this.die();
            }
        }
    }

    die(){
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
            }
        }
    }
}