"use client"

import * as React from "react"
import { Table as TanstackTable } from "@tanstack/react-table"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { DataTablePagination } from "@/components/data-table/data-table-pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
  
interface DataTableToolbarProps<TData> {
  table: TanstackTable<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex gap-1 dark:text-white items-center">
        
          <Input className="max-w-xs" placeholder="taster filter..."
              value={(table.getColumn("taster")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("taster")?.setFilterValue(event.target.value)}                
          />
          
      
          <Input className="max-w-xs" placeholder="vintage filter..."
              value={(table.getColumn("vintage")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("vintage")?.setFilterValue(event.target.value)}                
          />
          
      
          <Input className="max-w-xs" placeholder="colour filter..."
              value={(table.getColumn("colour")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("colour")?.setFilterValue(event.target.value)}                
          />
          
      
          <Input className="max-w-xs" placeholder="abv filter..."
              value={(table.getColumn("abv")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("abv")?.setFilterValue(event.target.value)}                
          />
          
      
          <Input className="max-w-xs" placeholder="pesoPrice filter..."
              value={(table.getColumn("pesoPrice")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("pesoPrice")?.setFilterValue(event.target.value)}                
          />
          
      
          <Input className="max-w-xs" placeholder="score filter..."
              value={(table.getColumn("score")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("score")?.setFilterValue(event.target.value)}                
          />
          
      
          <Input className="max-w-xs" placeholder="aromas filter..."
              value={(table.getColumn("aromas")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("aromas")?.setFilterValue(event.target.value)}                
          />
          
      
          <Input className="max-w-xs" placeholder="acidity filter..."
              value={(table.getColumn("acidity")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("acidity")?.setFilterValue(event.target.value)}                
          />
          
      
          <Input className="max-w-xs" placeholder="tannins filter..."
              value={(table.getColumn("tannins")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("tannins")?.setFilterValue(event.target.value)}                
          />
          
      
          <Input className="max-w-xs" placeholder="body filter..."
              value={(table.getColumn("body")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("body")?.setFilterValue(event.target.value)}                
          />
          
      
          <Input className="max-w-xs" placeholder="finish filter..."
              value={(table.getColumn("finish")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("finish")?.setFilterValue(event.target.value)}                
          />
          
      
          <Input className="max-w-xs" placeholder="potential filter..."
              value={(table.getColumn("potential")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("potential")?.setFilterValue(event.target.value)}                
          />
          
      
          <Input className="max-w-xs" placeholder="conclusion filter..."
              value={(table.getColumn("conclusion")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("conclusion")?.setFilterValue(event.target.value)}                
          />
          
        {/* {table.getColumn("role") && roles && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Rol"
            options={roles}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="w-4 h-4 ml-2" />
          </Button>
        )}
        <div className="flex-1 ">
          <DataTableViewOptions table={table}/>
        </div>
    </div>
  )
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  columnsOff?: string[]
  subject: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columnsOff,
  subject,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  React.useEffect(() => {
    columnsOff && columnsOff.forEach(colName => {
      table.getColumn(colName)?.toggleVisibility(false)      
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [])

  return (
    <div className="w-full space-y-4 dark:text-white">
      <DataTableToolbar table={table}/>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} subject={subject}/>
    </div>
  )
}
