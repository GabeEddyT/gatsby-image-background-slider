import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import BackgroundSlider from "gatsby-image-background-slider"

const Dim = ({dim = .35, z=-2}) => (
  <div
    style={{
      background:`linear-gradient(rgba(31, 31, 31, ${dim}), rgba(31, 31, 31, ${dim}))`, 
      width: "100%", height: "100%",       
      backgroundSize: "cover", 
      position: "absolute", top: 0, zIndex: z,
    }}
  ></div>
)

const SecondPage = () => (
  <>
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
          Customized
        </h2>
        <br/>        
      </div>  
    </Layout>
    <div style={{position: "absolute", right: 20, bottom: 20}}><Link to="/">Go back to the homepage</Link></div>
    
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
      initDelay={2}
      transition={4}
      duration={8}
      images={["like xbox.jpg", "disciples of doom.jpg", "kittens.jpg", "still miss them.jpg", "glint.jpg", "what some call sadism.jpg"]}        
      /* style={{
        transform: "rotate(-2deg) scale(.9)",
      }} */
    >
      {/* Captions: */}
      <div style={{color: "white", position: "absolute", top:20, left:20}}>Gotta get that gamerscore... over corpses</div>
      <div style={{color: "white", position: "absolute", top:20, right:20}}>Doom is one way to put it</div>
      <div style={{color: "white", position: "absolute", top:50, left:20}}>Those kittens...</div>
      <div style={{color: "white", position: "absolute", top:"50%", textAlign:"center", fontSize:50, width:"100%"}}><a href="https://www.aspca.org/">... 😿</a></div>
      <>{/* No caption necessary */}</>
      <div style={{color: "white", position: "absolute", top:"20%", right:"10%", transform: "rotate(-45deg)", fontSize:"20pt", fontFamily:"monospace"}}><a href="https://www.reddit.com/r/valve/comments/8zmp07/former_valve_employee_tweets_his_experience_at/e2kbsg6/?st=k29ubj4u&sh=9a3bb3c9">There's no sadism like game dev</a></div>
    </BackgroundSlider>
    
    <Dim/>
    {/* <Dim z={-11} dim={1}/> */}
  </>
)

export default SecondPage
