'use client'
import { SavingsFormOpenState } from "@acme/atoms"
import { GradientPicker, PopupButton, SavingsButton } from "@acme/ui"
import * as React from "react"
import { useRecoilState } from "recoil"
import { SavingsForm, SavingsTable } from "~/_components/nav"


export default function Savings() {
  const [formOpen, setFormOpen] = useRecoilState(SavingsFormOpenState)
  return (
    <div className="w-full dark">

      <SavingsButton formOpen={formOpen} setFormOpen={setFormOpen}>
        <SavingsForm />
      </SavingsButton>
      <SavingsTable />
    </div >
  )
}
