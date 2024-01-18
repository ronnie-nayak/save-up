'use client'

import { BillsFormOpenState } from "@acme/atoms"
import { BillsButton, PopupButton } from "@acme/ui"
import * as React from "react"
import { useRecoilState } from "recoil"
import { BillsForm, BillsTable } from "~/_components/nav"

import { Button, Calendar, DialogClose, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch, cn } from "@acme/ui"
import { CalendarIcon } from "lucide-react"

export default function Bills() {
  const [formOpen, setFormOpen] = useRecoilState(BillsFormOpenState)
  return (
    <div className="w-full">
      <BillsButton formOpen={formOpen} setFormOpen={setFormOpen}>
        <BillsForm />
      </BillsButton>
      <BillsTable />
    </div>
  )
}
