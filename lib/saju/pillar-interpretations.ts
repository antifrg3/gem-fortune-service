/**
 * 60갑자 상세 해석 데이터베이스
 *
 * 각 일주(日柱)별 성격, 강점, 직업, 관계 스타일 등을 포함
 * 전통 사주명리학 + 현대적 해석
 */

import { PILLAR_STRENGTHS_CHALLENGES_CAREER } from "./pillar-career-overrides"

/** 기존 구조: Daily / Weekly / Style / Space / Mindset */
export interface RitualGuideV1 {
  daily: string
  weekly: string
  style: { colors: string[]; items: string[] }
  space: string
  mindset: string
}

/** 새 구조: vibe / space / item / mantra (각각 title, titleKo, description 또는 quote) */
export interface RitualGuideV2 {
  vibe: { title: string; titleKo: string; description: string }
  space: { title: string; titleKo: string; description: string }
  item: { title: string; titleKo: string; description: string }
  style: { colors: string[]; items: string[] }
  mantra: { title: string; titleKo: string; quote: string }
}

export type RitualGuide = RitualGuideV1 | RitualGuideV2

export interface PillarInterpretation {
  title: string
  archetype: string
  persona?: {
    title: string
    subtitle: string
    essence: string
    vibe: string[]
  }
  ritual?: RitualGuide
  element: string
  description: string
  personality: Array<{
    trait: string
    icon: string
    description: string
  }>
  strengths: string[]
  challenges: string[]
  career: {
    best: string[]
    avoid: string[]
  }
  relationship: {
    style: string
    compatibility: {
      best: string[]
      good: string[]
      challenging: string[]
    }
  }
  luckyElements: {
    colors: string[]
    numbers: number[]
    directions: string[]
  }
}

/** 일주 해석 데이터 (getDayPillarInterpretation 반환 타입) */
export type DayPillarData = PillarInterpretation

export const PILLAR_INTERPRETATIONS: Record<string, PillarInterpretation> = {

  // ============================================================
  // 甲 (양목) - 큰 나무, 개척자
  // ============================================================

  '甲子': {
    title: '바다 위의 나무',
    archetype: 'The Floating Pioneer',
    persona: {
    
          title: 'The Seed of Wisdom',
          subtitle: '지혜의 씨앗을 품은 선구자',
          essence: '당신은 어둠 속에서도 싹을 틀 준비가 된 씨앗입니다. 깊은 통찰력과 강한 생명력으로 어떤 환경에서도 새로운 시작을 만들어냅니다.',
          vibe: ['🌱 Potential', '💧 Wise', '🌟 Pioneering', '🔮 Intuitive']
    },
    ritual: {
      vibe: {
        title: 'Deep Potential',
        titleKo: '고요한 잠재력',
        description: '어둠 속에서 뿌리를 내리는 생명력. 사색의 시간에서 당신의 가장 강력한 비전이 설계됩니다.'
      },
      space: {
        title: 'Dark Sanctuary',
        titleKo: '심연의 성소',
        description: '차분한 조도와 아날로그적 질감이 살아있는 공간. 깊은 사고를 방해하지 않는 정적인 환경이 필요합니다.'
      },
      item: {
        title: 'Wisdom Keeper',
        titleKo: '지혜의 기록자',
        description: '무거운 질감의 만년필이나 가죽 저널. 생각을 시각화하는 도구가 당신의 신뢰감을 완성합니다.'
      },
      style: {
        colors: ['검은색', '남색', '초록색'],
        items: ['Leather Journal', 'Fountain Pen', 'Natural Wood']
      },
      mantra: {
        title: 'Silence Speaks',
        titleKo: '침묵의 힘',
        quote: '가장 깊은 통찰은 가장 조용한 순간에 싹을 틔운다.'
      }
    },
    element: 'wood',
    description: '당신은 어둠 속에서도 싹을 틀 준비가 된 씨앗입니다. 깊은 통찰력과 강한 생명력으로 어떤 환경에서도 새로운 시작을 만들어냅니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 어둠 속에서도 싹을 틀 준비가 된 씨앗입니다. 깊은 통찰력과 강한 생명력으로 어떤 환경에서도 새로운 시작을 만들어냅니다…"
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['초록색', '갈색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '甲寅': {
    title: '산림의 큰 나무',
    archetype: 'The Mountain Pioneer',
    persona: {
    
          title: 'The Forest Pioneer',
          subtitle: '새벽 숲을 가장 먼저 걷는 개척자',
          essence: '당신은 산림의 큰 나무처럼 강하고 당당합니다. 두려움 없이 새로운 길을 개척하고, 주변에 생명력을 불어넣는 타고난 리더입니다.',
          vibe: ['🌲 Strong', '🚀 Bold', '👑 Leader', '⚡ Dynamic']
    },
    ritual: {
      vibe: {
        title: 'Towering Leader',
        titleKo: '거목의 카리스마',
        description: '스스로 우뚝 서는 강인함. 타협하지 않는 원칙이 당신의 본질적인 매력입니다.'
      },
      space: {
        title: 'Open Frontier',
        titleKo: '탁 트인 개척지',
        description: '높은 층고와 나무 소재가 어우러진 공간. 시야를 가리지 않는 배치에서 거침없는 에너지가 나옵니다.'
      },
      item: {
        title: 'Solid Wood',
        titleKo: '견고한 원목',
        description: '내추럴한 원목 가구 혹은 묵직한 시계. 변치 않는 가치를 지닌 아이템이 당신의 권위를 뒷받침합니다.'
      },
      style: {
        colors: ['검은색', '남색', '초록색'],
        items: ['Leather Journal', 'Fountain Pen', 'Natural Wood']
      },
      mantra: {
        title: 'Stand Tall',
        titleKo: '독보적 존재감',
        quote: '진정한 리더는 스스로 숲이 되어 타인을 품는다.'
      }
    },
    element: 'wood',
    description: '당신은 산림의 큰 나무처럼 강하고 당당합니다. 두려움 없이 새로운 길을 개척하고, 주변에 생명력을 불어넣는 타고난 리더입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 산림의 큰 나무처럼 강하고 당당합니다. 두려움 없이 새로운 길을 개척하고, 주변에 생명력을 불어넣는 타고난 리더입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['초록색', '갈색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '甲辰': {
    title: '들판의 큰 나무',
    archetype: 'The Grounded Leader',
    persona: {
    
          title: 'The Rooted Visionary',
          subtitle: '땅에 뿌리내린 비전가',
          essence: '당신은 큰 나무가 땅에 깊이 뿌리내린 것처럼 안정적이면서도 하늘을 향해 성장합니다. 현실과 이상의 완벽한 균형을 이루는 사람입니다.',
          vibe: ['🌳 Grounded', '🎯 Visionary', '⚖️ Balanced', '📈 Growing']
    },
    ritual: {
      vibe: {
        title: 'Fertile Visionary',
        titleKo: '풍요로운 전략가',
        description: '변화를 두려워하지 않는 대범함. 현실적인 감각과 높은 이상을 동시에 실현하는 힘을 가졌습니다.'
      },
      space: {
        title: 'Eco-System',
        titleKo: '에코 시스템',
        description: '식물과 자연광이 조화로운 공간. 생명력이 느껴지는 환경이 당신의 창의성을 자극합니다.'
      },
      item: {
        title: 'Organic Texture',
        titleKo: '오가닉 텍스처',
        description: '자연스러운 질감의 린넨 소재나 테라코타 오브제. 따뜻하고 포용력 있는 이미지를 연출하세요.'
      },
      style: {
        colors: ['검은색', '남색', '초록색'],
        items: ['Leather Journal', 'Fountain Pen', 'Natural Wood']
      },
      mantra: {
        title: 'Roots to Sky',
        titleKo: '비상의 뿌리',
        quote: '현실에 발을 딛고 꿈의 하늘을 향해 뻗어 나가라.'
      }
    },
    element: 'wood',
    description: '당신은 큰 나무가 땅에 깊이 뿌리내린 것처럼 안정적이면서도 하늘을 향해 성장합니다. 현실과 이상의 완벽한 균형을 이루는 사람입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 큰 나무가 땅에 깊이 뿌리내린 것처럼 안정적이면서도 하늘을 향해 성장합니다. 현실과 이상의 완벽한 균형을 이루는 사람입…"
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['초록색', '갈색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '甲午': {
    title: '햇빛 받는 나무',
    archetype: 'The Radiant Achiever',
    persona: {
    
          title: 'The Blazing Trailblazer',
          subtitle: '타오르는 불길처럼 길을 여는 자',
          essence: '당신은 햇빛을 받아 활활 타오르는 나무입니다. 열정적이고 창의적이며, 새로운 아이디어로 세상을 밝히는 혁신가입니다.',
          vibe: ['🔥 Passionate', '💡 Creative', '🌟 Innovative', '⚡ Energetic']
    },
    ritual: {
      vibe: {
        title: 'Blazing Pioneer',
        titleKo: '화려한 선구자',
        description: '멈추지 않는 열정과 추진력. 당신의 에너지는 주변을 밝히고 변화를 이끄는 불꽃과 같습니다.'
      },
      space: {
        title: 'Active Studio',
        titleKo: '액티브 스튜디오',
        description: '화려한 조명과 생동감 넘치는 컬러가 있는 공간. 당신의 열정이 머무르지 않고 순환되게 하세요.'
      },
      item: {
        title: 'Bold Accessory',
        titleKo: '대담한 포인트',
        description: '시선을 끄는 과감한 디자인의 액세서리나 아트 피스. 당신의 독창성을 시각적으로 선언하세요.'
      },
      style: {
        colors: ['검은색', '남색', '초록색'],
        items: ['Leather Journal', 'Fountain Pen', 'Natural Wood']
      },
      mantra: {
        title: 'Run Wild',
        titleKo: '거침없는 질주',
        quote: '망설임은 열정의 적이다. 당신의 불꽃을 온 세상에 퍼뜨려라.'
      }
    },
    element: 'wood',
    description: '당신은 햇빛을 받아 활활 타오르는 나무입니다. 열정적이고 창의적이며, 새로운 아이디어로 세상을 밝히는 혁신가입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 햇빛을 받아 활활 타오르는 나무입니다. 열정적이고 창의적이며, 새로운 아이디어로 세상을 밝히는 혁신가입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['초록색', '갈색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '甲申': {
    title: '정원의 나무',
    archetype: 'The Refined Creator',
    persona: {
    
          title: 'The Refined Creator',
          subtitle: '정원의 나무처럼 세련된 창조자',
          essence: '당신은 정성스럽게 가꾼 정원의 나무입니다. 완벽함을 추구하며, 아름다움과 질서 속에서 창의성을 발휘하는 예술가입니다.',
          vibe: ['💎 Refined', '🎨 Artistic', '✨ Elegant', '🏛️ Cultured']
    },
    ritual: {
      vibe: {
        title: 'Sharp Architect',
        titleKo: '날카로운 설계자',
        description: '강인함 속에 숨겨진 치밀한 지성. 불필요한 것을 쳐내고 핵심을 꿰뚫는 통찰력을 발휘하세요.'
      },
      space: {
        title: 'Structured Lab',
        titleKo: '구조적 연구소',
        description: '금속 소재와 직선적 디자인이 강조된 공간. 정돈된 환경이 당신의 판단력을 날카롭게 유지합니다.'
      },
      item: {
        title: 'Precision Tool',
        titleKo: '정밀한 도구',
        description: '메탈 프레임의 안경이나 정교한 디지털 기기. 스마트하고 전문적인 무드를 완성합니다.'
      },
      style: {
        colors: ['검은색', '남색', '초록색'],
        items: ['Leather Journal', 'Fountain Pen', 'Natural Wood']
      },
      mantra: {
        title: 'Cut Through',
        titleKo: '핵심의 돌파',
        quote: '가장 간결한 것이 가장 강력한 힘을 발휘한다.'
      }
    },
    element: 'wood',
    description: '당신은 정성스럽게 가꾼 정원의 나무입니다. 완벽함을 추구하며, 아름다움과 질서 속에서 창의성을 발휘하는 예술가입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 정성스럽게 가꾼 정원의 나무입니다. 완벽함을 추구하며, 아름다움과 질서 속에서 창의성을 발휘하는 예술가입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['초록색', '갈색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '甲戌': {
    title: '언덕의 나무',
    archetype: 'The Loyal Guardian',
    persona: {
    
          title: 'The Mountain Guardian',
          subtitle: '산을 지키는 고요한 수호자',
          essence: '당신은 산 위에 우뚝 선 나무처럼 든든하고 신뢰할 수 있습니다. 충성스럽고 책임감 있게 자신의 영역을 지키는 수호자입니다.',
          vibe: ['🏔️ Steadfast', '🛡️ Protective', '💪 Reliable', '🌲 Noble']
    },
    ritual: {
    
          vibe: {
            title: 'Noble Guardian',
            titleKo: '고결한 수호자',
            description: '외로움을 견디며 원칙을 지키는 숭고함. 변치 않는 신의가 당신을 가장 가치 있게 만듭니다.'
          },
          space: {
            title: 'Stone Gallery',
            titleKo: '대지의 갤러리',
            description: '석재 소재와 뉴트럴 톤의 차분한 공간. 무게감 있는 분위기가 당신의 내면을 보호합니다.'
          },
          item: {
            title: 'Timeless Classic',
            titleKo: '클래식의 정점',
            description: '유행을 타지 않는 빈티지 아이템이나 클래식한 구두. 깊이 있는 우아함을 드러내세요.'
          },
          style: {
            colors: ['초록색', '갈색', '베이지'],
            items: ['Vintage Leather', 'Classic Watch', 'Family Heirloom']
          },
          mantra: {
            title: 'Stay Faithful',
            titleKo: '신의의 가치',
            quote: '세상이 변해도 나만의 진실은 변하지 않는다.'
          }
    },
    element: 'wood',
    description: '당신은 산 위에 우뚝 선 나무처럼 든든하고 신뢰할 수 있습니다. 충성스럽고 책임감 있게 자신의 영역을 지키는 수호자입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 산 위에 우뚝 선 나무처럼 든든하고 신뢰할 수 있습니다. 충성스럽고 책임감 있게 자신의 영역을 지키는 수호자입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['초록색', '갈색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  // ============================================================
  // 乙 (음목) - 작은 나무, 유연한 풀
  // ============================================================

  '乙丑': {
    title: '정원의 화초',
    archetype: 'The Nurturing Cultivator',
    persona: {
    
          title: 'The Patient Cultivator',
          subtitle: '인내심으로 정원을 가꾸는 자',
          essence: '당신은 비옥한 땅에서 자라는 풀입니다. 조용히 그러나 꾸준히 성장하며, 시간을 들여 아름다운 결실을 맺는 인내심의 소유자입니다.',
          vibe: ['🌿 Patient', '🌱 Nurturing', '⏳ Persistent', '💚 Gentle']
    },
    ritual: {
      vibe: {
        title: 'Resilient Bloom',
        titleKo: '인내의 꽃',
        description: '얼어붙은 땅에서도 꽃을 피우는 강인한 유연함. 당신의 인내는 반드시 결실을 봅니다.'
      },
      space: {
        title: 'Cozy Shelter',
        titleKo: '아늑한 피난처',
        description: '따뜻한 패브릭과 부드러운 조명. 몸과 마음을 보호할 수 있는 안전한 보금자리가 중요합니다.'
      },
      item: {
        title: 'Soft Wrap',
        titleKo: '부드러운 감각',
        description: '캐시미어 머플러나 부드러운 가디건. 포근한 이미지가 당신의 매력을 극대화합니다.'
      },
      style: {
        colors: ['연두색', '베이지', '크림'],
        items: ['Soft Fabric', 'Natural Cotton', 'Handmade']
      },
      mantra: {
        title: 'Wait for Spring',
        titleKo: '봄을 기다리는 지혜',
        quote: '겨울을 견딘 생명만이 가장 아름다운 꽃을 피운다.'
      }
    },
    element: 'wood',
    description: '당신은 비옥한 땅에서 자라는 풀입니다. 조용히 그러나 꾸준히 성장하며, 시간을 들여 아름다운 결실을 맺는 인내심의 소유자입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 비옥한 땅에서 자라는 풀입니다. 조용히 그러나 꾸준히 성장하며, 시간을 들여 아름다운 결실을 맺는 인내심의 소유자입니다…"
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['연두색', '베이지'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '乙卯': {
    title: '봄날의 풀잎',
    archetype: 'The Gentle Diplomat',
    persona: {
    
          title: 'The Spring Whisperer',
          subtitle: '봄날의 속삭임을 전하는 자',
          essence: '당신은 봄날의 풀처럼 부드럽고 생명력이 넘칩니다. 조화와 성장을 추구하며, 주변을 평화롭게 만드는 힐링의 존재입니다.',
          vibe: ['🌸 Gentle', '🌱 Harmonious', '🎵 Peaceful', '✨ Healing']
    },
    ritual: {
      vibe: {
        title: 'Pure Vitality',
        titleKo: '순수한 생명력',
        description: '끊임없이 솟아나는 아이디어와 호기심. 당신의 유연함은 어떤 장벽도 타고 넘는 힘이 있습니다.'
      },
      space: {
        title: 'Green Terrace',
        titleKo: '초록의 테라스',
        description: '다양한 식물과 곡선 가구가 배치된 공간. 생동감 넘치는 환경이 당신의 감각을 깨웁니다.'
      },
      item: {
        title: 'Artistic Detail',
        titleKo: '예술적 섬세함',
        description: '화려한 패턴의 소품이나 핸드메이드 주얼리. 당신의 섬세한 취향을 적극적으로 드러내세요.'
      },
      style: {
        colors: ['연두색', '분홍색', '라벤더'],
        items: ['Floral Pattern', 'Soft Textile', 'Natural Fiber']
      },
      mantra: {
        title: 'Climb Higher',
        titleKo: '유연한 도약',
        quote: '막히면 돌아가고, 좁으면 스며들어 결국 정상에 닿으라.'
      }
    },
    element: 'wood',
    description: '당신은 봄날의 풀처럼 부드럽고 생명력이 넘칩니다. 조화와 성장을 추구하며, 주변을 평화롭게 만드는 힐링의 존재입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 봄날의 풀처럼 부드럽고 생명력이 넘칩니다. 조화와 성장을 추구하며, 주변을 평화롭게 만드는 힐링의 존재입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['연두색', '베이지'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '乙巳': {
    title: '햇빛 받는 덩굴',
    archetype: 'The Passionate Climber',
    persona: {
    
          title: 'The Phoenix Bloom',
          subtitle: '불 속에서 피어나는 꽃',
          essence: '당신은 불길 속에서도 아름답게 피어나는 꽃입니다. 열정과 섬세함을 겸비하여, 역경 속에서도 우아함을 잃지 않는 강인한 영혼입니다.',
          vibe: ['🔥 Passionate', '🌺 Graceful', '💪 Resilient', '✨ Elegant']
    },
    ritual: {
      vibe: {
        title: 'Pure Vitality',
        titleKo: '순수한 생명력',
        description: '끊임없이 솟아나는 아이디어와 호기심. 당신의 유연함은 어떤 장벽도 타고 넘는 힘이 있습니다.'
      },
      space: {
        title: 'Green Terrace',
        titleKo: '초록의 테라스',
        description: '다양한 식물과 곡선 가구가 배치된 공간. 생동감 넘치는 환경이 당신의 감각을 깨웁니다.'
      },
      item: {
        title: 'Artistic Detail',
        titleKo: '예술적 섬세함',
        description: '화려한 패턴의 소품이나 핸드메이드 주얼리. 당신의 섬세한 취향을 적극적으로 드러내세요.'
      },
      style: {
        colors: ['연두색', '베이지', '크림'],
        items: ['Soft Fabric', 'Natural Cotton', 'Handmade']
      },
      mantra: {
        title: 'Climb Higher',
        titleKo: '유연한 도약',
        quote: '막히면 돌아가고, 좁으면 스며들어 결국 정상에 닿으라.'
      }
    },
    element: 'wood',
    description: '당신은 불길 속에서도 아름답게 피어나는 꽃입니다. 열정과 섬세함을 겸비하여, 역경 속에서도 우아함을 잃지 않는 강인한 영혼입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 불길 속에서도 아름답게 피어나는 꽃입니다. 열정과 섬세함을 겸비하여, 역경 속에서도 우아함을 잃지 않는 강인한 영혼입니…"
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['연두색', '베이지'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '乙未': {
    title: '여름 정원의 꽃',
    archetype: 'The Gentle Nurturer',
    persona: {
    
          title: 'The Garden Healer',
          subtitle: '정원에서 치유를 나누는 자',
          essence: '당신은 정원의 허브처럼 치유의 힘을 가지고 있습니다. 타인을 돌보고 위로하며, 평화로운 환경을 만드는 천성적인 힐러입니다.',
          vibe: ['💚 Nurturing', '🌿 Healing', '☮️ Peaceful', '💝 Caring']
    },
    ritual: {
      vibe: {
        title: 'Elegant Serpent',
        titleKo: '우아한 화술가',
        description: '사람의 마음을 매료시키는 화려함과 지혜. 당신의 표현력은 세상을 움직이는 무기입니다.'
      },
      space: {
        title: 'Design Boutique',
        titleKo: '디자인 부티크',
        description: '세련된 감각과 트렌디한 소품이 있는 공간. 감각적인 인테리어가 당신의 사교성을 돕습니다.'
      },
      item: {
        title: 'Shining Silk',
        titleKo: '빛나는 실크',
        description: '광택감이 있는 소재나 세련된 향수. 당신의 아우라를 한층 더 돋보이게 만듭니다.'
      },
      style: {
        colors: ['연두색', '베이지', '크림'],
        items: ['Soft Fabric', 'Natural Cotton', 'Handmade']
      },
      mantra: {
        title: 'Captivate All',
        titleKo: '매혹의 기술',
        quote: '진정한 아름다움은 사람의 영혼을 먼저 매료시킨다.'
      }
    },
    element: 'wood',
    description: '당신은 정원의 허브처럼 치유의 힘을 가지고 있습니다. 타인을 돌보고 위로하며, 평화로운 환경을 만드는 천성적인 힐러입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 정원의 허브처럼 치유의 힘을 가지고 있습니다. 타인을 돌보고 위로하며, 평화로운 환경을 만드는 천성적인 힐러입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['연두색', '베이지'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '乙酉': {
    title: '정원의 분재',
    archetype: 'The Refined Perfectionist',
    persona: {
    
          title: 'The Refined Aesthete',
          subtitle: '세련된 미학을 추구하는 자',
          essence: '당신은 꽃꽂이처럼 완벽하게 조화를 이룬 예술작품입니다. 섬세한 감각으로 아름다움을 창조하며, 모든 것을 우아하게 다듬는 큐레이터입니다.',
          vibe: ['🎨 Aesthetic', '💎 Refined', '✨ Elegant', '🌸 Delicate']
    },
    ritual: {
      vibe: {
        title: 'Steady Root',
        titleKo: '단단한 내실',
        description: '부드러워 보이지만 내면은 누구보다 단단한 외유내강. 당신의 성실함이 신뢰의 근간입니다.'
      },
      space: {
        title: 'Zen Garden',
        titleKo: '명상의 정원',
        description: '동양적인 미니멀리즘과 흙의 따뜻함이 있는 공간. 정적인 환경이 당신의 에너지를 보호합니다.'
      },
      item: {
        title: 'Earthly Tone',
        titleKo: '대지의 색채',
        description: '베이지나 브라운 톤의 아이템. 편안하고 안정적인 느낌이 당신의 전문성을 높여줍니다.'
      },
      style: {
        colors: ['연두색', '베이지', '크림'],
        items: ['Soft Fabric', 'Natural Cotton', 'Handmade']
      },
      mantra: {
        title: 'Inner Strength',
        titleKo: '내면의 단단함',
        quote: '부드러움이 강함을 이기는 법을 당신은 이미 알고 있다.'
      }
    },
    element: 'wood',
    description: '당신은 꽃꽂이처럼 완벽하게 조화를 이룬 예술작품입니다. 섬세한 감각으로 아름다움을 창조하며, 모든 것을 우아하게 다듬는 큐레이터입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 꽃꽂이처럼 완벽하게 조화를 이룬 예술작품입니다. 섬세한 감각으로 아름다움을 창조하며, 모든 것을 우아하게 다듬는 큐레이…"
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['연두색', '베이지'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '乙亥': {
    title: '연못의 수초',
    archetype: 'The Intuitive Empath',
    persona: {
    
          title: 'The Water Lily Dreamer',
          subtitle: '물 위에 핀 연꽃의 꿈',
          essence: '당신은 물 위에 떠 있는 수련처럼 깊은 감성을 품고 있습니다. 풍부한 상상력과 직관으로 보이지 않는 세계를 감지하는 몽상가입니다.',
          vibe: ['💧 Intuitive', '🌸 Dreamy', '🔮 Mystical', '🎨 Creative']
    },
    ritual: {
      vibe: {
        title: 'Jade Blade',
        titleKo: '옥으로 만든 칼',
        description: '부드러운 외면 속에 감춰진 날카로운 분석력. 섬세하고 정교한 완벽주의를 추구하세요.'
      },
      space: {
        title: 'Minimal Atelier',
        titleKo: '미니멀 아틀리에',
        description: '깨끗하고 정돈된 화이트 톤의 공간. 흐트러짐 없는 환경에서 당신의 감각이 예리해집니다.'
      },
      item: {
        title: 'Silver Ornament',
        titleKo: '은빛 장식',
        description: '심플한 실버 주얼리나 만년필. 정교하고 깔끔한 아이템이 당신의 기질과 어울립니다.'
      },
      style: {
        colors: ['연두색', '베이지', '크림'],
        items: ['Soft Fabric', 'Natural Cotton', 'Handmade']
      },
      mantra: {
        title: 'Sharp Grace',
        titleKo: '날카로운 우아함',
        quote: '정교함은 타협하지 않는 섬세함에서 시작된다.'
      }
    },
    element: 'wood',
    description: '당신은 물 위에 떠 있는 수련처럼 깊은 감성을 품고 있습니다. 풍부한 상상력과 직관으로 보이지 않는 세계를 감지하는 몽상가입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 물 위에 떠 있는 수련처럼 깊은 감성을 품고 있습니다. 풍부한 상상력과 직관으로 보이지 않는 세계를 감지하는 몽상가입니…"
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['연두색', '베이지'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  // ============================================================
  // 丙 (양화) - 태양, 열정
  // ============================================================

  '丙子': {
    title: '겨울 햇살',
    archetype: 'The Warming Light',
    persona: {
    
          title: 'The Winter Sunrise',
          subtitle: '겨울 아침을 밝히는 따뜻한 빛',
          essence: '당신은 겨울날 아침 해처럼 차가운 세상에 온기를 전합니다. 어둠 속에서도 희망을 잃지 않고, 주변에 따뜻함을 나누는 빛의 전령입니다.',
          vibe: ['☀️ Warming', '💫 Hopeful', '💝 Compassionate', '🌅 Inspiring']
    },
    ritual: {
      vibe: {
        title: 'Flowing Lotus',
        titleKo: '물 위의 연꽃',
        description: '혼탁한 세상 속에서도 순수함을 잃지 않는 지혜. 당신의 영감은 맑은 물처럼 흐를 때 빛납니다.'
      },
      space: {
        title: 'Aqua Retreat',
        titleKo: '물의 안식처',
        description: '투명한 유리 소재와 푸른 포인트가 있는 공간. 물 흐르는 소리나 향초가 당신을 편안하게 합니다.'
      },
      item: {
        title: 'Fluid Fabric',
        titleKo: '흐르는 소재',
        description: '부드럽게 떨어지는 셔츠나 실크 소재. 여유롭고 지적인 이미지를 연출하세요.'
      },
      style: {
        colors: ['연두색', '베이지', '크림'],
        items: ['Soft Fabric', 'Natural Cotton', 'Handmade']
      },
      mantra: {
        title: 'Pure Flow',
        titleKo: '순수한 흐름',
        quote: '강물은 다투지 않고도 결국 바다에 닿는다.'
      }
    },
    element: 'fire',
    description: '당신은 겨울날 아침 해처럼 차가운 세상에 온기를 전합니다. 어둠 속에서도 희망을 잃지 않고, 주변에 따뜻함을 나누는 빛의 전령입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 겨울날 아침 해처럼 차가운 세상에 온기를 전합니다. 어둠 속에서도 희망을 잃지 않고, 주변에 따뜻함을 나누는 빛의 전령…"
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['빨간색', '황금색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '丙寅': {
    title: '새벽의 태양',
    archetype: 'The Rising Pioneer',
    persona: {
    
          title: 'The Dawn Catalyst',
          subtitle: '새벽을 깨우는 촉매제',
          essence: '당신은 새벽의 태양처럼 새로운 시작을 알립니다. 끝없는 열정으로 변화를 만들고, 주변을 고무시키는 타고난 리더입니다.',
          vibe: ['🌄 Pioneering', '🔥 Passionate', '⚡ Energizing', '🚀 Dynamic']
    },
    ritual: {
      vibe: {
        title: 'Winter Sun',
        titleKo: '겨울의 태양',
        description: '어두운 곳을 비추는 희망의 빛. 당신의 따뜻한 리더십은 사람들의 마음을 움직입니다.'
      },
      space: {
        title: 'Contrast Lounge',
        titleKo: '대비의 라운지',
        description: '다크한 배경에 포인트 조명이 있는 공간. 당신의 빛이 더욱 돋보이는 환경을 조성하세요.'
      },
      item: {
        title: 'Glowing Watch',
        titleKo: '빛나는 시계',
        description: '세련된 메탈 시계나 조명 기구. 당신의 존재감을 은은하게 드러내세요.'
      },
      style: {
        colors: ['빨간색', '황금색', '오렌지'],
        items: ['Solar Item', 'Bright Accent', 'Energy Piece']
      },
      mantra: {
        title: 'Light in Dark',
        titleKo: '어둠 속의 빛',
        quote: '가장 추운 곳에서도 당신의 온기는 생명을 깨운다.'
      }
    },
    element: 'fire',
    description: '당신은 새벽의 태양처럼 새로운 시작을 알립니다. 끝없는 열정으로 변화를 만들고, 주변을 고무시키는 타고난 리더입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 새벽의 태양처럼 새로운 시작을 알립니다. 끝없는 열정으로 변화를 만들고, 주변을 고무시키는 타고난 리더입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['빨간색', '황금색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '丙辰': {
    title: '아침의 햇빛',
    archetype: 'The Steady Illuminator',
    persona: {
    
          title: 'The Steady Flame',
          subtitle: '꺼지지 않는 안정된 불꽃',
          essence: '당신은 아침 햇살처럼 안정적이면서도 밝은 에너지를 줍니다. 열정과 현실감각을 균형있게 유지하며, 지속 가능한 변화를 만드는 실행가입니다.',
          vibe: ['🔥 Steady', '⚖️ Balanced', '🏛️ Reliable', '📈 Sustainable']
    },
    ritual: {
      vibe: {
        title: 'Morning Sunrise',
        titleKo: '새벽의 일출',
        description: '새로운 시작을 알리는 폭발적인 에너지. 당신의 시작은 늘 세상의 주목을 받습니다.'
      },
      space: {
        title: 'Bright Office',
        titleKo: '밝은 집무실',
        description: '전면 유리창과 채광이 좋은 공간. 아침 햇살이 가득한 환경이 당신의 열정을 깨웁니다.'
      },
      item: {
        title: 'Solar Power',
        titleKo: '태양의 도구',
        description: '오렌지나 레드 계열의 소품. 열정적인 시작을 상징하는 역동적인 아이템이 좋습니다.'
      },
      style: {
        colors: ['빨간색', '황금색', '오렌지'],
        items: ['Solar Item', 'Bright Accent', 'Energy Piece']
      },
      mantra: {
        title: 'Begin Again',
        titleKo: '도전의 서막',
        quote: '태양은 매일 뜨겁게 타오르며 새로운 기회를 선사한다.'
      }
    },
    element: 'fire',
    description: '당신은 아침 햇살처럼 안정적이면서도 밝은 에너지를 줍니다. 열정과 현실감각을 균형있게 유지하며, 지속 가능한 변화를 만드는 실행가입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 아침 햇살처럼 안정적이면서도 밝은 에너지를 줍니다. 열정과 현실감각을 균형있게 유지하며, 지속 가능한 변화를 만드는 실…"
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['빨간색', '황금색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '丙午': {
    title: '한낮의 태양',
    archetype: 'The Radiant Leader',
    persona: {
    
          title: 'The Radiant Sovereign',
          subtitle: '한낮 태양처럼 빛나는 군주',
          essence: '당신은 정오의 태양처럼 가장 강렬하게 빛납니다. 타고난 카리스마와 솔직함으로 사람들을 자연스럽게 이끄는 왕의 기질을 가졌습니다.',
          vibe: ['☀️ Radiant', '👑 Regal', '💯 Authentic', '⚡ Powerful']
    },
    ritual: {
      vibe: {
        title: 'Cloudy Sun',
        titleKo: '구름 속의 태양',
        description: '자비롭고 포용력 있는 지도자. 적절한 조절을 통해 타인을 빛나게 돕는 지혜가 있습니다.'
      },
      space: {
        title: 'Comfort Zone',
        titleKo: '안락한 구역',
        description: '부드러운 조명과 넓은 소파가 있는 공간. 사람들이 편하게 모일 수 있는 포용적 환경을 만드세요.'
      },
      item: {
        title: 'Warm Pottery',
        titleKo: '따뜻한 도기',
        description: '핸드메이드 도자기나 차 도구. 차분하고 포근한 이미지가 당신의 신뢰감을 높입니다.'
      },
      style: {
        colors: ['빨간색', '황금색', '오렌지'],
        items: ['Solar Item', 'Bright Accent', 'Energy Piece']
      },
      mantra: {
        title: 'Gentle Warmth',
        titleKo: '부드러운 온기',
        quote: '진정한 강함은 부드럽게 감싸 안는 온기에 있다.'
      }
    },
    element: 'fire',
    description: '당신은 정오의 태양처럼 가장 강렬하게 빛납니다. 타고난 카리스마와 솔직함으로 사람들을 자연스럽게 이끄는 왕의 기질을 가졌습니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 정오의 태양처럼 가장 강렬하게 빛납니다. 타고난 카리스마와 솔직함으로 사람들을 자연스럽게 이끄는 왕의 기질을 가졌습니다…"
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['빨간색', '황금색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '丙申': {
    title: '석양의 빛',
    archetype: 'The Refined Visionary',
    persona: {
    
          title: 'The Gilded Visionary',
          subtitle: '황금빛 석양의 비전가',
          essence: '당신은 석양처럼 화려하면서도 세련됩니다. 열정과 이성, 창의성과 규율을 조화롭게 결합하여 완성도 높은 걸작을 만드는 예술가입니다.',
          vibe: ['🌆 Refined', '💡 Visionary', '💎 Elegant', '🎨 Artistic']
    },
    ritual: {
      vibe: {
        title: 'Noon Zenith',
        titleKo: '한낮의 정점',
        description: '가장 뜨겁고 화려한 존재감. 당신의 자신감은 세상을 압도하는 가장 큰 힘입니다.'
      },
      space: {
        title: 'Golden Studio',
        titleKo: '황금빛 스튜디오',
        description: '화려하고 세련된 인테리어. 당신의 명예와 자부심을 고취할 수 있는 공간이 필요합니다.'
      },
      item: {
        title: 'Bold Statement',
        titleKo: '대담한 선언',
        description: '화려한 골드 액세서리나 명품 시계. 당신의 성공과 열정을 시각적으로 드러내세요.'
      },
      style: {
        colors: ['빨간색', '황금색', '오렌지'],
        items: ['Solar Item', 'Bright Accent', 'Energy Piece']
      },
      mantra: {
        title: 'Shine On',
        titleKo: '최고의 광채',
        quote: '가장 높은 곳에서 가장 뜨겁게 당신의 시대를 열라.'
      }
    },
    element: 'fire',
    description: '당신은 석양처럼 화려하면서도 세련됩니다. 열정과 이성, 창의성과 규율을 조화롭게 결합하여 완성도 높은 걸작을 만드는 예술가입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 석양처럼 화려하면서도 세련됩니다. 열정과 이성, 창의성과 규율을 조화롭게 결합하여 완성도 높은 걸작을 만드는 예술가입니…"
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['빨간색', '황금색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '丙戌': {
    title: '모닥불',
    archetype: 'The Loyal Guardian',
    persona: {
    
          title: 'The Hearthkeeper',
          subtitle: '따뜻한 화로를 지키는 자',
          essence: '당신은 모닥불처럼 주변을 따뜻하게 밝힙니다. 충성스럽고 책임감 있게 공동체를 보호하며, 사람들에게 안정감을 주는 수호자입니다.',
          vibe: ['🔥 Warm', '🛡️ Protective', '💝 Loyal', '🏡 Nurturing']
    },
    ritual: {
    
          vibe: {
            title: 'Resting Ember',
            titleKo: '휴식하는 불꽃',
            description: '내면에 뜨거운 열정을 간직한 현자. 겉으로는 차분하지만 결정적 순간에 폭발적인 힘을 냅니다.'
          },
          space: {
            title: 'Private Library',
            titleKo: '비밀 서재',
            description: '책이 가득한 따뜻한 서재 공간. 내면의 에너지를 축적할 수 있는 정적인 장소가 필수입니다.'
          },
          item: {
            title: 'Classic Frame',
            titleKo: '클래식 프레임',
            description: '두꺼운 뿔테 안경이나 묵직한 책장. 지적인 무게감이 당신의 권위를 더해줍니다.'
          },
          style: {
            colors: ['빨간색', '갈색', '베이지'],
            items: ['Heritage Piece', 'Community Symbol', 'Warm Material']
          },
          mantra: {
            title: 'Hidden Fire',
            titleKo: '감춰진 불꽃',
            quote: '보이지 않는 곳에서 타오르는 열정이 진정으로 오래간다.'
          }
    },
    element: 'fire',
    description: '당신은 모닥불처럼 주변을 따뜻하게 밝힙니다. 충성스럽고 책임감 있게 공동체를 보호하며, 사람들에게 안정감을 주는 수호자입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 모닥불처럼 주변을 따뜻하게 밝힙니다. 충성스럽고 책임감 있게 공동체를 보호하며, 사람들에게 안정감을 주는 수호자입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['빨간색', '황금색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  // ============================================================
  // 丁 (음화) - 등불, 따뜻함
  // ============================================================

  '丁丑': {
    title: '촛불',
    archetype: 'The Gentle Guide',
    persona: {
    
          title: 'The Candlelight Poet',
          subtitle: '촛불처럼 은은한 시인',
          essence: '당신은 촛불처럼 조용하지만 따뜻한 빛을 발합니다. 섬세한 감성과 예술적 재능으로 세상에 아름다움을 더하는 낭만주의자입니다.',
          vibe: ['🕯️ Gentle', '🎨 Artistic', '💝 Tender', '✨ Romantic']
    },
    ritual: {
      vibe: {
        title: 'Autumn Sunset',
        titleKo: '가을의 노을',
        description: '결실을 맺는 화려한 마무리. 감각적이고 세련된 방식으로 성과를 만들어내는 재능이 있습니다.'
      },
      space: {
        title: 'Modern Gallery',
        titleKo: '모던 갤러리',
        description: '감각적인 가구와 금속 오브제가 있는 공간. 트렌디한 환경이 당신의 분석적 창의성을 돕습니다.'
      },
      item: {
        title: 'Metallic Chic',
        titleKo: '메탈릭 시크',
        description: '실버나 화이트 골드 아이템. 세련된 도시적 무드가 당신의 전문성과 잘 맞습니다.'
      },
      style: {
        colors: ['빨간색', '황금색', '오렌지'],
        items: ['Solar Item', 'Bright Accent', 'Energy Piece']
      },
      mantra: {
        title: 'Mature Light',
        titleKo: '성숙한 빛',
        quote: '아름다운 끝맺음이 새로운 시작을 약속한다.'
      }
    },
    element: 'fire',
    description: '당신은 촛불처럼 조용하지만 따뜻한 빛을 발합니다. 섬세한 감성과 예술적 재능으로 세상에 아름다움을 더하는 낭만주의자입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 촛불처럼 조용하지만 따뜻한 빛을 발합니다. 섬세한 감성과 예술적 재능으로 세상에 아름다움을 더하는 낭만주의자입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['주황색', '분홍색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '丁卯': {
    title: '봄날의 햇살',
    archetype: 'The Gentle Creator',
    persona: {
    
          title: 'The Spring Light Weaver',
          subtitle: '봄빛을 엮는 창조자',
          essence: '당신은 봄날의 햇살처럼 부드럽고 창의적입니다. 조화와 아름다움을 추구하며, 평화로운 방식으로 혁신을 만드는 크리에이터입니다.',
          vibe: ['🌸 Creative', '🎵 Harmonious', '✨ Innovative', '💚 Peaceful']
    },
    ritual: {
      vibe: {
        title: 'Resting Ember',
        titleKo: '휴식하는 불꽃',
        description: '내면에 뜨거운 열정을 간직한 현자. 겉으로는 차분하지만 결정적 순간에 폭발적인 힘을 냅니다.'
      },
      space: {
        title: 'Private Library',
        titleKo: '비밀 서재',
        description: '책이 가득한 따뜻한 서재 공간. 내면의 에너지를 축적할 수 있는 정적인 장소가 필수입니다.'
      },
      item: {
        title: 'Classic Frame',
        titleKo: '클래식 프레임',
        description: '두꺼운 뿔테 안경이나 묵직한 책장. 지적인 무게감이 당신의 권위를 더해줍니다.'
      },
      style: {
        colors: ['빨간색', '황금색', '오렌지'],
        items: ['Solar Item', 'Bright Accent', 'Energy Piece']
      },
      mantra: {
        title: 'Hidden Fire',
        titleKo: '감춰진 불꽃',
        quote: '보이지 않는 곳에서 타오르는 열정이 진정으로 오래간다.'
      }
    },
    element: 'fire',
    description: '당신은 봄날의 햇살처럼 부드럽고 창의적입니다. 조화와 아름다움을 추구하며, 평화로운 방식으로 혁신을 만드는 크리에이터입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 봄날의 햇살처럼 부드럽고 창의적입니다. 조화와 아름다움을 추구하며, 평화로운 방식으로 혁신을 만드는 크리에이터입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['주황색', '분홍색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '丁巳': {
    title: '별빛',
    archetype: 'The Brilliant Mind',
    persona: {
    
          title: 'The Starlight Mystic',
          subtitle: '별빛 같은 신비주의자',
          essence: '당신은 밤하늘의 별처럼 빛나는 지성을 가졌습니다. 뛰어난 직관력과 통찰력으로 보이지 않는 진리를 탐구하는 현자입니다.',
          vibe: ['⭐ Brilliant', '🔮 Mystical', '💡 Insightful', '✨ Enigmatic']
    },
    ritual: {
      vibe: {
        title: 'Quiet Radiance',
        titleKo: '고요한 광채',
        description: '추운 곳을 녹이는 은은한 등불. 당신의 보이지 않는 헌신이 세상을 따뜻하게 만듭니다.'
      },
      space: {
        title: 'Healing Atelier',
        titleKo: '치유의 공방',
        description: '낮은 조도의 따뜻한 조명과 향기가 있는 공간. 아늑함 속에서 당신의 재능이 피어납니다.'
      },
      item: {
        title: 'Fragrant Candle',
        titleKo: '향기로운 캔들',
        description: '향수나 아로마 캔들. 감각을 자극하는 은은한 아이템이 당신의 매력을 높입니다.'
      },
      style: {
        colors: ['주황색', '분홍색', '골드'],
        items: ['Candle', 'Warm Light', 'Art Piece']
      },
      mantra: {
        title: 'Gentle Glow',
        titleKo: '은은한 빛',
        quote: '작은 불씨가 모여 얼어붙은 대지를 녹인다.'
      }
    },
    element: 'fire',
    description: '당신은 밤하늘의 별처럼 빛나는 지성을 가졌습니다. 뛰어난 직관력과 통찰력으로 보이지 않는 진리를 탐구하는 현자입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 밤하늘의 별처럼 빛나는 지성을 가졌습니다. 뛰어난 직관력과 통찰력으로 보이지 않는 진리를 탐구하는 현자입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['주황색', '분홍색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '丁未': {
    title: '저녁노을',
    archetype: 'The Gentle Nurturer',
    persona: {
    
          title: 'The Sunset Healer',
          subtitle: '노을처럼 치유하는 자',
          essence: '당신은 저녁노을처럼 따뜻하고 포용적입니다. 타인의 상처를 치유하고, 평화로운 환경을 만드는 천성적인 힐러입니다.',
          vibe: ['🌅 Healing', '💝 Nurturing', '☮️ Peaceful', '🎨 Artistic']
    },
    ritual: {
      vibe: {
        title: 'Creative Flame',
        titleKo: '창조의 불꽃',
        description: '예술적인 영감과 섬세한 감수성. 당신의 손길이 닿는 곳마다 아름다운 변화가 일어납니다.'
      },
      space: {
        title: 'Artistic Loft',
        titleKo: '예술적 로프트',
        description: '색채가 풍부하고 영감을 주는 소품이 가득한 공간. 창의적인 자유를 보장하는 환경을 만드세요.'
      },
      item: {
        title: 'Craft Kit',
        titleKo: '창작의 도구',
        description: '스케치북이나 공예 도구. 무언가를 만드는 행위 자체가 당신의 에너지를 정렬해 줍니다.'
      },
      style: {
        colors: ['주황색', '분홍색', '골드'],
        items: ['Candle', 'Warm Light', 'Art Piece']
      },
      mantra: {
        title: 'Soulful Art',
        titleKo: '영혼의 예술',
        quote: '당신의 상상력이 세상의 가장 아름다운 풍경이 된다.'
      }
    },
    element: 'fire',
    description: '당신은 저녁노을처럼 따뜻하고 포용적입니다. 타인의 상처를 치유하고, 평화로운 환경을 만드는 천성적인 힐러입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 저녁노을처럼 따뜻하고 포용적입니다. 타인의 상처를 치유하고, 평화로운 환경을 만드는 천성적인 힐러입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['주황색', '분홍색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '丁酉': {
    title: '달빛',
    archetype: 'The Elegant Perfectionist',
    persona: {
    
          title: 'The Moonlight Perfectionist',
          subtitle: '달빛처럼 우아한 완벽주의자',
          essence: '당신은 달빛처럼 은은하고 우아합니다. 섬세한 완벽주의로 높은 품격의 결과물을 만들어내는 장인정신의 소유자입니다.',
          vibe: ['🌙 Elegant', '💎 Refined', '✨ Meticulous', '🎨 Cultured']
    },
    ritual: {
      vibe: {
        title: 'Intense Passion',
        titleKo: '강렬한 열정',
        description: '부드러운 미소 뒤에 숨겨진 치열한 추진력. 당신의 열정은 한 번 시작하면 끝을 봅니다.'
      },
      space: {
        title: 'Passionate Zone',
        titleKo: '열정의 구역',
        description: '강렬한 컬러 포인트와 활동적인 동선의 공간. 에너지가 정체되지 않도록 활력을 유지하세요.'
      },
      item: {
        title: 'Red Signature',
        titleKo: '레드 시그니처',
        description: '붉은색 넥타이나 립스틱. 당신의 열정을 직관적으로 보여주는 포인트 아이템을 활용하세요.'
      },
      style: {
        colors: ['주황색', '분홍색', '골드'],
        items: ['Candle', 'Warm Light', 'Art Piece']
      },
      mantra: {
        title: 'Never Fade',
        titleKo: '불멸의 열정',
        quote: '꺼지지 않는 불꽃은 목표를 향해 끝까지 타오른다.'
      }
    },
    element: 'fire',
    description: '당신은 달빛처럼 은은하고 우아합니다. 섬세한 완벽주의로 높은 품격의 결과물을 만들어내는 장인정신의 소유자입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 달빛처럼 은은하고 우아합니다. 섬세한 완벽주의로 높은 품격의 결과물을 만들어내는 장인정신의 소유자입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['주황색', '분홍색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '丁亥': {
    title: '반딧불',
    archetype: 'The Gentle Dreamer',
    persona: {
    
          title: 'The Firefly Dreamer',
          subtitle: '반딧불처럼 빛나는 몽상가',
          essence: '당신은 반딧불처럼 작지만 아름답게 빛납니다. 풍부한 상상력과 감수성으로 독특한 예술 세계를 창조하는 드리머입니다.',
          vibe: ['✨ Dreamy', '🎨 Imaginative', '💫 Sensitive', '🦋 Whimsical']
    },
    ritual: {
      vibe: {
        title: 'Steady Warmth',
        titleKo: '지속되는 온기',
        description: '성실하고 따뜻한 포용력. 당신은 사람들을 결속시키고 안정시키는 보이지 않는 뿌리입니다.'
      },
      space: {
        title: 'Traditional Room',
        titleKo: '전통의 방',
        description: '안정적인 가구와 차분한 색감의 공간. 평화로운 분위기가 당신의 정신적 건강을 돕습니다.'
      },
      item: {
        title: 'Wooden Bead',
        titleKo: '나무의 질감',
        description: '나무 소재의 팔찌나 따뜻한 티 코지. 소박하지만 깊이 있는 아이템이 어울립니다.'
      },
      style: {
        colors: ['주황색', '분홍색', '골드'],
        items: ['Candle', 'Warm Light', 'Art Piece']
      },
      mantra: {
        title: 'Inner Peace',
        titleKo: '평온한 온기',
        quote: '조용히 자리를 지키는 온기가 가장 큰 위로가 된다.'
      }
    },
    element: 'fire',
    description: '당신은 반딧불처럼 작지만 아름답게 빛납니다. 풍부한 상상력과 감수성으로 독특한 예술 세계를 창조하는 드리머입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 반딧불처럼 작지만 아름답게 빛납니다. 풍부한 상상력과 감수성으로 독특한 예술 세계를 창조하는 드리머입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['주황색', '분홍색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  // ============================================================
  // 戊 (양토) - 산, 대지
  // ============================================================

  '戊子': {
    title: '강가의 언덕',
    archetype: 'The Flexible Foundation',
    persona: {
    
          title: 'The Riverside Philosopher',
          subtitle: '강가 언덕의 철학자',
          essence: '당신은 강가의 언덕처럼 유연하면서도 안정적입니다. 변화를 받아들이면서도 중심을 잃지 않는 균형감 있는 사색가입니다.',
          vibe: ['🏞️ Flexible', '🧠 Philosophical', '⚖️ Balanced', '💧 Adaptable']
    },
    ritual: {
      vibe: {
        title: 'Lunar Grace',
        titleKo: '달빛의 품격',
        description: '은은한 달빛처럼 세련된 우아함. 완벽을 추구하는 당신의 감각은 누구도 흉내 낼 수 없습니다.'
      },
      space: {
        title: 'Refined Salon',
        titleKo: '정제된 살롱',
        description: '고급스러운 가구와 은은한 조명이 조화로운 공간. 품격 있는 환경에서 당신의 감각이 빛납니다.'
      },
      item: {
        title: 'Premium Jewel',
        titleKo: '프리미엄 주얼리',
        description: '작지만 반짝이는 다이아몬드나 진주 액세서리. 절제된 화려함이 당신의 가치를 말해줍니다.'
      },
      style: {
        colors: ['주황색', '분홍색', '골드'],
        items: ['Candle', 'Warm Light', 'Art Piece']
      },
      mantra: {
        title: 'Polished Soul',
        titleKo: '정제된 영혼',
        quote: '진정한 우아함은 보이지 않는 디테일에서 완성된다.'
      }
    },
    element: 'earth',
    description: '당신은 강가의 언덕처럼 유연하면서도 안정적입니다. 변화를 받아들이면서도 중심을 잃지 않는 균형감 있는 사색가입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 강가의 언덕처럼 유연하면서도 안정적입니다. 변화를 받아들이면서도 중심을 잃지 않는 균형감 있는 사색가입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['베이지', '황토색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '戊寅': {
    title: '산',
    archetype: 'The Mighty Foundation',
    persona: {
    
          title: 'The Mountain Emperor',
          subtitle: '산처럼 우뚝한 제왕',
          essence: '당신은 우뚝 솟은 산처럼 든든하고 위엄있습니다. 강한 책임감과 리더십으로 많은 이를 포용하고 이끄는 통치자입니다.',
          vibe: ['⛰️ Majestic', '👑 Authoritative', '💪 Responsible', '🌲 Nurturing']
    },
    ritual: {
      vibe: {
        title: 'Sacred Light',
        titleKo: '신성한 빛',
        description: '맑은 영혼과 예리한 직관력. 보이지 않는 가치를 찾아내는 당신은 세상의 정신적 가이드입니다.'
      },
      space: {
        title: 'Sanctum Space',
        titleKo: '성스러운 공간',
        description: '고요한 음악과 미니멀한 명상 공간. 정신적 에너지를 회복할 수 있는 순수한 장소를 가지세요.'
      },
      item: {
        title: 'Glass Prism',
        titleKo: '투명한 프리즘',
        description: '유리 오브제나 수정. 맑고 투명한 아이템이 당신의 예리한 직관력을 상징합니다.'
      },
      style: {
        colors: ['주황색', '분홍색', '골드'],
        items: ['Candle', 'Warm Light', 'Art Piece']
      },
      mantra: {
        title: 'Pure Insight',
        titleKo: '순수한 통찰',
        quote: '맑은 마음은 세상의 모든 진실을 비추는 거울이다.'
      }
    },
    element: 'earth',
    description: '당신은 우뚝 솟은 산처럼 든든하고 위엄있습니다. 강한 책임감과 리더십으로 많은 이를 포용하고 이끄는 통치자입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 우뚝 솟은 산처럼 든든하고 위엄있습니다. 강한 책임감과 리더십으로 많은 이를 포용하고 이끄는 통치자입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['베이지', '황토색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '戊辰': {
    title: '평야',
    archetype: 'The Abundant Provider',
    persona: {
    
          title: 'The Fertile Architect',
          subtitle: '풍요로운 평야의 설계자',
          essence: '당신은 넓은 평야처럼 풍요롭고 관대합니다. 실용적인 접근으로 지속 가능한 기반을 만드는 장기 전략가입니다.',
          vibe: ['🌾 Abundant', '🏛️ Pragmatic', '📊 Strategic', '⏳ Patient']
    },
    ritual: {
      vibe: {
        title: 'Flowing Foundation',
        titleKo: '유연한 기반',
        description: '강가 언덕처럼 유연하면서도 든든한 존재. 변화를 수용하면서도 중심을 잃지 않는 지혜를 가졌습니다.'
      },
      space: {
        title: 'Adaptive Base',
        titleKo: '적응하는 기지',
        description: '안정적인 가구와 물 요소를 담은 공간. 유연함과 견고함이 공존하는 인테리어가 필요합니다.'
      },
      item: {
        title: 'Natural Stone',
        titleKo: '자연의 원석',
        description: '원석 펜던트나 돌 소재의 소품. 대지의 안정감과 물의 흐름을 동시에 느끼게 해줍니다.'
      },
      style: {
        colors: ['베이지', '황토색', '갈색'],
        items: ['Earth Tone', 'Stone', 'Natural Material']
      },
      mantra: {
        title: 'Stable Change',
        titleKo: '안정적인 변화',
        quote: '중심을 굳건히 하되, 흐르는 물처럼 유연하게 대처하라.'
      }
    },
    element: 'earth',
    description: '당신은 넓은 평야처럼 풍요롭고 관대합니다. 실용적인 접근으로 지속 가능한 기반을 만드는 장기 전략가입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 넓은 평야처럼 풍요롭고 관대합니다. 실용적인 접근으로 지속 가능한 기반을 만드는 장기 전략가입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['베이지', '황토색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '戊午': {
    title: '햇볕 드는 언덕',
    archetype: 'The Radiant Leader',
    persona: {
    
          title: 'The Sunlit Summit',
          subtitle: '햇빛 드는 정상의 지도자',
          essence: '당신은 햇볕이 잘 드는 언덕처럼 밝고 활기찹니다. 안정성과 열정을 겸비하여 확실하게 목표를 달성하는 실행력의 달인입니다.',
          vibe: ['☀️ Bright', '👑 Leading', '⚡ Energetic', '💪 Decisive']
    },
    ritual: {
      vibe: {
        title: 'Mountain Tiger',
        titleKo: '산 위의 호랑이',
        description: '대지를 호령하는 위엄과 카리스마. 당신은 스스로 길을 만들고 사람들을 이끄는 천생 리더입니다.'
      },
      space: {
        title: 'Majestic Office',
        titleKo: '웅장한 집무실',
        description: '넓은 데스크와 묵직한 가구가 있는 공간. 당신의 위엄을 드러낼 수 있는 개방감 있는 환경이 좋습니다.'
      },
      item: {
        title: 'Leather Statement',
        titleKo: '가죽의 힘',
        description: '고급 가죽 브리프케이스나 가구. 강인한 생명력과 권위를 시각화하는 아이템을 선택하세요.'
      },
      style: {
        colors: ['베이지', '황토색', '갈색'],
        items: ['Earth Tone', 'Stone', 'Natural Material']
      },
      mantra: {
        title: 'Rule the Peak',
        titleKo: '정상을 다스리다',
        quote: '가장 높은 산은 스스로 그 높이를 증명할 필요가 없다.'
      }
    },
    element: 'earth',
    description: '당신은 햇볕이 잘 드는 언덕처럼 밝고 활기찹니다. 안정성과 열정을 겸비하여 확실하게 목표를 달성하는 실행력의 달인입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 햇볕이 잘 드는 언덕처럼 밝고 활기찹니다. 안정성과 열정을 겸비하여 확실하게 목표를 달성하는 실행력의 달인입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['베이지', '황토색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '戊申': {
    title: '바위산',
    archetype: 'The Solid Strategist',
    persona: {
    
          title: 'The Stone Strategist',
          subtitle: '바위산의 전략가',
          essence: '당신은 바위산처럼 단단하고 흔들리지 않습니다. 명확한 원칙과 체계적 사고로 완벽한 전략을 수립하는 마스터마인드입니다.',
          vibe: ['🗿 Solid', '🧠 Strategic', '💎 Principled', '⚙️ Systematic']
    },
    ritual: {
      vibe: {
        title: 'Golden Canyon',
        titleKo: '황금빛 대지',
        description: '무궁무진한 잠재력을 품은 대지. 당신의 끈기와 포용력은 거대한 성취의 기반이 됩니다.'
      },
      space: {
        title: 'Spacious Lounge',
        titleKo: '광활한 라운지',
        description: '황토색이나 베이지 톤의 넓고 안락한 공간. 편안함 속에서 거대한 비전을 설계하세요.'
      },
      item: {
        title: 'Solid Craft',
        titleKo: '견고한 공예',
        description: '도자기나 테라코타 소품. 대지의 따뜻함과 견고함을 담은 아이템이 좋습니다.'
      },
      style: {
        colors: ['베이지', '황토색', '갈색'],
        items: ['Earth Tone', 'Stone', 'Natural Material']
      },
      mantra: {
        title: 'Infinite Growth',
        titleKo: '무한한 성장',
        quote: '뿌리 깊은 대지는 모든 생명을 키우고 자신도 성장한다.'
      }
    },
    element: 'earth',
    description: '당신은 바위산처럼 단단하고 흔들리지 않습니다. 명확한 원칙과 체계적 사고로 완벽한 전략을 수립하는 마스터마인드입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 바위산처럼 단단하고 흔들리지 않습니다. 명확한 원칙과 체계적 사고로 완벽한 전략을 수립하는 마스터마인드입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['베이지', '황토색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '戊戌': {
    title: '성벽',
    archetype: 'The Loyal Protector',
    persona: {
    
          title: 'The Fortress Guardian',
          subtitle: '성벽을 지키는 수호자',
          essence: '당신은 튼튼한 성벽처럼 보호하고 지킵니다. 변함없는 충성심과 책임감으로 공동체를 수호하는 영원한 파수꾼입니다.',
          vibe: ['🏰 Protective', '🛡️ Loyal', '💪 Steadfast', '⏳ Enduring']
    },
    ritual: {
      vibe: {
        title: 'Active Volcano',
        titleKo: '활화산의 열정',
        description: '내면의 강력한 추진력과 폭발적인 에너지. 당신의 신념은 누구도 꺾을 수 없는 거대한 산과 같습니다.'
      },
      space: {
        title: 'Dynamic Zone',
        titleKo: '다이내믹 존',
        description: '강한 대비가 있는 인테리어와 에너지가 넘치는 공간. 당신의 추진력을 뒷받침할 활기찬 환경이 필요합니다.'
      },
      item: {
        title: 'Power Gadget',
        titleKo: '파워 가젯',
        description: '고성능 디지털 기기나 강렬한 디자인의 시계. 당신의 강력한 에너지를 시각화하세요.'
      },
      style: {
        colors: ['베이지', '황토색', '갈색'],
        items: ['Earth Tone', 'Stone', 'Natural Material']
      },
      mantra: {
        title: 'Unshakable Will',
        titleKo: '흔들리지 않는 의지',
        quote: '뜨거운 열정은 모든 장벽을 녹이고 새로운 길을 만든다.'
      }
    },
    element: 'earth',
    description: '당신은 튼튼한 성벽처럼 보호하고 지킵니다. 변함없는 충성심과 책임감으로 공동체를 수호하는 영원한 파수꾼입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 튼튼한 성벽처럼 보호하고 지킵니다. 변함없는 충성심과 책임감으로 공동체를 수호하는 영원한 파수꾼입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      },
      {
        "trait": "Protective",
        "icon": "🏰",
        "description": "지키고 싶은 대상—사람, 공동체, 가치—을 성벽처럼 감싸고 지킵니다. 책임지기로 한 것은 끝까지 지키려는 보호 본능이 강합니다."
      },
      {
        "trait": "Loyal",
        "icon": "🛡️",
        "description": "한번 믿으면 변하지 않는 신의와 소속감을 보여줍니다. 배신을 싫어하고, 선택한 관계나 조직에 깊이 몸을 담습니다."
      },
      {
        "trait": "Steadfast",
        "icon": "💪",
        "description": "어떤 압력이나 유혹에도 흔들리지 않고 원칙을 지킵니다. 확고한 기준이 있어 주변에 신뢰와 안정감을 줍니다."
      },
      {
        "trait": "Enduring",
        "icon": "⏳",
        "description": "시간이 지나도 지속하는 책임감과 끈기를 가집니다. 단기보다 장기, 일회성보다 끈끈한 유대를 중시합니다."
      }
    ],
    strengths: [
      '충성심',
      '책임감',
      '신뢰'
    ],
    challenges: [
      '융통성',
      '변화 수용'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['베이지', '황토색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  // ============================================================
  // 己 (음토) - 밭, 정원
  // ============================================================

  '己丑': {
    title: '비옥한 밭',
    archetype: 'The Patient Cultivator',
    persona: {
    
          title: 'The Patient Gardener',
          subtitle: '인내심으로 밭을 가꾸는 자',
          essence: '당신은 비옥한 밭처럼 꾸준히 가꾸고 키워냅니다. 섬세한 배려와 인내심으로 작은 것도 소중히 여기는 양육자입니다.',
          vibe: ['🌾 Patient', '🌱 Nurturing', '💚 Caring', '⏳ Persistent']
    },
    ritual: {
      vibe: {
        title: 'The Stone Strategist',
        titleKo: '바위산의 전략가',
        description: '단단하고 흔들리지 않는 명확한 원칙. 체계적인 사고로 완벽한 전략을 수립하는 마스터마인드입니다.'
      },
      space: {
        title: 'Structured Edge',
        titleKo: '구조적 공간',
        description: '직선과 질서가 살아있는 미니멀한 공간. 불필요한 장식을 배제하여 사고의 명료함을 얻으세요.'
      },
      item: {
        title: 'Timeless Metal',
        titleKo: '타임리스 메탈',
        description: '스틸 소재의 데스크 용품이나 실버 액세서리. 당신의 견고한 원칙과 신뢰감을 완성합니다.'
      },
      style: {
        colors: ['베이지', '황토색', '갈색'],
        items: ['Earth Tone', 'Stone', 'Natural Material']
      },
      mantra: {
        title: 'Precision Depth',
        titleKo: '정교함의 깊이',
        quote: '정확한 구조와 깊은 통찰이 승리의 지름길이다.'
      }
    },
    element: 'earth',
    description: '당신은 비옥한 밭처럼 꾸준히 가꾸고 키워냅니다. 섬세한 배려와 인내심으로 작은 것도 소중히 여기는 양육자입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 비옥한 밭처럼 꾸준히 가꾸고 키워냅니다. 섬세한 배려와 인내심으로 작은 것도 소중히 여기는 양육자입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['갈색', '크림'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '己卯': {
    title: '정원',
    archetype: 'The Gentle Gardener',
    persona: {
    
          title: 'The Garden Whisperer',
          subtitle: '정원의 속삭임을 듣는 자',
          essence: '당신은 아름다운 정원처럼 조화롭고 평화롭습니다. 부드럽게 성장을 돕고, 주변을 아름답게 만드는 힐링의 존재입니다.',
          vibe: ['🌸 Harmonious', '🌿 Gentle', '🎨 Aesthetic', '💚 Peaceful']
    },
    ritual: {
      vibe: {
        title: 'Ancient Mountain',
        titleKo: '태고의 영산',
        description: '변치 않는 신의와 묵직한 존재감. 당신은 어떤 풍파에도 흔들리지 않고 자리를 지키는 최후의 수호자입니다.'
      },
      space: {
        title: 'Monolithic Room',
        titleKo: '묵직한 안식처',
        description: '어두운 우드와 석재가 조화로운 중후한 공간. 외부의 소음에서 벗어난 고요한 환경을 조성하세요.'
      },
      item: {
        title: 'Heavy Texture',
        titleKo: '묵직한 질감',
        description: '두꺼운 울 코트나 무게감 있는 문구류. 당신의 진중함과 깊이를 더해주는 아이템이 좋습니다.'
      },
      style: {
        colors: ['베이지', '황토색', '갈색'],
        items: ['Earth Tone', 'Stone', 'Natural Material']
      },
      mantra: {
        title: 'Silent Power',
        titleKo: '침묵의 권위',
        quote: '가장 무거운 존재는 가장 낮은 곳에서 세상을 지탱한다.'
      }
    },
    element: 'earth',
    description: '당신은 아름다운 정원처럼 조화롭고 평화롭습니다. 부드럽게 성장을 돕고, 주변을 아름답게 만드는 힐링의 존재입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 아름다운 정원처럼 조화롭고 평화롭습니다. 부드럽게 성장을 돕고, 주변을 아름답게 만드는 힐링의 존재입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['갈색', '크림'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '己巳': {
    title: '화분',
    archetype: 'The Refined Creator',
    persona: {
    
          title: 'The Artisan Alchemist',
          subtitle: '화분 속 연금술사',
          essence: '당신은 정성껏 가꾼 화분처럼 세련되고 아름답습니다. 열정과 섬세함을 결합하여 완성도 높은 예술작품을 만드는 장인입니다.',
          vibe: ['🌺 Refined', '🎨 Artistic', '🔥 Passionate', '✨ Meticulous']
    },
    ritual: {
      vibe: {
        title: 'Patient Earth',
        titleKo: '인내하는 대지',
        description: '성실함과 인내심으로 결실을 준비하는 힘. 묵묵히 제 자리를 지키며 실질적인 성과를 만들어냅니다.'
      },
      space: {
        title: 'Organized Den',
        titleKo: '정돈된 아지트',
        description: '실용적이고 체계적으로 정리된 공간. 필요한 물건이 제자리에 있을 때 안정감을 얻습니다.'
      },
      item: {
        title: 'Reliable Tool',
        titleKo: '신뢰의 도구',
        description: '내구성이 좋은 다이어리나 필기구. 실용적이고 변치 않는 가치를 선호하세요.'
      },
      style: {
        colors: ['갈색', '크림', '연갈색'],
        items: ['Natural Material', 'Practical Design', 'Warm Touch']
      },
      mantra: {
        title: 'Endure & Harvest',
        titleKo: '인내와 수확',
        quote: '준비된 자에게 대지는 반드시 풍성한 결실을 약속한다.'
      }
    },
    element: 'earth',
    description: '당신은 정성껏 가꾼 화분처럼 세련되고 아름답습니다. 열정과 섬세함을 결합하여 완성도 높은 예술작품을 만드는 장인입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 정성껏 가꾼 화분처럼 세련되고 아름답습니다. 열정과 섬세함을 결합하여 완성도 높은 예술작품을 만드는 장인입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['갈색', '크림'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '己未': {
    title: '여름 들판',
    archetype: 'The Warm Nurturer',
    persona: {
    
          title: 'The Summer Field Nurturer',
          subtitle: '여름 들판의 양육자',
          essence: '당신은 여름 들판처럼 따뜻하고 풍요롭습니다. 타인을 돌보고 치유하며, 평화로운 환경을 만드는 천성적인 케어테이커입니다.',
          vibe: ['☀️ Warm', '💝 Nurturing', '🌾 Abundant', '☮️ Peaceful']
    },
    ritual: {
      vibe: {
        title: 'Artistic Soil',
        titleKo: '예술적 옥토',
        description: '유연한 창의성과 섬세한 감각. 당신의 아이디어는 현실적인 기반 위에서 아름다운 열매를 맺습니다.'
      },
      space: {
        title: 'Creative Garden',
        titleKo: '창의적 정원',
        description: '아기자기한 소품과 식물이 있는 아늑한 공간. 편안하고 감성적인 환경에서 영감이 샘솟습니다.'
      },
      item: {
        title: 'Handmade Touch',
        titleKo: '핸드메이드 감성',
        description: '수공예 액세서리나 패브릭 소품. 당신의 따뜻하고 섬세한 취향을 잘 보여줍니다.'
      },
      style: {
        colors: ['갈색', '크림', '연갈색'],
        items: ['Natural Material', 'Practical Design', 'Warm Touch']
      },
      mantra: {
        title: 'Bloom Softly',
        titleKo: '부드러운 개화',
        quote: '당신의 섬세한 손길이 닿을 때 세상은 더욱 아름다워진다.'
      }
    },
    element: 'earth',
    description: '당신은 여름 들판처럼 따뜻하고 풍요롭습니다. 타인을 돌보고 치유하며, 평화로운 환경을 만드는 천성적인 케어테이커입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 여름 들판처럼 따뜻하고 풍요롭습니다. 타인을 돌보고 치유하며, 평화로운 환경을 만드는 천성적인 케어테이커입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['갈색', '크림'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '己酉': {
    title: '보석 광산',
    archetype: 'The Hidden Gem',
    persona: {
    
          title: 'The Hidden Jewel Keeper',
          subtitle: '숨겨진 보석의 수호자',
          essence: '당신은 보석 광산처럼 내면에 귀한 가치를 품고 있습니다. 섬세한 완벽주의로 숨겨진 아름다움을 발견하고 가꾸는 큐레이터입니다.',
          vibe: ['💎 Precious', '🔍 Meticulous', '✨ Refined', '🤫 Subtle']
    },
    ritual: {
      vibe: {
        title: 'Wise Cultivator',
        titleKo: '지혜로운 경작자',
        description: '열정과 지혜를 겸비한 현실주의자. 명확한 목표를 향해 전략적으로 에너지를 쏟을 줄 압니다.'
      },
      space: {
        title: 'Vibrant Base',
        titleKo: '생동감 넘치는 기지',
        description: '활동적인 에너지와 밝은 조명이 있는 공간. 성과를 향한 의욕을 고취하는 환경이 좋습니다.'
      },
      item: {
        title: 'Glossy Finish',
        titleKo: '빛나는 마무리',
        description: '광택 있는 구두나 가방. 자신감 있는 이미지를 연출하여 전문성을 돋보이게 하세요.'
      },
      style: {
        colors: ['갈색', '크림', '연갈색'],
        items: ['Natural Material', 'Practical Design', 'Warm Touch']
      },
      mantra: {
        title: 'Focus on Fruit',
        titleKo: '결과에 집중하라',
        quote: '지혜로운 계획이 가장 달콤한 성과를 가져다준다.'
      }
    },
    element: 'earth',
    description: '당신은 보석 광산처럼 내면에 귀한 가치를 품고 있습니다. 섬세한 완벽주의로 숨겨진 아름다움을 발견하고 가꾸는 큐레이터입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 보석 광산처럼 내면에 귀한 가치를 품고 있습니다. 섬세한 완벽주의로 숨겨진 아름다움을 발견하고 가꾸는 큐레이터입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['갈색', '크림'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '己亥': {
    title: '연못가 정원',
    archetype: 'The Intuitive Caregiver',
    persona: {
    
          title: 'The Pond Gardener',
          subtitle: '연못가 정원사',
          essence: '당신은 연못가 정원처럼 섬세하고 직관적입니다. 깊은 감수성과 창의력으로 타인의 아픔을 치유하는 힐링 아티스트입니다.',
          vibe: ['💧 Intuitive', '🌸 Sensitive', '🎨 Creative', '💚 Healing']
    },
    ritual: {
      vibe: {
        title: 'Solid Harvest',
        titleKo: '견고한 수확',
        description: '흔들리지 않는 성실함과 고집스러운 장인 정신. 당신의 꾸준함이 결국 누구도 넘볼 수 없는 전문성을 만듭니다.'
      },
      space: {
        title: 'Rustic Studio',
        titleKo: '소박한 공방',
        description: '내추럴한 소재와 흙의 질감이 살아있는 공간. 자연스럽고 편안한 분위기가 당신의 집중력을 돕습니다.'
      },
      item: {
        title: 'Earthenware',
        titleKo: '흙의 따스함',
        description: '도자기 머그컵이나 흙 톤의 패션 아이템. 소박하지만 깊이 있는 우아함을 추구하세요.'
      },
      style: {
        colors: ['갈색', '크림', '연갈색'],
        items: ['Natural Material', 'Practical Design', 'Warm Touch']
      },
      mantra: {
        title: 'Keep Going',
        titleKo: '멈추지 않는 걸음',
        quote: '가장 느린 걸음일지라도 결국 가장 먼 곳까지 닿으리라.'
      }
    },
    element: 'earth',
    description: '당신은 연못가 정원처럼 섬세하고 직관적입니다. 깊은 감수성과 창의력으로 타인의 아픔을 치유하는 힐링 아티스트입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 연못가 정원처럼 섬세하고 직관적입니다. 깊은 감수성과 창의력으로 타인의 아픔을 치유하는 힐링 아티스트입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['갈색', '크림'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  // ============================================================
  // 庚 (양금) - 강철, 무쇠
  // ============================================================

  '庚子': {
    title: '칼날',
    archetype: 'The Sharp Intellect',
    persona: {
    
          title: 'The Crystal Blade',
          subtitle: '수정처럼 투명한 칼날',
          essence: '당신은 날카로운 칼날처럼 예리하고 정확합니다. 뛰어난 분석력과 통찰력으로 진실을 꿰뚫어보는 진리 추구자입니다.',
          vibe: ['🔪 Sharp', '💎 Clear', '🧠 Analytical', '⚖️ Just']
    },
    ritual: {
      vibe: {
        title: 'Polished Field',
        titleKo: '정제된 대지',
        description: '예리한 미적 감각과 완벽한 마무리. 당신의 손길은 평범한 것을 보석으로 탈바꿈시키는 힘이 있습니다.'
      },
      space: {
        title: 'Clean Sanctuary',
        titleKo: '깨끗한 성소',
        description: '먼지 하나 없는 정돈된 화이트 톤 공간. 완벽하게 관리된 환경에서 최고의 효율이 나옵니다.'
      },
      item: {
        title: 'Jewel Inlay',
        titleKo: '보석의 디테일',
        description: '디테일이 살아있는 액세서리나 정교한 소품. 작은 부분까지 신경 쓴 세련미를 완성하세요.'
      },
      style: {
        colors: ['갈색', '크림', '연갈색'],
        items: ['Natural Material', 'Practical Design', 'Warm Touch']
      },
      mantra: {
        title: 'Refine Daily',
        titleKo: '매일의 정제',
        quote: '완벽함은 더 이상 뺄 것이 없는 상태에서 비로소 완성된다.'
      }
    },
    element: 'metal',
    description: '당신은 날카로운 칼날처럼 예리하고 정확합니다. 뛰어난 분석력과 통찰력으로 진실을 꿰뚫어보는 진리 추구자입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 날카로운 칼날처럼 예리하고 정확합니다. 뛰어난 분석력과 통찰력으로 진실을 꿰뚫어보는 진리 추구자입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['은색', '화이트'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '庚寅': {
    title: '도끼',
    archetype: 'The Bold Pioneer',
    persona: {
    
          title: 'The Axe Warrior',
          subtitle: '길을 여는 도끼 전사',
          essence: '당신은 도끼처럼 강하고 결단력 있습니다. 새로운 길을 개척하는 용기와 강한 의지로 장애물을 극복하는 개척자입니다.',
          vibe: ['🪓 Bold', '⚔️ Courageous', '💪 Strong', '🚀 Pioneering']
    },
    ritual: {
      vibe: {
        title: 'Clear Reflection',
        titleKo: '맑은 투영',
        description: '깊은 통찰력과 포용력 있는 마음. 사람들의 본질을 꿰뚫어 보고 따뜻하게 수용하는 지혜를 가졌습니다.'
      },
      space: {
        title: 'Zen Retreat',
        titleKo: '젠 스타일 휴식처',
        description: '여백의 미가 살아있는 차분한 공간. 명상과 사색이 가능한 조용한 환경을 조성하세요.'
      },
      item: {
        title: 'Clear Glass',
        titleKo: '투명한 유리',
        description: '유리 오브제나 투명한 안경 프레임. 맑고 깨끗한 이미지가 당신의 지혜를 상징합니다.'
      },
      style: {
        colors: ['갈색', '크림', '연갈색'],
        items: ['Natural Material', 'Practical Design', 'Warm Touch']
      },
      mantra: {
        title: 'Mirror Mind',
        titleKo: '거울 같은 마음',
        quote: '세상을 비추는 맑은 마음이 진실로 세상을 치유한다.'
      }
    },
    element: 'metal',
    description: '당신은 도끼처럼 강하고 결단력 있습니다. 새로운 길을 개척하는 용기와 강한 의지로 장애물을 극복하는 개척자입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 도끼처럼 강하고 결단력 있습니다. 새로운 길을 개척하는 용기와 강한 의지로 장애물을 극복하는 개척자입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['은색', '화이트'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '庚辰': {
    title: '광석',
    archetype: 'The Solid Foundation',
    persona: {
    
          title: 'The Ore Foundation',
          subtitle: '광석처럼 단단한 기반',
          essence: '당신은 단단한 광석처럼 흔들리지 않습니다. 확고한 원칙과 책임감으로 신뢰할 수 있는 기반을 만드는 건축가입니다.',
          vibe: ['⛰️ Solid', '🛡️ Reliable', '💎 Principled', '🏛️ Foundational']
    },
    ritual: {
      vibe: {
        title: 'Cool Logic',
        titleKo: '냉철한 논리',
        description: '어둠 속에서도 길을 찾는 예리한 지성. 감정에 휘둘리지 않고 본질을 꿰뚫는 분석력이 뛰어납니다.'
      },
      space: {
        title: 'Monotone Lab',
        titleKo: '모노톤 연구소',
        description: '블랙&화이트의 군더더기 없는 공간. 차가운 금속 소재가 당신의 판단력을 돕습니다.'
      },
      item: {
        title: 'Sharp Device',
        titleKo: '예리한 기기',
        description: '세련된 디지털 가젯이나 정교한 공구. 기능미가 뛰어난 아이템이 당신과 어울립니다.'
      },
      style: {
        colors: ['은색', '검은색', '화이트'],
        items: ['Metal', 'Precision Tool', 'Minimal Design']
      },
      mantra: {
        title: 'Truth First',
        titleKo: '진실이 우선이다',
        quote: '날카로운 진실만이 복잡한 세상을 단순하게 만든다.'
      }
    },
    element: 'metal',
    description: '당신은 단단한 광석처럼 흔들리지 않습니다. 확고한 원칙과 책임감으로 신뢰할 수 있는 기반을 만드는 건축가입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 단단한 광석처럼 흔들리지 않습니다. 확고한 원칙과 책임감으로 신뢰할 수 있는 기반을 만드는 건축가입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['은색', '화이트'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '庚午': {
    title: '제련된 쇠',
    archetype: 'The Refined Warrior',
    persona: {
    
          title: 'The Forged Champion',
          subtitle: '제련된 쇠의 챔피언',
          essence: '당신은 불에 제련된 쇠처럼 강하고 세련됩니다. 열정과 규율을 겸비하여 최고의 결과를 만드는 완벽주의 전사입니다.',
          vibe: ['⚔️ Refined', '🔥 Passionate', '💎 Perfect', '⚡ Powerful']
    },
    ritual: {
      vibe: {
        title: 'Active Blade',
        titleKo: '움직이는 칼날',
        description: '거침없는 추진력과 강력한 리더십. 장애물을 두려워하지 않고 정면으로 돌파하는 개척자입니다.'
      },
      space: {
        title: 'Command Center',
        titleKo: '작전 통제소',
        description: '넓은 시야와 활동적인 가구 배치가 돋보이는 공간. 당신의 결단력이 실행으로 이어지는 환경을 만드세요.'
      },
      item: {
        title: 'Bold Watch',
        titleKo: '대담한 시계',
        description: '묵직한 크로노그래프 시계나 메탈 액세서리. 당신의 결단력과 시간을 장악하세요.'
      },
      style: {
        colors: ['은색', '검은색', '화이트'],
        items: ['Metal', 'Precision Tool', 'Minimal Design']
      },
      mantra: {
        title: 'Strike Fast',
        titleKo: '기회의 포착',
        quote: '망설임 없는 행동이 승리의 가장 확실한 열쇠다.'
      }
    },
    element: 'metal',
    description: '당신은 불에 제련된 쇠처럼 강하고 세련됩니다. 열정과 규율을 겸비하여 최고의 결과를 만드는 완벽주의 전사입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 불에 제련된 쇠처럼 강하고 세련됩니다. 열정과 규율을 겸비하여 최고의 결과를 만드는 완벽주의 전사입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['은색', '화이트'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '庚申': {
    title: '보검',
    archetype: 'The Master Craftsman',
    persona: {
    
          title: 'The Master Swordsmith',
          subtitle: '명검을 만드는 장인',
          essence: '당신은 명검처럼 예리하고 완벽합니다. 최고의 기준을 추구하며, 디테일까지 완벽하게 마무리하는 마스터 장인입니다.',
          vibe: ['⚔️ Perfect', '💎 Masterful', '🎯 Focused', '✨ Flawless']
    },
    ritual: {
      vibe: {
        title: 'Noble Metal',
        titleKo: '고귀한 원석',
        description: '대범하고 포용력 있는 변화의 선구자. 거대한 흐름을 만들고 세상을 혁신하는 에너지를 가졌습니다.'
      },
      space: {
        title: 'Vast Gallery',
        titleKo: '광활한 갤러리',
        description: '대리석과 금속이 조화된 웅장한 공간. 넓은 공간감이 당신의 스케일을 더욱 키워줍니다.'
      },
      item: {
        title: 'Statement Piece',
        titleKo: '시그니처 피스',
        description: '브랜드 가치가 높은 아이템이나 예술적인 오브제. 당신의 특별함을 세상에 선언하세요.'
      },
      style: {
        colors: ['은색', '검은색', '화이트'],
        items: ['Metal', 'Precision Tool', 'Minimal Design']
      },
      mantra: {
        title: 'Lead the Flow',
        titleKo: '흐름을 주도하라',
        quote: '거대한 변화는 언제나 단단한 의지에서 시작된다.'
      }
    },
    element: 'metal',
    description: '당신은 명검처럼 예리하고 완벽합니다. 최고의 기준을 추구하며, 디테일까지 완벽하게 마무리하는 마스터 장인입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 명검처럼 예리하고 완벽합니다. 최고의 기준을 추구하며, 디테일까지 완벽하게 마무리하는 마스터 장인입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['은색', '화이트'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '庚戌': {
    title: '성문의 자물쇠',
    archetype: 'The Loyal Guardian',
    persona: {
    
          title: 'The Iron Guardian',
          subtitle: '철문의 수호자',
          essence: '당신은 성문의 자물쇠처럼 튼튼하고 충실합니다. 변함없는 충성심과 책임감으로 맡은 것을 끝까지 지키는 파수꾼입니다.',
          vibe: ['🔐 Loyal', '🛡️ Protective', '💪 Steadfast', '⚖️ Principled']
    },
    ritual: {
      vibe: {
        title: 'Polished Flame',
        titleKo: '단련된 불꽃',
        description: '열정 속에서도 흐트러지지 않는 절제미. 화려하면서도 기품을 잃지 않는 세련된 리더입니다.'
      },
      space: {
        title: 'Luxury Studio',
        titleKo: '럭셔리 스튜디오',
        description: '화려한 조명과 세련된 메탈릭 가구. 당신의 명예와 품격이 돋보이는 환경을 조성하세요.'
      },
      item: {
        title: 'Glossy Metal',
        titleKo: '빛나는 메탈',
        description: '고광택 시계나 세련된 주얼리. 당신의 성공을 직관적으로 증명하는 아이템을 선택하세요.'
      },
      style: {
        colors: ['은색', '검은색', '화이트'],
        items: ['Metal', 'Precision Tool', 'Minimal Design']
      },
      mantra: {
        title: 'Fire & Steel',
        titleKo: '불과 강철',
        quote: '시련 속에서 단련된 의지만이 영원히 빛난다.'
      }
    },
    element: 'metal',
    description: '당신은 성문의 자물쇠처럼 튼튼하고 충실합니다. 변함없는 충성심과 책임감으로 맡은 것을 끝까지 지키는 파수꾼입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 성문의 자물쇠처럼 튼튼하고 충실합니다. 변함없는 충성심과 책임감으로 맡은 것을 끝까지 지키는 파수꾼입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['은색', '화이트'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  // ============================================================
  // 辛 (음금) - 보석, 귀금속
  // ============================================================

  '辛丑': {
    title: '보석 원석',
    archetype: 'The Hidden Treasure',
    persona: {
    
          title: 'The Raw Diamond',
          subtitle: '원석 속 다이아몬드',
          essence: '당신은 보석 원석처럼 내면에 귀한 가치를 품고 있습니다. 섬세한 완벽주의로 시간을 들여 빛나는 보석이 되는 인내의 예술가입니다.',
          vibe: ['💎 Precious', '✨ Patient', '🔍 Meticulous', '⏳ Enduring']
    },
    ritual: {
      vibe: {
        title: 'Absolute Iron',
        titleKo: '절대적 강인함',
        description: '타협하지 않는 원칙과 순수한 카리스마. 당신의 말은 곧 법이 되며, 그만큼의 신뢰를 동반합니다.'
      },
      space: {
        title: 'Minimal Fortress',
        titleKo: '미니멀 요새',
        description: '극도의 절제미가 느껴지는 견고한 공간. 차갑고 깨끗한 환경이 당신의 정신을 무장시킵니다.'
      },
      item: {
        title: 'Solid Steel',
        titleKo: '강철의 신뢰',
        description: '풀 메탈 바디의 노트북이나 시계. 변하지 않는 견고함이 당신의 정체성입니다.'
      },
      style: {
        colors: ['은색', '검은색', '화이트'],
        items: ['Metal', 'Precision Tool', 'Minimal Design']
      },
      mantra: {
        title: 'Be Unshakable',
        titleKo: '흔들리지 마라',
        quote: '가장 단단한 것은 결코 부러지지 않고 세상을 바꾼다.'
      }
    },
    element: 'metal',
    description: '당신은 보석 원석처럼 내면에 귀한 가치를 품고 있습니다. 섬세한 완벽주의로 시간을 들여 빛나는 보석이 되는 인내의 예술가입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 보석 원석처럼 내면에 귀한 가치를 품고 있습니다. 섬세한 완벽주의로 시간을 들여 빛나는 보석이 되는 인내의 예술가입니다…"
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['금색', '은색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '辛卯': {
    title: '금세공품',
    archetype: 'The Elegant Artist',
    persona: {
    
          title: 'The Golden Artisan',
          subtitle: '금세공의 예술가',
          essence: '당신은 정교한 금세공품처럼 우아하고 세련됩니다. 예술적 감각과 섬세함으로 아름다움을 창조하는 크리에이터입니다.',
          vibe: ['👑 Elegant', '🎨 Artistic', '✨ Refined', '🌸 Delicate']
    },
    ritual: {
      vibe: {
        title: 'Guardian Spear',
        titleKo: '수호의 창',
        description: '외롭지만 숭고한 책임감. 당신은 가장 어려운 자리에서 원칙을 지키며 가치를 수호하는 사람입니다.'
      },
      space: {
        title: 'Tactical Study',
        titleKo: '전략적 서재',
        description: '석재와 우드가 조화된 무게감 있는 공간. 깊은 고찰을 통해 전략을 수립하는 장소가 필요합니다.'
      },
      item: {
        title: 'Heavy Pen',
        titleKo: '묵직한 펜',
        description: '무게감이 느껴지는 만년필이나 서류 가방. 당신의 책임과 무게를 상징하는 아이템을 활용하세요.'
      },
      style: {
        colors: ['은색', '검은색', '화이트'],
        items: ['Metal', 'Precision Tool', 'Minimal Design']
      },
      mantra: {
        title: 'Faithful Will',
        titleKo: '신념의 무게',
        quote: '끝까지 자리를 지키는 자가 승리의 진정한 주인이다.'
      }
    },
    element: 'metal',
    description: '당신은 정교한 금세공품처럼 우아하고 세련됩니다. 예술적 감각과 섬세함으로 아름다움을 창조하는 크리에이터입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 정교한 금세공품처럼 우아하고 세련됩니다. 예술적 감각과 섬세함으로 아름다움을 창조하는 크리에이터입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['금색', '은색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '辛巳': {
    title: '귀금속',
    archetype: 'The Refined Perfectionist',
    persona: {
    
          title: 'The Jewel Perfectionist',
          subtitle: '귀금속의 완벽주의자',
          essence: '당신은 제련된 귀금속처럼 빛나고 완벽합니다. 높은 기준과 세련된 열정으로 최상급의 결과물을 만드는 럭셔리 크리에이터입니다.',
          vibe: ['💍 Brilliant', '🔥 Refined', '👑 Luxurious', '✨ Perfect']
    },
    ritual: {
      vibe: {
        title: 'Icy Gem',
        titleKo: '얼어붙은 보석',
        description: '차갑지만 찬란한 지혜와 인내. 고난 속에서 더욱 단단해지는 당신의 가치는 결국 만천하에 드러납니다.'
      },
      space: {
        title: 'Frozen Gallery',
        titleKo: '얼음의 갤러리',
        description: '화이트와 실버가 강조된 미니멀한 공간. 냉정함을 유지할 수 있는 차분한 환경이 좋습니다.'
      },
      item: {
        title: 'White Gold',
        titleKo: '화이트 골드',
        description: '세련된 화이트 골드 액세서리나 주얼리. 절제된 화려함이 당신의 품격을 높입니다.'
      },
      style: {
        colors: ['은색', '금색', '화이트'],
        items: ['Fine Jewelry', 'Premium Item', 'Elegant Design']
      },
      mantra: {
        title: 'Wait to Shine',
        titleKo: '빛날 때를 기다려라',
        quote: '깊은 땅속의 원석이 가장 눈부신 보석이 된다.'
      }
    },
    element: 'metal',
    description: '당신은 제련된 귀금속처럼 빛나고 완벽합니다. 높은 기준과 세련된 열정으로 최상급의 결과물을 만드는 럭셔리 크리에이터입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 제련된 귀금속처럼 빛나고 완벽합니다. 높은 기준과 세련된 열정으로 최상급의 결과물을 만드는 럭셔리 크리에이터입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['금색', '은색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '辛未': {
    title: '은세공품',
    archetype: 'The Gentle Artisan',
    persona: {
    
          title: 'The Silver Crafter',
          subtitle: '은세공의 장인',
          essence: '당신은 은세공품처럼 부드럽고 아름답습니다. 섬세한 감성과 예술적 재능으로 사람들을 감동시키는 힐링 아티스트입니다.',
          vibe: ['🌙 Gentle', '🎨 Artistic', '💝 Caring', '✨ Elegant']
    },
    ritual: {
      vibe: {
        title: 'Delicate Blade',
        titleKo: '섬세한 칼날',
        description: '예술적인 감각과 정교한 분석력. 부드러워 보이지만 핵심을 찌르는 날카로움을 가졌습니다.'
      },
      space: {
        title: 'Precision Atelier',
        titleKo: '정교한 아틀리에',
        description: '세밀한 수납장과 정돈된 책상이 있는 공간. 섬세한 작업에 몰입할 수 있는 환경을 만드세요.'
      },
      item: {
        title: 'Fine Needle',
        titleKo: '세밀한 디테일',
        description: '섬세한 패턴의 셔츠나 정교한 소품. 당신의 예민한 감각을 긍정적인 방향으로 표현하세요.'
      },
      style: {
        colors: ['은색', '금색', '화이트'],
        items: ['Fine Jewelry', 'Premium Item', 'Elegant Design']
      },
      mantra: {
        title: 'Sharp Art',
        titleKo: '날카로운 예술',
        quote: '섬세함이 모여 세상이 넘볼 수 없는 완벽함을 만든다.'
      }
    },
    element: 'metal',
    description: '당신은 은세공품처럼 부드럽고 아름답습니다. 섬세한 감성과 예술적 재능으로 사람들을 감동시키는 힐링 아티스트입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 은세공품처럼 부드럽고 아름답습니다. 섬세한 감성과 예술적 재능으로 사람들을 감동시키는 힐링 아티스트입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['금색', '은색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '辛酉': {
    title: '다이아몬드',
    archetype: 'The Brilliant Mind',
    persona: {
    
          title: 'The Diamond Mind',
          subtitle: '다이아몬드 같은 지성',
          essence: '당신은 다이아몬드처럼 빛나고 단단합니다. 예리한 지성과 완벽한 자기관리로 최고의 품격을 유지하는 브릴리언트 마인드입니다.',
          vibe: ['💎 Brilliant', '🧠 Intelligent', '👑 Refined', '✨ Flawless']
    },
    ritual: {
      vibe: {
        title: 'Luminous Jewel',
        titleKo: '빛나는 보석',
        description: '화려함과 총명함을 겸비한 천부적인 리더. 당신의 지적 매력은 사람들 사이에서 언제나 돋보입니다.'
      },
      space: {
        title: 'Elegant Salon',
        titleKo: '품격 있는 살롱',
        description: '고급스러운 소재와 트렌디한 조명이 있는 공간. 세련된 환경이 당신의 사교적 지성을 자극합니다.'
      },
      item: {
        title: 'Signature Scent',
        titleKo: '시그니처 향수',
        description: '개성 있고 고급스러운 향수나 브로치. 당신의 존재감을 은은하고 강력하게 각인시키세요.'
      },
      style: {
        colors: ['은색', '금색', '화이트'],
        items: ['Fine Jewelry', 'Premium Item', 'Elegant Design']
      },
      mantra: {
        title: 'Sparkle Intelligence',
        titleKo: '빛나는 지성',
        quote: '진정한 빛은 내면의 지혜에서 뿜어져 나온다.'
      }
    },
    element: 'metal',
    description: '당신은 다이아몬드처럼 빛나고 단단합니다. 예리한 지성과 완벽한 자기관리로 최고의 품격을 유지하는 브릴리언트 마인드입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 다이아몬드처럼 빛나고 단단합니다. 예리한 지성과 완벽한 자기관리로 최고의 품격을 유지하는 브릴리언트 마인드입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['금색', '은색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '辛亥': {
    title: '진주',
    archetype: 'The Hidden Treasure',
    persona: {
    
          title: 'The Pearl Mystic',
          subtitle: '진주 같은 신비주의자',
          essence: '당신은 진주처럼 은은하게 빛납니다. 깊은 감수성과 직관력으로 보이지 않는 아름다움을 발견하는 미스티컬 아티스트입니다.',
          vibe: ['🌙 Mystical', '💧 Intuitive', '✨ Subtle', '🎨 Artistic']
    },
    ritual: {
      vibe: {
        title: 'Rooted Pearl',
        titleKo: '대지의 진주',
        description: '성실하고 단단한 내실을 다지는 힘. 조용히 자신의 가치를 키워 결국 큰 신뢰를 얻어냅니다.'
      },
      space: {
        title: 'Natural Suite',
        titleKo: '내추럴 수트',
        description: '따뜻한 모래색과 금속 포인트가 어우러진 공간. 편안함 속에 긴장을 놓지 않는 인테리어를 추구하세요.'
      },
      item: {
        title: 'Pearl Accessory',
        titleKo: '진주의 우아함',
        description: '진주 넥타이핀이나 목걸이. 소박해 보이지만 절대 무시할 수 없는 가치를 드러내세요.'
      },
      style: {
        colors: ['은색', '금색', '화이트'],
        items: ['Fine Jewelry', 'Premium Item', 'Elegant Design']
      },
      mantra: {
        title: 'Solid Value',
        titleKo: '단단한 가치',
        quote: '시간이 흐를수록 당신의 가치는 더욱 깊고 찬란해진다.'
      }
    },
    element: 'metal',
    description: '당신은 진주처럼 은은하게 빛납니다. 깊은 감수성과 직관력으로 보이지 않는 아름다움을 발견하는 미스티컬 아티스트입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 진주처럼 은은하게 빛납니다. 깊은 감수성과 직관력으로 보이지 않는 아름다움을 발견하는 미스티컬 아티스트입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['금색', '은색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  // ============================================================
  // 壬 (양수) - 바다, 강
  // ============================================================

  '壬子': {
    title: '바다',
    archetype: 'The Vast Ocean',
    persona: {
    
          title: 'The Ocean Sage',
          subtitle: '바다의 현자',
          essence: '당신은 광활한 바다처럼 깊고 넓습니다. 무한한 지혜와 포용력으로 모든 것을 담아내는 위대한 철학자입니다.',
          vibe: ['🌊 Profound', '🧠 Wise', '🌐 Expansive', '💫 Intuitive']
    },
    ritual: {
      vibe: {
        title: 'Absolute Diamond',
        titleKo: '절대적 다이아몬드',
        description: '누구도 범접할 수 없는 완벽한 기준과 감각. 극강의 순수함과 예리함으로 세상을 정의합니다.'
      },
      space: {
        title: 'Pure Sanctuary',
        titleKo: '순수한 성소',
        description: '극도로 미니멀하고 투명한 공간. 거울과 유리 소재를 활용하여 명료함을 극대화하세요.'
      },
      item: {
        title: 'Silver Platinum',
        titleKo: '실버 플래티넘',
        description: '최고급 실버나 플래티넘 아이템. 변치 않는 순수함과 강인함을 동시에 표현하세요.'
      },
      style: {
        colors: ['은색', '금색', '화이트'],
        items: ['Fine Jewelry', 'Premium Item', 'Elegant Design']
      },
      mantra: {
        title: 'Crystal Clear',
        titleKo: '수정 같은 명료함',
        quote: '불순물 없는 진실만이 세상의 어둠을 뚫고 빛난다.'
      }
    },
    element: 'water',
    description: '당신은 광활한 바다처럼 깊고 넓습니다. 무한한 지혜와 포용력으로 모든 것을 담아내는 위대한 철학자입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 광활한 바다처럼 깊고 넓습니다. 무한한 지혜와 포용력으로 모든 것을 담아내는 위대한 철학자입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['검은색', '남색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '壬寅': {
    title: '큰 강',
    archetype: 'The Flowing Power',
    persona: {
    
          title: 'The River Pioneer',
          subtitle: '큰 강의 개척자',
          essence: '당신은 큰 강처럼 힘차게 흐릅니다. 강한 추진력과 유연성으로 새로운 길을 만들며 끊임없이 전진하는 모험가입니다.',
          vibe: ['🏞️ Powerful', '🚀 Dynamic', '💡 Creative', '⚡ Flowing']
    },
    ritual: {
      vibe: {
        title: 'Washing Gem',
        titleKo: '물에 씻긴 보석',
        description: '맑고 지혜로운 예술적 영혼. 당신의 직관은 맑은 물처럼 깊고, 표현은 보석처럼 아름답습니다.'
      },
      space: {
        title: 'Reflection Pond',
        titleKo: '반사의 연못',
        description: '물과 빛이 반사되는 투명한 느낌의 공간. 창의적인 휴식이 가능한 예술적 환경을 만드세요.'
      },
      item: {
        title: 'Crystal Prism',
        titleKo: '수정 프리즘',
        description: '투명한 유리 잔이나 수정 장식품. 당신의 맑고 예리한 영감을 상징합니다.'
      },
      style: {
        colors: ['은색', '금색', '화이트'],
        items: ['Fine Jewelry', 'Premium Item', 'Elegant Design']
      },
      mantra: {
        title: 'Pure Inspiration',
        titleKo: '순수한 영감',
        quote: '맑은 영혼이 빚어낸 예술이 세상을 정화한다.'
      }
    },
    element: 'water',
    description: '당신은 큰 강처럼 힘차게 흐릅니다. 강한 추진력과 유연성으로 새로운 길을 만들며 끊임없이 전진하는 모험가입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 큰 강처럼 힘차게 흐릅니다. 강한 추진력과 유연성으로 새로운 길을 만들며 끊임없이 전진하는 모험가입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['검은색', '남색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '壬辰': {
    title: '저수지',
    archetype: 'The Strategic Reservoir',
    persona: {
    
          title: 'The Reservoir Strategist',
          subtitle: '저수지의 전략가',
          essence: '당신은 저수지처럼 지혜를 담아둡니다. 전략적 사고와 실용성으로 필요한 때에 힘을 발휘하는 계획가입니다.',
          vibe: ['🏞️ Strategic', '💡 Pragmatic', '⚖️ Balanced', '🧠 Wise']
    },
    ritual: {
      vibe: {
        title: 'Deep Ocean',
        titleKo: '심연의 바다',
        description: '헤아릴 수 없는 깊은 지혜와 포용력. 당신의 침묵 속에는 거대한 흐름과 통찰이 숨겨져 있습니다.'
      },
      space: {
        title: 'Midnight Lounge',
        titleKo: '자정의 라운지',
        description: '짙은 네이비와 차분한 조명이 있는 공간. 깊은 사색에 잠길 수 있는 비밀스러운 장소가 필요합니다.'
      },
      item: {
        title: 'Black Ink',
        titleKo: '검은 잉크',
        description: '고급 만년필이나 먹색 저널. 당신의 깊은 생각을 담아내는 도구가 신비로움을 더해줍니다.'
      },
      style: {
        colors: ['검은색', '남색', '청록색'],
        items: ['Ink', 'Water Element', 'Deep Tone']
      },
      mantra: {
        title: 'Silence is Power',
        titleKo: '침묵은 힘이다',
        quote: '깊은 물은 소리 없이 흐르며 결국 대지를 품는다.'
      }
    },
    element: 'water',
    description: '당신은 저수지처럼 지혜를 담아둡니다. 전략적 사고와 실용성으로 필요한 때에 힘을 발휘하는 계획가입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 저수지처럼 지혜를 담아둡니다. 전략적 사고와 실용성으로 필요한 때에 힘을 발휘하는 계획가입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['검은색', '남색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '壬午': {
    title: '증기',
    archetype: 'The Transformative Force',
    persona: {
    
          title: 'The Steam Innovator',
          subtitle: '증기의 혁신가',
          essence: '당신은 물과 불이 만나 증기가 되듯 강력한 변화를 만듭니다. 지혜와 열정을 결합하여 혁신을 이끄는 체인지메이커입니다.',
          vibe: ['💨 Transformative', '🔥 Passionate', '💡 Innovative', '⚡ Powerful']
    },
    ritual: {
      vibe: {
        title: 'Rising Tide',
        titleKo: '밀려오는 파도',
        description: '창의적인 추진력과 생동감 넘치는 지성. 당신의 아이디어는 멈추지 않고 세상을 향해 뻗어 나갑니다.'
      },
      space: {
        title: 'Dynamic Studio',
        titleKo: '다이내믹 스튜디오',
        description: '개방형 공간과 나무 식물이 있는 환경. 에너지가 활기차게 순환될 때 창의성이 폭발합니다.'
      },
      item: {
        title: 'Movement Tracker',
        titleKo: '움직임의 도구',
        description: '스마트 워치나 여행 가방. 끊임없이 이동하고 도전하는 당신의 열정을 응원하세요.'
      },
      style: {
        colors: ['검은색', '남색', '청록색'],
        items: ['Ink', 'Water Element', 'Deep Tone']
      },
      mantra: {
        title: 'Go with Flow',
        titleKo: '흐름을 타라',
        quote: '도전하는 영혼은 결코 멈춰있는 물에 머물지 않는다.'
      }
    },
    element: 'water',
    description: '당신은 물과 불이 만나 증기가 되듯 강력한 변화를 만듭니다. 지혜와 열정을 결합하여 혁신을 이끄는 체인지메이커입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 물과 불이 만나 증기가 되듯 강력한 변화를 만듭니다. 지혜와 열정을 결합하여 혁신을 이끄는 체인지메이커입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['검은색', '남색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '壬申': {
    title: '샘물',
    archetype: 'The Clear Source',
    persona: {
    
          title: 'The Crystal Spring',
          subtitle: '수정 같은 샘물',
          essence: '당신은 맑은 샘물처럼 순수하고 깨끗합니다. 명확한 판단력과 정직함으로 진실을 추구하는 진리의 탐구자입니다.',
          vibe: ['💎 Pure', '🔍 Clear', '⚖️ Just', '💧 Honest']
    },
    ritual: {
      vibe: {
        title: 'Dragon Surge',
        titleKo: '승천하는 파도',
        description: '거대한 야망과 대범한 변혁의 리더십. 당신은 불가능해 보이는 일도 지혜로 돌파하는 힘이 있습니다.'
      },
      space: {
        title: 'Grand Command',
        titleKo: '거대한 지휘소',
        description: '웅장한 가구와 상징적인 소품이 있는 공간. 당신의 야망을 실현할 수 있는 넓은 무대를 조성하세요.'
      },
      item: {
        title: 'Antique Seal',
        titleKo: '품격 있는 서명',
        description: '황동 인장이나 묵직한 도장. 당신의 결정에 무게를 더하는 아이템을 선택하세요.'
      },
      style: {
        colors: ['검은색', '남색', '청록색'],
        items: ['Ink', 'Water Element', 'Deep Tone']
      },
      mantra: {
        title: 'Rise Above',
        titleKo: '경계를 넘어서',
        quote: '진정한 용기는 거친 파도를 타고 하늘로 오르는 자의 것이다.'
      }
    },
    element: 'water',
    description: '당신은 맑은 샘물처럼 순수하고 깨끗합니다. 명확한 판단력과 정직함으로 진실을 추구하는 진리의 탐구자입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 맑은 샘물처럼 순수하고 깨끗합니다. 명확한 판단력과 정직함으로 진실을 추구하는 진리의 탐구자입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['검은색', '남색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '壬戌': {
    title: '우물',
    archetype: 'The Reliable Source',
    persona: {
    
          title: 'The Well of Wisdom',
          subtitle: '지혜의 우물',
          essence: '당신은 우물처럼 언제나 신뢰할 수 있습니다. 충실하게 지혜를 나누며, 공동체를 위해 헌신하는 현명한 멘토입니다.',
          vibe: ['🏛️ Reliable', '🧠 Wise', '💝 Generous', '⏳ Enduring']
    },
    ritual: {
      vibe: {
        title: 'Sparkling Sea',
        titleKo: '반짝이는 바다',
        description: '지성과 열정이 완벽하게 조화된 매력. 당신의 다재다능함은 세상 어디에서든 눈부시게 빛납니다.'
      },
      space: {
        title: 'Vibrant Salon',
        titleKo: '생기 넘치는 살롱',
        description: '세련된 감각과 밝은 에너지가 흐르는 공간. 사람들과 교류하며 영감을 주고받는 환경이 좋습니다.'
      },
      item: {
        title: 'Bright Lens',
        titleKo: '밝은 렌즈',
        description: '세련된 선글라스나 카메라. 당신의 예민한 시각과 감각을 보여주는 도구를 활용하세요.'
      },
      style: {
        colors: ['검은색', '남색', '청록색'],
        items: ['Ink', 'Water Element', 'Deep Tone']
      },
      mantra: {
        title: 'Active Wisdom',
        titleKo: '실천적 지혜',
        quote: '열정이 지혜를 만날 때 세상은 당신의 무대가 된다.'
      }
    },
    element: 'water',
    description: '당신은 우물처럼 언제나 신뢰할 수 있습니다. 충실하게 지혜를 나누며, 공동체를 위해 헌신하는 현명한 멘토입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 우물처럼 언제나 신뢰할 수 있습니다. 충실하게 지혜를 나누며, 공동체를 위해 헌신하는 현명한 멘토입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['검은색', '남색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  // ============================================================
  // 癸 (음수) - 이슬, 빗물
  // ============================================================

  '癸丑': {
    title: '이슬',
    archetype: 'The Gentle Nurturer',
    persona: {
    
          title: 'The Morning Dew Healer',
          subtitle: '이슬의 치유자',
          essence: '당신은 이슬처럼 조용히 스며듭니다. 섬세한 배려와 인내심으로 보이지 않게 타인을 돕는 숨은 영웅입니다.',
          vibe: ['💧 Gentle', '🌱 Nurturing', '💝 Caring', '⏳ Patient']
    },
    ritual: {
      vibe: {
        title: 'Metallic River',
        titleKo: '금속의 강',
        description: '예리한 분석력과 유연한 처세술. 불필요한 고집을 버리고 실리에 따라 영리하게 움직이는 전략가입니다.'
      },
      space: {
        title: 'High-Tech Lab',
        titleKo: '하이테크 연구소',
        description: '최신 기기와 깔끔한 금속 소재가 있는 공간. 효율성과 지능이 강조된 환경에서 당신은 승리합니다.'
      },
      item: {
        title: 'Smart Device',
        titleKo: '스마트 기기',
        description: '최고 사양의 디지털 장비나 메탈릭 소품. 당신의 명민함을 시각화하는 필수 아이템입니다.'
      },
      style: {
        colors: ['검은색', '남색', '청록색'],
        items: ['Ink', 'Water Element', 'Deep Tone']
      },
      mantra: {
        title: 'Flexible Logic',
        titleKo: '유연한 논리',
        quote: '강한 것은 꺾이지만, 지혜로운 흐름은 끝내 살아남는다.'
      }
    },
    element: 'water',
    description: '당신은 이슬처럼 조용히 스며듭니다. 섬세한 배려와 인내심으로 보이지 않게 타인을 돕는 숨은 영웅입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 이슬처럼 조용히 스며듭니다. 섬세한 배려와 인내심으로 보이지 않게 타인을 돕는 숨은 영웅입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['청록색', '보라색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '癸卯': {
    title: '봄비',
    archetype: 'The Gentle Catalyst',
    persona: {
    
          title: 'The Spring Rain Catalyst',
          subtitle: '봄비의 촉매제',
          essence: '당신은 봄비처럼 부드럽게 생명을 키웁니다. 창의적 감성과 조화로운 접근으로 성장을 촉진하는 크리에이티브 힐러입니다.',
          vibe: ['🌧️ Gentle', '🌱 Nurturing', '🎨 Creative', '🌸 Harmonious']
    },
    ritual: {
      vibe: {
        title: 'Deep Reservoir',
        titleKo: '깊은 저수지',
        description: '내면에 엄청난 에너지를 축적한 현자. 겉으로는 조용해 보이지만 필요한 순간 거대한 영향력을 발휘합니다.'
      },
      space: {
        title: 'Private Archive',
        titleKo: '비밀 보관소',
        description: '석재와 두꺼운 우드가 조화된 차분한 공간. 지식과 힘을 쌓을 수 있는 아늑한 장소를 가지세요.'
      },
      item: {
        title: 'Vintage Record',
        titleKo: '빈티지 레코드',
        description: '오래된 LP판이나 아날로그 시계. 시간의 깊이가 담긴 아이템이 당신의 무게감을 더해줍니다.'
      },
      style: {
        colors: ['검은색', '남색', '청록색'],
        items: ['Ink', 'Water Element', 'Deep Tone']
      },
      mantra: {
        title: 'Wait for Surge',
        titleKo: '축적의 지혜',
        quote: '가장 큰 힘은 가장 낮은 곳에서 소리 없이 채워진다.'
      }
    },
    element: 'water',
    description: '당신은 봄비처럼 부드럽게 생명을 키웁니다. 창의적 감성과 조화로운 접근으로 성장을 촉진하는 크리에이티브 힐러입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 봄비처럼 부드럽게 생명을 키웁니다. 창의적 감성과 조화로운 접근으로 성장을 촉진하는 크리에이티브 힐러입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['청록색', '보라색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '癸巳': {
    title: '안개',
    archetype: 'The Mysterious Intuitive',
    persona: {
    
          title: 'The Mist Mystic',
          subtitle: '안개의 신비주의자',
          essence: '당신은 안개처럼 신비롭고 직관적입니다. 뛰어난 감수성과 통찰력으로 보이지 않는 세계를 탐구하는 몽환적 예술가입니다.',
          vibe: ['🌫️ Mystical', '🔮 Intuitive', '🎨 Artistic', '✨ Enigmatic']
    },
    ritual: {
      vibe: {
        title: 'Frozen Spring',
        titleKo: '얼어붙은 샘물',
        description: '인내 속에 흐르는 예리한 지혜. 차가운 현실 속에서도 결코 희망을 잃지 않고 길을 찾아내는 끈기가 있습니다.'
      },
      space: {
        title: 'Minimal Studio',
        titleKo: '미니멀 작업실',
        description: '무채색 톤과 차가운 소재가 강조된 조용한 공간. 집중을 방해하는 요소를 제거한 환경이 필수입니다.'
      },
      item: {
        title: 'Silver Point',
        titleKo: '실버 포인트',
        description: '심플한 실버 반지나 시계. 정갈한 이미지가 당신의 예리한 통찰력을 돋보이게 합니다.'
      },
      style: {
        colors: ['검은색', '보라색', '청록색'],
        items: ['Crystal', 'Spiritual Item', 'Deep Mystic']
      },
      mantra: {
        title: 'Patient Wisdom',
        titleKo: '인내하는 지혜',
        quote: '얼음 아래 흐르는 물이 가장 먼저 봄의 소식을 안다.'
      }
    },
    element: 'water',
    description: '당신은 안개처럼 신비롭고 직관적입니다. 뛰어난 감수성과 통찰력으로 보이지 않는 세계를 탐구하는 몽환적 예술가입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 안개처럼 신비롭고 직관적입니다. 뛰어난 감수성과 통찰력으로 보이지 않는 세계를 탐구하는 몽환적 예술가입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['청록색', '보라색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '癸未': {
    title: '저녁 이슬',
    archetype: 'The Quiet Healer',
    persona: {
    
          title: 'The Evening Dew Nurturer',
          subtitle: '저녁 이슬의 양육자',
          essence: '당신은 저녁 이슬처럼 조용히 치유합니다. 깊은 공감 능력과 섬세한 배려로 타인의 상처를 감싸주는 힐링의 화신입니다.',
          vibe: ['💧 Healing', '💝 Compassionate', '🌸 Gentle', '✨ Soothing']
    },
    ritual: {
      vibe: {
        title: 'Morning Dew',
        titleKo: '아침 이슬',
        description: '순수하고 맑은 감수성과 창의력. 당신의 섬세한 표현력은 사람들의 마음을 치유하는 촉촉한 비와 같습니다.'
      },
      space: {
        title: 'Botanical Atelier',
        titleKo: '보태니컬 아틀리에',
        description: '작은 화분과 밝은 나무 가구가 있는 공간. 자연스럽고 감성적인 환경이 당신의 영감을 자극합니다.'
      },
      item: {
        title: 'Healing Scent',
        titleKo: '치유의 향기',
        description: '은은한 비누 향이나 허브 향수. 당신의 순수한 매력을 한층 더 깊이 있게 전달합니다.'
      },
      style: {
        colors: ['검은색', '보라색', '청록색'],
        items: ['Crystal', 'Spiritual Item', 'Deep Mystic']
      },
      mantra: {
        title: 'Gently Touch',
        titleKo: '부드러운 손길',
        quote: '작은 이슬 한 방울이 마침내 거대한 숲을 깨운다.'
      }
    },
    element: 'water',
    description: '당신은 저녁 이슬처럼 조용히 치유합니다. 깊은 공감 능력과 섬세한 배려로 타인의 상처를 감싸주는 힐링의 화신입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 저녁 이슬처럼 조용히 치유합니다. 깊은 공감 능력과 섬세한 배려로 타인의 상처를 감싸주는 힐링의 화신입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['청록색', '보라색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '癸酉': {
    title: '이슬방울',
    archetype: 'The Delicate Perfectionist',
    persona: {
    
          title: 'The Dewdrop Perfectionist',
          subtitle: '이슬방울의 완벽주의자',
          essence: '당신은 이슬방울처럼 섬세하고 완벽합니다. 순수한 감성과 높은 미적 기준으로 아름다움의 정수를 추구하는 퓨어리스트입니다.',
          vibe: ['💎 Pure', '✨ Delicate', '🎨 Aesthetic', '🌸 Refined']
    },
    ritual: {
      vibe: {
        title: 'Pure Drop',
        titleKo: '순수한 이슬방울',
        description: '결점 없는 완벽주의와 날카로운 직관. 당신의 정교함과 순수함은 누구도 범접할 수 없는 예술의 경지에 가깝습니다.'
      },
      space: {
        title: 'Pure White Space',
        titleKo: '순백의 공간',
        description: '티 하나 없는 깨끗한 화이트 톤 공간. 투명한 유리 소재가 당신의 명료한 정신과 어울립니다.'
      },
      item: {
        title: 'Crystal Jewelry',
        titleKo: '수정 주얼리',
        description: '투명하고 반짝이는 수정이나 다이아몬드. 당신의 순수함과 완벽한 감각을 상징합니다.'
      },
      style: {
        colors: ['검은색', '보라색', '청록색'],
        items: ['Crystal', 'Spiritual Item', 'Deep Mystic']
      },
      mantra: {
        title: 'Clean Perfection',
        titleKo: '순수한 완벽함',
        quote: '맑은 영혼은 가장 날카로운 진실을 비추는 거울이다.'
      }
    },
    element: 'water',
    description: '당신은 이슬방울처럼 섬세하고 완벽합니다. 순수한 감성과 높은 미적 기준으로 아름다움의 정수를 추구하는 퓨어리스트입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 이슬방울처럼 섬세하고 완벽합니다. 순수한 감성과 높은 미적 기준으로 아름다움의 정수를 추구하는 퓨어리스트입니다."
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['청록색', '보라색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  },

  '癸亥': {
    title: '깊은 우물',
    archetype: 'The Profound Mystic',
    persona: {
    
          title: 'The Deep Well Mystic',
          subtitle: '깊은 우물의 신비가',
          essence: '당신은 깊은 우물처럼 무한한 지혜를 품고 있습니다. 뛰어난 직관력과 상상력으로 영혼의 깊이를 탐구하는 스피리추얼 아티스트입니다.',
          vibe: ['🌊 Profound', '🔮 Mystical', '✨ Imaginative', '🕉️ Spiritual']
    },
    ritual: {
      vibe: {
        title: 'Infinite Ocean',
        titleKo: '끝없는 바다',
        description: '모든 것을 수용하는 거대한 지혜와 영적 통찰. 당신의 깊이는 세상을 품고도 남을 만큼 광활하고 신비롭습니다.'
      },
      space: {
        title: 'Dreamy Retreat',
        titleKo: '꿈의 휴식처',
        description: '파란 포인트 조명과 고요한 음악이 있는 공간. 현실을 넘어 영적 성찰이 가능한 환경을 조성하세요.'
      },
      item: {
        title: 'Fluid Blue',
        titleKo: '흐르는 블루',
        description: '딥 블루 컬러의 아이템이나 흐르는 소재의 옷. 당신의 깊고 신비로운 아우라를 완성합니다.'
      },
      style: {
        colors: ['검은색', '보라색', '청록색'],
        items: ['Crystal', 'Spiritual Item', 'Deep Mystic']
      },
      mantra: {
        title: 'Unity in Flow',
        titleKo: '흐름 속의 일치',
        quote: '모든 물줄기는 결국 하나로 만나 거대한 바다를 이룬다.'
      }
    },
    element: 'water',
    description: '당신은 깊은 우물처럼 무한한 지혜를 품고 있습니다. 뛰어난 직관력과 상상력으로 영혼의 깊이를 탐구하는 스피리추얼 아티스트입니다.',
    personality:     [
      {
        "trait": "본질",
        "icon": "✨",
        "description": "당신은 깊은 우물처럼 무한한 지혜를 품고 있습니다. 뛰어난 직관력과 상상력으로 영혼의 깊이를 탐구하는 스피리추얼 아티스트입니다…"
      },
      {
        "trait": "에너지",
        "icon": "⚡",
        "description": "균형 잡힌 접근으로 목표를 향해 나아갑니다."
      }
    ],
    strengths: [
      '잠재력',
      '적응력',
      '성장'
    ],
    challenges: [
      '균형 유지',
      '감정 조절'
    ],
    career: {
      best: ['리더십', '기획', '전략'],
      avoid: ['단조로운 반복']
    },
    relationship: {
      style: '협력적',
      compatibility: {
        best: ['상생 오행'],
        good: ['중화되는 조합'],
        challenging: ['상극 오행']
      }
    },
    luckyElements: {
      colors: ['청록색', '보라색'],
      numbers: [1, 2, 3],
      directions: ['동', '남', '북']
    }
  }
}

// Helper: vibe 문자열 배열 → personality 카드 4개 (모든 결과 페이지에서 일주 상세 노출용)
const TRAIT_DESCRIPTIONS: Record<string, string> = {
  Potential: '어둠 속에서도 싹틀 준비가 된 잠재력. 깊은 통찰과 생명력으로 새로운 시작을 만듭니다.',
  Wise: '깊은 통찰력과 지혜로 상황의 본질을 꿰뚫어 봅니다.',
  Pioneering: '두려움 없이 새로운 길을 개척하는 선구자적 에너지입니다.',
  Intuitive: '직관이 발달해 보이지 않는 흐름을 읽고 앞서 대응합니다.',
  Strong: '강인한 생명력과 정신력으로 어떤 환경에서도 버팁니다.',
  Bold: '과감한 결단과 실행력으로 도전을 즐깁니다.',
  Leader: '타고난 카리스마로 주변을 이끌고 리더십을 발휘합니다.',
  Dynamic: '역동적인 에너지로 빠르게 움직이고 변화를 이끕니다.',
  Grounded: '뿌리 깊은 안정감으로 현실을 바라보고 실천합니다.',
  Visionary: '먼 미래를 그리며 비전을 제시하는 힘이 있습니다.',
  Balanced: '균형 감각이 뛰어나 조화와 중용을 추구합니다.',
  Growing: '끊임없이 성장하려는 의지와 학습 욕구가 있습니다.',
  Passionate: '뜨거운 열정으로 하고 싶은 일에 몸을 던집니다.',
  Creative: '창의력이 풍부해 새로운 아이디어와 표현을 만들어 냅니다.',
  Innovative: '기존을 넘어 새로운 방식과 해법을 추구합니다.',
  Energetic: '넘치는 에너지로 주변을 밝히고 움직입니다.',
  Refined: '세련된 감각과 품격을 추구하며 다듬어진 매력을 냅니다.',
  Artistic: '예술적 감수성이 있어 아름다움과 표현을 중시합니다.',
  Elegant: '우아하고 절제된 태도로 품격을 유지합니다.',
  Cultured: '깊은 교양과 넓은 시야로 세상을 이해합니다.',
  Steadfast: '어떤 압력에도 흔들리지 않고 원칙을 지킵니다.',
  Protective: '지키고 싶은 대상을 성벽처럼 감싸고 지키는 보호 본능이 강합니다.',
  Reliable: '말과 행동이 일치해 믿음직한 존재감을 줍니다.',
  Noble: '품위와 도덕성을 지키며 높은 기준을 유지합니다.',
  Patient: '인내심으로 기다리며 때를 알아 차립니다.',
  Nurturing: '꾸준히 가꾸고 키우는 양육의 에너지가 있습니다.',
  Persistent: '끈기 있게 목표를 향해 나아갑니다.',
  Gentle: '부드럽고 온화한 태도로 주변을 편안하게 합니다.',
  Harmonious: '조화를 추구하며 갈등을 줄이고 평화를 만듭니다.',
  Peaceful: '고요함과 평화를 중시하며 마음을 가다듭습니다.',
  Healing: '상처를 어루만지고 회복시키는 힘이 있습니다.',
  Graceful: '우아하고 유연하게 상황에 맞춥니다.',
  Resilient: '넘어져도 다시 일어나는 회복력이 있습니다.',
  Caring: '남을 배려하고 보살피는 마음이 큽니다.',
  Aesthetic: '아름다움과 감각을 중시하며 미를 추구합니다.',
  Delicate: '섬세하고 정교한 감각을 갖고 있습니다.',
  Dreamy: '상상력이 풍부하고 꿈과 비전을 품습니다.',
  Mystical: '신비로운 직관과 영적인 감수성이 있습니다.',
  Warming: '따뜻한 에너지로 주변을 녹이고 포용합니다.',
  Hopeful: '희망을 품고 앞을 밝게 바라봅니다.',
  Compassionate: '타인의 아픔에 공감하고 위로합니다.',
  Inspiring: '영감을 주어 다른 이가 움직이게 합니다.',
  Energizing: '주변에 활력과 동력을 불어넣습니다.',
  Steady: '흔들리지 않는 안정감으로 신뢰를 줍니다.',
  Radiant: '밝은 존재감으로 주변을 비춥니다.',
  Regal: '당당하고 위엄 있는 기품이 있습니다.',
  Authentic: '진정한 자신으로 살려는 모습이 분명합니다.',
  Powerful: '강한 영향력과 존재감을 지닙니다.',
  Tender: '부드럽고 세심하게 대합니다.',
  Romantic: '이상과 아름다움을 추구하는 로맨틱한 성향이 있습니다.',
  Brilliant: '뛰어난 재능과 빛나는 매력이 있습니다.',
  Insightful: '핵심을 꿰뚫는 통찰력이 있습니다.',
  Enigmatic: '깊고 다가가기 어려운 매력이 있습니다.',
  Meticulous: '꼼꼼하고 정확하게 세부까지 챙깁니다.',
  Whimsical: '자유롭고 독특한 상상력이 있습니다.',
  Flexible: '유연하게 상황에 맞춰 대처합니다.',
  Philosophical: '깊이 사유하고 본질을 묻습니다.',
  Adaptable: '환경에 잘 적응하며 변화를 받아들입니다.',
  Majestic: '위엄 있고 당당한 기세가 있습니다.',
  Authoritative: '권위와 리더십을 자연스럽게 발휘합니다.',
  Responsible: '책임감 있게 맡은 바를 해냅니다.',
  Abundant: '넉넉한 마음과 풍요로운 에너지를 나눕니다.',
  Pragmatic: '현실적이고 실용적으로 판단합니다.',
  Strategic: '전략적으로 생각하고 행동합니다.',
  Sustainable: '지속 가능한 방식으로 꾸준히 나아갑니다.',
  Bright: '밝고 긍정적인 에너지를 풍깁니다.',
  Leading: '앞장서서 이끄는 역할을 맡습니다.',
  Decisive: '결단력 있게 결정하고 실행합니다.',
  Solid: '견고하고 믿음직한 기반을 제공합니다.',
  Systematic: '체계적으로 정리하고 진행합니다.',
  Principled: '원칙과 기준이 분명합니다.',
  Enduring: '시간이 지나도 지속하는 책임감과 끈기가 있습니다.',
  Loyal: '한번 믿으면 변하지 않는 신의와 소속감을 보여줍니다.',
  Precious: '소중히 여기고 가꾸는 마음이 있습니다.',
  Subtle: '은은하고 깊은 매력이 있습니다.',
  Sensitive: '예민한 감수성으로 세상을 읽습니다.',
  Sharp: '날카로운 분석력과 판단력이 있습니다.',
  Clear: '명확한 사고와 표현으로 소통합니다.',
  Analytical: '논리적으로 분석하고 정리합니다.',
  Just: '공정과 정의를 추구합니다.',
  Courageous: '두려움을 넘어 용기를 내어 행동합니다.',
  Perfect: '완성도와 완벽함을 추구합니다.',
  Masterful: '한 분야에 깊이 있어 마스터한 기량을 보입니다.',
  Focused: '한곳에 집중하여 깊이 파고듭니다.',
  Flawless: '흠 없이 다듬어진 모습을 지향합니다.',
  Foundational: '튼튼한 기반을 만들어 지탱합니다.',
  Generous: '아낌없이 나누고 베푸는 마음이 있습니다.',
  Pure: '순수하고 거짓 없는 본성을 지닙니다.',
  Honest: '정직하고 솔직하게 대합니다.',
  Soothing: '편안하고 위안이 되는 존재감이 있습니다.',
  Spiritual: '영적 감수성과 깊은 사유가 있습니다.',
  Profound: '깊고 넓은 통찰을 가집니다.',
  Expansive: '넓은 시야와 포용력이 있습니다.',
  Flowing: '흐름에 맞춰 유연하게 움직입니다.',
  Transformative: '변화를 이끌고 새롭게 만드는 힘이 있습니다.',
  Warm: '따뜻한 마음으로 대합니다.',
}

/** vibe 문자열(예: '🗿 Solid') → 태그에 쓸 한글 라벨 */
const TRAIT_LABEL_KO: Record<string, string> = {
  Potential: '잠재력', Wise: '지혜', Pioneering: '선구자', Intuitive: '직관', Strong: '강인함', Bold: '과감함', Leader: '리더십', Dynamic: '역동적', Grounded: '안정적', Visionary: '비전', Balanced: '균형', Growing: '성장', Passionate: '열정', Creative: '창의', Innovative: '혁신', Energetic: '에너지', Refined: '세련됨', Artistic: '예술적', Elegant: '우아함', Cultured: '교양', Steadfast: '흔들림 없음', Protective: '보호', Reliable: '믿음직함', Noble: '품위', Patient: '인내', Nurturing: '양육', Persistent: '끈기', Gentle: '부드러움', Harmonious: '조화', Peaceful: '평화', Healing: '치유', Graceful: '우아함', Resilient: '회복력', Caring: '배려', Aesthetic: '미적', Delicate: '섬세함', Dreamy: '몽상', Mystical: '신비', Warming: '따뜻함', Hopeful: '희망', Compassionate: '연민', Inspiring: '영감', Energizing: '활력', Steady: '안정', Radiant: '빛남', Regal: '당당함', Authentic: '진정성', Powerful: '강함', Tender: '다정함', Romantic: '로맨틱', Brilliant: '빼어남', Insightful: '통찰', Enigmatic: '신비로움', Meticulous: '꼼꼼함', Whimsical: '자유상상', Flexible: '유연함', Philosophical: '사유', Adaptable: '적응력', Majestic: '위엄', Authoritative: '권위', Responsible: '책임감', Abundant: '풍요', Pragmatic: '현실적', Strategic: '전략적', Sustainable: '지속가능', Bright: '밝음', Leading: '선도', Decisive: '결단', Solid: '견고함', Systematic: '체계적', Principled: '원칙적', Enduring: '끈기', Loyal: '충성', Precious: '소중함', Subtle: '은은함', Sensitive: '감수성', Sharp: '날카로움', Clear: '명확함', Analytical: '분석력', Just: '공정', Courageous: '용기', Perfect: '완벽', Masterful: '숙련', Focused: '집중', Flawless: '완벽함', Foundational: '기반', Generous: '관대함', Pure: '순수', Honest: '정직', Soothing: '위안', Spiritual: '영적', Profound: '깊음', Expansive: '포용', Flowing: '흐름', Transformative: '변혁', Warm: '따뜻함',
}

export function getVibeLabelKo(vibe: string): string {
  const parts = vibe.trim().split(/\s+/)
  const trait = parts.slice(1).join(' ') || parts[0]
  return TRAIT_LABEL_KO[trait] ?? trait
}

function expandVibeToPersonality(vibe: string[] | undefined): Array<{ trait: string; icon: string; description: string }> {
  if (!vibe?.length) return []
  return vibe.map((s) => {
    const parts = s.trim().split(/\s+/)
    const icon = parts[0] ?? '✨'
    const trait = parts.slice(1).join(' ') || parts[0]
    const description = TRAIT_DESCRIPTIONS[trait] ?? '당신의 핵심 에너지입니다.'
    return { trait, icon, description }
  })
}

// Helper 함수들
export function hasDayPillarData(stem: string, branch: string): boolean {
  const key = `${stem}${branch}`
  return key in PILLAR_INTERPRETATIONS
}

export function getDayPillarInterpretation(stem: string, branch: string): PillarInterpretation {
  const key = `${stem}${branch}`
  const data = PILLAR_INTERPRETATIONS[key]
  if (!data) throw new Error(`No pillar interpretation for ${key}`)
  const basePersonality = data.personality ?? []
  const hasVibeCards = basePersonality.length > 2
  let personality = hasVibeCards
    ? basePersonality
    : [...basePersonality, ...expandVibeToPersonality(data.persona?.vibe)]
  // 본질(또는 첫 번째 성격) 설명이 말줄임(…)으로 끝나면 pillar 전체 설명으로 채움
  const fullEssence = data.description || data.persona?.essence || ''
  personality = personality.map((p, i) => {
    if (i === 0 && fullEssence && (p.description.endsWith('…') || p.description.endsWith('...')))
      return { ...p, description: fullEssence }
    return p
  })
  const overrides = PILLAR_STRENGTHS_CHALLENGES_CAREER[key]
  return {
    ...data,
    personality,
    strengths: overrides?.strengths ?? data.strengths,
    challenges: overrides?.challenges ?? data.challenges,
    career: overrides?.career ?? data.career,
  }
}
