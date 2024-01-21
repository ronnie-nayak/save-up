"use client";

import * as React from "react";
import { useRecoilState } from "recoil";

import { BillsFormOpenState } from "@acme/atoms";
import { BillsButton, PopupButton } from "@acme/ui";

import { BillsForm, BillsTable } from "~/_components/nav";

export default function Bills() {
  const [formOpen, setFormOpen] = useRecoilState(BillsFormOpenState);
  return (
    <div className="m-10 my-4">
      <div className="mb-4 flex h-14 items-center gap-4 rounded-3xl bg-midnight p-10">
        <h1 className="sm:text-[1.5vw] ">Bills</h1>
        <BillsButton
          height={12}
          text="Add Bills"
          formOpen={formOpen}
          setFormOpen={setFormOpen}
        >
          <BillsForm />
        </BillsButton>
      </div>
      <BillsTable />
    </div>
  );
}
