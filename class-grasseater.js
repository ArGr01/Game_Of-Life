class GrassEater extends LivingCreature {
    constructor(x,y,index) {
        super(x,y,index);
        this.energy = 5;
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
        return super.chooseCell(character);
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