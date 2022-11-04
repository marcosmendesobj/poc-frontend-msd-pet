import { Post } from './types/Post'
import { ImageProps } from './types/Image'
import { sanitizeHTML } from './utils/sanitizeHTML'

export type HomeProps = {
  data: Post[]
}

export default function Home({ data }: HomeProps) {
  return (
    <div>
      {data.map(({ title, excerpt, _embedded }, index) => {
        const image: Partial<ImageProps> = {}

        if(_embedded) {
          const embed = _embedded['wp:featuredmedia'][0]

          image.source = embed.media_details.sizes.full.source_url
          image.alternativeText = embed.alt_text
          image.externalLink = sanitizeHTML(excerpt.rendered)
        }
        
        return (
          <div key={index}>
            <h1>{title.rendered}</h1>

            {_embedded &&
              <a href={image.externalLink} target="_blank" rel="noreferrer">
                <img
                  src={image.source!}
                  alt={image.alternativeText!}
                  style={{ width: 400, height: 400 }}
                />
              </a>
            }
          </div>  
        )
      })}
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:8080/wp-json/wp/v2/slides?_embed')
  const data = await res.json()

  return {
    props: {
      data
    },
  }
}