/**
 * 궁합(宮合) 보석 메타포 DB
 *
 * "공명하는 보석들 (Resonating Gems)" - 서로의 광채를 증폭시키는 원석
 */

export const compatibilityMetaphor = {
  concept: {
    original: "궁합(宮合)",
    simple: "공명하는 보석들",
    poetic: "서로의 광채를 증폭시키는 원석",
    description:
      "두 보석을 나란히 놓았을 때, 서로의 빛이 반사되어 더 강렬해지거나 흐려지기도 합니다.",
    metaphor_story:
      "다이아몬드 옆에 사파이어를 놓으면 더 빛납니다. 하지만 어떤 조합은 서로의 색을 흐립니다.",
    key_point: "궁합은 좋고 나쁨이 아닙니다. 어떤 빛을 만드는가의 문제입니다.",
  },
  compatibilityLevel: {
    excellent: { level: 5, name: "완벽한 공명", percentage: "95-100%" },
    very_good: { level: 4, name: "강한 공명", percentage: "80-94%" },
    good: { level: 3, name: "적당한 공명", percentage: "60-79%" },
    neutral: { level: 2, name: "약한 공명", percentage: "40-59%" },
    challenging: { level: 1, name: "불협화음", percentage: "20-39%" },
    difficult: { level: 0, name: "강한 불협화음", percentage: "0-19%" },
  },
} as const

export const getCompatibilityLevel = (score: number) => {
  if (score >= 95) return compatibilityMetaphor.compatibilityLevel.excellent
  if (score >= 80) return compatibilityMetaphor.compatibilityLevel.very_good
  if (score >= 60) return compatibilityMetaphor.compatibilityLevel.good
  if (score >= 40) return compatibilityMetaphor.compatibilityLevel.neutral
  if (score >= 20) return compatibilityMetaphor.compatibilityLevel.challenging
  return compatibilityMetaphor.compatibilityLevel.difficult
}

/** 레벨별 색상 */
export const getLevelColor = (level: number): string => {
  switch (level) {
    case 5:
      return "#10b981"
    case 4:
      return "#3b82f6"
    case 3:
      return "#d4a574"
    case 2:
      return "#fbbf24"
    case 1:
      return "#f97316"
    case 0:
      return "#ef4444"
    default:
      return "#6b7280"
  }
}

/** 레벨별 설명 */
export const getLevelDescription = (level: number): string => {
  const descriptions: Record<number, string> = {
    5: "두 보석이 만나 무지개를 만듭니다. 서로의 빛을 극대화시키는 완벽한 조합이에요.",
    4: "빛이 반사되어 더 밝아집니다. 함께 있으면 힘이 나고 용기가 생깁니다.",
    3: "나란히 놓여도 충돌하지 않습니다. 평화롭고 안정적인 관계예요.",
    2: "각자의 빛을 냅니다. 함께 있어도 홀로 있는 느낌일 수 있어요.",
    1: "두 보석이 부딪혀 색이 흐려집니다. 함께 있으면 노력이 필요해요.",
    0: "빛이 서로를 가릴 수 있습니다. 이해와 노력으로 극복 가능해요.",
  }
  return descriptions[level] ?? ""
}
