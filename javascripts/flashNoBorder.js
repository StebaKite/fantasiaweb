function drawFlashPlayer(iWidth, iHeight, szURL)
{
document.write (
"<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width=" + iWidth + " height=" + iHeight + " codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab'>" +
"<param name='movie' value=\"" + szURL + "\" />" +
"<param name='wmode' value='transparent' />" +
"<param name='menu' value='false' />" +
"<param name='quality' value='high' />" +
"<param name='scale' value='noscale' />" +
"<embed src=\"" + szURL + "\" wmode='transparent' menu='false' quality='high' scale='noscale' width='" + iWidth + "' height='" + iHeight + "' quality='high' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'><\/embed>" +
"<\/object>"
);
}