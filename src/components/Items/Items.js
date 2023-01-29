import React from 'react'
import Item from '../Item/Item'
import './Items.scss'

function Items(props) {
  return (
    <main className="section-main">
      <div className="section-main-wrapper">
        {props.paintings.map((painting) => (
          <Item key={painting.id} painting={painting} />
        ))}
      </div>
    </main>
  )
}

export default Items
