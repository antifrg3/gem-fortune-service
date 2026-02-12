"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ResultContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const day = searchParams.get("day");
  const time = searchParams.get("time");
  const gender = searchParams.get("gender");

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-xl px-4 py-12">
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/15 p-8">
          <div className="mb-6 text-center text-5xl">💎</div>
          <h1 className="mb-4 text-center text-xl font-bold text-white">
            당신의 보석 리포트
          </h1>
          <p className="mb-8 text-center text-white/60">
            입력 정보가 정상적으로 전달되었습니다.
            <br />
            (결과 페이지는 추후 구현 예정입니다)
          </p>
          <div className="mb-8 space-y-2 rounded-xl bg-white/5 border border-white/10 p-4">
            {name && (
              <p>
                <span className="text-white/60">이름:</span>{" "}
                <span className="text-white">{name}</span>
              </p>
            )}
            <p>
              <span className="text-white/60">생년월일:</span>{" "}
              <span className="text-white">{year}년 {month}월 {day}일</span>
            </p>
            <p>
              <span className="text-white/60">시간:</span>{" "}
              <span className="text-white">{time === "unknown" ? "모름" : time}</span>
            </p>
            <p>
              <span className="text-white/60">성별:</span>{" "}
              <span className="text-white">{gender === "male" ? "남성" : "여성"}</span>
            </p>
          </div>
          <Link
            href="/input"
            className="block rounded-xl bg-white/95 px-6 py-4 text-center font-semibold text-black transition hover:bg-white"
          >
            다시 입력하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">로딩 중...</div>}>
      <ResultContent />
    </Suspense>
  );
}
