"""Toso transactional emails: one layout, four messages.
Writes Blade views (for Laravel) and filled preview HTML (for checking)."""
import re, pathlib, html

OUT_BLADE = pathlib.Path('/home/claude/media/email/blade')
OUT_PREV = pathlib.Path('/home/claude/media/email/preview')
LOGO = 'https://tosoai.github.io/media/email/toso-logo.png'

PAPER, NIGHT, VIOLET, INK2, LINE, CARD = '#f5f3ee', '#0a0a11', '#6e5bff', '#55555f', '#e6e2d9', '#ffffff'
FONT = "'Manrope','Segoe UI',Roboto,Helvetica,Arial,sans-serif"

def stop(text):
    """Headline with the brand's violet full stop."""
    return f'{text}<span style="color:{VIOLET};">.</span>'

def button(label, href):
    return f'''<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 8px;">
  <tr><td bgcolor="{NIGHT}" style="border-radius:14px;">
    <a href="{href}" target="_blank" style="display:inline-block;padding:16px 28px;font-family:{FONT};font-size:16px;font-weight:800;line-height:20px;color:#ffffff;text-decoration:none;border-radius:14px;">{label}&nbsp;&nbsp;<span style="color:{VIOLET};">&#9632;</span></a>
  </td></tr></table>'''

def p(text, size=16, color=INK2, mt=14):
    return f'<p style="margin:{mt}px 0 0;font-family:{FONT};font-size:{size}px;line-height:1.55;color:{color};">{text}</p>'

def h1(text):
    return f'<h1 style="margin:0;font-family:{FONT};font-size:32px;line-height:1.12;font-weight:800;letter-spacing:-0.02em;color:{NIGHT};">{stop(text)}</h1>'

def fallback(href):
    return p(f'Button not working? Paste this into your browser:<br><a href="{href}" style="color:{VIOLET};word-break:break-all;">{href}</a>', 13, '#8a8a93', 22)

def layout(subject, preheader, body, footnote):
    return f'''<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>{subject}</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&display=swap" rel="stylesheet">
<style>
  body{{margin:0;padding:0;background:{PAPER};-webkit-text-size-adjust:100%;}}
  a{{color:{VIOLET};}}
  @media (max-width:620px){{
    .card{{padding:28px 22px !important;border-radius:18px !important;}}
    .wrap{{padding:20px 12px !important;}}
    h1{{font-size:28px !important;}}
  }}
</style>
</head>
<body style="margin:0;padding:0;background:{PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">{preheader}&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{PAPER}" style="background:{PAPER};">
<tr><td align="center" class="wrap" style="padding:36px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
    <tr><td style="padding:0 6px 22px;">
      <a href="https://www.tosoai.org" target="_blank"><img src="{LOGO}" width="104" height="28" alt="Toso" style="display:block;border:0;width:104px;height:auto;"></a>
    </td></tr>
    <tr><td class="card" bgcolor="{CARD}" style="background:{CARD};border:1px solid {LINE};border-radius:22px;padding:40px 40px 36px;">
      {body}
    </td></tr>
    <tr><td style="padding:22px 6px 0;font-family:{FONT};font-size:12px;line-height:1.6;color:#8a8a93;">
      {footnote}<br>
      Questions? Just reply to this email.<br><br>
      <strong style="color:{NIGHT};">Toso</strong> &middot; Pay for the work, not the month<br>
      <a href="https://www.tosoai.org" style="color:#8a8a93;">tosoai.org</a>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>'''

# ---- the four emails. {{var}} placeholders become {{ $var }} in Blade. ----
def row(k, v, strong=False):
    w = 800 if strong else 600
    return f'''<tr><td style="padding:12px 0;border-top:1px solid {LINE};font-family:{FONT};font-size:14px;color:{INK2};">{k}</td>
<td align="right" style="padding:12px 0;border-top:1px solid {LINE};font-family:{FONT};font-size:14px;font-weight:{w};color:{NIGHT};">{v}</td></tr>'''

def example(title, price):
    return f'''<tr><td width="14" valign="top" style="padding:13px 0 0;"><div style="width:8px;height:8px;background:{VIOLET};"></div></td>
<td style="padding:8px 0;font-family:{FONT};font-size:15px;line-height:1.45;color:{NIGHT};font-weight:600;">{title}</td>
<td align="right" valign="top" style="padding:10px 0 8px 12px;font-family:{FONT};font-size:14px;color:{INK2};white-space:nowrap;">{price}</td></tr>'''

EMAILS = {
 'verify': dict(
   subject='Confirm your email to start',
   preheader='One tap and your first deck is on us.',
   body=h1('One tap and you&#8217;re in')
     + p('Hi {{name}}, confirm this is your email and we&#8217;ll take you straight to Toso. Your first deck is on us.', mt=16)
     + button('Confirm my email', '{{url}}')
     + p('This link works for 60 minutes.', 13, '#8a8a93', 16)
     + fallback('{{url}}'),
   footnote='Didn&#8217;t sign up for Toso? You can ignore this email; nothing happens without the tap.'),
 'reset': dict(
   subject='Reset your Toso password',
   preheader='Choose a new password in one step.',
   body=h1('Let&#8217;s get you back in')
     + p('Hi {{name}}, tap below to choose a new password.', mt=16)
     + button('Choose a new password', '{{url}}')
     + p('The link works once and expires in 60 minutes.', 13, '#8a8a93', 16)
     + fallback('{{url}}'),
   footnote='Didn&#8217;t ask for this? Your password hasn&#8217;t changed and you can ignore this email.'),
 'welcome': dict(
   subject='Your first deck is on us',
   preheader='70 free credits are in your account. Say what you need, get the file.',
   body=h1('Say it. Get the file')
     + p('Welcome, {{name}}. Tell Toso what you need in one line and download a finished file you can open in PowerPoint, Word or Excel.', mt=16)
     + f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 4px;">'
       + example('A deck for Monday&#8217;s meeting', 'from KES 20')
       + example('A CV tailored to the job advert', 'from KES 5')
       + example('A chama sheet where every shilling balances', 'from KES 5')
       + '</table>'
     + f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 0;"><tr><td bgcolor="{PAPER}" style="background:{PAPER};border-radius:14px;padding:16px 18px;font-family:{FONT};font-size:14px;line-height:1.5;color:{NIGHT};"><strong>{{{{credits}}}} free credits</strong> are in your account, enough for your first deck. When you need more, top up with M-Pesa from KES 20. No card, no subscription.</td></tr></table>'
     + button('Make something', '{{url}}'),
   footnote='You&#8217;re getting this because you created a Toso account.'),
 'receipt': dict(
   subject='Received: KES {{amount}} top-up',
   preheader='{{credits}} credits added. Your new balance is {{balance}} credits.',
   body=p('M-PESA TOP-UP', 12, VIOLET, 0).replace('font-size:12px;', 'font-size:12px;font-weight:800;letter-spacing:0.12em;')
     + f'<h1 style="margin:10px 0 0;font-family:{FONT};font-size:44px;line-height:1.05;font-weight:800;letter-spacing:-0.03em;color:{NIGHT};">KES {{{{amount}}}}</h1>'
     + p('Thanks, {{name}}. Your credits are ready to use.', mt=12)
     + f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 0;">'
       + row('Credits added', '{{credits}}', True)
       + row('New balance', '{{balance}} credits', True)
       + row('M-Pesa reference', '{{reference}}')
       + row('Paid from', '{{phone}}')
       + row('Date', '{{date}}')
       + f'<tr><td colspan="2" style="border-top:1px solid {LINE};font-size:0;line-height:0;">&nbsp;</td></tr></table>'
     + button('Back to Toso', '{{url}}'),
   footnote='Keep this email as your receipt. You only pay for what you make.'),
}

SAMPLE = dict(name='Wanjiru', url='https://www.tosoai.org/verify/9f2c41e7a0b3?signature=4be1c0', credits='70',
              amount='100', balance='230', reference='TJK7Q2M9XA', phone='0712 *** 678', date='17 Oct 2026, 4:58pm')
RECEIPT_SAMPLE = dict(SAMPLE, credits='200', url='https://www.tosoai.org')

OUT_BLADE.mkdir(parents=True, exist_ok=True); OUT_PREV.mkdir(parents=True, exist_ok=True)
for key, e in EMAILS.items():
    doc = layout(e['subject'], e['preheader'], e['body'], e['footnote'])
    blade = re.sub(r'\{\{(\w+)\}\}', r'{{ $\1 }}', doc)
    (OUT_BLADE / f'{key}.blade.php').write_text(blade)
    s = RECEIPT_SAMPLE if key == 'receipt' else (dict(SAMPLE, url='https://www.tosoai.org') if key == 'welcome' else (dict(SAMPLE, url='https://www.tosoai.org/reset-password/8c1d0e?email=wanjiru%40example.com') if key == 'reset' else SAMPLE))
    prev = re.sub(r'\{\{(\w+)\}\}', lambda m: html.escape(s[m.group(1)]), doc)
    (OUT_PREV / f'{key}.html').write_text(prev)
    print(key, 'subject:', re.sub(r'\{\{(\w+)\}\}', lambda m: s[m.group(1)], e['subject']))
