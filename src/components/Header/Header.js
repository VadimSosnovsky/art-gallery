import React from 'react'
import logo from '../../img/logo.svg'
import { HiSun } from 'react-icons/hi'
import './Header.scss'

export default function Header(props) {
  return (
    <header className="section-header">
      <div className="section-header-wrapper">
        <img className="section-header-wrapper__logo" src={logo} alt="not found" />
        <HiSun className="section-header-wrapper__theme_hover" color={props.theme === 'dark' ? '#fff' : '#000'} onClick={props.changeTheme} />
      </div>
    </header>
  )
}
