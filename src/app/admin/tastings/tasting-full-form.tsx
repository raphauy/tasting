"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { TastingFormValues, tastingSchema } from '@/services/tasting-services'
import { zodResolver } from "@hookform/resolvers/zod"
import { BadgeInfo, Eye, EyeOff, Info, Loader } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { createOrUpdateTastingAction, getTastingDAOAction } from "./tasting-actions"
import TitleBox from "./title-box"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

type Props= {
  id: string
  producerId: string
}

export function TastingFullForm({ id, producerId }: Props) {
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
          form.reset(data)
        }
        Object.keys(form.getValues()).forEach((key: any) => {
          if (form.getValues(key) === null) {
            form.setValue(key, "")
          }
        })
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
            name="style"
            render={({ field }) => (
              <FormItem className="flex items-center pb-5 pl-2 justify-between">
                <div className="font-bold flex items-center gap-5">
                  <p className="w-20 mt-0.5">Style:</p>
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
                        <FormControl><RadioGroupItem value="sparkling" /></FormControl>
                        <FormLabel>sparkling</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="white" /></FormControl>
                        <FormLabel>white</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="rosé" /></FormControl>
                        <FormLabel>rosé</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="red" /></FormControl>
                        <FormLabel>red</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0 w-28">
                        <FormControl><RadioGroupItem value="fortified" /></FormControl>
                        <FormLabel>fortified</FormLabel>
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

          <TooltipProvider delayDuration={0}>
            <div className="flex ml-28 gap-7">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex hover:text-muted-foreground justify-center font-bold items-center bg-green-200 w-6 h-6 border rounded-full">1</div>
                </TooltipTrigger>
                <TooltipContent>
                    <Image src="/primary.png" width={900} height={300} alt="Primary aromas" />
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex hover:text-muted-foreground justify-center font-bold items-center bg-green-200 w-6 h-6 border rounded-full">2</div>
                </TooltipTrigger>
                <TooltipContent>
                    <Image src="/secondary.png" width={800} height={300} alt="Secondary aromas" />
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex hover:text-muted-foreground justify-center font-bold items-center bg-green-200 w-6 h-6 border rounded-full">3</div>
                </TooltipTrigger>
                <TooltipContent>
                    <Image src="/tertiary.png" width={800} height={300} alt="Tertiary aromas" />
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
          <FormField
            control={form.control}
            name="aromasDescriptors"
            render={({ field }) => (
              <FormItem className="w-full flex items-center gap-2">
                <p className="ml-2 font-bold mt-2">Descriptors:</p>
                <FormControl>
                  <Input placeholder="Aromas descriptors" {...field} />
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
              <FormItem className="flex items-center gap-10 pl-2 justify-between">
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
            name="aging"
            render={({ field }) => (
              <FormItem className="w-full flex items-center gap-2 pb-1">
                <p className="ml-2 font-bold mt-2">Ageing:</p>
                <FormControl>
                  <Input placeholder="Ageing" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  

          <FormField
              control={form.control}
              name="conclusion"
              render={({ field }) => (
                <FormItem className="w-full ml-2 pb-5">
                  <p className="font-bold">Conclusions:</p>
                  <FormControl>
                    <Textarea className="text-lg" rows={5} placeholder="Conclusions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />           

          <TitleBox title="Score" />

          <div className="flex justify-center pb-10">
            <div className="border p-10 rounded-lg w-64 shadow-xl">
              <FormField
                control={form.control}
                name="score"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel className="text-2xl font-bold mt-2">Score:</FormLabel>
                    <FormControl>
                      <Input className="text-lg font-bold text-center" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />            

            </div>
          </div>

          <TitleBox title="Tasting Note" />
          <FormField
              control={form.control}
              name="tastingNote"
              render={({ field }) => (
                <FormItem className="w-full ml-2">
                  <FormControl>
                    <Textarea className="text-lg" rows={5} placeholder="Conclusions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />           

          <div className="flex justify-center py-10 gap-4">
            <Link href={`/overview?p=${producerId}`} prefetch={false}>
              <Button variant="outline" type="button" className="w-32 ml-2">
                {loading ? <Loader className="h-4 w-4 animate-spin" /> : <p className="flex items-center gap-2">Overview <EyeOff /></p>}
              </Button>
            </Link>
            <Link href={`/overview?p=${producerId}&v=true`} prefetch={false}>
              <Button variant="outline" type="button" className="w-32 ml-2">
                {loading ? <Loader className="h-4 w-4 animate-spin" /> : <p className="flex items-center gap-2">Overview <Eye /></p>}
              </Button>
            </Link>
            <Button type="submit" className="w-32 ml-2">
              {loading ? <Loader className="h-4 w-4 animate-spin" /> : <p>Save</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>     
  )
}
