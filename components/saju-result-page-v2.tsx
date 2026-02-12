"use client"

import { useRef, useState, useEffect } from "react"
import { Info } from "lucide-react"
import type { SajuChart, Element } from "@/lib/saju"
import { getDayPillarInterpretation, hasDayPillarData, getVibeLabelKo } from "@/lib/saju/pillar-interpretations"
import { STEMS, BRANCHES, PILLAR_NAMES, BSH, SSH } from "@/lib/gem-renderer"
import { DayPillarGem } from "@/components/DayPillarGem"
import { PillarCodes } from "@/components/pillar-codes"
import { FullScreenSlideModal } from "@/components/full-screen-slide-modal"
import { PillarsDetailContent } from "@/components/pillars-modal"
import { GemCreationCard } from "@/components/gem-creation-card"
import { ElementalBalanceChart } from "@/components/elemental-balance-chart"
import { AIAnalysisSection } from "@/components/ai-analysis-section"
import { ForgeAnimation } from "@/components/ForgeAnimation"
import { Button } from "@/components/ui/button"
import { metaphorDictionary } from "@/lib/data/metaphor-dictionary"
import {
  elementMetaphor,
  elementStrength,
  type ElementKey,
} from "@/lib/data/element-metaphor"
import {
  sipseongMetaphor,
  type SipseongKey,
} from "@/lib/data/sipseong-metaphor"
import {
  jijangganMetaphor,
  hiddenCrystalCount,
  type JijangganKey,
} from "@/lib/data/jijanggan-metaphor"
import {
  daewoonMetaphor,
  type CheonganKey,
  type JijiKey,
} from "@/lib/data/daewoon-metaphor"
import { calculateDaewoonList } from "@/lib/saju/daewoon"
import { CompatibilitySection } from "@/components/compatibility-section"

/** 지지별 지장간(숨겨진 천간) */
const HIDDEN_STEMS_BY_BRANCH: Record<string, string[]> = {
  子: ["壬", "癸"],
  丑: ["己", "癸", "辛"],
  寅: ["甲", "丙", "戊"],
  卯: ["甲", "乙"],
  辰: ["戊", "乙", "癸"],
  巳: ["丙", "庚", "戊"],
  午: ["丙", "己", "丁"],
  未: ["己", "丁", "乙"],
  申: ["庚", "壬", "戊"],
  酉: ["庚", "辛"],
  戌: ["戊", "辛", "丁"],
  亥: ["壬", "甲"],
}

/** 천간별 잠재력 특성 한 줄 */
const STEM_TRAIT: Record<string, string> = {
  甲: "개척하는 강인한 생명력",
  乙: "유연하게 적응하는 감수성",
  丙: "세상을 밝히는 강렬한 열정",
  丁: "내면을 태우는 섬세한 불꽃",
  戊: "흔들리지 않는 묵직한 의지",
  己: "모든 것을 품는 너그러운 대지",
  庚: "단호하게 결단하는 금속의 날",
  辛: "완벽을 추구하는 정밀한 감각",
  壬: "거침없이 흐르는 깊은 지혜",
  癸: "고요히 스며드는 신비로운 직관",
}

/** 천간·지지 한자 → 한글 읽기 (gemStory 등에서 한자 뒤에 (한글) 표기용) */
const HANZI_READING: Record<string, string> = {
  甲: "갑", 乙: "을", 丙: "병", 丁: "정", 戊: "무", 己: "기", 庚: "경", 辛: "신", 壬: "임", 癸: "계",
  子: "자", 丑: "축", 寅: "인", 卯: "묘", 辰: "진", 巳: "사", 午: "오", 未: "미", 申: "신", 酉: "유", 戌: "술", 亥: "해",
}

function gemStoryWithReadings(text: string): string {
  let out = text
  for (const [hanzi, reading] of Object.entries(HANZI_READING)) {
    out = out.replace(new RegExp(hanzi, "g"), `${hanzi}(${reading})`)
  }
  return out
}

const ELEMENT_STEM_COLOR: Record<Element, string> = {
  wood: "甲",
  fire: "丙",
  earth: "戊",
  metal: "庚",
  water: "壬",
}

/** Element(영문) → 한자 키 매핑 */
const ELEMENT_TO_HANJA: Record<Element, ElementKey> = {
  wood: "木",
  fire: "火",
  earth: "土",
  metal: "金",
  water: "水",
}

/** 오행 강약 판단 */
function getElementStrength(percent: number): keyof typeof elementStrength {
  if (percent >= 35) return "veryStrong"
  if (percent >= 25) return "strong"
  if (percent >= 15) return "balanced"
  if (percent >= 10) return "weak"
  return "veryWeak"
}

const ELEMENT_NAMES: Record<Element, string> = {
  wood: elementMetaphor.木.simple,
  fire: elementMetaphor.火.simple,
  earth: elementMetaphor.土.simple,
  metal: elementMetaphor.金.simple,
  water: elementMetaphor.水.simple,
}

const ELEMENT_EMOJI: Record<Element, string> = {
  wood: elementMetaphor.木.icon,
  fire: elementMetaphor.火.icon,
  earth: elementMetaphor.土.icon,
  metal: elementMetaphor.金.icon,
  water: elementMetaphor.水.icon,
}

export interface SajuResultPageProps {
  saju: SajuChart
  onClose: () => void
}

interface SajuResultPageV2Props extends SajuResultPageProps {
  onSwitchToClassic?: () => void
  onForgeComplete?: () => void
}

function dataUrlToFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(",")
  const mime = arr[0].match(/:(.*?);/)?.[1] ?? "image/png"
  const bstr = atob(arr[1])
  const n = bstr.length
  const u8arr = new Uint8Array(n)
  for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i)
  return new File([u8arr], filename, { type: mime })
}

export function SajuResultPageV2({ saju, onClose, onSwitchToClassic, onForgeComplete }: SajuResultPageV2Props) {
  const [forgeOpacity, setForgeOpacity] = useState(1)
  const [showForge, setShowForge] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [contentOpacity, setContentOpacity] = useState(0)

  const handleForgeComplete = () => {
    setForgeOpacity(0)
    setTimeout(() => {
      setShowForge(false)
      setShowContent(true)
      onForgeComplete?.()
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setContentOpacity(1)
        })
      })
    }, 1000)
  }

  const gemCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const heroCardRef = useRef<HTMLDivElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const [codesInfoOpen, setCodesInfoOpen] = useState(false)

  useEffect(() => {
    const hasUsedAI = typeof window !== "undefined" ? localStorage.getItem("ai_analysis_used") : null
    setIsFirstVisit(!hasUsedAI)
  }, [])

  const hasPillarData = hasDayPillarData(saju.day.stem, saju.day.branch)
  const pillarData = hasPillarData ? getDayPillarInterpretation(saju.day.stem, saju.day.branch) : null
  const hanzi = `${saju.day.stem}${saju.day.branch}`
  const pillarNamesEntry = PILLAR_NAMES[hanzi]
  const stemInfo = STEMS[saju.day.stem]
  const branchInfo = BRANCHES[saju.day.branch]

  const gemC1 = pillarNamesEntry?.gemC1 ?? stemInfo?.c1 ?? "#888"
  const gemC2 = pillarNamesEntry?.gemC2 ?? stemInfo?.c2 ?? "#aaa"
  const gemHi = pillarNamesEntry?.gemHi ?? branchInfo?.hi ?? "#ccc"
  const titleGradient = `linear-gradient(135deg, ${gemC1}, ${gemC2}, ${gemHi})`

  const elementsEntries = (Object.entries(saju.elements) as [Element, number][]).sort((a, b) => b[1] - a[1])
  const dominantElement = elementsEntries[0]
  const weakElement = elementsEntries[elementsEntries.length - 1]
  const dominantKey = dominantElement?.[0]
  const weakKey = weakElement?.[0]
  const dominantColor = dominantKey ? STEMS[ELEMENT_STEM_COLOR[dominantKey]]?.c1 : "#888"
  const weakColor = weakKey ? STEMS[ELEMENT_STEM_COLOR[weakKey]]?.c1 : "#666"

  const facetGemC1 = pillarNamesEntry?.gemC1 ?? gemC1
  const facetGemC2 = pillarNamesEntry?.gemC2 ?? gemC2

  const drawGemCard = (): Promise<string> => {
    return new Promise((resolve) => {
      document.fonts.ready.then(() => {

        // ── 헬퍼 ──────────────────────────────────────────────
        const hexToRgba = (hex: string, alpha: number): string => {
          if (!hex || !hex.startsWith('#')) return `rgba(180,140,80,${alpha})`
          const h = hex.replace('#', '')
          const r = parseInt(h.slice(0, 2), 16)
          const g = parseInt(h.slice(2, 4), 16)
          const b = parseInt(h.slice(4, 6), 16)
          return `rgba(${r},${g},${b},${alpha})`
        }

        const wrapText = (
          ctx: CanvasRenderingContext2D,
          text: string,
          maxW: number,
          lineH: number
        ): { lines: string[]; totalH: number } => {
          const words = text.split(' ')
          const lines: string[] = []
          let cur = ''
          words.forEach(w => {
            const test = cur ? cur + ' ' + w : w
            if (ctx.measureText(test).width > maxW && cur) {
              lines.push(cur)
              cur = w
            } else {
              cur = test
            }
          })
          if (cur) lines.push(cur)
          return { lines, totalH: lines.length * lineH }
        }

        const drawRoundRect = (
          ctx: CanvasRenderingContext2D,
          x: number, y: number, w: number, h: number, r: number
        ) => {
          ctx.beginPath()
          ctx.moveTo(x + r, y)
          ctx.lineTo(x + w - r, y)
          ctx.quadraticCurveTo(x + w, y, x + w, y + r)
          ctx.lineTo(x + w, y + h - r)
          ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
          ctx.lineTo(x + r, y + h)
          ctx.quadraticCurveTo(x, y + h, x, y + h - r)
          ctx.lineTo(x, y + r)
          ctx.quadraticCurveTo(x, y, x + r, y)
          ctx.closePath()
        }

        // ── 데이터 (컴포넌트 스코프) ────────────────────────────
        const gemEn = pillarNamesEntry?.gemEn ?? ''
        const gemKo = pillarNamesEntry?.gem ?? ''
        const archText = pillarNamesEntry?.arch ?? ''
        const subtitleText = pillarData?.persona?.subtitle ?? pillarNamesEntry?.subtitle ?? ''
        const storyText = pillarNamesEntry?.gemStory ?? ''
        const personalityText = pillarData?.description ?? ''
        const tagList = (pillarData?.persona?.vibe ?? []).map((t: string) => getVibeLabelKo(t))
        const hanziText = hanzi || ''
        const c1 = gemC1 || '#8B6914'
        const c2 = gemC2 || '#C8981C'

        // ── 레이아웃 상수 ──────────────────────────────────────
        const W = 390
        const SCALE = 2
        const PAD = 24
        const INNER = W - PAD * 2
        const CARD_PAD = 20

        // ── 줄 수 사전 계산 (임시 ctx) ────────────────────────
        const tmpC = document.createElement('canvas')
        tmpC.width = W * SCALE
        tmpC.height = 100
        const tmpCtx = tmpC.getContext('2d')!
        tmpCtx.scale(SCALE, SCALE)

        tmpCtx.font = '14px sans-serif'
        const storyMaxW = INNER - 16
        const storyWrapped = wrapText(tmpCtx, storyText, storyMaxW, 22)

        tmpCtx.font = '14px sans-serif'
        const pMaxW = INNER - CARD_PAD * 2
        const pWrapped = wrapText(tmpCtx, personalityText, pMaxW, 22)

        // ── 높이 계산 ─────────────────────────────────────────
        const GEM_H = 280
        const STORY_H = storyWrapped.totalH + 8
        const P_H = pWrapped.totalH
        const CARD_BOX_H = CARD_PAD + 28 + 20 + 12 + P_H + 12 + 30 + CARD_PAD

        const H = (
          48 + 22 + 18 + 12 + GEM_H + 16 + 1 + 20 + STORY_H + 16 + CARD_BOX_H + 32
        )

        // ── 본 캔버스 생성 ────────────────────────────────────
        const canvas = document.createElement('canvas')
        canvas.width = W * SCALE
        canvas.height = H * SCALE
        const ctx = canvas.getContext('2d')!
        ctx.scale(SCALE, SCALE)

        ctx.fillStyle = '#0a0a12'
        ctx.fillRect(0, 0, W, H)

        drawRoundRect(ctx, 12, 12, W - 24, H - 24, 16)
        ctx.fillStyle = 'rgba(255,255,255,0.04)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,0.08)'
        ctx.lineWidth = 1
        ctx.stroke()

        let y = 48

        // ── 1. 보석명 ───────────────────────────────────────────
        ctx.textAlign = 'center'
        ctx.font = 'italic 600 22px "Playfair Display", Georgia, serif'
        ctx.fillStyle = c2
        ctx.fillText(gemEn, W / 2, y)
        y += 22

        ctx.font = '300 12px monospace'
        ctx.fillStyle = 'rgba(255,255,255,0.38)'
        ctx.fillText('· ' + gemKo, W / 2, y)
        y += 18

        // ── 2. 보석 glow ───────────────────────────────────────
        const gemCx = W / 2
        const gemCy = y + GEM_H / 2
        const glow = ctx.createRadialGradient(gemCx, gemCy, 0, gemCx, gemCy, 180)
        glow.addColorStop(0, hexToRgba(c1, 0.3))
        glow.addColorStop(0.5, hexToRgba(c1, 0.1))
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.fillRect(0, y, W, GEM_H + 20)

        const gemCanvas = document.querySelector('canvas[data-gem="true"]') as HTMLCanvasElement | null
        if (gemCanvas) {
          const size = 220
          ctx.drawImage(gemCanvas, W / 2 - size / 2, y + (GEM_H - size) / 2, size, size)
        }
        y += GEM_H

        // ── 3. 구분선 ───────────────────────────────────────────
        y += 16
        ctx.beginPath()
        ctx.moveTo(PAD, y)
        ctx.lineTo(W - PAD, y)
        ctx.strokeStyle = 'rgba(255,255,255,0.07)'
        ctx.lineWidth = 1
        ctx.stroke()
        y += 20

        // ── 4. gemStory ────────────────────────────────────────
        ctx.beginPath()
        ctx.moveTo(PAD, y)
        ctx.lineTo(PAD, y + STORY_H + 4)
        ctx.strokeStyle = c1
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.font = '300 14px sans-serif'
        ctx.textAlign = 'left'

        const boldEndIdx = storyText.indexOf('입니다.') + 4
        const boldPart = storyText.slice(0, boldEndIdx)

        let lineY = y + 16
        storyWrapped.lines.forEach((line, i) => {
          if (i === 0) {
            const boldInLine = boldPart.length <= line.length
              ? boldPart
              : line
            const restInLine = line.slice(boldInLine.length)

            ctx.fillStyle = c2
            ctx.fillText(boldInLine, PAD + 12, lineY)

            if (restInLine) {
              const boldW = ctx.measureText(boldInLine).width
              ctx.fillStyle = 'rgba(255,255,255,0.72)'
              ctx.fillText(restInLine, PAD + 12 + boldW, lineY)
            }
          } else {
            ctx.fillStyle = 'rgba(255,255,255,0.72)'
            ctx.fillText(line, PAD + 12, lineY)
          }
          lineY += 22
        })
        y += STORY_H + 16

        // ── 5. 카드박스 ────────────────────────────────────────
        const boxX = PAD - 8
        const boxW = W - (PAD - 8) * 2
        drawRoundRect(ctx, boxX, y, boxW, CARD_BOX_H, 12)
        ctx.fillStyle = 'rgba(255,255,255,0.04)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,0.08)'
        ctx.lineWidth = 1
        ctx.stroke()

        y += CARD_PAD

        ctx.textAlign = 'left'
        ctx.font = 'italic 500 20px "Playfair Display", Georgia, serif'
        ctx.fillStyle = c2
        ctx.fillText(archText, PAD, y)

        const archW = ctx.measureText(archText).width
        const hBoxX = PAD + archW + 8
        const hBoxY = y - 18
        const hBoxW = 54
        const hBoxH = 24
        drawRoundRect(ctx, hBoxX, hBoxY, hBoxW, hBoxH, 5)
        ctx.strokeStyle = hexToRgba(c1, 0.6)
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.fillStyle = hexToRgba(c1, 0.15)
        ctx.fill()
        ctx.font = '400 14px serif'
        ctx.fillStyle = c1
        ctx.textAlign = 'center'
        ctx.fillText(hanziText, hBoxX + hBoxW / 2, hBoxY + 16)

        y += 28

        ctx.textAlign = 'left'
        ctx.font = '300 12px sans-serif'
        ctx.fillStyle = 'rgba(255,255,255,0.38)'
        ctx.fillText(subtitleText, PAD, y)
        y += 20 + 12

        ctx.font = '300 14px sans-serif'
        ctx.fillStyle = 'rgba(255,255,255,0.75)'
        pWrapped.lines.forEach(line => {
          ctx.fillText(line, PAD, y)
          y += 22
        })
        y += 12

        ctx.font = '300 11px monospace'
        let tagX = PAD
        tagList.forEach((tag: string) => {
          const tw = ctx.measureText(tag).width + 22
          drawRoundRect(ctx, tagX, y, tw, 24, 12)
          ctx.strokeStyle = 'rgba(255,255,255,0.18)'
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.fillStyle = 'rgba(255,255,255,0)'
          ctx.fill()
          ctx.fillStyle = 'rgba(255,255,255,0.55)'
          ctx.textAlign = 'left'
          ctx.fillText(tag, tagX + 11, y + 16)
          tagX += tw + 6
        })

        y += CARD_PAD + 24

        ctx.textAlign = 'center'
        ctx.font = '300 10px monospace'
        ctx.fillStyle = 'rgba(255,255,255,0.18)'
        ctx.fillText(`SAJU GEM · ${metaphorDictionary.core.saju.simple}`, W / 2, y)

        resolve(canvas.toDataURL('image/png'))
      })
    })
  }

  const handleShare = async () => {
    setIsCapturing(true)
    try {
      const imageUrl = await drawGemCard()
      const gemLabel = pillarNamesEntry?.gem ?? "보석"

      if (typeof navigator !== "undefined" && navigator.share && navigator.canShare) {
        const blob = await (await fetch(imageUrl)).blob()
        const file = new File([blob], `보석카드-${hanzi}.png`, { type: "image/png" })
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `나의 보석: ${gemLabel}`,
            text: `${hanzi} ${pillarNamesEntry?.arch ?? ""}`,
          })
          return
        }
      }
      const a = document.createElement("a")
      a.href = imageUrl
      a.download = `보석카드-${hanzi}-${gemLabel}.png`
      a.click()
    } catch (err) {
      console.error("캡처 실패:", err)
    } finally {
      setIsCapturing(false)
    }
  }

  const bsh = BSH[saju.day.branch]
  const ssh = SSH[saju.day.stem]
  const pillarInfo = {
    stem: saju.day.stem,
    branch: saju.day.branch,
    elem: stemInfo?.elem ?? "wood",
    yin: stemInfo?.yin ?? 0,
    season: branchInfo?.season ?? "",
    n: bsh?.n ?? 6,
    sh: ssh?.sh ?? 1,
    sx: ssh?.sx ?? 1,
    twist: bsh?.twist ?? 0,
  }
  const pillarName = {
    arch: pillarNamesEntry?.arch ?? "",
    gem: pillarNamesEntry?.gem ?? "",
    gemEn: pillarNamesEntry?.gemEn ?? "",
  }

  return (
    <>
      {/* 결과 페이지 — showContent일 때만 DOM에 있음, Forge 제거 후 fade in */}
      {showContent && (
        <div
          className="fixed inset-0 overflow-y-auto bg-background"
          style={{
            zIndex: 50,
            opacity: contentOpacity,
            transition: "opacity 0.6s ease-in",
          }}
        >
      {/* 헤더 */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1 p-2 -ml-2 hover:bg-secondary/50 rounded-md transition-colors text-foreground/90"
            aria-label="뒤로"
          >
            ← Back
          </button>
          <h1 className="font-serif italic flex-1 text-center">Your 8-Code Reading</h1>
          {onSwitchToClassic && (
            <button
              type="button"
              onClick={onSwitchToClassic}
              className="shrink-0 font-mono text-xs text-foreground/90 font-medium px-2 py-1.5 rounded border border-primary/30 bg-primary/10"
              aria-label="클래식 디자인으로 전환"
            >
              ✦ NEW
            </button>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Card — 보석 → 보석명 → gemStory → [내부 박스] → 공유 */}
        <div ref={heroCardRef} className="mt-6 rounded-2xl border border-border/30 bg-card/50 overflow-hidden">
          {/* 보석 (위아래 간격) */}
          <div className="relative flex items-center justify-center pt-2 pb-4">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                style={{
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${gemC1}33 0%, ${gemC1}11 50%, transparent 70%)`,
                }}
              />
            </div>
            <DayPillarGem
              stem={saju.day.stem}
              branch={saju.day.branch}
              size={240}
              dataGem
            />
          </div>

          {/* 보석명 (영어 · 한글 한 줄, 보석 아래, 작은 폰트) */}
          <div className="px-6 pb-6 text-center">
            <p className="font-serif italic leading-tight text-sm">
              <span
                style={{
                  background: `linear-gradient(135deg, ${gemC2}, ${gemHi})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {pillarNamesEntry?.gemEn ?? pillarNamesEntry?.gem ?? stemInfo?.gemBase ?? "보석"}
              </span>
              {pillarNamesEntry?.gemEn != null && pillarNamesEntry?.gem != null && (
                <span className="text-muted-foreground font-normal ml-1.5">
                  · {pillarNamesEntry.gem}
                </span>
              )}
            </p>
          </div>

          {/* 보석 스토리 (gemStory) — 보석명 아래 */}
          {pillarNamesEntry?.gemStory && (() => {
            const raw = pillarNamesEntry.gemStory
            const withReadings = gemStoryWithReadings(raw)
            const firstSentenceEnd = withReadings.search(/입니다\.|습니다\./)
            const firstEnd = firstSentenceEnd >= 0 ? firstSentenceEnd + 5 : withReadings.length
            const firstSentence = withReadings.slice(0, firstEnd)
            const rest = withReadings.slice(firstEnd).trimStart()
            return (
              <div className="px-6 pt-2 pb-6">
                <div
                  className="text-sm leading-relaxed border-l-2 pl-4"
                  style={{ borderColor: gemC1 }}
                >
                  <span style={{ color: gemC2 }}>{firstSentence}</span>
                  {rest ? <span className="text-foreground/75"> {rest}</span> : null}
                </div>
              </div>
            )
          })()}

          {/* 8 Codes / 사주팔자 — 내부 박스 위 */}
          <section className="mx-4 mb-4 rounded-xl border border-border/40 bg-card/80 p-5">
            <div className="translation-bridge mb-4 justify-center">
              <span className="original">{metaphorDictionary.core.palja.original}</span>
              <span className="arrow">→</span>
              <span className="simple">{metaphorDictionary.core.palja.simple}</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/80">
                8 CODES / {metaphorDictionary.core.palja.simple}
              </h2>
              <button
                type="button"
                onClick={() => setCodesInfoOpen(true)}
                className="p-1 rounded-full text-muted-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
                aria-label={`${metaphorDictionary.core.palja.original} 설명 보기`}
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
            <PillarCodes saju={saju} />
            <FullScreenSlideModal
              open={codesInfoOpen}
              onClose={() => setCodesInfoOpen(false)}
              title="8 Codes"
              subtitle={`${metaphorDictionary.core.saju.original} ${metaphorDictionary.core.palja.original} — Four Pillars of Destiny`}
              ariaLabel={`8 Codes / ${metaphorDictionary.core.palja.simple} 설명`}
            >
              <PillarsDetailContent />
            </FullScreenSlideModal>
          </section>

          {/* 내부 박스 (아키타입 + 한자 + 부제 → 긴 설명) — 지장간 아래 */}
          <div className="mx-4 mb-4 rounded-xl border border-border/40 bg-card/80 p-5">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2
                className="font-serif italic leading-tight"
                style={{
                  fontSize: 22,
                  background: `linear-gradient(135deg, ${gemC2}, ${gemHi})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {pillarNamesEntry?.arch ?? ""}
              </h2>
              <span
                className="inline-flex items-center justify-center font-serif leading-none rounded-md px-2.5 py-0.5"
                style={{
                  fontSize: 22,
                  whiteSpace: "nowrap",
                  border: `1px solid ${gemC1}66`,
                  background: `${gemC1}18`,
                  color: gemC1,
                }}
              >
                {saju.day.stem}
                {saju.day.branch}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {pillarData?.persona?.subtitle ?? pillarNamesEntry?.subtitle ?? pillarNamesEntry?.desc ?? ""}
            </p>
            <p className="text-sm leading-relaxed text-foreground/80 mt-3">
              {pillarData?.description ?? ""}
            </p>
          </div>

          {/* 강점 · 주의할 점 · 추천 직업·분야 (클래식 태그 스타일) */}
          {hasPillarData && pillarData && (
            <div className="mx-4 mb-6 space-y-4">
              {/* 강점 */}
              {pillarData.strengths && pillarData.strengths.length > 0 && (
                <section className="p-5 rounded-xl bg-card/50 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl text-emerald-500">✓</span>
                    <h3 className="text-lg font-semibold">강점</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {pillarData.strengths.map((s, i) => (
                      <span
                        key={i}
                        className="px-5 py-2.5 rounded-full bg-emerald-500/10 text-sm text-emerald-500 border border-emerald-500/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </section>
              )}
              {/* 주의할 점 */}
              {pillarData.challenges && pillarData.challenges.length > 0 && (
                <section className="p-5 rounded-xl bg-card/50 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl text-amber-500">!</span>
                    <h3 className="text-lg font-semibold">주의할 점</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {pillarData.challenges.map((c, i) => (
                      <span
                        key={i}
                        className="px-5 py-2.5 rounded-full bg-amber-500/10 text-sm text-amber-500 border border-amber-500/30"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </section>
              )}
              {/* 추천 직업·분야 */}
              {pillarData.career?.best && pillarData.career.best.length > 0 && (
                <section className="p-5 rounded-xl bg-card/50 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl text-blue-500">💼</span>
                    <h3 className="text-lg font-semibold">추천 직업·분야</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {pillarData.career.best.map((career, i) => (
                      <span
                        key={i}
                        className="px-5 py-2.5 rounded-full bg-blue-500/10 text-sm text-blue-500 border border-blue-500/30"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* 보석 제련 카드 */}
          <div className="px-4 mb-6">
            <GemCreationCard saju={saju} />
          </div>

          {/* 보석 카드 저장 버튼 */}
          <div className="px-6 pb-6 flex justify-center">
            <button
              type="button"
              onClick={handleShare}
              disabled={isCapturing}
              className="px-6 py-3 rounded-xl font-medium text-sm tracking-wide transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-md disabled:opacity-50 disabled:pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${gemC2}, ${gemC1})`,
                color: "white",
                border: "none",
              }}
            >
              {isCapturing ? "저장 중..." : "✦ 보석 카드 저장하기"}
            </button>
          </div>
        </div>

        {/* 에너지 밸런스 — Hero 바로 아래 */}
        <section className="rounded-lg border border-border bg-card p-6 pb-8 border-b border-border">
          <div className="translation-bridge mb-2">
            <span className="original">{metaphorDictionary.energy.ohang.original}</span>
            <span className="arrow">→</span>
            <span className="simple">{metaphorDictionary.energy.ohang.simple}</span>
          </div>
          <p className="text-xs font-mono tracking-wider text-muted-foreground mb-1">
            {`ENERGY BALANCE / ${metaphorDictionary.energy.energyBalance.simple}`}
          </p>
          <h2 className="text-lg font-serif italic text-foreground mb-6">
            {metaphorDictionary.energy.energyBalance.description}
          </h2>

          <div className="flex justify-center mb-6">
            <ElementalBalanceChart
              elements={saju.elements}
              elementNames={ELEMENT_NAMES}
              className="max-w-full"
            />
          </div>

          {dominantKey && (() => {
            const hanja = ELEMENT_TO_HANJA[dominantKey]
            const meta = elementMetaphor[hanja]
            const strength = getElementStrength(dominantElement[1])
            const isOver = strength === "veryStrong" || strength === "strong"
            return (
              <div
                className="rounded-xl p-4 mb-3 border"
                style={{
                  backgroundColor: `${dominantColor}18`,
                  borderColor: `${dominantColor}30`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{ELEMENT_EMOJI[dominantKey]}</span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {elementStrength[strength].label}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {meta.simple}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-black/10 overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${dominantElement[1]}%`,
                      backgroundColor: dominantColor,
                    }}
                  />
                </div>
                {isOver && (
                  <div className="text-xs text-foreground/90 leading-relaxed space-y-1">
                    <p>&quot;{meta.when_strong.negative}&quot;</p>
                    <p className="text-primary/90">{meta.when_strong.advice}</p>
                  </div>
                )}
              </div>
            )
          })()}

          {weakKey && (() => {
            const hanja = ELEMENT_TO_HANJA[weakKey]
            const meta = elementMetaphor[hanja]
            const strength = getElementStrength(weakElement[1])
            const isVeryWeak = strength === "veryWeak"
            return (
              <div
                className="rounded-xl p-4 mb-4 border"
                style={{
                  backgroundColor: `${weakColor}18`,
                  borderColor: `${weakColor}30`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{ELEMENT_EMOJI[weakKey]}</span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {elementStrength[strength].label}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {meta.simple}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-black/10 overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${weakElement[1]}%`,
                      backgroundColor: weakColor,
                    }}
                  />
                </div>
                <div className="text-xs text-foreground/90 leading-relaxed space-y-1">
                  <p>&quot;{meta.when_weak.negative}&quot;</p>
                  <p className="text-primary/90">{meta.when_weak.advice}</p>
                  {isVeryWeak && "lucky" in meta.when_weak && (
                    <p className="text-[#8b5cf6] font-medium">
                      {meta.when_weak.lucky}
                    </p>
                  )}
                </div>
              </div>
            )
          })()}

          {weakKey && (() => {
            const hanja = ELEMENT_TO_HANJA[weakKey]
            const meta = elementMetaphor[hanja]
            const boost = meta.boost
            return (
              <div className="rounded-xl p-4 bg-secondary/20 border border-border/30">
                <p className="text-xs font-mono text-muted-foreground mb-1">
                  ✦ 오늘의 행운 아이템
                </p>
                <p className="text-sm font-medium text-foreground mb-0.5">
                  {boost.item}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  {meta.when_weak.advice}
                </p>
                <p className="text-xs text-muted-foreground/80">
                  색상: {boost.color} · 방향: {boost.direction}
                </p>
              </div>
            )
          })()}
        </section>

        {/* 십성 — 나를 비추는 사람들 */}
        {saju.sipseongCounts && Object.keys(saju.sipseongCounts).length > 0 && (
          <section className="rounded-lg border border-border bg-card p-6 pb-8">
            <div className="translation-bridge mb-2">
              <span className="original">{metaphorDictionary.relationship.sipseong.original}</span>
              <span className="arrow">→</span>
              <span className="simple">{metaphorDictionary.relationship.sipseong.simple}</span>
            </div>
            <p className="text-xs font-mono tracking-wider text-muted-foreground mb-1">
              {`TEN GODS / ${metaphorDictionary.relationship.sipseong.simple}`}
            </p>
            <h2 className="text-lg font-serif italic text-foreground mb-4">
              {metaphorDictionary.relationship.sipseong.description}
            </h2>

            <div className="flex flex-wrap gap-3">
              {(Object.entries(saju.sipseongCounts) as [string, number][])
                .filter(([, n]) => n > 0)
                .sort((a, b) => b[1] - a[1])
                .map(([key, count]) => {
                  const meta = sipseongMetaphor[key as SipseongKey]
                  if (!meta) return null
                  return (
                    <div
                      key={key}
                      className="rounded-xl px-4 py-3 border flex items-center gap-3 min-w-[140px]"
                      style={{
                        backgroundColor: `${meta.color}18`,
                        borderColor: `${meta.color}40`,
                      }}
                    >
                      <span className="text-2xl">{meta.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {meta.simple}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {meta.original} × {count}
                        </span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </section>
        )}

        {/* 숨은 결정 (지장간) — 당신의 일주 지지 */}
        {(() => {
          const dayBranch = saju.day.branch as JijangganKey
          const jaData = jijangganMetaphor[dayBranch]
          if (!jaData) return null

          const crystalCount = jaData.hidden.length
          const countInfo =
            crystalCount === 1
              ? hiddenCrystalCount.one
              : crystalCount === 2
                ? hiddenCrystalCount.two
                : hiddenCrystalCount.three
          const isSimple = crystalCount === 1
          const isComplex = crystalCount === 3

          return (
            <section className="rounded-lg border border-border bg-card p-6">
              <div className="translation-bridge mb-2">
                <span className="original">{metaphorDictionary.potential.jijanggan.original}</span>
                <span className="arrow">→</span>
                <span className="simple">숨은 결정 (Hidden Crystals)</span>
              </div>
              <p className="text-xs font-mono tracking-wider text-muted-foreground mb-1">
                HIDDEN CRYSTALS / 당신의 일주 지지
              </p>
              <h2 className="text-lg font-serif italic text-foreground mb-2">
                12개 숨은 결정
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                보석 내부에 숨어있는 빛. 특정 상황에서만 빛을 발하는 히든 패턴입니다.
              </p>

              <div
                className={`rounded-xl border p-5 transition-all ${
                  isSimple ? "flex flex-col gap-5" : ""
                }`}
                style={{
                  borderColor: `${jaData.color}50`,
                  backgroundColor: `${jaData.color}0d`,
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{jaData.icon}</span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {jaData.simple}
                    </h3>
                    <p className="text-xs text-muted-foreground">{jaData.original}</p>
                    {!isSimple && (
                      <p className="text-xs text-muted-foreground mt-1">
                        숨은 결정 {crystalCount}개
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                  {jaData.description}
                </p>

                <div
                  className="rounded-lg p-4 mb-4"
                  style={{
                    background: "linear-gradient(135deg, rgba(212, 165, 116, 0.1), transparent)",
                    borderLeft: "3px solid #d4a574",
                  }}
                >
                  <strong className="text-sm text-[#d4a574] block mb-2">
                    언제 빛나는가
                  </strong>
                  <p className="text-sm text-foreground/90">{jaData.trigger.when}</p>
                  <p className="text-sm text-foreground/90 mt-1">{jaData.trigger.how}</p>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    예: {jaData.trigger.example}
                  </p>
                </div>

                {/* 조합 파워 배지 — 3개일 때만 */}
                {isComplex && "combination_power" in jaData && jaData.combination_power && (
                  <div
                    className="mb-5 rounded-xl p-4 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                    }}
                  >
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[11px] uppercase tracking-wider mb-2"
                      style={{
                        backgroundColor: "rgba(139, 92, 246, 0.2)",
                        color: "#a78bfa",
                      }}
                    >
                      특별 능력
                    </span>
                    <p className="text-sm font-medium text-foreground">
                      {jaData.combination_power}
                    </p>
                  </div>
                )}

                {/* Power 카드 — metaphor 포함 */}
                <div
                  className={
                    isComplex
                      ? "grid grid-cols-1 md:grid-cols-3 gap-3"
                      : isSimple
                        ? "flex flex-col gap-4"
                        : "grid grid-cols-1 md:grid-cols-2 gap-3"
                  }
                >
                  {Object.entries(jaData.hidden_power).map(([key, power]) => (
                    <div
                      key={key}
                      className="rounded-xl p-4 border transition-all hover:translate-y-[-2px]"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.02)",
                        borderColor: "rgba(255,255,255,0.08)",
                      }}
                    >
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        {power.name}
                      </h4>
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        {power.description}
                      </p>
                      <div
                        className="mt-3 py-2 px-3 rounded-md text-xs"
                        style={{ backgroundColor: "rgba(212, 165, 116, 0.1)" }}
                      >
                        <span className="text-muted-foreground">발동: </span>
                        {power.when_activated}
                      </div>
                      <div
                        className="mt-3 py-3 px-3 rounded-md text-xs border-l-[3px]"
                        style={{
                          backgroundColor: "rgba(139, 92, 246, 0.05)",
                          borderLeftColor: "#8b5cf6",
                        }}
                      >
                        <span className="text-muted-foreground/90 italic">
                          💡 {power.metaphor}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-border/50">
                  <p className="text-xs font-mono text-muted-foreground mb-1">
                    {countInfo.name}
                  </p>
                  <p className="text-xs text-foreground/80">
                    성격: {countInfo.trait} · 강점: {countInfo.advantage} · 과제:{" "}
                    {countInfo.challenge}
                  </p>
                </div>
              </div>
            </section>
          )
        })()}

        {/* 인생의 계절 (대운) — 8개 타임라인 */}
        {saju.birthData && (() => {
          const { year, month, day, hour } = saju.birthData
          const { list, currentIndex, isTransition } = calculateDaewoonList(
            year,
            month,
            day,
            hour,
            1
          )
          const currentYear = new Date().getFullYear()
          const userAge = currentYear - year
          const currentDw = currentIndex !== null ? list[currentIndex] : null
          const nextDw =
            currentIndex !== null && currentIndex < list.length - 1
              ? list[currentIndex + 1]
              : null

          if (list.length === 0) return null

          return (
            <section className="rounded-lg border border-border bg-card p-6">
              <div className="translation-bridge mb-2">
                <span className="original">{metaphorDictionary.timing.daewoon.original}</span>
                <span className="arrow">→</span>
                <span className="simple">{metaphorDictionary.timing.daewoon.simple}</span>
              </div>
              <p className="text-xs font-mono tracking-wider text-muted-foreground mb-1">
                10-YEAR CYCLES / 인생의 계절
              </p>
              <h2 className="text-lg font-serif italic text-foreground mb-2">
                {daewoonMetaphor.concept.description}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {daewoonMetaphor.concept.key_point}
              </p>

              {/* 전환기 알림 */}
              {isTransition && currentDw && (
                <div
                  className="mb-5 rounded-xl p-4 flex items-start gap-3"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                  }}
                >
                  <span className="text-2xl">🌓</span>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      환절기입니다
                    </h4>
                    <p className="text-xs text-foreground/80">
                      조명이 바뀌는 중입니다. 적응하는 시간을 가지세요.
                    </p>
                  </div>
                </div>
              )}

              {/* 8개 대운 타임라인 */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:overflow-visible md:flex-wrap">
                {list.map((dw) => {
                  const cheonganData = daewoonMetaphor.cheonganLight[dw.cheongan as CheonganKey]
                  const jijiData = daewoonMetaphor.jijiEnvironment[dw.jiji as JijiKey]
                  const isCurrent = currentIndex !== null && dw.index === currentIndex
                  const color = cheonganData?.color ?? "#888"

                  return (
                    <div
                      key={dw.index}
                      className={`flex-shrink-0 w-[120px] md:w-[110px] p-4 rounded-lg border-t-[4px] text-center transition-all hover:-translate-y-1 ${
                        isCurrent
                          ? "scale-[1.03] shadow-lg"
                          : "opacity-70 hover:opacity-90"
                      }`}
                      style={{
                        borderTopColor: color,
                        backgroundColor: isCurrent
                          ? "rgba(212, 165, 116, 0.12)"
                          : "rgba(255,255,255,0.02)",
                        boxShadow: isCurrent
                          ? "0 0 20px rgba(212, 165, 116, 0.25)"
                          : undefined,
                      }}
                    >
                      <div className="text-[10px] text-muted-foreground mb-1">
                        {dw.startAge}~{dw.endAge}세
                      </div>
                      <div className="text-lg font-medium text-foreground mb-1">
                        {dw.ganZhi}
                      </div>
                      <div className="text-[11px] text-foreground/80">
                        {cheonganData?.light ?? "-"}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {jijiData?.season ?? "-"}
                      </div>
                      {isCurrent && (
                        <span
                          className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{
                            backgroundColor: "rgba(212, 165, 116, 0.25)",
                            color: "#d4a574",
                          }}
                        >
                          지금
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* 현재 대운 상세 강조 */}
              {currentDw && (() => {
                const cheonganData =
                  daewoonMetaphor.cheonganLight[currentDw.cheongan as CheonganKey]
                const jijiData =
                  daewoonMetaphor.jijiEnvironment[currentDw.jiji as JijiKey]
                if (!cheonganData || !jijiData) return null

                return (
                  <div
                    className="mt-6 rounded-xl p-5 border"
                    style={{
                      borderColor: `${cheonganData.color}50`,
                      backgroundColor: `${cheonganData.color}0d`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="px-2 py-1 rounded-md text-xs font-medium"
                        style={{
                          backgroundColor: `${cheonganData.color}30`,
                          color: cheonganData.color,
                        }}
                      >
                        지금 비추는 조명
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {currentDw.ganZhi} 시기
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      현재 {userAge}세 ({currentDw.startAge}~{currentDw.endAge}세)
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="rounded-lg p-3 bg-black/5">
                        <p className="text-[10px] text-muted-foreground mb-1">
                          조명의 색깔
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {cheonganData.light}
                        </p>
                        <p className="text-xs text-foreground/80 mt-1">
                          {cheonganData.mood}
                        </p>
                      </div>
                      <div className="rounded-lg p-3 bg-black/5">
                        <p className="text-[10px] text-muted-foreground mb-1">
                          조명의 환경
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {jijiData.season}
                        </p>
                        <p className="text-xs text-foreground/80 mt-1">
                          {jijiData.environment}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg p-3 border-l-[3px] mb-3" style={{ borderLeftColor: "#8b5cf6" }}>
                      <p className="text-xs text-foreground/90 italic">
                        💡 {cheonganData.metaphor}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground mb-1">✅ 이럴 때 빛납니다</p>
                        <p className="text-foreground/90">{cheonganData.good_for}</p>
                        <p className="text-foreground/80 mt-0.5">{jijiData.good_for}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">⚠️ 주의할 점</p>
                        <p className="text-foreground/90">{cheonganData.be_careful}</p>
                        <p className="text-foreground/80 mt-0.5">{jijiData.challenge}</p>
                      </div>
                    </div>

                    {nextDw && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <p className="text-[10px] text-muted-foreground mb-1">
                          다음 10년 (미리보기)
                        </p>
                        <p className="text-sm text-foreground/90">
                          {nextDw.ganZhi} · {nextDw.startAge}세부터 ·{" "}
                          {daewoonMetaphor.cheonganLight[nextDw.cheongan as CheonganKey]?.light ??
                            ""}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {nextDw.startAge - userAge}년 후 준비하세요
                        </p>
                      </div>
                    )}
                  </div>
                )
              })()}
            </section>
          )
        })()}

        {/* 공명하는 보석들 (궁합) */}
        <CompatibilitySection
          myDayPillar={`${saju.day.stem}${saju.day.branch}`}
          myGemColor={pillarNamesEntry?.gemC1 ?? gemC1}
          myName={pillarNamesEntry?.gem ?? "나"}
        />

        <AIAnalysisSection saju={saju} isFirstVisit={isFirstVisit} />
      </div>
    </div>
      )}

      {/* ForgeAnimation — 검정 배경으로 덮었다가 opacity 0으로 fade out, 비칠 내용 없음 */}
      {showForge && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000008",
            opacity: forgeOpacity,
            transition: "opacity 1s ease-out",
            pointerEvents: forgeOpacity === 0 ? "none" : "auto",
          }}
        >
          <ForgeAnimation
            saju={saju}
            userName={(saju as { name?: string }).name || "당신"}
            onComplete={handleForgeComplete}
            gemColor={pillarNamesEntry?.gemC1 ?? "#888"}
            gemC2={pillarNamesEntry?.gemC2 ?? "#aaa"}
            gemHi={pillarNamesEntry?.gemHi ?? "#ccc"}
            pillarName={pillarName}
            pillarInfo={pillarInfo}
          />
        </div>
      )}
    </>
  )
}
