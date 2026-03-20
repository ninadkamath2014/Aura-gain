import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'aura-gain-save-v2'
const LEGACY_STORAGE_KEYS = ['aura-gain-save-v1']
const ONBOARDING_STORAGE_KEY = 'aura-gain-onboarding-v1'

const auraRanks = [
  { label: 'Hopeless', min: -10000 },
  { label: 'Washed', min: -7000 },
  { label: 'Questionable', min: -3500 },
  { label: 'Recovering', min: -1000 },
  { label: 'Valid', min: 0 },
  { label: 'Locked In', min: 2500 },
  { label: 'Sigma Aura', min: 8000 },
  { label: 'Ascended', min: 15000 },
  { label: 'Infinite Aura', min: 25000 },
  { label: 'Mythic Aura', min: 40000 },
  { label: 'Reality Distortion', min: 65000 },
]

const jobs = [
  {
    id: 'crust',
    title: 'Crust Collector',
    pay: 65,
    shiftAura: -6,
    auraRequired: -10000,
    clearanceRequired: 1,
    interviewer: 'AutoHire Bot',
    intro:
      'AutoHire Bot only asks one thing: can you show up and not evaporate on contact with responsibility?',
    passScore: 0,
    questions: [],
  },
  {
    id: 'mall-npc',
    title: 'Mall NPC Assistant',
    pay: 140,
    shiftAura: 12,
    auraRequired: -8500,
    clearanceRequired: 1,
    interviewer: 'Interview AI: Retail Sigma',
    intro:
      'Retail Sigma scans your vibes, your confidence, and whether you can point toward the food court without becoming washed.',
    passScore: 5,
    questions: [
      {
        prompt: 'A customer says your aura seems negative. Your move?',
        answers: [
          { text: 'Say "watch the comeback arc" and stay calm.', score: 3 },
          { text: 'Cry near the escalator for realism.', score: 0 },
          { text: 'Blame lag in real life.', score: 1 },
        ],
      },
      {
        prompt: 'The store playlist starts sounding cringe. What helps most?',
        answers: [
          { text: 'Reset the vibe with confidence and keep serving.', score: 2 },
          { text: 'Dance with zero context and abandon the shift.', score: 0 },
          { text: 'Tell everyone this is an experimental aura test.', score: 1 },
        ],
      },
    ],
  },
  {
    id: 'trend',
    title: 'Junior Trend Analyst',
    pay: 275,
    shiftAura: 40,
    auraRequired: -3500,
    clearanceRequired: 2,
    interviewer: 'Interview AI: Trend Oracle 9000',
    intro:
      'Trend Oracle 9000 wants proof that you can separate peak brainrot from stale repost energy.',
    passScore: 6,
    questions: [
      {
        prompt: 'What is the fastest way to recover from a flop post?',
        answers: [
          { text: 'Pivot hard, post fresh, and act like the flop was bait.', score: 3 },
          { text: 'Delete the app and become a lighthouse keeper.', score: 0 },
          { text: 'Pretend your cousin posted it.', score: 1 },
        ],
      },
      {
        prompt: 'A luxury brainrot drop appears. What do you check first?',
        answers: [
          { text: 'Aura output, clearance fit, and long-term cringe risk.', score: 3 },
          { text: 'If the name sounds expensive enough.', score: 1 },
          { text: 'Nothing. Buy first, regret later.', score: 0 },
        ],
      },
    ],
  },
  {
    id: 'consultant',
    title: 'Aura Consultant',
    pay: 520,
    shiftAura: 75,
    auraRequired: 500,
    clearanceRequired: 3,
    interviewer: 'Interview AI: Passive Aggressive Aura Manager',
    intro:
      'This interviewer smiles politely while calculating whether your entire career is just lucky noise.',
    passScore: 7,
    questions: [
      {
        prompt: 'A client refuses to retire a washed brainrot. What do you say?',
        answers: [
          { text: 'Explain the cringe penalty and offer an elite upgrade path.', score: 4 },
          { text: 'Call security because the vibes are hostile.', score: 1 },
          { text: 'Tell them nostalgia is a medical condition.', score: 0 },
        ],
      },
      {
        prompt: 'How do you prove your own aura under pressure?',
        answers: [
          { text: 'Stay measured, confident, and weirdly overprepared.', score: 3 },
          { text: 'Whisper "gain aura bro" and vanish in smoke.', score: 1 },
          { text: 'Start twelve side quests during the interview.', score: 0 },
        ],
      },
    ],
  },
  {
    id: 'broker',
    title: 'Elite Brainrot Broker',
    pay: 900,
    shiftAura: 120,
    auraRequired: 5000,
    clearanceRequired: 4,
    interviewer: 'Interview AI: Italian Brainrot HR Core',
    intro:
      'The gatekeeper expects flawless market instinct and zero cringe leakage.',
    passScore: 8,
    questions: [
      {
        prompt: 'A legendary Italian brainrot appears underpriced. What is the correct play?',
        answers: [
          { text: 'Secure it instantly, then rebalance your lineup.', score: 4 },
          { text: 'Post a screenshot and let someone else buy it.', score: 0 },
          { text: 'Wait three business years for certainty.', score: 1 },
        ],
      },
      {
        prompt: 'Your portfolio is rich but culturally stale. Fix it.',
        answers: [
          { text: 'Blend prestige with fresh chaos and retire the weak links.', score: 4 },
          { text: 'Buy six of the cheapest things and call it minimalism.', score: 0 },
          { text: 'Rename the old lineup and hope nobody notices.', score: 1 },
        ],
      },
    ],
  },
  {
    id: 'syndicate',
    title: 'Clout Syndicate Lead',
    pay: 1450,
    shiftAura: 180,
    auraRequired: 11000,
    clearanceRequired: 5,
    interviewer: 'Interview AI: Viral Cabal Recruiter',
    intro:
      'The syndicate only hires people who can smell fake hype from three timelines away.',
    passScore: 9,
    questions: [
      {
        prompt: 'A hype wave is exploding. What do you do first?',
        answers: [
          { text: 'Check staying power before dumping your reputation into it.', score: 4 },
          { text: 'Join blindly and hope the comments are kind.', score: 0 },
          { text: 'Say you started the wave, no matter what.', score: 1 },
        ],
      },
      {
        prompt: 'Your team wants quantity over aura quality.',
        answers: [
          { text: 'Protect the long-term vibe, then scale with discipline.', score: 5 },
          { text: 'Print chaos and ask questions in the sequel.', score: 1 },
          { text: 'Retreat to a bean bag and meditate.', score: 0 },
        ],
      },
    ],
  },
  {
    id: 'luxury',
    title: 'Luxury Aura Strategist',
    pay: 2100,
    shiftAura: 260,
    auraRequired: 18000,
    clearanceRequired: 5,
    interviewer: 'Interview AI: Velvet Status Engine',
    intro:
      'Velvet Status Engine looks for expensive taste that still feels dangerous.',
    passScore: 10,
    questions: [
      {
        prompt: 'A client wants elite aura with budget habits. Your response?',
        answers: [
          { text: 'Trim the cringe, hold the line, then invest in fewer stronger pieces.', score: 5 },
          { text: 'Pretend cardboard is luxury if you squint hard enough.', score: 0 },
          { text: 'Rename the cheap stuff in Italian and pray.', score: 1 },
        ],
      },
      {
        prompt: 'What separates rich from iconic?',
        answers: [
          { text: 'Consistency, restraint, and knowing when to flex once instead of ten times.', score: 5 },
          { text: 'A louder font and random flames.', score: 0 },
          { text: 'Buying things only because the box shines.', score: 1 },
        ],
      },
    ],
  },
  {
    id: 'dimensional',
    title: 'Dimensional Trend Director',
    pay: 3200,
    shiftAura: 360,
    auraRequired: 28000,
    clearanceRequired: 6,
    interviewer: 'Interview AI: Rift Forecast Unit',
    intro:
      'Rift Forecast Unit predicts memes across multiple dimensions and expects your answers to survive all of them.',
    passScore: 11,
    questions: [
      {
        prompt: 'A trend is massive in one dimension and cringe in another.',
        answers: [
          { text: 'Segment it, localize it, and avoid cross-dimensional embarrassment.', score: 6 },
          { text: 'Ignore the difference and post at maximum volume.', score: 0 },
          { text: 'Call it avant-garde and run away.', score: 1 },
        ],
      },
      {
        prompt: 'How do you stop a premium lineup from going stale?',
        answers: [
          { text: 'Rotate fresh chaos around core prestige anchors.', score: 5 },
          { text: 'Freeze all innovation forever.', score: 0 },
          { text: 'Put sunglasses on the same old brainrot.', score: 1 },
        ],
      },
    ],
  },
  {
    id: 'curator',
    title: 'Mythic Brainrot Curator',
    pay: 4800,
    shiftAura: 520,
    auraRequired: 40000,
    clearanceRequired: 7,
    interviewer: 'Interview AI: Museum of Unhinged Taste',
    intro:
      'The museum grants entry only to people who can explain chaos like it belongs in history.',
    passScore: 12,
    questions: [
      {
        prompt: 'A mythic brainrot is powerful but a little too obvious. Fix it.',
        answers: [
          { text: 'Pair it with a subtler flex so the lineup feels intentional, not desperate.', score: 6 },
          { text: 'Make everything louder and call it curation.', score: 0 },
          { text: 'Hide it behind fifteen cheaper copies.', score: 1 },
        ],
      },
      {
        prompt: 'What is true aura curation?',
        answers: [
          { text: 'Selecting pieces that raise status together, not just individually.', score: 6 },
          { text: 'Owning the longest names possible.', score: 0 },
          { text: 'Buying whatever glows the hardest.', score: 1 },
        ],
      },
    ],
  },
  {
    id: 'chancellor',
    title: 'Infinite Aura Chancellor',
    pay: 7000,
    shiftAura: 800,
    auraRequired: 58000,
    clearanceRequired: 7,
    interviewer: 'Interview AI: Final Council of Vibes',
    intro:
      'The council does not care about excuses. It only cares whether your aura changes the room before you speak.',
    passScore: 13,
    questions: [
      {
        prompt: 'What do you do after reaching obvious greatness?',
        answers: [
          { text: 'Build a system that keeps creating greatness beyond your own run.', score: 7 },
          { text: 'Post one smug caption and retire instantly.', score: 0 },
          { text: 'Buy twelve starter brainrots for nostalgia.', score: 1 },
        ],
      },
      {
        prompt: 'How do you prove infinite aura?',
        answers: [
          { text: 'By creating stability, mystique, and momentum at the same time.', score: 6 },
          { text: 'By yelling "trust" repeatedly.', score: 0 },
          { text: 'By describing yourself as a visionary bean.', score: 1 },
        ],
      },
    ],
  },
]

const brainrots = [
  {
    id: 'mozzarolli',
    name: 'Mozzarolli Zoomini',
    tier: 1,
    price: 90,
    baseAura: 70,
    fallsOffAt: -2500,
    cringePenalty: 30,
    clearanceRequired: 1,
    auraRequired: -12000,
    vibe: 'Crunchy starter brainrot. Cheap, loud, slightly unstable.',
  },
  {
    id: 'spaghettino',
    name: 'Spaghettino Laseretti',
    tier: 1,
    price: 125,
    baseAura: 95,
    fallsOffAt: -500,
    cringePenalty: 55,
    clearanceRequired: 1,
    auraRequired: -12000,
    vibe: 'An early comeback piece if your account still smells like failure.',
  },
  {
    id: 'gnocchimax',
    name: 'Gnocchimax Driftini',
    tier: 1,
    price: 145,
    baseAura: 110,
    fallsOffAt: -700,
    cringePenalty: 60,
    clearanceRequired: 1,
    auraRequired: -12000,
    vibe: 'A slippery little aura patch for the darkest opening shifts.',
  },
  {
    id: 'raviolaser',
    name: 'Raviolaser Blinketti',
    tier: 1,
    price: 165,
    baseAura: 120,
    fallsOffAt: -250,
    cringePenalty: 65,
    clearanceRequired: 1,
    auraRequired: -11000,
    vibe: 'Fast, flashy, and absolutely not built for the long term.',
  },
  {
    id: 'bombardino',
    name: 'Bombardino Crostini',
    tier: 2,
    price: 320,
    baseAura: 180,
    fallsOffAt: 2500,
    cringePenalty: 70,
    clearanceRequired: 2,
    auraRequired: -4500,
    vibe: 'Respectable mid-tier heat with solid aura recovery.',
  },
  {
    id: 'gelatissimo',
    name: 'Gelatissimo Warpini',
    tier: 2,
    price: 430,
    baseAura: 240,
    fallsOffAt: 5000,
    cringePenalty: 90,
    clearanceRequired: 2,
    auraRequired: -2500,
    vibe: 'Chill on the surface, secretly built for momentum.',
  },
  {
    id: 'paninivolt',
    name: 'Paninivolt Turbozzo',
    tier: 2,
    price: 390,
    baseAura: 210,
    fallsOffAt: 4200,
    cringePenalty: 85,
    clearanceRequired: 2,
    auraRequired: -3200,
    vibe: 'Portable status with suspiciously sharp edges.',
  },
  {
    id: 'risottoray',
    name: 'Risottoray Glimmero',
    tier: 2,
    price: 510,
    baseAura: 290,
    fallsOffAt: 6500,
    cringePenalty: 100,
    clearanceRequired: 2,
    auraRequired: -1500,
    vibe: 'Smooth luxury for the moment your run stops looking tragic.',
  },
  {
    id: 'vesparino',
    name: 'Vesparino Voltage',
    tier: 3,
    price: 850,
    baseAura: 420,
    fallsOffAt: 9000,
    cringePenalty: 120,
    clearanceRequired: 3,
    auraRequired: 250,
    vibe: 'A flashy flex that tells the market you are no longer ordinary.',
  },
  {
    id: 'pizzatron',
    name: 'Pizzatron Infernetti',
    tier: 3,
    price: 1100,
    baseAura: 540,
    fallsOffAt: 12000,
    cringePenalty: 150,
    clearanceRequired: 3,
    auraRequired: 1200,
    vibe: 'Hits hard, looks illegal, definitely gains aura.',
  },
  {
    id: 'calzoboom',
    name: 'Calzoboom Vorticelli',
    tier: 3,
    price: 980,
    baseAura: 470,
    fallsOffAt: 10500,
    cringePenalty: 130,
    clearanceRequired: 3,
    auraRequired: 600,
    vibe: 'Folded chaos with highly concentrated comeback energy.',
  },
  {
    id: 'focaccios',
    name: 'Focaccios Neonati',
    tier: 3,
    price: 1280,
    baseAura: 620,
    fallsOffAt: 14000,
    cringePenalty: 165,
    clearanceRequired: 3,
    auraRequired: 1800,
    vibe: 'Warm prestige with a dangerous amount of glow.',
  },
  {
    id: 'tiramisoul',
    name: 'Tiramisoul Hyperlux',
    tier: 4,
    price: 2200,
    baseAura: 950,
    fallsOffAt: 20000,
    cringePenalty: 200,
    clearanceRequired: 4,
    auraRequired: 4500,
    vibe: 'Elite dessert energy. Half prestige, half psychological warfare.',
  },
  {
    id: 'operarage',
    name: 'Operarage Bellaflux',
    tier: 4,
    price: 2700,
    baseAura: 1120,
    fallsOffAt: 23000,
    cringePenalty: 240,
    clearanceRequired: 4,
    auraRequired: 7000,
    vibe: 'A dramatic flex that sounds expensive even in silence.',
  },
  {
    id: 'lambrorift',
    name: 'Lambrorift Chromezzani',
    tier: 4,
    price: 3100,
    baseAura: 1280,
    fallsOffAt: 26000,
    cringePenalty: 250,
    clearanceRequired: 4,
    auraRequired: 9000,
    vibe: 'Sports aura from a dimension where parking is a myth.',
  },
  {
    id: 'venexotic',
    name: 'Venexotic Miragetti',
    tier: 5,
    price: 4500,
    baseAura: 1600,
    fallsOffAt: 34000,
    cringePenalty: 280,
    clearanceRequired: 5,
    auraRequired: 12000,
    vibe: 'A premium hallucination that makes normal flexes look unemployed.',
  },
  {
    id: 'trufflecore',
    name: 'Trufflecore Magnifico',
    tier: 5,
    price: 5200,
    baseAura: 1820,
    fallsOffAt: 38000,
    cringePenalty: 320,
    clearanceRequired: 5,
    auraRequired: 15000,
    vibe: 'Expensive enough to alter how people pronounce your name.',
  },
  {
    id: 'glitchgoblet',
    name: 'Glitch Goblet Supreme',
    tier: 5,
    price: 6100,
    baseAura: 2050,
    fallsOffAt: 42000,
    cringePenalty: 360,
    clearanceRequired: 5,
    auraRequired: 19000,
    vibe: 'Non-Italian but still catastrophically elite.',
  },
  {
    id: 'megadrip',
    name: 'Megadrip Shogun.exe',
    tier: 6,
    price: 7800,
    baseAura: 2550,
    fallsOffAt: 50000,
    cringePenalty: 420,
    clearanceRequired: 6,
    auraRequired: 24000,
    vibe: 'A cross-realm monster with impossible drip density.',
  },
  {
    id: 'orbitalpha',
    name: 'Orbitalpha Cinnablast',
    tier: 6,
    price: 9200,
    baseAura: 2980,
    fallsOffAt: 54000,
    cringePenalty: 470,
    clearanceRequired: 6,
    auraRequired: 30000,
    vibe: 'A celestial flex for runs that have stopped obeying physics.',
  },
  {
    id: 'mythosnack',
    name: 'Mythosnack Imperatore',
    tier: 7,
    price: 12800,
    baseAura: 3800,
    fallsOffAt: 999999,
    cringePenalty: 0,
    clearanceRequired: 7,
    auraRequired: 42000,
    vibe: 'Myth-grade nonsense with museum-level status output.',
  },
  {
    id: 'galaxio',
    name: 'Galaxio Parmesanth',
    tier: 7,
    price: 15600,
    baseAura: 4500,
    fallsOffAt: 999999,
    cringePenalty: 0,
    clearanceRequired: 7,
    auraRequired: 52000,
    vibe: 'A cosmic status nuke. Owning it makes your timeline tremble.',
  },
]

const shiftEvents = [
  {
    id: 'bonus-tip',
    text: 'A stranger called your grind inspirational and tipped you.',
    money: 120,
    aura: 35,
    chance: 0.22,
  },
  {
    id: 'npc-clip',
    text: 'A clip of your shift performance escaped containment and started circulating.',
    money: 80,
    aura: 140,
    chance: 0.18,
  },
  {
    id: 'washed-callout',
    text: 'Someone called one of your weaker brainrots washed in public.',
    money: 0,
    aura: -110,
    chance: 0.16,
    minAura: -2000,
  },
  {
    id: 'black-market',
    text: 'A black-market seller slipped you a discount code before vanishing.',
    money: 240,
    aura: 0,
    chance: 0.14,
    minClearance: 2,
  },
  {
    id: 'vibe-audit',
    text: 'Your lineup survived a brutal vibe audit with minimal collateral damage.',
    money: 0,
    aura: 220,
    chance: 0.12,
    minClearance: 3,
  },
  {
    id: 'cringe-tax',
    text: 'Cringe tax hit your account after overexposing low-tier energy.',
    money: -140,
    aura: -160,
    chance: 0.12,
    minAura: 4000,
  },
  {
    id: 'elite-invite',
    text: 'You were invited into a suspiciously premium group chat.',
    money: 0,
    aura: 320,
    chance: 0.1,
    minAura: 12000,
  },
  {
    id: 'reality-bend',
    text: 'The app glitched and accidentally rewarded your presence.',
    money: 450,
    aura: 260,
    chance: 0.08,
    minClearance: 4,
  },
]

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'jobs', label: 'Jobs' },
  { id: 'market', label: 'Market' },
  { id: 'vault', label: 'Vault' },
]

const starterLogs = [
  { id: 1, text: 'Spawned into existence with -10000 aura. Recovery arc begins now.' },
]

const onboardingSteps = [
  {
    title: 'You Spawn With Negative Aura',
    text: 'Your run begins in aura debt. The goal is to grind jobs, recover your status, and stop looking culturally unemployed.',
  },
  {
    title: 'Work Shifts To Start The Comeback',
    text: 'Tap Work Shift to earn money, move time forward, and trigger random events that can boost or damage your run.',
  },
  {
    title: 'Buy Brainrots Carefully',
    text: 'Starter brainrots help early, but weak ones turn cringe later. Upgrade your taste and clearance instead of spamming cheap flexes forever.',
  },
  {
    title: 'Pass AI Interviews',
    text: 'Better jobs pay more, but you need stronger aura and sharper answers to unlock them.',
  },
]

function getAuraRank(aura) {
  let rank = auraRanks[0]

  for (const entry of auraRanks) {
    if (aura >= entry.min) {
      rank = entry
    }
  }

  return rank.label
}

function formatSigned(value) {
  return `${value >= 0 ? '+' : ''}${Math.round(value)}`
}

function getBrainrotShiftAura(brainrot, aura) {
  return aura >= brainrot.fallsOffAt ? -brainrot.cringePenalty : brainrot.baseAura
}

function getJobById(jobId) {
  return jobs.find((job) => job.id === jobId) ?? jobs[0]
}

function createInitialGame() {
  return {
    day: 1,
    money: 160,
    aura: -10000,
    clearance: 1,
    currentJobId: jobs[0].id,
    unlockedJobIds: [jobs[0].id],
    ownedBrainrotIds: [],
    logs: starterLogs,
    lastEvent: null,
  }
}

function loadGame() {
  if (typeof window === 'undefined') {
    return createInitialGame()
  }

  try {
    const keysToCheck = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS]
    const raw = keysToCheck
      .map((key) => window.localStorage.getItem(key))
      .find((value) => Boolean(value))

    if (!raw) {
      return createInitialGame()
    }

    return { ...createInitialGame(), ...JSON.parse(raw) }
  } catch {
    return createInitialGame()
  }
}

function hasSeenOnboarding() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'done'
}

function makePopup(label, value, type) {
  return {
    id: `${Date.now()}-${Math.random()}`,
    label,
    value,
    type,
  }
}

function pickShiftEvent(game) {
  const available = shiftEvents.filter((event) => {
    if (typeof event.minAura === 'number' && game.aura < event.minAura) {
      return false
    }

    if (typeof event.minClearance === 'number' && game.clearance < event.minClearance) {
      return false
    }

    return Math.random() < event.chance
  })

  if (available.length === 0) {
    return null
  }

  return available[Math.floor(Math.random() * available.length)]
}

function App() {
  const [game, setGame] = useState(loadGame)
  const [activeTab, setActiveTab] = useState('overview')
  const [activeInterview, setActiveInterview] = useState(null)
  const [feedbackPopups, setFeedbackPopups] = useState([])
  const [showTitleScreen, setShowTitleScreen] = useState(true)
  const [onboardingStep, setOnboardingStep] = useState(hasSeenOnboarding() ? -1 : 0)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(game))
  }, [game])

  useEffect(() => {
    if (feedbackPopups.length === 0) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setFeedbackPopups((previous) => previous.slice(1))
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [feedbackPopups])

  const currentJob = getJobById(game.currentJobId)
  const ownedBrainrots = brainrots.filter((brainrot) =>
    game.ownedBrainrotIds.includes(brainrot.id),
  )
  const passiveAura = ownedBrainrots.reduce(
    (total, brainrot) => total + getBrainrotShiftAura(brainrot, game.aura),
    0,
  )
  const passiveIncomeBonus = ownedBrainrots.reduce(
    (total, brainrot) => total + brainrot.tier * 10,
    0,
  )
  const nextJob = jobs.find((job) => !game.unlockedJobIds.includes(job.id))
  const nextRank = auraRanks.find((rank) => rank.min > game.aura)
  const maxClearance = 7
  const clearanceUpgradeCost = game.clearance * 1100
  const clearanceUpgradeAura = game.clearance * 3500 - 2500
  const canUpgradeClearance =
    game.clearance < maxClearance &&
    game.money >= clearanceUpgradeCost &&
    game.aura >= clearanceUpgradeAura
  const finalJobId = jobs.at(-1)?.id
  const winState =
    game.aura >= 65000 &&
    game.clearance === maxClearance &&
    game.unlockedJobIds.includes(finalJobId)

  function queuePopups(popups) {
    setFeedbackPopups((previous) => [...previous, ...popups])
  }

  function workShift() {
    const event = pickShiftEvent(game)
    const auraDelta = currentJob.shiftAura + passiveAura + (event?.aura ?? 0)
    const payDelta = currentJob.pay + passiveIncomeBonus + (event?.money ?? 0)
    const nextGame = {
      ...game,
      day: game.day + 1,
      money: game.money + payDelta,
      aura: game.aura + auraDelta,
      lastEvent: event?.text ?? null,
      logs: [
        {
          id: Date.now() + Math.random(),
          text: event
            ? `Day ${game.day}: Worked as ${currentJob.title}, earned $${payDelta}, aura ${formatSigned(auraDelta)}. Event: ${event.text}`
            : `Day ${game.day}: Worked as ${currentJob.title}, earned $${payDelta}, aura ${formatSigned(auraDelta)}.`,
        },
        ...game.logs,
      ].slice(0, 8),
    }

    setGame(nextGame)
    queuePopups([
      makePopup('Money', payDelta, payDelta >= 0 ? 'money' : 'loss'),
      makePopup('Aura', auraDelta, auraDelta >= 0 ? 'aura' : 'loss'),
      ...(event ? [makePopup('Event', event.text, 'event')] : []),
    ])
  }

  function buyBrainrot(brainrot) {
    const shiftImpact = getBrainrotShiftAura(brainrot, game.aura)
    const instantAura = Math.round(shiftImpact / 2)

    setGame({
      ...game,
      money: game.money - brainrot.price,
      ownedBrainrotIds: [...game.ownedBrainrotIds, brainrot.id],
      aura: game.aura + instantAura,
      logs: [
        {
          id: `buy-${game.day}-${brainrot.id}`,
          text: `Day ${game.day}: Bought ${brainrot.name}. Instant aura ${formatSigned(instantAura)}.`,
        },
        ...game.logs,
      ].slice(0, 8),
    })

    queuePopups([
      makePopup('Bought', `-${brainrot.price}`, 'loss'),
      makePopup('Aura', instantAura, instantAura >= 0 ? 'aura' : 'loss'),
    ])
  }

  function upgradeClearance() {
    if (!canUpgradeClearance) {
      return
    }

    setGame({
      ...game,
      money: game.money - clearanceUpgradeCost,
      clearance: game.clearance + 1,
      logs: [
        {
          id: Date.now() + Math.random(),
          text: `Day ${game.day}: Upgraded brainrot clearance to Tier ${game.clearance + 1}.`,
        },
        ...game.logs,
      ].slice(0, 8),
    })

    queuePopups([
      makePopup('Clearance', `Tier ${game.clearance + 1}`, 'event'),
      makePopup('Cost', `-${clearanceUpgradeCost}`, 'loss'),
    ])
  }

  function startInterview(job) {
    setActiveInterview({
      jobId: job.id,
      step: 0,
      score: 0,
    })
    setActiveTab('jobs')
  }

  function answerInterview(answer) {
    if (!activeInterview) {
      return
    }

    const interviewJob = getJobById(activeInterview.jobId)
    const nextStep = activeInterview.step + 1
    const nextScore = activeInterview.score + answer.score

    if (nextStep >= interviewJob.questions.length) {
      const passed = nextScore >= interviewJob.passScore

      if (passed) {
        setGame({
          ...game,
          currentJobId: interviewJob.id,
          unlockedJobIds: [...new Set([...game.unlockedJobIds, interviewJob.id])],
          aura: game.aura + 240,
          logs: [
            {
              id: `interview-pass-${game.day}-${interviewJob.id}`,
              text: `Day ${game.day}: Passed the ${interviewJob.title} interview. New job unlocked.`,
            },
            ...game.logs,
          ].slice(0, 8),
        })
        queuePopups([
          makePopup('Unlocked', interviewJob.title, 'event'),
          makePopup('Aura', 240, 'aura'),
        ])
      } else {
        setGame({
          ...game,
          aura: game.aura - 180,
          logs: [
            {
              id: `interview-fail-${game.day}-${interviewJob.id}`,
              text: `Day ${game.day}: Failed the ${interviewJob.title} interview. Aura -180.`,
            },
            ...game.logs,
          ].slice(0, 8),
        })
        queuePopups([makePopup('Interview', -180, 'loss')])
      }

      setActiveInterview({
        jobId: interviewJob.id,
        step: nextStep,
        score: nextScore,
        complete: true,
        passed,
      })
      return
    }

    setActiveInterview({
      ...activeInterview,
      step: nextStep,
      score: nextScore,
    })
  }

  function switchJob(jobId) {
    setGame({
      ...game,
      currentJobId: jobId,
      logs: [
        {
          id: `switch-${game.day}-${jobId}`,
          text: `Day ${game.day}: Switched to ${getJobById(jobId).title}.`,
        },
        ...game.logs,
      ].slice(0, 8),
    })

    queuePopups([makePopup('Job', getJobById(jobId).title, 'event')])
  }

  function resetGame() {
    const fresh = createInitialGame()
    setGame(fresh)
    setActiveInterview(null)
    setActiveTab('overview')
    setFeedbackPopups([])
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
  }

  function beginRun() {
    setShowTitleScreen(false)
  }

  function advanceOnboarding() {
    if (onboardingStep >= onboardingSteps.length - 1) {
      setOnboardingStep(-1)
      window.localStorage.setItem(ONBOARDING_STORAGE_KEY, 'done')
      return
    }

    setOnboardingStep((previous) => previous + 1)
  }

  function dismissOnboarding() {
    setOnboardingStep(-1)
    window.localStorage.setItem(ONBOARDING_STORAGE_KEY, 'done')
  }

  return (
    <>
      {showTitleScreen ? (
        <section className="title-screen">
          <div className="title-backdrop" />
          <div className="title-card">
            <p className="eyebrow">Aura Gain</p>
            <h1>Turn a cursed reputation into infinite aura.</h1>
            <p className="title-text">
              Grind random jobs, survive AI interviews, collect elite brainrots, and climb from
              social disaster to reality-distorting status.
            </p>
            <div className="title-stats">
              <div className="title-stat">
                <span>Starting aura</span>
                <strong>-10000</strong>
              </div>
              <div className="title-stat">
                <span>Live jobs</span>
                <strong>{jobs.length}</strong>
              </div>
              <div className="title-stat">
                <span>Brainrots</span>
                <strong>{brainrots.length}</strong>
              </div>
            </div>
            <div className="title-actions">
              <button className="primary-button title-button" onClick={beginRun}>
                {game.day > 1 || game.ownedBrainrotIds.length > 0 ? 'Continue Run' : 'Start Run'}
              </button>
              <button className="ghost-button" onClick={resetGame}>
                Fresh Save
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {onboardingStep >= 0 ? (
        <div className="onboarding-overlay">
          <div className="onboarding-card">
            <p className="section-tag">First Run Guide</p>
            <h2>{onboardingSteps[onboardingStep].title}</h2>
            <p>{onboardingSteps[onboardingStep].text}</p>
            <div className="onboarding-progress">
              {onboardingSteps.map((step, index) => (
                <span
                  key={step.title}
                  className={index === onboardingStep ? 'progress-dot active' : 'progress-dot'}
                />
              ))}
            </div>
            <div className="title-actions">
              <button className="primary-button" onClick={advanceOnboarding}>
                {onboardingStep === onboardingSteps.length - 1 ? 'Enter Game' : 'Next'}
              </button>
              <button className="ghost-button" onClick={dismissOnboarding}>
                Skip
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="app-shell">
      <header className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Aura Gain</p>
          <h1>Climb from -10000 aura to infinite brainrot power.</h1>
          <p className="hero-text">
            Work weird jobs, survive AI interviews, unlock richer careers, and build a
            brainrot portfolio that stops being cringe and starts bending reality.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card highlight">
            <span>Aura</span>
            <strong>{formatSigned(game.aura)}</strong>
            <small>{getAuraRank(game.aura)}</small>
          </div>
          <div className="stat-card">
            <span>Money</span>
            <strong>${game.money}</strong>
            <small>{currentJob.title}</small>
          </div>
          <div className="stat-card">
            <span>Clearance</span>
            <strong>Tier {game.clearance}</strong>
            <small>{ownedBrainrots.length} owned</small>
          </div>
        </div>
      </header>

      <section className="control-bar">
        <div className="status-pill">Day {game.day}</div>
        <div className="status-pill">Shift aura {formatSigned(passiveAura + currentJob.shiftAura)}</div>
        <div className="status-pill">Shift money +${currentJob.pay + passiveIncomeBonus}</div>
        <div className="status-pill">Rank {getAuraRank(game.aura)}</div>
        <button className="primary-button pulse" onClick={workShift}>
          Work Shift
        </button>
      </section>

      <section className="milestone-strip">
        <div className="milestone-card">
          <span>Current aura rank</span>
          <strong>{getAuraRank(game.aura)}</strong>
        </div>
        <div className="milestone-card">
          <span>Next rank target</span>
          <strong>{nextRank ? `${formatSigned(nextRank.min)} aura` : 'Maxed out'}</strong>
        </div>
        <div className="milestone-card">
          <span>Portfolio power</span>
          <strong>{ownedBrainrots.reduce((total, brainrot) => total + brainrot.tier, 0)}</strong>
        </div>
      </section>

      <div className="feedback-lane" aria-live="polite">
        {feedbackPopups.map((popup) => (
          <div key={popup.id} className={`feedback-chip ${popup.type}`}>
            <span>{popup.label}</span>
            <strong>
              {typeof popup.value === 'number' ? formatSigned(popup.value) : popup.value}
            </strong>
          </div>
        ))}
      </div>

      <nav className="tab-row" aria-label="Game sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={tab.id === activeTab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="grid">
        <section className="main-panel">
          {activeTab === 'overview' && (
            <div className="panel-stack">
              <article className="feature-card">
                <div>
                  <p className="section-tag">Current run</p>
                  <h2>{currentJob.title}</h2>
                </div>
                <p>
                  Your current job pays <strong>${currentJob.pay}</strong> per shift and adds{' '}
                  <strong>{formatSigned(currentJob.shiftAura)}</strong> aura before brainrot
                  effects kick in.
                </p>
                <div className="mini-grid">
                  <div className="mini-stat">
                    <span>Owned brainrots</span>
                    <strong>{ownedBrainrots.length}</strong>
                  </div>
                  <div className="mini-stat">
                    <span>Passive aura</span>
                    <strong>{formatSigned(passiveAura)}</strong>
                  </div>
                  <div className="mini-stat">
                    <span>Income bonus</span>
                    <strong>+${passiveIncomeBonus}</strong>
                  </div>
                  <div className="mini-stat">
                    <span>Last event</span>
                    <strong className="event-preview">
                      {game.lastEvent ? 'Triggered' : 'Quiet shift'}
                    </strong>
                  </div>
                </div>
              </article>

              <article className="feature-card alt">
                <div className="feature-header">
                  <div>
                    <p className="section-tag">Next ladder step</p>
                    <h2>{nextJob ? nextJob.title : 'Final career unlocked'}</h2>
                  </div>
                  {nextJob ? (
                    <button
                      className="secondary-button"
                      onClick={() => startInterview(nextJob)}
                      disabled={
                        game.aura < nextJob.auraRequired ||
                        game.clearance < nextJob.clearanceRequired
                      }
                    >
                      Start AI Interview
                    </button>
                  ) : null}
                </div>
                {nextJob ? (
                  <>
                    <p>{nextJob.intro}</p>
                    <div className="requirements">
                      <span>Aura needed: {formatSigned(nextJob.auraRequired)}</span>
                      <span>Clearance needed: Tier {nextJob.clearanceRequired}</span>
                      <span>Pay on unlock: ${nextJob.pay}</span>
                    </div>
                  </>
                ) : (
                  <p>You unlocked every current job tier. The only thing left is absurd greatness.</p>
                )}
              </article>

              <article className="feature-card">
                <div className="feature-header">
                  <div>
                    <p className="section-tag">Market license</p>
                    <h2>Brainrot Clearance Tier {game.clearance}</h2>
                  </div>
                  <button
                    className="secondary-button"
                    onClick={upgradeClearance}
                    disabled={!canUpgradeClearance}
                  >
                    Upgrade clearance
                  </button>
                </div>
                <p>
                  Better brainrots need better taste. Upgrade to reach higher tiers and stop your
                  lineup from falling behind your aura.
                </p>
                <div className="requirements">
                  <span>Upgrade cost: ${clearanceUpgradeCost}</span>
                  <span>Minimum aura: {formatSigned(clearanceUpgradeAura)}</span>
                  <span>Max tier: {maxClearance}</span>
                </div>
              </article>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="panel-stack">
              <article className="feature-card">
                <p className="section-tag">Career ladder</p>
                <h2>AI interviews unlock better jobs</h2>
                <div className="job-list">
                  {jobs.map((job) => {
                    const unlocked = game.unlockedJobIds.includes(job.id)
                    const current = game.currentJobId === job.id
                    const available =
                      !unlocked &&
                      game.aura >= job.auraRequired &&
                      game.clearance >= job.clearanceRequired

                    return (
                      <div className={current ? 'job-card active' : 'job-card'} key={job.id}>
                        <div>
                          <h3>{job.title}</h3>
                          <p>{job.interviewer}</p>
                        </div>
                        <div className="job-metrics">
                          <span>${job.pay}/shift</span>
                          <span>{formatSigned(job.shiftAura)} aura</span>
                          <span>Req: Tier {job.clearanceRequired}</span>
                        </div>
                        <div className="job-actions">
                          {unlocked ? (
                            <button
                              className="ghost-button"
                              onClick={() => switchJob(job.id)}
                              disabled={current}
                            >
                              {current ? 'Current job' : 'Switch job'}
                            </button>
                          ) : (
                            <button
                              className="ghost-button"
                              onClick={() => startInterview(job)}
                              disabled={!available}
                            >
                              Start interview
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </article>

              <article className="feature-card alt interview-card">
                <p className="section-tag">Interview chamber</p>
                {!activeInterview ? (
                  <>
                    <h2>No interview running</h2>
                    <p>
                      Pick the next locked job above to start an AI interview. Harder jobs demand
                      higher aura, stronger clearance, and better judgment.
                    </p>
                  </>
                ) : activeInterview.complete ? (
                  <>
                    <h2>{activeInterview.passed ? 'Interview passed' : 'Interview failed'}</h2>
                    <p>
                      {activeInterview.passed
                        ? 'The AI accepted your answers and upgraded your career on the spot.'
                        : 'The AI rejected your vibe profile. Recover, regroup, and try again.'}
                    </p>
                    <button
                      className="secondary-button"
                      onClick={() => setActiveInterview(null)}
                    >
                      Close result
                    </button>
                  </>
                ) : (
                  (() => {
                    const interviewJob = getJobById(activeInterview.jobId)
                    const question = interviewJob.questions[activeInterview.step]

                    return (
                      <>
                        <h2>{interviewJob.interviewer}</h2>
                        <p>{question.prompt}</p>
                        <div className="answer-list">
                          {question.answers.map((answer) => (
                            <button
                              key={answer.text}
                              className="answer-button"
                              onClick={() => answerInterview(answer)}
                            >
                              {answer.text}
                            </button>
                          ))}
                        </div>
                        <div className="requirements">
                          <span>
                            Question {activeInterview.step + 1} / {interviewJob.questions.length}
                          </span>
                          <span>Score: {activeInterview.score}</span>
                          <span>Pass mark: {interviewJob.passScore}</span>
                        </div>
                      </>
                    )
                  })()
                )}
              </article>
            </div>
          )}

          {activeTab === 'market' && (
            <div className="panel-stack">
              <article className="feature-card">
                <div className="feature-header">
                  <div>
                    <p className="section-tag">Brainrot market</p>
                    <h2>Buy stronger chaos, avoid washed purchases</h2>
                  </div>
                  <div className="market-note">
                    Low-tier brainrots become cringe later. Keep upgrading your taste or your own
                    collection will start dragging your aura backwards.
                  </div>
                </div>

                <div className="market-grid wide">
                  {brainrots.map((brainrot) => {
                    const owned = game.ownedBrainrotIds.includes(brainrot.id)
                    const affordable = game.money >= brainrot.price
                    const eligible =
                      game.clearance >= brainrot.clearanceRequired &&
                      game.aura >= brainrot.auraRequired
                    const shiftAuraImpact = getBrainrotShiftAura(brainrot, game.aura)

                    return (
                      <article className="market-card" key={brainrot.id}>
                        <div className="market-head">
                          <div>
                            <p className="market-tier">Tier {brainrot.tier}</p>
                            <h3>{brainrot.name}</h3>
                          </div>
                          <span className="price-tag">${brainrot.price}</span>
                        </div>
                        <p>{brainrot.vibe}</p>
                        <div className="requirements">
                          <span>Shift aura: {formatSigned(shiftAuraImpact)}</span>
                          <span>Needs aura: {formatSigned(brainrot.auraRequired)}</span>
                          <span>Needs clearance: Tier {brainrot.clearanceRequired}</span>
                        </div>
                        <button
                          className="ghost-button"
                          onClick={() => buyBrainrot(brainrot)}
                          disabled={owned || !affordable || !eligible}
                        >
                          {owned ? 'Owned' : 'Buy brainrot'}
                        </button>
                      </article>
                    )
                  })}
                </div>
              </article>
            </div>
          )}

          {activeTab === 'vault' && (
            <div className="panel-stack">
              <article className="feature-card">
                <p className="section-tag">Your vault</p>
                <h2>Owned brainrots</h2>
                {ownedBrainrots.length === 0 ? (
                  <p>You own nothing yet. Grind shifts, stack money, then buy your first aura recovery piece.</p>
                ) : (
                  <div className="market-grid compact">
                    {ownedBrainrots.map((brainrot) => (
                      <article className="market-card" key={brainrot.id}>
                        <div className="market-head">
                          <div>
                            <p className="market-tier">Tier {brainrot.tier}</p>
                            <h3>{brainrot.name}</h3>
                          </div>
                          <span className="price-tag">
                            {formatSigned(getBrainrotShiftAura(brainrot, game.aura))}
                          </span>
                        </div>
                        <p>{brainrot.vibe}</p>
                      </article>
                    ))}
                  </div>
                )}
              </article>
            </div>
          )}
        </section>

        <aside className="side-panel">
          <article className="side-card">
            <p className="section-tag">Live feed</p>
            <h2>Run updates</h2>
            <div className="log-list">
              {game.logs.map((entry) => (
                <div className="log-entry" key={entry.id}>
                  {entry.text}
                </div>
              ))}
            </div>
          </article>

          <article className="side-card">
            <p className="section-tag">Shift chaos</p>
            <h2>Random events</h2>
            <p>
              Every shift can trigger bonus money, aura spikes, vibe audits, cringe tax, or random
              weird luck.
            </p>
            <div className="event-banner">{game.lastEvent ?? 'No event has triggered yet.'}</div>
          </article>

          <article className="side-card">
            <p className="section-tag">Victory path</p>
            <h2>How to win</h2>
            <ul className="goal-list">
              <li>Reach +65000 aura.</li>
              <li>Upgrade your brainrot clearance to Tier 7.</li>
              <li>Unlock the Infinite Aura Chancellor career.</li>
            </ul>
            {winState ? (
              <div className="win-banner">You are officially a reality-distorting aura legend.</div>
            ) : null}
          </article>

          <article className="side-card">
            <p className="section-tag">Reset</p>
            <h2>Start a fresh run</h2>
            <p>If you want a new attempt, wipe the save and restart the comeback arc.</p>
            <button className="ghost-button danger" onClick={resetGame}>
              Reset save
            </button>
          </article>
        </aside>
      </main>
      </div>
    </>
  )
}

export default App
