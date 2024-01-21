"use client";

import type { SetterOrUpdater } from "recoil";
import * as React from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "usehooks-ts";

import {
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@acme/ui";

export function BillsButton({
  children,
  formOpen,
  setFormOpen,
  text,
  height,
}: {
  children: JSX.Element;
  formOpen: boolean;
  setFormOpen: SetterOrUpdater<boolean>;
  text: string;
  height: number;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogTrigger asChild>
          <Button
            className={`h-${height} flex gap-2 rounded-3xl bg-purple font-bold`}
          >
            <FaPlus className="" />
            {text}
          </Button>
        </DialogTrigger>
        <DialogContent className="light min-w-[800px]">
          <DialogHeader>
            <DialogTitle>Add Bill</DialogTitle>
            <DialogDescription>
              Add a new transaction to your account.
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={formOpen} onOpenChange={setFormOpen}>
      <DrawerTrigger asChild>
        <Button
          className={`h-${height} flex gap-2 rounded-3xl bg-purple font-bold`}
        >
          <FaPlus className="" />
          {text}
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
  );
}
