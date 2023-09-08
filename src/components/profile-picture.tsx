"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePicture() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setTimeout(() => setMounted(true), 1000);
  }, []);

  if (!mounted)
    return <Skeleton className="h-[100px] w-[100px] rounded-full" />;

  return (
    <Image
      src={`/mikasenghaas-${resolvedTheme}.jpeg`}
      alt="profile-picture"
      style={{
        objectFit: "cover",
        borderRadius: "50px",
      }}
      width={100}
      height={100}
      quality={50}
      priority
    />
  );
}