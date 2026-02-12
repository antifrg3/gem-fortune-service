/**
 * 오행(五行) 보석 메타포 DB
 *
 * "5가지 빛의 색" - 보석이 빛을 받으면 다섯 가지 색으로 분산됩니다
 */

export const elementMetaphor = {
  木: {
    hanja: "木",
    original: "목(木)",
    simple: "초록빛 광채",
    poetic: "싹트고 자라는 생명의 빛",
    icon: "🌱",
    color: "#10b981",
    season: "봄",
    direction: "동쪽",
    time: "새벽",

    nature: {
      character: "성장하고 확장하는 에너지",
      movement: "위로, 밖으로",
      feeling: "부드럽지만 강인함",
    },

    description:
      "새싹이 땅을 뚫고 나오는 힘. 부드럽지만 멈추지 않고 자랍니다.",

    when_strong: {
      percentage: "30% 이상",
      trait: "성장 욕구가 강함, 개척 정신, 창의성",
      positive:
        "새로운 시도를 두려워하지 않고, 끊임없이 배우고 성장합니다",
      negative: "지나치면 통제가 어렵고, 산만해지며, 한곳에 정착하기 힘듭니다",
      advice: "뿌리를 내리세요. 성장도 중요하지만 깊이도 필요합니다.",
      metaphor:
        "나무가 너무 빨리 크면 쓰러지기 쉽습니다. 뿌리를 깊게 내리세요.",
    },

    when_weak: {
      percentage: "10% 이하",
      trait: "성장 동력 부족, 새로운 시도 어려움",
      positive: "안정적이고 현실적입니다",
      negative: "변화를 두려워하고, 기회를 놓치며, 정체될 수 있습니다",
      advice: "새로운 것을 시도하세요. 작은 씨앗이라도 심어보세요.",
      metaphor:
        "씨앗은 땅 속에서 나올 용기가 필요합니다. 한 발 내딛으세요.",
    },

    when_balanced: {
      percentage: "15-25%",
      trait: "적절한 성장과 안정의 균형",
      state: "건강한 나무처럼, 뿌리도 깊고 가지도 뻗습니다.",
    },

    boost: {
      color: "초록색, 청록색",
      direction: "동쪽 방향 활동",
      item: "화분, 식물, 나무 소재",
      action: "산책, 등산, 새벽 운동",
      food: "채소, 과일, 신맛",
      mantra: "나는 매일 조금씩 자랍니다",
    },

    suppress: {
      when: "목 광채가 너무 강할 때 (35% 이상)",
      how: "금(金) 에너지로 가지치기 - 우선순위를 정하고 집중",
      avoid: "무분별한 확장, 너무 많은 프로젝트 동시 진행",
    },

    element_story:
      "봄날 새싹은 아스팔트를 뚫고 나옵니다. 작지만 멈출 수 없는 힘, 그것이 木의 광채입니다.",
  },

  火: {
    hanja: "火",
    original: "화(火)",
    simple: "붉은 광채",
    poetic: "타오르며 빛나는 열정의 빛",
    icon: "🔥",
    color: "#ef4444",
    season: "여름",
    direction: "남쪽",
    time: "낮 12시",

    nature: {
      character: "확산되고 빛나는 에너지",
      movement: "위로, 사방으로",
      feeling: "뜨겁고 강렬함",
    },

    description: "불꽃처럼 순간적으로 강렬하게 빛납니다. 뜨겁고 열정적입니다.",

    when_strong: {
      percentage: "30% 이상",
      trait: "카리스마, 열정, 표현력 강함",
      positive:
        "사람들을 끌어당기고, 열정적으로 밀어붙이며, 빠르게 행동합니다",
      negative:
        "쉽게 타오르고 쉽게 식으며, 충동적이고, 번아웃 위험이 있습니다",
      advice: "식히는 시간을 가지세요. 불은 타오르다가 재가 됩니다.",
      metaphor: "촛불은 밝지만 하루밤을 못 갑니다. 장작처럼 천천히 타세요.",
    },

    when_weak: {
      percentage: "10% 이하",
      trait: "열정 부족, 표현력 약함, 소극적",
      positive: "차분하고 냉정합니다",
      negative: "존재감이 약하고, 기회를 놓치며, 추진력이 부족합니다",
      advice: "불씨를 살리세요. 작은 열정이라도 키워보세요.",
      metaphor: "꺼진 불도 다시 보자. 재 속에서 불씨를 찾으세요.",
      lucky: "⭐ 행운의 빛! 화(火)를 보충하면 운이 좋아집니다",
    },

    when_balanced: {
      percentage: "15-25%",
      trait: "적절한 열정과 냉정함의 균형",
      state: "모닥불처럼, 따뜻하지만 통제 가능합니다.",
    },

    boost: {
      color: "빨강, 주황, 분홍",
      direction: "남쪽 방향 활동",
      item: "캔들, 조명, 따뜻한 색감",
      action: "대중 앞 발표, 운동, 정오 활동",
      food: "매운 음식, 뜨거운 음식, 쓴맛",
      mantra: "나는 열정으로 빛납니다",
    },

    suppress: {
      when: "화 광채가 너무 강할 때 (35% 이상)",
      how: "수(水) 에너지로 식히기 - 명상, 휴식, 차분한 활동",
      avoid: "과도한 자극, 충동적 결정, 밤샘 작업",
    },

    element_story:
      "불꽃은 어둠을 밝히고 사람들을 모읍니다. 하지만 너무 가까이 가면 타버립니다. 적당한 거리에서 빛나세요.",
  },

  土: {
    hanja: "土",
    original: "토(土)",
    simple: "황금빛 광채",
    poetic: "모든 것을 품는 대지의 빛",
    icon: "🏔️",
    color: "#d4a574",
    season: "환절기 (계절 사이)",
    direction: "중앙",
    time: "오후",

    nature: {
      character: "받아들이고 저장하는 에너지",
      movement: "아래로, 안으로",
      feeling: "든든하고 무겁지만 따뜻함",
    },

    description: "대지처럼 모든 것을 받아주고 품습니다. 변하지 않고 믿음직합니다.",

    when_strong: {
      percentage: "35% 이상",
      trait: "안정감, 책임감, 신뢰성 강함",
      positive: "믿을 수 있고, 끈기 있으며, 장기적 안목을 가집니다",
      negative: "변화를 싫어하고, 완고하며, 새로운 것을 거부할 수 있습니다",
      advice: "때론 유연함이 필요합니다. 단단한 바위도 물에 깎입니다.",
      metaphor: "산은 든든하지만 움직이지 못합니다. 때론 흐를 줄도 알아야 합니다.",
    },

    when_weak: {
      percentage: "15% 이하",
      trait: "불안정, 근거 부족, 표류",
      positive: "유연하고 적응력이 좋습니다",
      negative: "중심을 잡기 어렵고, 쉽게 흔들리며, 장기 계획이 약합니다",
      advice: "뿌리를 내리세요. 작은 기반이라도 만드세요.",
      metaphor:
        "떠다니는 구름은 자유롭지만 어디로 갈지 모릅니다. 땅을 밟으세요.",
    },

    when_balanced: {
      percentage: "20-30%",
      trait: "안정과 변화의 적절한 균형",
      state: "비옥한 땅처럼, 단단하면서도 생명을 키웁니다.",
    },

    boost: {
      color: "황토색, 베이지, 갈색, 노란색",
      direction: "중앙, 편안한 곳",
      item: "도자기, 돌, 흙, 나무",
      action: "명상, 정리, 일상 루틴",
      food: "곡물, 단맛, 따뜻한 음식",
      mantra: "나는 흔들리지 않습니다",
    },

    suppress: {
      when: "토 광채가 너무 강할 때 (40% 이상)",
      how: "목(木) 에너지로 뚫기 - 새로운 시도, 변화 주기",
      avoid: "과도한 안주, 변화 거부, 고집",
    },

    element_story:
      "대지는 모든 것을 받아줍니다. 비가 와도, 눈이 와도, 묵묵히 품습니다. 그것이 土의 힘입니다.",
  },

  金: {
    hanja: "金",
    original: "금(金)",
    simple: "은빛 광채",
    poetic: "날카롭게 빛나는 결단의 빛",
    icon: "⚔️",
    color: "#e5e7eb",
    season: "가을",
    direction: "서쪽",
    time: "저녁",

    nature: {
      character: "정리하고 수확하는 에너지",
      movement: "안으로, 아래로",
      feeling: "차갑고 단단하고 날카로움",
    },

    description: "금속처럼 단단하고 날카롭습니다. 정확하고 흔들림이 없습니다.",

    when_strong: {
      percentage: "30% 이상",
      trait: "원칙적, 결단력, 정확성 강함",
      positive: "명확한 판단을 하고, 정리를 잘하며, 결과를 만들어냅니다",
      negative: "차갑고, 융통성이 없으며, 인정이 부족할 수 있습니다",
      advice: "때론 부드러움이 필요합니다. 칼날만으론 안아줄 수 없습니다.",
      metaphor:
        "칼은 정확하게 자르지만, 모든 걸 자를 순 없습니다. 때론 감싸안으세요.",
    },

    when_weak: {
      percentage: "10% 이하",
      trait: "우유부단, 정리 못함, 결단력 약함",
      positive: "따뜻하고 유연합니다",
      negative: "결정을 못 내리고, 정리가 안 되며, 마무리가 약합니다",
      advice: "칼날을 세우세요. 때론 잘라내는 것도 필요합니다.",
      metaphor: "무딘 칼은 아무것도 자르지 못합니다. 날을 세우세요.",
    },

    when_balanced: {
      percentage: "15-25%",
      trait: "원칙과 유연함의 균형",
      state: "잘 벼려진 칼처럼, 날카롭지만 통제 가능합니다.",
    },

    boost: {
      color: "흰색, 은색, 금색, 회색",
      direction: "서쪽 방향 활동",
      item: "금속 제품, 시계, 악기",
      action: "정리, 결단, 저녁 산책",
      food: "매운맛, 흰색 음식",
      mantra: "나는 명확하게 판단합니다",
    },

    suppress: {
      when: "금 광채가 너무 강할 때 (35% 이상)",
      how: "화(火) 에너지로 녹이기 - 따뜻한 관계, 감정 표현",
      avoid: "과도한 비판, 냉정함, 감정 차단",
    },

    element_story:
      "가을 칼바람은 나무를 정리합니다. 아프지만 필요한 일입니다. 그래야 새봄이 옵니다.",
  },

  水: {
    hanja: "水",
    original: "수(水)",
    simple: "푸른 광채",
    poetic: "흐르며 적응하는 지혜의 빛",
    icon: "💧",
    color: "#3b82f6",
    season: "겨울",
    direction: "북쪽",
    time: "밤",

    nature: {
      character: "흐르고 스며드는 에너지",
      movement: "아래로, 모든 방향으로",
      feeling: "차갑지만 부드럽고 유연함",
    },

    description: "물처럼 흐릅니다. 막히면 돌아가고, 높으면 내려갑니다.",

    when_strong: {
      percentage: "30% 이상",
      trait: "지혜, 적응력, 직관력 강함",
      positive: "유연하게 대처하고, 깊이 생각하며, 본질을 꿰뚫습니다",
      negative: "우유부단하고, 불안하며, 방향성을 잃을 수 있습니다",
      advice: "흐르되 목적지는 있어야 합니다. 강물도 바다로 갑니다.",
      metaphor: "물은 어디든 흐르지만, 결국 낮은 곳으로 갑니다. 방향을 정하세요.",
    },

    when_weak: {
      percentage: "10% 이하",
      trait: "지혜 부족, 직관력 약함, 경직됨",
      positive: "직선적이고 명확합니다",
      negative: "융통성이 없고, 고집이 세며, 적응이 어렵습니다",
      advice: "흐를 줄 아세요. 막히면 돌아가는 법을 배우세요.",
      metaphor: "얼어붙은 물은 흐르지 못합니다. 녹여서 움직이세요.",
    },

    when_balanced: {
      percentage: "15-25%",
      trait: "지혜와 행동의 균형",
      state: "시냇물처럼, 흐르되 목적지를 향해 갑니다.",
    },

    boost: {
      color: "검정, 파랑, 남색",
      direction: "북쪽 방향 활동",
      item: "물, 거울, 유리, 흐르는 것",
      action: "명상, 독서, 밤 산책",
      food: "짠맛, 수분 많은 음식",
      mantra: "나는 유연하게 흐릅니다",
    },

    suppress: {
      when: "수 광채가 너무 강할 때 (35% 이상)",
      how: "토(土) 에너지로 막기 - 루틴 만들기, 구조화",
      avoid: "과도한 고민, 우유부단, 방황",
    },

    element_story:
      "물은 바위를 뚫습니다. 힘으로가 아니라, 멈추지 않는 흐름으로. 그것이 水의 지혜입니다.",
  },
} as const

/**
 * 오행 상생(相生) - 서로 돕는 관계
 */
export const elementGeneration = {
  "木生火": {
    from: "木",
    to: "火",
    metaphor: "나무가 불을 키운다",
    meaning: "목 광채가 화 광채를 증폭시킵니다",
    advice: "목이 강하면 화를 활용하세요 (창의력 → 표현력)",
  },
  "火生土": {
    from: "火",
    to: "土",
    metaphor: "불이 재가 되어 흙이 된다",
    meaning: "화 광채가 토 광채를 만듭니다",
    advice: "화가 강하면 토로 안정시키세요 (열정 → 축적)",
  },
  "土生金": {
    from: "土",
    to: "金",
    metaphor: "땅속에서 금속이 나온다",
    meaning: "토 광채가 금 광채를 낳습니다",
    advice: "토가 강하면 금으로 결과를 내세요 (기반 → 결실)",
  },
  "金生水": {
    from: "金",
    to: "水",
    metaphor: "금속 표면에 이슬이 맺힌다",
    meaning: "금 광채가 수 광채를 만듭니다",
    advice: "금이 강하면 수로 지혜를 더하세요 (결단 → 성찰)",
  },
  "水生木": {
    from: "水",
    to: "木",
    metaphor: "물이 나무를 키운다",
    meaning: "수 광채가 목 광채를 증폭시킵니다",
    advice: "수가 강하면 목으로 실행하세요 (지혜 → 성장)",
  },
}

/**
 * 오행 상극(相剋) - 서로 제어하는 관계
 */
export const elementControl = {
  "木剋土": {
    from: "木",
    to: "土",
    metaphor: "나무가 흙을 뚫고 자란다",
    meaning: "목이 토를 제어합니다",
    use: "토가 너무 강할 때 목으로 뚫으세요",
  },
  "土剋水": {
    from: "土",
    to: "水",
    metaphor: "흙이 물을 막는다",
    meaning: "토가 수를 제어합니다",
    use: "수가 너무 강할 때 토로 막으세요",
  },
  "水剋火": {
    from: "水",
    to: "火",
    metaphor: "물이 불을 끈다",
    meaning: "수가 화를 제어합니다",
    use: "화가 너무 강할 때 수로 식히세요",
  },
  "火剋金": {
    from: "火",
    to: "金",
    metaphor: "불이 금속을 녹인다",
    meaning: "화가 금을 제어합니다",
    use: "금이 너무 강할 때 화로 녹이세요",
  },
  "金剋木": {
    from: "金",
    to: "木",
    metaphor: "금속이 나무를 자른다",
    meaning: "금이 목을 제어합니다",
    use: "목이 너무 강할 때 금으로 가지치기하세요",
  },
}

/**
 * 강약 판단 기준
 */
export const elementStrength = {
  veryStrong: { min: 35, label: "과잉", color: "#dc2626" },
  strong: { min: 25, max: 34, label: "강함", color: "#f59e0b" },
  balanced: { min: 15, max: 24, label: "균형", color: "#10b981" },
  weak: { min: 10, max: 14, label: "약함", color: "#3b82f6" },
  veryWeak: { max: 9, label: "결핍 (행운)", color: "#8b5cf6" },
}

export type ElementKey = keyof typeof elementMetaphor
