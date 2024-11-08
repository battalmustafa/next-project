
import * as React from "react"
import { addDays, format, startOfDay, endOfDay, subDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Today } from "@mui/icons-material"
import { Label } from "../ui/label"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  dateRange: DateRange | undefined
  onDateRangeChange: (dateRange: DateRange | undefined) => void
}

export default function DateRangePicker({
  className,
  dateRange,
  onDateRangeChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleTodayClick = () => {
    const today = new Date()
    onDateRangeChange({
      from: startOfDay(subDays(today, 1)), // Yesterday
      to: endOfDay(addDays(today, 1)) // Tomorrow
    })
    setIsOpen(false)
  }

  const handleTomorrowClick = () => {
    const tomorrow = addDays(new Date(), 1)
    onDateRangeChange({
      from: startOfDay(new Date()), // Today
      to: endOfDay(addDays(tomorrow, 1)) // Tomorrow + 1 day
    })
    setIsOpen(false)
  }


  return (
    <div className={cn("grid gap-2", className)}>
        <Label htmlFor="date-range" className="text-sm text-textColor font-medium">
        Date Range
      </Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex justify-between p-2 border-b border-border">
            <Button variant="outline" size="sm" onClick={handleTodayClick}>Today</Button>
            <Button variant="outline" size="sm" onClick={handleTomorrowClick}>Tomorrow</Button>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}