/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { createGlobalStyle } from "styled-components"

import icomoonTTF from "../../static/fonts/icomoon/fonts/icomoon.ttf"
import icomoonWOFF from "../../static/fonts/icomoon/fonts/icomoon.woff"

import Header from "./nav/header"
import "./layout.css"

const GlobalStyle = createGlobalStyle`
  /*@import url('https://fonts.googleapis.com/css?family=Open+Sans|Playfair+Display:400,700');*/
  
  @font-face {
    font-family: icomoon;
    /*src: url(/src/fonts/fonts/icomoon/fonts/icomoon.eot?10si43);
    src: url(/src/fonts/icomoon/fonts/icomoon.eot?10si43#iefix)
        format("embedded-opentype"),*/
      src: url(${icomoonTTF}?10si43) format("truetype"),
      url(${icomoonWOFF}?10si43) format("woff");
      /*url(/src/fonts/icomoon/fonts/icomoon.svg?10si43#icomoon) format("svg");*/
    font-weight: 400;
    font-style: normal;
  }

  [class^="icon-"],
  [class*=" icon-"] {
    font-family: icomoon !important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  :after,
  :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          Â© {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
