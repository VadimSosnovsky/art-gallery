import React from 'react'
import { Pagination } from 'fwt-internship-uikit'
import { PAINTINGS_PER_PAGE } from '../../config'
import './Footer.scss'

export default function Footer(props) {
  return (
    <footer className="section-footer">
      <div>
        <Pagination
          className="Pagintaion"
          pagesAmount={Math.ceil(props.listLength / PAINTINGS_PER_PAGE)}
          currentPage={props.currentPage}
          isDarkTheme={props.isDarkTheme}
          onChange={(number) => {
            props.setPage(number)
          }}
        ></Pagination>
      </div>
    </footer>
  )
}
