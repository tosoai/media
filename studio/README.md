# Toso ad studio

The Remotion project behind Toso's TikTok and Reels ads. Stills from Higgsfield, everything else in code.

## Run it
```
cd studio && npm install
# put the stills in public/ (see ads.json for names and Higgsfield job IDs)
npx remotion render src/index.ts Ad1 out/ad1.mp4 --codec=h264 --crf=20 \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell
```
Check frames before posting: `npx remotion still src/index.ts Ad1 out/f.png --frame=30`.

## Files
- `src/Kit.tsx`: the building blocks. Still (slow push-in), Punch (big slam-in type), Flash, Notification, Typing, FileOpen, Pay, EndCard (pixels resolve into TOSO., violet stop drops on the beat).
- `src/Ad1.tsx`, `src/Ads23.tsx`: the three episodes. Copy one to make a new episode.
- `public/sfx/bed.wav`: original gospel-house bed, 120 BPM, A-flat, drop at frame 480. Regenerate or vary with `music/compose.py` (needs fluidsynth and FluidR3_GM.sf2).
- `public/sfx/`: ping, tick, chime.

## The episode template (18.5 s, 30 fps, 555 frames, every cut on a beat = 15 frames)
| Frames | Shot | Type |
|---|---|---|
| 0–45 | phone over shoulder + notification | the time, huge, pixel font |
| 45–90 | the character, worried | the problem in 2–4 words |
| 90–135 | detail (clock, hands, notebook) | the countdown |
| 135–255 | typing the request into Toso | "One line." |
| 255–315 | the file opens | "Done." |
| 315–375 | the character, relieved + flash | the win + the time |
| 375–420 | M-Pesa prompt | "KES 20" / "KES 5", "That's it." |
| 420–480 | the payoff scene | the human payoff |
| 480–555 | end card | Lipa kazi, si mwezi. + price tag |
