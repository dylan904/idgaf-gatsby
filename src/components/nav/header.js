import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.css"
import "./header-dt.css"
import "./header-mob.css"
//import console = require("console");

const pageData = [
  { link: "", title: "Home" },
  {
    link: "classes/",
    title: "Yoga Classes",
    more: [
      { link: "classes/", title: "Yoga Dances" },
      { link: "classes/", title: "Bare Workout" },
      { link: "classes/", title: "Peace of Mind" },
      {
        link: "classes/",
        title: "More",
        more: [
          { link: "classes/", title: "Yoga Dances" },
          { link: "classes/", title: "Bare Workout" },
          { link: "classes/", title: "Peace of Mind" },
        ],
      },
    ],
  },
  { link: "events/", title: "Events" },
  { link: "about/", title: "About Studio" },
  { link: "contact/", title: "Contact" },
]

class Header extends React.Component {
  constructor(props) {
    console.log("constructedd")
    super(props)
    this.state = {
      isDT: (typeof window !== 'undefined') ? window.innerWidth >= 992 : false,
      showMenuDT: false,
      showMenuMob: false,
      pagePath: (typeof window !== 'undefined') ? window.location.pathname : "/",
    }
    this.toggleNavMob = this.toggleNavMob.bind(this)
  }

  componentWillUnount() {
    console.log("will unmount")
    if (typeof window !== 'undefined') {
      window.onscroll = null
    }
  }

  componentDidMount() {
    console.log("mounted")
    if (typeof window !== 'undefined') {
      window.onscroll = () => this.handleScroll()
      window.onresize = () => this.handleResize()
    }

    /*this.setState({
      pagePath: window.location.pathname,
    })*/
  }

  handleResize() {
    let isDT = this.state.isDT,
      winWidth = (typeof window !== 'undefined') ? window.innerWidth : 0

    if ((!isDT && winWidth >= 992) || (isDT && winWidth < 992)) {
      this.setState({
        isDT: !isDT,
      })
    }
  }

  handleScroll() {
    let showMenuDT = this.state.showMenuDT,
      scrollY = (typeof window !== 'undefined') ? window.scrollY : 0

    if ((!showMenuDT && scrollY > 100) || (showMenuDT && scrollY < 100)) {
      console.log("scroll", this.state)
      this.setState({
        showMenuDT: !showMenuDT,
      })
    }
  }

  toggleNavMob() {
    console.log("toggle mob", this.state.showMenuMob)
    this.setState({
      showMenuMob: !this.state.showMenuMob,
    })
  }

  mapNavDT(pageData) {
    console.log("DT", (typeof window !== 'undefined') ? window.location.pathname : "NO WINDOW")
    return pageData.map((page, i) => {
      if (page.more)
        return (
          <li
            key={i}
            className={
              "has-children " +
              ((typeof window !== 'undefined') && "/" + page.link === window.location.pathname) ? "active" : ""
            }
          >
            <Link to={`/${page.link}`}>{page.title}</Link>
            <ul className="dropdown">{this.mapNavDT(page.more)}</ul>
          </li>
        )
      else {
        return (
          <li
            key={i}
            className={
              ((typeof window !== 'undefined') && "/" + page.link === window.location.pathname) ? "active" : ""
            }
          >
            <Link to={`/${page.link}`}>{page.title}</Link>
          </li>
        )
      }
    })
  }

  mapNavMob(pageData) {
    console.log("Mob", (typeof window !== 'undefined') ? window.location.pathname : "NO WINDOW")
    return pageData.map((page, i) => {
      if (page.more)
        return (
          <li
            key={i}
            className={
              "has-children " +
              ((typeof window !== 'undefined') && "/" + page.link === window.location.pathname) ? "active" : ""
            }
          >
            <span className="arrow-collapse collapsed" data-toggle="collapse" />
            <Link to={`/${page.link}`}>{page.title}</Link>
            <ul className="collapse">{this.mapNavMob(page.more)}</ul>
          </li>
        )
      else {
        return (
          <li
            key={i}
            className={
              ((typeof window !== 'undefined') && "/" + page.link === window.location.pathname) ? "active" : ""
            }
          >
            <Link to={`/${page.link}`}>{page.title}</Link>
          </li>
        )
      }
    })
  }

  render() {
    console.log("rendered")
    const { siteTitle } = this.props
    return (
      <header>
        <div
          className={
            "site-mobile-menu" +
            (this.state.showMenuMob ? " offcanvas-menu" : "")
          }
        >
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close">
              <span
                className="icon-close2 js-menu-toggle"
                onClick={this.toggleNavMob}
              />
            </div>
          </div>
          <div className="site-mobile-menu-body">
            <ul className="site-nav-wrap">{this.mapNavMob(pageData)}</ul>
          </div>
        </div>

        <div
          className={
            "site-navbar-wrap " + (this.state.showMenuDT ? "scrolled" : "")
          }
        >
          <div className="container row align-items-center">
            <div className="col-2">
              <h2 className="mb-0 site-logo">
                <Link to="/">{siteTitle}</Link>
              </h2>
            </div>

            <div className="col-10">
              <nav className="site-navigation" role="navigation">
                <div className="container">
                  <div className="site-menu-wrap d-lg-none">
                    <Link
                      to={`${ typeof window !== 'undefined' && window.location.pathname }#`}
                      className="site-menu-toggle js-menu-toggle"
                      onClick={this.toggleNavMob}
                    >
                      <span className="icon-menu h3" />
                    </Link>
                  </div>
                  <ul className="site-menu js-clone-nav d-none d-lg-block">
                    {this.mapNavDT(pageData)}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `Yoga Life`,
}

export default Header
