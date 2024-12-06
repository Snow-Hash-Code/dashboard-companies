"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { ModalAddEventProps } from "./ModalAddEvent.types";
import { FormEvent } from "../FormEvent";

export function ModalAddEvent(props: ModalAddEventProps) {
  const { open, companies, setNewEvent, setOnSaveNewEvent, setOpen } = props
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new event</DialogTitle>
          </DialogHeader>
          <FormEvent 
            companies={companies} 
            setNewEvent={setNewEvent} 
            setOpen={setOpen} 
            setOnSaveNewEvent={setOnSaveNewEvent}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}