# Binance Clone Project

## 개발 진행 상황

### 1. 초기 설정 및 환경 구성 (2023.12.20)
- Next.js 13 프로젝트 생성
- TailwindCSS 설정
  - 기본 테마 설정 (다크모드 지원)
  - 스크롤바 커스터마이징
  - 색상 변수 설정 (--background, --foreground 등)

### 2. 상태 관리 및 데이터 페칭 설정 (2023.12.20)
- React Query 설정
  - QueryClient 구성
  - ReactQueryDevtools 추가
  - SSR 고려한 staleTime 설정 (60초)

### 3. 스타일링 (2023.12.20 ~ 2023.12.21)
- 글로벌 CSS 설정
  - 기본 폰트 설정 (Arial, Helvetica, sans-serif)
  - 다크모드 대응 색상 변수 설정
    - 배경색: #ffffff (라이트), #0b0e11 (다크)
    - 텍스트색: #0b0e11 (라이트), #ededed (다크)
  - 스크롤바 스타일링
    - 넓이: 5px
    - 높이: 10px
    - 트랙 스타일: 둥근 모서리 (border-radius: 5px)
    - 손잡이 스타일: 회색톤 (#5e6673)
- 추가 색상 변수 설정
  - 카드 배경색: #181a20
  - 상승장 색상: rgb(46 189 133)
  - 하락장 색상: rgb(246 70 93)
  - 호버 효과용 투명도 설정

## 사용 기술
- Next.js 13
- TailwindCSS
- React Query (@tanstack/react-query)
- TypeScript

## 2025.01.06
- 차트 이미지 예시 생성, 바이낸스 api 연결 테스트 및 화면 구성 테스트
- 컴포넌트 구성 추가, api 연결 추가(ticker, hot-coins, redirect 구성, zustand 추가
- search 탭 api 연결, 항목 선택 시 해당 코인 정보 호출

## 2025.01.07
- pricedisplay overflow 설정
- onclick, onblur 이벤트 충돌 방지
- Market API 연결 및 컴포넌트 수정, Search 컴포넌트 동작 수정, chart window 에러 수정
- orderbook api 데이터 호출 및 스타일, picker 데이터 수정, search 메뉴 수정 및 필터 추가, orderform 작업진행중, market trade api 데이터 호출 및 스타일, basictable 컴포넌트 작업 및 스타일

