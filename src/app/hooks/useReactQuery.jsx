'use client'

import {
  dehydrate,
  HydrationBoundary,
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR을 사용할 때는 일반적으로 staleTime의 기본값을
        // 0보다 크게 설정하여 클라이언트에서 즉시 리페칭하는 것을 피합니다.
        staleTime: Infinity,
      },
    },
  })
}

let browserQueryClient = undefined

export function getQueryClient() {
  if (isServer) {
    // Server: 항상 새 쿼리 클라이언트를 만듭니다.
    return makeQueryClient()
  } else {
    // Browser: 아직 쿼리 클라이언트가 없다면 새로 만듭니다.
    // 이는 매우 중요한데, 초기 렌더링 중 React가 suspend되더라도
    // 새로운 클라이언트를 다시 만들지 않기 때문입니다.
    // 쿼리 클라이언트 생성 아래에 서스펜스 바운더리가 있는 경우에는
    // 이 작업이 필요하지 않을 수도 있습니다.
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function ReactQueryProviders({ children }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}