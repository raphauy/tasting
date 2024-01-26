"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { deleteTastingAction, createOrUpdateTastingAction, getTastingDAOAction, getProducerWinesAction, setWineIdAction } from "./tasting-actions"
import { tastingSchema, TastingFormValues } from '@/services/tasting-services'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader, Wine } from "lucide-react"
import { WineDAO } from "@/services/wine-services"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

type Props= {
  id?: string
  wineId: string | null
  closeDialog?: () => void
}

export function TastingForm({ id, wineId, closeDialog }: Props) {
  const form = useForm<TastingFormValues>({
    resolver: zodResolver(tastingSchema),
    defaultValues: {},
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: TastingFormValues) => {
    setLoading(true)
    try {
      await createOrUpdateTastingAction(id ? id : null, data)
      toast({ title: id ? "Tasting updated" : "Tasting created" })
      closeDialog && closeDialog()
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      getTastingDAOAction(id).then((data) => {
        if (data) {
          form.reset(data)
        }
        Object.keys(form.getValues()).forEach((key: any) => {
          if (form.getValues(key) === null) {
            form.setValue(key, "")
          }
        })
      })
    } else {
      if (wineId) {
        form.setValue("wineId", wineId)
      }
    }
  }, [form, id, wineId])

  return (
    <div className="p-4 bg-white rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          <FormField
            control={form.control}
            name="taster"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taster</FormLabel>
                <FormControl>
                  <Input placeholder="Tasting's taster" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="vintage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vintage</FormLabel>
                <FormControl>
                  <Input placeholder="Wine's vintage" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      
        <div className="flex justify-end">
            <Button onClick={() => closeDialog && closeDialog()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
            <Button type="submit" className="w-32 ml-2">
              {loading ? <Loader className="h-4 w-4 animate-spin" /> : <p>Save</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>     
  )
}

type ChangeWineProps= {
  id: string
  wineId: string
  closeDialog?: () => void
}

export function ChangeWineForm({ id, wineId, closeDialog }: ChangeWineProps) {
  const form = useForm<TastingFormValues>({
    resolver: zodResolver(tastingSchema),
    defaultValues: {},
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)
  const [wines, setWines] = useState<WineDAO[]>([])
  const [selectedWine, setSelectedWine] = useState<WineDAO>()

  // const onSubmit = async (data: TastingFormValues) => {    
  const onSubmit = async () => {    
      if (!selectedWine) { 
      toast({ title: "Error", description: "You must select a wine", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      await setWineIdAction(id, selectedWine.id)
      toast({ title: "Tasting updated", description: "Wine changed" })
      closeDialog && closeDialog()
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTastingDAOAction(id)
    .then((data) => {
      if (data) {
        console.log("setting data", data);
        
        form.reset(data)
      }
      Object.keys(form.getValues()).forEach((key: any) => {
        if (form.getValues(key) === null) {
          form.setValue(key, "")
        }
      })
    })
    getProducerWinesAction(wineId)
    .then((data) => {
      if (data)
      setWines(data)
      setSelectedWine(data.find((wine) => wine.id === wineId))
    })
  }, [form, id, wineId])


  return (
    <div className="p-4 bg-white rounded-md">
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> */}

        <div className="flex items-center gap-2">
          <p>Wine selected:</p>
          <p>{selectedWine?.name}</p>
        </div>

        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Wines">
              {
                wines.map((wine) => (
                  <CommandItem key={wine.id}                  
                  onSelect={(currentValue) => {
                    console.log(currentValue)

                    
                    const wine= wines.find((wine) => wine.name.toLocaleLowerCase() === currentValue)
                    if (!wine) return
                    setSelectedWine(wine)
                  }}
                  >
                    <Wine className="mr-2 h-4 w-4" />
                    <span>{wine.name}</span>
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </Command>          
      
        <div className="flex justify-end">
            <Button onClick={() => closeDialog && closeDialog()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
            <Button type="submit" className="w-32 ml-2" onClick={onSubmit}>
              {loading ? <Loader className="h-4 w-4 animate-spin" /> : <p>Save</p>}
            </Button>
          </div>
        {/* </form>
      </Form> */}
    </div>     
  )
}

type DeleteProps= {
  id: string
  closeDialog: () => void
}


export function DeleteTastingForm({ id, closeDialog }: DeleteProps) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!id) return
    setLoading(true)
    deleteTastingAction(id)
    .then(() => {
      toast({title: "Tasting deleted" })
    })
    .catch((error) => {
      toast({title: "Error", description: error.message, variant: "destructive"})
    })
    .finally(() => {
      setLoading(false)
      closeDialog && closeDialog()
    })
  }
  
  return (
    <div>
      <Button onClick={() => closeDialog && closeDialog()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
      <Button onClick={handleDelete} variant="destructive" className="w-32 ml-2 gap-1">
        { loading && <Loader className="h-4 w-4 animate-spin" /> }
        Delete  
      </Button>
    </div>
  )
}

