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
    description: "두 보석을 나란히 놓았을 때, 서로의 빛이 반사되어 더 강렬해지거나 흐려지기도 합니다.",
    metaphor_story: "다이아몬드 옆에 사파이어를 놓으면 더 빛납니다. 하지만 어떤 조합은 서로의 색을 흐립니다.",
    key_point: "궁합은 좋고 나쁨이 아닙니다. 어떤 빛을 만드는가의 문제입니다."
  },
  
  compatibilityLevel: {
    excellent: { level: 5, name: "완벽한 공명", percentage: "95-100%" },
    very_good: { level: 4, name: "강한 공명", percentage: "80-94%" },
    good: { level: 3, name: "적당한 공명", percentage: "60-79%" },
    neutral: { level: 2, name: "약한 공명", percentage: "40-59%" },
    challenging: { level: 1, name: "불협화음", percentage: "20-39%" },
    difficult: { level: 0, name: "강한 불협화음", percentage: "0-19%" }
  }
  
} as const;

export const getCompatibilityLevel = (score: number) => {
  if (score >= 95) return compatibilityMetaphor.compatibilityLevel.excellent;
  if (score >= 80) return compatibilityMetaphor.compatibilityLevel.very_good;
  if (score >= 60) return compatibilityMetaphor.compatibilityLevel.good;
  if (score >= 40) return compatibilityMetaphor.compatibilityLevel.neutral;
  if (score >= 20) return compatibilityMetaphor.compatibilityLevel.challenging;
  return compatibilityMetaphor.compatibilityLevel.difficult;
};
