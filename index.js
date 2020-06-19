var programInfo={
	name : "AnimalProgJs",
	version : "0.0.2a",
	authors : "AlexanderDV"
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

var maxDst=100
var allPerforming=[]
var cmds={}
function initSettings(){
    commandsArea.value=storageValue("commandsArea")||`
{
	"двигайся_в" : args => {
		entities.dino.moveByTime(Number(args[1]),Number(args[2]),"in","cur")
	},
	"двигайся_на" : args => {
		entities.dino.moveByTime(Number(args[1]),Number(args[2]),"on","cur")
	}
}`
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
// Init mover-elements
function initMovingElements(){
	for(var v in document.getElementsByClassName("mover"))
		addMovingElement(document.getElementsByClassName("mover")[v].parentNode, document.getElementsByClassName("mover")[v])
}
initMovingElements()
var defaultStorables={
	mapWidthOptionInput:500,
	mapHeightOptionInput:500,
}
function initStorableElements(){
	for(var v of document.getElementsByClassName("storable"))
		((v)=>{
			var el=v//document.getElementsByClassName("storable")[v]
			console.log(el,v);
			el[(el.type=="checkbox"||el.type=="radio")?"checked":"value"]=defaultStorables[el.id]!=undefined?(storageValue(el.id)||defaultStorables[el.id]):(storageValue(el.id)!=undefined?storageValue(el.id):el[(el.type=="checkbox"||el.type=="radio")?"checked":"value"])
			var f=()=>storageValue(el.id,el[(el.type=="checkbox"||el.type=="radio")?"checked":"value"])
			el.addEventListener('input',f)
			el.addEventListener('change',f)
			el.addEventListener('enter',f)
			f()
			if(el.onchange)
				el.onchange()
			if(el.oninput)
				el.oninput()
		})(v)
}
initStorableElements()
var hidingEls={
	optionsHider	:	"optionsGroupDiv",
	controlHider	:	"controlGroupDiv",
	countersHider	:	"countersGroupDiv",
	mapHider		:	"mapGroupDiv",
	instancesHider	:	"instancesGroupDiv",
	debugHider		:	"debugGroupDiv",
}
for(var vv in hidingEls)
	((vv)=>addHidingElement(eval(hidingEls[vv]),	eval(vv),	(v)=>storageValue(vv,v),	storageValue(vv)))(vv)
//Counters
var counters
function clearCounters(){
	counters={
		currentTry:0,
		tries:0,
		victories:0,
		defeats:0
	}
}
clearCounters()
var countersDivs={}
var countersOptionsDivs={}
var countersLabels={}
var countersMax={
	currentTry:3
}
function generateCounters(){
	for(var name in counters)
		(name=>{
			countersDivs[name]=document.createElement('div')
			countersDiv.appendChild(countersDivs[name])
			var n=document.createElement('label')
			n.innerText=getMsg(name)
			countersDivs[name].appendChild(n)
			var s=document.createElement('label')
			s.innerText=": "
			countersDivs[name].appendChild(s)
			var c=document.createElement('label')
			countersLabels[name]=c
			countersDivs[name].appendChild(c)


			countersOptionsDivs[name]=document.createElement('div')
			countersOptionsDiv.appendChild(countersOptionsDivs[name])
			var l=document.createElement('label')
			l.innerText=getMsg(name)
			countersOptionsDivs[name].appendChild(l)
			var i=document.createElement('input')
			i.type="checkbox"
			i.checked=true
			i.onchange=function(){
				countersDivs[name].style.display=this.checked?"":"none"
			}
			countersOptionsDivs[name].appendChild(i)
		})(name)
}
generateCounters()
function updateCounters(){
	for(var name in counters)
		countersLabels[name].innerText=counters[name]+(countersMax[name]?"/"+countersMax[name]:"")
}
//Events
function victory(){
	alert(getMsg("victory"))
	counters.victories++
	newGame()
}
function defeat(){
	alert(getMsg("defeat"))
	counters.defeats++
	newGame()
}
function newGame(){
	counters.currentTry=0
	if(randomNewGameDinoSpawnOptionCheckbox.checked)
    	entities.dino.moveIn(mapSettings.max.x*Math.random(),mapSettings.max.y*Math.random())
	if(randomNewGameChestSpawnOptionCheckbox.checked)
    	entities.chest.moveIn(mapSettings.max.x*Math.random(),mapSettings.max.y*Math.random())
	updateCounters()
}
function newTry(){
	counters.currentTry++
	counters.tries++
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
        if(entities.chest.distanceTo(entities.dino.pos.x,entities.dino.pos.y)<maxDst)
			victory()
		else if(counters.currentTry>=countersMax.currentTry)
			defeat()
        clearInterval(ciid)
    },100)
	updateCounters()
}
performButton.onclick=newTry
//Entities
var entities={}
function updateEntities(){
	for(var v in entities)
		entities[v].moveIn(entities[v].pos.x,entities[v].pos.y)
}
var mapSettings
function updateMapSettings(){
	mapSettings={
	    masshtab:10,
		min	:	{
			x	:	0,
			y	:	0
		},
		max	:	{
			x	:	mapDiv.getBoundingClientRect().width,
			y	:	mapDiv.getBoundingClientRect().height
		},
		bottom	:	mapDiv.getBoundingClientRect().bottom,
		left	:	mapDiv.getBoundingClientRect().left,
		right	:	mapDiv.getBoundingClientRect().right,
		top		:	mapDiv.getBoundingClientRect().top,
	}
	updateEntities()
}
function setStorableValue(poolPath,name,value,def,modif,link,linkV,update){
	if(def)
		value=storageValue(poolPath+"."+name)||value
	eval(poolPath)[name]=value+modif
	if(link)
		link[linkV]=value
	storageValue(poolPath+"."+name,value)
	if(update)
		update()
}
//setStorableValue("optionsGroupDiv.style","display","checked",true,"",optionsHider,"checked")
//setStorableValue("mapDiv.style","width",500,true,"px",mapWidthOptionDiv,"value")
//setStorableValue("mapDiv.style","height",500,true,"px",mapHeightOptionDiv,"value")
//mapWidthOptionInput.value=storageValue("mapWidth")||500
//mapWidthOptionInput.oninput()
//mapHeightOptionInput.value=storageValue("mapHeight")||500
//mapHeightOptionInput.oninput()
updateMapSettings()
var instances={}
function instantiate(instance){
	instances[instance.id]=instances[instance.id]||0
	var n=document.createElement('div')
	mapDiv.appendChild(n)
	n.innerHTML=instance.innerHTML
	n.id=instance.id+"Instance"+(instances[instance.id])
	n.style.cssText=instance.style.cssText
	n.className=instance.className
	for(var v in instance.children)
		n.children[v].id=instance.children[v].id+"Instance"+(instances[instance.children[v].id])
	instances[instance.id]++
	return n
}
function Entity(name,instance,x,y,speed){
    this.image=instantiate(instance)
    this.pos={x:x,y:y}
    this.speed=speed
    this.moveIn=function(x,y){
        this.pos	=	{
			x:ogr(mapSettings.min.x,	x,	mapDiv.getBoundingClientRect().width	-this.image.getBoundingClientRect().width),
			y:ogr(mapSettings.min.y,	y,	mapDiv.getBoundingClientRect().height	-this.image.getBoundingClientRect().height)
		}
		var offset=0
		for(var v in entities)
			if(v!=this.name)
				offset+=entities[v].image.getBoundingClientRect().height

        this.image.style.left	=	this.pos.x+"px"
        this.image.style.top	=	mapDiv.getBoundingClientRect().height-this.pos.y-this.image.getBoundingClientRect().height-offset+"px"
    }
    this.moveOn=(x,y)=>this.moveIn(this.pos.x+x,this.pos.y+y)
    this.performing=[]
    this.moveByTime=function(x,y,type,end){
        var ent=this
        var mbtid=setInterval(function()
        {
            if(end=="all"?allPerforming.length!=0:(end=="cur"?ent.performing.length!=0:false))
                return
            if(type=="on")
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
                    ent.moveOn(xSpeed/1000*iv*mapSettings.masshtab,ySpeed/1000*iv*mapSettings.masshtab)
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
    this.distanceTo=(x,y)=>distance(this.pos.x,this.pos.y,x,y)
    this.moveIn(x,y)
	this.name=name
    entities[name]=this
}
function generateEntities()
{
	entities={}
	mapDiv.innerHTML=""
	new Entity("dino",dinoDiv,0,0,10)
	new Entity("chest",chestDiv,500,500,0)
	console.log(randomStartDinoSpawnOptionCheckbox.checked);
	if(randomStartDinoSpawnOptionCheckbox.checked)
    	entities.dino.moveIn(mapSettings.max.x*Math.random(),mapSettings.max.y*Math.random())
	if(randomStartChestSpawnOptionCheckbox.checked)
    	entities.chest.moveIn(mapSettings.max.x*Math.random(),mapSettings.max.y*Math.random())
}
//Start
startButton.onclick=()=>{
	generateEntities()
	clearCounters()
	updateCounters()
}
