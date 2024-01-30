import { useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"

const NotFound: React.FC = (songs) => {
  const router = useRouter()

  return (
    <StyledDiv>
      <span>frank choir</span>
      {Object.values(songs).map((song, i) => {
        const { slug, title } = song?.fields
        console.log(slug)

        return (
          <a key={i} href={"/" + slug}>
            {title}
          </a>
        )
      })}
    </StyledDiv>
  )
}

const StyledDiv = styled.section`
  display: grid;
  place-items: center;
  margin: 5rem auto;
  * {
    margin-bottom: 1rem;
  }
  h1 {
    font-size: 3em;
  }
  span {
    font-size: 2rem;
  }
`

export default NotFound
