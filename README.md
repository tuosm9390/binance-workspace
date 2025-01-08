# Binance Project

### 1. 초기 설정 및 환경 구성 (2025.01.06)

- Next.js 13 프로젝트 생성
- TailwindCSS 설정
  - 색상 변수 설정 (--background, --foreground 등)

### 2. 상태 관리 및 데이터 페칭 설정 (2025.01.06)

- React Query 설정
  - QueryClient 구성
  - ReactQueryDevtools 추가
  - SSR 고려한 staleTime 설정 (60초)

## 사용 기술

- Next.js 13
- React 19
- TailwindCSS
- React Query (@tanstack/react-query)
- TypeScript
- Zustand

## 진행 상황

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

- Recoil 사용하려고 했으나 버전 충돌때문인지 내부오류가 계속 발생하여
  상태관리는 zustand 라이브러리를 사용하였습니다.
- 기존 REST API 데이터 호출 방식에서 웹소켓을 통한 실시간 정보 호출 방식으로 변경(차트, 오더북, 트레이드, 마켓, 티커)
- 숫자 단위 수정
- web socket 함수 분리
- 재사용 컴포넌트 분리

##### 참고

https://velog.io/@kangactor123/React-Query-with-WebSocket
