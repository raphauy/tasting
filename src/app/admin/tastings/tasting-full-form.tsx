"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { deleteTastingAction, createOrUpdateTastingAction, getTastingDAOAction } from "./tasting-actions"
import { tastingSchema, TastingFormValues } from '@/services/tasting-services'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader } from "lucide-react"
import TitleBox from "./title-box"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

type Props= {
  id: string
}

export function TastingFullForm({ id }: Props) {
  const form = useForm<TastingFormValues>({
    resolver: zodResolver(tastingSchema),
    defaultValues: {},
    mode: "onChange",
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: TastingFormValues) => {
    setLoading(true)
    try {
      await createOrUpdateTastingAction(id, data)
      toast({ title: id ? "Tasting updated" : "Tasting created" })
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
          form.setValue("colour", data.colour)
          form.reset(data)
        }
        // Object.keys(form.getValues()).forEach((key: any) => {
        //   if (form.getValues(key) === null) {
        //     form.setValue(key, "")
        //   }
        // })
      })
    }
  }, [form, id])

  return (
    <div className="bg-white rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          
          <TitleBox title="General Data" />
          <div className="flex gap-2 pb-5 px-2">
            <FormField
              control={form.control}
              name="taster"
              render={({ field }) => (
                <FormItem className="w-full">
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
                <FormItem className="w-full">
                  <FormLabel>Vintage</FormLabel>
                  <FormControl>
                    <Input placeholder="Tasting's vintage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="abv"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>ABV%</FormLabel>
                  <FormControl>
                    <Input placeholder="Tasting's ABV" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pesoPrice"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Peso price (UYU)</FormLabel>
                  <FormControl>
                    <Input placeholder="Tasting's peso price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <TitleBox title="Apperance" />

          <FormField
            control={form.control}
            name="colour"
            render={({ field }) => (
              <FormItem className="flex justify-between gap-10 pb-5 pl-2">
                <div className="font-bold flex items-center gap-5">
                  <p className="w-20 mt-0.5">Colour:</p>
                  <p className="text-black text-2xl">{field.value}</p>
                </div>
                <FormControl>
                  <RadioGroup                  
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex gap-4 pb-1">
                      <FormLabel className="font-semibold mt-0.5 w-12 text-black">
                        White:
                      </FormLabel>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="lemon" /></FormControl>
                        <FormLabel>lemon</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="gold" /></FormControl>
                        <FormLabel>gold</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="amber" /></FormControl>
                        <FormLabel>amber</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="brown" /></FormControl>
                        <FormLabel>brown</FormLabel>
                      </FormItem>
                    </div>

                    <div className="flex gap-4 pb-1">
                      <FormLabel className="font-semibold mt-0.5 w-12 text-black">
                        Rosé:
                      </FormLabel>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="pink" /></FormControl>
                        <FormLabel>pink</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="pink-orange" /></FormControl>
                        <FormLabel>pink-orange</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="orange" /></FormControl>
                        <FormLabel>orange</FormLabel>
                      </FormItem>
                    </div>

                    <div className="flex gap-4 pb-1">
                      <FormLabel className="font-semibold mt-0.5 w-12 text-black">
                        Red:
                      </FormLabel>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="purple" /></FormControl>
                        <FormLabel>purple</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="ruby" /></FormControl>
                        <FormLabel>ruby</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="garnet" /></FormControl>
                        <FormLabel>garnet</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="tawny" /></FormControl>
                        <FormLabel>tawny</FormLabel>
                      </FormItem>
                    </div>

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <TitleBox title="Nose" />

          <FormField
            control={form.control}
            name="aromas"
            render={({ field }) => (
              <FormItem className="flex items-center pb-5 pl-2 justify-between">
                <div className="font-bold flex items-center gap-5">
                  <p className="w-20 mt-0.5">Aromas:</p>
                  <p className="text-black text-2xl">{field.value}</p>
                </div>
                <FormControl>
                  <RadioGroup                  
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex gap-4 pb-1">
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="primary" /></FormControl>
                        <FormLabel>primary</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="secondary" /></FormControl>
                        <FormLabel>secondary</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="tertiary" /></FormControl>
                        <FormLabel>tertiary</FormLabel>
                      </FormItem>
                    </div>

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <TitleBox title="Palate" />

          <FormField
            control={form.control}
            name="acidity"
            render={({ field }) => (
              <FormItem className="flex items-center pl-2 justify-between hover:bg-green-100 rounded-lg">
                <div className="font-bold flex items-center gap-5 h-9">
                  <p className="w-20 mt-0.5">Acidity:</p>
                  <p className="text-black text-2xl">{field.value}</p>
                </div>
                <FormControl>
                  <RadioGroup                  
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="flex gap-4 pb-1">
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="low" /></FormControl>
                        <FormLabel>low</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="medium(-)" /></FormControl>
                        <FormLabel>medium(-)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="medium" /></FormControl>
                        <FormLabel>medium</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="medium(+)" /></FormControl>
                        <FormLabel>medium(+)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="high" /></FormControl>
                        <FormLabel>high</FormLabel>
                      </FormItem>
                    </div>

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tannins"
            render={({ field }) => (
              <FormItem className="flex items-center pl-2 justify-between hover:bg-green-100 rounded-lg">
                <div className="font-bold flex items-center gap-5 h-9">
                  <p className="w-20 mt-0.5">Tannins:</p>
                  <p className="text-black text-2xl">{field.value}</p>
                </div>
                <FormControl>
                  <RadioGroup                  
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex gap-4 pb-1">
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="low" /></FormControl>
                        <FormLabel>low</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="medium(-)" /></FormControl>
                        <FormLabel>medium(-)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="medium" /></FormControl>
                        <FormLabel>medium</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="medium(+)" /></FormControl>
                        <FormLabel>medium(+)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="high" /></FormControl>
                        <FormLabel>high</FormLabel>
                      </FormItem>
                    </div>

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="flex items-center pl-2 justify-between hover:bg-green-100 rounded-lg">
                <div className="font-bold flex items-center gap-5 h-9">
                  <p className="w-20 mt-0.5">Body:</p>
                  <p className="text-black text-2xl">{field.value}</p>
                </div>
                <FormControl>
                  <RadioGroup                  
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex gap-4 pb-1">
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="light" /></FormControl>
                        <FormLabel>light</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="medium(-)" /></FormControl>
                        <FormLabel>medium(-)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="medium" /></FormControl>
                        <FormLabel>medium</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="medium(+)" /></FormControl>
                        <FormLabel>medium(+)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="full" /></FormControl>
                        <FormLabel>full</FormLabel>
                      </FormItem>
                    </div>

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="finish"
            render={({ field }) => (
              <FormItem className="flex items-center pb-5 pl-2 justify-between hover:bg-green-100 rounded-lg">
                <div className="font-bold flex items-center gap-5 h-9">
                  <p className="w-20 mt-0.5">Finish:</p>
                  <p className="text-black text-2xl">{field.value}</p>
                </div>
                <FormControl>
                  <RadioGroup                  
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex gap-4 pb-1">
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="short" /></FormControl>
                        <FormLabel>short</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="medium(-)" /></FormControl>
                        <FormLabel>medium(-)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="medium" /></FormControl>
                        <FormLabel>medium</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="medium(+)" /></FormControl>
                        <FormLabel>medium(+)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="long" /></FormControl>
                        <FormLabel>long</FormLabel>
                      </FormItem>
                    </div>

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <TitleBox title="Conclusions" />

          <FormField
            control={form.control}
            name="potential"
            render={({ field }) => (
              <FormItem className="flex items-center gap-10 pb-5 pl-2 justify-between">
                <div className="font-bold flex items-center gap-5">
                  <p className="w-20 mt-0.5">Potential:</p>
                  <p className="text-black text-2xl">{field.value}</p>
                </div>
                <FormControl>
                  <RadioGroup                  
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex gap-4">
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl><RadioGroupItem value="suitable for bottle ageing" /></FormControl>
                        <FormLabel>suitable for bottle ageing</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 ml-4">
                        <FormControl><RadioGroupItem value="not suitable for bottle ageing" /></FormControl>
                        <FormLabel>not suitable for bottle ageing</FormLabel>
                      </FormItem>
                    </div>

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

              

          <FormField
              control={form.control}
              name="conclusion"
              render={({ field }) => (
                <FormItem className="w-full ml-2 font-bold">
                  <p className="">Conclusions:</p>
                  <FormControl>
                    <Textarea className="text-2xl" rows={5} placeholder="Conclusions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />           

          <div className="flex justify-center">
            <div className="border p-10 rounded-lg w-64 shadow-xl">
              <FormField
                control={form.control}
                name="score"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel className="text-2xl font-bold mt-2">Score:</FormLabel>
                    <FormControl>
                      <Input className="text-xl font-bold text-center" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />            

            </div>
          </div>

        <div className="flex justify-end">
            <Button type="submit" className="w-32 ml-2">
              {loading ? <Loader className="h-4 w-4 animate-spin" /> : <p>Save</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>     
  )
}
