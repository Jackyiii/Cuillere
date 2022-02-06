/**
 * Created by zhaojunbo on 2017/8/30.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Radium from "radium";
import PropTypes from 'prop-types';
import Slider from 'react-slick';

class Poster extends React.Component {
  renderSliders () {
    let list = this.props.list;
    return (
      list.map((item, index) => {
        let nextIndex = (index + 1) % list.length;
        let nextItem = list[nextIndex];
        return (
          <div key={"posterImage_" + index}>
            <Link to={"/exhibition/global/" + item.expId}>
              <img style={posterStyle.image} src={item.imageUrl}/>
            </Link>

            <div>
              <img style={posterStyle.shadedImage} src={nextItem.imageUrl}/>
              <div style={posterStyle.shade} onClick={() => {this.slider.slickNext()}}/>

              <div style={posterStyle.darkerShade}>
                <div style={posterStyle.floatText}>{
                  nextItem.motto.match(/[^\r\n]+/g).map((line, i) => {
                    return (
                      <div key={"posterMotto_" + nextIndex + "_" + i}>{line}<br/></div>
                    )
                  })}
                </div>

                <div style={posterStyle.footer}>
                  {"0" + (nextIndex + 1) + "."}
                </div>
              </div>
            </div>
          </div>
        )
      })
    );
  }

  render () {
    let settings = {
      customPaging: function (index) { return <button><span/></button> },
      dots: true,
      draggable: false,
      dotsClass: 'slick-dots slick-thumb',
      fade: true,
      infinite: true,
      speed: 1500,
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div style={posterStyle.base}>
        <div style={posterStyle.base}>
          <Slider ref={c => {this.slider = c}} style={posterStyle.slider} {...settings}>
            {this.renderSliders()}
          </Slider>
        </div>
        <div style={posterStyle.motto}>
          <div style={posterStyle.mottoText}> {this.props.mainMotto} </div>
          <div style={posterStyle.mottoText}> {this.props.subMotto} </div>
        </div>
      </div>
    );
  }
}

Poster.propTypes = {
  list: PropTypes.array,
  mainMotto: PropTypes.string,
  subMotto: PropTypes.string
};

let posterStyle = {
  base: {
    position: "relative",  // dummy
  },
  slider: {
    width: "100%",
    height: "344px"
  },
  motto: {
    height: "60px",
    lineHeight: "30px",
    marginTop: "50px",
    marginBottom: "80px"
  },
  mottoText: {
    height: "30px",
    textAlign: "center"
  },
  image: {
    float: "left",
    width: "50%",
    height: "344px"
  },
  shadedImage: {
    float: "left",
    width: "50%",
    height: "344px",
  },
  shade: {
    cursor: "pointer",
    position: "absolute",
    top: "0px",
    left: "50%",
    zIndex: "10",
    width: "50%",
    height: "344px",
    backgroundColor: "#000000",
    opacity: "0.8",
  },
  darkerShade: {
    zIndex: "20",
    position: "absolute",
    left: "50%",
    top: "0",
    width: "25%",
    height: "344px",
    backgroundColor: "#000000",
    textAlign: "left"
  },
  floatText: {
    color: "#ffffff",
    display: "inline-block",
    fontFamily: "BanglaMN",
    fontSize: "22px",
    paddingTop: "30%",
    paddingLeft: "50px"
  },
  footer: {
    position: "absolute",
    fontFamily: "Avenir-Black",
    fontSize: "31px",
    color: "#FFFFFF",

    left: "33px",
    bottom: "22px"
  }
};

Poster = Radium(Poster);

export default Poster;
