class Grass{
    constructor(x, y, index) {
       this.x = x;
       this.y = y;
       this.index = index;
       this.multiply = 0;
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
    
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;  
        }
    }    
}

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

class Angel{
    constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.multiply = 0;
        this.directions = [];
    }

    getNewCoordinates(){
        for(let i=1;i<=matrix.length;i++){
            var a = [this.x-i,this.y-i];
            var b = [this.x+i,this.y+i];
            var c = [this.x-i,this.y+i];
            var d = [this.x+i,this.y-i]; 
            this.directions.push(a);
            this.directions.push(b);
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
        var newCell1 = this.chooseCell(4);
        var newCell2 = this.chooseCell(3);
        var newCell3 = newCell1.concat(newCell2);
        var newCell = random(newCell3);
        if(newCell){
            if(matrix[newCell[1]][newCell[0]] == 4){
                for (var i in vorsordArr) {
                    if (newCell[0] == vorsordArr[i].x && newCell[1] == vorsordArr[i].y) {
                        vorsordArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[newCell[1]][newCell[0]] == 3){
                for (var i in gishatichArr) {
                    if (newCell[0] == gishatichArr[i].x && newCell[1] == gishatichArr[i].y) {
                        gishatichArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[newCell[1]][newCell[0]] = 5;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0];
            this.multiply++;
            this.energy++;
            if(this.multiply >= 7){
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

    mul(){
        var newCell = random(this.chooseCell(0));
        if(newCell){
            var newangel = new Angel(newCell[0], newCell[1], this.index);
            angelArr.push(newangel);
            matrix[newCell[1]][newCell[0]] = 4;
        }
    }

    move(){
        var newCell1 = this.chooseCell(0);
        var newCell2 = this.chooseCell(1);
        var newCell3 = newCell1.concat(newCell2);
        var newCell = random(newCell3);
        if(newCell){
            if(matrix[newCell[1]][[newCell[0]] == 0]){
                matrix[newCell[1]][newCell[0]] = 5;
            }
            else{
                for (var i in grassArr) {
                    if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                matrix[newCell[1]][newCell[0]] = 5;
            }
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0]; 
        }
    }

    die(){
        matrix[this.y][this.x] = 0;
        for (var i in angelArr) {
            if (this.x == angelArr[i].x && this.y == angelArr[i].y) {
                angelArr.splice(i, 1);
            }
        }
    }
}

 

