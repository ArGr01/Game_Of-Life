var socket = io();

function setup() {
    var side = 30;
    var matrix = [];
    var getseason;

    socket.on("data",draw);

    function draw(data) {
        matrix = data.matrix;
        getseason = data.sendseason;
        createCanvas(matrix[0].length * side, matrix.length * side)
        background("#acacac");
        noStroke();

        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                
                if (matrix[y][x] == 1) {
                    if(getseason == "spring"){
                        fill("green");
                    }
                    else if(getseason == "winter"){
                        fill("white"); 
                    } 
                }
                else if(matrix[y][x] == 0){
                    fill("#acacac");
                }
                else if(matrix[y][x] == 2){
                    fill("yellow");
                }
                else if(matrix[y][x] == 3){
                    fill("red");
                }
                else if(matrix[y][x] == 4){
                    fill("black");
                }
                else if(matrix[y][x] == 5){
                    fill("#00D4FF");
                }
                else if(matrix[y][x] == 6){
                    fill("#D2F6F8");
                }
             
                rect(x * side, y * side, side, side);
            }
        }
    }
}

function PushGishatich(){
    socket.emit("pushgishatich");
}
function ChangeVorsord(){
    socket.emit("change");
}
function Lighting(){
    socket.emit("light");
}
function KillAngels(){
    socket.emit("killangels");
}