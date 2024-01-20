'use client'
import { FaPlus } from "react-icons/fa";
import * as React from "react"
import Link from 'next/link'
import { cn } from "@acme/ui"
import { useMediaQuery } from 'usehooks-ts'
import { Button } from "@acme/ui"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@acme/ui"
import { SetterOrUpdater, useRecoilState } from "recoil";

export function PopupButton({ children, formOpen, setFormOpen }: { children: JSX.Element, formOpen: boolean, setFormOpen: SetterOrUpdater<boolean> }) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={formOpen} onOpenChange={setFormOpen} >
        <DialogTrigger asChild>
          <Button className="h-12 rounded-3xl bg-purple flex gap-2 font-bold">
            <FaPlus className="" />
            Add Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className=" light">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Add a new transaction to your account.
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={formOpen} onOpenChange={setFormOpen}>
      <DrawerTrigger asChild>
        <Button className="h-12 rounded-3xl bg-purple flex gap-2 font-bold">
          <FaPlus className="" />
          Add Transaction
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Add a new transaction to your account.
          </DialogDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}


