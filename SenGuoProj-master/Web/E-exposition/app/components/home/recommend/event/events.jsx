/**
 * Created by zhaojunbo on 2017/8/30.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Radium from "radium";
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import OneEvent from "./oneEvent.jsx";

class Events extends React.Component {
  renderOneSlider(sliderInex, oneSliderArray) {
    return (
      oneSliderArray.map(function (item, index) {

        if (index < 2) {
          return (
            <div key={"expEvent_" + sliderInex + "_" + index} style={expEventStyle.oneSlider}>
              <Link to={"event/" + item.eventId}>
                <div style={expEventStyle.eventImageAndInfo}>
                  <img style={expEventStyle.image} src={item.imageUrl} alt="" />
                </div>
                <div style={expEventStyle.eventImageAndInfo}>
                  <OneEvent
                    eventLeft={true}
                    eventTitle={item.eventTitle}
                    eventTime={item.eventTime}
                    eventPublisher={item.eventPublisher}
                    eventAbstract={item.eventAbstract}
                  />
                </div>
              </Link>
            </div>
          )
        } else if (index < 4) {
          return (
            <div key={"expEvent_" + sliderInex + "_" + index} style={expEventStyle.oneSlider}>
              <Link to={"event/" + item.eventId}>
                <div style={expEventStyle.eventImageAndInfo}>
                  <OneEvent
                    eventLeft={false}
                    eventTitle={item.eventTitle}
                    eventTime={item.eventTime}
                    eventPublisher={item.eventPublisher}
                    eventAbstract={item.eventAbstract}
                  />
                </div>
                <div style={expEventStyle.eventImageAndInfo}>
                  <img style={expEventStyle.image} src={item.imageUrl} alt="" />
                </div>
              </Link>
            </div>
          )
        } else {
          return null;
        }
      })
    )
  }

  renderSliders() {
    let sliderDataArray = [];
    let index = 0;

    for (index; index + 3 < this.props.list.length; index += 4) {
      let oneSlider = [];
      oneSlider.push(this.props.list[index]);
      oneSlider.push(this.props.list[index + 1]);
      oneSlider.push(this.props.list[index + 2]);
      oneSlider.push(this.props.list[index + 3]);

      sliderDataArray.push(oneSlider);
    }

    let lastSlider = [];
    for (index; index < this.props.list.length; index++) {
      lastSlider.push(this.props.testPosterData[index]);
    }

    if (sliderDataArray.count > 0) {
      sliderDataArray.push(lastSlider);
    }

    let self = this;

    return (

      sliderDataArray.map(function (item, index) {
        return (
          <div key={"expEvents_" + index}>
            {self.renderOneSlider(index, item)}
          </div>
        )
      })
    );
  }

  render() {
    let settings = {
      customPaging: function (index) { return <button><span /></button> },
      dots: true,
      draggable: false,
      dotsClass: 'slick-dots slick-thumb',
      fade: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2500,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div style={expEventStyle.base}>
        <div style={expEventStyle.title}>
          Events</div>
        <Slider style={expEventStyle.slider} {...settings}>
          {this.renderSliders()}
        </Slider>
      </div>
    );
  }
}

Events.propTypes = {
  list: PropTypes.array
};

let expEventStyle = {
  base: {
    width: "1080px",
    height: "560px",
    marginTop: "100px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  title: {
    width: "100%",
    height: "25px",
    lineHeight: "25px",
    fontSize: "20px",
    marginLeft: "130px"
  },
  slider: {
    width: "100%",
    marginTop: "40px"
  },
  oneSlider: {
    float: "left",
    width: "50%",
    height: "180px",
    marginTop: "25px",
    marginBottom: "25px"
  },
  eventImageAndInfo: {
    float: "left",
    width: "50%",
    height: "180px"
  },
  image: {
    width: "100%",
    height: "180px"
  }
};

Events = Radium(Events);

export default Events;
