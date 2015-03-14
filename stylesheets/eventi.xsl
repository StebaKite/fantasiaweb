<?xml version="1.0" encoding="ISO-8859-1"?>

<!-- This Stylesheet work fine in IE only (msxsl:script is a microsoft implementation!) -->

<xsl:stylesheet version="1.0"
       xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
       xmlns:msxsl="urn:schemas-microsoft-com:xslt"
       xmlns:user="user"
       exclude-result-prefixes="msxsl user">

	<msxsl:script language="JavaScript" implements-prefix="user">
		function filterEventi(testo,data) {
			var today = new Date();
			var expDate = new Date();
	
			var yyyy = data.substring(0,4);
			var mm   = data.substring(5,7) - 1;
			var gg   = data.substring(8,10);
	
			expDate.setFullYear(yyyy,mm,gg);
	
			if (today > expDate) {
				testo = " ";
			}
			return testo;
		}
	</msxsl:script>

	<xsl:template match="/">
		<html>
	    	<body>
				<xsl:for-each select="eventi/evento">
					<xsl:variable name="element" select="user:filterEventi(string(text),string(end))"></xsl:variable>
					<xsl:if test="$element!=' '">
						<xsl:value-of select="$element"/>
						<hr/>
			      	</xsl:if>
		  		</xsl:for-each>			
			</body>
		</html> 
	</xsl:template>
</xsl:stylesheet>