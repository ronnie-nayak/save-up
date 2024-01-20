"use client"
import { PopupButton } from "@acme/ui";
import { useRecoilState } from "recoil";
import { FormOpenState } from '@acme/atoms'
import { MoneyForm } from ".";
import { motion } from "framer-motion";
import { GetMoneyType } from "@acme/validators";
import { selectTransactionType } from "@acme/db";

export function History({ localData }: { localData: GetMoneyType[] | undefined }) {

  const [formOpen, setFormOpen] = useRecoilState(FormOpenState)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0 }
  }

  return (
    <div className="w-8/12 bg-midnight rounded-3xl p-8 h-max">
      <h1 className="text-[1.5vw] mb-4">Add Transaction</h1>
      <PopupButton formOpen={formOpen} setFormOpen={setFormOpen}>
        <MoneyForm />
      </PopupButton>


      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
      >
        {!localData || localData.length === 0 ? <div>no items transaction</div> :
          (localData.map((row) => (
            <motion.div key={row.id} className="flex text-[1vw] m-3 my-5 gap-4 justify-center items-center"
              variants={item}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30

              }}
            >
              <div className="w-10 h-10">
                {(row.type === "income") ? (

                  <svg
                    fill="none"
                    stroke="green"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    width="100%" height="100%" preserveAspectRatio="none"
                  >
                    <path d="M23 6l-9.5 9.5-5-5L1 18" />
                    <path d="M17 6h6v6" />
                  </svg>
                ) : (row.type === "expense") ? (

                  <svg
                    fill="none"
                    stroke="red"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    width="100%" height="100%" preserveAspectRatio="none"
                  >
                    <path d="M23 18l-9.5-9.5-5 5L1 6" />
                    <path d="M17 18h6v-6" />
                  </svg>
                ) : (
                  <svg
                    fill="none"
                    stroke="orange"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    width="100%" height="100%" preserveAspectRatio="none"
                  >
                    <path d="M22 12l-4-4v3H3v2h15v3l4-4z" />
                  </svg>
                )
                }
              </div>
              <div className="w-4/12">
                <h2 className="pb-1 text-[1.25vw]">{row.title}</h2>
                <h3 className="text-[1vw] text-gray-500">{row.category}</h3>
              </div>
              <h2 className="w-4/12 text-base">{row.createdAt.toDateString()}</h2>
              <h2 className="w-2/12 text-[1.25vw]">{row.type === "expense" && "-"}${row.amount}</h2>
            </motion.div >
          ))).slice(0, 10)}
      </motion.section>
    </div >
  )
}
