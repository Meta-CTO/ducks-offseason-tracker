import { createContext, useContext } from 'react'

/**
 * The editorial module for the club currently on screen. Components used to
 * import the Ducks data file directly, which only worked while there was
 * exactly one club; they now read whichever club is being rendered from here.
 *
 * Only ever provided with a loaded module, so consumers can use it without
 * null checks — the loading and error states live in App.
 */
export const EditorialContext = createContext(null)

export const useEditorial = () => {
  const value = useContext(EditorialContext)
  if (!value) {
    throw new Error('useEditorial must be used inside an EditorialContext')
  }
  return value
}
