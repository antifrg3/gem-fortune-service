import { cn } from "@/lib/utils"
import type { SajuChart } from "@/lib/saju"

// Each Heavenly Stem mapped to its element
const STEM_ELEMENT: Record<string, string> = {
  "\u7532": "wood",   // 甲
  "\u4E59": "wood",   // 乙
  "\u4E19": "fire",   // 丙
  "\u4E01": "fire",   // 丁
  "\u620A": "earth",  // 戊
  "\u5DF1": "earth",  // 己
  "\u5E9A": "metal",  // 庚
  "\u8F9B": "metal",  // 辛
  "\u58EC": "water",  // 壬
  "\u7678": "water",  // 癸
}

// Each Earthly Branch mapped to its element
const BRANCH_ELEMENT: Record<string, string> = {
  "\u5B50": "water",  // 子
  "\u4E11": "earth",  // 丑
  "\u5BC5": "wood",   // 寅
  "\u536F": "wood",   // 卯
  "\u8FB0": "earth",  // 辰
  "\u5DF3": "fire",   // 巳
  "\u5348": "fire",   // 午
  "\u672A": "earth",  // 未
  "\u7533": "metal",  // 申
  "\u9149": "metal",  // 酉
  "\u620C": "earth",  // 戌
  "\u4EA5": "water",  // 亥
}

const GLOW_COLORS: Record<string, string> = {
  wood: "shadow-[0_0_12px_-2px_rgba(52,211,153,0.25)]",
  fire: "shadow-[0_0_12px_-2px_rgba(248,113,113,0.25)]",
  earth: "shadow-[0_0_12px_-2px_rgba(251,191,36,0.25)]",
  metal: "shadow-[0_0_12px_-2px_rgba(148,163,184,0.25)]",
  water: "shadow-[0_0_12px_-2px_rgba(96,165,250,0.25)]",
}

const BORDER_COLORS: Record<string, string> = {
  wood: "border-emerald-600/40",
  fire: "border-red-600/40",
  earth: "border-amber-600/40",
  metal: "border-slate-500/40",
  water: "border-blue-600/40",
}

const TEXT_COLORS: Record<string, string> = {
  wood: "text-emerald-400",
  fire: "text-red-400",
  earth: "text-amber-400",
  metal: "text-slate-300",
  water: "text-blue-400",
}

interface PillarCodesProps {
  saju?: SajuChart | null
  completedCount?: number
}

function CodeSlot({ char, active, element }: { char: string; active: boolean; element: string }) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-md border font-mono text-sm transition-all duration-500",
        active
          ? cn(
              "bg-card",
              BORDER_COLORS[element],
              TEXT_COLORS[element],
              GLOW_COLORS[element]
            )
          : "border-border/50 bg-transparent text-muted-foreground/20"
      )}
    >
      {active ? char : "_"}
    </div>
  )
}

export function PillarCodes({ saju, completedCount = 0 }: PillarCodesProps) {
  // 사주 데이터가 있으면 실제 값 사용, 없으면 placeholder
  const pillars = saju ? [
    { label: "Year", sublabel: "년주", stem: saju.year.stem, branch: saju.year.branch },
    { label: "Month", sublabel: "월주", stem: saju.month.stem, branch: saju.month.branch },
    { label: "Day", sublabel: "일주", stem: saju.day.stem, branch: saju.day.branch },
    { label: "Hour", sublabel: "시주", stem: saju.hour.stem, branch: saju.hour.branch },
  ] : [
    { label: "Year", sublabel: "년주", stem: "\u7532", branch: "\u5B50" },   // 甲 子
    { label: "Month", sublabel: "월주", stem: "\u4E59", branch: "\u4E11" },  // 乙 丑
    { label: "Day", sublabel: "일주", stem: "\u4E19", branch: "\u5BC5" },    // 丙 寅
    { label: "Hour", sublabel: "시주", stem: "\u4E01", branch: "\u536F" },   // 丁 卯
  ]

  return (
    <div className="grid grid-cols-4 gap-3">
      {pillars.map((pillar, idx) => {
        const active = saju ? true : idx < completedCount
        const stemElement = STEM_ELEMENT[pillar.stem] || "earth"
        const branchElement = BRANCH_ELEMENT[pillar.branch] || "earth"

        return (
          <div key={pillar.label} className="flex flex-col items-center gap-1.5">
            {/* Pillar label */}
            <span className={cn(
              "text-[9px] font-mono uppercase tracking-widest transition-colors duration-300",
              active ? "text-muted-foreground" : "text-muted-foreground/30"
            )}>
              {pillar.sublabel}
            </span>

            {/* Stem + Branch pair */}
            <div className="flex flex-col items-center gap-1">
              <CodeSlot char={pillar.stem} active={active} element={stemElement} />
              <CodeSlot char={pillar.branch} active={active} element={branchElement} />
            </div>

            {/* English label */}
            <span className={cn(
              "text-[9px] font-mono tracking-wider transition-colors duration-300",
              active ? "text-muted-foreground/60" : "text-muted-foreground/20"
            )}>
              {pillar.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
