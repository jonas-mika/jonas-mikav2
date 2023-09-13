import { Metadata } from "next";

import { About } from "@/components/section/about";
import { Featured } from "@/components/section/featured";
import { Hero } from "@/components/section/hero";
import { Project } from "@/components/section/projects";
import { Teaching } from "@/components/section/teaching";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Project />
      <Teaching />
      <About />
    </>
  );
}

export const metadata: Metadata = {
  title: "Mika Senghaas",
  description: "Master's student in Data Science at EPFL",
};
