import { Element, HeavenlyStem, EarthlyBranch, CodeTranslation } from './types'

// 천간 배열
export const HEAVENLY_STEMS: HeavenlyStem[] = [
  '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'
]

// 지지 배열
export const EARTHLY_BRANCHES: EarthlyBranch[] = [
  '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'
]

// 천간의 오행
export const STEM_ELEMENTS: Record<HeavenlyStem, Element> = {
  '甲': 'wood',
  '乙': 'wood',
  '丙': 'fire',
  '丁': 'fire',
  '戊': 'earth',
  '己': 'earth',
  '庚': 'metal',
  '辛': 'metal',
  '壬': 'water',
  '癸': 'water',
}

// 지지의 오행
export const BRANCH_ELEMENTS: Record<EarthlyBranch, Element> = {
  '子': 'water',
  '丑': 'earth',
  '寅': 'wood',
  '卯': 'wood',
  '辰': 'earth',
  '巳': 'fire',
  '午': 'fire',
  '未': 'earth',
  '申': 'metal',
  '酉': 'metal',
  '戌': 'earth',
  '亥': 'water',
}

// 천간 영어 번역 (8-Code Ritual 스타일)
export const STEM_TRANSLATIONS: Record<HeavenlyStem, CodeTranslation> = {
  '甲': { korean: '갑', english: 'Yang Wood', element: 'wood', meaning: 'Growth & Initiative' },
  '乙': { korean: '을', english: 'Yin Wood', element: 'wood', meaning: 'Flexibility & Adaptation' },
  '丙': { korean: '병', english: 'Yang Fire', element: 'fire', meaning: 'Passion & Energy' },
  '丁': { korean: '정', english: 'Yin Fire', element: 'fire', meaning: 'Warmth & Care' },
  '戊': { korean: '무', english: 'Yang Earth', element: 'earth', meaning: 'Stability & Foundation' },
  '己': { korean: '기', english: 'Yin Earth', element: 'earth', meaning: 'Nurture & Support' },
  '庚': { korean: '경', english: 'Yang Metal', element: 'metal', meaning: 'Precision & Justice' },
  '辛': { korean: '신', english: 'Yin Metal', element: 'metal', meaning: 'Refinement & Beauty' },
  '壬': { korean: '임', english: 'Yang Water', element: 'water', meaning: 'Wisdom & Flow' },
  '癸': { korean: '계', english: 'Yin Water', element: 'water', meaning: 'Intuition & Depth' },
}

// 지지 영어 번역 (12 동물)
export const BRANCH_TRANSLATIONS: Record<EarthlyBranch, CodeTranslation> = {
  '子': { korean: '자', english: 'Rat', element: 'water', meaning: 'Intelligence & Wit' },
  '丑': { korean: '축', english: 'Ox', element: 'earth', meaning: 'Diligence & Reliability' },
  '寅': { korean: '인', english: 'Tiger', element: 'wood', meaning: 'Courage & Confidence' },
  '卯': { korean: '묘', english: 'Rabbit', element: 'wood', meaning: 'Gentleness & Elegance' },
  '辰': { korean: '진', english: 'Dragon', element: 'earth', meaning: 'Power & Ambition' },
  '巳': { korean: '사', english: 'Snake', element: 'fire', meaning: 'Wisdom & Mystery' },
  '午': { korean: '오', english: 'Horse', element: 'fire', meaning: 'Freedom & Enthusiasm' },
  '未': { korean: '미', english: 'Goat', element: 'earth', meaning: 'Creativity & Peace' },
  '申': { korean: '신', english: 'Monkey', element: 'metal', meaning: 'Cleverness & Playfulness' },
  '酉': { korean: '유', english: 'Rooster', element: 'metal', meaning: 'Precision & Pride' },
  '戌': { korean: '술', english: 'Dog', element: 'earth', meaning: 'Loyalty & Honesty' },
  '亥': { korean: '해', english: 'Pig', element: 'water', meaning: 'Generosity & Honesty' },
}

// 오행 상생 관계
export const ELEMENT_GENERATION: Record<Element, Element> = {
  wood: 'fire',   // 목생화
  fire: 'earth',  // 화생토
  earth: 'metal', // 토생금
  metal: 'water', // 금생수
  water: 'wood',  // 수생목
}

// 오행 상극 관계
export const ELEMENT_DESTRUCTION: Record<Element, Element> = {
  wood: 'earth',  // 목극토
  earth: 'water', // 토극수
  water: 'fire',  // 수극화
  fire: 'metal',  // 화극금
  metal: 'wood',  // 금극목
}

// 오행별 성격 특성
export const ELEMENT_PERSONALITIES: Record<Element, {
  positive: string[]
  negative: string[]
}> = {
  wood: {
    positive: ['Creative', 'Growth-oriented', 'Flexible', 'Compassionate'],
    negative: ['Indecisive', 'Overly idealistic', 'Scattered'],
  },
  fire: {
    positive: ['Passionate', 'Charismatic', 'Enthusiastic', 'Warm'],
    negative: ['Impulsive', 'Impatient', 'Aggressive'],
  },
  earth: {
    positive: ['Stable', 'Reliable', 'Nurturing', 'Practical'],
    negative: ['Stubborn', 'Overly cautious', 'Possessive'],
  },
  metal: {
    positive: ['Precise', 'Disciplined', 'Just', 'Refined'],
    negative: ['Rigid', 'Critical', 'Controlling'],
  },
  water: {
    positive: ['Wise', 'Intuitive', 'Adaptable', 'Deep'],
    negative: ['Overly emotional', 'Passive', 'Fearful'],
  },
}

// 시간대별 지지 (자시 = 23-01시)
export const HOUR_TO_BRANCH: Record<number, EarthlyBranch> = {
  0: '子', 1: '子',  // 23-01
  2: '丑', 3: '丑',  // 01-03
  4: '寅', 5: '寅',  // 03-05
  6: '卯', 7: '卯',  // 05-07
  8: '辰', 9: '辰',  // 07-09
  10: '巳', 11: '巳', // 09-11
  12: '午', 13: '午', // 11-13
  14: '未', 15: '未', // 13-15
  16: '申', 17: '申', // 15-17
  18: '酉', 19: '酉', // 17-19
  20: '戌', 21: '戌', // 19-21
  22: '亥', 23: '亥', // 21-23
}
