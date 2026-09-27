// YouTube demos for each drill. Played with youtube-nocookie embeds, tap to load. Nothing is downloaded or re-hosted.
// Fields: id = YouTube video id, t = short label shown to him, ch = channel (credit), s = length in seconds,
// dad = longer explainer for Dad, th = 'hq' when the video has no SD thumbnail.
// Check they still play: npm run check:videos
export const VIDEOS = {
  d_toetaps: [
    { id: 'ivxGCvN3C2w', t: '4-minute ball touches (Japanese)', ch: 'REGATE Dribble School', s: 289 },
    { id: 'QKmC5ixM9xk', t: 'Toe taps: the basics', ch: 'Eastside FC', s: 24 },
    { id: 'KaktBhbJUyg', t: 'Toe taps for U8 to U12', ch: 'Coach Dad', s: 329 },
  ],
  d_bounce_react: [
    { id: 'Juj1kTI5Mlc', t: 'The micro bounce before you get the ball', ch: 'The Football Folk', s: 290 },
  ],
  d_tick_tock: [
    { id: 'HCT7WgUgEtk', t: 'Tick-tock ball control', ch: 'Soccer Drills Daily', s: 86 },
    { id: 'tAATGUsAQ7Y', t: 'Tic-tac, fast feet', ch: 'Christchurch United FC', s: 23 },
  ],
  d_hops: [
    { id: 'Z13C1OMTebk', t: 'FIFA 11+ Kids: skating jumps', ch: 'FAI Grassroots', s: 65 },
  ],
  d_juggle: [
    { id: 'SzZ7Ecql-sg', t: 'Juggling basics for kids', ch: 'freekickerz', s: 266 },
    { id: '7RZvy1YnMYI', t: 'A 9-year-old\'s juggling tips (Japanese)', ch: 'Yu Football', s: 124 },
  ],
  d_juggle_pattern: [
    { id: 'ptWepooA7ZY', t: 'Juggling: swap feet', ch: 'SUSA Academy', s: 15 },
    { id: 'F2rw66vqVx4', t: 'Weak-foot juggling', ch: 'Christchurch United FC', s: 27 },
  ],
  d_scan_wall: [
    { id: 'HMt1E3LF6Ac', t: 'Xavi scanning, 30 seconds', ch: 'Snabb Sports Performance', s: 29 },
    { id: '6ZoOCMesr3Q', t: 'Guardiola explains body shape', ch: 'NOUS FOOTBALL', s: 120, dad: true },
  ],
  d_scan_reb: [
    { id: 'HMt1E3LF6Ac', t: 'Xavi scanning, 30 seconds', ch: 'Snabb Sports Performance', s: 29 },
  ],
  d_scan_toss: [
    { id: 'HMt1E3LF6Ac', t: 'Xavi scanning, 30 seconds', ch: 'Snabb Sports Performance', s: 29 },
    { id: 'yg47ngy8-3s', t: 'Take a picture before you receive', ch: 'England Football Learning', s: 85 },
  ],
  fo_statue: [
    { id: 'Juj1kTI5Mlc', t: 'The micro bounce before you get the ball', ch: 'The Football Folk', s: 290 },
    { id: 'aOi2_xeYHTQ', t: 'Defending stance', ch: 'OnlineSoccerTraining', s: 61 },
  ],
  fo_check_receive: [
    { id: 'yg47ngy8-3s', t: 'Take a picture before you receive', ch: 'England Football Learning', s: 85 },
    { id: 'HMt1E3LF6Ac', t: 'Xavi scanning, 30 seconds', ch: 'Snabb Sports Performance', s: 29 },
  ],
  fo_check_toss: [
    { id: 'yg47ngy8-3s', t: 'Take a picture before you receive', ch: 'England Football Learning', s: 85 },
  ],
  fo_colour_dribble: [
    { id: 'GR1ltxhZRdM', t: 'Head-up dribbling: colour game', ch: 'Coach Thomas Vlaminck', s: 37 },
    { id: 'm5BKHpfPZcg', t: 'Head-up dribbling: 4 versions', ch: 'Coach Thomas Vlaminck', s: 156 },
    { id: 'gGu1LGv-pvo', t: 'Dribble with your head up (Japanese)', ch: 'Sakaiku', s: 105, th: 'hq' },
  ],
  fo_level: [
    { id: 'tUQKV7YnK0s', t: '7v7 positions for young players', ch: 'Coach Hailey', s: 276 },
    { id: 'BSxTsaOnGII', t: 'Centre-back positioning', ch: 'Football Fundamental', s: 561, dad: true },
  ],
  fo_keeper: [
    { id: 'tUQKV7YnK0s', t: '7v7 positions for young players', ch: 'Coach Hailey', s: 276 },
    { id: 'TxlT5jdCHCI', t: 'Playing out from the back: who moves where', ch: 'Simply Football', s: 83, dad: true },
  ],
  fo_find_line: [
    { id: 'tUQKV7YnK0s', t: '7v7 positions for young players', ch: 'Coach Hailey', s: 276 },
    { id: 'YVXLdTN1ZqE', t: '5 mistakes young wingers make', ch: 'Unisport', s: 412, dad: true },
  ],
  m_sole_rolls: [
    { id: '9lqcnQ4cWpY', t: 'Sole rolls', ch: 'Anytime Soccer Training', s: 90, th: 'hq' },
    { id: '6XpjrFgx414', t: 'Sole rolls for kids', ch: 'Ogden Soccer', s: 57 },
    { id: 'Swm7m5u6H8g', t: 'Using the sole, futsal style (Spanish)', ch: 'DT Gabriel Villalba', s: 201 },
  ],
  m_inside_outside: [
    { id: 'bY8b-flvo50', t: 'Inside-outside, one foot', ch: 'SoccerDrive', s: 66 },
    { id: 'OsvLW5pdrsU', t: 'Inside-outside, both feet', ch: 'SoccerDrive', s: 68 },
    { id: '7_kkYm3gXYg', t: '5 dribbling drills on your own (Japanese)', ch: 'REGATE Dribble School', s: 279 },
  ],
  m_dragback_v: [
    { id: 'gWTT6YaouEk', t: 'The V drag-back', ch: 'AllAttack', s: 183 },
  ],
  m_l_turn: [
    { id: '6bHFqvJfzVI', t: 'How to do the L-turn', ch: 'Max Lubowitz', s: 98 },
    { id: 'YgIr8Hg-cCc', t: 'Turns to learn in primary school (Japanese)', ch: 'REGATE Dribble School', s: 413 },
  ],
  m_beat_cone: [
    { id: 'aY-GFsROy7A', t: '5 feints to learn first (Japanese)', ch: 'REGATE Dribble School', s: 244 },
    { id: 'O8zTVE8MMfc', t: '5 easy feints to get past (Japanese)', ch: 'REGATE Dribble School', s: 214 },
    { id: 'gxP_87zc3s4', t: 'Beat him before you even feint (Japanese)', ch: 'REGATE Dribble School', s: 422 },
  ],
  m_slalom: [
    { id: '0lLPCEidlAQ', t: 'Zig-zag cone dribble (Japanese school)', ch: 'Wako City Soccer School', s: 125 },
    { id: '4ayqXc0p0pk', t: 'Dribbling round markers (Japanese)', ch: 'REGATE Dribble School', s: 275 },
    { id: 'kaEllV_YobQ', t: 'Slalom drill', ch: 'DICK\'S', s: 53 },
  ],
  p_two_touch: [
    { id: 'taUwdb3DDlk', t: '7 wall drills on your own (Japanese)', ch: 'REGATE Dribble School', s: 348 },
    { id: 'opL_DQaxpDQ', t: 'Wall pass and control (Japanese)', ch: 'Junior TV', s: 336 },
    { id: '1oxaF_Mx6Ok', t: 'Follow along: 1000 wall touches', ch: 'Jack Folan - Club Kick', s: 631 },
  ],
  p_two_touch_reb: [
    { id: 'eVBaPx3fTQM', t: 'Two-touch passing', ch: 'TopTekkers', s: 63 },
  ],
  p_open_up: [
    { id: 'yBz6AsvmA1I', t: 'Receive on the back foot', ch: 'Matt Brewer', s: 40 },
    { id: 'oIsiV42xfck', t: 'Open body to receive', ch: 'SoccerCoaching.Net', s: 22 },
  ],
  p_weak_wall: [
    { id: '-56f31R-x44', t: 'Wall passing drills on your own', ch: 'Progressive Soccer', s: 325 },
    { id: 'Md2SQRN4054', t: '4 steps to a better weak foot', ch: 'AllAttack', s: 249 },
  ],
  p_toss_control: [
    { id: 'AdzxLVnOZoY', t: 'Control a ball from the air', ch: 'AllAttack', s: 253 },
    { id: '2uEUo1CEYpQ', t: 'Kawasaki Frontale U-12: pass & control in pairs', ch: 'COACH UNITED', s: 437 },
  ],
  p_weak_touches: [
    { id: 'Md2SQRN4054', t: '4 steps to a better weak foot', ch: 'AllAttack', s: 249 },
    { id: 'F2rw66vqVx4', t: 'Weak-foot juggling', ch: 'Christchurch United FC', s: 27 },
  ],
  b_where_go: [
    { id: 'tUQKV7YnK0s', t: '7v7 positions for young players', ch: 'Coach Hailey', s: 276 },
    { id: '_dYy4QGXnns', t: 'Positioning and movement basics', ch: 'Howard Chang', s: 470, dad: true },
  ],
  b_watch_pro: [
    { id: '7fGvWAfoYCM', t: 'Counting Ødegaard’s shoulder checks', ch: 'Be Your Best', s: 335 },
    { id: 'HMt1E3LF6Ac', t: 'Xavi scanning, 30 seconds', ch: 'Snabb Sports Performance', s: 29 },
    { id: 'gB8BK9eBd7w', t: '3 things to learn from Van Dijk', ch: 'Unisport', s: 293 },
  ],
  f_jockey: [
    { id: 'uVkpeXS6Byw', t: 'Don\'t dive in: 1v1 defending', ch: 'KS Performance', s: 107 },
    { id: 'hgrStIbFls0', t: 'How to jockey', ch: 'HowcastSportsFitness', s: 83, th: 'hq' },
    { id: 'rBHKDJEVgVM', t: 'Jockeying step by step', ch: 'Soccer Drills For You', s: 78 },
  ],
  f_shadow_jockey: [
    { id: 'rBHKDJEVgVM', t: 'Jockeying step by step', ch: 'Soccer Drills For You', s: 78 },
  ],
  f_goalside: [
    { id: 'ZACq3kLKNSo', t: 'Goal-side and marking', ch: 'Stephanie Russon', s: 160 },
    { id: 'OUX1z7MWwRw', t: 'Recovery runs', ch: 'UCoach Soccer', s: 318, dad: true },
  ],
  f_recovery_runs: [
    { id: '1cz-ZAt3Uiw', t: 'Recovery runs', ch: 'Cincy SC', s: 53 },
    { id: 'OUX1z7MWwRw', t: 'Recovery runs', ch: 'UCoach Soccer', s: 318, dad: true },
  ],
  s_second_ball: [
    { id: '9ezAsBr7P-k', t: 'React first: win the loose ball', ch: 'KS Performance', s: 127 },
    { id: 'KY_Ay7SF3oI', t: 'Winning 50/50 balls', ch: 'SoccerCoachTV', s: 399, dad: true },
  ],
  s_drop_pounce: [
    { id: 'U7IYr7to27s', t: 'Control it off the bounce', ch: 'Online Soccer Academy', s: 309 },
    { id: 'ISfkbV9i5PU', t: 'Receiving a ball in the air', ch: 'SportsEdTV Soccer Training', s: 73 },
  ],
  k_shots: [
    { id: 'B7n8sqPsGaI', t: 'Shooting for kids: power and accuracy', ch: 'Progressive Soccer', s: 105 },
    { id: '1bpjWSZjgoE', t: 'Laces kick: Yokohama F. Marinos coach', ch: 'Yokohama F. Marinos', s: 154 },
    { id: 'Zk4J_9ba2b4', t: 'Laces kick: Nagoya Grampus coach', ch: 'Chunichi Shimbun', s: 186 },
  ],
  k_run_ball: [
    { id: 'oW8R-T2Fv7c', t: 'Running with the ball: 4 games (Spanish)', ch: 'Coaching futbol - Ejercicios', s: 15 },
    { id: 'YNrdJUSPUME', t: '15 running-with-the-ball drills (Spanish)', ch: 'MOTRI APRENDIZAJE', s: 461, dad: true },
  ],
  k_first_time: [
    { id: 'LoJ5dsFz59s', t: 'A full session with just a wall', ch: 'Become Elite', s: 322 },
  ],
  k_roll_strike: [
    { id: 'Fl1O7T7NQrQ', t: 'How to strike the ball', ch: 'yougotmojo', s: 62 },
  ],
  r_reb_volley: [
    { id: '8ps8yWO7Zc0', t: 'Volleys on a rebounder', ch: 'SKLZ', s: 68 },
  ],
  c_bounce_control: [
    { id: 'U7IYr7to27s', t: 'Control it off the bounce', ch: 'Online Soccer Academy', s: 309 },
    { id: 'AdzxLVnOZoY', t: 'Control a ball from the air', ch: 'AllAttack', s: 253 },
  ],
  w_warmup: [
    { id: 'FsR9eux62gw', t: 'FIFA 11+ Kids warm-up', ch: 'MV Pro-d', s: 248 },
  ],
  w_cooldown: [
    { id: '1ADAB7cGEpc', t: '5-minute stretch', ch: 'Soccer Supplement', s: 326 },
  ],

  // ---------- 9v9 roles ----------
  r_gk_set: [
    { id: 'e7kSzpOT_9A', t: 'Young keepers: starting position', ch: 'SimpleSoccerUSA', s: 42, th: 'hq' },
    { id: 'Lc3vDfa6VGw', t: 'Ready position and catching', ch: 'Keeperstop', s: 58 },
    { id: '-OcYatodSzk', t: '3 drills for young keepers (Spanish)', ch: 'DibuTV', s: 142 },
    { id: '_GSBeB_VeA0', t: 'Stance and catching basics (Japanese GK coach)', ch: 'GK coach Araki', s: 507, dad: true },
  ],
  r_gk_bounce_catch: [
    { id: 'Lc3vDfa6VGw', t: 'Ready position and catching', ch: 'Keeperstop', s: 58 },
    { id: 'XpQau5Yd23k', t: 'U10 keeper: the set position', ch: 'First Class Goalkeeping', s: 221 },
  ],
  r_gk_angle: [
    { id: 'F3K0w4CFDKY', t: 'Narrowing the angle for kids', ch: 'Kids Soccer', s: 62 },
    { id: '_fMPxvcOZ0I', t: 'Keeper positioning drills', ch: 'Tikibol', s: 112 },
  ],
  r_gk_feet: [
    { id: 'iNafX59pvLQ', t: 'U9-U10 keeper: footwork and passing', ch: '2Keepers', s: 145 },
    { id: 'CRlUP3WeOq8', t: 'Rolling the ball out', ch: 'EP Soccer Club', s: 55 },
  ],
  r_gk_roll_out: [
    { id: 'CRlUP3WeOq8', t: 'Rolling the ball out', ch: 'EP Soccer Club', s: 55 },
    { id: 'btJch_7_w7g', t: 'Bowling it out', ch: 'Gozo Goalkeepers School', s: 65 },
  ],
  r_cb_split: [
    { id: 'uXedSt7JgSA', t: 'Playing out from the back (Spanish)', ch: 'Coaching futbol - Ejercicios', s: 30 },
    { id: 'N9SMjD_TBNg', t: 'The 9-a-side shape explained', ch: 'La Masía Fútbol', s: 348, dad: true },
    { id: '5rmtkdijkM8', t: 'Training ball-playing centre backs', ch: 'Pelota Academy', s: 490, dad: true },
  ],
  r_cb_step_drop: [
    { id: 'rTg7Qmk2BSA', t: 'Maldini: 1v1 defending from the front', ch: 'Marco Wolfgang Ahlrichs', s: 44 },
    { id: 'aOi2_xeYHTQ', t: 'Defending technique', ch: 'OnlineSoccerTraining', s: 61 },
    { id: '7i-N9aw6d9Y', t: 'Defending a 1v1: the 3 Ps', ch: 'Want The Ball', s: 284, dad: true },
  ],
  r_cb_carry: [
    { id: 'oW8R-T2Fv7c', t: 'Running with the ball: 4 games (Spanish)', ch: 'Coaching futbol - Ejercicios', s: 15 },
    { id: '5rmtkdijkM8', t: 'Training ball-playing centre backs', ch: 'Pelota Academy', s: 490, dad: true },
  ],
  r_wd_show: [
    { id: 'K17wDaDcuyY', t: 'How to stop fast, skilful attackers', ch: 'Unisport', s: 217 },
    { id: 'HAW4_nqFCjY', t: 'How pros defend faster players', ch: 'Become Elite', s: 394, dad: true },
  ],
  r_wd_overlap: [
    { id: 'OjTbITUsSxQ', t: 'What is an overlapping run?', ch: 'yougotmojo', s: 58 },
    { id: '-4s1WFIt1RE', t: 'Overlaps', ch: 'Simple Smart Soccer', s: 87 },
    { id: 'mvYX6Yoegho', t: 'Overlaps and underlaps explained', ch: 'Rondo Coach', s: 479, dad: true },
  ],
  r_wd_recover: [
    { id: '1cz-ZAt3Uiw', t: 'Recovery runs', ch: 'Cincy SC', s: 53 },
    { id: 'OUX1z7MWwRw', t: 'Recovery runs', ch: 'UCoach Soccer', s: 318, dad: true },
  ],
  r_cm_angle: [
    { id: 'GL7Xh-KDxgk', t: 'Passing angles for U10 to U13', ch: 'KS Performance', s: 115 },
    { id: 'mV-wcNrCL8w', t: 'Angles of support', ch: 'Keepitonthedeck', s: 27 },
    { id: 'Cnbzp6PLRyo', t: 'Stop, kick, decide: passing for kids (Japanese)', ch: 'COACH UNITED', s: 194, dad: true },
  ],
  r_cm_scan_turn: [
    { id: 'VlkEkBbnlI8', t: 'Receiving on the half-turn', ch: 'Game On Goal', s: 49 },
    { id: '6ZoOCMesr3Q', t: 'Guardiola explains body shape', ch: 'NOUS FOOTBALL', s: 120 },
    { id: 'JGaHiCU0Mks', t: 'Kengo Nakamura: turning in tight spaces (Japanese)', ch: 'J.LEAGUE', s: 1067, dad: true },
  ],
  r_cm_winback: [
    { id: 'IHeUKdsVHHg', t: 'Press and cover', ch: 'KS Performance', s: 103 },
    { id: 'GzUwGD5bZlQ', t: '3v3: press as a team', ch: 'KS Performance', s: 87 },
    { id: 'nlmVIHCCRQ4', t: 'How to press the ball', ch: 'Catalan Soccer', s: 498, dad: true },
  ],
  r_w_mitoma: [
    { id: 'iFYnMlGsvs0', t: 'Mitoma shows how he dribbles (Japanese TV)', ch: 'ANN News', s: 430 },
    { id: 'kvH9QtKqoxA', t: 'Wing 1v1 feint (Japanese)', ch: 'REGATE Dribble School', s: 231 },
    { id: 'EMsSBLM754U', t: 'Why Mitoma\'s dribbling works', ch: 'Football In 3 Minutes Lab', s: 163, dad: true },
  ],
  r_w_touchline: [
    { id: 'HdbSfHdMUXc', t: '5 rules for body position', ch: '2v1football', s: 254 },
    { id: 'VlkEkBbnlI8', t: 'Receiving on the half-turn', ch: 'Game On Goal', s: 49 },
  ],
  r_w_cutback: [
    { id: 'x177AcOq4mU', t: 'Finishing cut-backs', ch: 'Smedley\'s Soccer Site', s: 20 },
    { id: 'MbsCb4rn1zk', t: 'Runs from deep for a cut-back', ch: 'Coaches Training Room', s: 38 },
  ],
  r_st_show_spin: [
    { id: 'ZyRL3TnTrco', t: 'Striker movement: show and spin', ch: 'Footy Tactics', s: 230 },
    { id: 'j895sjqIvqU', t: 'Striker runs that work', ch: 'Football Fundamental', s: 483, dad: true },
  ],
  r_st_shield: [
    { id: '8mncCD2cd7w', t: 'How to shield the ball', ch: 'yougotmojo', s: 69 },
    { id: 'Pu-_k5yMuVg', t: 'Hold-up play', ch: 'Edge of the Box Mentoring', s: 40 },
    { id: 'XAPe56hVvGQ', t: 'Shielding the ball', ch: 'SportVideos', s: 104 },
  ],
  r_st_rebound: [
    { id: '4KtQxMoMPZI', t: 'Score more with follow-up shots', ch: 'Soccer IQ Academy', s: 218 },
    { id: 'y2xfyrW4Cgg', t: 'Shooting drill', ch: 'SoccerSessionsNow', s: 50 },
  ],
  r_rondo: [
    { id: 'KAaOczy58Mk', t: 'FC Barcelona U10 rondo', ch: 'Youth Professional Training', s: 64 },
    { id: 'c_nq0Ka_RWs', t: '4v1 rondo for beginners', ch: 'Paul Spacey', s: 210 },
    { id: 'bcKvEBXcjBw', t: '24 hours at FC Barcelona\'s academy', ch: 'FC Barcelona', s: 150, dad: true },
  ],
  r_baby_futbol: [
    { id: 'tslh_oq935o', t: 'Potreros: street football in Argentina', ch: 'Cesar Luciano Sanabria', s: 61, th: 'hq' },
    { id: 'pYpTY2ViK08', t: 'Argentina, the potrero of the world (Spanish)', ch: 'Goal en español', s: 194, th: 'hq' },
    { id: 'nMnVO_ZEF2k', t: 'Baby fútbol finals in Argentina', ch: 'LA GLORIOSA', s: 1423, dad: true },
  ],
  // ---------- skills & levels ----------
  sk_ma_feel: [
    { id: 'MsOVrZB4wRo', t: '10 ball touches, 5 minutes a day (Japanese)', ch: 'サカサポChannel', s: 312 },
    { id: 'PJ6HKUCFb8k', t: 'Sole ball feeling for kids (Japanese)', ch: 'Fun! サカ', s: 39 },
    { id: 'zT0t67nNp7s', t: 'V-pull, step-over, outside (Japanese)', ch: 'Fun! サカ', s: 48 },
  ],
  sk_ma_speed: [
    { id: 'b809h9NLp9k', t: 'Beginner ball touches (Japanese)', ch: 'こちょわーるどサッカー', s: 193 },
    { id: 'ytyvl44Z4II', t: '22 ball touches, anywhere (Japanese)', ch: '稲田 瑞穂', s: 150 },
  ],
  sk_ma_pisar: [
    { id: 'Swm7m5u6H8g', t: 'Using the sole, futsal style (Spanish)', ch: 'DT Gabriel Villalba', s: 201 },
    { id: 'INC083ZCMdU', t: 'Sole rolls', ch: 'Football DNA', s: 46 },
  ],
  sk_ma_keep: [
    { id: 'XAPe56hVvGQ', t: 'Shielding the ball', ch: 'SportVideos', s: 104 },
    { id: 'yPPgXnTqtfI', t: 'Protect the ball against bigger players', ch: 'Unisport', s: 258 },
    { id: 'mVN3UwXqfpQ', t: 'Keeping the ball in tight spaces', ch: 'Keepitonthedeck', s: 118, dad: true },
  ],
  sk_st_dead: [
    { id: 'cF2FahTpHgg', t: 'A coach\'s trap practice (Japanese)', ch: 'FSCサッカースクール', s: 51, th: 'hq' },
    { id: 'v-8_W3YLneU', t: 'Dead-stop trap (Japanese)', ch: 'ぱんだ兄弟 Panda bros.', s: 391, dad: true },
    { id: 'MLvW_K6YioQ', t: 'Why the ball won\'t stop, and the fix (Japanese)', ch: 'やまね@サカステ', s: 452, dad: true },
  ],
  sk_st_away: [
    { id: 'LPCGqOC7vU4', t: '3 first touches to face forward (Japanese)', ch: 'REGATEドリブル塾', s: 204 },
    { id: 'ViBAxnQ9280', t: 'Directional first touch (Japanese)', ch: 'COACH UNITED', s: 59 },
  ],
  sk_st_press: [
    { id: 'LYmPykkfsQI', t: 'First touch, 1v1, 2v1', ch: 'Coach Thomas Vlaminck', s: 103 },
    { id: 'O4v-o1xeco0', t: '7 first-touch drills', ch: 'AD Football Training', s: 218 },
  ],
  sk_pa_inside: [
    { id: 'oPWNO6rMJAM', t: 'Inside-foot kick: Yokohama F. Marinos coach (Japanese)', ch: 'Yokohama F. Marinos', s: 179 },
    { id: 'hEXXbeiVsoA', t: 'Teaching the inside kick to beginners (Japanese)', ch: 'SOLUNA Ch.', s: 391, dad: true },
  ],
  sk_pa_one: [
    { id: 'EMIQhtHknPg', t: 'One-touch passing', ch: 'Global Futbol Training', s: 26 },
    { id: 'sLZKGriQoXE', t: 'One-touch follow passing', ch: 'SoccerDrive', s: 30, th: 'hq' },
  ],
  sk_pa_move: [
    { id: 'EDJKPs2Qcag', t: 'Pass & move for U9 to U12', ch: 'KS Performance', s: 115 },
    { id: '6aOXaCcmDdA', t: 'Quick passes and movement (Spanish)', ch: 'BaseFútbol', s: 76 },
    { id: 'tlAuB13vGPY', t: 'Pass & move patterns', ch: 'Harrow United', s: 213, dad: true },
  ],
  sk_pa_gates: [
    { id: 'gWifEuhXt0A', t: 'Passing through gates', ch: 'i play! afterschool', s: 158 },
  ],
  sk_ca_laces: [
    { id: 'fmxn5QNPMJU', t: 'Kawasaki Frontale U-10: carrying the ball 1 (Japanese)', ch: 'COACH UNITED', s: 84 },
    { id: 'jnJ_OcYNvjQ', t: 'Kawasaki Frontale U-10: carrying the ball 2 (Japanese)', ch: 'COACH UNITED', s: 42 },
    { id: 'eq4GNr3HaM4', t: 'Kawasaki Frontale U-10: carrying the ball 3', ch: 'COACH UNITED', s: 49 },
  ],
  sk_ca_stopgo: [
    { id: 'loXlmv_13vU', t: 'The stop & go', ch: 'tomthom11', s: 44 },
    { id: '7z0GQ0IC6u8', t: 'Stop and go dribbling move', ch: 'SoccerCoachTV', s: 243, dad: true },
  ],
  sk_ca_space: [
    { id: 'tbpSTj2ubsY', t: 'Kawasaki Frontale U-10: dribble to move forward', ch: 'COACH UNITED', s: 84 },
  ],
  sk_ca_gates: [
    { id: 'GajIbRgBUzU', t: 'Gate dribbling game', ch: 'Total Tech Soccer', s: 48 },
    { id: 'kmmDtmfgos0', t: '1v1 dribbling: attack and defend', ch: 'Professional Soccer Coaching', s: 199 },
  ],
  sk_be_turns: [
    { id: 'hhOaMUKkK48', t: 'U9 dribbling turns', ch: 'Alliance Athletics', s: 102 },
    { id: 'AlMwNGOmkwA', t: 'Inside and outside cut', ch: 'JustPlayCleats', s: 75 },
    { id: 'LRSUw7mgqAY', t: 'The Cruyff turn', ch: 'Unisport', s: 246 },
  ],
  sk_be_scissors: [
    { id: 'AYr8WXr0teQ', t: 'Scissors: 3 tips for kids (Japanese)', ch: 'VIRDSフットボールアカデミー', s: 166 },
    { id: 'bTHP6ru1LgU', t: 'Scissors basics (Japanese)', ch: 'サッカー上達アカデミーTV', s: 96 },
  ],
  sk_be_weight: [
    { id: 'fCsso2BmcC8', t: 'Moving his weight to beat him (Japanese)', ch: 'T.V R.W.Sドリブル', s: 220 },
    { id: '-7Oj6PsUL1I', t: 'Face forward and beat him (Japanese)', ch: 'T.V R.W.Sドリブル', s: 207 },
    { id: 'YF3w63CN54A', t: 'Shift his weight and you win (Japanese)', ch: 'T.V R.W.Sドリブル', s: 637, dad: true },
  ],
  sk_be_1v1: [
    { id: 'BFtJWmAQe5s', t: '1v1 with side gates', ch: 'PLAYER DEVELPMENT', s: 52 },
    { id: 'kmmDtmfgos0', t: '1v1 dribbling: attack and defend', ch: 'Professional Soccer Coaching', s: 199 },
  ],
  sk_fi_laces: [
    { id: 'zKjgczUU8Aw', t: 'Laces kick for young kids (Japanese)', ch: 'サイテレビ', s: 254 },
    { id: '0LqafH_U3T8', t: 'A stronger laces kick (Japanese)', ch: 'サカイク編集部', s: 223 },
  ],
  sk_fi_corners: [
    { id: 'qIbWX_hisKY', t: 'Aim for the open corner (Japanese)', ch: 'Sakakenサッカー研究会改', s: 269 },
    { id: '_f9ZIh8ESn4', t: 'Shooting: 5 basic tips', ch: 'Unisport', s: 248 },
  ],
  sk_fi_turn: [
    { id: 'k-dpcfQMwC8', t: 'Turn & shoot for U8 to U10', ch: 'KS Performance', s: 182 },
    { id: 'BrWrF-0lA00', t: 'Shooting past a defender (Japanese)', ch: 'SOLUNA Ch.', s: 131 },
  ],
  sk_fi_1v1gk: [
    { id: 'y-X_t1KVO7o', t: '1v1 and 2v1 finishing', ch: 'AD Football Training', s: 125 },
    { id: 'Ae378adY2rI', t: 'Finishing 1v1 with the keeper', ch: 'Rushmoor Community FC', s: 803, dad: true },
  ],
  sk_mo_coord: [
    { id: 'tMs3TQqxbug', t: '10 ball coordination moves (Japanese)', ch: '鎌田豊', s: 28 },
    { id: 'Z9460InsMUY', t: 'Coordination for young players (Japanese)', ch: 'SOLUNA Ch.', s: 198 },
    { id: 'jGNoC-JgsEg', t: 'Pair ball handling (coordination)', ch: 'FRAKIDS', s: 259 },
  ],
  sk_mo_feet: [
    { id: 'bp6vuy7ai7A', t: 'Line steps for kids (Japanese)', ch: 'KSS SOCCER SCHOOL', s: 23 },
    { id: 'VchxPuX24HY', t: '10 agility drills at home, no kit', ch: 'Progressive Soccer', s: 139 },
    { id: 'd01bxcf-VhQ', t: '5 fast-feet exercises', ch: 'Prolific Soccer', s: 213 },
  ],
  sk_mo_react: [
    { id: 'nGKsL7XcEgc', t: 'Reaction and speed drill', ch: 'White Eagles Calgary', s: 23 },
    { id: 'VX5vKQRPZdQ', t: 'Colours reaction drill', ch: 'Sean Buckley', s: 203 },
    { id: 'plpnPCCDvR4', t: '3 minutes of quickness (Japanese)', ch: 'サカサポChannel', s: 196 },
  ],
  sk_mo_mirror: [
    { id: 't3UjPq-RcnE', t: 'Partner mirror drill', ch: 'SPIDERfit Kids', s: 109 },
    { id: 'Qnikzh0tQas', t: 'Mirror game', ch: 'Casey Wheel', s: 17 },
  ],
  sk_de_steal: [
    { id: 'ncjaEX2RO54', t: 'Use your body to steal the ball', ch: 'Kang channel', s: 399 },
    { id: 'Dg8ISMeDFeo', t: 'From soft defending to winning it (Japanese)', ch: 'ぱんだ兄弟 Panda bros.', s: 494, dad: true },
  ],
  sk_de_duel: [
    { id: 'pLrx6ci-0zA', t: '1v1 for grassroots', ch: 'D.T. Nazir Zelada', s: 86 },
    { id: 'n18x1k1zb-s', t: 'Duels (Spanish)', ch: 'Deportivo Mac Allister', s: 105 },
    { id: 'ZSHzqOsjUBY', t: '1v1 defending rules (Japanese)', ch: 'キングデュオ-サッカーTV', s: 519, dad: true },
  ],
  sk_gk_wall: [
    { id: 'NqZ3Zp6dDNQ', t: 'Keeper catching at home', ch: 'Little Messys Football', s: 160 },
    { id: 'UFyX6ZEHYcI', t: 'Kids\' goalkeeping: catching', ch: 'Coach Dannys', s: 54 },
    { id: '9d04nOhCEZ4', t: 'Catching practice (Japanese)', ch: 'サカイク編集部', s: 52 },
  ],
  sk_gk_shuffle: [
    { id: 'yjk94YHKU-g', t: 'Pop, shuffle and catch', ch: 'Coaching Media Group', s: 70 },
    { id: '5qcF3BvEcEI', t: 'Keeper mini shuffle', ch: 'Golden Gloves Goalkeeping', s: 44 },
  ],
  sk_gk_game: [
    { id: 'BHsPdQ7EnZM', t: '7 fun keeper drills for U5 to U10', ch: 'Eddie10', s: 226 },
    { id: 'gFXR2ex48lo', t: 'Dad as keeper coach: catching basics (Japanese)', ch: 'ノグチno着眼点。', s: 136, dad: true },
  ],
  sk_lo_fingers: [
    { id: 'HlLnqEnajXI', t: 'Lamine Yamal, 16: 7 looks in 5 seconds', ch: 'Promeses FA / FC Daura', s: 26 },
    { id: 'NBEANec0eRg', t: 'Scanning and reaction', ch: 'Heads Up STS', s: 37 },
    { id: 'AW5jOc1DCGI', t: 'When and how to look (Japanese)', ch: '谷田部', s: 311, dad: true },
  ],
  sk_lo_twice: [
    { id: '7oyG-3f9WwU', t: 'The scanning game', ch: 'Fast Feet Football Academy', s: 374 },
    { id: 'A7YR73ALZ1s', t: 'Check your shoulder: scan drill', ch: 'KS Performance', s: 125 },
    { id: 'vB0sEv4HTZw', t: 'Timing your looks (Japanese)', ch: '谷田部', s: 237, dad: true },
  ],
  sk_gf_check: [
    { id: 'jNiEE8odWCo', t: 'Get free to receive (Japanese)', ch: 'SOLUNA Ch.', s: 263 },
    { id: 'mA_0AkFK6i0', t: 'Teach a child to get free and wall-pass (Spanish)', ch: 'Cheme Alejandro', s: 99 },
  ],
  sk_gf_lose: [
    { id: 'A_HV-n621Qs', t: 'Lose your marker and receive (Japanese)', ch: 'SOLUNA Ch.', s: 163 },
    { id: 'sxBW2BR4688', t: 'Losing your marker: 1v1 and 2v2 (Japanese)', ch: 'SOLUNA Ch.', s: 186 },
    { id: 'GQ8rzuwJSKo', t: 'Movement to lose a marker (Japanese)', ch: 'REGATEドリブル塾', s: 400, dad: true },
  ],
  sk_gf_wall: [
    { id: 'mA_0AkFK6i0', t: 'Teach a child to get free and wall-pass (Spanish)', ch: 'Cheme Alejandro', s: 99 },
    { id: '30JFcrh7EiA', t: '3 quick combination drills (Spanish)', ch: 'BaseFútbol', s: 104 },
  ],
  sk_wb_react: [
    { id: 'iDGJ_Ac4FEE', t: 'Transition game: 3v2 to 1v1 (Spanish)', ch: 'Coaching futbol', s: 21 },
    { id: 'FRgxVfTWZE4', t: 'Drills for effort and intensity', ch: 'Progressive Soccer', s: 284 },
  ],
  sk_wb_game: [
    { id: 'GzUwGD5bZlQ', t: '3v3: press as a team', ch: 'KS Performance', s: 87 },
    { id: 'IHeUKdsVHHg', t: 'Press and cover', ch: 'KS Performance', s: 103 },
  ],
  sk_ma_twoball: [
    { id: 'Vkt6jujaeeE', t: '1-touch bounce juggling', ch: 'tomthom11', s: 27 },
    { id: 'RjNYNnEBb7A', t: 'One-bounce juggling', ch: 'CCF Football', s: 52 },
  ],
  sk_ma_follow: [
    { id: 'MQ6pYNSFc-8', t: 'Ball mastery: 10-minute follow-along', ch: '365 Ball', s: 639 },
    { id: 'cB52z9GMbpk', t: 'Basic ball mastery for kids', ch: 'Fast Feet Home Soccer', s: 469 },
  ],
  sk_st_air: [
    { id: 's7bgsTgU6Uo', t: 'Controlling a high ball (Japanese)', ch: 'REGATEドリブル塾', s: 480 },
    { id: 'LQ_b-mK5pFo', t: 'Stop a bouncing ball under your foot (Japanese)', ch: 'サカイク編集部', s: 135 },
  ],
  sk_ca_race: [
    { id: 'wvFyTDkOKzc', t: 'Fun dribbling race: 4 versions', ch: 'Coach Thomas Vlaminck', s: 209 },
    { id: 'rwLrbyJWSIY', t: '5 fun dribbling drills for kids', ch: 'Onside - Training', s: 246 },
  ],
  sk_fi_bounce: [
    { id: 'kagAbJylIRs', t: 'A stronger shot, even for kids (Japanese)', ch: 'TORIDENTEストライカースクール', s: 243 },
    { id: 'WYdbdvIvgYw', t: '2 ways to score more goals', ch: 'REGATEドリブル塾', s: 330 },
  ],
  sk_lo_numbers: [
    { id: '_es81j0GoBI', t: 'Awareness: numbers and colours', ch: 'Sean Baumann', s: 601, dad: true },
    { id: '4cM5xAtmV5E', t: 'Ball control and body coordination for kids', ch: 'Fun! サカ', s: 42 },
  ],
};
