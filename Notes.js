class Background{ 
    static setOriginal(){
        document.body.classList.add("original");
        document.body.classList.remove("bricks");
        document.body.classList.remove("honeyComb");
        document.body.classList.remove("checkerboard");
        document.body.classList.remove("starrynight");
    }
    static setBricks(){
        document.body.classList.remove("original");
        document.body.classList.add("bricks");
        document.body.classList.remove("honeyComb");
        document.body.classList.remove("checkerboard");
        document.body.classList.remove("starrynight");
    }
    static setHoneyComb(){
        document.body.classList.remove("original");
        document.body.classList.remove("bricks");
        document.body.classList.add("honeyComb");
        document.body.classList.remove("checkerboard");
        document.body.classList.remove("starrynight");
    }
    static setCheckerBoard(){
        document.body.classList.remove("original");
        document.body.classList.remove("bricks");
        document.body.classList.remove("honeyComb");
        document.body.classList.add("checkerboard");
        document.body.classList.remove("starrynight");
    }
    static setStarryNight(){
        document.body.classList.remove("original");
        document.body.classList.remove("bricks");
        document.body.classList.remove("honeyComb");
        document.body.classList.remove("checkerboard");
        document.body.classList.add("starrynight");
    }
}

var count = 0;
var arr = [];
var zindex = 1;


class Note{
    constructor(number){
        this.num = number;
        this.bool = 0;
        this.text = ("<div class = \"container\" id=\"container" + number + "\">" + 
        "<div class = \"note\" id=\"note" + number + "\">" + "<div class=\"handle\" id=\"handle" 
        + number + "\"></div>" +
        "<div class = \"text\" id = \"text" + number + "\">" + 
        "<div tabindex = \"2\" class=\"para\" id = \"page" + number + "\" contenteditable = \"true\"> Insert Text Here</div>" 
        + "</div></div></div>");
    }
    getText(){
        return this.text;
    }
    mouseDown(){
        $("#text"+this.num).select();
        document.getElementById("note"+ this.num).style.zIndex=zindex;
        console.log("YUH");
        zindex++;
    }
    mouseOver(){
        if(this.bool != 1){
            $("#handle"+this.num).append("<button class=\"closeButton\" id = \"closeButton" + this.num + "\">X</button> ");
            this.bool++;
            document.getElementById("closeButton" + this.num).addEventListener("click", event => {
                $( "#note"+this.num).remove();
                $("<style type='text/css'> .Note" + this.num +"{z-index:1;} </style>").remove();
            });
            //can remove note from array if wanted
        }
    }
    mouseOut(){
        if(this.bool == 1){
            document.getElementById("closeButton"+this.num).removeEventListener("click", event => {
                    $( "#note" + this.num).remove();
                    $("<style type='text/css'> .Note" + this.num +"{z-index:1;} </style>").remove();
                });
            $("#closeButton" + this.num).remove();
            this.bool--;
        }
    }
    getNum(){
        return this.num;
    }
}
Background.setOriginal();
document.getElementById("addNote").addEventListener("click", event => {
   arr.push(new Note(count));
   $("#notes").append(arr[count].getText());
    $("#container" + count).draggable({handle:"#handle" + count});

    var num = count;
    $("#note"+num).hover(function(){
        arr[num].mouseOver();
    },function(){
        arr[num].mouseOut();
    });
    let note = document.getElementById("note"+count);
    note.addEventListener("mousedown", event =>{arr[num].mouseDown()});
    
    $("<style type='text/css'> .Note" + count +"{z-index:1;} </style>").appendTo("head");
    $("#note" + count).resizable({
        minHeight:50,minWidth:50
    });
    $("#container" + count).resizable({
        minHeight:50,minWidth:50
    });
    //have to append a new css class for each note in ordr to change the z-index
    //});
    //add handle click
    //get handle z-index, set to zindex + 1
    count++;
});

document.getElementById("clear").addEventListener("click", event => {
    for (let i = 0; i < arr.length; i++) {
        $("#note"+i).remove();   
        $("<style type='text/css'> .Note" + i +"{z-index:1;} </style>").remove();
    }
});
document.getElementById("BG").addEventListener("click", event => {
    document.getElementById("sideBarBG").classList.toggle("active");
    document.getElementById("sidebarFont").classList.remove("active");
});
