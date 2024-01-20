"use client"

import { useEffect, useState } from "react";
import { ArrowLeftRight, ChevronsLeft, ChevronsRight, Loader, Pencil, PlusCircle, Trash2, Wine } from "lucide-react";
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { WineForm, DeleteWineForm } from "./wine-forms"
import { getWineDAOAction } from "./wine-actions"

import { getComplentaryTastingsAction, setTastingsAction } from "./wine-actions"
import { TastingDAO } from "@/services/tasting-services"  
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
  
type Props= {
  id?: string
  producerId: string | null
}

const addTrigger= (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="hover:bg-accent hover:text-accent-foreground rounded-md p-2" >
        <Wine className="h-5 w-5" />
      </div>
    </TooltipTrigger>
    <TooltipContent>Add Wine</TooltipContent>
  </Tooltip>
)

const updateTrigger= (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="hover:bg-accent hover:text-accent-foreground rounded-md p-2" >
        <Pencil className="h-5 w-5" />
      </div>
    </TooltipTrigger>
    <TooltipContent>Edit Wine</TooltipContent>
  </Tooltip>
)

export function WineDialog({ id, producerId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {id ? updateTrigger : addTrigger }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{id ? 'Update' : 'Create'} Wine
          </DialogTitle>
        </DialogHeader>
        <WineForm closeDialog={() => setOpen(false)} id={id} producerId={producerId} />
      </DialogContent>
    </Dialog>
  )
}
  
type DeleteProps= {
  id: string
  description: string
}

export function DeleteWineDialog({ id, description }: DeleteProps) {
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
          <TooltipContent>Delete Wine</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Wine</DialogTitle>
          <DialogDescription className="py-8">{description}</DialogDescription>
        </DialogHeader>
        <DeleteWineForm closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}

interface CollectionProps{
  id: string
  title: string
}

    
export function TastingsDialog({ id, title }: CollectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ArrowLeftRight className="hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <WineTastingsBox closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  );
}      




interface TastingsBoxProps{
  id: string
  closeDialog: () => void
}

export function WineTastingsBox({ id, closeDialog }: TastingsBoxProps) {

  const [loading, setLoading] = useState(false)
  const [tastings, setTastings] = useState<TastingDAO[]>([])
  const [complementary, setComplementary] = useState<TastingDAO[]>([])

  useEffect(() => {
      getWineDAOAction(id)
      .then((data) => {
          if(!data) return null
          if (!data.tastings) return null
          console.log(data.tastings)            
          setTastings(data.tastings)
      })
      getComplentaryTastingsAction(id)
      .then((data) => {
          if(!data) return null
          setComplementary(data)
      })
  }, [id])

  function complementaryIn(id: string) {
      const comp= complementary.find((c) => c.id === id)
      if(!comp) return
      const newComplementary= complementary.filter((c) => c.id !== id)
      setComplementary(newComplementary)
      setTastings([...tastings, comp])
  }

  function complementaryOut(id: string) {            
      const comp= tastings.find((c) => c.id === id)
      if(!comp) return
      const newComplementary= tastings.filter((c) => c.id !== id)
      setTastings(newComplementary)
      setComplementary([...complementary, comp])
  }

  function allIn() {
      setTastings([...tastings, ...complementary])
      setComplementary([])
  }

  function allOut() {
      setComplementary([...complementary, ...tastings])
      setTastings([])
  }

  async function handleSave() {
      setLoading(true)
      setTastingsAction(id, tastings)
      .then(() => {
          toast({ title: "Tastings updated" })
          closeDialog()
      })
      .catch((error) => {
          toast({ title: "Error updating tastings" })
      })
      .finally(() => {
          setLoading(false)
      })
  }

  return (
      <div>
          <div className="grid grid-cols-2 gap-4 p-3 border rounded-md min-w-[400px] min-h-[300px]">
              <div className="flex flex-col border-r">
              {
                  tastings.map((item) => {
                  return (
                      <div key={item.id} className="flex items-center justify-between gap-2 mb-1 mr-5">
                          <p className="whitespace-nowrap">{item.vintage} ({item.taster})</p>
                          <Button variant="secondary" className="h-7" onClick={() => complementaryOut(item.id)}><ChevronsRight /></Button>
                      </div>
                  )})
              }
                      <div className="flex items-end justify-between flex-1 gap-2 mb-1 mr-5">
                          <p>Todos</p>
                          <Button variant="secondary" className="h-7" onClick={() => allOut()}><ChevronsRight /></Button>
                      </div>
              </div>
              <div className="flex flex-col">
              {
                  complementary.map((item) => {
                  return (
                      <div key={item.id} className="flex items-center gap-2 mb-1">
                          <Button variant="secondary" className="h-7 x-7" onClick={() => complementaryIn(item.id)}>
                              <ChevronsLeft />
                          </Button>
                          <p className="whitespace-nowrap">{item.vintage} ({item.taster})</p>
                      </div>
                  )})
              }
                  <div className="flex items-end flex-1 gap-2 mb-1">
                      <Button variant="secondary" className="h-7" onClick={() => allIn()}><ChevronsLeft /></Button>
                      <p>Todos</p>
                  </div>
              </div>
          </div>

          <div className="flex justify-end mt-4">
              <Button type="button" variant={"secondary"} className="w-32" onClick={() => closeDialog()}>Cancelar</Button>
              <Button onClick={handleSave} className="w-32 ml-2" >{loading ? <Loader className="animate-spin" /> : <p>Save</p>}</Button>
          </div>
      </div>
  )
} 
  
