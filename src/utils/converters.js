export function convertPaintings(paintings, authors, locations) {
  paintings = paintings.map((item) => {
    const author = authors.find((author) => author.id === item.authorId)
    const location = locations.find((location) => location.id === item.locationId)

    if (author) {
      item.authorName = author.name
    }

    if (location) {
      item.locationName = location.location
    }

    return item
  })

  return paintings
}

export function convertLocations(locations) {
  const convertedLocations = locations.map((item) => {
    return { id: item.id, name: item.location }
  })

  return convertedLocations
}

export function getConveredPaintings(paintingsByCurrentPage, allAuthors, allLocations) {
  paintingsByCurrentPage = convertPaintings(paintingsByCurrentPage, allAuthors, allLocations)
  const filteredPaintings = paintingsByCurrentPage
  return filteredPaintings
}

export function slicePaintingsArray(filteredPaintings, page, paintingsPerPage) {
  const lastIndex = page * paintingsPerPage
  const firstIndex = lastIndex - paintingsPerPage
  filteredPaintings = filteredPaintings.slice(firstIndex, lastIndex)
  return filteredPaintings
}