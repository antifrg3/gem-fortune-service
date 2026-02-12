// 오행 (Five Elements)
export type Element = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

// 음양
export type YinYang = 'yin' | 'yang'

// 천간 (10 Heavenly Stems)
export type HeavenlyStem = 
  | '甲' | '乙' | '丙' | '丁' | '戊' 
  | '己' | '庚' | '辛' | '壬' | '癸'

// 지지 (12 Earthly Branches)
export type EarthlyBranch = 
  | '子' | '丑' | '寅' | '卯' | '辰' | '午'
  | '未' | '申' | '酉' | '戌' | '亥' | '巳'

// 십성 (10 Gods)
export type TenGod = 
  | 'companion' // 비겁
  | 'resource' // 인성
  | 'power' // 관성
  | 'wealth' // 재성
  | 'output' // 식상

/** 십성 개수 (한글 키: 비견, 겁재, 식신, 상관, 편재, 정재, 편관, 정관, 편인, 정인) */
export type SipseongCounts = Record<string, number>

// 사주 한 기둥 (년/월/일/시)
export interface Pillar {
  stem: HeavenlyStem
  branch: EarthlyBranch
  stemElement: Element
  branchElement: Element
  yinYang: YinYang
}

// 전체 사주팔자
export interface SajuChart {
  year: Pillar
  month: Pillar
  day: Pillar
  hour: Pillar
  dayMaster: HeavenlyStem // 일간 (본인)
  elements: ElementBalance
  personality: PersonalityTraits
  sipseongCounts?: SipseongCounts
  birthData?: BirthData
}

// 오행 균형
export interface ElementBalance {
  wood: number
  fire: number
  earth: number
  metal: number
  water: number
}

// 성격 특성
export interface PersonalityTraits {
  primary: string[]
  strengths: string[]
  challenges: string[]
  luckyElements: Element[]
}

// 입력 데이터
export interface BirthData {
  year: number
  month: number
  day: number
  hour: number
}

// 8-Code 영어 표현
export interface CodeTranslation {
  korean: string
  english: string
  element: Element
  meaning: string
}
