"use client";

import dynamic from "next/dynamic";

// Lazy load NavCartIcons to avoid SSR entirely
const NavCartIcons = dynamic(() => import("./NavCartIcons"), {
  ssr: false, // ⛔ disable server-side render
});

const NavCartWrapper = () => <NavCartIcons />;

export default NavCartWrapper;
