"use client";

import { Dialog, DialogContent } from "~/components/ui/dialog";
import AuthForm from "~/components/auth/AuthForm";
import useAuthModal from "store/useAuthModal";

const AuthModal = () => {
  const { isOpen, toggleModal } = useAuthModal();

  return (
    <Dialog open={isOpen} onOpenChange={() => toggleModal(!isOpen)}>
      <DialogContent className="flex select-none flex-col sm:max-w-[26rem]">
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
