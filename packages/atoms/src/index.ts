import { atom } from "recoil";

export const FormOpenState = atom({
  key: "FormOpenState",
  default: false,
});

export const SavingsFormOpenState = atom({
  key: "SavingsFormOpenState",
  default: false,
});

export const BillsFormOpenState = atom({
  key: "BillsFormOpenState",
  default: false,
});

export const SidebarOpenState = atom({
  key: "SidebarOpenState",
  default: false,
});

export const CategoriesListState = atom({
  key: "CategoriesListState",
  default: [
    "Salary",
    "Food",
    "Rent",
    "Shopping",
    "Entertainment",
    "Transport",
    "Utilities",
    "Healthcare",
    "Education",
    "Others",
  ],
});
