<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  exclude-result-prefixes="xlink" version="1.0">
  <xsl:output method="html" />

  <xsl:template match="*[@xlink:type = 'simple' and @xlink:href]">
  	<table style="border-collapse:collapse; cellpadding:0; cellspacing:0;">
  		<tbody>
  			<tr>
  				<td>
				    <a class="download" href="{@xlink:href}">
						<img width="40" height="40" alt="" src="/images/PDF-Icon.gif"></img>
				    </a>
  				</td>
  				<td style="padding:15 0 0 0;">
	  				<span style="font-size:13px;" class="TViag"><xsl:apply-templates /></span>			      	
  				</td>
  			</tr>
  		</tbody>
  	</table>
    <br/>
  </xsl:template>

  <xsl:template match="reserved">
    <html>
		<head>
			<link rel="stylesheet" type="text/css" href="/stylesheets/global.css" />
		</head>
		<body class="bodyIframe">
        	<xsl:apply-templates />
		</body>
    </html>
  </xsl:template>

</xsl:stylesheet>