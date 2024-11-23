"use client";

import * as React from "react";
import { useRecoilState } from "recoil";

import { SavingsFormOpenState } from "@acme/atoms";
import { GradientPicker, PopupButton, SavingsButton } from "@acme/ui";

import { SavingsForm, SavingsTable } from "~/_components/nav";

export default function Savings() {
  const [formOpen, setFormOpen] = useRecoilState(SavingsFormOpenState);
  return (
    <div className="dark m-10 my-4">
      <div className="mb-4 flex h-14 items-center gap-4 rounded-3xl bg-midnight p-10">
        <h1 className="sm:text-[1.5vw] ">Goals</h1>
        <SavingsButton
          height={12}
          text="Add Savings"
          formOpen={formOpen}
          setFormOpen={setFormOpen}
        >
          <SavingsForm />
        </SavingsButton>
      </div>
      <SavingsTable />
    </div>
  );
}
