/*--- Name: AnimalProgJs/Vesion: 0.0.1a/Authors: AlexanderDV/Description: Properties AnimalProgJs .js. ---*/
//Properties
var props	=	{}
props.msgs  = {
    en  : {
        "perform":"Perform",
        "language":"Language",
        "setCommands":"Set commands",
        "tryes":"Tryes",
        "wins":"Wins"
    },
    ru  : {
        "perform":"Выполнить",
        "language":"Язык",
        "setCommands":"Установить команды",
        "tryes":"Попытки",
        "wins":"Победы"
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
