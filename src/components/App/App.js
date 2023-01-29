import { useEffect, useRef, useState } from 'react'
import { replaceTitleByRef } from '../../auxiliary/auxiliary'
import { getPaintingsByName, getPaintingsByAuthorId, getPaintingsByLocationId, getPaintingsByPage, getParametersByName, getPaintingsByRange } from '../../api/api'
import { convertPaintings, convertLocations, getConveredPaintings, slicePaintingsArray } from '../../utils/converters'
import { PAINTINGS_PER_PAGE, NAME_PLACEHOLDER, AUTHOR, LOCATION, CREATED, FROM, BEFORE, DARK, WHITE, PAINTINGS, AUTHORS, LOCATIONS } from '../../config'
import Header from '../Header/Header'
import Filter from '../Filter/Filter'
import Items from '../Items/Items'
import Footer from '../Footer/Footer'
import './App.scss'
import { Loader } from '../../Loader/Loader'

export default function App() {

  const [listLength, setListLength] = useState()
  const [currentList, setCurrentPaintingsList] = useState([])

  const [theme, setTheme] = useState(DARK)
  const [authors, setAuthors] = useState([])
  const [locations, setLocations] = useState([])

  const [page, setPage] = useState(1)
  const [name, setName] = useState()
  const [author, setAuthor] = useState(AUTHOR)
  const [location, setLocation] = useState(LOCATION)
  const [from, setFrom] = useState(FROM)
  const [before, setBefore] = useState(BEFORE)

  const createdRange = useRef(null)

  const themeToggle = theme === DARK ? WHITE : DARK
  const isDarkTheme = theme === DARK ? true : false

  const changeTheme = () => {
    setTheme(themeToggle)
  }

  useEffect(() => {
    async function fetchItems() {

      const allPaintings = await getParametersByName(PAINTINGS)
      const allAuthors = await getParametersByName(AUTHORS)
      const allLocations = await getParametersByName(LOCATIONS)

      let paintingsByCurrentPage = []
      let filteredPaintings = []

      if (page) {
        paintingsByCurrentPage = await getPaintingsByPage(page)
      }

      paintingsByCurrentPage = convertPaintings(paintingsByCurrentPage, allAuthors, allLocations)
      const convertedLocations = convertLocations(allLocations)

      if (name) {
        paintingsByCurrentPage = await getPaintingsByName(name)
        filteredPaintings = getConveredPaintings(paintingsByCurrentPage, allAuthors, allLocations)
      }

      if (author !== AUTHOR) {
        const currentAuthor = allAuthors.find((item) => item.name === author)
        paintingsByCurrentPage = await getPaintingsByAuthorId(currentAuthor.id)
        filteredPaintings = getConveredPaintings(paintingsByCurrentPage, allAuthors, allLocations)
      }

      if (location !== LOCATION) {
        const currentLocation = allLocations.find((item) => item.location === location)
        paintingsByCurrentPage = await getPaintingsByLocationId(currentLocation.id)
        filteredPaintings = getConveredPaintings(paintingsByCurrentPage, allAuthors, allLocations)
      }

      if (from !== FROM || before !== BEFORE) {
        paintingsByCurrentPage = await getPaintingsByRange(from, before)
        filteredPaintings = getConveredPaintings(paintingsByCurrentPage, allAuthors, allLocations)
      }

      if (filteredPaintings.length !== 0) {
        setListLength(filteredPaintings.length)
        filteredPaintings = slicePaintingsArray(filteredPaintings, page, PAINTINGS_PER_PAGE)
        setCurrentPaintingsList(filteredPaintings)
      } else {
        setListLength(allPaintings.length)
        setCurrentPaintingsList(paintingsByCurrentPage)
      }

      setAuthors(allAuthors)
      setLocations(convertedLocations)
    }
    fetchItems()

    if (createdRange.current) {
      replaceTitleByRef(createdRange, '.Range__title', CREATED)
    }
  }, [page, name, author, location, from, before])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="wrapper">
      <Header
        changeTheme={changeTheme}
        theme={theme}
      />
      <Filter
        placeholder={NAME_PLACEHOLDER}
        authors={authors}
        locations={locations}
        createdRange={createdRange}
        isDarkTheme={isDarkTheme}
        author={author}
        location={location}
        from={from}
        before={before}
        setName={setName}
        setAuthor={setAuthor}
        setLocation={setLocation}
        setFrom={setFrom}
        setBefore={setBefore}
      />
      { currentList.length !== 0 ?
        <Items paintings={currentList} /> :
        <Loader />
      }
      <Footer
        currentPage={page}
        setPage={setPage}
        listLength={listLength}
        isDarkTheme={isDarkTheme}
      />
    </div>
  )
}
