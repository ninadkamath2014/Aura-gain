import test from 'node:test'
import assert from 'node:assert/strict'

import {
  brainrots,
  createInitialGame,
  getBrainrotShiftAura,
  getClearanceUpgradeRequirements,
  getEligibleShiftEvents,
  jobs,
} from '../src/gameLogic.js'

test('initial game starts with the expected comeback state', () => {
  const game = createInitialGame()

  assert.equal(game.day, 1)
  assert.equal(game.money, 160)
  assert.equal(game.aura, -10000)
  assert.equal(game.clearance, 1)
  assert.deepEqual(game.unlockedJobIds, ['crust'])
})

test('starter brainrots remain available in the deepest negative aura range', () => {
  const starterCandidates = brainrots.filter((brainrot) => brainrot.clearanceRequired === 1)

  assert.ok(starterCandidates.length >= 4)
  assert.ok(starterCandidates.every((brainrot) => brainrot.auraRequired <= -11000))
})

test('low-tier brainrots become cringe after their falloff threshold', () => {
  const starter = brainrots.find((brainrot) => brainrot.id === 'mozzarolli')

  assert.equal(getBrainrotShiftAura(starter, -10000), 70)
  assert.equal(getBrainrotShiftAura(starter, 2000), -30)
})

test('clearance upgrades scale upward in both cost and aura requirement', () => {
  const tierOne = getClearanceUpgradeRequirements(1)
  const tierFour = getClearanceUpgradeRequirements(4)

  assert.deepEqual(tierOne, { cost: 1100, aura: 1000 })
  assert.deepEqual(tierFour, { cost: 4400, aura: 11500 })
})

test('higher-gate random events stay locked until the run is strong enough', () => {
  const weakRun = getEligibleShiftEvents({ aura: -6000, clearance: 1 })
  const strongRun = getEligibleShiftEvents({ aura: 20000, clearance: 5 })

  assert.ok(!weakRun.some((event) => event.id === 'black-market'))
  assert.ok(!weakRun.some((event) => event.id === 'elite-invite'))
  assert.ok(strongRun.some((event) => event.id === 'black-market'))
  assert.ok(strongRun.some((event) => event.id === 'elite-invite'))
})

test('the job ladder now includes a true endgame career', () => {
  assert.equal(jobs.at(-1)?.id, 'chancellor')
  assert.ok(jobs.length >= 10)
})
