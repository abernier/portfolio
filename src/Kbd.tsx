import { KeyboardControls } from "@react-three/drei";

import { ReactNode, useMemo } from "react";

type KbdControlsProps = {
  children?: ReactNode;
};
export default function KbdControls({ children }: KbdControlsProps) {
  const map = useMemo(() => [{ name: "spc", keys: ["Space"] }], []);

  return <KeyboardControls map={map}>{children}</KeyboardControls>;
}
