/**
 * Created by zhaojunbo on 2017/9/1.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Radium from "radium";
import Slider from 'react-slick';

class IndividualExhibition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currSlickIndex: 0
    }
  }

  handleItemClick(index) {
    let newState = {};
    newState.currSlickIndex = index;
    this.setState(newState);

    this.refs.individualExhibition.slickGoTo(index);
  }

  handleReadMore() {
  }

  renderSliders() {
    return (
      this.props.list.map(function (item, index) {
        return (
          <div key={"psersonalShow_" + index}>
            <Link to={"/exhibition/individual/" + item.expId}>
              <img style={individualExhibitionStyle.sliderImage} src={item.imageUrl} />
            </Link>
          </div>
        )
      })
    );
  }

  renderNavImages() {
    let self = this;
    return (

      this.props.list.map(function (item, index) {

        if (index >= 8) {
          return null;
        } else {
          return (
            <div key={"renderNavImages_" + index} style={individualExhibitionStyle.imageItem} onMouseEnter={(event) => { self.handleItemClick(index) }}>
              <img key={"renderNavImage_" + index} style={individualExhibitionStyle.navImage} src={self.props.list[index].imageUrl} alt="" />
            </div>
          )
        }
      })
    );
  }

  renderAbstract() {
    let index = this.state.currSlickIndex;
    let abstract = "";

    if (this.props.list &&
      this.props.list.length > index &&
      this.props.list[index].abstract
    ) {
      abstract = this.props.list[index].abstract;
    }

    return (
      <div style={individualExhibitionStyle.abstract}>
        {abstract}
      </div>
    );
  }

  render() {
    var settings = {
      dots: false,
      draggable: false,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div>
        <div style={individualExhibitionStyle.base}>
          <Slider ref="individualExhibition" {...settings}>
            {this.renderSliders()}
          </Slider>
        </div>
        <div style={individualExhibitionStyle.base}>
          <div style={individualExhibitionStyle.content}>
            <div style={individualExhibitionStyle.title}>
              PERSONAL EXHIBITION
                        </div>
            <div style={individualExhibitionStyle.abstractWrapper}>
              <div style={individualExhibitionStyle.abstract}>
                {this.props.mainMotto}
              </div>
            </div>

            <Link to={"/exhibitions/individual"} style={individualExhibitionStyle.readMore}>
              <text style={individualExhibitionStyle.readMoreText}>
                Read More </text>
            </Link>
            <div style={individualExhibitionStyle.imageArray}>
              {this.renderNavImages()}
            </div>
          </div>
        </div>
        <div style={individualExhibitionStyle.clearFloat} />
      </div>
    )
  }
}

IndividualExhibition.propTypes = {
  mainMotto: PropTypes.string,
  list: PropTypes.array,
};

let individualExhibitionStyle = {
  base: {
    float: "left",
    width: "50%",
    height: "500px"
  },
  content: {
    height: "425px",
    width: "400px",
    marginLeft: "60px",
    marginTop: "70px"
  },
  title: {
    height: "30px"
  },
  abstractWrapper: {
    height: "80px",
    marginTop: "60px",
    borderLeft: "20px solid #8895a5"
  },
  abstract: {
    height: "80px",
    marginLeft: "20px",
    lineHeight: "16px",
    color: "#8895a5"
  },
  readMore: {
    height: "20px",
    lineHeight: "20px",
    marginTop: "25px",
    marginLeft: "40px",
    cursor: "pointer",
    userSelect: "none",
    textDecoration: "none"
  },
  readMoreText: {
    cursor: "pointer",
    borderBottom: "2px solid #8895a5",
    transition: "all 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",
    color: "#8895a5",

    ':hover': {
      color: "#303030",
      borderBottom: "2px solid #303030",
    },

    ':active': {
      color: "#1b1b1b",
      borderBottom: "2px solid #1b1b1b",
    }
  },
  imageArray: {
    height: "62px",
    width: "450px",
    marginTop: "40px"
  },
  imageItem: {
    float: "left",
    height: "60px",
    width: "80px",
    marginRight: "25px",
    marginTop: "25px",
    border: "1px solid #ffffff",
    transition: "all 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ':hover': {
      border: "1px solid #8895a5"
    },

    ':active': {
      border: "1px solid #1b1b1b"
    }
  },
  navImage: {
    width: "100%",
    height: "60px",
    cursor: "pointer"
  },
  sliderImage: {
    width: "100%",
    height: "500px"
  },
  clearFloat: {
    height: "0px",
    clear: "both"
  }
};

IndividualExhibition = Radium(IndividualExhibition);

export default IndividualExhibition;
