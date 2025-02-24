import useProfileStore from "@/store/profileStore";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { handleAxiosError } from "@/utils/handlerAxiosError";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ReactNode, useState } from "react";
import FeedbackForm from "@/components/Forms/FeedbackForm";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ProfileCard = () => {

  const [open, setIsOpen] = useState(false)

  const { profile } = useProfileStore();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Logout successful");
        navigate("/login");
      }
    } catch (error) {
      handleAxiosError(error as AxiosError, navigate);
    } finally {
      setIsOpen(false)
    }
  };

  return (
    <Popover open={open} onOpenChange={setIsOpen}>
      <PopoverTrigger className="!w-14 dark:text-white flex justify-center items-center rounded-md focus:outline-none">
        <img
          className="rounded-full h-10 w-10 object-cover border-zinc-700 border-2 hover:border-zinc-200 transition-colors"
          src={profile.avatar}
          alt="Profile pic"
        />
      </PopoverTrigger>
      <PopoverContent
        className="bg-zinc-300 dark:bg-black dark:text-white dark:border-zinc-800 !w-64 space-y-1 p-2 mt-1"
      >
        <div className="flex justify-start items-center select-none cursor-pointer px-3 py-3 bg-zinc-100/90 hover:bg-zinc-200 dark:bg-zinc-800/70 dark:hover:bg-zinc-800 rounded-sm">
          <img
            className="rounded-full h-10 w-10 object-cover"
            src={profile.avatar}
            alt="Profile pic"
          />
          <div className="ml-3 text-start">
            <h5 className="text-sm dark:text-zinc-200 font-semibold cursor-pointer">{profile.fullName}</h5>
            <p className="text-xs text-zinc-500 dark:text-gray-400 cursor-pointer">
              {profile.email}
            </p>
          </div>
        </div>

        <DialogContainer
          onClose={(value) => (value !== true && setIsOpen(false))}
          trigger="Feedback"
          title="Feedback"
          description="Report a bug or Suggest a feature."
        >
          <FeedbackForm setIsOpen={setIsOpen} />
        </DialogContainer>

        <DialogContainer
          onClose={(value) => (value !== true && setIsOpen(false))}
          trigger="Logout"
          title="Are you sure you want to logout?"
          description="Your account will be deleted if there is no activity found for 60 days."
        >
          <div className="flex justify-center">
            <Button
              onClick={handleLogout}
              className="w-full rounded-sm text-zinc-50 font-semibold bg-red-500 hover:bg-red-600"
            >
              Yes
            </Button>
            <DialogClose
              className="ml-1.5 rounded-sm w-full font-semibold dark:bg-zinc-800 dark:hover:bg-zinc-800/60 bg-zinc-200 hover:bg-zinc-300"
            >
              No
            </DialogClose>
          </div>
        </DialogContainer>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileCard;

const DialogContainer = ({ children, trigger, title, description, onClose = null }: {
  children: ReactNode;
  trigger: string;
  title: string;
  description: string
  onClose?: ((value: boolean) => void) | null
}) => {
  return (
    <Dialog
      onOpenChange={(v) => onClose && onClose(v)}
    >
      <DialogTrigger className="p-3 text-sm text-start bg-zinc-100/90 hover:bg-zinc-200 dark:bg-zinc-800/70 dark:hover:bg-zinc-800 w-full rounded-sm cursor-pointer">
        {trigger}
      </DialogTrigger>
      <DialogContent aria-hidden className="sm:max-w-96">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}