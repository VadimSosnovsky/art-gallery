import React from 'react'
import './Item.scss'
import { MAIN_URL } from '../../config'
import { motion } from 'framer-motion'
import defaultImage from '../../img/default.jpg'

function Item(props) {
  return (
    <motion.div
      className="item-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.6,
      }}
    >
      <img
        className="item-wrapper__image item-wrapper__image_default"
        src={MAIN_URL + props.painting.imageUrl}
        alt="not found"
        onError={({ target }) => {
          target.onError = null
          target.src = defaultImage
        }}
      />
      <div className="item-wrapper__description">
        <h4>{props.painting.name}</h4>
        {
          <p>
            Author: <span>{props.painting.authorName}</span>
          </p>
        }
        {
          <p>
            Created: <span>{props.painting.created}</span>
          </p>
        }
        {
          <p>
            Location: <span>{props.painting.locationName}</span>
          </p>
        }
      </div>
    </motion.div>
  )
}

export default Item
