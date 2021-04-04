# gatsby-image-background-slider

> Lazy-loaded background images, with a simple fade transition between them, using [`gatsby-plugin-image`](https://www.npmjs.com/package/gatsby-image). Inspired by [`react-background-slider`](https://www.npmjs.com/package/react-background-slider), except for—well—the obvious.

[![NPM](https://img.shields.io/npm/v/gatsby-image-background-slider.svg)](https://www.npmjs.com/package/gatsby-image-background-slider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Why?

I wanted to have a nice, simple slideshow of high-resolution background images. I also didn't want to lock the main thread with ugly chunks of said images. Thus, I resorted to making the best reinvention of the wheel I could muster for a background image slideshow with lazy-loading.

## Install

```bash
npm install --save gatsby-image-background-slider
```

## Usage

### Quick unordered background slider
> component file (i.e. layout.js)
```jsx
import React from 'react'

import BackgroundSlider from 'gatsby-image-background-slider'

const Layout = ({ children }) => (
  <>
    <main>{children}</main>
    <BackgroundSlider 
      query={useStaticQuery(graphql`
        query {
          backgrounds: allFile (filter: {sourceInstanceName: {eq: "backgrounds"}}){
            nodes {
              relativePath
              childImageSharp {
                gatsbyImageData(width: 4000, quality: 100)
              }
            }
          }
        }
      `)}
    />
  </>
)  
```
> gatsby-config.js
```js
plugins: [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `backgrounds`,
      path: `${__dirname}/src/bg`, // wherever background images are stored
    },
  }
]
```

### Configured background slider
> component file (i.e. layout.js)
```jsx
import React from 'react'

import BackgroundSlider from 'gatsby-image-background-slider'

const Layout = ({ children }) => (
  <>
    <main>{children}</main>
    <BackgroundSlider 
      query={useStaticQuery(graphql`
        query {
          backgrounds: allFile (filter: {sourceInstanceName: {eq: "backgrounds"}}){
            nodes {
              relativePath
              childImageSharp {
                gatsbyImageData(width: 4000, quality: 100)
              }
            }
          }
        }
      `)}
      initDelay={2} // delay before the first transition (if left at 0, the first image will be skipped initially)
      transition={4} // transition duration between images
      duration={8} // how long an image is shown
      // specify images to include (and their order) according to `relativePath`
      images={["dog.jpg", "cat.jpg", "giraffe.jpg", "tasmanian devil.jpg", "gabe.jpg"]} 

      // pass down standard element props
      style={{
        transform: "rotate(-2deg) scale(.9)",
      }}           
    > 
      {/* Captions in sync with background images*/}
      <div>Woof</div>
      <div>Meow</div>
      <>{/* Giraffes don't talk; [they aren't real](https://chivomengro.com/2017/10/23/the-truth-comes-out-giraffes-are-a-hoax/) */}</>
      <a href="https://en.wikipedia.org/wiki/Tasmanian_devil#Conservation_status">
        I could use a hand
      </a>
      <div>I need to find better hobbies</div>
    </BackgroundSlider>
  </>
)  
```
> gatsby-config.js
```js
plugins: [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `backgrounds`,
      path: `${__dirname}/src/bg`, // wherever background images are stored
    },
  }
]
```

## License

MIT © [GabeEddyT](https://github.com/GabeEddyT)
