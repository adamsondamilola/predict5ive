 <!DOCTYPE html>
        <html lang="en-US">
              <head>

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
                <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->
                <meta name="format-detection" content="date=no"> <!-- disable auto date linking in iOS 7-9 -->
                <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS 7-9 -->
                <title>Message</title>

        <style type="text/css">
              body {
                margin: 0;
                padding: 0;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
              }
              table {
                border-spacing: 0;
              }
              table td {
                border-collapse: collapse;
              }
              .ExternalClass {
                width: 100%;
              }
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
                line-height: 100%;
              }
              .ReadMsgBody {
                width: 100%;
                background-color: #ebebeb;
              }
              table {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
              }
              img {
                -ms-interpolation-mode: bicubic;
              }
              .yshortcuts a {
                border-bottom: none !important;
              }
              @media screen and (max-width: 599px) {
                .force-row,
                .container {
                  width: 100% !important;
                  max-width: 100% !important;
                }
              }
              @media screen and (max-width: 400px) {
                .container-padding {
                  padding-left: 12px !important;
                  padding-right: 12px !important;
                }
              }
              .ios-footer a {
                color: #aaaaaa !important;
                text-decoration: underline;
              }
              .button {
          background-color: #4CAF50;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
            }
              a[href^="x-apple-data-detectors:"],
              a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
              }
              </style>
        </head>

        <body style="margin:0; padding:0;" bgcolor="#F0F0F0" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">

        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#F0F0F0">
        <tr><td align="center" valign="top" bgcolor="#F0F0F0" style="background-color: #F0F0F0;">
        <br><table border="0" width="600" cellpadding="0" cellspacing="0" class="container" style="width:600px;max-width:600px">
        <tr><td class="container-padding header" align="left" style="font-family:Helvetica, Arial, sans-serif;font-size:24px;font-weight:bold;padding-bottom:12px;color:#999;padding-left:24px;padding-right:24px">
            {{$messageTitle}}</td></tr>
        <tr><td class="container-padding content" align="left" style="padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:12px;background-color:#ffffff">
                          <br><div class="title" style="font-family:Helvetica, Arial, sans-serif;font-size:18px;font-weight:600;color:#374550">{{$companyName}}</div><br>
        <div class="body-text" style="font-family:Helvetica, Arial, sans-serif;font-size:14px;line-height:20px;text-align:left;color:#333333">
        {!! $messageBody !!}
        </div></td></tr>
        <tr><td class="container-padding footer-text" align="left" style="font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:16px;color:#aaaaaa;padding-left:24px;padding-right:24px"><br><br>All rights reserved: © {{$companyName}}.
        <br><br>
        You are receiving this email because you opted in on our website. Update your <a href="{{$unsubscribe_url}}" style="color:#aaaaaa">email preferences</a> or <a href="{{$unsubscribe_url}}" style="color:#aaaaaa">unsubscribe</a>.
        <br><br>
        <strong>{{$companyName}}</strong><br>
        <a href="{{$companyWebsite}}" style="color:#aaaaaa">{{$companyWebsite}}</a><br>
        <br><br>
        </td></tr>
        </table>
        </td></tr>
        </table>
        </body></html>
