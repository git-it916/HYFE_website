import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  LayoutGrid,
  Shield,
  Clock3,
  Sparkles
} from 'lucide-react';

const teams = [
  {
    name: '퀀트팀',
    desc: '퀀트팀은 알고리즘 퀀트팀과 포트폴리오 퀀트팀으로 세션을 진행합니다. 알고리즘 퀀트팀은 market microstructure 기반으로 알파를 발굴하고, 포트폴리오 퀀트팀은 portfolio optimization을 통해 전략을 구성합니다.'
  },
  {
    name: 'IB팀',
    desc: 'IB팀은 심도 있는 산업·기업 분석을 통해 핵심 투자포인트를 도출하고, Trading Comps 및 DCF 기반의 Valuation 기법을 학습합니다. 이를 바탕으로 IPO Pitch Book과 M&A IM 작성 실습을 수행하여 Deal Process 전반에 대한 이해와 실무 역량을 갖춥니다.'
  },
  {
    name: '리서치팀',
    desc: '리서치팀은 Top-Down 방식으로 섹터를 분석해 Top pick을 발굴합니다. 선정된 종목에 대한 투자의견을 제시하고 상대적·절대적 가치평가로 목표주가를 제시합니다.'
  },
  {
    name: '파생상품팀',
    desc: '파생상품팀은 매크로 분석으로 경제지표와 금리·통화정책을 해석하고, 스왑·옵션·선물 등 파생상품 이론과 가격결정 원리를 학습합니다. 실제 데이터를 활용해 이론을 적용하며 실무 감각을 높입니다.'
  }
];

const features = [
  { icon: CheckCircle2, title: '명확한 흐름', desc: '히어로 → 가치 제안 → 팀 소개 → 연락 CTA로 이어지는 단순 구조.' },
  { icon: Shield, title: '집중된 정보', desc: '팀별 역할과 강점을 짧고 굵게 배치해 스크롤 부담을 줄였습니다.' },
  { icon: Clock3, title: '빠른 이해', desc: '주요 포인트를 카드 형태로 나열해 방문자가 바로 이해하도록 설계.' }
];

const steps = [
  { title: 'Introduce', text: '한눈에 들어오는 히어로와 핵심 문장' },
  { title: 'Highlight', text: '가치 제안 3블록으로 요약' },
  { title: 'Teams', text: '4개 팀의 세부 소개 카드' },
  { title: 'Contact', text: '마지막 CTA로 연결' }
];

function App() {
  return (
    <div className="min-h-screen bg-blue-50 text-navy-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-navy-800 text-white flex items-center justify-center font-semibold">
              HY
            </div>
            <div>
              <p className="text-sm text-navy-700">Hanyang Financial Engineering</p>
              <h1 className="text-lg font-semibold">HYFE</h1>
            </div>
          </div>
          <button className="inline-flex items-center space-x-2 px-4 py-2 bg-navy-800 text-white rounded-lg hover:bg-navy-900 transition">
            <span>문의하기</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white text-navy-800 rounded-full px-3 py-1 shadow-sm">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Quant · IB · Research · Derivatives</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              실전형 금융공학팀, 4개 트랙으로 성장합니다.
            </h2>
            <p className="text-lg text-navy-700">
              snusmic.com처럼 단순하고 깔끔한 배치를 유지하면서, HYFE의 4개 팀 소개와 핵심 가치를 한 페이지에 담았습니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-3 bg-navy-800 text-white rounded-lg hover:bg-navy-900 transition inline-flex items-center space-x-2">
                <span>지원/문의</span>
                <ArrowRight size={18} />
              </button>
              <button className="px-5 py-3 bg-white text-navy-900 rounded-lg border border-navy-100 hover:border-navy-300 transition">
                더 알아보기
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-navy-100">
                <p className="text-sm font-semibold text-navy-700">실무 중심</p>
                <p className="text-sm text-navy-600">시장 분석과 모델링을 실전 프로젝트로 검증</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-navy-100">
                <p className="text-sm font-semibold text-navy-700">팀 기반 성장</p>
                <p className="text-sm text-navy-600">4개 팀이 서로 다른 역량을 보완</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-navy-100">
                <p className="text-sm font-semibold text-navy-700">커리어 가속</p>
                <p className="text-sm text-navy-600">IB·퀀트·리서치·파생 실무 감각 확보</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-navy-100 p-6 space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-navy-600">간단 소개 카드</p>
              <h3 className="text-2xl font-semibold">HYFE 한눈에 보기</h3>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-navy-100 p-3">
                <p className="text-sm text-navy-600">팀 구성</p>
                <p className="text-base font-semibold">퀀트 · IB · 리서치 · 파생상품</p>
              </div>
              <div className="rounded-lg border border-navy-100 p-3">
                <p className="text-sm text-navy-600">활동</p>
                <p className="text-base font-semibold">세션 · 프로젝트 · 실습 · 밸류에이션</p>
              </div>
              <div className="rounded-lg border border-navy-100 p-3">
                <p className="text-sm text-navy-600">결과물</p>
                <p className="text-base font-semibold">전략 리포트 · Pitch Book · IM · 백테스트</p>
              </div>
              <button className="w-full py-3 bg-navy-800 text-white rounded-lg hover:bg-navy-900 transition inline-flex items-center justify-center space-x-2">
                <span>소개 자료 받기</span>
                <ArrowRight size={18} />
              </button>
            </div>
            <p className="text-sm text-navy-600">
              세부 내용은 추후 제공할 자료로 교체하세요.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold">페이지 핵심 포인트</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-5 shadow-sm border border-navy-100 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <h4 className="text-lg font-semibold">{title}</h4>
                <p className="text-sm text-navy-700">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teams */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <LayoutGrid className="text-navy-800" size={20} />
            <h3 className="text-2xl font-bold">4개 팀 소개</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {teams.map((team) => (
              <div key={team.name} className="bg-white border border-navy-100 rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold">{team.name}</h4>
                  <span className="text-sm text-navy-600">HYFE</span>
                </div>
                <p className="text-sm text-navy-700 leading-relaxed">{team.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="bg-white border border-navy-100 rounded-2xl p-8 space-y-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <Shield className="text-navy-800" size={20} />
            <h3 className="text-2xl font-bold">페이지 흐름</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {steps.map((step) => (
              <div key={step.title} className="rounded-xl border border-navy-100 p-4 flex space-x-3">
                <div className="h-9 w-9 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center font-semibold">
                  {step.title}
                </div>
                <div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="text-sm text-navy-700">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="bg-navy-900 text-white rounded-2xl p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4">
          <div className="space-y-2">
            <p className="uppercase tracking-wide text-xs text-navy-200">Contact</p>
            <h3 className="text-3xl font-semibold">HYFE와 함께할 준비가 되셨나요?</h3>
            <p className="text-navy-100">팀별 상세 자료와 세션 일정은 문의 시 공유드립니다.</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-5 py-3 bg-white text-navy-900 rounded-lg font-semibold hover:bg-navy-50 transition inline-flex items-center space-x-2">
              <span>문의하기</span>
              <ArrowRight size={18} />
            </button>
            <button className="px-5 py-3 bg-navy-800 text-white rounded-lg hover:bg-navy-700 transition">
              소개서 받기
            </button>
          </div>
        </section>
      </main>

      <footer className="py-10 text-center text-navy-700 text-sm">
        <p>레이아웃 영감: snusmic.com 스타일. 텍스트는 추후 제공 내용으로 교체하세요.</p>
      </footer>
    </div>
  );
}

export default App;
