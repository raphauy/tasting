"use client"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, LayoutDashboard, PlusCircle, Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export type SelectorData={
    id: string,
    name: string
    count: number
}

interface Props{
    selectors: SelectorData[]
}
export function ProductorSelector({ selectors }: Props) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const router= useRouter()
    const path= usePathname()
    const searchParams= useSearchParams()

    useEffect(() => {
      const id= searchParams.get("p")

      if (id === "ALL") {
        setValue("ALL")
      } else {
        const name= selectors.find(selector => selector.id === id)?.name
        name ? setValue(name) : setValue("")  
      }
      
    
    }, [path, selectors, searchParams])
    
  
    const filteredValues = useMemo(() => {
      if (!searchValue) return selectors
      const lowerCaseSearchValue = searchValue.toLowerCase();
      return selectors.filter((item) => 
      item.name.toLowerCase().includes(lowerCaseSearchValue)
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
              {value === "ALL" ? "ALL" : value
                ? selectors.find(selector => selector.name === value)?.name
                : "Select productor..."}
              <div className="flex items-center">
                {value === "ALL" ? selectors.reduce((acc, curr) => acc + curr.count, 0) : value
                ? selectors.find(selector => selector.name === value)?.count
                : "Select productor..."}
                <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
              </div>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="min-w-[230px] p-0">
            <Command filter={customFilter} >
              <div className='flex items-center w-full gap-1 p-2 border border-gray-300 rounded-md shadow'>
                  <Search className="w-4 h-4 mx-1 opacity-50 shrink-0" />
                  <input placeholder="Find producer..." onInput={handleInputChange} value={searchValue} className="w-full bg-transparent focus:outline-none"/>
              </div>
              
              <CommandEmpty>productor not found</CommandEmpty>
              <CommandGroup>
                {filteredValues.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={(currentValue) => {
                      if (currentValue === value) {
                        setValue("")
                      } else {
                        setValue(currentValue)
                        router.push(`/overview?p=${item.id}`)
                      }
                      setSearchValue("")
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.toLowerCase() === item.name.toLowerCase() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex justify-between w-full">
                      <p>{item.name}</p>
                      <p>{item.count}</p>
                    </div>
                  </CommandItem>
                ))}

                <Separator className="my-2" />

                <CommandItem className="mb-2 cursor-pointer font-bold dark:text-white"
                  onSelect={(currentValue) => {
                    router.push("/overview?p=ALL")
                    setSearchValue("")
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === "ALL" ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex justify-between w-full">
                    <p>ALL</p>
                    <p>{selectors.reduce((acc, curr) => acc + curr.count, 0)}</p>
                  </div>
                </CommandItem>


              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

    )
  }
  
