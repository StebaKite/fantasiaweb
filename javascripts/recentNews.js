// -----------------------------------------------------------
// Load XML file via Ajax dialog
// -----------------------------------------------------------

if (window.XMLHttpRequest) {
	xhttp=new XMLHttpRequest();		// other browser
}
else {
	xhttp=new ActiveXObject("Microsoft.XMLHTTP");		// Explorer
}
xhttp.open("GET","http://www.associazionefantasia.com/appData/news.xml",false);
xhttp.send();
xmlDoc=xhttp.responseXML; 

var today= new Date();
var newDate = new Date();
		
x=xmlDoc.getElementsByTagName("end");
if (x.length == 0) {
	document.write("<span class='TNews'>Nessuna News da segnalare</span>");
}
else {
	var newsOverDate = true;
	for (i=0;i<x.length;i++)
	{
		var yyyy = x[i].childNodes[0].nodeValue.substring(0,4);
		var mm	 = x[i].childNodes[0].nodeValue.substring(5,7) - 1;
		var gg	 = x[i].childNodes[0].nodeValue.substring(8,10);				
		newDate.setFullYear(yyyy,mm,gg);
		
		if (today <= newDate) {
			
			newsOverDate = false;

			create=xmlDoc.getElementsByTagName("create");						
			var yyyy_create = create[i].childNodes[0].nodeValue.substring(0,4);
			var mm_create	= create[i].childNodes[0].nodeValue.substring(5,7);
			var gg_create	= create[i].childNodes[0].nodeValue.substring(8,10);				

			titolo=xmlDoc.getElementsByTagName("title");
			text=xmlDoc.getElementsByTagName("text");
			
			document.write("<span class='TNews'>" + titolo[i].childNodes[0].nodeValue + "</span>");
			document.write("<br/>" + text[i].childNodes[0].nodeValue);
			break;
		}
	}
	if (newsOverDate) {
		document.write("<span class='TNews'>Nessuna News da segnalare</span>");
	}
}