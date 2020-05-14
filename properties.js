/*--- Name: AnimalProgJs/Vesion: 0.0.2a/Authors: AlexanderDV/Description: Properties AnimalProgJs .js. ---*/
//Properties
var props	=	{}
props.msgs  = {
	en  : {
		//Part
			"options"	:	"Options",
			"control"	:	"Control",
			"counters"	:	"Counters",
			"map"		:	"Map",
			"instances"	:	"Instances",
			"debug"		:	"Debug",
		//Options
			//Spawn
				"randomStartDinoSpawn"		:	"Spawn Dino random on start",
				"randomStartChestSpawn"		:	"Spawn Chest random on new game",
				"randomNewGameDinoSpawn"	:	"Spawn Dino random on start",
				"randomNewGameChestSpawn"	:	"Spawn Chest random on new game",
			//Map
				"mapwidth"	:	"Map width",
				"mapHeight"	:	"Map height",
		//Control
			"perform"		:	"Perform",
			"language"		:	"Language",
			"setCommands"	:	"Set commands",
		//Counter
			"currentTry":	"Current try",
			"tries"		:	"Tries",
			"victories"	:	"Victories",
			"defeats"	:	"Defeats",
		//Messages
			"victory"	:	"Victory",
			"defeat"	:	"Defeat",
		//Buttons
			"start"	:	"Start",
	},
	ru  : {
		//Part
			"options"	:	"Настройки",
			"control"	:	"Управление",
			"counters"	:	"Счетчики",
			"map"		:	"Карта",
			"instances"	:	"Образцы",
			"debug"		:	"Дебаг",
		//Options
			//Spawn
				"randomStartDinoSpawn"		:	"Спавнить Дино случайно в начале",
				"randomStartChestSpawn"		:	"Спавнить Сундук случайно в начале",
				"randomNewGameDinoSpawn"	:	"Спавнить Дино случайно в новой игре",
				"randomNewGameChestSpawn"	:	"Спавнить Сундук случайно в новой игре",
			//Map
				"mapWidth"	:	"Ширина карты",
				"mapHeight"	:	"Высота карты",
		//Control
			"perform"		:	"Выполнить",
			"language"		:	"Язык",
			"setCommands"	:	"Установить команды",
		//Counter
			"currentTry":	"Данная попытка",
			"tries"		:	"Попыток",
			"victories"	:	"Побед",
			"defeats"	:	"Поражений",
		//Messages
			"victory"	:	"Победа",
			"defeat"	:	"Поражение",
		//Buttons
			"start"	:	"Начать",
	}
}

// Universal local storage initialization
var storage = window.localStorage
function storageValue(key,val)
{
	var vals
	try {
	vals= JSON.parse(storage[programInfo.name])
	} catch (e) {

	}
	if(!vals)
		vals={}
	if(arguments.length>=2)
		vals[key]=val
	storage[programInfo.name]=JSON.stringify(vals)
	return vals[key]
}

// Messages language initialization by default value
var messagesLanguage='ru'
// Function for getting message by key
var getMsg=function(key, lang){
	return props.msgs[lang||messagesLanguage][key]
}
