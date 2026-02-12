import Link from 'next/link';
import { GemCreationCard } from '@/components/gem-creation-card';

export default function Page() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center gap-12 p-8">
      
      {/* 타이틀 */}
      <div className="text-center">
        <h1 className="text-5xl font-semibold text-white mb-3 tracking-tight">
          당신의 운명의 4개 기둥을 보석으로
        </h1>
        <p className="text-xl text-white/60 font-light tracking-widest">
          REFINE YOUR ELEMENTS
        </p>
      </div>
      
      {/* 3D 보석 카드 */}
      <div className="max-w-md w-full">
        <GemCreationCard />
      </div>
      
      {/* CTA 버튼 */}
      <Link
        href="/input"
        className="px-8 py-4 bg-white/95 text-black rounded-xl font-semibold text-lg hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_8px_24px_rgba(212,165,116,0.3)]"
      >
        ✨ 제련 시작하기
      </Link>
      
    </main>
  );
}
