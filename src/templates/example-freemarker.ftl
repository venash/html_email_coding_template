<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
      xml:lang="cs"
      lang="cs">

<head>
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="format-detection" content="date=no"/>
    <meta name="format-detection" content="address=no"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="x-apple-disable-message-reformatting"/>

    <title>Exmaple of freemarker usage</title>

    <link rel="stylesheet" type="text/css" href="styles/style.css">

    <!--[if gte mso 9]>
    <style type="text/css" media="all">
        sup {
            font-size: 100% !important;
        }
    </style>
    <![endif]-->

    <style data-embed>
        * {
            margin: 0;
            mso-line-height-rule: exactly;
            line-height: inherit;
        }

        .mcnPreviewText {
            display: none !important;
        }

        .ExternalClass * {
            width: 100%;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
            mso-line-height-rule: exactly;
            line-height: 100%;
        }

        a,
        a:link,
        a:visited {
            text-decoration: underline;
        }

        a:hover {
            text-decoration: underline;
        }

        p.MsoNormal {
            margin: 0px;
        }

        .ExternalClass a:visited,
        .ExternalClass span.ecxMsoHyperlinkFollowed {
            color: #ffffff;
            text-decoration: none;
        }

        span.MsoHyperlink {
            mso-style-priority: 99;
            color: inherit;
        }

        span.MsoHyperlinkFollowed {
            mso-style-priority: 99;
            color: inherit;
        }

        a[x-apple-data-detectors=true] {
            color: inherit !important;
            text-decoration: none !important;
        }
    </style>

    <style>
        .email-wrapper-width {
            width: 600px;
        }

        .email-wrapper-max-width {
            width: 600px;
        }

        .my-profile-picture {
            width: 40px;
            height: 40px;
        }
    </style>
</head>
<body>

<outlook-only-start/>
<table cellpadding="0" border="0" width="650" align="center" class="table-reset">
    <tr>
        <td>
            <outlook-only-end/>


            <table class="table-reset">
                <tr>
                    <td>
                        <table class="table-reset email-wrapper-width bg-white" align="center">
                            <tr>
                                <td>
                                    <!-- MAIN PART -->

                                    @@include('./../parts/header.html')

                                    <table width="100%" class="table-reset bg-white">
                                        <tr class="break16">
                                            <td>&nbsp;</td>
                                        </tr>
                                    </table>

                                    <table width="100%" class="table-reset bg-white">
                                        <tr>
                                            <td width="15"></td>
                                            <td>
                                                <p class="font">This email use rly cool tempalte engine <strong>${templateEngine}</strong></p>
                                                <br>
                                                <p class="font">Study here <a href="${url}" target="_blank" class="font cl-green"><span class="cl-green">${url}</span></a></p>
                                            </td>
                                            <td width="15"></td>
                                        </tr>
                                    </table>

                                    <table width="100%" class="table-reset bg-white">
                                        <tr class="break20">
                                            <td>&nbsp;</td>
                                        </tr>
                                    </table>
                                    <table width="100%" class="table-reset bg-white">
                                        <tr class="break8">
                                            <td>&nbsp;</td>
                                        </tr>
                                    </table>

                                    <#if highlights??>
                                    <table width="100%" class="table-reset bg-white">
                                        <tr>
                                            <td width="15"></td>
                                            <td>
                                                <p class="font font-size-16"><strong>Advantages:</strong><br/></p>
                                                <#list highlights as adv>
                                                <p class="font font-size-14">
                                                    ${adv}
                                                    <br/><br/>
                                                </p>
                                                </#list>
                                            </td>
                                            <td width="15"></td>
                                        </tr>
                                    </table>
                                    </#if>

                                    <table width="100%" class="table-reset bg-white">
                                        <tr class="break12">
                                            <td class="delimeter">&nbsp;</td>
                                        </tr>
                                    </table>

                                    <!-- ./MAIN PART -->
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>


            <outlook-only-start/>
        </td>
    </tr>
</table>
<outlook-only-end/>

</body>
</html>
