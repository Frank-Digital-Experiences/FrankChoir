import { useEffect } from "react"
import { useRouter } from "next/router"
import styled from "styled-components"

const NotFound: React.FC = () => {
  const router = useRouter()

  return (
    <StyledDiv>
      <span>{"Hoppsan! Den sidan hittades inte."}</span>
      <span>{"Låt mig ta dig till startsidan. <3"}</span>
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
