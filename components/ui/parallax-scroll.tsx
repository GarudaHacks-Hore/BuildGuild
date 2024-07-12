"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ProjectModal from "@/components/ProjectsModal";
import { cn } from "@/lib/utils";

interface Project {
  owner: string;
  title: string;
  description: string;
  image: string;
  week: number; 
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

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <>
      <div
        className={cn(
          "h-[45rem] items-start overflow-y-auto w-full mt-3",
          className
        )}
        ref={gridRef}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-4 w-full">
          <div className="grid gap-4">
            {firstPart.map((project, idx) => (
              <motion.div
                style={{ y: translateFirst }}
                key={"grid-1" + idx}
                onClick={() => openModal(project)}
                className="cursor-pointer"
              >
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <img
                    src={project.image}
                    className="h-40 w-full object-cover rounded-lg"
                    alt={project.title}
                  />
                  <h3 className="mt-2 font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.owner}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid gap-4">
            {secondPart.map((project, idx) => (
              <motion.div style={{ y: translateSecond }} key={"grid-2" + idx} onClick={() => openModal(project)} className="cursor-pointer">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <img
                    src={project.image}
                    className="h-40 w-full object-cover rounded-lg"
                    alt={project.title}
                  />
                  <h3 className="mt-2 font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.owner}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid gap-4">
            {thirdPart.map((project, idx) => (
              <motion.div style={{ y: translateThird }} key={"grid-3" + idx} onClick={() => openModal(project)} className="cursor-pointer">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <img
                    src={project.image}
                    className="h-40 w-full object-cover rounded-lg"
                    alt={project.title}
                  />
                  <h3 className="mt-2 font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.owner}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid gap-4">
            {fourthPart.map((project, idx) => (
              <motion.div style={{ y: translateFourth }} key={"grid-4" + idx} onClick={() => openModal(project)} className="cursor-pointer">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <img
                    src={project.image}
                    className="h-40 w-full object-cover rounded-lg"
                    alt={project.title}
                  />
                  <h3 className="mt-2 font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.owner}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
      />
    </>
  );
};
