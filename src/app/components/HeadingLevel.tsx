import React from 'react'

type HeadingLevelProps = {
  heading: string
  headingLevel: number | undefined
}

const HeadingLevel: React.FC<HeadingLevelProps> = ({ heading, headingLevel }) => {

  if(headingLevel === undefined) {
    return (
      <h4>
        {heading}
      </h4>
    )
  }
  else {
    switch (headingLevel) {
      case headingLevel = 1:
        return (
          <h1>
            {heading}
          </h1>
        )
      case headingLevel = 2:
        return (
          <h2>
            {heading}
          </h2>
        )
      case headingLevel = 3:
        return (
          <h3>
            {heading}
          </h3>
        )
    }
  }
}

export default HeadingLevel
