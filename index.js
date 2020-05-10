//--- Name: AnimalProgJs/Vesion: 0.0.1a/Authors: AlexanderDV/Description: Main AnimalProgJs .js. ---
var programInfo={
	Name : "AnimalProgJs",
	Version : "0.0.1a",
	Authors : "AlexanderDV"
}
programInfo.title= programInfo.name + " v" + programInfo.version + " by " + programInfo.authors
document.title=programInfo.title
// End of standard initialization ---

function setElementsTextTranslates(lang){
	for(var v in props.msgs[lang||messagesLanguage])
		for(var v2 in document.getElementsByClassName("$"+v+"$"))
			document.getElementsByClassName("$"+v+"$")[v2].innerText=props.msgs[lang||messagesLanguage][v]
}
setElementsTextTranslates()

var canvas={
    masshtab:10
}
var entities={}
function distance(x0,y0,x1,y1){
    return Math.pow(Math.pow(x0-x1,2)+Math.pow(y0-y1,2),0.5)
}
function Entity(name,image,x,y,speed){
    this.image=image
    this.pos={
        x:x,
        y:y
    }
    this.speed=speed
    this.moveAt=function(x,y){
        this.pos.x=x
        this.pos.y=y
        this.image.style.left=this.pos.x+"px"
        this.image.style.bottom=this.pos.y+"px"
    }
    this.move=function(x,y){
        this.pos.x+=x
        this.pos.y+=y
        this.moveAt(this.pos.x,this.pos.y)
    }
    this.performing=[]
    this.moveByTime=function(x,y,type,end){
        var ent=this
        var mbtid=setInterval(function()
        {
            if(end=="all"?allPerforming.length!=0:(end=="cur"?ent.performing.length!=0:false))
                return
            if(type=="add")
            {
                x+=ent.pos.x
                y+=ent.pos.y
            }
            var startX=ent.pos.x
            var startY=ent.pos.y
            var startTime=new Date().getTime()
            console.log(startX,startY,x,y);
            var count=0
            var iv=10
            var dist=distance(x,y,startX,startY)
            var xSpeed=ent.speed*(x-startX)/dist
            var ySpeed=ent.speed*(y-startY)/dist
            var lastX,lastY
            lastX=x-ent.pos.x
            lastY=y-ent.pos.y
            var id=setInterval(function(){
                if((Math.abs(x-ent.pos.x)>1||Math.abs(y-ent.pos.y)>1)&&Math.abs(lastX)>=Math.abs(x-ent.pos.x)&&Math.abs(lastY)>=Math.abs(y-ent.pos.y))
                {
                    lastX=x-ent.pos.x
                    lastY=y-ent.pos.y
                    ent.move(xSpeed/1000*iv*canvas.masshtab,ySpeed/1000*iv*canvas.masshtab)
                }
                else
                {
                    clearInterval(id)
                    for(var v in ent.performing)
                        if(ent.performing[v]==id)
                            ent.performing.splice(v,1)
                    for(var v in allPerforming)
                        if(allPerforming[v]==id)
                            allPerforming.splice(v,1)
                }
            },iv)
            allPerforming.push(id)
            ent.performing.push(id)
            clearInterval(mbtid)
        },100)
    }
    this.distanceTo=function(x,y)
    {
        return distance(this.pos.x,this.pos.y,x,y)
    }
    this.moveAt(x,y)
    entities[name]=this
}
new Entity("dino",dinoDiv,0,0,10)
new Entity("chest",chestDiv,500,500,0)
entities.dino.moveAt(0,0)
var maxTryes=3,maxDst=100
var tryes=0,wins=0
var allPerforming=[]
function setTryes(val){
    tryes=val
    tryesLabel.innerText=tryes+"/"+maxTryes
}
function setWins(val){
    wins=val
    winsLabel.innerText=wins
}
function newGame(){
    setTryes(0)
    setWins(wins)
    entities.chest.moveAt(document.documentElement.clientWidth*Math.random(),document.documentElement.clientHeight*Math.random())
}
var cmds={}
function initSettings(){
    commandsArea.value=storageValue("commandsArea")||'{"двигайся":function(args){entities.dino.moveByTime(Number(args[1]),Number(args[2]),"","cur")}}'
    eval("cmds="+commandsArea.value)
}
initSettings()
setCommandsButton.onclick=function(){
    eval("cmds="+commandsArea.value)
    storageValue("commandsArea",commandsArea.value)
}
var cmdNum=1
var lastCmd
codeArea.onkeydown=function(e){
    if(e.key=="Tab")
    {
        var selectionStart=codeArea.selectionStart
        var selectionEnd=codeArea.selectionEnd
        var cmdsStartFrom=[""]
        var firstPart=codeArea.value.substr(0,selectionStart)
        var secondPart=codeArea.value.substr(selectionStart)
        var curCmd=firstPart.split(/\s+|\s/)[firstPart.split(/\s+|\s/).length-1]
        for(var v in cmds)
            if(v.startsWith(curCmd))
                cmdsStartFrom.push(v)
        if(curCmd!=lastCmd)
            cmdNum=1
        else cmdNum++
        lastCmd=curCmd
        cmdNum=(cmdNum%cmdsStartFrom.length+cmdsStartFrom.length)%cmdsStartFrom.length
        //console.log(cmdsStartFrom);
        codeArea.value=firstPart+cmdsStartFrom[cmdNum].substr(curCmd.length)+secondPart.substr(secondPart.split(/\s+|\s/)[0].length)
        codeArea.selectionStart=selectionStart
        codeArea.selectionEnd=selectionEnd
        return false
    }
}
newGame()
performButton.onclick=function(){
    if(languageSelect.value=="Commands")
    {
        var spl=codeArea.value.split("\n")
        for(var v in spl)
            for(var v2 in cmds)
                if(spl[v].split(/\s+|\s/)[0]==v2)
                    cmds[v2](spl[v].split(/\s+|\s/))
    }
    else eval(codeArea.value)
    var ciid=setInterval(function(){
        if(allPerforming.length!=0)
            return
        console.log(entities.chest.distanceTo(entities.dino.pos.x,entities.dino.pos.y));
        setTryes(tryes+1)
        if(tryes>=maxTryes)
            newGame()
        if(entities.chest.distanceTo(entities.dino.pos.x,entities.dino.pos.y)<maxDst)
        {
            alert("Win!")
            wins++
            newGame()
        }
        clearInterval(ciid)
    },100)
}
