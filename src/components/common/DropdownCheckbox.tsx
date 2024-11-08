import * as React from "react"
import { ChevronDown, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"

interface AppearanceOption {
  id: string
  label: string
}

type DropdownCheckBoxProps = {
  label: string
  options: AppearanceOption[]
  selectedOptions: string[]
  onSelect: (selected: string[]) => void
}

export default function DropdownCheckBox({
  label,
  options,
  selectedOptions,
  onSelect,
}: DropdownCheckBoxProps) {
  const toggleOption = (id: string) => {
    const updatedSelectedOptions = selectedOptions.includes(id)
      ? selectedOptions.filter((item) => item !== id)
      : [...selectedOptions, id]
    onSelect(updatedSelectedOptions)
  }

const removeBadge = (id: string, e: React.MouseEvent) => {
  e.stopPropagation(); 
  toggleOption(id);
};

  return (
    <div className={cn("grid gap-2")}>
      <Label className="text-sm text-textColor font-medium">
        {label}
      </Label>
      <DropdownMenu>
       
          <Button variant="outline" className="h-auto py-2">
            {selectedOptions.length > 0 && (
              <div className="flex flex-wrap gap-1 mr-2">
                {selectedOptions.map((id) => {
                  const option = options.find((opt) => opt.id === id)
                  return (
                   
                    <span
                      key={id}
                      className="text-xs py-0.5 px-1 text-center items-center flex rounded-md border-badgetext text-badgetext bg-baggebg hover:none"
                    >
                      {option?.label}
                      <button
                        className="ml-1 text-badgetext rounded-full"
                        onClick={(e) => removeBadge(id, e)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>

                  )
                })}
              </div>
            )} <DropdownMenuTrigger >
            <ChevronDown className="h-4 w-4 opacity-50" />

</DropdownMenuTrigger>
          </Button>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{label} Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.id}
              checked={selectedOptions.includes(option.id)}
              onCheckedChange={() => toggleOption(option.id)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
