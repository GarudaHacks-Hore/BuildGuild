// components/ui/ProjectCard.tsx
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  owner: string;
  title: string;
  description: string;
  image: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ owner, title, description, image }) => {
  return (
    <div className="h-80 w-full flex flex-col items-start p-4 bg-white rounded-lg shadow-lg gap-2">
      <Image
        src={image}
        className="h-40 w-full object-cover rounded-lg"
        height="160"
        width="320"
        alt={title}
      />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
      <p className="text-xs text-gray-500">by {owner}</p>
    </div>
  );
};

export default ProjectCard;
