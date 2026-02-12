import {
  BirthData,
  SajuChart,
  Pillar,
  ElementBalance,
  PersonalityTraits,
  Element,
  SipseongCounts,
} from './types'
import {
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  STEM_ELEMENTS,
  BRANCH_ELEMENTS,
  ELEMENT_PERSONALITIES,
} from './constants'
import { Solar, Lunar, EightChar } from 'lunar-typescript'

/**
 * 사주팔자 계산 메인 함수 (lunar-typescript 사용)
 */
export function calculateSaju(birthData: BirthData): SajuChart {
  // Solar 객체 생성 (양력 날짜)
  const solar = Solar.fromYmdHms(
    birthData.year,
    birthData.month,
    birthData.day,
    birthData.hour,
    0,
    0
  )
  
  // 음력 변환
  const lunar = solar.getLunar()
  
  // 팔자 계산
  const eightChar = lunar.getEightChar()
  
  // 년주
  const yearPillar = createPillarFromEightChar(
    eightChar.getYearGan(),
    eightChar.getYearZhi()
  )
  
  // 월주
  const monthPillar = createPillarFromEightChar(
    eightChar.getMonthGan(),
    eightChar.getMonthZhi()
  )
  
  // 일주
  const dayPillar = createPillarFromEightChar(
    eightChar.getDayGan(),
    eightChar.getDayZhi()
  )
  
  // 시주
  const hourPillar = createPillarFromEightChar(
    eightChar.getTimeGan(),
    eightChar.getTimeZhi()
  )

  const elements = calculateElementBalance(yearPillar, monthPillar, dayPillar, hourPillar)
  const personality = calculatePersonality(dayPillar.stem, elements)
  const sipseongCounts = calculateSipseongCounts(lunar)

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    dayMaster: dayPillar.stem,
    elements,
    personality,
    sipseongCounts,
    birthData,
  }
}

/** 한자 십성 → 한글 키 매핑 */
const SHISHEN_TO_KR: Record<string, string> = {
  比肩: '비견',
  劫財: '겁재',
  食神: '식신',
  傷官: '상관',
  偏財: '편재',
  正財: '정재',
  七殺: '편관',
  正官: '정관',
  偏印: '편인',
  正印: '정인',
}

/**
 * 십성 개수 계산 (lunar-typescript의 十神 사용)
 */
function calculateSipseongCounts(lunar: Lunar): SipseongCounts {
  const counts: SipseongCounts = {}
  const eightChar = lunar.getEightChar()

  const collect = (hanja: string) => {
    if (!hanja || hanja === '日主') return // 日主 = 일간(자신) 제외
    const kr = SHISHEN_TO_KR[hanja]
    if (kr) counts[kr] = (counts[kr] ?? 0) + 1
  }

  // 천간 4개 (년월일시) — 日柱 천간은 일간 자신이므로 제외됨
  const ganList = [
    eightChar.getYearShiShenGan(),
    eightChar.getMonthShiShenGan(),
    eightChar.getDayShiShenGan(), // 日主 반환 가능 → collect에서 제외
    eightChar.getTimeShiShenGan(),
  ]
  ganList.forEach(collect)

  // 지지 숨은천간 (년월일시)
  const zhiList = [
    ...eightChar.getYearShiShenZhi(),
    ...eightChar.getMonthShiShenZhi(),
    ...eightChar.getDayShiShenZhi(),
    ...eightChar.getTimeShiShenZhi(),
  ]
  zhiList.forEach(collect)

  return counts
}

/**
 * lunar-typescript의 천간지지를 우리 Pillar 형식으로 변환
 */
function createPillarFromEightChar(gan: string, zhi: string): Pillar {
  // lunar-typescript는 한자를 반환하므로 그대로 사용
  const stem = gan as any
  const branch = zhi as any
  
  return {
    stem,
    branch,
    stemElement: STEM_ELEMENTS[stem],
    branchElement: BRANCH_ELEMENTS[branch],
    yinYang: HEAVENLY_STEMS.indexOf(stem) % 2 === 0 ? 'yang' : 'yin',
  }
}

/**
 * 오행 균형 계산
 */
function calculateElementBalance(
  year: Pillar,
  month: Pillar,
  day: Pillar,
  hour: Pillar
): ElementBalance {
  const balance: ElementBalance = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  }
  
  // 천간 가중치 1.0
  const pillars = [year, month, day, hour]
  pillars.forEach(pillar => {
    balance[pillar.stemElement] += 1.0
    balance[pillar.branchElement] += 0.8 // 지지는 0.8 가중치
  })
  
  // 퍼센트로 변환
  const total = Object.values(balance).reduce((sum, val) => sum + val, 0)
  Object.keys(balance).forEach(key => {
    balance[key as Element] = Math.round((balance[key as Element] / total) * 100)
  })
  
  return balance
}

/**
 * 성격 특성 분석
 */
function calculatePersonality(dayMaster: any, elements: ElementBalance): PersonalityTraits {
  const dominantElement = Object.entries(elements).reduce((a, b) => 
    b[1] > a[1] ? b : a
  )[0] as Element
  
  const weakElement = Object.entries(elements).reduce((a, b) => 
    b[1] < a[1] ? b : a
  )[0] as Element
  
  const dayElement = STEM_ELEMENTS[dayMaster]
  
  const traits = ELEMENT_PERSONALITIES[dayElement]
  
  return {
    primary: traits.positive.slice(0, 3),
    strengths: traits.positive,
    challenges: traits.negative,
    luckyElements: [weakElement], // 부족한 오행이 길신
  }
}

/**
 * 사주 텍스트 표현 (디버깅용)
 */
export function sajuToString(saju: SajuChart): string {
  return `
    년주: ${saju.year.stem}${saju.year.branch}
    월주: ${saju.month.stem}${saju.month.branch}
    일주: ${saju.day.stem}${saju.day.branch} (일간: ${saju.dayMaster})
    시주: ${saju.hour.stem}${saju.hour.branch}
    
    오행 균형:
    - 목(Wood): ${saju.elements.wood}%
    - 화(Fire): ${saju.elements.fire}%
    - 토(Earth): ${saju.elements.earth}%
    - 금(Metal): ${saju.elements.metal}%
    - 수(Water): ${saju.elements.water}%
  `.trim()
}
