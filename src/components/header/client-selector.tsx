"use client"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, LayoutDashboard, PlusCircle, Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Separator } from "../ui/separator"
import { useEffect, useMemo, useState } from "react"

export type SelectorData={
    slug: string,
    name: string
}

interface Props{
    selectors: SelectorData[]
}
export function ClientSelector({ selectors }: Props) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [search, setSearch] = useState("")
    const router= useRouter()
    const path= usePathname()
    const searchParams= useSearchParams()

    useEffect(() => {
      const slug= path.split('/')[1]
      
      const name= selectors.find(selector => selector.slug === slug)?.name
      name ? setValue(name) : setValue("")

      const search= searchParams.toString()
      setSearch(search)
    
    }, [path, selectors, searchParams])
    
  
    const filteredValues = useMemo(() => {
      if (!searchValue) return selectors
      const lowerCaseSearchValue = searchValue.toLowerCase();
      return selectors.filter((client) => 
      client.name.toLowerCase().includes(lowerCaseSearchValue)
      )
    }, [selectors, searchValue])
  
    const customFilter = (searchValue: string, itemValue: string) => {      
      return itemValue.toLowerCase().includes(searchValue.toLowerCase()) ? searchValue.toLowerCase().length : 0
    }      
      
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
    }
  
    return (
      <div className="w-full px-1 ">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              className="justify-between w-full text-lg whitespace-nowrap bg-intraprop-color min-w-[230px]"
            >
              {value
                ? selectors.find(selector => selector.name.toLowerCase() === value.toLowerCase())?.name
                : "Admin"}
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="min-w-[230px] p-0">
            <Command filter={customFilter} >
              <div className='flex items-center w-full gap-1 p-2 border border-gray-300 rounded-md shadow'>
                  <Search className="w-4 h-4 mx-1 opacity-50 shrink-0" />
                  <input placeholder="Find client..." onInput={handleInputChange} value={searchValue} className="w-full bg-transparent focus:outline-none"/>
              </div>
              
              <CommandEmpty>client not found</CommandEmpty>
              <CommandGroup>
                {filteredValues.map((client) => (
                  <CommandItem
                    key={client.slug}
                    onSelect={(currentValue) => {
                      if (currentValue === value) {
                        setValue("")
                      } else {
                        setValue(currentValue)
                        // let restOfPath = path.split('/').slice(2).join('/')                         
                        // if (path.startsWith("/admin")) restOfPath = "dashboard"
                        // router.push(`/${client.slug}/${restOfPath}?${search}`)

                        router.push(`/${client.slug}`)
                      }
                      setSearchValue("")
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.toLowerCase() === client.name.toLowerCase() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {client.name}
                  </CommandItem>
                ))}
                  <Separator className="my-2" />

                  <CommandItem className="mb-2 cursor-pointer font-bold dark:text-white"
                    onSelect={(currentValue) => {
                      router.push("/admin")
                      setSearchValue("")
                      setOpen(false)
                    }}
                  >
                    <LayoutDashboard
                      className={cn(
                        "mr-2 h-5 w-5",
                        //value.toLowerCase() === line.name.toLowerCase() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <p className="text-base">Admin</p>
                  </CommandItem>

                  <Separator className="my-2" />

                  <CommandItem className="mb-2 cursor-pointer font-bold dark:text-white"
                    onSelect={(currentValue) => {
                      router.push("/admin/clients/create")
                      setSearchValue("")
                      setOpen(false)
                    }}
                  >
                    <PlusCircle
                      className={cn(
                        "mr-2 h-5 w-5",
                        //value.toLowerCase() === line.name.toLowerCase() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <p className="text-base">Add client</p>
                  </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

    )
  }
  
