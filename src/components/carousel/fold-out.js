import React from "react"
import AwesomeSlider from "react-awesome-slider"
//import AwsSliderStyles from "./fold-out.scss"
import AwsSliderStyles from "react-awesome-slider/src/styles"

import hero1 from "/sandbox/static/img/hero_1.jpg"

console.log("styles", JSON.stringify(AwsSliderStyles))
console.log("AwesomeSlider is", AwesomeSlider)


export default function FoldOutAnimation(props) {
  return (
    <AwesomeSlider cssModules={AwsSliderStyles}>
      <div data-src={hero1} />
    </AwesomeSlider>
  )
}
