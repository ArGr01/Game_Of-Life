var LivingCreature = require("./super-class");
var random = require("./random");

module.exports = class Angel extends LivingCreature{
    constructor(x,y,index) {
        super(x,y,index);
        this.energy = 15;
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
        return super.chooseCell(character);
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