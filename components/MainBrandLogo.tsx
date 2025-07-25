"use client";

import Image from "next/image";
import React, { useState } from "react";

interface MainBrandLogoProps {
  logoSrc: string; // Link ảnh logo
  mainDomain: string; // Ví dụ: 'soft.io.vn'
  altText?: string;
  size?: number; // Chiều cao logo
  dismissible?: boolean;
}

const MainBrandLogo: React.FC<MainBrandLogoProps> = ({
  logoSrc,
  mainDomain,
  altText = "Logo chính",
  size = 40,
  dismissible = false,
}) => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="p-3" style={{ zIndex: 1050 }}>
      <a
        href={`https://${mainDomain}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={logoSrc}
          alt={altText}
          height={size}
          style={{
            height: "42px !important",
            borderRadius: "0 !important",
            boxShadow: "none !important",
          }}
        />
      </a>
      {dismissible && (
        <button
          onClick={() => setShow(false)}
          className="ms-2"
          aria-label="Đóng logo brand"
        />
      )}
    </div>
  );
};

export default MainBrandLogo;
