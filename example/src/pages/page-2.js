import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BackgroundSlider from "gatsby-image-background-slider"

const SecondPage = () => (
  <>
    <Layout>
      {/* <SEO title="Page two" /> */}
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
    <BackgroundSlider 
      query={useStaticQuery(graphql`
          query {
              backgrounds: allFile (filter: {sourceInstanceName: {eq: "backgrounds"}}){      
                  nodes{
                      relativePath
                      childImageSharp {
                          fluid(maxWidth: 4000, quality: 100) {
                              ...GatsbyImageSharpFluid_withWebp_noBase64
                          } 
                      }
                  }      
              }
          }
      `)}
      initDelay={6}
      transition={1}
      duration={6}
      images={["like xbox.jpg", "disciples of doom.jpg", "kittens.jpg", "still miss them.jpg", "what some call sadism.jpg", "glint.jpg"]}
      backgroundColor={"whitesmoke"}    
    >
    </BackgroundSlider>
  </>
)

export default SecondPage
