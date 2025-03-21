"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";


export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal()

  const isModalOpen = isOpen && type === "deleteChannel"
  const { server,channel } = data;

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url:`/api/channels/${channel?.id}`,
        query:{
          serverId : server?.id
        }
      })
      await axios.delete(url)

      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`)


    } catch (error) {

    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden top-[10%] left-[30%] ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br/><span className="font-semibold text-indigo-500">#{channel?.name}</span> will be permanently deleted?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClick}
              variant="primary"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}