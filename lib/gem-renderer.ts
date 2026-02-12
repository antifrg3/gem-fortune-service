import * as THREE from 'three'

export type Pillar = {
  hanzi: string
  stem: string
  branch: string
}

/** hex (#rrggbb) → rgba 문자열. Canvas API는 8자리 hex를 지원하지 않음. */
export function hexToRgba(hex: string, alpha: number): string {
  if (!hex) return `rgba(128,128,128,${alpha})`

  // 이미 rgba() 형식이면 알파만 교체
  if (hex.startsWith("rgba")) {
    return hex.replace(/[\d.]+\)$/, `${alpha})`)
  }
  // rgb() 형식이면 rgba로 바꾸고 알파 추가
  if (hex.startsWith("rgb")) {
    return hex.replace(/\)$/, `,${alpha})`).replace(/^rgb/, "rgba")
  }

  // # 제거
  let clean = hex.replace("#", "")

  // 3자리 → 6자리 확장
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("")
  }

  // 8자리면 앞 6자리만 사용
  if (clean.length === 8) {
    clean = clean.slice(0, 6)
  }

  // 6자리가 아니면 fallback
  if (clean.length !== 6) {
    return `rgba(128,128,128,${alpha})`
  }

  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return `rgba(128,128,128,${alpha})`
  }

  return `rgba(${r},${g},${b},${alpha})`
}

// 각 천간별 색상 변주 (같은 오행이라도 조금씩 다름)
// --- V8 (주석 보존) ---
// 甲: { elem: 'wood', yin: 0, hue: 140, sat: 0.85, c1: '#1ec854', c2: '#70e898', c3: '#b0f5d0', hi: '#e8fff2', name: '甲 양목' },
// 乙: { elem: 'wood', yin: 1, hue: 148, sat: 0.75, c1: '#38c870', c2: '#88e8a8', c3: '#c0f5d8', hi: '#f0fff6', name: '乙 음목' },
// 丙: { elem: 'fire', yin: 0, hue: 345, sat: 0.95, c1: '#f82858', c2: '#ff78a0', c3: '#ffb8cc', hi: '#fff0f5', name: '丙 양화' },
// 丁: { elem: 'fire', yin: 1, hue: 18, sat: 0.9, c1: '#ff5030', c2: '#ff9060', c3: '#ffc098', hi: '#fff4f0', name: '丁 음화' },
// 戊: { elem: 'earth', yin: 0, hue: 38, sat: 0.88, c1: '#e89818', c2: '#f8cc60', c3: '#fde8a0', hi: '#fffbec', name: '戊 양토' },
// 己: { elem: 'earth', yin: 1, hue: 46, sat: 0.8, c1: '#f0b030', c2: '#f8d870', c3: '#fdedb0', hi: '#fffef0', name: '己 음토' },
// 庚: { elem: 'metal', yin: 0, hue: 208, sat: 0.85, c1: '#50a8f8', c2: '#98ccff', c3: '#cce4ff', hi: '#f0f8ff', name: '庚 양금' },
// 辛: { elem: 'metal', yin: 1, hue: 220, sat: 0.75, c1: '#80b8f8', c2: '#b8d8ff', c3: '#dceeff', hi: '#f5f9ff', name: '辛 음금' },
// 壬: { elem: 'water', yin: 0, hue: 230, sat: 0.9, c1: '#3858f0', c2: '#7890ff', c3: '#b0bcff', hi: '#f2f4ff', name: '壬 양수' },
// 癸: { elem: 'water', yin: 1, hue: 245, sat: 0.82, c1: '#6070f0', c2: '#98a8ff', c3: '#c8ccff', hi: '#f5f5ff', name: '癸 음수' },
// --- V9 (elemental-gems-9) ---
export const STEMS: Record<
  string,
  {
    elem: 'wood' | 'fire' | 'earth' | 'metal' | 'water'
    yin: 0 | 1
    hue: number
    sat: number
    c1: string
    c2: string
    c3: string
    hi: string
    name: string
    gemBase?: string
  }
> = {
  // 木 → 비취(翡翠): 양=황비취(강렬), 음=빙종비취(맑고 반투명)
  甲: { elem: 'wood', yin: 0, hue: 150, sat: 0.82, c1: '#0d6b3a', c2: '#18a058', c3: '#50c880', hi: '#98eeb8', name: '甲 양목', gemBase: '황비취' },
  乙: { elem: 'wood', yin: 1, hue: 168, sat: 0.6, c1: '#2a8870', c2: '#40b898', c3: '#80d8c0', hi: '#c8f8f0', name: '乙 음목', gemBase: '빙종비취' },
  // 火 → 산호(珊瑚): 양=심홍산호(강렬), 음=분홍산호(부드러움)
  丙: { elem: 'fire', yin: 0, hue: 5, sat: 0.95, c1: '#c01828', c2: '#e83040', c3: '#ff7070', hi: '#ffc0b0', name: '丙 양화', gemBase: '심홍산호' },
  丁: { elem: 'fire', yin: 1, hue: 18, sat: 0.8, c1: '#c05040', c2: '#e08060', c3: '#f8b898', hi: '#ffe0d0', name: '丁 음화', gemBase: '분홍산호' },
  // 土 → 호박(琥珀): 양=금박호박(깊은 황금), 음=밀랍호박(연한 황)
  戊: { elem: 'earth', yin: 0, hue: 38, sat: 0.9, c1: '#a86800', c2: '#d09010', c3: '#f0c040', hi: '#ffe880', name: '戊 양토', gemBase: '금박호박' },
  己: { elem: 'earth', yin: 1, hue: 48, sat: 0.72, c1: '#c09030', c2: '#e0b850', c3: '#f8d880', hi: '#fff5c0', name: '己 음토', gemBase: '밀랍호박' },
  // 金 → 백옥(白玉)/진주(珍珠): 양=양지백옥(차갑고 순수), 음=담황진주(따뜻한 유백)
  庚: { elem: 'metal', yin: 0, hue: 200, sat: 0.2, c1: '#5a7080', c2: '#88a0b0', c3: '#c0d4dc', hi: '#eaf2f6', name: '庚 양금', gemBase: '양지백옥' },
  辛: { elem: 'metal', yin: 1, hue: 40, sat: 0.25, c1: '#c0a870', c2: '#d8c090', c3: '#ecddb0', hi: '#faf4e0', name: '辛 음금', gemBase: '담황진주' },
  // 水 → 청금석(靑金石)/흑옥(黑玉): 양=라피스라줄리(짙은 남색+금박), 음=묵옥(깊은 흑청)
  壬: { elem: 'water', yin: 0, hue: 230, sat: 0.85, c1: '#0a1870', c2: '#1428a8', c3: '#3050d0', hi: '#f0c020', name: '壬 양수', gemBase: '청금석' },
  癸: { elem: 'water', yin: 1, hue: 250, sat: 0.7, c1: '#181828', c2: '#282840', c3: '#404868', hi: '#8878c8', name: '癸 음수', gemBase: '묵옥' },
}

// 지지별 반사 하이라이트 색
// --- V8 (주석 보존) ---
// 子: { hi: '#88e8ff', sat: 0.9, season: '겨울 깊은 밤' },
// 丑: { hi: '#ffe898', sat: 0.4, season: '겨울 새벽' },
// 寅: { hi: '#88ff98', sat: 0.6, season: '봄 이른 아침' },
// 卯: { hi: '#b8ff80', sat: 0.7, season: '봄 한낮' },
// 辰: { hi: '#f0e060', sat: 0.4, season: '봄 흐린 오후' },
// 巳: { hi: '#ffb858', sat: 0.7, season: '초여름 열기' },
// 午: { hi: '#ff5828', sat: 1.0, season: '여름 정오' },
// 未: { hi: '#ffd070', sat: 0.4, season: '여름 저녁' },
// 申: { hi: '#70d8ff', sat: 0.75, season: '가을 서늘함' },
// 酉: { hi: '#b8d8ff', sat: 0.6, season: '가을 석양' },
// 戌: { hi: '#ffb870', sat: 0.45, season: '가을 황혼' },
// 亥: { hi: '#8898ff', sat: 0.65, season: '겨울 시작' },
// --- V9 (elemental-gems-9) ---
export const BRANCHES: Record<string, { hi: string; sat: number; season: string; tint?: string }> = {
  // 겨울(水기운): 차갑고 어두운 청흑 계열
  子: { hi: '#60c8f0', sat: 0.85, season: '겨울 깊은 밤', tint: 'cold' },
  丑: { hi: '#a0b8d0', sat: 0.35, season: '겨울 새벽', tint: 'frost' },
  // 봄(木기운): 생동하는 녹색/청록 계열
  寅: { hi: '#40e880', sat: 0.65, season: '봄 이른 아침', tint: 'fresh' },
  卯: { hi: '#88ff60', sat: 0.75, season: '봄 한낮', tint: 'vivid' },
  辰: { hi: '#c8e040', sat: 0.45, season: '봄 흐린 오후', tint: 'murky' },
  // 여름(火기운): 타오르는 황적 계열
  巳: { hi: '#ff9030', sat: 0.8, season: '초여름 열기', tint: 'warm' },
  午: { hi: '#ff3010', sat: 1.0, season: '여름 정오', tint: 'blaze' },
  未: { hi: '#ffb820', sat: 0.5, season: '여름 저녁', tint: 'amber' },
  // 가을(金기운): 차갑고 투명한 백/금 계열
  申: { hi: '#c0e8ff', sat: 0.7, season: '가을 서늘함', tint: 'crisp' },
  酉: { hi: '#f0f4ff', sat: 0.55, season: '가을 석양', tint: 'silver' },
  戌: { hi: '#e8c880', sat: 0.5, season: '가을 황혼', tint: 'gold' },
  // 겨울 시작(水기운)
  亥: { hi: '#7060d0', sat: 0.6, season: '겨울 시작', tint: 'deep' },
}

// 60갑자별 보석명·아키타입·설명 (V9 — elemental-gems-9, 일주별 보석 고유 색상 포함)
export const PILLAR_NAMES: Record<
  string,
  { arch: string; subtitle: string; gem: string; gemEn: string; gemC1: string; gemC2: string; gemHi: string; desc: string; gemDesc: string; gemStory?: string }
> = {
  '甲子': { arch: 'The Seed of Wisdom', subtitle: '지혜의 씨앗을 품은 선구자', gem: '수비취', gemEn: 'Water Jadeite', gemC1: '#0a5a38', gemC2: '#148858', gemHi: '#60c8f0', desc: '겨울 물 속 깊은 곳에서 자라는 나무. 침묵 속 무한한 잠재력.', gemDesc: '겨울 깊은 수맥에서 천천히 결정된 비취. 고요 속에 잠든 생명력.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 수비취의 형상으로 드러났습니다. 甲의 강인한 생명력이 子의 깊은 겨울 물을 만나 이 보석을 빚었습니다. 겨울 수맥 속에서 천천히 결정되듯, 당신의 잠재력은 고요한 침묵 속에서 가장 깊게 자랍니다. 아직 드러나지 않은 것이 당신의 가장 큰 힘입니다.' },
  '甲寅': { arch: 'The Forest Pioneer', subtitle: '새벽 숲을 가장 먼저 걷는 개척자', gem: '황비취', gemEn: 'Imperial Jade', gemC1: '#0a6b38', gemC2: '#18a058', gemHi: '#40e880', desc: '거대한 숲속의 선도자. 개척 정신과 강인한 생명력.', gemDesc: '원시림 깊은 곳에서 자란 최고급 황비취. 자연이 빚은 최강의 녹색.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 황비취의 형상으로 드러났습니다. 甲의 선도하는 나무 기운이 寅의 원시림 호랑이 광채와 만나 이 보석을 빚었습니다. 원시림 깊은 곳에서 자라는 가장 순수한 비취처럼, 당신은 개척되지 않은 길을 두려움 없이 나아갑니다. 당신이 지나간 자리에 숲이 생깁니다.' },
  '甲辰': { arch: 'The Rooted Visionary', subtitle: '땅에 뿌리내린 비전가', gem: '용비취', gemEn: 'Dragon Jade', gemC1: '#186840', gemC2: '#28a060', gemHi: '#c8e040', desc: '용이 승천하는 기운. 웅장한 변화와 도약의 광채.', gemDesc: '용의 비늘빛을 머금은 희귀 비취. 천 년에 한 번 나타나는 보석.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 용비취의 형상으로 드러났습니다. 甲의 상승하는 목 에너지가 辰의 용 기운과 만나 이 보석을 빚었습니다. 용이 승천할 때만 드러나는 희귀한 비취처럼, 당신의 광채는 변화와 도약의 순간에 가장 찬란하게 빛납니다. 당신은 변화 그 자체입니다.' },
  '甲午': { arch: 'The Blazing Trailblazer', subtitle: '타오르는 불길처럼 길을 여는 자', gem: '양록비취', gemEn: 'Sunny Jade', gemC1: '#0f8040', gemC2: '#20c060', gemHi: '#ff3010', desc: '태양 아래 불타는 나무. 열정적 자유와 빠른 행동력.', gemDesc: '한여름 태양 아래 연마된 양록비취. 가장 선명하고 열정적인 녹색.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 양록비취의 형상으로 드러났습니다. 甲의 열정적 생명력이 午의 한낮 태양 광채와 만나 이 보석을 빚었습니다. 가장 뜨거운 태양 아래 가장 선명하게 빛나는 녹색처럼, 당신의 존재감은 빛과 열기 속에서 극대화됩니다. 당신은 멈추지 않는 여름입니다.' },
  '甲申': { arch: 'The Refined Creator', subtitle: '정원의 나무처럼 세련된 창조자', gem: '청백비취', gemEn: 'Blue-White Jade', gemC1: '#1a6858', gemC2: '#28a888', gemHi: '#c0e8ff', desc: '강인한 목재와 금속의 정밀함. 날카로운 통찰과 구조적 사고.', gemDesc: '청백의 두 빛이 한 돌에 공존하는 비취. 자연의 완벽한 균형.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 청백비취의 형상으로 드러났습니다. 甲의 나무 생명력이 申의 금속 정밀함을 만나 하나의 돌 안에 두 색을 품은 이 보석을 빚었습니다. 청록과 백색이 공존하듯, 당신 안에는 생명의 유연함과 금속의 날카로움이 동시에 흐릅니다. 그 균형이 당신만의 무기입니다.' },
  '甲戌': { arch: 'The Mountain Guardian', subtitle: '산을 지키는 고요한 수호자', gem: '황록비취', gemEn: 'Autumn Jade', gemC1: '#508028', gemC2: '#80b038', gemHi: '#e8c880', desc: '가을 땅속 깊이 내린 뿌리. 인내와 축적의 힘.', gemDesc: '가을 단풍빛을 흡수한 황록비취. 계절의 끝에서 더욱 깊어지는 색.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 황록비취의 형상으로 드러났습니다. 甲의 뿌리내리는 힘이 戌의 가을 대지 광채와 만나 이 보석을 빚었습니다. 가을 단풍빛을 흡수하며 더욱 깊어지는 황록빛처럼, 당신의 가치는 시간이 지날수록 농익어갑니다. 당신은 가을이 선물하는 깊이입니다.' },
  '乙丑': { arch: 'The Patient Cultivator', subtitle: '인내심으로 정원을 가꾸는 자', gem: '빙종비취', gemEn: 'Ice Jade', gemC1: '#3a8878', gemC2: '#58b8a0', gemHi: '#a0b8d0', desc: '겨울 서리 속 살아남는 덩굴. 유연한 생존력.', gemDesc: '혹한 속에서도 투명함을 잃지 않는 빙종비취. 순수함의 결정체.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 빙종비취의 형상으로 드러났습니다. 乙의 유연한 덩굴 기운이 丑의 혹한 겨울 땅을 만나 이 보석을 빚었습니다. 영하의 추위 속에서도 투명함을 잃지 않는 빙종비취처럼, 당신은 어떤 환경에서도 본연의 순수함을 지켜냅니다. 유연함이 곧 당신의 강인함입니다.' },
  '乙卯': { arch: 'The Spring Whisperer', subtitle: '봄날의 속삭임을 전하는 자', gem: '봄옥', gemEn: 'Spring Jade', gemC1: '#288878', gemC2: '#40c0a0', gemHi: '#88ff60', desc: '봄의 꽃처럼 섬세하고 아름다운 감수성.', gemDesc: '봄비에 씻긴 듯 맑고 부드러운 옥. 가장 섬세한 녹색의 표현.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 봄옥의 형상으로 드러났습니다. 乙의 섬세한 감수성이 卯의 봄 새벽 광채와 만나 이 보석을 빚었습니다. 봄비에 씻긴 듯 맑고 부드러운 옥처럼, 당신은 주변을 촉촉하게 적시는 감성의 소유자입니다. 당신이 있는 곳에 봄이 옵니다.' },
  '乙巳': { arch: 'The Phoenix Bloom', subtitle: '불 속에서 피어나는 꽃', gem: '사화옥', gemEn: 'Serpent Fire Jade', gemC1: '#308078', gemC2: '#48b0a0', gemHi: '#ff9030', desc: '불 위를 유연하게 흐르는 덩굴. 지혜로운 변신.', gemDesc: '뱀처럼 유연한 결 속에 불꽃이 스민 옥. 생명과 열정의 공존.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 사화옥의 형상으로 드러났습니다. 乙의 유연한 생명력이 巳의 뱀 지혜 광채와 만나 이 보석을 빚었습니다. 불꽃 위를 유연하게 흐르는 덩굴처럼, 당신은 위기를 기회로 바꾸는 탁월한 적응력을 가졌습니다. 당신은 불 위에서도 피는 꽃입니다.' },
  '乙未': { arch: 'The Garden Healer', subtitle: '정원에서 치유를 나누는 자', gem: '애옥', gemEn: 'Herb Jade', gemC1: '#389880', gemC2: '#50c8a8', gemHi: '#ffb820', desc: '여름 대지에 뿌리내린 약초. 치유와 공감의 광채.', gemDesc: '약초의 생명력을 품은 부드러운 옥. 치유와 성장을 담은 자연의 선물.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 애옥의 형상으로 드러났습니다. 乙의 치유하는 목 에너지가 未의 여름 대지 따뜻함을 만나 이 보석을 빚었습니다. 약초가 대지에 뿌리내리듯, 당신의 공감과 치유 능력은 주변 사람들의 마음 깊은 곳에 닿습니다. 당신 곁에 있으면 상처가 아뭅니다.' },
  '乙酉': { arch: 'The Refined Aesthete', subtitle: '세련된 미학을 추구하는 자', gem: '월백옥', gemEn: 'Moonwhite Jade', gemC1: '#288878', gemC2: '#40b898', gemHi: '#f0f4ff', desc: '금속 위를 타고 오르는 덩굴. 예술적 정밀함.', gemDesc: '달빛처럼 은은하고 차가운 월백옥. 가을 밤의 정밀한 아름다움.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 월백옥의 형상으로 드러났습니다. 乙의 예술적 감성이 酉의 정밀한 금속 에너지를 만나 이 보석을 빚었습니다. 달빛처럼 은은하면서도 가을밤처럼 정확한 월백옥처럼, 당신은 아름다움과 완벽함을 동시에 추구합니다. 당신의 섬세함은 예술이 됩니다.' },
  '乙亥': { arch: 'The Water Lily Dreamer', subtitle: '물 위에 핀 연꽃의 꿈', gem: '수청옥', gemEn: 'Aqua Jade', gemC1: '#208898', gemC2: '#30b8c8', gemHi: '#7060d0', desc: '달빛 아래 피는 꽃. 직관과 감성의 정수.', gemDesc: '심해의 청록빛을 머금은 수청옥. 물과 목이 만드는 신비로운 색.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 수청옥의 형상으로 드러났습니다. 乙의 감성적 생명력이 亥의 깊은 물 광채와 만나 이 보석을 빚었습니다. 달빛 아래 피는 꽃처럼 신비롭고 깊은 수청옥처럼, 당신의 직관은 언어로 설명되지 않는 영역까지 닿습니다. 당신은 느끼는 것이 가장 정확합니다.' },
  '丙子': { arch: 'The Winter Sunrise', subtitle: '겨울 아침을 밝히는 따뜻한 빛', gem: '수홍산호', gemEn: 'Water Coral', gemC1: '#b81828', gemC2: '#e03048', gemHi: '#60c8f0', desc: '물 위의 불꽃. 모순 속에서 피어나는 강렬한 존재감.', gemDesc: '차가운 북극해에서 채취한 수홍산호. 냉기 속 불꽃처럼 강렬한 붉음.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 수홍산호의 형상으로 드러났습니다. 丙의 강렬한 불 에너지가 子의 차가운 겨울 물을 만나 이 보석을 빚었습니다. 차가운 북극해에서 오히려 더 선명하게 피어나는 붉은 산호처럼, 당신의 존재감은 모순 속에서 가장 강렬하게 드러납니다. 역경이 당신을 더 빛나게 합니다.' },
  '丙寅': { arch: 'The Dawn Catalyst', subtitle: '새벽을 깨우는 촉매제', gem: '심홍산호', gemEn: 'Crimson Coral', gemC1: '#b80820', gemC2: '#e01838', gemHi: '#40e880', desc: '호랑이처럼 솟아오르는 여명. 용기와 선도의 힘.', gemDesc: '새벽빛을 받아 가장 선명하게 빛나는 심홍산호. 여명의 붉은 광채.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 심홍산호의 형상으로 드러났습니다. 丙의 여명 같은 불 에너지가 寅의 호랑이 기운과 만나 이 보석을 빚었습니다. 새벽빛을 받아 가장 선명하게 빛나는 심홍빛처럼, 당신은 시작의 순간에 가장 강합니다. 당신이 가는 곳에 새벽이 열립니다.' },
  '丙辰': { arch: 'The Steady Flame', subtitle: '꺼지지 않는 안정된 불꽃', gem: '용혈산호', gemEn: 'Dragonblood Coral', gemC1: '#a81020', gemC2: '#d02038', gemHi: '#c8e040', desc: '화산 속 용의 불. 압도적 광채와 변혁의 힘.', gemDesc: '화산 열수구 근처에서 자란 용혈산호. 지구 내부의 불을 품은 보석.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 용혈산호의 형상으로 드러났습니다. 丙의 폭발적 화 에너지가 辰의 용 기운과 만나 이 보석을 빚었습니다. 화산 열수구에서 탄생한 붉은 산호처럼, 당신의 광채는 지구 내부의 불처럼 거대하고 원초적입니다. 당신이 변혁을 이끌 때 세상이 바뀝니다.' },
  '丙午': { arch: 'The Radiant Sovereign', subtitle: '한낮 태양처럼 빛나는 군주', gem: '태양산호', gemEn: 'Solar Coral', gemC1: '#c00018', gemC2: '#e80028', gemHi: '#ff3010', desc: '한낮 태양이 응축된 보석. 정점의 존재감과 열정.', gemDesc: '적도의 태양 아래 수백 년 자란 태양산호. 가장 순수하고 강렬한 적색.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 태양산호의 형상으로 드러났습니다. 丙의 태양 에너지가 午의 한낮 절정 기운과 만나 이 보석을 빚었습니다. 적도의 태양 아래 수백 년 자란 가장 순수하고 강렬한 적색처럼, 당신의 존재 자체가 빛과 열입니다. 당신이 있는 곳에 어둠이 없습니다.' },
  '丙申': { arch: 'The Gilded Visionary', subtitle: '황금빛 석양의 비전가', gem: '번개산호', gemEn: 'Thunder Coral', gemC1: '#b81830', gemC2: '#e03050', gemHi: '#c0e8ff', desc: '금속을 녹이는 번개. 충격적 통찰과 개혁의 힘.', gemDesc: '금속 광맥 사이에서 자란 희귀 번개산호. 자연의 두 힘이 만든 기적.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 번개산호의 형상으로 드러났습니다. 丙의 번개 같은 불 에너지가 申의 금속 광채와 만나 이 보석을 빚었습니다. 금속을 녹이는 번개처럼, 당신의 통찰은 기존의 틀을 단번에 부숩니다. 당신의 한 마디가 세상을 바꾸는 충격이 됩니다.' },
  '丙戌': { arch: 'The Hearthkeeper', subtitle: '따뜻한 화로를 지키는 자', gem: '석양산호', gemEn: 'Sunset Coral', gemC1: '#c03020', gemC2: '#e05838', gemHi: '#e8c880', desc: '대지를 따뜻하게 하는 화로. 보살핌과 안정의 빛.', gemDesc: '석양의 온기를 흡수하며 자란 석양산호. 하루의 끝을 물드는 따뜻함.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 석양산호의 형상으로 드러났습니다. 丙의 따뜻한 화 에너지가 戌의 가을 저녁 대지를 만나 이 보석을 빚었습니다. 하루의 끝을 따뜻하게 물드는 석양처럼, 당신의 빛은 사람들을 포근하게 감쌉니다. 당신이 있으면 마지막도 아름답습니다.' },
  '丁丑': { arch: 'The Candlelight Poet', subtitle: '촛불처럼 은은한 시인', gem: '서리산호', gemEn: 'Frost Coral', gemC1: '#b84838', gemC2: '#d87060', gemHi: '#a0b8d0', desc: '얼음 속 촛불. 역경 속 흔들리지 않는 신념.', gemDesc: '얼음 아래 바다에서 고요히 자란 서리산호. 극한의 인내가 만든 아름다움.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 서리산호의 형상으로 드러났습니다. 丁의 내면적 불꽃이 丑의 혹한 겨울을 만나 이 보석을 빚었습니다. 얼음 아래 바다에서 고요히 자라는 붉은 산호처럼, 당신의 신념은 어떤 추위에도 꺼지지 않습니다. 당신의 조용한 불꽃이 가장 오래 타오릅니다.' },
  '丁卯': { arch: 'The Spring Light Weaver', subtitle: '봄빛을 엮는 창조자', gem: '봄산호', gemEn: 'Spring Coral', gemC1: '#c05040', gemC2: '#e08060', gemHi: '#88ff60', desc: '봄 저녁 길을 밝히는 등불. 따뜻한 안내자.', gemDesc: '봄 조류 속에서 피어난 연분홍 봄산호. 따뜻하고 섬세한 생명의 신호.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 봄산호의 형상으로 드러났습니다. 丁의 섬세한 등불 에너지가 卯의 봄 새벽을 만나 이 보석을 빚었습니다. 봄 조류 속에서 연분홍으로 피어나는 산호처럼, 당신의 따뜻함은 새로운 시작을 알리는 신호입니다. 당신 곁에서 사람들이 피어납니다.' },
  '丁巳': { arch: 'The Starlight Mystic', subtitle: '별빛 같은 신비주의자', gem: '사화산호', gemEn: 'Serpent Coral', gemC1: '#c04830', gemC2: '#e07050', gemHi: '#ff9030', desc: '내면에서 타오르는 불꽃. 깊은 지혜와 영성.', gemDesc: '구불구불한 결을 가진 사화산호. 내면의 불꽃이 만든 신비로운 형태.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 사화산호의 형상으로 드러났습니다. 丁의 깊은 내면의 불이 巳의 지혜로운 뱀 광채와 만나 이 보석을 빚었습니다. 구불구불한 결 속에 불꽃을 품은 산호처럼, 당신의 지혜는 표면이 아닌 내면 깊은 곳에서 흘러나옵니다. 당신의 말은 언제나 핵심을 꿰뚫습니다.' },
  '丁未': { arch: 'The Sunset Healer', subtitle: '노을처럼 치유하는 자', gem: '여름산호', gemEn: 'Summer Coral', gemC1: '#c05838', gemC2: '#e08858', gemHi: '#ffb820', desc: '여름 대지의 따뜻함. 인간적 정과 포용력.', gemDesc: '여름 따뜻한 얕은 바다에서 풍성하게 자란 산호. 생명력의 절정.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 여름산호의 형상으로 드러났습니다. 丁의 인간적 화 에너지가 未의 풍성한 여름 대지를 만나 이 보석을 빚었습니다. 따뜻한 여름 바다에서 풍성하게 자란 산호처럼, 당신의 정과 포용력은 주변 모든 것을 품습니다. 당신이 있는 곳에 풍요가 생깁니다.' },
  '丁酉': { arch: 'The Moonlight Perfectionist', subtitle: '달빛처럼 우아한 완벽주의자', gem: '달산호', gemEn: 'Moon Coral', gemC1: '#c06050', gemC2: '#e09070', gemHi: '#f0f4ff', desc: '달빛 속 정제된 불꽃. 세련된 감수성과 예술혼.', gemDesc: '달빛 아래 가장 아름답게 빛나는 달산호. 은은하고 정제된 붉은 광채.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 달산호의 형상으로 드러났습니다. 丁의 정제된 불꽃이 酉의 가을 달빛을 만나 이 보석을 빚었습니다. 달빛 아래 가장 아름답게 빛나는 은은한 붉음처럼, 당신의 매력은 화려하지 않지만 오래 기억됩니다. 당신은 달처럼 은은하게 세상을 밝힙니다.' },
  '丁亥': { arch: 'The Firefly Dreamer', subtitle: '반딧불처럼 빛나는 몽상가', gem: '심해산호', gemEn: 'Deep Sea Coral', gemC1: '#b04040', gemC2: '#d86858', gemHi: '#7060d0', desc: '깊은 바다 속 빛. 신비로운 내면의 지혜.', gemDesc: '심해의 어둠 속에서 홀로 빛나는 심해산호. 가장 깊고 신비로운 산호.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 심해산호의 형상으로 드러났습니다. 丁의 신비로운 내면의 불이 亥의 깊은 바다 광채와 만나 이 보석을 빚었습니다. 심해의 어둠 속에서 홀로 빛나는 산호처럼, 당신의 지혜는 아무도 닿지 못하는 깊이에서 옵니다. 당신을 알수록 더 깊은 세계가 열립니다.' },
  '戊子': { arch: 'The Riverside Philosopher', subtitle: '강가 언덕의 철학자', gem: '수호박', gemEn: 'Water Amber', gemC1: '#a07000', gemC2: '#c89810', gemHi: '#60c8f0', desc: '산 속 고요한 호수. 깊이와 안정의 조화.', gemDesc: '고대 강바닥에 가라앉아 물의 흔적을 품은 호박. 세월이 만든 투명한 기억.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 수호박의 형상으로 드러났습니다. 戊의 산 같은 대지 에너지가 子의 고요한 겨울 물을 만나 이 보석을 빚었습니다. 산 속 호수처럼 깊고 고요한 황금빛처럼, 당신의 안정감은 주변 사람들에게 흔들리지 않는 기준점이 됩니다. 당신 곁에 있으면 마음이 고요해집니다.' },
  '戊寅': { arch: 'The Mountain Emperor', subtitle: '산처럼 우뚝한 제왕', gem: '삼림호박', gemEn: 'Forest Amber', gemC1: '#986000', gemC2: '#c08800', gemHi: '#40e880', desc: '숲이 우거진 산. 풍요와 보호의 든든한 힘.', gemDesc: '울창한 원시림 수액이 굳은 삼림호박. 숲의 시간을 담은 황금.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 삼림호박의 형상으로 드러났습니다. 戊의 든든한 산 에너지가 寅의 원시림 기운과 만나 이 보석을 빚었습니다. 울창한 원시림의 수액이 굳어 만들어진 황금처럼, 당신의 풍요로움은 긴 시간과 깊은 뿌리에서 나옵니다. 당신은 숲처럼 모든 것을 품습니다.' },
  '戊辰': { arch: 'The Fertile Architect', subtitle: '풍요로운 평야의 설계자', gem: '용박', gemEn: 'Dragon Amber', gemC1: '#906800', gemC2: '#b89010', gemHi: '#c8e040', desc: '용이 사는 산. 신성한 힘과 거대한 포용력.', gemDesc: '용의 황금빛 광채가 응결된 용박. 신화 속 신성한 광채의 화석.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 용박의 형상으로 드러났습니다. 戊의 거대한 산 에너지가 辰의 신성한 용 기운과 만나 이 보석을 빚었습니다. 용의 황금빛 광채가 응결된 신화 속 보석처럼, 당신의 포용력과 힘은 신화적 규모입니다. 당신 앞에서는 모든 것이 작아집니다.' },
  '戊午': { arch: 'The Sunlit Summit', subtitle: '햇빛 드는 정상의 지도자', gem: '태양호박', gemEn: 'Solar Amber', gemC1: '#b07000', gemC2: '#d89800', gemHi: '#ff3010', desc: '뜨거운 태양 아래 사막 봉우리. 극한의 의지.', gemDesc: '사막의 고열 속에서 더욱 투명해진 태양호박. 극한이 만든 순수한 황금.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 태양호박의 형상으로 드러났습니다. 戊의 의지의 대지 에너지가 午의 뜨거운 태양을 만나 이 보석을 빚었습니다. 사막의 극한 열기 속에서 더욱 투명해지는 황금처럼, 당신의 의지는 극한 상황에서 오히려 더 순수하고 강해집니다. 시련이 당신을 빛나게 합니다.' },
  '戊申': { arch: 'The Stone Strategist', subtitle: '바위산의 전략가', gem: '금박호박', gemEn: 'Gold Amber', gemC1: '#a86800', gemC2: '#d09010', gemHi: '#c0e8ff', desc: '대지의 견고함과 금속의 날카로움. 흔들리지 않는 전략.', gemDesc: '수백만 년의 세월이 응축된 황금빛 수액. 대지의 기억을 품은 가장 오래된 보석.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 금박호박의 형상으로 드러났습니다. 戊의 대지 광채와 申의 가을 서늘함이 만나 이 보석을 빚었습니다. 수백만 년의 세월이 응축된 황금빛 수액처럼, 당신의 전략과 판단은 오랜 시간이 만든 깊이에서 나옵니다. 당신은 시간이 지날수록 더 단단해집니다.' },
  '戊戌': { arch: 'The Fortress Guardian', subtitle: '성벽을 지키는 수호자', gem: '고대호박', gemEn: 'Ancient Amber', gemC1: '#907000', gemC2: '#b89820', gemHi: '#e8c880', desc: '오랜 세월을 견딘 요새. 전통과 보수의 힘.', gemDesc: '가장 오래된 지층에서 발굴된 고대호박. 억겁의 세월을 견딘 불멸의 황금.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 고대호박의 형상으로 드러났습니다. 戊의 불변하는 대지 에너지가 戌의 깊은 가을 땅을 만나 이 보석을 빚었습니다. 가장 오래된 지층에서 발굴된 억겁의 황금처럼, 당신의 가치관은 유행에 흔들리지 않는 고전적 견고함을 가집니다. 당신은 시대를 초월합니다.' },
  '己丑': { arch: 'The Patient Gardener', subtitle: '인내심으로 밭을 가꾸는 자', gem: '동토호박', gemEn: 'Winter Amber', gemC1: '#b09030', gemC2: '#d0b050', gemHi: '#a0b8d0', desc: '겨울 대지의 고요함. 축적과 기다림의 미덕.', gemDesc: '혹한의 동토에서 발굴된 완벽히 투명한 호박. 얼음처럼 차갑고 순수한 황금.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 동토호박의 형상으로 드러났습니다. 己의 비옥한 대지 에너지가 丑의 혹한 겨울 땅을 만나 이 보석을 빚었습니다. 동토 깊은 곳에서 완벽하게 보존된 투명한 황금처럼, 당신은 어떤 상황에서도 내면의 순수함을 지켜냅니다. 기다림이 당신의 가장 큰 무기입니다.' },
  '己卯': { arch: 'The Garden Whisperer', subtitle: '정원의 속삭임을 듣는 자', gem: '춘박', gemEn: 'Spring Amber', gemC1: '#b09028', gemC2: '#d0b040', gemHi: '#88ff60', desc: '봄 정원의 비옥한 땅. 창의와 양육의 에너지.', gemDesc: '봄의 첫 수액이 굳어 만든 연한 봄호박. 새 생명의 달콤하고 맑은 광채.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 춘박의 형상으로 드러났습니다. 己의 양육하는 대지 에너지가 卯의 봄 새벽을 만나 이 보석을 빚었습니다. 봄의 첫 수액이 굳어 만들어진 연하고 맑은 호박처럼, 당신의 창의력은 새로운 시작과 함께 가장 선명하게 빛납니다. 당신이 심은 씨앗이 세상을 바꿉니다.' },
  '己巳': { arch: 'The Artisan Alchemist', subtitle: '화분 속 연금술사', gem: '사박', gemEn: 'Serpent Amber', gemC1: '#b08830', gemC2: '#d0a848', gemHi: '#ff9030', desc: '뱀이 사는 따뜻한 땅. 지혜와 변화를 품은 대지.', gemDesc: '뱀의 허물 옆에서 발견된 신비로운 호박. 변신과 지혜의 광채를 품은 황금.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 사박의 형상으로 드러났습니다. 己의 지혜로운 대지 에너지가 巳의 변화하는 뱀 기운을 만나 이 보석을 빚었습니다. 뱀의 허물처럼 끊임없이 변화를 품은 황금처럼, 당신은 변화를 두려워하지 않고 그 속에서 지혜를 찾습니다. 당신에게 변화는 성장입니다.' },
  '己未': { arch: 'The Summer Field Nurturer', subtitle: '여름 들판의 양육자', gem: '밀랍호박', gemEn: 'Beeswax Amber', gemC1: '#c09030', gemC2: '#e0b850', gemHi: '#ffb820', desc: '여름 황금 들판. 풍요와 결실의 따뜻한 광채.', gemDesc: '여름 밀밭의 황금빛을 닮은 밀랍호박. 풍요로운 대지의 온기가 굳은 보석.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 밀랍호박의 형상으로 드러났습니다. 己의 풍요로운 대지 에너지가 未의 황금빛 여름을 만나 이 보석을 빚었습니다. 여름 밀밭의 황금빛이 굳은 따뜻한 호박처럼, 당신의 광채는 모든 것을 풍요롭게 만드는 대지의 온기입니다. 당신 곁에 있으면 가득 차는 느낌이 납니다.' },
  '己酉': { arch: 'The Hidden Jewel Keeper', subtitle: '숨겨진 보석의 수호자', gem: '월광호박', gemEn: 'Moonlight Amber', gemC1: '#b89840', gemC2: '#d8b860', gemHi: '#f0f4ff', desc: '정밀하게 빚은 도자기. 공예적 완벽주의.', gemDesc: '가을 달빛 아래 채집된 월광호박. 수확의 계절이 만든 맑은 황금.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 월광호박의 형상으로 드러났습니다. 己의 섬세한 대지 에너지가 酉의 달빛 가을을 만나 이 보석을 빚었습니다. 가을 달빛 아래 채집된 맑고 은은한 호박처럼, 당신은 정밀함과 완성도에 있어 타협을 모릅니다. 당신의 손을 거치면 모든 것이 작품이 됩니다.' },
  '己亥': { arch: 'The Pond Gardener', subtitle: '연못가 정원사', gem: '수박', gemEn: 'River Amber', gemC1: '#a89040', gemC2: '#c8b058', gemHi: '#7060d0', desc: '흐르는 강의 진흙. 유연한 적응력과 포용.', gemDesc: '강물에 오랫동안 씻겨 둥글어진 수박. 유연함과 포용이 만든 완벽한 형태.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 수박의 형상으로 드러났습니다. 己의 포용하는 대지 에너지가 亥의 흐르는 물 기운을 만나 이 보석을 빚었습니다. 강물에 오랫동안 씻겨 완벽하게 둥글어진 호박처럼, 당신의 포용력은 어떤 모난 것도 부드럽게 감싸 안습니다. 당신과 함께라면 모난 것이 없습니다.' },
  '庚子': { arch: 'The Crystal Blade', subtitle: '수정처럼 투명한 칼날', gem: '수백옥', gemEn: 'Water White Jade', gemC1: '#487080', gemC2: '#78a0b0', gemHi: '#60c8f0', desc: '물 속의 철검. 날카로움을 숨긴 깊은 지성.', gemDesc: '수중에서 발견된 차갑고 순수한 백옥. 물이 연마한 완벽한 흰색.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 수백옥의 형상으로 드러났습니다. 庚의 날카로운 금속 에너지가 子의 깊은 물을 만나 이 보석을 빚었습니다. 물속에서 발견된 차갑고 순수한 백옥처럼, 당신의 지성은 표면 아래 숨겨진 깊이에서 나옵니다. 당신을 제대로 아는 사람만이 그 날카로움을 봅니다.' },
  '庚寅': { arch: 'The Axe Warrior', subtitle: '길을 여는 도끼 전사', gem: '청백옥', gemEn: 'Forest White Jade', gemC1: '#507080', gemC2: '#80a0b0', gemHi: '#40e880', desc: '숲 속의 검. 강인한 결단력과 개척 정신.', gemDesc: '숲속 깊은 바위에서 채굴된 청록빛 백옥. 자연의 강인함을 품은 흰색.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 청백옥의 형상으로 드러났습니다. 庚의 강인한 금속 에너지가 寅의 원시림 기운과 만나 이 보석을 빚었습니다. 숲속 깊은 바위에서 채굴된 청록빛 백옥처럼, 당신의 결단력은 자연의 강인함에서 옵니다. 당신이 한번 결정하면 아무것도 막을 수 없습니다.' },
  '庚辰': { arch: 'The Ore Foundation', subtitle: '광석처럼 단단한 기반', gem: '산백옥', gemEn: 'Mountain White Jade', gemC1: '#507888', gemC2: '#80a8b8', gemHi: '#c8e040', desc: '산을 쪼개는 칼. 압도적 결단과 변화의 힘.', gemDesc: '산 정상에서 채굴된 고산백옥. 가장 높은 곳의 공기처럼 맑고 단호한 흰색.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 산백옥의 형상으로 드러났습니다. 庚의 압도적 금속 에너지가 辰의 산 기운과 만나 이 보석을 빚었습니다. 산 정상의 공기처럼 맑고 단호한 백옥처럼, 당신의 변화는 산을 쪼개는 힘으로 옵니다. 당신이 이끄는 변화는 되돌릴 수 없습니다.' },
  '庚午': { arch: 'The Forged Champion', subtitle: '제련된 쇠의 챔피언', gem: '화백옥', gemEn: 'Fire White Jade', gemC1: '#587080', gemC2: '#88a0b0', gemHi: '#ff3010', desc: '불에 단련된 금속. 시련을 통해 강해지는 의지.', gemDesc: '불에 달궈져 더욱 단단해진 화백옥. 시련이 만든 불굴의 순백.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 화백옥의 형상으로 드러났습니다. 庚의 불굴의 금속 에너지가 午의 뜨거운 불 기운과 만나 이 보석을 빚었습니다. 불에 달궈질수록 더 단단해지는 백옥처럼, 당신은 시련을 통해 더욱 강해집니다. 당신에게 역경은 단련의 과정입니다.' },
  '庚申': { arch: 'The Master Swordsmith', subtitle: '명검을 만드는 장인', gem: '양지백옥', gemEn: 'Pure White Jade', gemC1: '#5a7080', gemC2: '#88a0b0', gemHi: '#c0e8ff', desc: '완벽하게 연마된 검. 정확성과 원칙의 결정체.', gemDesc: '한 점의 흠도 없는 완벽한 양지백옥. 장인이 평생 하나만 만드는 전설의 옥.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 양지백옥의 형상으로 드러났습니다. 庚의 완벽한 금속 에너지가 申의 정밀함과 만나 이 보석을 빚었습니다. 한 점의 흠도 없이 연마된 전설의 백옥처럼, 당신은 원칙과 정확성에 있어 타협이 없습니다. 당신의 기준이 곧 세상의 기준이 됩니다.' },
  '庚戌': { arch: 'The Iron Guardian', subtitle: '철문의 수호자', gem: '추백옥', gemEn: 'Autumn White Jade', gemC1: '#607888', gemC2: '#90a8b8', gemHi: '#e8c880', desc: '가을 들판의 검. 수확과 마무리의 단호함.', gemDesc: '가을 서리처럼 차갑고 깨끗한 추백옥. 마무리의 완벽함을 담은 흰색.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 추백옥의 형상으로 드러났습니다. 庚의 단호한 금속 에너지가 戌의 가을 마무리 기운을 만나 이 보석을 빚었습니다. 가을 서리처럼 차갑고 깨끗한 백옥처럼, 당신은 시작보다 마무리에서 진가를 발휘합니다. 당신이 마무리한 일은 완벽합니다.' },
  '辛丑': { arch: 'The Raw Diamond', subtitle: '원석 속 다이아몬드', gem: '동진주', gemEn: 'Winter Pearl', gemC1: '#a89068', gemC2: '#c8b088', gemHi: '#a0b8d0', desc: '얼어붙은 땅 속의 보석. 숨겨진 가치와 인내.', gemDesc: '얼어붙은 대지 깊은 곳에서 발굴된 동진주. 긴 기다림이 만든 완벽한 구슬.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 동진주의 형상으로 드러났습니다. 辛의 예민한 금속 에너지가 丑의 혹한 겨울 땅을 만나 이 보석을 빚었습니다. 얼어붙은 대지 깊은 곳에서 긴 기다림 끝에 완성된 진주처럼, 당신의 가치는 인내의 시간이 지난 후에야 온전히 드러납니다. 당신은 시간이 증명합니다.' },
  '辛卯': { arch: 'The Golden Artisan', subtitle: '금세공의 예술가', gem: '춘진주', gemEn: 'Spring Pearl', gemC1: '#b89870', gemC2: '#d8b890', gemHi: '#88ff60', desc: '봄 이슬 속 은빛. 섬세하고 맑은 감수성.', gemDesc: '봄 이슬을 먹고 자란 순수한 춘진주. 가장 맑고 투명한 봄빛 진주.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 춘진주의 형상으로 드러났습니다. 辛의 맑은 금속 에너지가 卯의 봄 이슬을 만나 이 보석을 빚었습니다. 봄 이슬 속에서 태어난 가장 맑고 투명한 진주처럼, 당신의 감수성은 세상에서 가장 섬세한 것들을 감지합니다. 당신은 아름다움을 먼저 봅니다.' },
  '辛巳': { arch: 'The Jewel Perfectionist', subtitle: '귀금속의 완벽주의자', gem: '사진주', gemEn: 'Serpent Pearl', gemC1: '#b09068', gemC2: '#d0b088', gemHi: '#ff9030', desc: '독을 품은 아름다운 보석. 위험한 매력과 지혜.', gemDesc: '독사가 지키던 전설의 사진주. 위험한 아름다움이 만든 희귀한 빛.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 사진주의 형상으로 드러났습니다. 辛의 위험한 아름다움의 에너지가 巳의 뱀 지혜를 만나 이 보석을 빚었습니다. 독사가 지키던 전설 속 진주처럼, 당신의 매력은 가까이 할수록 더 깊이 빠져드는 위험한 아름다움을 가집니다. 당신은 쉽게 잊히지 않습니다.' },
  '辛未': { arch: 'The Silver Crafter', subtitle: '은세공의 장인', gem: '하진주', gemEn: 'Summer Pearl', gemC1: '#c0a870', gemC2: '#d8c090', gemHi: '#ffb820', desc: '여름 구름 속 연마된 진주. 우아한 완벽주의.', gemDesc: '여름 구름빛을 머금은 부드러운 하진주. 온기와 광택이 완벽하게 균형 잡힌 진주.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 하진주의 형상으로 드러났습니다. 辛의 우아한 금속 에너지가 未의 여름 구름을 만나 이 보석을 빚었습니다. 여름 구름빛을 머금어 온기와 광택이 완벽하게 균형 잡힌 진주처럼, 당신의 완벽주의는 차갑지 않고 따뜻합니다. 당신의 기준은 사람을 빛나게 합니다.' },
  '辛酉': { arch: 'The Diamond Mind', subtitle: '다이아몬드 같은 지성', gem: '월진주', gemEn: 'Moon Pearl', gemC1: '#b8a068', gemC2: '#d8c088', gemHi: '#f0f4ff', desc: '달빛을 반사하는 거울. 순수한 직관과 예술혼.', gemDesc: '보름달 아래서만 채취하는 월진주. 달의 정기를 가장 순수하게 담은 진주.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 월진주의 형상으로 드러났습니다. 辛의 순수한 금속 에너지가 酉의 보름달 광채와 만나 이 보석을 빚었습니다. 달의 정기를 가장 순수하게 담은 진주처럼, 당신의 직관은 달이 밀물을 움직이듯 정확하고 자연스럽습니다. 당신의 감각은 예술이 됩니다.' },
  '辛亥': { arch: 'The Pearl Mystic', subtitle: '진주 같은 신비주의자', gem: '야광진주', gemEn: 'Night Pearl', gemC1: '#a89868', gemC2: '#c8b888', gemHi: '#7060d0', desc: '맑은 물에 씻긴 은빛 보석. 순수한 직관과 감수성.', gemDesc: '깊은 밤바다에서 스스로 빛나는 야광진주. 어둠 속에서 빛을 만드는 신비.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 야광진주의 형상으로 드러났습니다. 辛의 신비로운 금속 에너지가 亥의 깊은 밤바다를 만나 이 보석을 빚었습니다. 어둠 속에서 스스로 빛을 만드는 야광진주처럼, 당신은 외부의 빛이 없어도 스스로 빛납니다. 당신의 내면에 이미 모든 빛이 있습니다.' },
  '壬子': { arch: 'The Ocean Sage', subtitle: '바다의 현자', gem: '대청금석', gemEn: 'Royal Lapis', gemC1: '#081068', gemC2: '#1420a0', gemHi: '#60c8f0', desc: '깊은 바다 그 자체. 무한한 포용과 지혜의 원천.', gemDesc: '심해 열수구 근처에서 발견된 최고급 청금석. 밤하늘 별빛을 담은 가장 깊은 파랑.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 대청금석의 형상으로 드러났습니다. 壬의 무한한 바다 에너지가 子의 깊은 겨울 물과 만나 이 보석을 빚었습니다. 밤하늘 별빛을 담은 가장 깊은 파랑처럼, 당신의 지혜는 끝을 알 수 없는 심해처럼 깊습니다. 당신과 대화하면 우주가 열립니다.' },
  '壬寅': { arch: 'The River Pioneer', subtitle: '큰 강의 개척자', gem: '호청금석', gemEn: 'Tiger Lapis', gemC1: '#0c1870', gemC2: '#1828a8', gemHi: '#40e880', desc: '강을 달리는 호랑이. 거침없는 추진력.', gemDesc: '강력한 강의 기운을 흡수한 호청금석. 흐르는 물의 힘이 굳어 만든 남색.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 호청금석의 형상으로 드러났습니다. 壬의 거침없는 물 에너지가 寅의 호랑이 기운과 만나 이 보석을 빚었습니다. 강을 달리는 호랑이처럼 강렬한 남색의 청금석처럼, 당신의 추진력은 거침없이 흐르는 강물과 같습니다. 당신이 향하는 곳에 길이 생깁니다.' },
  '壬辰': { arch: 'The Reservoir Strategist', subtitle: '저수지의 전략가', gem: '용청금석', gemEn: 'Dragon Lapis', gemC1: '#0a1868', gemC2: '#1428a0', gemHi: '#c8e040', desc: '용이 사는 바다. 신비로운 창조력과 변화무쌍함.', gemDesc: '용이 살던 전설의 해저 동굴에서 나온 용청금석. 신화와 현실의 경계에 있는 보석.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 용청금석의 형상으로 드러났습니다. 壬의 창조적 물 에너지가 辰의 용 기운과 만나 이 보석을 빚었습니다. 용이 살던 전설의 해저 동굴에서 나온 보석처럼, 당신의 창조력은 신화와 현실의 경계를 자유롭게 넘나듭니다. 당신이 상상하는 것은 현실이 됩니다.' },
  '壬午': { arch: 'The Steam Innovator', subtitle: '증기의 혁신가', gem: '화청금석', gemEn: 'Fire Lapis', gemC1: '#0c1870', gemC2: '#1830a8', gemHi: '#ff3010', desc: '끓어오르는 증기. 모순된 에너지의 폭발적 창조.', gemDesc: '화산 폭발 극한 압력이 만든 화청금석. 물과 불의 충돌이 낳은 기적.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 화청금석의 형상으로 드러났습니다. 壬의 폭발적 물 에너지가 午의 극한 불 기운과 충돌하여 이 보석을 빚었습니다. 물과 불이 충돌하는 극한의 순간에 탄생한 청금석처럼, 당신은 모순된 에너지를 창조적 폭발로 전환하는 놀라운 능력을 가집니다.' },
  '壬申': { arch: 'The Crystal Spring', subtitle: '수정 같은 샘물', gem: '금청금석', gemEn: 'Metal Lapis', gemC1: '#0a1870', gemC2: '#1428a8', gemHi: '#c0e8ff', desc: '흐르는 금속처럼. 유연하면서도 날카로운 지성.', gemDesc: '금맥이 흐르는 광산에서 발견된 금청금석. 황금빛 반점이 가득한 밤하늘.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 금청금석의 형상으로 드러났습니다. 壬의 유연한 물 에너지가 申의 날카로운 금속 기운과 만나 이 보석을 빚었습니다. 황금빛 반점이 박힌 밤하늘 청금석처럼, 당신은 유연함 속에 날카로움을 감추고 있습니다. 당신의 지성은 흐르면서도 베입니다.' },
  '壬戌': { arch: 'The Well of Wisdom', subtitle: '지혜의 우물', gem: '산청금석', gemEn: 'Mountain Lapis', gemC1: '#0c1870', gemC2: '#1830a8', gemHi: '#e8c880', desc: '산에서 흘러내리는 샘. 근원으로부터의 지혜.', gemDesc: '산속 샘의 광물이 수백 년 침전된 산청금석. 근원의 깊이.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 산청금석의 형상으로 드러났습니다. 壬의 근원적 물 에너지가 戌의 깊은 가을 산을 만나 이 보석을 빚었습니다. 산속 샘이 수백 년 침전시켜 만든 청금석처럼, 당신의 지혜는 근원으로부터 흘러나오는 가장 순수한 형태입니다. 당신에게서 배우는 것이 진짜 공부입니다.' },
  '癸丑': { arch: 'The Morning Dew Healer', subtitle: '이슬의 치유자', gem: '동묵옥', gemEn: 'Winter Obsidian', gemC1: '#181828', gemC2: '#282840', gemHi: '#a0b8d0', desc: '얼어붙은 빗방울. 고요 속에 담긴 무한한 가능성.', gemDesc: '혹한의 땅속에서 수만 년 잠든 동묵옥. 얼음처럼 차갑고 어두운 신비.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 동묵옥의 형상으로 드러났습니다. 癸의 고요한 물 에너지가 丑의 혹한 겨울 땅을 만나 이 보석을 빚었습니다. 수만 년 동안 동토 속에서 잠든 흑옥처럼, 당신 안에는 아직 드러나지 않은 무한한 가능성이 잠들어 있습니다. 때가 되면 모든 것이 드러납니다.' },
  '癸卯': { arch: 'The Spring Rain Catalyst', subtitle: '봄비의 촉매제', gem: '춘묵옥', gemEn: 'Spring Obsidian', gemC1: '#181828', gemC2: '#283040', gemHi: '#88ff60', desc: '봄 아침 이슬. 치유의 감수성과 창의력.', gemDesc: '봄 안개 속에서 발굴된 청흑의 춘묵옥. 새벽 어둠이 물러가며 드러나는 빛.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 춘묵옥의 형상으로 드러났습니다. 癸의 치유하는 물 에너지가 卯의 봄 새벽을 만나 이 보석을 빚었습니다. 봄 안개 속에서 어둠이 물러가며 드러나는 청흑빛 옥처럼, 당신의 감수성은 새벽이 낮으로 바뀌듯 세상을 조용히 밝혀갑니다. 당신은 치유하는 빛입니다.' },
  '癸巳': { arch: 'The Mist Mystic', subtitle: '안개의 신비주의자', gem: '사묵옥', gemEn: 'Serpent Obsidian', gemC1: '#181828', gemC2: '#282840', gemHi: '#ff9030', desc: '불 위에 내리는 비. 지혜로운 조율과 변화.', gemDesc: '독을 품은 뱀이 감고 있던 전설의 사묵옥. 어둠 속 숨겨진 변화의 에너지.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 사묵옥의 형상으로 드러났습니다. 癸의 지혜로운 물 에너지가 巳의 신비로운 뱀 기운과 만나 이 보석을 빚었습니다. 어둠 속 숨겨진 변화의 에너지를 품은 흑옥처럼, 당신은 표면 아래에서 세상을 조율하는 보이지 않는 힘을 가집니다. 당신이 변화를 만들 때 아무도 눈치채지 못합니다.' },
  '癸未': { arch: 'The Evening Dew Nurturer', subtitle: '저녁 이슬의 양육자', gem: '하묵옥', gemEn: 'Summer Obsidian', gemC1: '#181828', gemC2: '#282840', gemHi: '#ffb820', desc: '여름 소나기. 감정의 풍요와 치유의 힘.', gemDesc: '여름 소나기가 만든 젖은 대지빛 하묵옥. 풍요로운 어둠이 품은 생명력.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 하묵옥의 형상으로 드러났습니다. 癸의 풍요로운 물 에너지가 未의 여름 대지를 만나 이 보석을 빚었습니다. 여름 소나기가 만든 풍요로운 어둠의 옥처럼, 당신의 감정은 세상을 적시는 비처럼 깊고 풍성합니다. 당신의 공감이 닿은 곳에 생명이 자랍니다.' },
  '癸酉': { arch: 'The Dewdrop Perfectionist', subtitle: '이슬방울의 완벽주의자', gem: '추묵옥', gemEn: 'Autumn Obsidian', gemC1: '#181828', gemC2: '#282840', gemHi: '#f0f4ff', desc: '가을 안개 속 은빛. 신비로운 직관과 예술혼.', gemDesc: '가을 안개 속에서만 발견되는 추묵옥. 신비롭고 서늘한 보석.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 추묵옥의 형상으로 드러났습니다. 癸의 신비로운 물 에너지가 酉의 가을 안개를 만나 이 보석을 빚었습니다. 가을 안개 속에서만 발견되는 서늘하고 신비로운 흑옥처럼, 당신의 직관은 안개처럼 모든 것을 감싸며 진실을 꿰뚫습니다. 당신은 보이지 않는 것을 봅니다.' },
  '癸亥': { arch: 'The Deep Well Mystic', subtitle: '깊은 우물의 신비가', gem: '심해묵옥', gemEn: 'Deep Sea Obsidian', gemC1: '#101018', gemC2: '#181828', gemHi: '#8878c8', desc: '바다의 가장 깊은 곳. 고요한 지혜와 무한한 내면.', gemDesc: '빛이 닿지 않는 심연에서 나온 심해묵옥. 무한한 어둠의 결정체.', gemStory: '당신이 태어난 찰나의 빛(운명의 4개 기둥, 8가지 타고난 재료)을 정밀하게 제련한 결과, 당신의 본질은 심해묵옥의 형상으로 드러났습니다. 癸의 심연 같은 물 에너지가 亥의 가장 깊은 바다를 만나 이 보석을 빚었습니다. 빛이 닿지 않는 심연에서 태어난 가장 순수한 어둠의 결정체처럼, 당신의 내면에는 우주의 시작과 같은 고요하고 무한한 지혜가 있습니다. 당신은 그 자체로 하나의 우주입니다.' },
}

// 지지·천간별 보석 형태 파라미터
export const BSH: Record<string, { e: number; w: number; n: number; twist: number }> = {
  子: { e: 1.25, w: 0.72, n: 6, twist: 0 },
  丑: { e: 0.85, w: 0.9, n: 6, twist: 0.06 },
  寅: { e: 1.15, w: 0.68, n: 6, twist: 0.04 },
  卯: { e: 1.05, w: 0.75, n: 8, twist: 0 },
  辰: { e: 0.9, w: 0.95, n: 6, twist: 0.08 },
  巳: { e: 1.3, w: 0.62, n: 6, twist: 0.05 },
  午: { e: 1.2, w: 0.65, n: 6, twist: 0 },
  未: { e: 0.88, w: 0.88, n: 8, twist: 0.07 },
  申: { e: 1.1, w: 0.7, n: 6, twist: 0.03 },
  酉: { e: 0.95, w: 0.8, n: 12, twist: 0 },
  戌: { e: 0.92, w: 0.92, n: 6, twist: 0.1 },
  亥: { e: 1.18, w: 0.66, n: 6, twist: 0.02 },
}

export const SSH: Record<string, { sx: number; sz: number; sh: number }> = {
  甲: { sx: 0.95, sz: 0.95, sh: 1.1 },
  乙: { sx: 1.05, sz: 1.05, sh: 0.9 },
  丙: { sx: 0.92, sz: 0.92, sh: 1.2 },
  丁: { sx: 1.02, sz: 1.02, sh: 0.95 },
  戊: { sx: 1.08, sz: 1.08, sh: 0.85 },
  己: { sx: 1.12, sz: 1.12, sh: 0.8 },
  庚: { sx: 0.9, sz: 0.9, sh: 1.15 },
  辛: { sx: 1.0, sz: 1.0, sh: 1.0 },
  壬: { sx: 0.96, sz: 0.96, sh: 1.05 },
  癸: { sx: 1.04, sz: 1.04, sh: 0.92 },
}

/* ══════════════════════════════════
   Three.js — 형태만, 색은 Canvas 2D
══════════════════════════════════ */
export function makeGeo(elem: string, pillar: any) {
  // ForgeAnimation에서 넘긴 임시 파라미터가 있으면 사용
  // 없으면 반드시 원래 BSH/SSH 전역 객체에서 읽기 (pillar.branch / pillar.stem)
  const bp = pillar._bsh !== undefined ? pillar._bsh : BSH[pillar.branch]
  const sp = pillar._ssh !== undefined ? pillar._ssh : SSH[pillar.stem]

  if (!bp || !sp) {
    if (typeof console !== "undefined" && console.warn) {
      console.warn("makeGeo: missing params", pillar)
    }
    return new THREE.BufferGeometry()
  }

  const { e, w, n, twist } = bp
  const { sx, sz, sh } = sp

  if (typeof console !== "undefined" && console.log) {
    console.log("makeGeo:", elem, pillar.branch, pillar.stem, { bp, sp })
  }

  switch (elem) {
    case 'wood': {
      const h = 1.45 * e,
        ww = 0.7 * w
      const pts = [
        new THREE.Vector2(0, -h * sh),
        new THREE.Vector2(ww * 0.55, -h * 0.72),
        new THREE.Vector2(ww, -h * 0.32),
        new THREE.Vector2(ww, h * 0.32),
        new THREE.Vector2(ww * 0.58, h * 0.72),
        new THREE.Vector2(0, h * sh),
      ]
      const geo = new THREE.LatheGeometry(pts, n)
      if (twist > 0) {
        const pos = geo.attributes.position
        for (let i = 0; i < pos.count; i++) {
          const y = pos.getY(i),
            a = y * twist,
            x = pos.getX(i),
            z = pos.getZ(i)
          pos.setX(i, x * Math.cos(a) - z * Math.sin(a))
          pos.setZ(i, x * Math.sin(a) + z * Math.cos(a))
        }
        geo.computeVertexNormals()
      }
      geo.applyMatrix4(new THREE.Matrix4().makeScale(sx, 1, sz))
      return geo
    }
    case 'fire': {
      const v: number[] = [],
        idx: number[] = [],
        ht = 1.65 * e * sh,
        hb = 1.15 * e,
        r = w
      v.push(0, ht, 0)
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2) / n * i + twist
        v.push(Math.cos(a) * r * sx, 0.05, Math.sin(a) * r * sz)
      }
      v.push(0, -hb, 0)
      for (let i = 0; i < n; i++) idx.push(0, 1 + i, 1 + ((i + 1) % n))
      for (let i = 0; i < n; i++) idx.push(n + 1, 1 + ((i + 1) % n), 1 + i)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3))
      geo.setIndex(idx)
      geo.computeVertexNormals()
      return geo
    }
    case 'earth': {
      if (typeof console !== "undefined" && console.log) {
        console.log("makeGeo earth:", {
          pillarBranch: pillar.branch,
          pillarStem: pillar.stem,
          hasBsh: pillar._bsh !== undefined,
          bp,
          sp,
        })
      }
      // 결과 페이지용: 낮고 넓은 쿠션형 — BoxGeometry + 라운딩 (원래 형태)
      const seg = Math.max(2, n)
      const geo = new THREE.BoxGeometry(1.5 * sx, 1.5 * e, 1.5 * sz, seg, seg, seg)
      const pos = geo.attributes.position
      const c = 1 - w * 0.3
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i),
          y = pos.getY(i),
          z = pos.getZ(i)
        const l = Math.sqrt(x * x + y * y + z * z) || 1
        pos.setXYZ(
          i,
          x * (1 - c) + (x / l) * c * 1.35,
          y * (1 - c) + (y / l) * c * 1.35,
          z * (1 - c) + (z / l) * c * 1.35
        )
      }
      if (twist > 0) {
        for (let i = 0; i < pos.count; i++) {
          const y = pos.getY(i),
            a = y * twist,
            x = pos.getX(i),
            z = pos.getZ(i)
          pos.setX(i, x * Math.cos(a) - z * Math.sin(a))
          pos.setZ(i, x * Math.sin(a) + z * Math.cos(a))
        }
      }
      geo.computeVertexNormals()
      return geo
    }
    case 'metal': {
      const r = 1.08 * (w * 0.3 + 0.78)
      const geo =
        n <= 4
          ? new THREE.TetrahedronGeometry(r, 0)
          : n <= 6
            ? new THREE.OctahedronGeometry(r, 0)
            : new THREE.IcosahedronGeometry(r, n >= 12 ? 2 : n >= 8 ? 1 : 0)
      geo.applyMatrix4(new THREE.Matrix4().makeScale(sx, e * 0.9 + 0.1, sz))
      return geo
    }
    case 'water': {
      const ht = 1.62 * e * sh,
        hb = 1.08 * e,
        rw = w,
        wy = ht * 0.1
      const nSide = Math.max(3, n)
      const v: number[] = [0, ht, 0]
      for (let i = 0; i < nSide; i++) {
        const a = (Math.PI * 2 * i) / nSide
        v.push(Math.cos(a) * rw * sx, wy, Math.sin(a) * rw * sz)
      }
      v.push(0, -hb, 0)
      const idx: number[] = []
      for (let i = 0; i < nSide; i++) {
        idx.push(0, 1 + i, 1 + ((i + 1) % nSide))
      }
      const bot = 1 + nSide
      for (let i = 0; i < nSide; i++) {
        idx.push(bot, 1 + ((i + 1) % nSide), 1 + i)
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3))
      geo.setIndex(idx)
      geo.computeVertexNormals()
      return geo
    }
  }
}

/* ══════════════════════════════════
   Canvas 2D 보석 렌더러
   — 레퍼런스 이미지처럼 밝은 투명 유리 느낌
══════════════════════════════════ */
export class GemRenderer {
  cv: HTMLCanvasElement
  size: number
  ctx: CanvasRenderingContext2D
  rotX: number
  rotY: number
  pillar: Pillar | null
  scene3: THREE.Scene
  cam3: THREE.PerspectiveCamera
  geo: THREE.BufferGeometry | THREE.LatheGeometry | THREE.BoxGeometry | THREE.IcosahedronGeometry | null
  t: number
  shimmer: number

  constructor(canvas: HTMLCanvasElement, size = 400) {
    this.cv = canvas
    this.size = size
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) throw new Error('2D canvas context not available')
    this.ctx = ctx
    this.rotX = 0
    this.rotY = 0
    this.pillar = null
    // THREE.js는 형태 계산(노말/정점 프로젝션)만 사용
    this.scene3 = new THREE.Scene()
    this.cam3 = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    this.cam3.position.z = 4.5
    this.geo = null
    this.t = 0
    this.shimmer = 0
  }

  loadGem(pillar: Pillar) {
    this.pillar = pillar
    const st = STEMS[pillar.stem]
    this.geo = makeGeo(st.elem, pillar)
    this.geo.computeBoundingSphere()
  }

  // 3D 정점을 2D로 투영
  project(vx: number, vy: number, vz: number, rx: number, ry: number) {
    // Y축 회전
    const cx = vx * Math.cos(ry) + vz * Math.sin(ry)
    const cz = -vx * Math.sin(ry) + vz * Math.cos(ry)
    // X축 회전
    const cy2 = vy * Math.cos(rx) - cz * Math.sin(rx)
    const cz2 = vy * Math.sin(rx) + cz * Math.cos(rx)
    // 투영 — fov 작을수록 보석 크게
    const fov = 1.3,
      scale = this.size / (fov * (4.5 - cz2))
    return {
      x: this.size / 2 + cx * scale,
      y: this.size / 2 - cy2 * scale,
      z: cz2,
    }
  }

  private parseRgbaAlpha(rgba: string): number {
    if (!rgba || !rgba.startsWith("rgba")) return 1
    const m = rgba.match(/,\s*([\d.]+)\s*\)$/)
    return m ? parseFloat(m[1]) : 1
  }

  // 삼각형 패싯 하나를 그림
  drawFacet(
    ctx: CanvasRenderingContext2D,
    pts2d: Array<{ x: number; y: number }>,
    dept: number,
    c1: string,
    c2: string,
    chi: string,
    alpha: number,
    isBack: boolean
  ) {
    const [a, b, c] = pts2d
    // 노말 벡터로 밝기 계산
    const ax = b.x - a.x,
      ay = b.y - a.y
    const bx = c.x - a.x,
      by = c.y - a.y
    const nz = ax * by - ay * bx // z 노말 (뷰어 방향)

    if (isBack && nz > 0) return // 뒷면 컬링
    if (!isBack && nz < 0) return // 앞면 컬링

    // 광원 각도 (위쪽 왼쪽에서 오는 빛)
    const cx2 = (a.x + b.x + c.x) / 3 - this.size / 2
    const cy2 = (a.y + b.y + c.y) / 3 - this.size / 2
    const dist = Math.sqrt(cx2 * cx2 + cy2 * cy2) / (this.size / 2)

    // 각 패싯의 밝기 변화 (이게 보석 느낌의 핵심)
    const brightness = 0.3 + 0.7 * (1 - dist * 0.5)
    const lightAngle = Math.atan2(cy2, cx2) / Math.PI // -1 ~ 1
    const facetLight = 0.5 + 0.5 * Math.sin(lightAngle * 3 + dept * 0.8)

    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.lineTo(c.x, c.y)
    ctx.closePath()

    if (isBack) {
      // 뒷면: 어두운 깊이감
      const g = ctx.createLinearGradient(a.x, a.y, c.x, c.y)
      g.addColorStop(0, hexToRgba(c2, 0.8))
      g.addColorStop(1, hexToRgba(c1, 0.53))
      ctx.fillStyle = g
      ctx.globalAlpha = alpha * 0.6
      ctx.fill()
    } else {
      // 앞면: 밝은 패싯 컬러
      const bright = Math.max(0.2, brightness * facetLight)
      const g = ctx.createLinearGradient(a.x, a.y, c.x, c.y)

      // 밝은 패싯 vs 어두운 패싯 교차 — 이게 보석의 핵심!
      if (facetLight > 0.65) {
        // 밝은 패싯 (흰빛 혼합)
        g.addColorStop(0, hexToRgba(chi, 1.0))
        g.addColorStop(0.4, `rgba(255,255,255,${(Math.round(bright * 200) / 255).toFixed(3)})`)
        g.addColorStop(1, hexToRgba(c2, 0.87))
      } else if (facetLight > 0.35) {
        // 중간 패싯
        g.addColorStop(0, hexToRgba(c2, 0.93))
        g.addColorStop(0.5, hexToRgba(c1, 0.8))
        g.addColorStop(1, hexToRgba(chi, 0.6))
      } else {
        // 어두운 패싯 (색이 깊게)
        g.addColorStop(0, hexToRgba(c1, 0.8))
        g.addColorStop(1, hexToRgba(c1, 0.47))
      }

      ctx.fillStyle = g
      ctx.globalAlpha = alpha
      ctx.fill()

      // 패싯 경계선
      ctx.globalAlpha = 0.25
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'
      ctx.lineWidth = 0.8
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }

  render(rotX: number, rotY: number, floatY = 0) {
    const { ctx, size } = this
    ctx.clearRect(0, 0, size, size)

    if (!this.geo || !this.pillar) return
    const p = this.pillar as Pillar & { gemC1?: string; gemC2?: string; gemHi?: string }
    const st = STEMS[p.stem],
      br = BRANCHES[p.branch]
    const c1 = p.gemC1 ?? st.c1
    const c2 = p.gemC2 ?? st.c2
    const hi = p.gemHi ?? st.hi
    const brhi = p.gemHi ?? br.hi

    const pos = (this.geo as any).attributes.position as THREE.BufferAttribute
    const idx = (this.geo as any).index as THREE.BufferAttribute | null

    // 중앙 위치 보정 (floatY)
    const floatPx = floatY * 15

    // 모든 삼각형 수집 후 Z기준 정렬(화가 알고리즘)
    const tris: Array<{ pts: any[]; z: number; idx: number }> = []
    const triCount = idx ? (idx as any).count / 3 : (pos as any).count / 3

    for (let t = 0; t < triCount; t++) {
      let i0: number, i1: number, i2: number
      if (idx) {
        i0 = (idx as any).getX(t * 3)
        i1 = (idx as any).getX(t * 3 + 1)
        i2 = (idx as any).getX(t * 3 + 2)
      } else {
        i0 = t * 3
        i1 = t * 3 + 1
        i2 = t * 3 + 2
      }

      const p0 = this.project((pos as any).getX(i0), (pos as any).getY(i0) + floatPx / 30, (pos as any).getZ(i0), rotX, rotY)
      const p1 = this.project((pos as any).getX(i1), (pos as any).getY(i1) + floatPx / 30, (pos as any).getZ(i1), rotX, rotY)
      const p2 = this.project((pos as any).getX(i2), (pos as any).getY(i2) + floatPx / 30, (pos as any).getZ(i2), rotX, rotY)

      const avgZ = (p0.z + p1.z + p2.z) / 3
      tris.push({ pts: [p0, p1, p2], z: avgZ, idx: t })
    }

    tris.sort((a, b) => a.z - b.z)

    // fill 완전 투명이면 stroke만 (와이어프레임)
    const alpha1 = this.parseRgbaAlpha(c1)
    const alpha2 = this.parseRgbaAlpha(c2)
    if (alpha1 === 0 && alpha2 === 0) {
      ctx.save()
      ctx.strokeStyle = hi.startsWith("rgba") ? hi : hexToRgba(hi, 1)
      ctx.lineWidth = 1.2
      tris.forEach(({ pts }) => {
        const [a, b, c] = pts
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.lineTo(c.x, c.y)
        ctx.closePath()
        ctx.stroke()
      })
      ctx.restore()
      return
    }

    // 보석 윤곽선으로 클리핑 — 배경 fill이 보석 바깥으로 나가지 않게
    ctx.save()
    ctx.beginPath()
    // 앞면 패싯들의 외곽을 모아 클리핑 경로 구성
    tris.forEach(({ pts }) => {
      const [a, b, c] = pts
      const ax = b.x - a.x,
        ay = b.y - a.y,
        bx = c.x - a.x,
        by = c.y - a.y
      if (ax * by - ay * bx < 0) return // 뒷면 제외
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.lineTo(c.x, c.y)
      ctx.closePath()
    })
    ctx.clip()

    const r = size * 0.47 // glow/highlight 계산에만 사용

    // 1) 내부 색상 glow
    const bg = ctx.createRadialGradient(size * 0.38, size * 0.32 + floatPx, 0, size * 0.5, size * 0.5 + floatPx, r * 0.85)
    bg.addColorStop(0, hexToRgba(hi, 0.4))
    bg.addColorStop(0.35, hexToRgba(c2, 0.33))
    bg.addColorStop(0.7, hexToRgba(c1, 0.27))
    bg.addColorStop(1, 'transparent')
    ctx.fillStyle = bg
    ctx.globalAlpha = 0.35
    ctx.fillRect(0, 0, size, size)
    ctx.globalAlpha = 1

    // 2) 뒷면 패싯 (깊이감)
    tris.forEach(({ pts, z }) => {
      this.drawFacet(ctx, pts, z, c1, c2, brhi, 0.45, true)
    })

    // 3) 앞면 패싯
    tris.forEach(({ pts, z }) => {
      this.drawFacet(ctx, pts, z, c1, c2, brhi, 0.9, false)
    })

    // 4) 밝은 내부 발광 (중앙 코어)
    const core = ctx.createRadialGradient(size * 0.4, size * 0.36 + floatPx, 0, size * 0.5, size * 0.5 + floatPx, r * 0.7)
    core.addColorStop(0, 'rgba(255,255,255,0.6)')
    core.addColorStop(0.25, hexToRgba(hi, 0.53))
    core.addColorStop(0.6, hexToRgba(c2, 0.27))
    core.addColorStop(1, 'transparent')
    ctx.fillStyle = core
    ctx.globalAlpha = 0.7
    ctx.fillRect(0, 0, size, size)
    ctx.globalAlpha = 1

    // 5) 외곽 유리 느낌 (테두리 반사)
    const edge = ctx.createRadialGradient(size * 0.5, size * 0.5 + floatPx, r * 0.75, size * 0.5, size * 0.5 + floatPx, r)
    edge.addColorStop(0, 'transparent')
    edge.addColorStop(0.7, hexToRgba(c2, 0.27))
    edge.addColorStop(1, 'rgba(255,255,255,0.53)')
    ctx.fillStyle = edge
    ctx.globalAlpha = 0.6
    ctx.fillRect(0, 0, size, size)
    ctx.globalAlpha = 1

    // 6) 하이라이트 스팟
    const hspot = ctx.createRadialGradient(size * 0.34, size * 0.28 + floatPx, 0, size * 0.34, size * 0.28 + floatPx, size * 0.12)
    hspot.addColorStop(0, '#ffffff')
    hspot.addColorStop(0.4, 'rgba(255,255,255,0.6)')
    hspot.addColorStop(1, 'transparent')
    ctx.fillStyle = hspot
    ctx.globalAlpha = 1.0
    ctx.fillRect(0, 0, size, size)

    // 작은 보조 하이라이트
    const hspot2 = ctx.createRadialGradient(size * 0.62, size * 0.22 + floatPx, 0, size * 0.62, size * 0.22 + floatPx, size * 0.06)
    hspot2.addColorStop(0, 'rgba(255,255,255,0.73)')
    hspot2.addColorStop(1, 'transparent')
    ctx.fillStyle = hspot2
    ctx.fillRect(0, 0, size, size)
    ctx.globalAlpha = 1

    ctx.restore()

    // 7) 외부 glow
    ctx.globalCompositeOperation = 'source-over'
    const glow = ctx.createRadialGradient(size * 0.5, size * 0.5 + floatPx, r * 0.6, size * 0.5, size * 0.5 + floatPx, r * 1.15)
    glow.addColorStop(0, 'transparent')
    glow.addColorStop(0.5, hexToRgba(c1, 0.09))
    glow.addColorStop(0.8, hexToRgba(brhi, 0.13))
    glow.addColorStop(1, 'transparent')
    ctx.fillStyle = glow
    ctx.globalAlpha = 0.8
    ctx.fillRect(0, 0, size, size)
    ctx.globalAlpha = 1
  }
}

