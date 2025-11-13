import { useInfiniteQuery } from "@tanstack/react-query";

export default function usePlansQuery() {
    // Hardcoded plans data for demonstration
    const PLANS = [
        { id: 1, name: 'Basic', price: 10 },
        { id: 2, name: 'Standard', price: 20 },
        { id: 3, name: 'Premium', price: 30 },
        { id: 4, name: 'Ultimate', price: 40 },
        { id: 5, name: 'Enterprise', price: 50 },
    ];

    // Simulate paginated data
    const PAGE_SIZE = 2;

    return useInfiniteQuery({
        queryKey: ['plans'],
        initialPageParam: 1,
        queryFn: async ({ pageParam }: { pageParam?: number }) => {
            const currentPage = typeof pageParam === 'number' ? pageParam : 1;
            // await new Promise((resolve) => setTimeout(resolve, 300));
            const start = (currentPage - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            const data = PLANS.slice(start, end);
            return {
                data,
                hasMore: end < PLANS.length,
            };
        },
        getNextPageParam: (lastPage: { hasMore: boolean }, allPages) => {
            return lastPage.hasMore ? allPages.length + 1 : undefined;
        },
});