import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import BackgroundSlider from "gatsby-image-background-slider"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    {/* <SEO title="Home" /> */}
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
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
    />
  </Layout>
)

export default IndexPage
