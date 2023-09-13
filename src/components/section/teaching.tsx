"use client";

import { useContext } from "react";

import Link from "next/link";

import { Section } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { PostContext } from "@/lib/context";
import { CourseInformation } from "@/lib/meta";
import { FrontmatterWithSlug, GroupedFrontmatterWithSlug } from "@/lib/types";

function TeachingBox({
  postFrontmatter,
}: {
  postFrontmatter: FrontmatterWithSlug;
}) {
  return (
    <Link
      href={`/teaching/${postFrontmatter.slug}`}
      className="group hover:no-underline focus-visible:-outline-offset-[2px] focus-visible:outline-accent-foreground"
    >
      <div className="flex h-16 cursor-pointer items-center gap-x-6 rounded-lg p-4 transition-all group-hover:bg-accent ">
        <span className="w-1/5 text-xs text-muted-foreground md:w-auto">
          {new Date(postFrontmatter.published).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
          })}
        </span>
        <span className="flex-1 truncate text-lg tracking-wide text-foreground transition-all group-hover:text-accent-foreground">
          {postFrontmatter.title}
        </span>
      </div>
    </Link>
  );
}

export function Teaching() {
  const posts = useContext(PostContext);
  if (!posts) return;

  const teachingPosts = posts["teaching"];

  const groupedTeachingPosts = teachingPosts.reduce((acc, post) => {
    const course = post.course;
    if (!course) {
      return acc;
    }
    if (Object.keys(acc).includes(course)) {
      return { ...acc, [course]: [...acc[course], post] };
    } else {
      return { ...acc, [course]: [post] };
    }
  }, {} as GroupedFrontmatterWithSlug);

  return (
    <Section>
      <h2 className="m-0">Teaching Material</h2>
      {Object.keys(groupedTeachingPosts).map((course) => {
        return (
          <Accordion key={course} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-x-2">
                  <span className="m-0 group-hover:underline">{course}</span>
                  <Badge variant="outline" className="hidden md:block">
                    {CourseInformation[course].university}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {groupedTeachingPosts[course].map((postFrontmatter) => (
                  <TeachingBox
                    key={postFrontmatter.slug}
                    postFrontmatter={postFrontmatter}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </Section>
  );
}
