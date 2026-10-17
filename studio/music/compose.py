# Original instrumental: gospel house, 120 BPM, A-flat. 37 beats of ad + tail.
import mido, random
random.seed(7)
TPB = 480; BPM = 120
mid = mido.MidiFile(ticks_per_beat=TPB)
def track(name, ch, prog=None, vol=100, pan=64, rev=40):
    t = mido.MidiTrack(); mid.tracks.append(t)
    t.append(mido.MetaMessage('track_name', name=name))
    if name == 'meta': t.append(mido.MetaMessage('set_tempo', tempo=mido.bpm2tempo(BPM)))
    if prog is not None: t.append(mido.Message('program_change', channel=ch, program=prog, time=0))
    for cc, v in ((7, vol), (10, pan), (91, rev)):
        t.append(mido.Message('control_change', channel=ch, control=cc, value=v, time=0))
    return {'t': t, 'ch': ch, 'ev': []}
def note(tr, beat, dur, pitch, vel):
    tr['ev'].append((int(beat * TPB), 'on', pitch, vel)); tr['ev'].append((int((beat + dur) * TPB), 'off', pitch, 0))
def flush(tr):
    ev = sorted(tr['ev'], key=lambda e: (e[0], e[1] == 'on')); last = 0
    for tick, kind, p, v in ev:
        tr['t'].append(mido.Message('note_on' if kind == 'on' else 'note_off', channel=tr['ch'], note=p, velocity=v, time=tick - last)); last = tick
meta = track('meta', 0)
keys = track('rhodes', 0, prog=4, vol=96, pan=58, rev=50)
organ = track('organ', 1, prog=16, vol=62, pan=74, rev=60)
bass = track('bass', 2, prog=33, vol=108, pan=64, rev=10)
piano = track('piano', 3, prog=0, vol=88, pan=50, rev=55)
drums = track('drums', 9, vol=112, rev=20)

# IV - iii - vi - V in A-flat, gospel voicings (MIDI numbers)
Db9 = [61, 65, 68, 72, 75]   # Db maj9 (Db F Ab C Eb)
Cm7 = [60, 63, 67, 70, 74]   # C m9-ish (C Eb G Bb D)
Fm9 = [65, 68, 72, 75, 79]   # F m9
Eb7s = [63, 68, 70, 73, 77]  # Eb7sus4 (Eb Ab Bb Db F)
Eb7 = [63, 67, 70, 73, 77]
Ab9 = [56, 63, 68, 72, 70, 75]  # Ab add9 big
roots = {'Db': 37, 'C': 36, 'F': 41, 'Eb': 39, 'Ab': 44}
prog = [('Db', Db9), ('C', Cm7), ('F', Fm9), ('Eb', Eb7s)]

for bar in range(8):  # beats 0-32
    b0 = bar * 4; r, ch = prog[bar % 4]
    # Rhodes: house off-beat stabs (the "and" of each beat), fuller from bar 3
    for k in range(4):
        v = 70 if bar < 2 else 84
        for p in ch: note(keys, b0 + k + 0.5, 0.32, p, v)
    if bar % 4 == 3:  # sus resolves on beat 4
        for p in Eb7: note(keys, b0 + 3.5, 0.4, p, 86 if bar > 1 else 72)
    # Bass from bar 3: root on the beat, octave pop on the and of 2 and 4
    if bar >= 2:
        R = roots[r]
        for k, (off, oc, vel) in enumerate([(0, 0, 104), (1.5, 12, 88), (2, 0, 100), (3.5, 12, 92)]):
            note(bass, b0 + off, 0.42, R + oc, vel)
    # Organ swell under bars 6-8
    if bar >= 5:
        for p in ch[:4]: note(organ, b0, 3.9, p - 12, 64 + (bar - 5) * 8)

# Gospel piano run into the drop (beats 30-32): A-flat major pentatonic, descending, sixteenths
run = [87, 84, 82, 80, 77, 75, 72, 70, 68, 65, 63, 60, 58, 56, 53, 51]
for i, p in enumerate(run): note(piano, 30 + i * 0.125, 0.14, p, 70 + i)
# THE DROP at beat 32 (end card): big A-flat chord, organ + piano, bass
for p in Ab9: note(keys, 32, 3.6, p, 104)
for p in [56, 60, 63, 68, 72]: note(organ, 32, 4.5, p, 92)
for p in [68, 72, 75, 80]: note(piano, 32, 2.5, p, 100)
note(bass, 32, 3.5, roots['Ab'], 112); note(bass, 32, 3.5, roots['Ab'] - 12, 96)
# final sting chord on beat 36
for p in [56, 63, 68, 72, 75, 80]: note(piano, 36, 2.0, p, 96)
note(bass, 36, 2.0, roots['Ab'] - 12, 104)

# Drums: four on the floor from beat 0, claps 2&4 from bar 3, offbeat open hat, 16th shaker from bar 3
K, CLAP, HH, OH, SHK, CRASH, SNR = 36, 39, 42, 46, 70, 49, 38
for b in range(32):
    note(drums, b, 0.2, K, 112 if b % 4 == 0 else 100)
    note(drums, b + 0.5, 0.12, OH if b >= 8 else HH, 64 if b >= 8 else 52)
    if b >= 8 and b % 2 == 1: note(drums, b, 0.15, CLAP, 96)
    if b >= 8:
        for s in (0.25, 0.75): note(drums, b + s, 0.06, SHK, 46 + random.randint(-6, 6))
# snare roll build into the drop (beats 28-32)
for i in range(16): note(drums, 28 + i * 0.25, 0.1, SNR, 50 + i * 4)
note(drums, 32, 1.5, CRASH, 110); note(drums, 32, 0.3, K, 120)
for b in range(33, 36): note(drums, b, 0.2, K, 96); 
for b in (33, 35): note(drums, b, 0.15, CLAP, 88)
note(drums, 36, 2.0, CRASH, 96); note(drums, 36, 0.3, K, 116)

for tr in (keys, organ, bass, piano, drums): flush(tr)
mid.save('bed.mid'); print('ok', mid.length)
