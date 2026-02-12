/**
 * 대운(大運) 계산 - lunar-typescript 사용
 * 10년마다 바뀌는 인생의 계절
 */

import { Solar } from "lunar-typescript"

export interface DaewoonItem {
  index: number
  cheongan: string
  jiji: string
  ganZhi: string
  startAge: number
  endAge: number
  startYear: number
  endYear: number
}

export interface DaewoonListResult {
  list: DaewoonItem[]
  currentIndex: number | null
  isTransition: boolean
}

/**
 * 대운 목록 계산
 * @param birthYear 출생년
 * @param birthMonth 출생월
 * @param birthDay 출생일
 * @param birthHour 출생시
 * @param gender 1=남성(順運), 0=여성(逆運). 없으면 1 기본
 */
export function calculateDaewoonList(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number,
  gender: number = 1
): DaewoonListResult {
  const solar = Solar.fromYmdHms(birthYear, birthMonth, birthDay, birthHour, 0, 0)
  const lunar = solar.getLunar()
  const yun = lunar.getYun(gender, 2) // sect 2 = 寅月 기준
  const daYunList = yun.getDaYun(8)

  const currentYear = new Date().getFullYear()
  const currentAge = currentYear - birthYear

  const list: DaewoonItem[] = []
  let currentIndex: number | null = null

  for (let i = 0; i < daYunList.length; i++) {
    const dy = daYunList[i]
    const ganZhi = dy.getGanZhi()
    if (!ganZhi || ganZhi.length < 2) continue

    const cheongan = ganZhi[0]
    const jiji = ganZhi[1]
    const startAge = dy.getStartAge()
    const endAge = dy.getEndAge()
    const startYear = dy.getStartYear()
    const endYear = dy.getEndYear()

    list.push({
      index: i,
      cheongan,
      jiji,
      ganZhi,
      startAge,
      endAge,
      startYear,
      endYear,
    })

    if (currentAge >= startAge && currentAge <= endAge) {
      currentIndex = i
    }
  }

  // 전환기: 현재 대운 끝나기 1년 전 ~ 시작 1년 후 (경계 구간)
  const curr = currentIndex !== null ? list[currentIndex] : null
  let isTransition = false
  if (curr) {
    isTransition =
      (currentAge >= curr.endAge - 1 && currentAge <= curr.endAge) ||
      (currentAge >= curr.startAge && currentAge <= curr.startAge + 1)
  }

  return { list, currentIndex, isTransition }
}
