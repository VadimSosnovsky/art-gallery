import React from 'react'
import { motion } from 'framer-motion'
import './Loader.scss'

const loaderVariants = {
  animationOne: {
    x: [-40, 40],
    y: [-40, 40],
    transition: {
      x: {
        repeat: Infinity,
        duration: 0.5,
      },
      y: {
        repeat: Infinity,
        duration: 0.25,
        ease: 'easeOut',
      },
    },
  },
}

export const Loader = () => {
  return (
    <>
      <motion.div className="loader" variants={loaderVariants} animate="animationOne"></motion.div>
    </>
  )
}
