"use client";
import { onelinkLink } from "@/constants";
import { useQRCode } from "next-qrcode";
import { FC } from "react";

export interface AppDowloadQRProps {
  width?: number;
}

export const AppDowloadQR: FC<AppDowloadQRProps> = ({ width = 90 }) => {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={onelinkLink}
      options={{
        margin: 0,
        width,
        color: {
          dark: "#262925",
          light: "#fcfdfc",
        },
      }}
    />
  );
};

export default AppDowloadQR;
