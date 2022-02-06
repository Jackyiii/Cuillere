/**
 * Created by zhaojunbo on 2017/9/4.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import Radium from "radium";
import PersonSlider from './slider'
import CompleteList from "./completeList";

class Artists extends React.Component {
  constructor (props) {
    super(props);

    this.state = {more: false}
  }

  tryRenderItem (personDataArray, startTime, height) {
    return (
      <PersonSlider
        personDataArray={personDataArray}
        startTime={startTime}
        height={height}
      />
    )
  }

  splitPersonData (recommendArray) {
    let itemWidth330 = [];
    let itemWidth170 = [];
    let itemWidth320 = [];
    let itemWidth240 = [];

    recommendArray.map(function (item, index) {
      if (index % 4 === 0) {
        itemWidth330.push(item);
      } else if (index % 4 === 1) {
        itemWidth170.push(item);
      } else if (index % 4 === 2) {
        itemWidth320.push(item);
      } else if (index % 4 === 3) {
        itemWidth240.push(item);
      }
    });

    // split itemWidth170 and itemWidth320 to 4 array
    let row0First = [];
    let row0Second = [];
    let row1First = [];
    let row1Second = [];

    itemWidth170.map(function (item, index) {
      if (index % 2 === 0) {
        row0First.push(item);
      } else {
        row1Second.push(item);
      }
    });

    itemWidth320.map(function (item, index) {
      if (index % 2 === 0) {
        row0Second.push(item);
      } else {
        row1First.push(item);
      }
    });

    return [itemWidth330, row0First, row0Second, row1First, row1Second, itemWidth240];
  }

  renderFirstColumn (itemData) {
    return (
      <div style={style.firstColumn}>
        {this.tryRenderItem(itemData, 0, 340)}
      </div>
    )
  }

  renderSecondColumn (row0first, row0Second, row1first, row1Second) {
    return (
      <div style={style.secondColumn}>
        <div style={style.firstRow}>
          <div style={style.firstRowItem1}>
            {this.tryRenderItem(row0first, 250, 169)}
          </div>
          <div style={style.firstRowItem2}>
            {this.tryRenderItem(row0Second, 500, 169)}
          </div>
        </div>
        <div style={style.secondRow}>
          <div style={style.secondRowItem1}>
            {this.tryRenderItem(row1first, 750, 169)}
          </div>
          <div style={style.secondRowItem2}>
            {this.tryRenderItem(row1Second, 1000, 169)}
          </div>
        </div>
      </div>
    )
  }

  renderThirdColumn (itemData) {
    return (
      <div style={style.thirdColumn}>
        {this.tryRenderItem(itemData, 1250, 340)}
      </div>
    )
  }

  renderLess () {
    let contentData = this.splitPersonData(this.props.list);

    return (
      <div style={style.base}>
        <div style={style.title}>
          RECOMMEND PERSON
        </div>
        <div style={style.motto}>
          <div style={style.mottoText}>
            {this.props.mainMotto}
          </div>
          <div style={style.mottoText}>
            {this.props.subMotto}
          </div>
        </div>

        <div style={style.content}>
          {this.renderFirstColumn(contentData[0])}
          {this.renderSecondColumn(contentData[1], contentData[2], contentData[3], contentData[4])}
          {this.renderThirdColumn(contentData[5])}
        </div>

        <div style={style.viewMore} onClick={() => { this.setState({more: true}) }}>
          View More
        </div>
      </div>
    )
  }

  renderMore () {
    return (
      <CompleteList/>
    )
  }

  render () {
    if (this.state.more)
      return this.renderMore();
    else
      return this.renderLess();
  }
}

Artists.propTypes = {
  mainMotto: PropTypes.string,
  subMotto: PropTypes.string,
  list: PropTypes.array
};

let style = {
  base: {
    width: "100%",
    marginTop: "100px"
  },
  title: {
    height: "25px",
    lineHeight: "25px",
    marginLeft: "260px",
    fontSize: "20px"
  },
  motto: {
    height: "30px",
    marginTop: "60px",
    lineHeight: "15px",
    marginLeft: "260px"
  },
  mottoText: {
    height: "15px",
    font: "15px"
  },
  content: {
    display: "table",
    height: "340px",
    marginTop: "50px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  viewMore: {
    height: "17px",
    lineHeight: "15px",
    width: "80px",
    textAlign: "center",
    marginTop: "40px",
    marginLeft: "auto",
    marginRight: "auto",
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
  firstColumn: {
    float: "left",
    position: "relative",
    width: "330px",
    height: "100%"
  },
  secondColumn: {
    float: "left",
    width: "490px",
    height: "100%",
    marginLeft: "2px",
    marginRight: "2px"
  },
  thirdColumn: {
    float: "left",
    position: "relative",
    width: "240px",
    height: "100%"
  },
  firstRow: {
    height: "169px",
  },
  secondRow: {
    height: "169px",
    marginTop: "2px"
  },
  firstRowItem1: {
    float: "left",
    position: "relative",
    width: "169px",
    height: "169px",
  },
  firstRowItem2: {
    float: "left",
    position: "relative",
    width: "319px",
    height: "169px",
    marginLeft: "2px"
  },
  secondRowItem1: {
    float: "left",
    position: "relative",
    width: "319px",
    height: "169px",
  },
  secondRowItem2: {
    float: "left",
    position: "relative",
    width: "169px",
    height: "169px",
    marginLeft: "2px"
  }
};

Artists = Radium(Artists);

export default Artists;
