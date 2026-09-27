// Skills & levels. What Spanish, Japanese and Argentine academies teach, turned into
// 12 skills in 3 families (ball, body, head), each with 4 levels. Theme days pick
// drills from his current level, so passing a level changes what he trains.
// ref: es | jp | ar (see REFS in roles.js). Drill designs are ours; the lessons are sourced.

export const LEVELS = [
  { n: 1, name: "Learn it", blurb: "On your own, slow, both feet" },
  { n: 2, name: "Speed it up", blurb: "Faster, head up, still no defender" },
  { n: 3, name: "Beat Dad", blurb: "Dad defends: half speed first, then for real" },
  { n: 4, name: "Play it", blurb: "In a small game with friends or Dad" },
];

export const FAMILIES = [
  { id: "ball", name: "Ball", blurb: "Using the ball" },
  { id: "body", name: "Body", blurb: "Using your body" },
  { id: "head", name: "Head", blurb: "Using your head" },
];

export const SKILL_SEQ = ["mastery", "stop", "pass", "carry", "beat", "finish", "move", "defend", "keeper", "look", "getfree", "winback"];

// Every skill day trains one Ball skill and one Body or Head skill. Carry and beat a player
// come round twice as often: Kawasaki Frontale's U‑10s start there.
export const SKILL_ROTATION = {
  ball: ["carry", "beat", "mastery", "stop", "carry", "beat", "pass", "finish"],
  other: ["look", "defend", "getfree", "winback", "move", "keeper"],
};

export const SKILLS = {
  mastery: {
    id: "mastery", short: "Mastery", family: "ball", name: "Ball mastery", icon: "🦶", ref: "ar",
    why: "Argentinos Juniors: “technique is non-negotiable”. Their coach: “Control, control, control.”",
    levels: [
      { drills: ["m_sole_rolls", "sk_ma_feel", "sk_ma_twoball"], pass: "20 sole rolls with each foot without losing the ball" },
      { drills: ["sk_ma_speed", "m_inside_outside", "d_toetaps", "sk_ma_follow"], pass: "50 toe taps in 30 seconds (Orange belt)", test: "toetaps", target: 50 },
      { drills: ["sk_ma_pisar"], pass: "Dad touches the ball 0 times in 20 seconds, 3 goes in a row" },
      { drills: ["sk_ma_keep", "r_baby_futbol"], pass: "Keep it from Dad for 30 seconds, 3 times out of 5" },
    ],
  },
  stop: {
    id: "stop", short: "Stop", family: "ball", name: "Stop the ball", icon: "🛑", ref: "jp",
    why: "Stop (止める) is the first of Yahiro Kazama's six skills: stop, kick, carry, receive, get free, look.",
    levels: [
      { drills: ["sk_st_dead", "c_bounce_control", "sk_st_air"], pass: "8 of 10 dead stops with each foot" },
      { drills: ["sk_st_away", "p_open_up"], pass: "10 first touches through a gate, both sides, ball never stops" },
      { drills: ["sk_st_press", "p_toss_control"], pass: "8 of 10 first touches away from Dad" },
      { drills: ["r_w_touchline", "r_cm_scan_turn"], pass: "In a game: 3 first touches into space" },
    ],
  },
  pass: {
    id: "pass", short: "Pass", family: "ball", name: "Pass", icon: "🎯", ref: "es",
    why: "La Masia: “the more you move, the more passing options your team-mate has, but the real running is done by the ball”.",
    levels: [
      { drills: ["sk_pa_inside", "p_two_touch"], pass: "8 of 10 through a 1 m gate from 6 m, each foot" },
      { drills: ["sk_pa_one", "p_weak_wall"], pass: "20 one-touch wall passes in a row, both feet" },
      { drills: ["sk_pa_move"], pass: "10 give-and-gos with Dad without the ball stopping" },
      { drills: ["sk_pa_gates", "r_rondo"], pass: "Win the gate game: 10 points before Dad blocks 5" },
    ],
  },
  carry: {
    id: "carry", short: "Carry", family: "ball", name: "Carry", icon: "🏃", ref: "jp",
    why: "Kawasaki Frontale's U‑10s start with carrying the ball and taking players on. Passing comes more at U‑11 and U‑12.",
    levels: [
      { drills: ["sk_ca_laces", "k_run_ball", "sk_ca_race"], pass: "20 m with the laces in 6 touches or fewer, head up" },
      { drills: ["sk_ca_stopgo", "m_slalom"], pass: "Slalom in 21 seconds or faster (Orange belt)", test: "slalom", target: 21 },
      { drills: ["sk_ca_space", "r_cb_carry"], pass: "8 of 10 times you carry into the side Dad leaves open" },
      { drills: ["sk_ca_gates"], pass: "6 gates in 60 seconds with Dad defending" },
    ],
  },
  beat: {
    id: "beat", short: "Beat", family: "ball", name: "Beat a player", icon: "⚡", ref: "jp",
    why: "Mitoma: “If you can move the opponent's body, you win.” He hardly looks down when he dribbles.",
    levels: [
      { drills: ["sk_be_turns", "m_dragback_v", "m_l_turn"], pass: "All 4 turns with both feet, ball never gets away" },
      { drills: ["sk_be_scissors", "m_beat_cone"], pass: "Move and explode past the cone 8 of 10, both sides" },
      { drills: ["sk_be_weight", "r_w_mitoma"], pass: "Beat Dad 5 of 10 in the channel" },
      { drills: ["sk_be_1v1", "r_baby_futbol"], pass: "In a game: beat a player 3 times" },
    ],
  },
  finish: {
    id: "finish", short: "Finish", family: "ball", name: "Finish", icon: "🥅", ref: "ar",
    why: "At Grandoli, Messi's first club, a teammate remembers: “We'd wait for the rebound, or he'd finish the goal.”",
    levels: [
      { drills: ["sk_fi_laces", "k_roll_strike", "sk_fi_bounce"], pass: "7 of 10 on target with the laces, each foot" },
      { drills: ["sk_fi_corners", "k_shots", "k_first_time"], pass: "7 of 10 shots on target (Blue belt)", test: "shots", target: 7 },
      { drills: ["sk_fi_turn", "r_st_rebound"], pass: "Turn and shoot on target 6 of 10" },
      { drills: ["sk_fi_1v1gk"], pass: "Score 5 of 10 against Dad in goal" },
    ],
  },
  move: {
    id: "move", short: "Move", family: "body", name: "Move well", icon: "🤸", ref: "jp",
    why: "Yahiro Kazama's academy trains three things: using the ball, using your body and using your head.",
    levels: [
      { drills: ["sk_mo_coord", "d_hops"], pass: "All the coordination moves without dropping the ball" },
      { drills: ["sk_mo_feet", "d_tick_tock"], pass: "5 clean quick-feet runs, never touching the line" },
      { drills: ["sk_mo_react", "d_bounce_react"], pass: "8 of 8 sprints the right way, first time" },
      { drills: ["sk_mo_mirror"], pass: "Stay in front of Dad for 20 seconds, 3 times" },
    ],
  },
  defend: {
    id: "defend", short: "Defend", family: "body", name: "Defend 1v1", icon: "🛡️", ref: "jp",
    why: "Japan's FA 8-a-side guide: every position keeps attacking and defending.",
    levels: [
      { drills: ["f_shadow_jockey", "f_recovery_runs"], pass: "60 seconds side-on without crossing your feet" },
      { drills: ["f_jockey", "sk_de_steal"], pass: "Stay on your feet for 5 seconds, 8 of 10" },
      { drills: ["f_goalside", "r_cb_step_drop"], pass: "Win the goal-side race 7 of 10" },
      { drills: ["sk_de_duel"], pass: "Win the duel game to 5" },
    ],
  },
  keeper: {
    id: "keeper", short: "Keeper", family: "body", name: "Keeper hands", icon: "🧤", ref: "jp",
    why: "Japan's FA: every child practises handling the ball, as whole-body coordination, and kids take turns in goal.",
    levels: [
      { drills: ["sk_gk_wall", "r_gk_bounce_catch"], pass: "20 clean catches in a row" },
      { drills: ["sk_gk_shuffle", "r_gk_set"], pass: "SET before every shot, 10 of 10" },
      { drills: ["r_gk_angle", "r_gk_feet"], pass: "The right spot for all 5 balls in the fan" },
      { drills: ["sk_gk_game"], pass: "Play keeper in a game and roll it out fast every time" },
    ],
  },
  look: {
    id: "look", short: "Look", family: "head", name: "Look", icon: "👀", ref: "es",
    why: "Barça's rondos build “speed of thought, awareness of space and body control”.",
    levels: [
      { drills: ["sk_lo_fingers", "d_scan_toss", "sk_lo_numbers"], pass: "The right number 15 of 20 times" },
      { drills: ["sk_lo_twice", "fo_colour_dribble"], pass: "Two looks before every touch for 1 minute" },
      { drills: ["fo_check_receive", "r_cm_scan_turn"], pass: "A look before every receive, 10 of 10" },
      { drills: ["b_pause_pick", "b_watch_pro"], pass: "Pause & pick: 14 right (Green belt)" },
    ],
  },
  getfree: {
    id: "getfree", short: "Get free", family: "head", name: "Get free", icon: "💨", ref: "jp",
    why: "At his U‑10 selection, young Mitoma watched from a step back instead of chasing the ball, then ran in to receive.",
    levels: [
      { drills: ["sk_gf_check", "b_where_go"], pass: "Away, then back and half-turned, 10 of 10" },
      { drills: ["r_st_show_spin", "r_cm_angle"], pass: "The right run on every call, 10 of 10" },
      { drills: ["sk_gf_lose"], pass: "8 clean receives in 60 seconds with Dad marking" },
      { drills: ["sk_gf_wall", "fo_find_line"], pass: "Beat Dad with a wall pass 6 of 10" },
    ],
  },
  winback: {
    id: "winback", short: "Win back", family: "head", name: "Win it back", icon: "🔁", ref: "ar",
    why: "River Plate's football schools teach immediate recovery of the ball (recuperación inmediata).",
    levels: [
      { drills: ["s_drop_pounce", "s_second_ball"], pass: "Win it before the second bounce 8 of 10" },
      { drills: ["sk_wb_react"], pass: "Touch the ball within 5 seconds, 6 of 8" },
      { drills: ["r_cm_winback", "r_wd_recover"], pass: "Win it back before 5, five times" },
      { drills: ["sk_wb_game"], pass: "In a game: win it back within 5 seconds 3 times" },
    ],
  },
};

// Which skill levels a drill belongs to: { drillId: [{ skill, level }] }
export const DRILL_SKILLS = {};
for (const s of Object.values(SKILLS)) {
  s.levels.forEach((l, i) => l.drills.forEach((d) => (DRILL_SKILLS[d] = DRILL_SKILLS[d] || []).push({ skill: s.id, level: i + 1 })));
}

// The academy lessons we train by. Each one says where it comes from and what the app does with it.
export const PRINCIPLES = [
  { ref: "ar", rule: "Technique every day", said: "Argentinos Juniors: “technique is non-negotiable”. “Control, control, control.”", how: "The Daily 3 happens every day, even on team days.", url: "https://www.bbc.co.uk/sport/football/47961674" },
  { ref: "jp", rule: "Carry and take players on first", said: "Kawasaki Frontale's U‑10s start with carrying the ball and taking players on. Passing grows at U‑11 and U‑12.", how: "Carry and Beat a player come round most often.", url: "https://www.sakaiku.jp/column/technique/2019/014085.html" },
  { ref: "jp", rule: "Move the defender", said: "Mitoma: “If you can move the opponent's body, you win.”", how: "Beat a player, levels 3 and 4: watch his hips and go when he moves.", url: "https://number.bunshun.jp/articles/-/845385" },
  { ref: "ar", rule: "Both feet", said: "Jorge Griffa at Newell's told left-footed kids to learn their right, and right-footed kids their left.", how: "Every level is done with both feet.", url: "https://newellsletter.substack.com/p/el-maestro" },
  { ref: "es", rule: "Look, then decide", said: "Barça's rondos build “speed of thought, awareness of space and body control”. Real Madrid Foundation schools stress perception and decisions.", how: "The Look and Get free skills, and the Pause & pick pictures.", url: "https://www.fcbarcelona.com/en/news/732671/fc-barcelona-pay-tribute-to-the-rondo" },
  { ref: "es", rule: "Simple first, then add a defender", said: "A Spanish method for ages 9 to 12 brings in a passive defender step by step (“introducción progresiva de oposición pasiva”).", how: "The 4 levels: alone, faster, Dad defends, then a game.", url: "https://bcnwinmethod.com/actividad-formativa-para-entrenadores-de-futbol-base-etapa-de-aprendizaje-9-12-anos-9" },
  { ref: "ar", rule: "Small spaces, lots of touches", said: "Baby fútbol builds “explosive play, a deftness of touch and quickness of thinking”.", how: "Level 4 of most skills is a small game.", url: "https://www.thefa.com/bootroom/resources/coaching/study-visit-buenos-aires-and-baby-futbol" },
  { ref: "jp", rule: "Ball, body and head", said: "Yahiro Kazama's academy trains using the ball, the body and the head, and names six skills: stop, kick, carry, receive, get free, look.", how: "The 12 skills are grouped Ball, Body and Head.", url: "https://tratre.com/about/" },
  { ref: "jp", rule: "Every role attacks and defends", said: "Japan's FA: don't fix positions early. In 8-a-side every position attacks and defends.", how: "The role of the week rotates through all six, keeper too.", url: "https://www.jfa.jp/documents/guideline/" },
  { ref: "jp", rule: "Everyone uses their hands", said: "Japan's FA: all kids practise handling the ball as whole-body coordination, and take turns in goal.", how: "Keeper hands is a skill for everyone.", url: "https://www.jfa.jp/documents/guideline/" },
  { ref: "ar", rule: "Win it back straight away", said: "River Plate's schools teach immediate recovery (“recuperación inmediata”).", how: "The Win it back skill and the 5-second rule.", url: "https://www.riverplate.com/academia/escuelas-river-plate" },
  { ref: "es", rule: "Small jobs", said: "Villarreal gives young players “small tasks and responsibilities”.", how: "The 3-line My job card for each role.", url: "https://es.coachesvoice.com/cv/villarreal-academia-metodologia-formacion/" },
];

export const SKILL_DRILLS = {
  // ---------- Ball mastery ----------
  sk_ma_feel: { area: "mastery", name: "Ball feeling 10", mins: 4, cue: "Soft feet, both feet",
    steps: ["10 moves, 20 seconds each: toe taps, sole roll across, sole pull-back, inside-inside, outside-inside, V pull, step-over, sole to inside, L-drag, roll and stop.", "Both feet on every move. Slow and clean first.", "Eyes up for the last 5 seconds of each move."] },
  sk_ma_speed: { area: "mastery", name: "Fast feet 30", mins: 4, cue: "Fast but clean",
    steps: ["Pick your 3 best moves from Ball feeling 10.", "30 seconds each, as fast as you can without the ball getting away. Rest 15 seconds.", "Count the touches on one move and beat it next time."] },
  sk_ma_pisar: { area: "mastery", name: "Sole in the box", mins: 4, cue: "Body between Dad and the ball", needs: ["partner"], alt: ["m_sole_rolls"],
    steps: ["Make a 3 by 3 m box. Keep the ball with sole rolls and pull-backs.", "Dad walks in and tries to touch the ball with his foot. Keep your body between him and the ball.", "20 seconds a go. Count how many times he touches it. Get it to zero."] },
  sk_ma_keep: { area: "mastery", name: "Keep it 30", mins: 4, cue: "Shield, roll, turn away", needs: ["partner"], alt: ["m_sole_rolls"],
    steps: ["Box of 5 by 5 m. Dad tries to win the ball for real, at half speed.", "Shield it, sole roll, turn away. Keep it for 30 seconds.", "If he wins it, swap. Best of 5."] },

  sk_ma_twoball: { area: "mastery", name: "Juggle-bounce touches", mins: 4, cue: "Soft laces, let it bounce",
    steps: ["Kick the ball up with your laces, let it bounce once, kick it up again. Right, left, right, left.", "When that's easy: two touches before the bounce.", "Count your best run. Every 10, look up and name something."] },
  sk_ma_follow: { area: "mastery", name: "Follow-along 5", mins: 5, cue: "Keep going, keep it close",
    steps: ["Play a ball-mastery follow-along video and copy the coach for 5 minutes.", "Never stop moving your feet. If the ball gets away, get it back fast and join in again.", "Use the one you like most more than once."] },

  // ---------- Stop the ball ----------
  sk_st_dead: { area: "control", name: "Stop it dead", mins: 4, cue: "The ball doesn't move", needs: ["wall"], alt: ["c_bounce_control"], ref: "jp",
    why: "Stop (止める) is the first of Yahiro Kazama's six skills.",
    steps: ["Pass at a wall from 4 m.", "Stop the return dead under your sole so it doesn't move at all. Then pass with the other foot.", "10 dead stops with each foot. It only counts if the ball stays still."] },
  sk_st_away: { area: "control", name: "First touch into space", mins: 4, cue: "Touch it where you go next", needs: ["wall"], alt: ["p_toss_control"],
    steps: ["Put a cone gate 2 m to each side of you.", "Pass at the wall. Your first touch goes through one gate. Never stop it under you.", "Pass again from there. Left gate, right gate, both feet."] },
  sk_st_press: { area: "control", name: "Touch away from Dad", mins: 4, cue: "First touch away from pressure", needs: ["partner"], alt: ["sk_st_away"],
    steps: ["Dad passes to you from 6 m, then runs at you from one side.", "Your first touch goes away from him, to the other side. Carry it 3 steps.", "He changes side each time. After 10, he runs faster."] },

  sk_st_air: { area: "control", name: "Kill the high ball", mins: 4, cue: "Meet it, then give with it",
    steps: ["Throw the ball high in front of you.", "As it drops, lift your foot to meet it and pull back as it lands, so it stops dead. Laces, inside, then thigh.", "10 with each foot. It only counts if the ball stays within a step."] },

  // ---------- Pass ----------
  sk_pa_inside: { area: "control", name: "Inside-foot gate passes", mins: 4, cue: "Ankle locked, toe up",
    steps: ["Make a cone gate 1 m wide, 6 m away.", "Pass through it with the inside of your foot. Standing foot beside the ball, pointing at the gate.", "10 with each foot. Count how many go through. Step back 1 m when you get 8."] },
  sk_pa_one: { area: "wall", name: "One-touch wall passes", mins: 4, cue: "On your toes, body behind the ball", needs: ["wall"], alt: ["sk_pa_inside"], ref: "es",
    why: "La Masia: “the real running is done by the ball”.",
    steps: ["Stand 3 m from a wall. Pass one-touch: no control, just pass the return.", "Right, left, right, left. Stay on your toes.", "Count how many in a row and beat your record."] },
  sk_pa_move: { area: "control", name: "Pass and move", mins: 4, cue: "Pass, then move", needs: ["partner"], alt: ["sk_pa_one"], ref: "es",
    why: "La Masia: “the more you move, the more passing options your team-mate has”.",
    steps: ["Dad stands 6 m away. Pass to him and move straight away to a new cone.", "He passes to where you are going, not where you were.", "10 passes, then swap feet."] },
  sk_pa_gates: { area: "control", name: "Gate game", mins: 5, cue: "Find the open gate", needs: ["partner"], alt: ["sk_pa_inside"],
    steps: ["Put 4 or 5 cone gates around the garden or park.", "With Dad or a friend: pass to each other through a gate for a point. Dad tries to block the gates.", "First to 10. You can't use the same gate twice in a row."] },

  // ---------- Carry ----------
  sk_ca_laces: { area: "onevone", name: "Carry with the laces", mins: 4, cue: "Big touch in space, small touch near people", ref: "jp",
    why: "Kawasaki Frontale's U‑10s start with carrying the ball and taking players on.",
    steps: ["Carry the ball 20 m with your laces, toes pointing down.", "One touch every 2 or 3 steps. Look up between touches.", "Walk back. 6 runs, 3 with each foot."] },
  sk_ca_stopgo: { area: "onevone", name: "Stop & go", mins: 4, cue: "Stop with the sole, explode", cues: "arrows",
    steps: ["Carry the ball fast. When coach mode flashes an arrow, stop the ball dead with your sole.", "Then explode away with a push touch the way the arrow points.", "8 goes with each foot."] },
  sk_ca_space: { area: "onevone", name: "Carry into space", mins: 4, cue: "Space in front? Carry it", needs: ["partner"], alt: ["k_run_ball"], ref: "es",
    why: "A Spanish model for 8 and 9 year olds: “If I can carry forward, I carry. If they block me, I pass.”",
    steps: ["Dad stands 10 m in front of you, a bit to one side. A line of cones behind him.", "Look up, then carry into the side he leaves open and over the line.", "He moves each go. Look before you start."] },
  sk_ca_gates: { area: "onevone", name: "4-gate dribble game", mins: 5, cue: "Head up, find the free gate", needs: ["partner"], alt: ["sk_ca_stopgo"],
    steps: ["Put 4 cone gates around a 15 by 15 m space.", "Dribble through any gate for a point. Dad defends and can only guard one gate at a time.", "60 seconds. Beat your score. Then Dad dribbles and you defend."] },

  sk_ca_race: { area: "onevone", name: "Dribble race", mins: 4, cue: "Fast feet, ball close at the turn", ref: "ar",
    why: "Argentine baby fútbol builds “explosive play, a deftness of touch and quickness of thinking”.",
    steps: ["Two cones 10 m apart. Dribble to the far cone, round it and back.", "Race Dad (he runs without a ball) or beat your own time on the stopwatch.", "6 races. Round the cone with the outside of your foot, then the inside."] },

  // ---------- Beat a player ----------
  sk_be_turns: { area: "dragback", name: "4 turns", mins: 4, cue: "Turn, then go fast",
    steps: ["Dribble to a cone. Turn with an inside cut, outside cut, drag-back and Cruyff turn.", "5 of each, both feet. Explode for 3 steps after every turn.", "Pick your best turn and do it 5 more times at full speed."] },
  sk_be_scissors: { area: "onevone", name: "Scissors & step-over", mins: 4, cue: "Big move, small touch away",
    steps: ["Walk through a scissors: step round the ball with one foot, push it away with the outside of the other.", "Now at a cone 1 m in front: scissors, then go the other way fast.", "10 each side. Then do the same with a step-over."] },
  sk_be_weight: { area: "onevone", name: "Move his weight", mins: 4, cue: "Watch his hips", needs: ["partner"], alt: ["m_beat_cone"], ref: "jp",
    why: "Mitoma: “If you can move the opponent's body, you win.”",
    steps: ["Dad stands 2 m in front of you in a channel 5 m wide.", "Fake one way with a shoulder drop or a step. Watch his hips: when they move, go the other way.", "Only go when he moves. 10 goes. Count the ones where he moved first."] },
  sk_be_1v1: { area: "onevone", name: "1v1 to two goals", mins: 5, cue: "Attack his front foot", needs: ["partner"], alt: ["m_beat_cone"], ref: "ar",
    why: "Argentine baby fútbol builds “explosive play, a deftness of touch and quickness of thinking”.",
    steps: ["Make a pitch 10 by 15 m with two small goals on Dad's line.", "Beat Dad and dribble through either goal. If he wins it, he attacks your line.", "First to 5. Rest a minute between games."] },

  // ---------- Finish ----------
  sk_fi_laces: { area: "shooting", name: "Laces strike", mins: 4, cue: "Toe down, ankle locked",
    steps: ["Ball still, 10 m from a wall or goal. Two steps back and one to the side.", "Standing foot next to the ball, pointing at the goal. Strike through the middle with your laces, toe down.", "10 with each foot. Land on your kicking foot."] },
  sk_fi_corners: { area: "shooting", name: "Pick a corner", mins: 4, cue: "Look, pick, then strike",
    steps: ["Put a cone or bottle in each bottom corner of the goal.", "Before each shot, call LEFT or RIGHT. Then hit that corner low.", "10 shots, both feet. Count the hits on your called corner."] },
  sk_fi_turn: { area: "shooting", name: "Turn & shoot", mins: 4, cue: "Open up, shoot early", needs: ["partner"], alt: ["k_roll_strike"],
    steps: ["Stand 12 m out with your back to goal. Dad passes to you.", "Turn with your first touch. Shoot with your second.", "10 goes, turning both ways."] },
  sk_fi_1v1gk: { area: "shooting", name: "1v1 with the keeper", mins: 5, cue: "Ball close, finish low", needs: ["partner"], alt: ["sk_fi_corners"],
    steps: ["Dad goes in goal. You start 20 m out with the ball.", "Dribble at him. When he comes out, slide it low past him or go round him.", "Follow every shot in for the rebound. 10 goes."] },

  sk_fi_bounce: { area: "shooting", name: "Bouncing-ball strike", mins: 4, cue: "Head over the ball, keep it low",
    steps: ["Drop the ball from your hands and strike it just after it bounces, with your laces.", "Knee over the ball so the shot stays low. Aim at a wall or goal 8 m away.", "10 with each foot."] },

  // ---------- Move well ----------
  sk_mo_coord: { area: "agility", name: "Coordination 10", mins: 4, cue: "Smooth first, then fast", ref: "jp",
    why: "Yahiro Kazama's academy trains using the ball, using your body and using your head.",
    steps: ["Skip while you throw and catch the ball. Walk while you bounce it with one hand, then the other.", "Juggle it hand, foot, hand. Throw it up, clap twice, catch.", "Stand on one leg and pass the ball round your waist 10 times. Other leg."] },
  sk_mo_feet: { area: "footwork", name: "Quick-feet line", mins: 4, cue: "On your toes, arms help",
    steps: ["Put 6 cones in a line, a step apart, or lay a rope on the ground.", "Quick feet along it: two feet in each gap, then side-on, then hopscotch.", "5 runs of each. Quick, not rushed. Don't touch the line."] },
  sk_mo_react: { area: "agility", name: "Reaction sprints", mins: 4, cue: "Go on the signal", cues: "arrows",
    steps: ["Stand in the middle of 4 cones, each 5 m away.", "Coach mode flashes an arrow. Sprint to that cone and back.", "8 sprints, rest 30 seconds, then 8 more."] },
  sk_mo_mirror: { area: "agility", name: "Mirror game", mins: 4, cue: "Hips low, stay in front", needs: ["partner"], alt: ["sk_mo_react"],
    steps: ["Face Dad between 2 cones 5 m apart.", "He moves side to side and changes speed. Copy him and stay in front.", "20 seconds, then swap who leads. 5 each."] },

  // ---------- Defend 1v1 ----------
  sk_de_steal: { area: "defend", name: "Side-on steal", mins: 4, cue: "Poke it when it leaves his foot", needs: ["partner"], alt: ["f_shadow_jockey"],
    steps: ["Dad dribbles slowly at you in a channel 5 m wide.", "Side-on, 1 m away. When his touch goes too far, poke the ball away with your front foot.", "Only go when the ball leaves his foot. 10 goes."] },
  sk_de_duel: { area: "defend", name: "1v1 duel to the line", mins: 5, cue: "Slow him, then win it", needs: ["partner"], alt: ["f_jockey"], ref: "jp",
    why: "Japan's FA 8-a-side guide: every position keeps attacking and defending.",
    steps: ["Channel 8 m wide and 15 m long. Dad attacks your line with the ball.", "Close him down fast, slow down at 2 m, show him one way and win it.", "Win it, then dribble over his line. First to 5."] },

  // ---------- Keeper hands ----------
  sk_gk_wall: { area: "keeper", name: "Wall catch", mins: 4, cue: "Hands in a W", needs: ["wall"], alt: ["r_gk_bounce_catch"], ref: "jp",
    why: "Japan's FA: every child practises handling the ball, as whole-body coordination.",
    steps: ["Stand 3 m from a wall. Throw the ball at it.", "Catch with your hands in a W, thumbs nearly touching, behind the ball.", "20 catches, then 20 more from further away or harder."] },
  sk_gk_shuffle: { area: "keeper", name: "Shuffle & catch", mins: 4, cue: "Side steps, never cross your feet", needs: ["partner"], alt: ["sk_gk_wall"],
    steps: ["Goal of 2 cones, 4 m apart. Dad stands 5 m out.", "He points left or right. Shuffle across, get SET, then he throws or kicks it at you.", "10 each side. Catch it and hug it to your chest."] },
  sk_gk_game: { area: "keeper", name: "Keeper for a game", mins: 5, cue: "SET, catch, roll it out", needs: ["partner"], alt: ["sk_gk_wall"], ref: "jp",
    why: "Japan's FA: from U‑10 to U‑12, lots of kids should take turns in goal during games.",
    steps: ["In the next game with friends, or Dad taking 10 shots, you are the keeper.", "Get SET for every shot. Catch what you can, push away what you can't. Dives only on grass.", "When you have it, roll it out fast to a free player."] },

  // ---------- Look ----------
  sk_lo_fingers: { area: "look", name: "How many fingers?", mins: 4, cue: "Look before the ball arrives", needs: ["partner"], alt: ["d_scan_toss"], ref: "es",
    why: "Barça's rondos build “speed of thought, awareness of space and body control”.",
    steps: ["Dad stands behind you and holds up fingers. Pass at a wall, or someone passes to you from in front.", "Before the ball arrives, look over your shoulder and shout the number.", "Then control and pass. 20 goes, both shoulders."] },
  sk_lo_twice: { area: "look", name: "Look twice", mins: 4, cue: "Look, look, then touch", needs: ["wall"], alt: ["d_scan_toss"], cues: "colours", ref: "jp",
    why: "Mitoma keeps the defender and the space in view until the ball arrives.",
    steps: ["Tablet on the ground 3 m behind you. Pass at a wall.", "Look over your shoulder twice: once as you pass, once just before it comes back. Shout the colour both times.", "GREEN: turn with it. RED: pass it straight back."] },

  sk_lo_numbers: { area: "look", name: "Number call", mins: 4, cue: "Look up, say it, then touch", cues: "numbers",
    steps: ["Dribble in a small box. Tablet on the ground by one side.", "Coach mode flashes numbers. Look up and shout each one while you keep the ball close.", "Harder: when it shows an even number, turn and go the other way."] },

  // ---------- Get free ----------
  sk_gf_check: { area: "position", name: "Check away, check back", mins: 4, cue: "Away first, then come short", needs: ["partner"], alt: ["r_st_show_spin"], ref: "jp",
    why: "Get free (外す) is one of Yahiro Kazama's six skills.",
    steps: ["Put a cone 5 m in front of Dad, who has the ball.", "Jog 3 steps away from the ball, then sprint back to the cone and call for it.", "Receive half-turned, turn and dribble. 10 goes, both sides."] },
  sk_gf_lose: { area: "position", name: "Lose Dad", mins: 4, cue: "Move when he watches the ball", needs: ["partner", "wall"], alt: ["sk_gf_check"], ref: "jp",
    why: "At his U‑10 selection, young Mitoma watched from a step back instead of chasing the ball, then ran in to receive.",
    steps: ["The wall is your passer. Dad marks you, close.", "When Dad looks at the ball, move away fast into space and call. Pass at the wall and take the return where he isn't.", "Count clean receives in 60 seconds."] },
  sk_gf_wall: { area: "position", name: "Wall pass past Dad", mins: 5, cue: "Pass and sprint past him", needs: ["partner"], alt: ["sk_pa_move"], ref: "es",
    why: "A Spanish method for ages 9 to 12 (BCNwin) works on support players and wall passes (paredes).",
    steps: ["You need a teammate: a friend, or a wall to bounce it off. Dad defends.", "Dribble at Dad. When he comes to you, pass to your teammate and sprint past him for the return.", "Stop the ball on the line behind him to score. 10 goes."] },

  // ---------- Win it back ----------
  sk_wb_react: { area: "second", name: "Lost it? Go!", mins: 4, cue: "First step toward the ball", needs: ["partner"], alt: ["s_drop_pounce"], ref: "ar",
    why: "River Plate's football schools teach immediate recovery of the ball.",
    steps: ["Dribble in a 10 by 10 m box. When Dad shouts STEAL, he takes the ball off you.", "Chase straight away. Touch the ball or Dad within 5 seconds.", "8 goes. Count your wins."] },
  sk_wb_game: { area: "second", name: "5-second rule game", mins: 5, cue: "Lose it, press it", needs: ["partner"], alt: ["r_cm_winback"],
    steps: ["In any game with friends (2v2 or 3v3): when your team loses the ball, everyone near it presses for 5 seconds.", "Count out loud. Win it back before 5 and your team gets a bonus point.", "After 5, get back goal-side."] },
};

export const SKILL_SOURCES = [
  { ref: "jp", label: "Traum Training (Yahiro Kazama): ball, body, head; the six skills", url: "https://tratre.com/about/" },
  { ref: "es", label: "BCNwin: a 9 to 12 session with passive defenders brought in step by step", url: "https://bcnwinmethod.com/actividad-formativa-para-entrenadores-de-futbol-base-etapa-de-aprendizaje-9-12-anos-9" },
];
