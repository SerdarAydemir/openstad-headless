import { useCallback, useRef, useState } from 'react';

import type { SwipeDirection, SwipeState } from '../types';

interface UseSwipeConfig {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
  enabled?: boolean;
}

interface UseSwipeReturn {
  swipeState: SwipeState;
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
  };
  cardStyle: React.CSSProperties;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 80,
  enabled = true,
}: UseSwipeConfig): UseSwipeReturn {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    offsetX: 0,
    offsetY: 0,
    isDragging: false,
    direction: null,
  });

  const startX = useRef(0);
  const startY = useRef(0);
  const isDraggingRef = useRef(false);

  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      if (!enabled) return;
      startX.current = clientX;
      startY.current = clientY;
      isDraggingRef.current = true;
      setSwipeState({
        offsetX: 0,
        offsetY: 0,
        isDragging: true,
        direction: null,
      });
    },
    [enabled]
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!enabled || !isDraggingRef.current) return;

      const deltaX = clientX - startX.current;
      const deltaY = clientY - startY.current;

      const direction: SwipeDirection =
        deltaX > 20 ? 'right' : deltaX < -20 ? 'left' : null;

      setSwipeState({
        offsetX: deltaX,
        offsetY: deltaY * 0.3, // Dampen vertical movement
        isDragging: true,
        direction,
      });
    },
    [enabled]
  );

  const handleEnd = useCallback(() => {
    if (!enabled || !isDraggingRef.current) return;
    isDraggingRef.current = false;

    const { offsetX } = swipeState;

    if (Math.abs(offsetX) >= threshold) {
      // Swipe completed
      if (offsetX > 0) {
        setSwipeState((prev) => ({
          ...prev,
          offsetX: 500,
          isDragging: false,
          direction: 'right',
        }));
        setTimeout(onSwipeRight, 200);
      } else {
        setSwipeState((prev) => ({
          ...prev,
          offsetX: -500,
          isDragging: false,
          direction: 'left',
        }));
        setTimeout(onSwipeLeft, 200);
      }
    } else {
      // Snap back
      setSwipeState({
        offsetX: 0,
        offsetY: 0,
        isDragging: false,
        direction: null,
      });
    }

    // Reset after animation
    setTimeout(() => {
      setSwipeState({
        offsetX: 0,
        offsetY: 0,
        isDragging: false,
        direction: null,
      });
    }, 350);
  }, [enabled, swipeState.offsetX, threshold, onSwipeLeft, onSwipeRight]);

  // Touch handlers
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    },
    [handleStart]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    },
    [handleMove]
  );

  const onTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Mouse handlers
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    },
    [handleStart]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    },
    [handleMove]
  );

  const onMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  const onMouseLeave = useCallback(() => {
    if (isDraggingRef.current) {
      handleEnd();
    }
  }, [handleEnd]);

  // Dynamic card style based on swipe offset
  const rotation = swipeState.offsetX * 0.08;
  const opacity = swipeState.isDragging
    ? Math.max(0, 1 - Math.abs(swipeState.offsetX) / 400)
    : swipeState.offsetX !== 0
    ? 0
    : 1;

  const cardStyle: React.CSSProperties = {
    transform: `translateX(${swipeState.offsetX}px) rotate(${rotation}deg)`,
    opacity,
    transition: swipeState.isDragging ? 'none' : 'all 0.3s ease-out',
    cursor: enabled ? 'grab' : 'default',
    userSelect: 'none',
    touchAction: 'pan-y',
  };

  return {
    swipeState,
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
    },
    cardStyle,
  };
}
