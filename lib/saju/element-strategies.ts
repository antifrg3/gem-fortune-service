/**
 * 오행별 전략 데이터: Elemental Strategy, Synergy Code, Growth Path
 */

import type { Element } from './types'

export const ELEMENT_STRATEGIES: Record<
  Element,
  {
    strategy: {
      when_dominant: {
        warning: string
        control_principle: string
        description: string
        core_practices: string[]
        mindset: string
      }
      when_deficient: {
        impact: string
        boost_principle: string
        description: string
        core_practices: string[]
        mindset: string
      }
    }
    synergy: {
      best_partner_type: string
      partner_dynamic: string
      partner_description: string
      partner_traits: string[]
      best_environment: string
      environment_description: string
      ideal_spaces: string[]
      energy_activation: string
    }
    growth_path: {
      life_season_metaphor: string
      eternal_theme: string
      early_phase: { age_range: string; theme: string; guidance: string }
      middle_phase: { age_range: string; theme: string; guidance: string }
      late_phase: { age_range: string; theme: string; guidance: string }
      lifelong_practice: string
    }
  }
> = {
  wood: {
    strategy: {
      when_dominant: {
        warning: '끊임없는 확장 욕구가 당신을 산만하게 만듭니다',
        control_principle: '가지치기의 미학',
        description: '모든 가능성을 쫓지 마세요. 선택과 집중이 진정한 성장을 만듭니다.',
        core_practices: [
          '동시 진행은 최대 3개 프로젝트로 제한',
          '새로운 시작 전에 하나를 완성하는 규칙',
          '의도적인 정체기를 두려워하지 않기',
        ],
        mindset: '더 넓게가 아니라 더 깊게. 뿌리가 깊어야 나무가 흔들리지 않는다.',
      },
      when_deficient: {
        impact: '정체와 경직이 당신의 잠재력을 가둡니다',
        boost_principle: '새싹의 용기',
        description: '완벽한 준비를 기다리지 마세요. 작은 시도가 큰 변화를 만듭니다.',
        core_practices: [
          '매주 한 번은 해본 적 없는 것 시도',
          '편안한 루틴에서 의도적으로 벗어나기',
          '실패를 성장의 데이터로 재정의하기',
        ],
        mindset: '씨앗은 언제나 어둠 속에서 먼저 싹을 틔운다. 두려움 속에서 시작하라.',
      },
    },
    synergy: {
      best_partner_type: 'Fire (火)',
      partner_dynamic: '당신의 아이디어에 불을 붙이는 실행자',
      partner_description: '木은 火를 만나 비로소 빛을 냅니다. 열정적이고 추진력 있는 사람이 당신의 창의성을 현실로 만들어줍니다.',
      partner_traits: ['결단력', '추진력', '열정', '행동력'],
      best_environment: '유동적이고 개방적인 공간',
      environment_description: '경직된 구조보다는 자유로운 분위기에서 최고의 성과를 냅니다.',
      ideal_spaces: ['자연광이 풍부한 오픈 오피스', '식물이 있는 창의적 작업실', '카페나 공원 같은 유연한 공간'],
      energy_activation: '새로운 자극과 다양성이 당신을 깨웁니다. 같은 환경에 오래 머물지 마세요.',
    },
    growth_path: {
      life_season_metaphor: '봄 - 끊임없는 성장의 계절',
      eternal_theme: '확장과 집중의 균형',
      early_phase: {
        age_range: '0-30세',
        theme: '무한한 가능성 탐색',
        guidance: '이 시기의 木 에너지는 모든 방향으로 뻗어나갑니다. 다양한 경험을 두려워하지 마세요. 단, 3년에 한 번은 반드시 하나를 완성하세요.',
      },
      middle_phase: {
        age_range: '30-60세',
        theme: '선택적 성장과 깊이',
        guidance: '이제는 모든 가능성을 쫓지 마세요. 당신이 진정으로 키우고 싶은 한두 그루의 나무를 선택하고, 그것에 집중하세요. 가지를 치는 용기가 필요한 시기입니다.',
      },
      late_phase: {
        age_range: '60세 이후',
        theme: '거목으로서의 포용',
        guidance: '이제 당신은 다른 이들에게 그늘을 제공하는 큰 나무입니다. 새로운 성장보다는 당신의 경험과 지혜를 나누는 데 집중하세요.',
      },
      lifelong_practice: '평생의 과제는 "확장"과 "집중"의 균형입니다. 넓게 뻗되 깊게 뿌리내리세요.',
    },
  },
  fire: {
    strategy: {
      when_dominant: {
        warning: '타오르는 열정이 당신을 태워버릴 수 있습니다',
        control_principle: '지속 가능한 불꽃',
        description: '모든 것을 한 번에 태우지 마세요. 꺼지지 않는 작은 불씨가 더 오래 갑니다.',
        core_practices: [
          '에너지 사용은 80%로 제한하고 20%는 회복에 투자',
          '의무적인 휴식 시간 확보 (협상 불가)',
          '감정적 결정 전 24시간 대기 규칙',
        ],
        mindset: '가장 밝은 불꽃이 아니라 가장 오래 타는 불꽃이 되라.',
      },
      when_deficient: {
        impact: '꺼진 열정이 당신을 무기력하게 만듭니다',
        boost_principle: '불씨 살리기',
        description: '작은 도전이 꺼진 불을 다시 지핍니다. 안전지대에서 벗어나세요.',
        core_practices: [
          '매일 심장 박동이 빨라지는 활동 하나',
          '불가능해 보이는 목표 하나 세우기',
          '두려움을 느끼는 선택을 의도적으로 하기',
        ],
        mindset: '불은 산소를 만나 타오른다. 편안함은 산소가 아니다.',
      },
    },
    synergy: {
      best_partner_type: 'Earth (土)',
      partner_dynamic: '당신의 열정을 형태로 만드는 구조화자',
      partner_description: '火는 土를 만나 안정됩니다. 차분하고 실무적인 사람이 당신의 에너지를 구체적 성과로 바꿔줍니다.',
      partner_traits: ['안정성', '실행력', '체계성', '인내심'],
      best_environment: '역동적이지만 구조화된 공간',
      environment_description: '자유롭게 타오를 수 있되, 통제할 수 있는 환경이 최적입니다.',
      ideal_spaces: ['에너지 넘치는 스타트업 사무실', '목표가 명확한 프로젝트 팀', '도전적이지만 안전한 실험실'],
      energy_activation: '명확한 목표와 긴박함이 당신을 깨웁니다. 안일함을 경계하세요.',
    },
    growth_path: {
      life_season_metaphor: '여름 - 타오르는 정점의 계절',
      eternal_theme: '열정과 지속의 균형',
      early_phase: {
        age_range: '0-30세',
        theme: '폭발적 에너지 분출',
        guidance: '이 시기는 마음껏 타오르세요. 실패해도 다시 일어설 회복력이 있습니다. 단, 완전히 타버리지 않도록 정기적 휴식은 필수입니다.',
      },
      middle_phase: {
        age_range: '30-60세',
        theme: '효율적인 에너지 관리',
        guidance: '이제는 선택적으로 타오르세요. 모든 일에 100%를 쏟지 마세요. 당신의 불꽃이 필요한 곳에만 집중하세요.',
      },
      late_phase: {
        age_range: '60세 이후',
        theme: '온기로서의 존재',
        guidance: '더 이상 타오를 필요는 없습니다. 이제는 따뜻한 온기로 주변을 비추는 것으로 충분합니다.',
      },
      lifelong_practice: '평생의 과제는 "타오름"과 "지속"의 균형입니다. 꺼지지 않되 타버리지도 마세요.',
    },
  },
  earth: {
    strategy: {
      when_dominant: {
        warning: '과도한 안정 추구가 성장을 멈추게 합니다',
        control_principle: '유연한 대지',
        description: '모든 것을 통제하려 하지 마세요. 때로는 흔들림이 더 단단한 기반을 만듭니다.',
        core_practices: [
          '루틴은 70%, 변화는 30%의 비율 유지',
          '계획에 없던 일을 주 1회 의도적으로 수용',
          '완벽한 준비보다 80% 시작하기',
        ],
        mindset: '가장 단단한 땅도 물이 흐르게 해야 생명을 키운다.',
      },
      when_deficient: {
        impact: '기반 없는 성장이 모래성처럼 무너집니다',
        boost_principle: '뿌리 내리기',
        description: '흩어진 에너지를 모으세요. 작은 습관의 반복이 큰 안정을 만듭니다.',
        core_practices: [
          '매일 같은 시간 기상/취침',
          '하루 루틴 3가지 고정하기',
          '장기 목표를 작은 단계로 나누기',
        ],
        mindset: '큰 건물은 보이지 않는 기초 위에 서 있다. 지루한 반복을 경멸하지 마라.',
      },
    },
    synergy: {
      best_partner_type: 'Metal (金)',
      partner_dynamic: '당신의 안정을 가치로 변환하는 연금술사',
      partner_description: '土는 金을 만나 빛납니다. 섬세하고 완벽주의적인 사람이 당신의 포용력을 탁월함으로 승화시킵니다.',
      partner_traits: ['정밀함', '완벽주의', '심미안', '품질 지향'],
      best_environment: '체계적이고 안정적인 공간',
      environment_description: '예측 가능한 구조 속에서 최고의 성과를 냅니다.',
      ideal_spaces: ['정돈된 전통적 사무실', '시스템이 확립된 조직', '안정적인 장기 프로젝트'],
      energy_activation: '명확한 책임과 신뢰가 당신을 깨웁니다. 혼돈을 경계하세요.',
    },
    growth_path: {
      life_season_metaphor: '늦여름 - 수확을 준비하는 계절',
      eternal_theme: '안정과 성장의 균형',
      early_phase: {
        age_range: '0-30세',
        theme: '기반 다지기',
        guidance: '이 시기는 조급해하지 마세요. 천천히 단단한 기초를 쌓는 시간입니다. 화려함보다 견고함을 추구하세요.',
      },
      middle_phase: {
        age_range: '30-60세',
        theme: '풍요의 수확',
        guidance: '이제는 당신이 쌓아온 것들이 열매를 맺습니다. 단, 안주하지 마세요. 안정 속에서도 새로운 씨앗을 뿌리세요.',
      },
      late_phase: {
        age_range: '60세 이후',
        theme: '대지로서의 포용',
        guidance: '이제는 모든 것을 품으세요. 당신의 안정감이 다음 세대의 기반이 됩니다.',
      },
      lifelong_practice: '평생의 과제는 "안정"과 "성장"의 균형입니다. 뿌리를 내리되 새 싹도 틀게 하세요.',
    },
  },
  metal: {
    strategy: {
      when_dominant: {
        warning: '과도한 완벽주의가 당신을 고립시킵니다',
        control_principle: '유연한 강철',
        description: '모든 것을 날카롭게 자르지 마세요. 때로는 둥근 선이 더 아름답습니다.',
        core_practices: [
          '80% 완성도로 출시하는 연습',
          '타인의 실수를 3번은 그냥 넘기기',
          '월 1회 "대충" 해보는 날 갖기',
        ],
        mindset: '가장 날카로운 칼날도 때로는 무뎌져야 더 오래 간다.',
      },
      when_deficient: {
        impact: '기준 없는 삶이 평범함에 머물게 합니다',
        boost_principle: '칼날 세우기',
        description: '디테일이 탁월함을 만듭니다. 작은 것에 집착하는 용기를 가지세요.',
        core_practices: [
          '하나의 영역에서 완벽함 추구하기',
          '품질 체크리스트 만들고 지키기',
          '타협하지 않는 기준 3가지 정하기',
        ],
        mindset: '장인은 아무도 보지 않는 곳도 정성껏 다듬는다.',
      },
    },
    synergy: {
      best_partner_type: 'Water (水)',
      partner_dynamic: '당신의 날카로움을 흐름으로 바꾸는 중재자',
      partner_description: '金은 水를 만나 부드러워집니다. 유연하고 직관적인 사람이 당신의 경직됨을 녹여줍니다.',
      partner_traits: ['유연성', '직관력', '포용력', '적응력'],
      best_environment: '정돈되고 미니멀한 공간',
      environment_description: '불필요한 것이 제거된 깨끗한 환경에서 최적화됩니다.',
      ideal_spaces: ['미니멀 디자인 사무실', '고품질 장비가 있는 작업실', '완벽하게 정리된 개인 공간'],
      energy_activation: '탁월함에 대한 인정이 당신을 깨웁니다. 평범함을 경계하세요.',
    },
    growth_path: {
      life_season_metaphor: '가을 - 수확하고 정리하는 계절',
      eternal_theme: '완벽과 수용의 균형',
      early_phase: {
        age_range: '0-30세',
        theme: '기술 연마',
        guidance: '이 시기는 한 가지를 완벽하게 마스터하세요. 장인정신은 젊을 때 시작됩니다.',
      },
      middle_phase: {
        age_range: '30-60세',
        theme: '완성도의 정점',
        guidance: '이제는 당신의 기준이 업계의 기준이 됩니다. 단, 완벽함이 관계를 해치지 않도록 주의하세요.',
      },
      late_phase: {
        age_range: '60세 이후',
        theme: '지혜로운 관대함',
        guidance: '이제는 타인의 불완전함을 받아들이세요. 완벽함보다 따뜻함이 더 큰 유산입니다.',
      },
      lifelong_practice: '평생의 과제는 "탁월함"과 "관대함"의 균형입니다. 엄격하되 따뜻하게.',
    },
  },
  water: {
    strategy: {
      when_dominant: {
        warning: '끝없는 사색이 실행을 마비시킵니다',
        control_principle: '흐르는 물',
        description: '생각만 하지 말고 흘러가세요. 완벽한 답을 기다리다 아무것도 하지 못합니다.',
        core_practices: [
          '생각은 30분, 실행은 즉시',
          '분석은 3번까지만, 그 다음은 직감',
          '주 3회 몸을 움직이는 활동 필수',
        ],
        mindset: '고인 물은 썩는다. 불완전해도 흘러라.',
      },
      when_deficient: {
        impact: '직관 없는 삶이 기계적이 됩니다',
        boost_principle: '깊은 우물',
        description: '내면을 들여다보세요. 때로는 논리보다 느낌이 정답입니다.',
        core_practices: [
          '매일 10분 명상으로 고요 찾기',
          '직관을 따라 결정하는 연습',
          '일기로 내면 관찰하기',
        ],
        mindset: '가장 깊은 답은 가장 조용한 곳에 있다.',
      },
    },
    synergy: {
      best_partner_type: 'Wood (木)',
      partner_dynamic: '당신의 지혜에 형태를 주는 실행자',
      partner_description: '水는 木을 만나 생명을 줍니다. 창의적이고 추진력 있는 사람이 당신의 통찰을 현실로 만듭니다.',
      partner_traits: ['창의성', '실행력', '성장 지향', '유연함'],
      best_environment: '고요하지만 흐름이 있는 공간',
      environment_description: '정적인 듯하지만 변화하는 환경에서 빛납니다.',
      ideal_spaces: ['물가나 자연이 보이는 공간', '조용한 도서관이나 연구실', '명상과 사색이 가능한 곳'],
      energy_activation: '깊은 질문과 의미가 당신을 깨웁니다. 피상적인 것을 경계하세요.',
    },
    growth_path: {
      life_season_metaphor: '겨울 - 저장하고 성찰하는 계절',
      eternal_theme: '사색과 실행의 균형',
      early_phase: {
        age_range: '0-30세',
        theme: '깊이 탐구',
        guidance: '이 시기는 많이 배우고 깊이 생각하세요. 단, 생각에만 빠지지 말고 작은 실험도 병행하세요.',
      },
      middle_phase: {
        age_range: '30-60세',
        theme: '지혜의 실현',
        guidance: '이제는 당신의 통찰을 행동으로 옮기세요. 아는 것과 하는 것의 간극을 좁히는 시기입니다.',
      },
      late_phase: {
        age_range: '60세 이후',
        theme: '깊은 우물로서의 존재',
        guidance: '이제는 당신의 지혜를 나누세요. 말없이 존재만으로도 사람들에게 평안을 줍니다.',
      },
      lifelong_practice: '평생의 과제는 "사색"과 "실행"의 균형입니다. 생각하되 움직이세요.',
    },
  },
}
