var socket = io();

function setup() {
    var side = 30;
    var matrix = [];
    var getseason;

    socket.on("data",Draw_Characters);

    function Draw_Characters(data) {
        matrix = data.matrix;
        getseason = data.sendseason;
        createCanvas(matrix[0].length * side, matrix.length * side)
        background("#acacac");
        noStroke();

        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                
                if(matrix[y][x] == 0){
                    fill("#acacac");
                }
                else if (matrix[y][x] == 1) {
                    if(getseason == "spring")
                        fill("green");
                    else if(getseason == "summer")
                        fill("#E7FA03");
                    else if(getseason == "automn")
                        fill("#FF8700"); 
                    else if(getseason == "winter")
                        fill("white");
                } 
                else if(matrix[y][x] == 2){
                    if(getseason == "spring")
                        fill("yellow");
                    else if(getseason == "summer")
                        fill("#F3AB25");
                    else if(getseason == "automn")
                        fill("#ABC623");
                    else if(getseason == "winter")
                        fill("#12AA0A");
                }
                else if(matrix[y][x] == 3){
                    if(getseason == "spring")
                        fill("red");
                    else if(getseason == "summer")
                        fill("#0A39E7");
                    else if(getseason == "automn")
                        fill("#FF0000");
                    else if(getseason == "winter")
                        fill("#FF8F00");
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
                else if(matrix[y][x] == 7){
                    fill("#FF7C00");
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
function Boom(){
    socket.emit("boom");
}