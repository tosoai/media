<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Received: KES {{ $amount }} top-up</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&display=swap" rel="stylesheet">
<style>
  body{margin:0;padding:0;background:#f5f3ee;-webkit-text-size-adjust:100%;}
  a{color:#6e5bff;}
  @media (max-width:620px){
    .card{padding:28px 22px !important;border-radius:18px !important;}
    .wrap{padding:20px 12px !important;}
    h1{font-size:28px !important;}
  }
</style>
</head>
<body style="margin:0;padding:0;background:#f5f3ee;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">{{ $credits }} credits added. Your new balance is {{ $balance }} credits.&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f3ee" style="background:#f5f3ee;">
<tr><td align="center" class="wrap" style="padding:36px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
    <tr><td style="padding:0 6px 22px;">
      <a href="https://www.tosoai.org" target="_blank"><img src="https://tosoai.github.io/media/email/toso-logo.png" width="104" height="28" alt="Toso" style="display:block;border:0;width:104px;height:auto;"></a>
    </td></tr>
    <tr><td class="card" bgcolor="#ffffff" style="background:#ffffff;border:1px solid #e6e2d9;border-radius:22px;padding:40px 40px 36px;">
      <p style="margin:0px 0 0;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:0.12em;line-height:1.55;color:#6e5bff;">M-PESA TOP-UP</p><h1 style="margin:10px 0 0;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:44px;line-height:1.05;font-weight:800;letter-spacing:-0.03em;color:#0a0a11;">KES {{ $amount }}</h1><p style="margin:12px 0 0;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;color:#55555f;">Thanks, {{ $name }}. Your credits are ready to use.</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 0;"><tr><td style="padding:12px 0;border-top:1px solid #e6e2d9;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#55555f;">Credits added</td>
<td align="right" style="padding:12px 0;border-top:1px solid #e6e2d9;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:800;color:#0a0a11;">{{ $credits }}</td></tr><tr><td style="padding:12px 0;border-top:1px solid #e6e2d9;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#55555f;">New balance</td>
<td align="right" style="padding:12px 0;border-top:1px solid #e6e2d9;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:800;color:#0a0a11;">{{ $balance }} credits</td></tr><tr><td style="padding:12px 0;border-top:1px solid #e6e2d9;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#55555f;">M-Pesa reference</td>
<td align="right" style="padding:12px 0;border-top:1px solid #e6e2d9;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#0a0a11;">{{ $reference }}</td></tr><tr><td style="padding:12px 0;border-top:1px solid #e6e2d9;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#55555f;">Paid from</td>
<td align="right" style="padding:12px 0;border-top:1px solid #e6e2d9;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#0a0a11;">{{ $phone }}</td></tr><tr><td style="padding:12px 0;border-top:1px solid #e6e2d9;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#55555f;">Date</td>
<td align="right" style="padding:12px 0;border-top:1px solid #e6e2d9;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#0a0a11;">{{ $date }}</td></tr><tr><td colspan="2" style="border-top:1px solid #e6e2d9;font-size:0;line-height:0;">&nbsp;</td></tr></table><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 8px;">
  <tr><td bgcolor="#0a0a11" style="border-radius:14px;">
    <a href="{{ $url }}" target="_blank" style="display:inline-block;padding:16px 28px;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;font-weight:800;line-height:20px;color:#ffffff;text-decoration:none;border-radius:14px;">Back to Toso&nbsp;&nbsp;<span style="color:#6e5bff;">&#9632;</span></a>
  </td></tr></table>
    </td></tr>
    <tr><td style="padding:22px 6px 0;font-family:'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#8a8a93;">
      Keep this email as your receipt. You only pay for what you make.<br>
      Questions? Just reply to this email.<br><br>
      <strong style="color:#0a0a11;">Toso</strong> &middot; Pay for the work, not the month &middot; Built in Nairobi<br>
      <a href="https://www.tosoai.org" style="color:#8a8a93;">tosoai.org</a>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>