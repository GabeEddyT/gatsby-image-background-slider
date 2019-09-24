# gatsby-image-background-slider

> Lazy-loaded background images, with a simple fade transition between them, using `gatsby-image`. Inspired by `react-background-slider`, except for—well—the obvious.

[![NPM](https://img.shields.io/npm/v/gatsby-image-background-slider.svg)](https://www.npmjs.com/package/gatsby-image-background-slider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save gatsby-image-background-slider
```

## Usage

```jsx
import React from 'react'

import BackgroundSlider from 'gatsby-image-background-slider'

const Layout = ({ children }) => (
  <>
    <BackgroundSlider 
      query={useStaticQuery(graphql`
        query {
          backgrounds: allFile (filter: {sourceInstanceName: {eq: "backgrounds"}}){
            nodes {
              relativePath
              childImageSharp {
                fluid (maxWidth: 4000, quality: 100){
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      `)}
    />
  </>
)  
```

## License

MIT © [GabeEddyT](https://github.com/GabeEddyT)
