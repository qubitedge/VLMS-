import { useState, useCallback } from "react";

export interface SteppedArrayState<T> {
  array: T[];
  pass: number;
  cmpIndex: number;
  lockedFrom: number; // index from which elements are "locked/sorted"
  isComplete: boolean;
}

export interface SteppedArrayActions<T> {
  swap: (i: number, j: number) => void;
  advance: () => void;         // move cmpIndex forward (no swap)
  endPass: () => void;         // increment pass, reset cmpIndex
  lockElement: () => void;     // shrink unsorted window by 1
  resetArray: (arr: T[]) => void;
  setArray: React.Dispatch<React.SetStateAction<T[]>>;
  setCmpIndex: React.Dispatch<React.SetStateAction<number>>;
  setPass: React.Dispatch<React.SetStateAction<number>>;
}

export type SteppedArray<T> = SteppedArrayState<T> & SteppedArrayActions<T>;

/**
 * useSteppedArray
 * ---------------
 * Generic hook for simulations that step through an array
 * one comparison at a time (sorting, searching, etc.)
 *
 * Usage:
 *   const arr = useSteppedArray([64, 34, 25, 12, 22]);
 *   arr.swap(arr.cmpIndex, arr.cmpIndex + 1);
 *   arr.advance();
 */
export function useSteppedArray<T>(initial: T[]): SteppedArray<T> {
  const [array, setArray] = useState<T[]>([...initial]);
  const [pass, setPass] = useState(1);
  const [cmpIndex, setCmpIndex] = useState(0);
  const [lockedFrom, setLockedFrom] = useState(initial.length); // nothing locked yet

  const isComplete = lockedFrom <= 0 || (pass > initial.length);

  const swap = useCallback((i: number, j: number) => {
    setArray(arr => {
      const next = [...arr];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }, []);

  const advance = useCallback(() => {
    setCmpIndex(c => c + 1);
  }, []);

  const endPass = useCallback(() => {
    setPass(p => p + 1);
    setCmpIndex(0);
  }, []);

  const lockElement = useCallback(() => {
    setLockedFrom(l => l - 1);
  }, []);

  const resetArray = useCallback((arr: T[]) => {
    setArray([...arr]);
    setPass(1);
    setCmpIndex(0);
    setLockedFrom(arr.length);
  }, []);

  return {
    array,
    pass,
    cmpIndex,
    lockedFrom,
    isComplete,
    swap,
    advance,
    endPass,
    lockElement,
    resetArray,
    setArray,
    setCmpIndex,
    setPass,
  };
}
