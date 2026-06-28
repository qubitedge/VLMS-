import { useState, useCallback } from "react";

export interface SteppedArrayState<T> {
  items: T[];
  currentIndex: number;
  isComplete: boolean;
}

export interface SteppedArrayActions<T> {
  next: () => void;
  prev: () => void;
  reset: () => void;
  goTo: (index: number) => void;
  setItems: (items: T[]) => void;
}

export type SteppedArray<T> = SteppedArrayState<T> & SteppedArrayActions<T>;

export function useSteppedArray<T>(initialItems: T[] = []): SteppedArray<T> {
  const [items, setItemsState] = useState<T[]>(initialItems);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, items.length - 1));
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, items.length - 1)));
  }, [items.length]);

  const setItems = useCallback((newItems: T[]) => {
    setItemsState(newItems);
    setCurrentIndex(0);
  }, []);

  return {
    items,
    currentIndex,
    isComplete: currentIndex >= items.length - 1,
    next,
    prev,
    reset,
    goTo,
    setItems,
  };
}
