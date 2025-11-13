import { useEffect, useState } from 'react';

const TIMER_TIME_SECONDS = 300;

export const usePromoCard = (onTimerEnd: () => void) => {
    const [timeLeft, setTimeLeft] = useState<number>(TIMER_TIME_SECONDS);
        
        useEffect(() => {
            const intervalId = setInterval(() => {
                setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
    
            return () => clearInterval(intervalId);
        }, []);
    
        useEffect(() => {
            if (timeLeft === 0) {
                onTimerEnd();
            }
        }, [timeLeft]);
    
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        return { minutes, seconds };
}