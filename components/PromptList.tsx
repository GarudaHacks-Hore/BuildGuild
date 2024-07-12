import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { FaRegTrashAlt } from "react-icons/fa";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { PromptHistory } from "@/types/PromptHistory";
import { toast } from "@/components/ui/use-toast";

interface PromptListProps {
  selectedItemId: string | null;
  prompt: PromptHistory;
  handleClick: (id: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<any>>;
  setSelectedItemId: React.Dispatch<React.SetStateAction<any>>;
}

interface DeleteDialogProps {
  className: string;
  id: string;
  setMessages: React.Dispatch<React.SetStateAction<any>>;
  setSelectedItemId: React.Dispatch<React.SetStateAction<any>>;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  className,
  id,
  setMessages,
  setSelectedItemId,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDelete = async (historyId: string) => {
    const { data, error } = await supabase
      .from("prompt_histories")
      .delete()
      .eq("id", historyId)
      .select();

    if (error) {
      console.error("Error deleting prompt history: ", error);
      toast({
        title: "Error deleting prompt history!",
        variant: "destructive",
      });
      return;
    } else {
      setMessages([]);
      setSelectedItemId(null);
      toast({
        title: "Prompt history deleted!",
        variant: "default",
      });
    }

    // Close the dialog after deleting
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={className} onClick={() => setIsOpen(true)}>
        <FaRegTrashAlt />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            prompt history and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"destructive"}
            type="submit"
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PromptList = (props: PromptListProps) => {
  const {
    selectedItemId,
    prompt,
    handleClick,
    setMessages,
    setSelectedItemId,
  } = props;

  return (
    <div
      className={`py-1 group hover:px-2 w-full flex items-center justify-between transition-all rounded-md cursor-pointer ${
        selectedItemId === prompt.id ? "bg-gray-200 px-2" : "hover:bg-gray-200"
      }`}
    >
      <button
        className="w-full text-left py-1 truncate overflow-ellipsis"
        onClick={() => handleClick(prompt.id)}
      >
        {prompt.message}
      </button>
      <DeleteDialog
        id={prompt.id}
        className={`hover:bg-gray-300 h-full aspect-square rounded-full flex justify-center items-center ${
          selectedItemId === prompt.id
            ? "visible"
            : "group-hover:visible invisible"
        }`}
        setMessages={setMessages}
        setSelectedItemId={setSelectedItemId}
      />
    </div>
  );
};

export default PromptList;
