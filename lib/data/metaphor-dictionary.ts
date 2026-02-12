/**
 * 보석 메타포 용어집
 *
 * 사주 용어를 보석 은유로 변환하는 핵심 사전
 * 모든 UI 텍스트는 이 파일을 기준으로 통일
 */

export const metaphorDictionary = {
  // ===== 핵심 구조 =====
  core: {
    saju: {
      original: "사주(四柱)",
      simple: "운명의 4개 기둥",
      poetic: "당신이라는 보석을 떠받치는 네 기둥",
      bridge: "사주(四柱) → 운명의 4개 기둥",
    },

    palja: {
      original: "팔자(八字)",
      simple: "8가지 타고난 재료",
      poetic: "당신을 만든 여덟 개의 원소",
      bridge: "팔자(八字) → 8가지 타고난 재료",
    },

    ilju: {
      original: "일주(日柱)",
      simple: "핵심 원석",
      poetic: "당신이라는 보석의 본질",
      bridge: "일주(日柱) → 당신의 핵심 원석",
    },

    cheongan: {
      original: "천간(天干)",
      simple: "겉으로 드러나는 빛",
      poetic: "세상이 보는 당신의 빛",
      bridge: "천간(天干) → 겉으로 드러나는 빛",
    },

    jiji: {
      original: "지지(地支)",
      simple: "뿌리 깊은 기반",
      poetic: "보이지 않지만 당신을 지탱하는 힘",
      bridge: "지지(地支) → 뿌리 깊은 기반",
    },
  },

  // ===== 시간과 운 =====
  timing: {
    daewoon: {
      original: "대운(大運)",
      simple: "인생의 계절",
      poetic: "10년마다 바뀌는 조명",
      description: "보석은 그대로지만, 조명이 바뀌면 반짝임이 달라집니다.",
      bridge: "대운(大運) → 인생의 계절 (10년 주기)",
    },

    sewoon: {
      original: "세운(歲運)",
      simple: "올해의 날씨",
      poetic: "1년 동안 비추는 빛",
      description: "오늘의 날씨처럼, 매년 달라지는 당신의 운입니다.",
      bridge: "세운(歲運) → 올해의 날씨",
    },

    wolwoon: {
      original: "월운(月運)",
      simple: "이번 달 조명",
      poetic: "한 달간 비추는 빛",
      bridge: "월운(月運) → 이번 달 조명",
    },
  },

  // ===== 관계와 환경 =====
  relationship: {
    sipseong: {
      original: "십성(十星)",
      simple: "나를 비추는 사람들",
      poetic: "당신 주변의 빛과 그림자",
      description: "주변 사람들은 당신을 더 빛나게 하거나 가리는 빛입니다.",
      bridge: "십성(十星) → 나를 비추는 사람들",
    },

    gunghap: {
      original: "궁합(宮合)",
      simple: "공명하는 보석들",
      poetic: "서로의 광채를 증폭시키는 원석",
      description: "함께 놓였을 때 더 빛나는 보석들입니다.",
      bridge: "궁합(宮合) → 공명하는 보석들",
    },
  },

  // ===== 에너지와 균형 =====
  energy: {
    ohang: {
      original: "오행(五行)",
      simple: "5가지 빛의 색",
      poetic: "당신을 만든 다섯 가지 광채",
      description: "보석이 빛을 받으면 다섯 가지 색으로 분산됩니다.",
      bridge: "오행(五行) → 5가지 빛의 색",
    },

    gyunhyung: {
      original: "균형",
      simple: "빛의 조화",
      poetic: "다섯 빛이 이루는 균형",
      bridge: "오행 균형 → 빛의 조화",
    },

    energyBalance: {
      original: "에너지 밸런스",
      simple: "빛의 조화",
      description: "당신을 구성하는 5가지 빛의 비율입니다.",
      bridge: "에너지 밸런스 → 빛의 조화",
    },

    wangseong: {
      original: "왕성(旺盛)",
      simple: "강하게 빛나는",
      poetic: "넘치도록 빛나는 광채",
      bridge: "왕 → 강한 빛",
    },

    yeolyak: {
      original: "열약(劣弱)",
      simple: "약하게 빛나는",
      poetic: "더 키워야 할 빛",
      bridge: "약 → 약한 빛 (보충 필요)",
    },
  },

  // ===== 잠재력과 성장 =====
  potential: {
    jijanggan: {
      original: "지장간(支藏干)",
      simple: "숨은 결정",
      poetic: "보석 내부에 숨겨진 빛",
      description: "특정 상황에서만 빛을 발하는 히든 재능입니다.",
      bridge: "지장간(支藏干) → 숨은 결정 (12개)",
    },

    yongsin: {
      original: "용신(用神)",
      simple: "행운의 빛",
      poetic: "당신을 가장 빛나게 하는 색",
      description: "이 빛을 더 받으면 운이 좋아집니다.",
      bridge: "용신(用神) → 행운의 빛",
    },

    gigsin: {
      original: "기신(忌神)",
      simple: "피해야 할 빛",
      poetic: "당신을 흐리게 하는 색",
      description: "이 빛을 피하면 운이 좋아집니다.",
      bridge: "기신(忌神) → 피해야 할 빛",
    },
  },

  // ===== 개운과 관리 =====
  improvement: {
    gaewoon: {
      original: "개운(開運)",
      simple: "보석 관리법",
      poetic: "당신을 더 빛나게 만드는 방법",
      description: "일상에서 실천할 수 있는 광택 내기",
      bridge: "개운법 → 보석 관리법",
    },

    ritual: {
      original: "방위, 색상, 행동",
      simple: "빛내는 습관",
      poetic: "매일 당신을 닦는 의식",
      bridge: "실천법 → 빛내는 습관",
    },
  },

  // ===== UI 요소 =====
  ui: {
    part: {
      original: "PART",
      simple: "CHAPTER",
      reasoning: "FACET은 전문적, CHAPTER가 더 친근함",
    },

    facet: {
      original: "Facet (보석 면)",
      simple: "CHAPTER",
      reasoning: "facet은 보석 용어로 어려울 수 있음",
    },

    report: {
      original: "상세 분석 리포트",
      simple: "당신의 보석",
      poetic: "당신이라는 보석의 모든 것",
    },
  },
} as const

/**
 * 사용 예시:
 *
 * const { simple, bridge } = metaphorDictionary.core.saju;
 * // simple: "운명의 4개 기둥"
 * // bridge: "사주(四柱) → 운명의 4개 기둥"
 */

export type MetaphorKey = keyof typeof metaphorDictionary
