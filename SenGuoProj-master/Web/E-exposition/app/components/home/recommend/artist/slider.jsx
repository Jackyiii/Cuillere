/**
 * Created by zhaojunbo on 2017/9/4.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Radium from "radium";
import Slider from 'react-slick';
import Person from "./person";

class PersonSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadSlider: false
    };
  }

  componentDidMount() {
    let self = this;

    this.timer = setTimeout(function () {
      let newState = self.state;
      newState.loadSlider = true;
      self.setState(newState);
    }, this.props.startTime);
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  renderSliderItems() {
    let sliderStyle = personSliderStyle.slider;
    sliderStyle["height"] = this.props.height + "px";

    return (
      this.props.personDataArray.map(function (item, index) {
        return (
          <div key={"personSlider_" + index} style={sliderStyle}>
            <Person
              personId={item.personId}
              personName={item.personName}
              personAbstract={item.personAbstract}
              imageUrl={item.imageUrl}
            />
          </div>
        )
      })
    )
  };

  render() {
    let settings = {
      dots: false,
      draggable: false,
      arrows: false,
      infinite: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 2500,
      pauseOnHover: false,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    let renderSliders = this.renderSliderItems();

    if (this.state.loadSlider) {
      return (
        <Slider style={personSliderStyle.base}
                {...settings}>
          {renderSliders}
        </Slider>
      )
    } else {
      return null;
    }
  }
}

let personSliderStyle = {
  base: {
    height: "100%",
    width: "100%"
  },
  slider: {
    width: "100%"
  }
};

PersonSlider.propTypes = {
  personDataArray: PropTypes.array,
  startTime: PropTypes.number,
  height: PropTypes.number
};

PersonSlider = Radium(PersonSlider);
export default PersonSlider;
