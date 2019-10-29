import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import BackgroundSlider from "gatsby-image-background-slider"
import Layout from "../components/layout"
import Image from "../components/image"

const Dim = () => (
  <div
    style={{
      background:'linear-gradient(rgba(31, 31, 31, .35), rgba(31, 31, 31, .35))', 
      width: "100%", height: "100%", 
      backgroundSize: "cover", 
      position: "absolute", top: 0, zIndex: -2,
    }}
  ></div>
)

const IndexPage = () => (
  <Layout>  
    <div style={{
      position: "absolute",
      left: 0, right: 0,
      width: "50%",
      margin: "0 auto",
      textAlign: "center",
      paddingTop: "200px",
    }}>
      <h2 style={{fontSize: "40pt"}}>
        Default Settings
      </h2>
      <br/>
      <div><Link to="/page-2/">Customized slider</Link></div>
    </div>  
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
    <Dim/>     
  </Layout>
)

export default IndexPage
