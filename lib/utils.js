
function ogr(min,cur,max,hasMin,hasMax)
{
	if(max<min)
	{
		console.error("Error max<min");
		return cur
	}
	var ogr0=hasMin||arguments.length<4?(min>cur?min:cur):cur;
	ogr0=hasMax||arguments.length<5?(max<cur?max:cur):cur;
	return ogr0;
}
function distance(x0,y0,x1,y1){
    return Math.pow(Math.pow(x0-x1,2)+Math.pow(y0-y1,2),0.5)
}
