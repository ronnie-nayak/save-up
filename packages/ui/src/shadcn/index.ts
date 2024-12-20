import type { CxOptions } from "class-variance-authority";
import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

function cn(...inputs: CxOptions) {
  return twMerge(cx(inputs));
}

export { cn };

export * from "./aspect-ratio";
export * from "./separator";
export * from "./table";
export * from "./dropdown-menu";
export * from "./button";
export * from "./input";
export * from "./checkbox";
export * from "./form";
export * from "./select";
export * from "./drawer";
export * from "./dialog";
export * from "./switch";
export * from "./label";
export * from "./calendar";
export * from "./popover";
export * from "./sheet";
export * from "./tabs";
export * from "./colorPicker";
export * from "./badge";
export * from "./card";
export * from "./sonner";
