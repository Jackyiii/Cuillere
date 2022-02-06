/**
 * Created by zhaojunbo on 2017/9/2.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Radium from "radium";
import Slider from 'react-slick';

class OneExhibition extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let backgroundStyle = oneExpStyle.base;
    backgroundStyle["background"] = "url(" + this.props.imageUrl + ")";
    return (
      <div style={backgroundStyle}>
        <div style={oneExpStyle.info}>
          <div style={oneExpStyle.content}>
            <div style={oneExpStyle.title}>
              {this.props.imageTitle}
            </div>
            <div style={oneExpStyle.date}>
              {this.props.imageTime}
            </div>
            <div style={oneExpStyle.abstract}>
              {this.props.imageAbstract}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OneExhibition.propTypes = {
  schoolExpId: PropTypes.string,
  imageUrl: PropTypes.string,
  imageTitle: PropTypes.string,
  imageTime: PropTypes.string,
  imageAbstract: PropTypes.string
};

let oneExpStyle = {
  base: {
    display: "table",
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  info: {
    display: "table-cell",
    verticalAlign: "middle",
    backgroundColor: "#3b3b3b",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ffffff",
    opacity: "0.0",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      opacity: "0.6",
    },

    ":active": {
      opacity: "0.6",
    }
  },
  content: {
    width: "60%",
    height: "150px",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden"
  },
  title: {
    height: "20px",
    lineHeight: "20px",
    fontSize: "20px"
  },
  date: {
    height: "15px",
    lineHeight: "15px",
    fontSize: "15px",
    marginTop: "25px"
  },
  abstract: {
    height: "60px",
    lineHeight: "12px",
    fontSize: "12px",
    marginTop: "25px"
  }
};

OneExhibition = Radium(OneExhibition);

class SchoolExhibition extends React.Component {
  constructor(props) {
    super(props);
  }

  // returns resultData, which contains data of each slider:
  // [
  //      [
  //          [slider0_Column0_item0, slider0_Column0_item1],
  //          [slider0_Column1_item0, slider0_Column1_item1],
  //          [slider0_Column2_item0, slider0_Column2_item1],
  //          [slider0_Column3_item0, slider0_Column3_item1],
  //      ],
  //      [
  //          [slider1_Column0_item0, slider1_Column0_item1],
  //          [slider1_Column1_item0, slider1_Column1_item1],
  //          [slider1_Column2_item0, slider1_Column2_item1],
  //          [slider1_Column3_item0, slider1_Column3_item1],
  //      ]
  // ]

  splitColumnData(list) {
    let array200 = [];
    let array250 = [];
    let array350 = [];
    let array400 = [];

    let firstColumnArray = [];
    let secondColumnArray = [];
    let thirdColumnArray = [];
    let forthColumnArray = [];

    list.map(function (item, index) {
      if (item.width === 200) {
        array200.push(item);
      } else if (item.width === 250) {
        array250.push(item);
      } else if (item.width === 350) {
        array350.push(item);
      } else if (item.width === 400) {
        array400.push(item);
      }
    });

    if (array200.length < 1 || array250.length < 1 || array350.length < 1 || array400.length < 1) {
      return [];
    }

    let sideLength = Math.min(array200.length, array400.length);
    for (let index = 0; index < sideLength; index += 2) {
      // 200 & 400
      if (index < sideLength) {
        firstColumnArray.push(array200[index]);
        firstColumnArray.push(array400[index]);
      }
      // 400 & 200
      if (index + 1 < sideLength) {
        forthColumnArray.push(array400[index + 1]);
        forthColumnArray.push(array200[index + 1]);
      }
    }

    let centerLength = Math.min(array350.length, array250.length);
    for (let index = 0; index < centerLength; index += 2) {
      // 350 & 250
      if (index < sideLength) {
        secondColumnArray.push(array350[index]);
        secondColumnArray.push(array250[index]);
      }
      // 250 & 350
      if (index + 1 < sideLength) {
        thirdColumnArray.push(array250[index + 1]);
        thirdColumnArray.push(array350[index + 1]);
      }
    }

    let resultData = [];

    // calculate slider page count
    let sliderRows = Math.min(firstColumnArray.length,
      secondColumnArray.length,
      thirdColumnArray.length,
      forthColumnArray.length);

    for (let index = 0; index < sliderRows; index += 2) {
      let firstTempColumn = [firstColumnArray[index], firstColumnArray[index + 1]];
      let secondTempColumn = [secondColumnArray[index], secondColumnArray[index + 1]];
      let thirdTempColumn = [thirdColumnArray[index], thirdColumnArray[index + 1]];
      let forthTempColumn = [forthColumnArray[index], forthColumnArray[index + 1]];

      resultData.push([firstTempColumn, secondTempColumn, thirdTempColumn, forthTempColumn]);
    }

    return resultData;
  }

  renderColumn(columnIndex, columnData) {
    let itemStyleFirst, itemStyleSecond;
    if (columnIndex === 0) {
      // 200 & 400
      itemStyleFirst = schoolExpStyle.itemHeight200;
      itemStyleSecond = schoolExpStyle.itemHeight400;
    } else if (columnIndex === 1) {
      // 350 & 250
      itemStyleFirst = schoolExpStyle.itemHeight350;
      itemStyleSecond = schoolExpStyle.itemHeight250;
    } else if (columnIndex === 2) {
      // 250 & 350
      itemStyleFirst = schoolExpStyle.itemHeight250;
      itemStyleSecond = schoolExpStyle.itemHeight350;
    } else if (columnIndex === 3) {
      // 400 & 200
      itemStyleFirst = schoolExpStyle.itemHeight400;
      itemStyleSecond = schoolExpStyle.itemHeight200;
    }

    return (
      <div style={schoolExpStyle.column}>
        <div style={itemStyleFirst}>
          <Link to={"schoolExhibition/" + columnData[0].schoolExpId}>
            <OneExhibition
              schoolExpId={columnData[0].schoolExpId}
              imageUrl={columnData[0].imageUrl}
              imageTitle={columnData[0].imageTitle}
              imageTime={columnData[0].imageTime}
              imageAbstract={columnData[0].imageAbstract}
            />
          </Link>
        </div>
        <div style={itemStyleSecond}>
          <Link to={"schoolExhibition/" + columnData[1].schoolExpId}>
            <OneExhibition
              schoolExpId={columnData[1].schoolExpId}
              imageUrl={columnData[1].imageUrl}
              imageTitle={columnData[1].imageTitle}
              imageTime={columnData[1].imageTime}
              imageAbstract={columnData[1].imageAbstract}
            />
          </Link>
        </div>
      </div>
    )
  }

  renderAllSliders(sliderData) {
    let self = this;
    return (
      sliderData.map(function (item, index) {
        return (
          <div key={"schoolExhibition_" + index}>
            {self.renderColumn(0, item[0])}
            {self.renderColumn(1, item[1])}
            {self.renderColumn(2, item[2])}
            {self.renderColumn(3, item[3])}
          </div>
        )
      })
    )
  }

  render() {
    let sliderData = this.splitColumnData(this.props.list);

    let settings = {
      customPaging: function (index) { return <button><span /></button> },
      dots: false,
      draggable: false,
      arrows: false,
      infinite: true,
      vertical: true,
      autoplay: true,
      autoplaySpeed: 2500,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div style={schoolExpStyle.base}>
        <div style={schoolExpStyle.title}>
          SCHOOL EXHIBITION</div>
        <div style={schoolExpStyle.content}>
          <Slider style={schoolExpStyle.slider} {...settings}>
            {this.renderAllSliders(sliderData)}
          </Slider>
        </div>

        <div style={schoolExpStyle.viewMore}>
          <Link to={"/exhibitions/school"} style={{textDecoration: "none"}}>
            <text style={schoolExpStyle.viewMoreText}>View More</text></Link>
        </div>
      </div>
    )
  }
}

SchoolExhibition.propTypes = {
  list: PropTypes.array,
};

let schoolExpStyle = {
  base: {
    width: "100%",
    height: "800px"
  },
  title: {
    height: "25px",
    lineHeight: "25px",
    marginTop: "50px",
    marginBottom: "50px",
    marginLeft: "260px",
    fontSize: "20px"
  },
  content: {
    width: "100%",
    height: "600px"
  },
  slider: {
    width: "100%",
    height: "600px"
  },
  viewMore: {
    textAlign: "center",
    marginTop: "40px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  viewMoreText: {
    height: "17px",
    lineHeight: "15px",
    width: "80px",
    fontSize: "15px",
    color: "#8895a5",
    cursor: "pointer",
    userSelect: "none",
    borderBottom: "2px solid #8895a5",
    transition: "all 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ':hover': {
      color: "#303030",
      borderBottom: "2px solid #303030"
    },

    ":active": {
      color: "#303030",
      borderBottom: "2px solid #303030"
    }
  },
  column: {
    float: "left",
    width: "25%",
    height: "600px"
  },
  itemHeight200: {
    position: "relative",
    width: "100%",
    height: "200px"
  },
  itemHeight250: {
    position: "relative",
    width: "100%",
    height: "250px"
  },
  itemHeight300: {
    position: "relative",
    width: "100%",
    height: "300px"
  },
  itemHeight350: {
    position: "relative",
    width: "100%",
    height: "350px"
  },
  itemHeight400: {
    position: "relative",
    width: "100%",
    height: "400px"
  }
};

SchoolExhibition = Radium(SchoolExhibition);

export default SchoolExhibition;
