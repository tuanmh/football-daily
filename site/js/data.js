// Content for Football Daily: areas, drills, tests, belts, focuses, brain pictures. Skills & levels: skills.js. Roles: roles.js.
// Plain data only. Logic lives in plan.js. Role content (9v9) lives in roles.js.
import { ROLE_DRILLS, ROLE_SCENARIOS, BASE_SCENARIO_ROLES } from './roles.js';
import { SKILL_DRILLS } from './skills.js';
export { ROLES, ROLE_SEQ, REFS, ROLE_SOURCES, SHAPE_323, ROLE_EXTRAS } from './roles.js';
export { SKILLS, SKILL_SEQ, SKILL_ROTATION, LEVELS, FAMILIES, PRINCIPLES, DRILL_SKILLS } from './skills.js';

export const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const JS_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']; // Date#getUTCDay order
export const DAY_LABEL = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' };

// Public tft-tube category pages (free membership needed to watch the videos).
export const TFT = {
  agility: 'https://tft-tube.com/speed-and-agility/',
  control: 'https://tft-tube.com/fpe-b1/',
  mastery: 'https://tft-tube.com/ffs-bm-1/',
  dragback: 'https://tft-tube.com/drag-back-v-1/',
  footwork: 'https://tft-tube.com/ffp-b1/',
  rebounder: 'https://tft-tube.com/sp-reb-1/',
  juggling: 'https://tft-tube.com/fjp-1/',
  wall: 'https://tft-tube.com/wall-work-1/',
  balance: 'https://tft-tube.com/1-btf-balance-and-footshapes/',
  hopping: 'https://tft-tube.com/2-hopping-foot-shapes/',
};

// 18 areas: the 8 tft-tube tiles, 9 added for the game around the ball, and the 9v9 roles.
export const AREAS = [
  { id: 'skills', name: 'Skills & levels', blurb: '12 skills from the academies, 4 levels each.', href: '#/skills' },
  { id: 'agility', name: 'Agility', tft: TFT.agility },
  { id: 'control', name: 'Control & Pass', tft: TFT.control },
  { id: 'mastery', name: 'Ball Mastery', tft: TFT.mastery },
  { id: 'dragback', name: 'Drag Back Vs', tft: TFT.dragback },
  { id: 'footwork', name: 'Footwork', tft: TFT.footwork },
  { id: 'juggling', name: 'Juggling', tft: TFT.juggling },
  { id: 'rebounder', name: 'Spring Rebounder', tft: TFT.rebounder },
  { id: 'wall', name: 'Wall Work', tft: TFT.wall },
  { id: 'look', name: 'Look & Decide', blurb: 'Check your shoulders before the ball arrives.' },
  { id: 'brain', name: 'Game Brain', blurb: 'Pick the right move from a frozen picture.' },
  { id: 'position', name: 'Where do I go?', blurb: 'Our ball, their ball, keeper\'s ball.' },
  { id: 'defend', name: 'Defending', blurb: 'Goal-side, side-on, stay on your feet.' },
  { id: 'second', name: 'Second Ball', blurb: 'React first when the ball drops.' },
  { id: 'onevone', name: '1v1 & Running with the ball', blurb: 'Beat a player, carry it at speed.' },
  { id: 'shooting', name: 'Shooting', blurb: 'Both feet, laces, on target.' },
  { id: 'weak', name: 'Weak Foot', blurb: 'Make the other foot useful.' },
  { id: 'warmup', name: 'Warm-up & Recovery', blurb: 'Ready before, looked after after.' },
  { id: 'keeper', name: 'Keeper', blurb: 'Catching, set position and shuffles. Everyone takes a turn in goal.' },
  { id: 'roles', name: 'Roles 9v9', blurb: 'Keeper, centre back, wide defender, midfield, winger, striker.', href: '#/roles' },
];

export const BELTS = [
  { id: 'white', name: 'White', color: '#f2f2f2' },
  { id: 'yellow', name: 'Yellow', color: '#ffd23f' },
  { id: 'orange', name: 'Orange', color: '#ff9a3c' },
  { id: 'green', name: 'Green', color: '#2fd67b' },
  { id: 'blue', name: 'Blue', color: '#3d7bff' },
  { id: 'purple', name: 'Purple', color: '#9b6bff' },
  { id: 'black', name: 'Black', color: '#0b0b0b' },
];

// Starter targets for home tests (not age norms). dir 'up' = higher is better.
export const TESTS = {
  juggle: { id: 'juggle', name: 'Juggling record', unit: 'touches', dir: 'up', steps: [5, 10, 20, 35, 50, 75, 100] },
  toetaps: { id: 'toetaps', name: 'Toe taps in 30 s', unit: 'taps', dir: 'up', steps: [30, 40, 50, 60, 70, 80, 90] },
  wall30: { id: 'wall30', name: 'Wall passes in 30 s', unit: 'passes', dir: 'up', steps: [8, 11, 14, 17, 20, 23, 26] },
  weak30: { id: 'weak30', name: 'Weak-foot passes in 30 s', unit: 'passes', dir: 'up', steps: [5, 8, 11, 14, 17, 20, 23] },
  slalom: { id: 'slalom', name: 'Slalom time', unit: 's', dir: 'down', steps: [26, 23, 21, 19, 17, 16, 15] },
  shots: { id: 'shots', name: 'Shots on target', unit: '/10', dir: 'up', steps: [3, 4, 5, 6, 7, 8, 9] },
};
export const BRAIN_BELT_STEPS = [1, 4, 8, 14, 22, 32, 42];

// needs: 'wall' | 'rebounder' | 'partner'. alt: tried in order when needs are missing.
// cues: the app flashes colours / numbers / arrows / calls during the timer.
const CORE_DRILLS = {
  // Daily 3: BOUNCE slot
  d_toetaps: { area: 'footwork', name: 'Toe taps', mins: 2, cue: 'Bounce', test: 'toetaps',
    steps: ['Ball in front of you. Tap the top of it with one foot, then the other.', 'Stay on your toes with soft knees. Quick and light.', '30 seconds on, 15 seconds rest, twice. Count your taps on the second go and log them.'] },
  d_bounce_react: { area: 'agility', name: 'Bounce & react', mins: 2, cue: 'Bounce', cues: 'arrows',
    steps: ['Feet apart, knees soft, bouncing on your toes.', 'When an arrow flashes, take 2 quick steps that way, then bounce back to the middle.', 'Never stand still. Flat feet means start again.'] },
  d_tick_tock: { area: 'footwork', name: 'Tick-tock', mins: 2, cue: 'Bounce',
    steps: ['Pass the ball between the insides of your feet, fast and small.', 'Stay on your toes. The ball never goes wider than your shoulders.', '30 seconds on the spot, then 30 seconds moving forward and back.'] },
  d_hops: { area: 'agility', name: 'Hop & land', mins: 2, cue: 'Land soft', tft: TFT.hopping,
    steps: ['Hop over a line on one foot: 5 forwards and back, 5 side to side. Swap feet.', 'Land on the front of your foot with a soft knee and hold for a second.', 'Finish with 10 fast toe taps on the ball.'] },

  // Daily 3: TOUCH slot
  d_juggle: { area: 'juggling', name: 'Juggling record', mins: 3, cue: 'Toes pointed, soft laces', test: 'juggle',
    steps: ['Try to beat your record. Laces, toes pointed, ball no higher than your head.', 'Use both feet if you can. Count out loud.', 'Log your best try today.'] },
  d_juggle_pattern: { area: 'juggling', name: 'Juggling: right-left', mins: 3, cue: 'Toes pointed',
    steps: ['Swap feet every touch: right, left, right, left.', 'If it gets away, one bounce is allowed. Keep going.', 'Beat your best run of alternate touches.'] },

  // Daily 3: LOOK slot
  d_scan_wall: { area: 'wall', name: 'Shoulder-check wall passes', mins: 3, cue: 'Look, then touch', cues: 'colours',
    needs: ['wall'], alt: ['d_scan_reb', 'd_scan_toss'],
    steps: ['Stand 3 m from a wall. Put the tablet on the ground 3 m behind you, screen facing you.', 'Pass. While the ball comes back, look over your shoulder and shout the colour.', 'Then control and pass again. Use both feet.'] },
  d_scan_reb: { area: 'rebounder', name: 'Shoulder-check rebounder', mins: 3, cue: 'Look, then touch', cues: 'colours',
    needs: ['rebounder'],
    steps: ['Rebounder 3 m in front of you, tablet 3 m behind you.', 'Pass into the rebounder. Before the ball comes back, look over your shoulder and shout the colour.', 'Control and pass again. Both feet.'] },
  d_scan_toss: { area: 'look', name: 'Look, toss & control', mins: 3, cue: 'Look, then touch', cues: 'colours',
    steps: ['Tablet on the ground 3 m behind you.', 'Toss the ball up. Look over your shoulder and shout the colour, then control the ball before the second bounce.', 'Take your first touch out to the side and go again.'] },

  // Weekly focus drills
  fo_statue: { area: 'agility', name: 'Statue or dancer', mins: 3, cue: 'Bounce', cues: 'arrows',
    steps: ['While the ball is moving you are a dancer: on your toes, feet apart, small steps.', 'With Dad: he kicks the ball around the yard. If he catches you flat-footed, he gets a point.', 'On your own: follow the arrows and bounce between them.'] },
  fo_check_receive: { area: 'look', name: 'Check, receive, decide', mins: 4, cue: 'Look, then touch', cues: 'colours',
    needs: ['wall'], alt: ['fo_check_toss'],
    steps: ['Pass against the wall. Before it comes back, check over your shoulder at the tablet.', 'GREEN: turn with your first touch. RED: play it straight back. BLUE: go left. YELLOW: go right.', 'Decide before the ball arrives.'] },
  fo_check_toss: { area: 'look', name: 'Check, toss, decide', mins: 4, cue: 'Look, then touch', cues: 'colours',
    steps: ['Toss the ball up. While it is in the air, check over your shoulder at the tablet.', 'GREEN: turn with your first touch. RED: stop it dead. BLUE: go left. YELLOW: go right.', 'Decide before the ball lands.'] },
  fo_colour_dribble: { area: 'look', name: 'Colour-call dribbling', mins: 4, cue: 'Head up', cues: 'colours',
    steps: ['Dribble inside a box of 4 cones, about 8 by 8 m. Tablet on the ground at one side.', 'When a colour flashes, look up, shout it and turn toward the tablet with the ball.', 'Keep the ball within one step of your feet.'] },
  fo_level: { area: 'position', name: 'Level with your partner', mins: 4, cue: 'If you can touch the keeper, you\'re too deep', cues: 'calls',
    steps: ['Put 2 cones at the top of the box. That is where your partner centre back stands.', 'Start by touching the goal post. On every call, get level with the cones in 3 seconds, side-on and bouncing.', 'THEIR BALL: stay level and goal-side. OUR BALL or KEEPER\'S BALL: split wide.'] },
  fo_keeper: { area: 'position', name: 'Keeper\'s ball: go wide', mins: 3, cue: 'Go wide and call', needs: ['partner'], alt: ['fo_level'],
    steps: ['Dad is the keeper. When he picks the ball up, sprint to the corner of the box, half-turned, and call for it.', 'Be there before he counts to two.', 'He rolls it to you: one touch forward, then pass.'] },
  fo_find_line: { area: 'position', name: 'Win it, find the line', mins: 4, cue: 'Find the line', cues: 'calls',
    steps: ['Put one cone on the touchline (WIDE) and one between the middle and your goal (GOAL-SIDE).', 'OUR BALL or KEEPER\'S BALL: sprint to the touchline and turn so you can see the ball and the goal. THEIR BALL: sprint goal-side.', 'Jog back to the middle on your toes each time.'] },

  // Theme: MASTER
  m_sole_rolls: { area: 'mastery', name: 'Sole rolls & pulls', mins: 4, cue: 'Small touches, head up',
    steps: ['Roll the ball across your body with the sole, right then left.', 'Pull it back with the sole and push it forward with the laces.', 'Every 5 touches, lift your eyes and name something you can see.'] },
  m_inside_outside: { area: 'mastery', name: 'Inside-outside', mins: 4, cue: 'Same foot, small touches',
    steps: ['Touch the ball in with the inside of your foot, then out with the outside of the same foot.', '10 with the right, 10 with the left, then move forward while you do it.', 'Look up between touches.'] },
  m_dragback_v: { area: 'dragback', name: 'Drag-back V', mins: 4, cue: 'Pull, push, go',
    steps: ['Drag the ball back with the sole, then push it away at an angle with the inside of the same foot. That is the V.', '5 with each foot, then alternate.', 'Only go faster when it is clean.'] },
  m_l_turn: { area: 'dragback', name: 'L-turn', mins: 4, cue: 'Drag behind, then explode',
    steps: ['Drag the ball back with the sole, then tap it behind your standing leg with the inside of the same foot.', 'Accelerate for 3 big steps after the turn.', '5 with each foot.'] },
  m_beat_cone: { area: 'onevone', name: 'Beat the cone', mins: 4, cue: 'Move early, explode away',
    steps: ['A cone 8 m away is the defender.', 'Dribble at it. 1 m before it, do a move (step-over, scissors or inside cut), then explode 3 m past.', 'Use the other foot on the next go.'] },
  m_slalom: { area: 'onevone', name: 'Slalom test', mins: 3, cue: 'Close control at speed', test: 'slalom', stopwatch: true,
    steps: ['6 cones in a line, 1 m apart. Shoes are fine.', 'Press START as you go. Dribble in and out, round the last cone and back, then press STOP.', 'Best of 3. Log your fastest.'] },

  // Theme: PASS
  p_two_touch: { area: 'wall', name: 'Two-touch wall passes', mins: 4, cue: 'Lock the ankle', test: 'wall30',
    needs: ['wall'], alt: ['p_two_touch_reb', 'p_toss_control'],
    steps: ['3 m from the wall. Control with one foot, pass with the other.', 'Inside of the foot, ankle locked, toe up.', 'Last 30 seconds: count your passes and log them.'] },
  p_two_touch_reb: { area: 'rebounder', name: 'Two-touch rebounder', mins: 4, cue: 'Lock the ankle', test: 'wall30', needs: ['rebounder'],
    steps: ['3 m from the rebounder. Control with one foot, pass with the other.', 'Inside of the foot, ankle locked, toe up.', 'Last 30 seconds: count your passes and log them.'] },
  p_open_up: { area: 'control', name: 'Open up and turn', mins: 4, cue: 'Back foot, open body', needs: ['wall'], alt: ['p_toss_control'],
    steps: ['Put 2 cones 2 m apart beside you. That is a gate.', 'Pass at the wall. Receive with your back foot (the one further from the wall) and take the ball through the gate.', 'Turn and pass again. Swap sides.'] },
  p_weak_wall: { area: 'weak', name: 'Weak-foot wall passes', mins: 4, cue: 'Weak foot only', test: 'weak30', needs: ['wall'], alt: ['p_weak_touches'],
    steps: ['Only your weaker foot: control and pass.', 'Slow is fine. Clean is the goal.', 'Last 30 seconds: count and log.'] },
  p_toss_control: { area: 'control', name: 'Throw, control, pass', mins: 4, cue: 'First touch into space',
    steps: ['Throw the ball up. Control it with one touch into space.', 'Pass it through a cone gate 5 m away.', 'Swap feet and body parts: foot, thigh, chest.'] },
  p_weak_touches: { area: 'weak', name: 'Weak-foot touches', mins: 4, cue: 'Weak foot only',
    steps: ['Weak foot only: 20 inside taps, 20 sole rolls, 20 laces kick-ups.', 'Then 10 passes through a cone gate with the weak foot.'] },

  // Theme: BRAIN (easy on the legs)
  b_pause_pick: { area: 'brain', name: 'Pause & pick', mins: 5, cue: 'What would you do?', link: '#/brain',
    steps: ['Open the Brain tab and answer 3 pictures.', 'Read why the answer is right before the next one.'] },
  b_role_pick: { area: 'brain', name: 'Role pictures', mins: 5, cue: 'What is my job?', link: '#/brain', rolePick: true,
    steps: ['Open the pictures for this week\'s role and answer 3.', 'Say your job out loud before you pick.'] },
  b_where_go: { area: 'position', name: 'Where do I go?', mins: 5, cue: 'Our ball, their ball', cues: 'calls',
    steps: ['Set 3 cones: WIDE (by the touchline), GOAL-SIDE (between the middle and your goal) and CORNER (corner of the box).', 'OUR BALL: sprint WIDE. THEIR BALL: GOAL-SIDE. KEEPER\'S BALL: CORNER.', 'Jog back to the middle each time, on your toes.'] },
  b_watch_pro: { area: 'brain', name: 'Watch a pro', mins: 5, cue: 'Count the checks',
    steps: ['Watch 5 minutes of a pro game with Dad. Pick one player in your position.', 'Count how often they look over their shoulder before the ball comes.', 'Try to beat that number in your next game.'] },

  // Theme: DEFEND
  f_jockey: { area: 'defend', name: 'Jockey 1v1', mins: 4, cue: 'Slow him, don\'t dive', needs: ['partner'], alt: ['f_shadow_jockey'],
    steps: ['Dad dribbles slowly at you.', 'Get within 2 m. Side-on, knees bent, small steps. Make him go one way.', 'Stay on your feet for 5 seconds and you get a point. Tackle only when the ball is loose.'] },
  f_shadow_jockey: { area: 'defend', name: 'Shadow jockey', mins: 4, cue: 'Slow him, don\'t dive', cues: 'arrows',
    steps: ['Side-on, knees bent, one foot in front.', 'When an arrow flashes, shuffle 2 steps that way. Never cross your feet.', 'BACK: drop 2 steps. FORWARD: close down 2 steps.'] },
  f_goalside: { area: 'defend', name: 'Goal-side race', mins: 4, cue: 'Get between him and the goal', needs: ['partner'], alt: ['f_recovery_runs'],
    steps: ['Mini goal (or 2 cones) behind you. Dad starts with the ball 5 m to one side.', 'On GO he dribbles at goal. You sprint to get between him and the goal first.', 'Then jockey. Swap starting sides.'] },
  f_recovery_runs: { area: 'defend', name: 'Recovery runs', mins: 4, cue: 'Arrive side-on',
    steps: ['Start at a cone 10 m out. Sprint back to a cone next to your goal post.', 'Arrive side-on and on your toes, not flat.', 'Walk back. 6 runs.'] },
  s_second_ball: { area: 'second', name: 'Second-ball reactions', mins: 4, cue: 'First step toward the ball', needs: ['wall'], alt: ['s_drop_pounce'],
    steps: ['Kick the ball hard at the wall at a different height each time.', 'Win it before the second bounce, in 2 touches or less.', 'Your first step is always TOWARD the ball.'] },
  s_drop_pounce: { area: 'second', name: 'Drop & pounce', mins: 4, cue: 'React first',
    steps: ['Throw the ball high and away from you, or Dad drops it when you don\'t expect it.', 'Sprint and control it before the second bounce.', 'Dribble it back fast. 8 goes.'] },

  // Theme: STRIKE
  k_shots: { area: 'shooting', name: 'Shoot at targets', mins: 4, cue: 'Laces, land on your kicking foot', test: 'shots',
    steps: ['Mini goal (or 2 cones) 8 m away.', '5 shots right foot, 5 left. Strike through the middle of the ball with your laces.', 'Count goals out of 10 and log it.'] },
  k_run_ball: { area: 'onevone', name: 'Run with the ball, head up', mins: 4, cue: 'Head up every second touch', cues: 'numbers',
    steps: ['20 m run. Push the ball 2 to 3 m ahead with your laces and chase it.', 'Tablet at the far end: shout the number it shows while you run.', 'Walk back. 6 runs.'] },
  k_first_time: { area: 'shooting', name: 'First-time finish', mins: 4, cue: 'Eyes on the ball, lock the ankle', needs: ['wall'], alt: ['k_roll_strike'],
    steps: ['Pass at the wall, then strike the rebound first time at a target.', 'Swap feet every go.', '10 with each foot.'] },
  k_roll_strike: { area: 'shooting', name: 'Roll & strike', mins: 4, cue: 'Strike the moving ball',
    steps: ['Roll the ball forward, take one step and strike it while it is moving.', 'Aim at a target or mini goal 8 m away.', '10 with each foot.'] },

  // Extras (library only)
  r_reb_volley: { area: 'rebounder', name: 'Rebounder volleys', mins: 4, cue: 'Soft first touch', needs: ['rebounder'],
    steps: ['Volley the ball gently into the rebounder with your laces.', 'Cushion the return with one touch, then volley again.', '10 each foot.'] },
  c_bounce_control: { area: 'control', name: 'Bounce, cushion, go', mins: 4, cue: 'Cushion it dead',
    steps: ['Throw the ball high. Let it bounce once.', 'Cushion it dead with the inside, outside or sole, then push away in a new direction.', '10 goes, swap feet.'] },

  // Game day and recovery
  w_warmup: { area: 'warmup', name: 'Game-day warm-up', mins: 5, cue: 'Finish on your toes',
    steps: ['Jog 2 laps, then skips, side shuffles and open/close the gate.', '20 touches each foot: inside, sole, laces.', '5 short sprints from a bouncing start.'] },
  w_cooldown: { area: 'warmup', name: 'Cool-down', mins: 3, cue: 'Slow breaths',
    steps: ['Walk for 1 minute.', 'Hold each stretch for 15 seconds: calves, thighs, hamstrings, hips.', 'Drink water.'] },
};
export const DRILLS = { ...CORE_DRILLS, ...ROLE_DRILLS, ...SKILL_DRILLS };

export const DAILY3 = {
  bounce: ['d_toetaps', 'd_bounce_react', 'd_tick_tock', 'd_hops'],
  touch: 'd_juggle',
  touchAlt: 'd_juggle_pattern',
  look: 'd_scan_wall',
};

export const FOCUSES = {
  bounce: { name: 'Bounce', cue: 'Knees soft, feet apart, small steps whenever the ball is near.', drill: 'fo_statue' },
  look: { name: 'Look, then touch', cue: 'Check over your shoulder before the ball arrives.', drill: 'fo_check_receive' },
  headup: { name: 'Head up', cue: 'Look up every second touch when you run with the ball.', drill: 'fo_colour_dribble' },
  jockey: { name: 'Slow him, don\'t dive', cue: 'Side-on, 2 m away. Tackle only when the ball is loose.', drill: 'f_jockey' },
  level: { name: 'Level with your partner', cue: 'If you can touch the keeper, you\'re too deep.', drill: 'fo_level' },
  keeper: { name: 'Keeper\'s ball: go wide', cue: 'When your keeper has it, split to the corner of the box and call.', drill: 'fo_keeper' },
  second: { name: 'Win the second ball', cue: 'The clearance isn\'t the end. First step toward the ball.', drill: 's_second_ball' },
  wide: { name: 'Find the line', cue: 'When we win it, get wide so the pitch is big.', drill: 'fo_find_line' },
};
export const FOCUS_SEQ = ['bounce', 'look', 'headup', 'jockey', 'level', 'keeper', 'second'];
export const FOCUS_BY_POS = {
  gk: ['bounce', 'look', 'keeper', 'second', 'headup', 'jockey'],
  cb: FOCUS_SEQ,
  wd: ['bounce', 'look', 'jockey', 'wide', 'second', 'headup'],
  cm: ['bounce', 'look', 'headup', 'second', 'jockey', 'wide'],
  wing: ['bounce', 'look', 'headup', 'wide', 'second', 'jockey'],
  st: ['bounce', 'look', 'headup', 'second', 'wide', 'jockey'],
};
export const POSITIONS = [
  { id: 'gk', name: 'Keeper' },
  { id: 'cb', name: 'Centre back' },
  { id: 'wd', name: 'Wide defender' },
  { id: 'cm', name: 'Midfield' },
  { id: 'wing', name: 'Winger' },
  { id: 'st', name: 'Striker' },
];


// Pause & pick. Pitch coords: x 0-100 (left to right), y 0-130 (our goal at the bottom).
// arrows: [x1, y1, x2, y2, who]; move: the right move for YOU, drawn after answering.
const BASE_SCENARIOS = [
  { id: 'keeper-ball', title: 'Keeper has it', cue: 'Keeper\'s ball: go wide',
    question: 'Your keeper has the ball in his hands. You are a centre back. What do you do?',
    you: [46, 117], gk: [52, 123], ball: [54, 121], mates: [[30, 92], [70, 90], [50, 70]], opps: [[44, 84], [62, 76], [30, 74]], arrows: [],
    choices: ['Stay next to the keeper to help him', 'Split wide to the corner of the box and call for it', 'Sprint up to the halfway line'], answer: 1,
    move: [46, 117, 24, 105],
    explain: 'A centre back is the keeper\'s first pass. Get to the corner of the box, half-turned so you can see the pitch, and call for it.' },
  { id: 'too-deep', title: 'Their ball at halfway', cue: 'Level with your partner',
    question: 'The other team has the ball near halfway. Your partner centre back is at the top of the box. Where should you be?',
    you: [58, 124], gk: [50, 122], ball: [50, 61], mates: [[38, 104], [50, 78], [76, 80]], opps: [[50, 58], [28, 66], [72, 64]], arrows: [[50, 58, 50, 70, 'opp']],
    choices: ['On the goal line, helping the keeper', 'Level with your partner at the top of the box', 'Up at halfway, pressing the ball'], answer: 1,
    move: [58, 124, 62, 104],
    explain: 'Too deep is also out of position. Level with your partner you can step to a loose ball, and the keeper has room. If you can touch the keeper, you are too deep.' },
  { id: 'second-man', title: 'Teammate is pressing', cue: 'Second man moves',
    question: 'Your teammate is pressing the player with the ball. Another opponent is free out to the side. What is your job?',
    you: [60, 94], gk: [50, 124], ball: [50, 71], mates: [[48, 79], [30, 96]], opps: [[50, 70], [84, 68], [36, 60]], arrows: [[48, 81, 49, 75, 'mate']],
    choices: ['Stand still and watch the duel', 'Run in and tackle the ball too', 'Move across to cut off the pass to the free player'], answer: 2,
    move: [60, 94, 67, 71],
    explain: 'Second man moves. When a teammate presses, you cover behind him or block the pass to the free player. Watching or swarming the ball both leave the free player open.' },
  { id: 'carry-or-pass', title: 'You win it in your box', cue: 'Look, then touch',
    question: 'You win the ball in your own box. Their striker is sprinting at you. A teammate is free near the touchline. Best choice?',
    you: [46, 110], gk: [50, 124], ball: [47, 107], mates: [[88, 98], [60, 70], [26, 84]], opps: [[46, 92], [66, 82]], arrows: [[46, 92, 46, 102, 'opp']],
    choices: ['Put your head down and dribble up the middle', 'Look up and pass to the free teammate on the side', 'Kick it as hard as you can anywhere'], answer: 1,
    move: [47, 107, 86, 98],
    explain: 'Brave to keep it, but look up first. The free teammate is the safe, smart pass. Dribbling with your head down in your own box is how goals are given away.' },
  { id: 'last-man', title: 'You are the last defender', cue: 'Slow him, don\'t dive',
    question: 'You are the last defender. An attacker is dribbling straight at you. What do you do?',
    you: [50, 97], gk: [50, 124], ball: [50, 80], mates: [[30, 70], [70, 66]], opps: [[50, 77], [72, 76]], arrows: [[50, 78, 50, 88, 'opp']],
    choices: ['Dive in and slide for the ball', 'Get side-on, slow him down, tackle when the ball is loose', 'Run back into the goal'], answer: 1,
    move: [50, 97, 52, 91],
    explain: 'If the last defender dives and misses, it is a free run at goal. Get within 2 m, side-on, small steps, and wait for a heavy touch.' },
  { id: 'second-ball', title: 'The clearance drops', cue: 'Win the second ball',
    question: 'Your teammate clears the ball. It is dropping about 10 m in front of you. What now?',
    you: [50, 93], gk: [50, 124], ball: [53, 78], mates: [[40, 106], [72, 88]], opps: [[62, 68], [36, 70]], arrows: [[40, 106, 53, 79, 'mate'], [62, 68, 56, 75, 'opp']],
    choices: ['Watch where it lands', 'Step up and win it before their player gets there', 'Turn and run back to your goal'], answer: 1,
    move: [50, 93, 53, 81],
    explain: 'The clearance isn\'t the end. Whoever moves first wins the second ball. Your first step is toward it.' },
  { id: 'find-the-line', title: 'We just won it', cue: 'Find the line',
    question: 'Your team just won the ball. You are the winger, standing right behind your teammate. Where do you go?',
    you: [54, 82], gk: [50, 124], ball: [50, 70], mates: [[50, 73], [28, 66], [50, 102]], opps: [[46, 60], [62, 62], [34, 56]], arrows: [],
    choices: ['Stay close behind him', 'Sprint wide to the touchline', 'Stand next to him and shout for it'], answer: 1,
    move: [54, 82, 92, 64],
    explain: 'Getting wide makes the pitch big and gives him a pass he can see. Stacked behind him, one defender marks you both.' },
  { id: 'track-runner', title: 'Your player runs', cue: 'If your man runs, you run',
    question: 'The player you are marking suddenly sprints past you toward your goal. What do you do?',
    you: [40, 97], gk: [50, 124], ball: [72, 70], mates: [[70, 78], [58, 100]], opps: [[33, 92], [72, 68]], arrows: [[33, 92, 41, 114, 'opp']],
    choices: ['Stay where you are', 'Run with him and stay goal-side', 'Point at him and shout'], answer: 1,
    move: [40, 97, 46, 111],
    explain: 'If your man runs, you run. Stay between him and your goal, and keep checking where he is.' },
  { id: 'check-shoulder', title: 'Pass coming to you', cue: 'Look, then touch',
    question: 'A pass is coming to you from your defender. There is an opponent behind you that you cannot see yet. What do you do first?',
    you: [50, 86], gk: [50, 124], ball: [50, 104], mates: [[50, 107], [80, 84], [22, 80]], opps: [[53, 78], [70, 66]], arrows: [[50, 104, 50, 90, 'mate']],
    choices: ['Look over your shoulder before the ball arrives', 'Stare at the ball the whole time', 'Run toward the ball without looking'], answer: 0,
    move: null,
    explain: 'A quick look tells you if you can turn or should play it back first time. Pros check several times before every pass.' },
  { id: 'throw-in', title: 'Throw-in to us', cue: 'Reset at a jog',
    question: 'The ball has gone out. It is your team\'s throw-in and you are walking. What now?',
    you: [60, 90], gk: [50, 124], ball: [96, 70], mates: [[97, 74], [50, 66], [36, 98]], opps: [[72, 74], [82, 84], [60, 60]], arrows: [],
    choices: ['Walk and watch', 'Jog into a space where the thrower can reach you', 'Stand right next to the thrower'], answer: 1,
    move: [60, 90, 84, 88],
    explain: 'Players who jog into space are ready when the ball goes live. Walkers are always one step late.' },
  { id: 'goal-side', title: 'Chasing back', cue: 'Goal-side first',
    question: 'An attacker is running at your goal with the ball. You are chasing from the side. Where do you run?',
    you: [80, 88], gk: [50, 124], ball: [62, 92], mates: [[30, 90], [50, 70]], opps: [[62, 89], [40, 76]], arrows: [[62, 89, 55, 108, 'opp']],
    choices: ['Chase the ball from behind', 'Sprint to get between him and your goal', 'Stop, the keeper will get it'], answer: 1,
    move: [80, 88, 58, 110],
    explain: 'Your fastest line is toward your own post, not toward the ball. Get in front of him, then slow him down.' },
  { id: 'support-angle', title: 'Teammate closed down', cue: 'Support at an angle',
    question: 'Your teammate is dribbling up the wing and a defender is closing him down. You are right behind him. What do you do?',
    you: [88, 82], gk: [50, 124], ball: [88, 70], mates: [[88, 73], [50, 78], [40, 100]], opps: [[84, 60], [60, 62]], arrows: [[84, 60, 86, 66, 'opp']],
    choices: ['Stay right behind him', 'Offer a pass at an angle, about 5 m away', 'Run to the far side of the pitch'], answer: 1,
    move: [88, 82, 72, 77],
    explain: 'From straight behind, the defender hides you. At an angle he can see you and pass to you.' },
];

// All pictures: the originals (tagged with a role) then the 9v9 role pictures.
export const SCENARIOS = [...BASE_SCENARIOS.map((sc) => ({ ...sc, role: BASE_SCENARIO_ROLES[sc.id] || null })), ...ROLE_SCENARIOS];
