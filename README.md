# [Binance Project](https://binance-workspace.vercel.app/en/trade/BTCUSDT)

## 초기설정

### 1. Tailwind 설정 및 환경 구성 (2025.01.06)

- Next.js 15 프로젝트 생성
- TailwindCSS 설정
  - 색상 변수 설정 (--background, --foreground 등)

### 2. 상태 관리 및 데이터 페칭 설정 (2025.01.06)

- React Query 설정
  - QueryClient 구성
  - ReactQueryDevtools 추가
- Recoil 설정
  - RecoilRoot 구성

## 사용 기술

- Next.js 15
- React 19
- TailwindCSS
- React Query (@tanstack/react-query)
- JavaScript
- Zustand (Recoil 대체)
- Binance Web Socket API

## 진행 과정

### 2025.01.06

- 차트 이미지 예시 생성, 바이낸스 api 연결 테스트 및 화면 구성 테스트
- 컴포넌트 구성 추가, api 연결 추가(ticker, hot-coins, redirect 구성, zustand 추가
- search 탭 api 연결, 항목 선택 시 해당 코인 정보 호출

### 2025.01.07

- pricedisplay overflow 설정
- onclick, onblur 이벤트 충돌 방지
- 스크롤바 커스터마이징
- 색상 변수 추가 (plus, minus, plus-hover, minus-hover)
- Market API 연결 및 컴포넌트 수정, Search 컴포넌트 동작 수정, chart window 에러 수정
- orderbook api 데이터 호출 및 스타일, picker 데이터 수정, search 메뉴 수정 및 필터 추가, orderform 작업진행중, market trade api 데이터 호출 및 스타일, basictable 컴포넌트 작업 및 스타일

### 2025.01.08

- Recoil 사용하려고 했으나 버전 충돌때문인지 내부오류가 계속 발생하여 상태관리는 zustand 라이브러리를 사용
- 기존 REST API 데이터 호출 방식에서 웹소켓을 통한 실시간 정보 호출 방식으로 변경(차트, 오더북, 트레이드, 마켓, 티커)
  - (참고)https://velog.io/@kangactor123/React-Query-with-WebSocket
- 숫자 단위 수정
- web socket 함수 분리
- 재사용 컴포넌트 분리

### 2025.01.09

- footer 컴포넌트 추가
- footer 컴포넌트 miniTicker 데이터 사용하여 flow 애니메이션 추가
- market activity 컴포넌트 추가
- OrderForm - stop limit 컴포넌트 추가, slide 수정
- NaN 에러 처리
- tailwind-scrollbar-hide 플러그인 배포 환경에서 사용 불가 문제 해결
- web socket 원시 스트림 -> 결합 스트림 (원시 스트림은 24시간 후 연결 종료)

### 2025.01.13

- 각 컴포넌트 별 socket 연결 구성을 하나의 hook으로 관리 -> ./src/app/hooks/useWebSocketConnection.jsx
- stream key 값에 따라 queryKey를 매핑하여 queryData update
- Top Movers 작업, 바이낸스에서 svg아이콘 추출해 신고가/신저가 등 각 상태별 아이콘 추가

### 2025.01.14

- web socket useCallBack 함수로 수정
- market activity 문구 및 이미지 수정

### 2025.01.22
- Layout -> Server 컴포넌트로 수정
- title 제거 및 page 컴포넌트에서 title 처리 (버벅임 줄어듦)
- 불필요한 패키지 및 props 제거

### 2025.02.12
- React.memo를 사용하여 불필요한 리렌더링 제거 (화면 버벅임 수정)
- page에 React Suspense 컴포넌트 추가 (비동기 데이터 페칭을 처리)
