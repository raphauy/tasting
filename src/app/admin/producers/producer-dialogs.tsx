"use client"

import { useEffect, useState } from "react";
import { ArrowLeftRight, ChevronsLeft, ChevronsRight, Loader, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ProducerForm, DeleteProducerForm } from "./producer-forms"
import { getProducerDAOAction } from "./producer-actions"

import { getComplentaryWinesAction, setWinesAction } from "./producer-actions"
import { WineDAO } from "@/services/wine-services"  
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
  
type Props= {
  id?: string  
  create?: boolean
}

const addTrigger= (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="inline-flex items-center gap-2 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2" >
        <PlusCircle className="h-5 w-5" /> Add Producer
      </div>
    </TooltipTrigger>
    <TooltipContent>Add Producer</TooltipContent>
  </Tooltip>
)

const updateTrigger= (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="hover:bg-accent hover:text-accent-foreground rounded-md p-2" >
        <Pencil className="h-5 w-5" />
      </div>
    </TooltipTrigger>
    <TooltipContent>Edit Producer</TooltipContent>
  </Tooltip>
)

export function ProducerDialog({ id }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {id ? updateTrigger : addTrigger }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{id ? 'Update' : 'Create'} Producer
          </DialogTitle>
        </DialogHeader>
        <ProducerForm closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}
  
type DeleteProps= {
  id: string
  description: string
}

export function DeleteProducerDialog({ id, description }: DeleteProps) {
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
          <TooltipContent>Delete Producer</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Producer</DialogTitle>
          <DialogDescription className="py-8">{description}</DialogDescription>
        </DialogHeader>
        <DeleteProducerForm closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  )
}

interface CollectionProps{
  id: string
  title: string
}

    
export function WinesDialog({ id, title }: CollectionProps) {
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
        <ProducerWinesBox closeDialog={() => setOpen(false)} id={id} />
      </DialogContent>
    </Dialog>
  );
}      




interface WinesBoxProps{
  id: string
  closeDialog: () => void
}

export function ProducerWinesBox({ id, closeDialog }: WinesBoxProps) {

  const [loading, setLoading] = useState(false)
  const [wines, setWines] = useState<WineDAO[]>([])
  const [complementary, setComplementary] = useState<WineDAO[]>([])

  useEffect(() => {
      getProducerDAOAction(id)
      .then((data) => {
          if(!data) return null
          if (!data.wines) return null
          console.log(data.wines)            
          setWines(data.wines)
      })
      getComplentaryWinesAction(id)
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
      setWines([...wines, comp])
  }

  function complementaryOut(id: string) {            
      const comp= wines.find((c) => c.id === id)
      if(!comp) return
      const newComplementary= wines.filter((c) => c.id !== id)
      setWines(newComplementary)
      setComplementary([...complementary, comp])
  }

  function allIn() {
      setWines([...wines, ...complementary])
      setComplementary([])
  }

  function allOut() {
      setComplementary([...complementary, ...wines])
      setWines([])
  }

  async function handleSave() {
      setLoading(true)
      setWinesAction(id, wines)
      .then(() => {
          toast({ title: "Wines updated" })
          closeDialog()
      })
      .catch((error) => {
          toast({ title: "Error updating wines" })
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
                  wines.map((item) => {
                  return (
                      <div key={item.id} className="flex items-center justify-between gap-2 mb-1 mr-5">
                          <p className="whitespace-nowrap">{item.name}</p>
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
                          <p className="whitespace-nowrap">{item.name}</p>
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
  
