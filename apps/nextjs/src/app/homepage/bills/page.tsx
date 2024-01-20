'use client'

import { BillsFormOpenState } from "@acme/atoms"
import { BillsButton, PopupButton } from "@acme/ui"
import * as React from "react"
import { useRecoilState } from "recoil"
import { BillsForm, BillsTable } from "~/_components/nav"


export default function Bills() {
  const [formOpen, setFormOpen] = useRecoilState(BillsFormOpenState)
  return (
    <div className="m-10 my-4">
      <div className="h-14 flex gap-4 items-center p-10 mb-4 rounded-3xl bg-midnight">
        <h1 className="text-[1.5vw] ">Bills</h1>
        <BillsButton height={12} text="Add Bills" formOpen={formOpen} setFormOpen={setFormOpen}>
          <BillsForm />
        </BillsButton>
      </div>
      <BillsTable />
    </div>
  )
}
