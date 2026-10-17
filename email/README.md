# Toso transactional emails

Four emails on one layout: verify, reset, welcome, receipt. Email-safe tables, inline styles, 560px card, works at 390px.

- `blade/*.blade.php`: drop into `resources/views/emails/` in the API.
- `preview/*.html`: filled with sample data. `screens/` has phone and desktop renders.
- `toso-logo.png`: served from `https://tosoai.github.io/media/email/toso-logo.png` (PNG because Gmail and Outlook block SVG).
- `build.py`: regenerates all of the above. Edit copy there, not in the Blade files.

## Variables

| View | Variables | Subject |
|---|---|---|
| verify | `$name`, `$url` | Confirm your email to start |
| reset | `$name`, `$url` | Reset your Toso password |
| welcome | `$name`, `$credits`, `$url` | Your first deck is on us |
| receipt | `$name`, `$amount`, `$credits`, `$balance`, `$reference`, `$phone` (masked), `$date`, `$url` | Received: KES {amount} top-up |

## Wiring (Laravel)
- Verify: `VerifyEmail::toMailUsing(fn ($user, $url) => (new MailMessage)->subject('Confirm your email to start')->view('emails.verify', ['name' => $user->first_name, 'url' => $url]));` in `AppServiceProvider::boot()`.
- Reset: `ResetPassword::toMailUsing(...)` the same way; build the URL from `FRONTEND_URL`.
- Welcome: queue after email verification (the `Verified` event), not at sign-up, so people only get it once they're in.
- Receipt: send from the top-up success path after crediting, queued, once per payment (idempotent with the credit).
- Sender: `MAIL_FROM_ADDRESS=hello@tosoai.org`, `MAIL_FROM_NAME=Toso`, reply-to `tosoai@outlook.com`.
- Mask the phone as `0712 *** 678`. Never put the full number or any token other than the link in an email.
