export type Post = {
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  _embedded?: {
    'wp:featuredmedia': {
      alt_text: string
      media_details: {
        sizes: {
          full: {
            source_url: string
          }
        }
      }
    }[]
  }
}