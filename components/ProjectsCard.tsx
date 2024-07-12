import React from "react";
import Image from "next/image";

interface ProjectCardProps {
  owner: string;
  title: string;
  description: string;
  image: string;
  tags?: string[]; 
}

const ProjectCard: React.FC<ProjectCardProps> = ({ owner, title, description, image, tags = [] }) => {
  return (
    <div className="relative h-80 w-full flex flex-col items-start p-4 bg-white rounded-lg shadow-lg gap-2">
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
      <div className="absolute bottom-2 right-2 flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
