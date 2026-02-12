'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InputPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    year: '',
    month: '',
    day: '',
    time: '',
    gender: '' as 'male' | 'female' | ''
  });

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const params = new URLSearchParams({
      name: userData.name,
      year: userData.year,
      month: userData.month,
      day: userData.day,
      time: userData.time,
      gender: userData.gender,
    });
    router.push(`/result?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* 배경 그라데이션 */}
      <div
        className={`fixed inset-0 -z-10 transition-opacity duration-1500 opacity-40
          ${currentStep === 0 ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(212,165,116,0.15)_0%,transparent_70%)]' : ''}
          ${currentStep === 1 ? 'bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.12)_0%,transparent_70%)]' : ''}
          ${currentStep === 2 ? 'bg-[radial-gradient(circle_at_70%_60%,rgba(239,68,68,0.12)_0%,transparent_70%)]' : ''}
          ${currentStep === 3 ? 'bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.12)_0%,transparent_70%)]' : ''}
          ${currentStep === 4 ? 'bg-[radial-gradient(circle_at_60%_70%,rgba(139,92,246,0.12)_0%,transparent_70%)]' : ''}
        `}
      />

      {/* 애플TV 스타일 진행바 */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-50 bg-white/5 backdrop-blur-xl backdrop-saturate-180 px-4 py-2 rounded-full border border-white/10">
        {[0, 1, 2, 3, 4].map((step) => (
          <div key={step} className="relative w-8 h-0.5 bg-white/20 rounded-sm overflow-hidden">
            <div
              className={`absolute inset-0 bg-white origin-left transition-transform duration-400 ${
                step === currentStep ? 'scale-x-100' : step < currentStep ? 'scale-x-100 bg-white/30' : 'scale-x-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* 뒤로 버튼 */}
      {currentStep > 0 && (
        <button
          onClick={prevStep}
          className="fixed top-6 left-6 w-10 h-10 flex items-center justify-center bg-white/6 backdrop-blur-xl border border-white/15 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all"
        >
          ←
        </button>
      )}

      {/* 메인 컨테이너 */}
      <div className="fixed inset-0 flex items-center justify-center px-5 py-16">

        {/* Step 0: 이름 */}
        <div className={`absolute max-w-[440px] w-full text-center transition-opacity duration-600 ${currentStep === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <h2 className="text-[40px] font-semibold mb-3 leading-tight tracking-tight">이름을 알려주세요</h2>
          <p className="text-[17px] text-white/60 mb-12 font-light">보석에 새겨질 이름입니다</p>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({...userData, name: e.target.value})}
            placeholder="이름"
            className="w-full px-0 py-4 text-[28px] text-center bg-transparent border-0 border-b border-white/20 focus:border-white/60 outline-none placeholder:text-white/30 mb-8"
          />
          <button
            onClick={nextStep}
            disabled={!userData.name}
            className={`w-full max-w-[280px] mx-auto block px-4 py-4 text-[17px] font-semibold bg-white/95 text-black rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all ${!userData.name ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          >
            다음
          </button>
        </div>

        {/* Step 1: 생년월일 */}
        <div className={`absolute max-w-[440px] w-full text-center transition-opacity duration-600 ${currentStep === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <h2 className="text-[40px] font-semibold mb-3 leading-tight tracking-tight">생년월일을 알려주세요</h2>
          <p className="text-[17px] text-white/60 mb-12 font-light">보석이 만들어진 날</p>
          <div className="flex gap-3 justify-center mb-8">
            <select
              value={userData.year}
              onChange={(e) => setUserData({...userData, year: e.target.value})}
              className="px-4 py-3.5 text-[17px] bg-white/6 backdrop-blur-xl border border-white/15 rounded-xl text-white cursor-pointer hover:bg-white/8 focus:bg-white/10 focus:border-white/40 outline-none appearance-none pr-9 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw1IDVMOSAxIiBzdHJva2U9IiNmNWY1ZjciIHN0cm9rZS1vcGFjaXR5PSIwLjYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] bg-[right_12px_center] bg-no-repeat"
            >
              <option value="">년</option>
              {Array.from({length: 107}, (_, i) => 2026 - i).map(year => (
                <option key={year} value={year} className="bg-[#1c1c1e]">{year}년</option>
              ))}
            </select>
            <select
              value={userData.month}
              onChange={(e) => setUserData({...userData, month: e.target.value})}
              className="px-4 py-3.5 text-[17px] bg-white/6 backdrop-blur-xl border border-white/15 rounded-xl text-white cursor-pointer hover:bg-white/8 focus:bg-white/10 focus:border-white/40 outline-none appearance-none pr-9 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw1IDVMOSAxIiBzdHJva2U9IiNmNWY1ZjciIHN0cm9rZS1vcGFjaXR5PSIwLjYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] bg-[right_12px_center] bg-no-repeat"
            >
              <option value="">월</option>
              {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                <option key={month} value={month} className="bg-[#1c1c1e]">{month}월</option>
              ))}
            </select>
            <select
              value={userData.day}
              onChange={(e) => setUserData({...userData, day: e.target.value})}
              className="px-4 py-3.5 text-[17px] bg-white/6 backdrop-blur-xl border border-white/15 rounded-xl text-white cursor-pointer hover:bg-white/8 focus:bg-white/10 focus:border-white/40 outline-none appearance-none pr-9 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw1IDVMOSAxIiBzdHJva2U9IiNmNWY1ZjciIHN0cm9rZS1vcGFjaXR5PSIwLjYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] bg-[right_12px_center] bg-no-repeat"
            >
              <option value="">일</option>
              {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                <option key={day} value={day} className="bg-[#1c1c1e]">{day}일</option>
              ))}
            </select>
          </div>
          <button
            onClick={nextStep}
            disabled={!userData.year || !userData.month || !userData.day}
            className={`w-full max-w-[280px] mx-auto block px-4 py-4 text-[17px] font-semibold bg-white/95 text-black rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all ${(!userData.year || !userData.month || !userData.day) ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          >
            다음
          </button>
        </div>

        {/* Step 2: 시간 */}
        <div className={`absolute max-w-[440px] w-full text-center transition-opacity duration-600 ${currentStep === 2 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <h2 className="text-[40px] font-semibold mb-3 leading-tight tracking-tight">태어난 시간을 알려주세요</h2>
          <p className="text-[17px] text-white/60 mb-12 font-light">시간을 모르면 &apos;모름&apos;을 선택하세요</p>
          <select
            value={userData.time}
            onChange={(e) => setUserData({...userData, time: e.target.value})}
            className="w-full max-w-[280px] mx-auto block px-4 py-3.5 text-[17px] bg-white/6 backdrop-blur-xl border border-white/15 rounded-xl text-white cursor-pointer hover:bg-white/8 focus:bg-white/10 focus:border-white/40 outline-none appearance-none pr-9 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw1IDVMOSAxIiBzdHJva2U9IiNmNWY1ZjciIHN0cm9rZS1vcGFjaXR5PSIwLjYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] bg-[right_12px_center] bg-no-repeat mb-8"
          >
            <option value="">시간 선택</option>
            <option value="unknown">모름</option>
            <option value="23-01">23-01시 (자시)</option>
            <option value="01-03">01-03시 (축시)</option>
            <option value="03-05">03-05시 (인시)</option>
            <option value="05-07">05-07시 (묘시)</option>
            <option value="07-09">07-09시 (진시)</option>
            <option value="09-11">09-11시 (사시)</option>
            <option value="11-13">11-13시 (오시)</option>
            <option value="13-15">13-15시 (미시)</option>
            <option value="15-17">15-17시 (신시)</option>
            <option value="17-19">17-19시 (유시)</option>
            <option value="19-21">19-21시 (술시)</option>
            <option value="21-23">21-23시 (해시)</option>
          </select>
          <button
            onClick={nextStep}
            disabled={!userData.time}
            className={`w-full max-w-[280px] mx-auto block px-4 py-4 text-[17px] font-semibold bg-white/95 text-black rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all ${!userData.time ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          >
            다음
          </button>
        </div>

        {/* Step 3: 성별 */}
        <div className={`absolute max-w-[440px] w-full text-center transition-opacity duration-600 ${currentStep === 3 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <h2 className="text-[40px] font-semibold mb-3 leading-tight tracking-tight">성별을 알려주세요</h2>
          <p className="text-[17px] text-white/60 mb-12 font-light">대운 계산에 필요합니다</p>
          <div className="flex gap-3 justify-center mb-8">
            <button
              onClick={() => setUserData({...userData, gender: 'male'})}
              className={`flex-1 max-w-[180px] px-6 py-8 bg-white/6 backdrop-blur-xl border border-white/15 rounded-2xl cursor-pointer hover:bg-white/8 hover:scale-[1.02] transition-all ${userData.gender === 'male' ? 'bg-white/12 border-white/40 scale-105' : ''}`}
            >
              <div className={`text-5xl mb-3 transition-opacity ${userData.gender === 'male' ? 'opacity-100' : 'opacity-80'}`}>♂</div>
              <div className={`text-lg transition-colors ${userData.gender === 'male' ? 'text-white' : 'text-white/70'}`}>남성</div>
            </button>
            <button
              onClick={() => setUserData({...userData, gender: 'female'})}
              className={`flex-1 max-w-[180px] px-6 py-8 bg-white/6 backdrop-blur-xl border border-white/15 rounded-2xl cursor-pointer hover:bg-white/8 hover:scale-[1.02] transition-all ${userData.gender === 'female' ? 'bg-white/12 border-white/40 scale-105' : ''}`}
            >
              <div className={`text-5xl mb-3 transition-opacity ${userData.gender === 'female' ? 'opacity-100' : 'opacity-80'}`}>♀</div>
              <div className={`text-lg transition-colors ${userData.gender === 'female' ? 'text-white' : 'text-white/70'}`}>여성</div>
            </button>
          </div>
          <button
            onClick={nextStep}
            disabled={!userData.gender}
            className={`w-full max-w-[280px] mx-auto block px-4 py-4 text-[17px] font-semibold bg-white/95 text-black rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all ${!userData.gender ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          >
            다음
          </button>
        </div>

        {/* Step 4: 확인 */}
        <div className={`absolute max-w-[440px] w-full text-center transition-opacity duration-600 ${currentStep === 4 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <h2 className="text-[40px] font-semibold mb-3 leading-tight tracking-tight">정보를 확인해주세요</h2>
          <p className="text-[17px] text-white/60 mb-12 font-light">이 정보로 당신만의 보석을 제련합니다</p>
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl px-6 py-6 mb-8 text-left">
            <div className="flex justify-between py-3 border-b border-white/8">
              <span className="text-white/60">이름</span>
              <span className="text-white">{userData.name}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-white/8">
              <span className="text-white/60">생년월일</span>
              <span className="text-white">{userData.year}년 {userData.month}월 {userData.day}일</span>
            </div>
            <div className="flex justify-between py-3 border-b border-white/8">
              <span className="text-white/60">태어난 시간</span>
              <span className="text-white">{userData.time === 'unknown' ? '모름' : userData.time}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-white/60">성별</span>
              <span className="text-white">{userData.gender === 'male' ? '남성' : '여성'}</span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full max-w-[280px] mx-auto block px-4 py-4 text-[17px] font-semibold bg-white/95 text-black rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            제련 시작하기
          </button>
        </div>

      </div>
    </div>
  );
}
