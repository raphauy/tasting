"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeftRight, ClipboardPasteIcon, Pencil, PlusCircle, Trash2, Wine } from "lucide-react";
import { useState } from "react";
import { ChangeWineForm, DeleteTastingForm, TastingForm } from "./tasting-forms";

type Props= {
  id?: string
  wineId: string | null
}

const addTrigger= (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="hover:bg-accent hover:text-accent-foreground rounded-md p-2" >
        <PlusCircle className="h-5 w-5" />
      </div>
    </TooltipTrigger>
    <TooltipContent>Add Tasting</TooltipContent>
  </Tooltip>
)

const updateTrigger= (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="hover:bg-accent hover:text-accent-foreground rounded-md p-2" >
        <Pencil className="h-5 w-5" />
      </div>
    </TooltipTrigger>
    <TooltipContent>Edit Tasting</TooltipContent>
  </Tooltip>
)

export function TastingDialog({ id, wineId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {id ? updateTrigger : addTrigger }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{id ? 'Update' : 'Create'} Tasting
          </DialogTitle>
        </DialogHeader>
        <TastingForm closeDialog={() => setOpen(false)} id={id} wineId={wineId} />
      </DialogContent>
    </Dialog>
  )
}

type ChangeWineProps= {
  id: string
  wineId: string
}

export function ChangeWineDialog({ id, wineId }: ChangeWineProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <ArrowLeftRight className="h-5 w-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Wine
          </DialogTitle>
        </DialogHeader>
        <ChangeWineForm closeDialog={() => setOpen(false)} id={id} wineId={wineId} />
      </DialogContent>
    </Dialog>
  )
}

type DeleteProps= {
  id: string
  description: string
}

export function DeleteTastingDialog({ id, description }: DeleteProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="hover:bg-accent hover:text-accent-foreground rounded-md p-2" >
              <Trash2 className="h-5 w-5" />
            </div>
          </TooltipTrigger>
          <TooltipContent>Delete Tasting</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Tasting</DialogTitle>
          <DialogDescription className="py-8">{description}</DialogDescription>
        </DialogHeader>
        <DeleteTastingForm closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}

interface CollectionProps{
  id: string
  title: string
}




  
