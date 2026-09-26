// YouTube demos for each drill. Played with youtube-nocookie embeds, tap to load. Nothing is downloaded or re-hosted.
// Fields: id = YouTube video id, t = short label shown to him, ch = channel (credit), s = length in seconds,
// dad = longer explainer for Dad, th = 'hq' when the video has no SD thumbnail.
// Check they still play: npm run check:videos
export const VIDEOS = {
  d_toetaps: [
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
    { id: '9W_tWMpsr9Y', t: 'Juggling challenge', ch: 'Football Australia', s: 26 },
  ],
  d_juggle_pattern: [
    { id: 'ptWepooA7ZY', t: 'Juggling: swap feet', ch: 'SUSA Academy', s: 15 },
    { id: 'F2rw66vqVx4', t: 'Weak-foot juggling', ch: 'Christchurch United FC', s: 27 },
  ],
  d_scan_wall: [
    { id: 'U_eub88aq7I', t: 'Check or scan?', ch: 'FTSAUSTRALIA', s: 37 },
    { id: 'HMt1E3LF6Ac', t: 'Xavi scanning, 30 seconds', ch: 'Snabb Sports Performance', s: 29 },
  ],
  d_scan_reb: [
    { id: 'U_eub88aq7I', t: 'Check or scan?', ch: 'FTSAUSTRALIA', s: 37 },
    { id: 'HMt1E3LF6Ac', t: 'Xavi scanning, 30 seconds', ch: 'Snabb Sports Performance', s: 29 },
  ],
  d_scan_toss: [
    { id: 'U_eub88aq7I', t: 'Check or scan?', ch: 'FTSAUSTRALIA', s: 37 },
    { id: 'yg47ngy8-3s', t: 'Take a picture before you receive', ch: 'England Football Learning', s: 85 },
  ],
  fo_statue: [
    { id: 'Juj1kTI5Mlc', t: 'The micro bounce before you get the ball', ch: 'The Football Folk', s: 290 },
    { id: 'aOi2_xeYHTQ', t: 'Defending stance', ch: 'OnlineSoccerTraining', s: 61 },
  ],
  fo_check_receive: [
    { id: 'yg47ngy8-3s', t: 'Take a picture before you receive', ch: 'England Football Learning', s: 85 },
    { id: 'U_eub88aq7I', t: 'Check or scan?', ch: 'FTSAUSTRALIA', s: 37 },
  ],
  fo_check_toss: [
    { id: 'yg47ngy8-3s', t: 'Take a picture before you receive', ch: 'England Football Learning', s: 85 },
  ],
  fo_colour_dribble: [
    { id: 'GR1ltxhZRdM', t: 'Head-up dribbling: colour game', ch: 'Coach Thomas Vlaminck', s: 37 },
    { id: 'm5BKHpfPZcg', t: 'Head-up dribbling: 4 versions', ch: 'Coach Thomas Vlaminck', s: 156 },
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
  ],
  m_inside_outside: [
    { id: 'bY8b-flvo50', t: 'Inside-outside, one foot', ch: 'SoccerDrive', s: 66 },
    { id: 'OsvLW5pdrsU', t: 'Inside-outside, both feet', ch: 'SoccerDrive', s: 68 },
  ],
  m_dragback_v: [
    { id: 'gWTT6YaouEk', t: 'The V drag-back', ch: 'AllAttack', s: 183 },
  ],
  m_l_turn: [
    { id: '6bHFqvJfzVI', t: 'How to do the L-turn', ch: 'Max Lubowitz', s: 98 },
    { id: 'KVvY9D0F0Qg', t: 'Tight turns challenge', ch: 'Football Australia', s: 56 },
  ],
  m_beat_cone: [
    { id: 'SG_Da2nwEhs', t: '1v1: the scissor', ch: 'Football Australia', s: 29 },
    { id: 'u0rqvGrl1YU', t: '1v1: the Ronaldo chop', ch: 'Football Australia', s: 27 },
    { id: 'OZ2y1wuTXrA', t: '1v1: the Maradona spin', ch: 'Football Australia', s: 29 },
  ],
  m_slalom: [
    { id: 'J5oV-nGPHGI', t: 'Dribbling challenge', ch: 'Football Australia', s: 24 },
    { id: 'nl0hBgCNTlc', t: 'Zig-zag dribble', ch: 'Football Australia', s: 56 },
    { id: 'kaEllV_YobQ', t: 'Slalom drill', ch: 'DICK\'S', s: 53 },
  ],
  p_two_touch: [
    { id: 'RAhSew2-_jo', t: 'Football squash (wall game)', ch: 'Football Australia', s: 38 },
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
    { id: 'GCHUK3XdYzs', t: 'Control in pairs (with Dad)', ch: 'Football Australia', s: 35 },
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
    { id: 'lqJzGPzTX-E', t: 'Shooting challenge', ch: 'Football Australia', s: 29 },
    { id: '8dvHrn87-uU', t: 'Striking for accuracy', ch: 'Football Australia', s: 29 },
  ],
  k_run_ball: [
    { id: 'evRPWvzUyv8', t: 'Running with the ball into space', ch: 'Northern NSW Football', s: 128 },
    { id: 'GU5t8eyXkYY', t: 'Laces dribbling at speed', ch: 'CCJSA - Country Coastal Junior Soccer Association', s: 104 },
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
    { id: 'iJgGD9CFlH0', t: 'Football tennis (with Dad)', ch: 'Football Australia', s: 32 },
  ],
  w_warmup: [
    { id: 'FsR9eux62gw', t: 'FIFA 11+ Kids warm-up', ch: 'MV Pro-d', s: 248 },
  ],
  w_cooldown: [
    { id: '1ADAB7cGEpc', t: '5-minute stretch', ch: 'Soccer Supplement', s: 326 },
  ],
};
