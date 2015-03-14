/javascript" language="javascript">
	var cntPopWindow = 0;
	function removePopWindow(id) {
	//$('#'+id).fadeOut(200, function() {var myPopWindow = $('#'+id).remove();})
	var myPopWindow = $('#'+id).remove();
	//var myPopWindow = $('#'+id).detach();
	}
	function createPopWindow(W, H, ajaxType, ajaxUrl, ajaxData, isIframe, isImage) {
	if (isIframe) {
	var $PopWindow = $(getBlankPopWindow(W, H, ajaxUrl, ajaxData)).appendTo("body");
	} else {
	var $PopWindow = $(getBlankPopWindow(W, H)).appendTo("body");
	}
	var winH = ($(window).height() / 2) - ($PopWindow.height() / 2) + $(window).scrollTop();
	var winW = $(window).width() / 2 - $PopWindow.width() / 2;
	if (Number(winH) < 10) { winH = 10; }
	if (Number(winW) < 10) { winW = 10; }
	$PopWindow.css('position', 'absolute');
	$PopWindow.css('top', winH);
	$PopWindow.css('left', winW);
	//$('#PopWindow'+cntPopWindow).maxZIndex({ inc: 10 });
	$PopWindow.maxZIndex();
	if (isImage) {
	$('#PopWindowContent' + cntPopWindow).html('<img src="' + ajaxUrl + '" width="' + W + '" height="' + H + '" alt="" />');
	} else if (!isIframe) {
	if (ajaxType) {
	$.ajax({
	type: ajaxType,
	url: ajaxUrl,
	data: ajaxData,
	success: function(returnText) {
	$('#PopWindowContent' + cntPopWindow).html(returnText);
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
	$("#divContenIN").html(XMLHttpRequest);
	}
	});
	}
	}
	$PopWindow.draggable({
	addClasses: false,
	//cursor: 'crosshair',
	//opacity: 0.35,
	handle: '#PopWindowDragArea'
	});
	return "#PopWindowContent" + cntPopWindow;
	}
	function getBlankPopWindow(W, H, URL, QUERYSTRINGDATA) {
	var tsW = 15;
	var tdW = 75;
	var tH = 36;
	var cW = 10;
	var bW = 15;
	var bH = 14;
	var cTotW = W + cW + cW;
	cntPopWindow++;
	var htmPopWindow = "<div id=\"PopWindow" + cntPopWindow + "\" style=\"width:" + cTotW + "px;\">"
	+ " <div class=\"PopWindowTsx\"></div>"
	+ " <div class=\"PopWindowT\" style=\"width:" + (cTotW - tsW - tdW) + "px;\"></div>"
	+ " <div class=\"PopWindowTdx\">"
	+ " <div id=\"PopWindowDragArea\" class=\"PopWindow-btnDrag\"><img src=\"images/PopWindow-btnDrag.gif\" width=\"20\" height=\"20\" alt=\"\" /></div>"
	+ " <div id=\"PopWindow-btnClose\" class=\"PopWindow-btnX\"><a href=\"javascript:removePopWindow('PopWindow" + cntPopWindow + "');\"><img src=\"images/PopWindow-btnX.gif\" width=\"20\" height=\"20\" alt=\"\" border=\"0\" /></a></div>"
	+ " </div>"
	+ " <div class=\"PopWindowClearBoth\"></div>"
	+ " <div class=\"PopWindowCsx\" style=\"height:" + H + "px;\"></div>";
	if (URL) {
	htmPopWindow += " <div id=\"PopWindowContent" + cntPopWindow + "\" class=\"PopWindowC\" style=\"width:" + W + "px; height:" + H + "px;\"><iframe src=\"" + URL + "?IDPopWindow=PopWindow" + cntPopWindow + "&" + QUERYSTRINGDATA + "\" style=\"height:" + H + "px; width:" + W + "px; margin:0;\" frameborder=\"0\"></iframe></div>"
	} else {
	htmPopWindow += " <div id=\"PopWindowContent" + cntPopWindow + "\" class=\"PopWindowC\" style=\"width:" + W + "px; height:" + H + "px;\"></div>"
	}
	htmPopWindow += " <div class=\"PopWindowCdx\" style=\"height:" + H + "px\"></div>"
	+ " <div class=\"PopWindowClearBoth\"></div>"
	+ " <div class=\"PopWindowBsx\"></div>"
	+ " <div class=\"PopWindowB\" style=\"width:" + (cTotW - bW - bW) + "px;\"></div>"
	+ " <div class=\"PopWindowBdx\"></div>"
	+ " <div class=\"PopWindowClearBoth\"></div>"
	+ "</div>";
	return htmPopWindow;
	}
	$.maxZIndex = $.fn.maxZIndex = function(opt) {
	/// <summary>
	/// Returns the max zOrder in the document (no parameter)
	/// Sets max zOrder by passing a non-zero number
	/// which gets added to the highest zOrder.
	/// </summary>
	/// <param name="opt" type="object">
	/// inc: increment value,
	/// group: selector for zIndex elements to find max for
	/// </param>
	/// <returns type="jQuery" />
	var def = { inc: 10, group: "*" };
	$.extend(def, opt);
	var zmax = 0;
	$(def.group).each(function() {
	var cur = parseInt($(this).css('z-index'));
	zmax = cur > zmax ? cur : zmax;
	});
	if (!this.jquery)
	return zmax;
	return this.each(function() {
	zmax += def.inc;
	$(this).css("z-index", zmax);
	});
}
</script>