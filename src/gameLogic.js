export const jobs = [
  { id: 'crust', title: 'Crust Collector', pay: 65, shiftAura: -6, auraRequired: -10000, clearanceRequired: 1 },
  { id: 'mall-npc', title: 'Mall NPC Assistant', pay: 140, shiftAura: 12, auraRequired: -8500, clearanceRequired: 1 },
  { id: 'trend', title: 'Junior Trend Analyst', pay: 275, shiftAura: 40, auraRequired: -3500, clearanceRequired: 2 },
  { id: 'consultant', title: 'Aura Consultant', pay: 520, shiftAura: 75, auraRequired: 500, clearanceRequired: 3 },
  { id: 'broker', title: 'Elite Brainrot Broker', pay: 900, shiftAura: 120, auraRequired: 5000, clearanceRequired: 4 },
  { id: 'syndicate', title: 'Clout Syndicate Lead', pay: 1450, shiftAura: 180, auraRequired: 11000, clearanceRequired: 5 },
  { id: 'luxury', title: 'Luxury Aura Strategist', pay: 2100, shiftAura: 260, auraRequired: 18000, clearanceRequired: 5 },
  { id: 'dimensional', title: 'Dimensional Trend Director', pay: 3200, shiftAura: 360, auraRequired: 28000, clearanceRequired: 6 },
  { id: 'curator', title: 'Mythic Brainrot Curator', pay: 4800, shiftAura: 520, auraRequired: 40000, clearanceRequired: 7 },
  { id: 'chancellor', title: 'Infinite Aura Chancellor', pay: 7000, shiftAura: 800, auraRequired: 58000, clearanceRequired: 7 },
]

export const brainrots = [
  { id: 'mozzarolli', tier: 1, price: 90, baseAura: 70, fallsOffAt: -2500, cringePenalty: 30, clearanceRequired: 1, auraRequired: -12000 },
  { id: 'spaghettino', tier: 1, price: 125, baseAura: 95, fallsOffAt: -500, cringePenalty: 55, clearanceRequired: 1, auraRequired: -12000 },
  { id: 'gnocchimax', tier: 1, price: 145, baseAura: 110, fallsOffAt: -700, cringePenalty: 60, clearanceRequired: 1, auraRequired: -12000 },
  { id: 'raviolaser', tier: 1, price: 165, baseAura: 120, fallsOffAt: -250, cringePenalty: 65, clearanceRequired: 1, auraRequired: -11000 },
  { id: 'bombardino', tier: 2, price: 320, baseAura: 180, fallsOffAt: 2500, cringePenalty: 70, clearanceRequired: 2, auraRequired: -4500 },
  { id: 'gelatissimo', tier: 2, price: 430, baseAura: 240, fallsOffAt: 5000, cringePenalty: 90, clearanceRequired: 2, auraRequired: -2500 },
  { id: 'paninivolt', tier: 2, price: 390, baseAura: 210, fallsOffAt: 4200, cringePenalty: 85, clearanceRequired: 2, auraRequired: -3200 },
  { id: 'risottoray', tier: 2, price: 510, baseAura: 290, fallsOffAt: 6500, cringePenalty: 100, clearanceRequired: 2, auraRequired: -1500 },
  { id: 'vesparino', tier: 3, price: 850, baseAura: 420, fallsOffAt: 9000, cringePenalty: 120, clearanceRequired: 3, auraRequired: 250 },
  { id: 'pizzatron', tier: 3, price: 1100, baseAura: 540, fallsOffAt: 12000, cringePenalty: 150, clearanceRequired: 3, auraRequired: 1200 },
  { id: 'calzoboom', tier: 3, price: 980, baseAura: 470, fallsOffAt: 10500, cringePenalty: 130, clearanceRequired: 3, auraRequired: 600 },
  { id: 'focaccios', tier: 3, price: 1280, baseAura: 620, fallsOffAt: 14000, cringePenalty: 165, clearanceRequired: 3, auraRequired: 1800 },
  { id: 'tiramisoul', tier: 4, price: 2200, baseAura: 950, fallsOffAt: 20000, cringePenalty: 200, clearanceRequired: 4, auraRequired: 4500 },
  { id: 'operarage', tier: 4, price: 2700, baseAura: 1120, fallsOffAt: 23000, cringePenalty: 240, clearanceRequired: 4, auraRequired: 7000 },
  { id: 'lambrorift', tier: 4, price: 3100, baseAura: 1280, fallsOffAt: 26000, cringePenalty: 250, clearanceRequired: 4, auraRequired: 9000 },
  { id: 'venexotic', tier: 5, price: 4500, baseAura: 1600, fallsOffAt: 34000, cringePenalty: 280, clearanceRequired: 5, auraRequired: 12000 },
  { id: 'trufflecore', tier: 5, price: 5200, baseAura: 1820, fallsOffAt: 38000, cringePenalty: 320, clearanceRequired: 5, auraRequired: 15000 },
  { id: 'glitchgoblet', tier: 5, price: 6100, baseAura: 2050, fallsOffAt: 42000, cringePenalty: 360, clearanceRequired: 5, auraRequired: 19000 },
  { id: 'megadrip', tier: 6, price: 7800, baseAura: 2550, fallsOffAt: 50000, cringePenalty: 420, clearanceRequired: 6, auraRequired: 24000 },
  { id: 'orbitalpha', tier: 6, price: 9200, baseAura: 2980, fallsOffAt: 54000, cringePenalty: 470, clearanceRequired: 6, auraRequired: 30000 },
  { id: 'mythosnack', tier: 7, price: 12800, baseAura: 3800, fallsOffAt: 999999, cringePenalty: 0, clearanceRequired: 7, auraRequired: 42000 },
  { id: 'galaxio', tier: 7, price: 15600, baseAura: 4500, fallsOffAt: 999999, cringePenalty: 0, clearanceRequired: 7, auraRequired: 52000 },
]

export const shiftEvents = [
  { id: 'bonus-tip', money: 120, aura: 35, chance: 0.22 },
  { id: 'npc-clip', money: 80, aura: 140, chance: 0.18 },
  { id: 'washed-callout', money: 0, aura: -110, chance: 0.16, minAura: -2000 },
  { id: 'black-market', money: 240, aura: 0, chance: 0.14, minClearance: 2 },
  { id: 'vibe-audit', money: 0, aura: 220, chance: 0.12, minClearance: 3 },
  { id: 'cringe-tax', money: -140, aura: -160, chance: 0.12, minAura: 4000 },
  { id: 'elite-invite', money: 0, aura: 320, chance: 0.1, minAura: 12000 },
  { id: 'reality-bend', money: 450, aura: 260, chance: 0.08, minClearance: 4 },
]

export function createInitialGame() {
  return {
    day: 1,
    money: 160,
    aura: -10000,
    clearance: 1,
    currentJobId: jobs[0].id,
    unlockedJobIds: [jobs[0].id],
    ownedBrainrotIds: [],
    logs: [{ id: 1, text: 'Spawned into existence with -10000 aura. Recovery arc begins now.' }],
    lastEvent: null,
  }
}

export function getBrainrotShiftAura(brainrot, aura) {
  return aura >= brainrot.fallsOffAt ? -brainrot.cringePenalty : brainrot.baseAura
}

export function getEligibleShiftEvents(game) {
  return shiftEvents.filter((event) => {
    if (typeof event.minAura === 'number' && game.aura < event.minAura) {
      return false
    }

    if (typeof event.minClearance === 'number' && game.clearance < event.minClearance) {
      return false
    }

    return true
  })
}

export function getClearanceUpgradeRequirements(clearance) {
  return {
    cost: clearance * 1100,
    aura: clearance * 3500 - 2500,
  }
}

