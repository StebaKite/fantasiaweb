<!--
function isNull(vValue, vDefault)
{
if (typeof(vDefault) == "undefined")
{
if (typeof(vValue) == "undefined" || vValue == null)
return true;
else
return false;
}
else
{
var vTmp;
if (typeof(vValue) == "undefined" || vValue == null)
return vDefault;
vTmp = String(vValue);
if (vTmp == "undefined" || vTmp == "" || vTmp == "null")
return vDefault;
return vValue;
}
}
function fnFormatStrForDB ( pstrValue )
{
pstrValue = pstrValue.replace(/\'/gi, "''"); //'
return pstrValue;
}
function fnFormatStrForInput ( pstrValue )
{
pstrValue = pstrValue.replace(/\"/gi, "&#34;"); //"
pstrValue = pstrValue.replace(/\'/gi, "&#39;");
return pstrValue;
}
function fnFormatStrFromHtmlEditorTextAreaToCmsTextArea(pstrValue)
{
pstrValue = escape(pstrValue);
pstrValue = pstrValue.replace(/%3Cbr%3E/gi, ""); // sostituisco i <br> con nulla
pstrValue = pstrValue.replace(/%3Cbr\/%3E/gi, ""); // sostituisco i <br/> con nulla
pstrValue = pstrValue.replace(/%3Cbr%20\/%3E/gi, ""); // sostituisco i <br /> con nulla
pstrValue = pstrValue.replace(/%3C\/p%3E%0D%0A%3Cp%3E/gi, "%3C/p%3E%3Cp%3E"); // sostituisco i </p>a capo<p> con </p><p> per PC
pstrValue = pstrValue.replace(/%3C\/p%3E%0A%3Cp%3E/gi, "%3C/p%3E%3Cp%3E"); // sostituisco i </p>a capo<p> con </p><p> per MAC
pstrValue = unescape(pstrValue);
return pstrValue;
}
function fnFormatStrFromDBToTextArea(pstrValue)
{
pstrValue = pstrValue.replace(/<br>/gi, "\r\n");
pstrValue = pstrValue.replace(/<br\/>/gi, "\r\n");
pstrValue = pstrValue.replace(/<br \/>/gi, "\r\n");
return pstrValue;
}
function fnFormatStrFromTextAreaToDBForSite ( pstrValue )
{
pstrValue = escape ( pstrValue );
pstrValue = pstrValue.replace(/%3C/gi, ""); // elimino l'apertura del tag <
pstrValue = pstrValue.replace(/%3E/gi, ""); // elimino la chiusura del tag >
pstrValue = pstrValue.replace(/%0D%0A/gi, "%3Cbr%3E"); // sostituisco gli a capo con <br> per PC
pstrValue = pstrValue.replace(/%0A/gi, "%3Cbr%3E"); // sostituisco gli a capo con <br> per MAC
pstrValue = unescape ( pstrValue );
return pstrValue;
}
function fnFormatStrFromTextAreaToDBForCMS ( pstrValue )
{
pstrValue = escape ( pstrValue );
pstrValue = pstrValue.replace(/%0D%0A/gi, "%3Cbr%3E"); // sostituisco gli a capo con <br> per PC
pstrValue = pstrValue.replace(/%0A/gi, "%3Cbr%3E"); // sostituisco gli a capo con <br> per MAC
pstrValue = unescape ( pstrValue );
return pstrValue;
}
function fnFormatMDBDateToObjDate ( pstrData )
{
pstrData = String ( isNull ( pstrData, "" ) );
var intLenData = pstrData;
if ( pstrData == "" ) return "";
var objNewDate = new Date();
objNewDate.setFullYear ( Number ( pstrData.substr ( 0, 4 ) ) );
objNewDate.setMonth ( Number ( pstrData.substr ( 4, 2 ) ) - 1 );
objNewDate.setDate ( Number ( pstrData.substr ( 6, 2 ) ) );
if ( intLenData > 8 ) objNewDate.setHours ( Number ( pstrData.substr ( 8, 2 ) ) );
if ( intLenData > 10 ) objNewDate.setMinutes ( Number ( pstrData.substr ( 10, 2 ) ) );
if ( intLenData > 12 ) objNewDate.setSeconds ( Number ( pstrData.substr ( 12, 2 ) ) );
return objNewDate;
}
function fnStrDateMonthYearFromObjDate ( pObjDate, pstrLanguage )
{
pstrLanguage = isNull ( pstrLanguage, "IT" );
pObjDate = isNull ( pObjDate, new Date() );
pObjDate = new Date ( pObjDate );
var vDay = pObjDate.getDate();
var vMonth = pObjDate.getMonth() + 1;
var vYear = pObjDate.getFullYear();
strDATE = fnAddZero(Number ( vDay )) + " " + fnGetMonth ( Number ( vMonth ), pstrLanguage );
return strDATE;
}
function fnGetMonth ( pintValue, pstrLanguage )
{
pstrLanguage = isNull ( pstrLanguage, "IT" );
if ( pstrLanguage == "IT" )
{
switch ( pintValue )
{
case 1: return "Gennaio"; break;
case 2: return "Febbraio"; break;
case 3: return "Marzo"; break;
case 4: return "Aprile"; break;
case 5: return "Maggio"; break;
case 6: return "Giugno"; break;
case 7: return "Luglio"; break;
case 8: return "Agosto"; break;
case 9: return "Settembre"; break;
case 10: return "Ottobre"; break;
case 11: return "Novembre"; break;
case 12: return "Dicembre"; break;
}
}
else
{
switch ( pintValue )
{
case 1: return "January"; break;
case 2: return "February"; break;
case 3: return "March"; break;
case 4: return "April"; break;
case 5: return "May"; break;
case 6: return "June"; break;
case 7: return "July"; break;
case 8: return "August"; break;
case 9: return "September"; break;
case 10: return "October"; break;
case 11: return "November"; break;
case 12: return "December"; break;
}
}
}
function CheckDATE(Form, Element, Separator, CanBeNull, NoMessage, bCheckCurrentYear)
{
bCheckCurrentYear = isNull ( bCheckCurrentYear, false);
var vElement = document.forms[Form].elements[Element];
var vElementValue = ReadElementValue( vElement );
if ( !CanBeNull )
{
if (isNull(vElementValue,"")=="")
{
if ( (NoMessage == null) || (NoMessage == false) ) {
ShowCheckError(0);
vElement.focus();
}
return false;
}
}
else
{
if (isNull(vElementValue,"")=="")
return true;
}
var vIntDay;
var vIntMonth;
var vIntYear;
var vVarArray;
vVarArray = vElementValue.split( Separator );
if ( vVarArray.length != 3 ) {
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nData non valida.");
vElement.focus();
}
return false;
}
if ( (vVarArray[0].length != 1) && (vVarArray[0].length != 2) ) {
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nGiorno non valido.");
vElement.focus();
}
return false;
}
vIntDay = ((vVarArray[0].charAt(0) == "0") && (vVarArray[0].length == 2)) ? parseInt(vVarArray[0].charAt(1)) : parseInt(vVarArray[0]);
if (isNaN(vIntDay))
{
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nGiorno non valido.");
vElement.focus();
}
return false;
}
else
{
if ( (vIntDay < 1) || (vIntDay > 31) )
{
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nGiorno non valido.");
vElement.focus();
}
return false;
}
}
if ( (vVarArray[1].length != 1) && (vVarArray[1].length != 2) ) {
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nMese non valido.");
vElement.focus();
}
return false;
}
vIntMonth = ((vVarArray[1].charAt(0) == "0") && (vVarArray[1].length == 2)) ? parseInt(vVarArray[1].charAt(1)) : parseInt(vVarArray[1]);
if (isNaN(vIntMonth))
{
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nMese non valido.");
vElement.focus();
}
return false;
}
else
{
if ((vIntMonth < 1) || (vIntMonth > 12))
{
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nMese non valido.");
vElement.focus();
}
return false;
}
}
vIntYear = parseInt(vVarArray[2]);
if (isNaN(vIntYear) || (String(vIntYear).length != 4))
{
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nAnno non valido.");
vElement.focus();
}
return false;
}
var vDate;
vDate = new Date(vIntYear, vIntMonth - 1, vIntDay);
if ( vDate == null ) {
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nData non valida.");
vElement.focus();
}
return false;
}
if ( (vDate.getDate() != vIntDay) || (vDate.getMonth() != (vIntMonth - 1)) || (vDate.getFullYear() != vIntYear) ) {
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nData non valida.");
vElement.focus();
}
return false;
}
if ( bCheckCurrentYear )
{
if ((vIntYear < ((new Date()).getFullYear() - 1)) || (vIntYear > (new Date()).getFullYear()))
{
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nAnno non valido.");
vElement.focus();
}
return false;
}
// controlla che la data non sia maggiore della data corrente
var vToday = new Date();
if ( vDate.getFullYear() == vToday.getFullYear() ) {
if ( vDate.getMonth() > vToday.getMonth() ) {
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nData maggiore di quella odierna.");
vElement.focus();
}
return false;
}
else if ( vDate.getMonth() == vToday.getMonth() ) {
if ( vDate.getDate() > vToday.getDate() ) {
if ( (NoMessage == null) || (NoMessage == false) ) {
alert("Attenzione!\nData maggiore di quella odierna.");
vElement.focus();
}
return false;
}
}
}
}
return true;
}
function CheckSTR(Form, Element, CanBeNull, NoMessage)
{
var pElement = document.forms[Form].elements[Element];
var ElementValue = ReadElementValue( pElement );
if (!CanBeNull)
{
if (isNull(ElementValue, "") == "")
{
if ( (NoMessage == null) || (NoMessage == false) )
ShowCheckError(0);
else
ShowCheckError(NoMessage);
try { pElement.focus(); }
catch(e) {}
return false;
}
}
return true;
}
function ReadElementValue( pElement )
{
var vLength = isNull( pElement.length, 1);
var vValue = "";
if ( vLength > 1)
{
if ( ( pElement[0].tagName == "INPUT" ) && ( pElement[0].type == "radio" ) )
{
for (i = 0; i < vLength; i++)
{
if ( pElement[i].checked )
{
vValue = pElement[i].value;
break;
}
}
}
}
else
{
switch ( pElement.tagName )
{
case "INPUT" :
{
switch ( pElement.type )
{
case "password" : vValue = pElement.value; break;
case "text" : vValue = pElement.value; break;
case "textarea" : vValue = pElement.value; break;
case "hidden" : vValue = pElement.value; break;
case "checkbox" : vValue = pElement.checked ? true : false; break;
case "radio" : vValue = pElement.checked ? true : false; break;
}
break;
}
case "TEXTAREA" :
{
vValue = pElement.value;
break;
}
case "SELECT" :
if ( pElement.selectedIndex != -1 ) {
vValue = pElement.options[pElement.selectedIndex].value;
}
break;
}
}
return vValue;
}
function ShowCheckError( pintType )
{
var strMessage = "";
if ( isNaN ( pintType ) )
{
strMessage = pintType;
}
else
{
switch ( pintType )
{
case 0 : strMessage = "Attenzione!\nIl dato non può essere nullo."; break;
case 1 : strMessage = "Attenzione!\nDato non valido."; break;
case 2 : strMessage = "Attenzione!\nAccettare le condizioni generali di utilizzo del servizio (\"CGUS\")."; break;
case 3 : strMessage = "Attenzione!\nIl dato relativo al Sesso non può essere nullo."; break;
case 4 : strMessage = "Attenzione!\nSelezionare Maschile o Femminile."; break;
case 5 : strMessage = "Attenzione!\nSelezionare la Professione."; break;
case 6 : strMessage = "Attenzione!\nAutorizzare il trattamento dei Dati Personali."; break;
case 7 : strMessage = "Attention!\nThe data must be a numeric data."; break;
case 9 : strMessage = "Attenzione!\nE-mail non valida."; break;
default : strMessage = "Attenzione!\nErrore nell'inserimento del dato.";
}
}
alert( strMessage );
}
function CheckEMAIL(Form, Element, CanBeNull, NoMessage)
{
NoMessage = isNull ( NoMessage, false );
var vElement = document.forms[Form].elements[Element];
var vElementValue = ReadElementValue(vElement);
if ( !CanBeNull )
{
if ( isNull ( vElementValue, "" ) == "" )
{
if ( (NoMessage == null) || (NoMessage == false) )
ShowCheckError(9);
else
ShowCheckError(NoMessage);
vElement.focus();
return false;
}
}
else
{
if ( isNull ( vElementValue, "" ) == "" )
return true;
}
var vArrayAt = vElementValue.split( "@" );
if ( vArrayAt.length != 2 )
{
if ( (NoMessage == null) || (NoMessage == false) )
ShowCheckError(9);
else
ShowCheckError(NoMessage);
vElement.focus();
return false;
}
var vArrayDotPre = vArrayAt[0].split( "." );
var vArrayDotPost = vArrayAt[1].split( "." );
if ( vArrayDotPost.length < 2 )
{
if ( (NoMessage == null) || (NoMessage == false) )
ShowCheckError(9);
else
ShowCheckError(NoMessage);
vElement.focus();
return false;
}
var ii;
var jj;
for ( jj = 0; jj < vArrayDotPre.length; jj++ )
{
if ( vArrayDotPre[jj].length < 1 )
{
if ( (NoMessage == null) || (NoMessage == false) )
ShowCheckError(9);
else
ShowCheckError(NoMessage);
vElement.focus();
return false;
}
for ( ii = 0; ii < vArrayDotPre[jj].length; ii++ )
{
if ( ( (vArrayDotPre[jj].charCodeAt(ii) > 0) && (vArrayDotPre[jj].charCodeAt(ii) < 45) ) || ( (vArrayDotPre[jj].charCodeAt(ii) > 57) && (vArrayDotPre[jj].charCodeAt(ii) < 65) ) || ( (vArrayDotPre[jj].charCodeAt(ii) > 91) && (vArrayDotPre[jj].charCodeAt(ii) < 95) ) || (vArrayDotPre[jj].charCodeAt(ii) == 96) || (vArrayDotPre[jj].charCodeAt(ii) > 122) )
{
if ( (NoMessage == null) || (NoMessage == false) )
ShowCheckError(9);
else
ShowCheckError(NoMessage);
vElement.focus();
return false;
}
}
}
for ( jj = 0; jj < vArrayDotPost.length; jj++ )
{
if ( vArrayDotPost[jj].length < 1 )
{
if ( (NoMessage == null) || (NoMessage == false) )
ShowCheckError(9);
else
ShowCheckError(NoMessage);
vElement.focus();
return false;
}
for ( ii = 0; ii < vArrayDotPost[jj].length; ii++ )
{
if ( ( ( vArrayDotPost[jj].charCodeAt(ii) > 0 ) && ( vArrayDotPost[jj].charCodeAt(ii) < 45 ) ) || ( ( vArrayDotPost[jj].charCodeAt(ii) > 57 ) && ( vArrayDotPost[jj].charCodeAt(ii) < 65 ) ) || ( ( vArrayDotPost[jj].charCodeAt(ii) > 91 ) && ( vArrayDotPost[jj].charCodeAt(ii) < 97 ) ) || ( vArrayDotPost[jj].charCodeAt(ii) > 122 ) )
{
if ( (NoMessage == null) || (NoMessage == false) )
ShowCheckError(9);
else
ShowCheckError(NoMessage);
vElement.focus();
return false;
}
}
}
return true;
}
function CheckRADIO(Form, Element, NoMessage)
{
var pElement = document.forms[Form].elements[Element];
var ElementLength = pElement.length;
var strReturn = false;
for (i = 0; i < ElementLength; i++)
{
if (pElement[i].checked)
strReturn = pElement[i].value;
}
if (!strReturn)
{
if ( (NoMessage == null) || (NoMessage == false) )
ShowCheckError(0);
else
alert ( NoMessage );
}
return strReturn;
}
function CheckCHECK ( pstrForm, pstrElement, pstrMessage, pintMin, pintMax )
{
pintMin = isNull ( pintMin, 0 );
pintMax = isNull ( pintMax, 0 );
var fnObjElement = document.forms[pstrForm].elements[pstrElement];
var fnIntLength = isNull ( fnObjElement.length, 1 );
var fnBooIsChecked = false;
var fnIntElementChecked = 0;
if ( fnIntLength == 1 )
{
if ( fnObjElement.checked )
fnBooIsChecked = true;
}
else
{
var fnIntCounter = 0;
for ( fnIntCounter = 0; fnIntCounter < fnIntLength; fnIntCounter++ )
{
if ( fnObjElement[fnIntCounter].checked )
{
fnBooIsChecked = true;
fnIntElementChecked++;
}
}
}
if ( fnBooIsChecked )
{
if ( pintMin != 0 )
{
if ( fnIntElementChecked < pintMin )
{
ShowCheckError ( pstrMessage + "\nSelezionare almeno " + pintMin + " elementi." );
fnBooIsChecked = false;
}
}
if ( pintMax != 0 )
{
if ( fnIntElementChecked > pintMax )
{
ShowCheckError ( pstrMessage + "\nSelezionare al massimo " + pintMax + " elementi." );
fnBooIsChecked = false;
}
}
}
else
{
if ( ( pstrMessage == null ) || ( pstrMessage == false ) )
ShowCheckError ( 0 );
else
ShowCheckError ( pstrMessage );
}
return fnBooIsChecked;
}
function CheckSELECT ( Form, Element, NoMessage )
{
var pElement = document.forms[Form].elements[Element];
var vselectedIndex = pElement.selectedIndex;
var strReturn = false;
if ( vselectedIndex != 0 )
{
strReturn = pElement.options[vselectedIndex].value;
}
if (!strReturn)
{
pElement.focus();
if ( (NoMessage == null) || (NoMessage == false) )
ShowCheckError(0);
else
alert ( NoMessage );
}
return strReturn;
}
function CheckMultiSELECT ( Form, Element, NoMessage )
{
var pElement = document.forms[Form].elements[Element];
var vselectedIndex = pElement.selectedIndex;
var strReturn = false;
if ( vselectedIndex != -1 )
{
strReturn = pElement.options[vselectedIndex].value;
}
if (!strReturn)
{
pElement.focus();
if ( (NoMessage == null) || (NoMessage == false) )
ShowCheckError(0);
else
alert ( NoMessage );
}
return strReturn;
}
function fnReadCHECK ( pstrForm, pstrElement )
{
var fnReturnValue = "";
var fnObjElement = document.forms[pstrForm].elements[pstrElement];
var fnIntLength = isNull ( fnObjElement.length, 1 );
if ( fnIntLength == 1 )
{
if ( fnObjElement.checked )
fnReturnValue = fnObjElement.value;
}
else
{
var fnIntCounter = 0;
for ( fnIntCounter = 0; fnIntCounter < fnIntLength; fnIntCounter++ )
{
if ( fnObjElement[fnIntCounter].checked )
{
if ( fnReturnValue != "" ) fnReturnValue += ", ";
fnReturnValue += fnObjElement[fnIntCounter].value;
}
}
}
return fnReturnValue;
}
function fnTrimZero ( pszStr )
{
pszStr = String ( pszStr );
if ( pszStr == "00" )
return 0;
if ( pszStr.charAt(0) == "0" )
return Number ( pszStr.charAt(1) );
else
return Number ( pszStr );
}
function fnAddZero ( pintNumber )
{
pintNumber = Number ( pintNumber );
if ( pintNumber == 0 ) return "00";
else
{
if ( pintNumber < 10 ) return "0" + pintNumber;
else return pintNumber;
}
}
function fnGoToPage ( pintLastPage, pintValue )
{
pintValue = Number ( isNull ( pintValue, -1 ) );
var intPageToGo = 0;
if ( pintValue == -1 )
{
intPageToGo = Number ( document.forms["mainForm"].elements["PageToGo"].value );
if ( isNaN ( intPageToGo ) || ( intPageToGo < 1 ) )
intPageToGo = 1;
if ( intPageToGo > pintLastPage )
intPageToGo = pintLastPage;
document.forms["mainForm"].elements["Page"].value = intPageToGo;
document.forms["mainForm"].submit();
}
else
{
var intFromPage = Number ( document.forms["mainForm"].elements["Page"].value );
if ( ( pintValue > 0 ) && ( pintValue < ( pintLastPage + 1 ) ) )
{
intPageToGo = pintValue;
if ( intPageToGo != intFromPage )
{
document.forms["mainForm"].elements["Page"].value = intPageToGo;
document.forms["mainForm"].submit();
}
}
}
}
function windowOpen ( szUrl, szName, iWidth, iHeight, pbooScrollbars )
{
pbooScrollbars = isNull(pbooScrollbars, false);
var iTop, iLeft;
var szFeatures = "";
if (iWidth != null) {
szFeatures += "width=" + iWidth + ",";
iLeft = (window.screen.availWidth - iWidth) >> 1;
szFeatures += "left=" + iLeft + ",";
}
if (iHeight != null) {
szFeatures += "height=" + iHeight + ",";
iHeight = (window.screen.availHeight - iHeight) >> 1;
szFeatures += "top=" + iHeight + ",";
}
szFeatures += "toolbar=no,resizable=yes,location=no,directories=no,status=yes,menubar=no,scrollbars=" + ((pbooScrollbars) ? "yes" : "no");
window.open(szUrl, szName, szFeatures);
}
function CheckDateTime ( Form, Element, DateSeparator, TimeSeparator, CanBeNull )
{
var vElement = document.forms[Form].elements[Element];
var vElementValue = ReadElementValue(vElement);
if ( !CanBeNull )
{
if ( isNull ( vElementValue, "" ) == "" )
{
ShowCheckError(0);
vElement.focus();
return false;
}
}
else
{
if ( isNull ( vElementValue, "" ) == "" )
return true;
}
DateSeparator = isNull ( DateSeparator, "/" );
TimeSeparator = isNull ( TimeSeparator, ":" );
CanBeNull = isNull ( CanBeNull, false );
var vIntDay;
var vIntMonth;
var vIntYear;
var vIntHour;
var vIntMinute;
var arrDateTime = vElementValue.split(" ");
if ( arrDateTime.length != 2 )
{
alert("Attenzione!\nData non valida.");
vElement.focus();
return false;
}
var vVarArray;
vVarArray = arrDateTime[0].split( DateSeparator );
if ( vVarArray.length != 3 )
{
alert("Attenzione!\nData non valida.");
vElement.focus();
return false;
}
if ( (vVarArray[0].length != 1) && (vVarArray[0].length != 2) )
{
alert("Attenzione!\nGiorno non valido.");
vElement.focus();
return false;
}
vIntDay = ((vVarArray[0].charAt(0) == "0") && (vVarArray[0].length == 2)) ? parseInt(vVarArray[0].charAt(1)) : parseInt(vVarArray[0]);
if (isNaN(vIntDay))
{
alert("Attenzione!\nGiorno non valido.");
vElement.focus();
return false;
}
else
{
if ( (vIntDay < 1) || (vIntDay > 31) )
{
alert("Attenzione!\nGiorno non valido.");
vElement.focus();
return false;
}
}
if ( (vVarArray[1].length != 1) && (vVarArray[1].length != 2) )
{
alert("Attenzione!\nMese non valido.");
vElement.focus();
return false;
}
vIntMonth = ((vVarArray[1].charAt(0) == "0") && (vVarArray[1].length == 2)) ? parseInt(vVarArray[1].charAt(1)) : parseInt(vVarArray[1]);
if (isNaN(vIntMonth))
{
alert("Attenzione!\nMese non valido.");
vElement.focus();
return false;
}
else
{
if ((vIntMonth < 1) || (vIntMonth > 12))
{
alert("Attenzione!\nMese non valido.");
vElement.focus();
return false;
}
}
vIntYear = parseInt(vVarArray[2]);
if (isNaN(vIntYear) || (String(vIntYear).length != 4))
{
alert("Attenzione!\nAnno non valido.");
vElement.focus();
return false;
}
var vDate;
vDate = new Date(vIntYear, vIntMonth - 1, vIntDay);
if ( vDate == null )
{
alert("Attenzione!\nData non valida.");
vElement.focus();
return false;
}
if ( (vDate.getDate() != vIntDay) || (vDate.getMonth() != (vIntMonth - 1)) || (vDate.getFullYear() != vIntYear) )
{
alert("Attenzione!\nData non valida.");
vElement.focus();
return false;
}
var arrTime = arrDateTime[1].split( TimeSeparator );
if ( arrTime.length != 2 )
{
alert("Attenzione!\nOrario non valido.");
vElement.focus();
return false;
}
//--------------- controllo ora ----------------------------
if ( (arrTime[0].length != 1) && (arrTime[0].length != 2) )
{
alert("Attenzione!\nOra non valida.");
vElement.focus();
return false;
}
vIntHour = ((arrTime[0].charAt(0) == "0") && (arrTime[0].length == 2)) ? parseInt(arrTime[0].charAt(1)) : parseInt(arrTime[0]);
if (isNaN(vIntHour))
{
alert("Attenzione!\nOra non valida.");
vElement.focus();
return false;
}
else
{
if ( (vIntHour < 0) || (vIntHour > 23) )
{
alert("Attenzione!\nOra non valida.");
vElement.focus();
return false;
}
}
//--------------- controllo minuti ----------------------------
if ( (arrTime[1].length != 1) && (arrTime[1].length != 2) )
{
alert("Attenzione!\nMinuti non validi.");
vElement.focus();
return false;
}
vIntMinute = ((arrTime[1].charAt(0) == "0") && (arrTime[1].length == 2)) ? parseInt(arrTime[1].charAt(1)) : parseInt(arrTime[1]);
if (isNaN(vIntMinute))
{
alert("Attenzione!\nMinuti non validi.");
vElement.focus();
return false;
}
else
{
if ( (vIntMinute < 0) || (vIntMinute > 59) )
{
alert("Attenzione!\nMinuti non validi.");
vElement.focus();
return false;
}
}
return true;
}
function CheckINT ( Form, Element, CanBeNull, NoMessage )
{
var pElement = document.forms[Form].elements[Element];
var ElementValue = ReadElementValue ( pElement );
if ( !CanBeNull )
{
if ( isNull ( ElementValue, "" ) == "" )
{
if ( (NoMessage == null) || (NoMessage == false) ) {
ShowCheckError(0);
pElement.focus();
}
return false;
}
}
else
{
if ( isNull ( ElementValue, "" ) == "" )
return true;
}
if (ElementValue.indexOf(",") >= 0)
{
if ( (NoMessage == null) || (NoMessage == false) ) {
ShowCheckError(1);
pElement.focus();
}
return false;
}
if (ElementValue.indexOf(".") >= 0)
{
if ( (NoMessage == null) || (NoMessage == false) ) {
ShowCheckError(1);
pElement.focus();
}
return false;
}
var ii;
ii = 0;
if ( (ElementValue.charAt(0) == "+") || (ElementValue.charAt(0) == "-") )
{
ii = 1;
}
for ( ; ii < ElementValue.length; ii++ ) {
if ( !((ElementValue.charAt(ii) >= "0") && (ElementValue.charAt(ii) <= "9")) ) {
if ( (NoMessage == null) || (NoMessage == false) ) {
ShowCheckError(1);
pElement.focus();
}
return false;
}
}
/*
if ( isNaN(parseInt(ElementValue)) )
{
if ( (NoMessage == null) || (NoMessage == false) ) {
ShowCheckError(1);
pElement.focus();
}
return false;
}
else return true;
*/
return true;
}
function fnFormatInputDateToObjDate ( pstrData, pSeparatorDate, bHasHours, pSeparatorTime )
{
pstrData = String ( pstrData );
pSeparatorDate = isNull ( pSeparatorDate, "/" );
bHasHours = isNull ( bHasHours, false );
pSeparatorTime = isNull ( pSeparatorTime, ":" );
if ( pstrData == "" )
return "";
var tmpDate = "";
var tmpTime = "";
if ( bHasHours )
{
var arrArray = pstrData.split( " " );
tmpDate = arrArray[0];
tmpTime = arrArray[1];
}
else
{
tmpDate = pstrData;
}
var arrDate = tmpDate.split( pSeparatorDate );
var objNewDate = new Date();
objNewDate.setFullYear(Number(arrDate[2]));
objNewDate.setMonth(Number(arrDate[1]) - 1);
objNewDate.setDate(Number(arrDate[0]));
objNewDate.setDate(Number(arrDate[0]));
objNewDate.setMonth(Number(arrDate[1]) - 1);
objNewDate.setFullYear(Number(arrDate[2]));
if (bHasHours)
{
var arrTime = tmpTime.split( pSeparatorTime );
objNewDate.setHours ( Number ( arrTime[0] ) );
objNewDate.setMinutes ( Number ( arrTime[1] ) );
}
return objNewDate;
}
function fnFormatObjDateToSQLDate ( pObjDate )
{
pObjDate = isNull ( pObjDate, new Date() );
pObjDate = new Date ( pObjDate );
var szData = pObjDate.getFullYear() + "-" + fnAddZero ( pObjDate.getMonth() + 1 ) + "-" + fnAddZero ( pObjDate.getDate() ) + " " + fnAddZero ( pObjDate.getHours() ) + ":" + fnAddZero ( pObjDate.getMinutes() ) + ":" + fnAddZero ( pObjDate.getSeconds() );
return szData;
}
function fnFormatObjDateToMDBDate ( pObjDate, pintDigit )
{
pintDigit = isNull ( pintDigit, 8 );
pObjDate = isNull ( pObjDate, new Date() );
pObjDate = new Date ( pObjDate );
var szData = pObjDate.getFullYear() + "" + fnAddZero ( pObjDate.getMonth() + 1 ) + "" + fnAddZero ( pObjDate.getDate() );
if ( pintDigit > 8 ) szData += "" + fnAddZero ( pObjDate.getHours() );
if ( pintDigit > 10 ) szData += "" + fnAddZero ( pObjDate.getMinutes() );
if ( pintDigit > 12 ) szData += "" + fnAddZero ( pObjDate.getSeconds() );
return szData;
}
function fnCompareTwoDate ( pobjDateSmall, pobjDateBig, pstrMessage )
{
if ( pobjDateSmall > pobjDateBig )
{
if ( ( pstrMessage == null ) || ( pstrMessage == false ) )
ShowCheckError ( 1 );
else
ShowCheckError ( pstrMessage );
return false;
}
return true;
}
function fnImmagine ( pstrIMG )
{
var strOUT = " <tr>"
+ " <td>"
+ " <table border=0 cellpadding=0 cellspacing=0 width=100% >"
+ " <tr>"
+ " <td><img src=images/border_sx_up.gif border=0></td>"
+ " <td width=99% background=images/bkg_border_oriz.gif ><img src=images/dummy.gif width=1 height=1 border=0></td>"
+ " <td><img src=images/border_dx_up.gif border=0></td>"
+ " </tr>"
+ " <tr>"
+ " <td background=images/bkg_border_vert.gif ><img src=images/dummy.gif border=0></td>"
+ " <td><img src='images/" + pstrIMG + "' border=0></td>"
+ " <td background=images/bkg_border_vert.gif ><img src=images/dummy.gif border=0></td>"
+ " </tr>"
+ " <tr>"
+ " <td><img src=images/border_sx_down.gif border=0></td>"
+ " <td background=images/bkg_border_oriz.gif ><img src=images/dummy.gif width=1 height=1 border=0></td>"
+ " <td><img src=images/border_dx_down.gif border=0></td>"
+ " </tr>"
+ " </table>"
+ " </td>"
+ " </tr>"
+ " <tr><td><img src=images/dummy.gif width=1 height=6 border=0></td></tr>";
document.write(strOUT);
}
function fnDivideStr ( pstrText, pintNumChar )
{
pintNumChar = isNull ( pintNumChar, 40 );
var arrText = new Array();
var jj = 0;
var xx = 0;
var strTmp = "";
arrText = pstrText.split ( " " );
pstrText = "";
for ( jj = 0; jj < arrText.length; jj++ )
{
if ( arrText[jj].length > pintNumChar )
{
strTmp = "";
xx = 0;
while ( xx < arrText[jj].length )
{
if ( xx > 0 ) { strTmp += " "; }
strTmp += arrText[jj].substring ( xx, xx + pintNumChar );
xx += pintNumChar;
}
arrText[jj] = strTmp;
}
if ( jj > 0 ) { pstrText += " "; }
pstrText += arrText[jj];
}
return pstrText;
}
function fnFormatTextAreaForDisplay(pstrValue)
{
pstrValue = escape(pstrValue);
pstrValue = pstrValue.replace(/%0D%0A/gi, "%3Cbr%20/%3E"); // sostituisco gli a capo con <br /> per PC
pstrValue = pstrValue.replace(/%0A/gi, "%3Cbr%20/%3E"); // sostituisco gli a capo con <br /> per MAC
pstrValue = unescape(pstrValue);
return pstrValue;
}
function removeCDATAtag(pstrText)
{
pstrText = pstrText.replace(/<!\[CDATA\[/, "");
pstrText = pstrText.replace(/\]\]>/, "");
return pstrText;
}
function appendCDATAtag(pstrText)
{
return "<![CDATA[" + pstrText + "]]>";
}
function fnStrDateFromObjDate ( pObjDate, pStrSeparator, pBoolCanBeNull )
{
var vDay;
var vMonth;
var vYear;
pStrSeparator = isNull ( pStrSeparator, "/" );
pBoolCanBeNull = isNull ( pBoolCanBeNull, false );
var strDATE = "";
if ( ( isNull ( pObjDate, "" ) == "" ) && pBoolCanBeNull )
return strDATE;
pObjDate = isNull ( pObjDate, new Date() );
pObjDate = new Date ( pObjDate );
vDay = fnAddZero ( pObjDate.getDate() );
vMonth = fnAddZero ( pObjDate.getMonth() + 1 );
vYear = pObjDate.getFullYear();
strDATE = vDay + pStrSeparator + vMonth + pStrSeparator + vYear;
return strDATE;
}
function setCheckedValue(radioObj, newValue) {
if(!radioObj)
return;
var radioLength = radioObj.length;
if(radioLength == undefined) {
radioObj.checked = (radioObj.value == newValue.toString());
return;
}
for(var i = 0; i < radioLength; i++) {
radioObj[i].checked = false;
if(radioObj[i].value == newValue.toString()) {
radioObj[i].checked = true;
}
}
}
function formatMoneyEuro(szMoney)
{
booNegative = Number(szMoney) < 0;
if (booNegative)
szMoney = Number(szMoney) * -1;
//numMoney = szMoney * 100;
numMoney = szMoney;
numMoney = Math.round(numMoney);
szMoney = String(numMoney);
var decSep = ",";
var touSep = ".";
var szMoneyLen = szMoney.length;
var szMoneyDec = szMoney.substring(szMoneyLen - 2, szMoneyLen);
szMoney = szMoney.substring(0, szMoneyLen - 2);
szMoneyDec = "00" + szMoneyDec;
szMoneyDec = szMoneyDec.slice(-2);
if (szMoney == "0" || szMoney == "")
return ((booNegative ? "-" : "") + "0" + decSep + szMoneyDec);
szMoneyLen = szMoney.length;
var retMoney = "";
var i = 0;
var tempStr;
var nLoop = Math.floor(szMoneyLen / 3);
tempIniStr = 0
tempFinStr = szMoneyLen - (nLoop * 3);
if (tempFinStr == 0)
{
nLoop -= 1;
tempFinStr = szMoneyLen - (nLoop * 3);
}
tempStr = szMoney.substring(tempIniStr, tempFinStr);
retMoney = tempStr
for (i = nLoop; i > 0; i--)
{
tempIniStr = szMoneyLen - (i * 3);
tempFinStr = szMoneyLen - ((i - 1) * 3);
tempStr=szMoney.substring(tempIniStr, tempFinStr);
retMoney = retMoney + touSep + tempStr;
}
retMoney = retMoney + decSep + szMoneyDec;
return (booNegative ? "-" : "") + retMoney
}
//-->