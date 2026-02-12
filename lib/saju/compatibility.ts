/**
 * 궁합(공명) 점수 계산
 * 두 일주의 천간·지지 오행 관계 기반
 */

import type { Element } from "./types"
import {
  STEM_ELEMENTS,
  BRANCH_ELEMENTS,
  ELEMENT_GENERATION,
  ELEMENT_DESTRUCTION,
} from "./constants"

/** 일주 키 (예: 甲子) */
type DayPillarKey = string

/**
 * 두 오행의 관계 점수 (0~100)
 * - 상생: 95, 동일: 75, 상극: 25
 */
function elementPairScore(e1: Element, e2: Element): number {
  if (e1 === e2) return 75

  const e1Generates = ELEMENT_GENERATION[e1] === e2
  const e2Generates = ELEMENT_GENERATION[e2] === e1
  if (e1Generates || e2Generates) return 95

  const e1Destroys = ELEMENT_DESTRUCTION[e1] === e2
  const e2Destroys = ELEMENT_DESTRUCTION[e2] === e1
  if (e1Destroys || e2Destroys) return 25

  return 50 // 기타 (편생 등)
}

/**
 * 두 일주의 궁합 점수 계산 (0~100)
 * @param pillar1 일주 한자 (예: "甲子")
 * @param pillar2 상대 일주 한자
 */
export function calculateCompatibilityScore(
  pillar1: DayPillarKey,
  pillar2: DayPillarKey
): number {
  if (pillar1.length < 2 || pillar2.length < 2) return 50

  const stem1 = pillar1[0] as keyof typeof STEM_ELEMENTS
  const branch1 = pillar1[1] as keyof typeof BRANCH_ELEMENTS
  const stem2 = pillar2[0] as keyof typeof STEM_ELEMENTS
  const branch2 = pillar2[1] as keyof typeof BRANCH_ELEMENTS

  const eStem1 = STEM_ELEMENTS[stem1]
  const eBranch1 = BRANCH_ELEMENTS[branch1]
  const eStem2 = STEM_ELEMENTS[stem2]
  const eBranch2 = BRANCH_ELEMENTS[branch2]

  if (!eStem1 || !eBranch1 || !eStem2 || !eBranch2) return 50

  const stemScore = elementPairScore(eStem1, eStem2)
  const branchScore = elementPairScore(eBranch1, eBranch2)

  const score = Math.round(0.5 * stemScore + 0.5 * branchScore)
  return Math.max(0, Math.min(100, score))
}
