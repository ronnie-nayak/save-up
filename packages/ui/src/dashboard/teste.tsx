import { motion } from "framer-motion"

export function Teste() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  return (
    <motion.ol
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.li variants={item} >lskdfj</motion.li>
      <motion.li variants={item} >sldkfj</motion.li>
    </motion.ol>
  )
}
