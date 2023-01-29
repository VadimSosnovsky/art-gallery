import React from 'react'
import { Input, Range, Select } from 'fwt-internship-uikit'
import { AUTHOR, LOCATION } from '../../config'
import cross from '../../img/cross.svg'
import './Filter.scss'
import './UI.scss'

export default function Filter(props) {
  return (
    <div className="filter-wrapper">
      <div className="filter-wrapper__item filter-wrapper__item_font">
        <Input
          placeholder={props.placeholder}
          onChange={(e) => {
            props.setName(e.target.value)
          }}
          isDarkTheme={props.isDarkTheme}
        />
      </div>
      <div className="filter-wrapper__item filter-wrapper__item_font">
        <Select
          value={props.author}
          options={props.authors}
          isDarkTheme={props.isDarkTheme}
          onChange={(name) => {
            props.setAuthor(name)
          }}
        />
        {props.author !== AUTHOR ? (
          <img
            className="filter-wrapper__item_img"
            src={cross}
            alt="reset"
            onClick={() => {
              props.setAuthor(AUTHOR)
            }}
          />
        ) : null}
      </div>
      <div className="filter-wrapper__item filter-wrapper__item_font">
        <Select
          value={props.location}
          options={props.locations}
          isDarkTheme={props.isDarkTheme}
          onChange={(location) => {
            props.setLocation(location)
          }}
        />
        {props.location !== LOCATION ? (
          <img
            className="filter-wrapper__item_img"
            src={cross}
            alt="reset"
            onClick={() => {
              props.setLocation(LOCATION)
            }}
          />
        ) : null}
      </div>
      <div className="filter-wrapper__item filter-wrapper__item_font" ref={props.createdRange}>
        <Range isDarkTheme={props.isDarkTheme} onClose={Function.prototype}>
          <Input
            className="Range__Input Range__Input--white"
            type="number"
            placeholder="from"
            isDarkTheme={props.isDarkTheme}
            defaultValue={props.from}
            onChange={(e) => {
              props.setFrom(e.target.value)
            }}
          />
          <span className="painting__separator" />
          <Input
            className="Range__Input Range__Input--white"
            type="number"
            placeholder="before"
            isDarkTheme={props.isDarkTheme}
            defaultValue={props.before}
            onChange={(e) => {
              props.setBefore(e.target.value)
            }}
          />
        </Range>
      </div>
    </div>
  )
}
