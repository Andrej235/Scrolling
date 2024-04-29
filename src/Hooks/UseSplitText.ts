import { useEffect, useState } from "react";
import SplitType from "split-type";

export default function useSplitText(querySelector: string) {
  const [split, setSplit] = useState<SplitType | null>(null);

  useEffect(() => {
    const split = SplitType.create(querySelector);
    setSplit(split);
    return () => split.revert();
  }, [querySelector]);

  return split;
}
