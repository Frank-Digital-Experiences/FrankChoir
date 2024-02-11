"use client"

import { createClient } from "contentful"
import { GetStaticProps } from "next"
import type { AppProps } from "next/app"

import Head from "next/head"

import styled from "styled-components"

function Home() {
  return (
    <StyledBody>
      <h2>songs</h2>
      <a href="/l">Down to the river</a>

      <a href="/case-thefarm">/case-thefarm</a>
    </StyledBody>
  )
}

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    margin-bottom: 1rem;
  }
`
export default Home
