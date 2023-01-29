import api from './axios'
import { FROM, PAINTINGS_PER_PAGE } from '../config'

export const getParametersByName = async (name) => {
  try {
    const { data } = await api.get(name)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const getPaintingsByName = async (name) => {
  try {
    const { data } = await api.get(`/paintings?q=${name}`)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const getPaintingsByAuthorId = async (authorId) => {
  try {
    const { data } = await api.get(`/paintings?authorId=${authorId}`)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const getPaintingsByLocationId = async (locationId) => {
  try {
    const { data } = await api.get(`/paintings?locationId=${locationId}`)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const getPaintingsByRange = async (from, before) => {
  try {

    if (from === FROM) {
      from = ''
    }

    const { data } = await api.get(`/paintings?created_gte=${from}&created_lte=${before}`)

    return data
  } catch (error) {
    console.error(error)
  }
}

export const getPaintingsByPage = async (page) => {
  try {
    const { data } = await api.get(`/paintings?_page=${page}&_limit=${PAINTINGS_PER_PAGE}`)

    return data
  } catch (error) {
    console.error(error)
  }
}
