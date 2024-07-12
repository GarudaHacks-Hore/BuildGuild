import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    owner: string;
    title: string;
    description: string;
    image: string;
  } | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.owner}</DialogDescription>
        </DialogHeader>
        <div>
          <img src={project.image} alt={project.title} className="w-full h-auto rounded-md mb-4" />
          <p>{project.description}</p>
        </div>
        <Button onClick={onClose} className="mt-4">Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
