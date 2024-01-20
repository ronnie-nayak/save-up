'use client'
import { useRecoilState } from "recoil"
import { SavingsFormOpenState } from "@acme/atoms"
import { GradientPicker, PopupButton, SavingsButton } from "@acme/ui"
import * as React from "react"
import { SavingsForm, SavingsTable } from "~/_components/nav"


export default function Savings() {
  const [formOpen, setFormOpen] = useRecoilState(SavingsFormOpenState)
  return (
    <div className="m-10 my-4 dark">
      <div className="h-14 flex gap-4 items-center p-10 mb-4 rounded-3xl bg-midnight">
        <h1 className="text-[1.5vw] ">Savings</h1>
        <SavingsButton height={12} text="Add Savings" formOpen={formOpen} setFormOpen={setFormOpen}>
          <SavingsForm />
        </SavingsButton>
      </div>
      <SavingsTable />
    </div >
  )
}
