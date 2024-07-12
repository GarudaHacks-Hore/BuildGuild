// components/ui/parallax-scroll.tsx
"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import ProjectsCard from "@/components/ProjectsCard";
import { cn } from "@/lib/utils";

interface Project {
  owner: string;
  title: string;
  description: string;
  image: string;
}

export const ParallaxScroll = ({
  projects,
  className,
}: {
  projects: Project[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateFourth = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const fourth = Math.ceil(projects.length / 4);

  const firstPart = projects.slice(0, fourth);
  const secondPart = projects.slice(fourth, 2 * fourth - 1);
  const thirdPart = projects.slice(2 * fourth - 1, 3 * fourth - 1);
  const fourthPart = projects.slice(3 * fourth - 1);

  return (
    <div
      className={cn(
        "h-[45rem] items-start overflow-y-auto w-full mt-3",
        className
      )}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-4 w-full"
        ref={gridRef}
      >
        <div className="grid gap-4">
          {firstPart.map((project, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
            >
              <ProjectsCard
                owner={project.owner}
                title={project.title}
                description={project.description}
                image={project.image}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-4">
          {secondPart.map((project, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <ProjectsCard
                owner={project.owner}
                title={project.title}
                description={project.description}
                image={project.image}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-4">
          {thirdPart.map((project, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <ProjectsCard
                owner={project.owner}
                title={project.title}
                description={project.description}
                image={project.image}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-4">
          {fourthPart.map((project, idx) => (
            <motion.div style={{ y: translateFourth }} key={"grid-4" + idx}>
              <ProjectsCard
                owner={project.owner}
                title={project.title}
                description={project.description}
                image={project.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
