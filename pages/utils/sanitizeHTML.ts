import sanitize from 'sanitize-html'

export const sanitizeHTML = (value: string) =>
  sanitize(value, { allowedTags: [], allowedAttributes: {} })
