/**
 * Turns a display name into the key used across the data files
 * ("A.J. Greer" -> "aj-greer"). Lives outside the component tree so that
 * component files export only components, which React Fast Refresh requires.
 */
export const slugify = (name) =>
  name.toLowerCase().replace(/[.'’]/g, '').replace(/\s+/g, '-')
