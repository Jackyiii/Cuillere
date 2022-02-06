import React from 'react';
import ReactDOM from 'react-dom';
import Radium from "radium";
import PropTypes from 'prop-types';


class CollectionItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let itemImageStyle = collectionItemStyle.item;
    itemImageStyle["background"] = "url(" + this.props.image + ")";

    let time = this.props.startTime + "-" + this.props.endTime;

    return (
      <div style={[collectionItemStyle.base, this.props.expired ? {background: "#E2E8ED"} : null]}>
        <div style={itemImageStyle}>
        </div>

        <div style={collectionItemStyle.info}>
          <div style={collectionItemStyle.mainTitle}>
            {this.props.mainTitle}
          </div>
          <div style={collectionItemStyle.subInfo}>
            {this.props.subTitle}
          </div>
          <div style={collectionItemStyle.authorAndTime}>
            <span style={collectionItemStyle.author}>
              {this.props.author}
            </span>
            <span style={collectionItemStyle.time}>
              {this.props.startTime}
            </span>
          </div>
          <div style={collectionItemStyle.abstract}>
            {this.props.abstract}
          </div>
        </div>
      </div>
    )
  }
}

CollectionItem.propTypes = {
  expId: PropTypes.number,
  image: PropTypes.string,
  mainTitle: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  subTitle: PropTypes.string,
  abstract: PropTypes.string,
  author: PropTypes.string
};

let collectionItemStyle = {
  base: {
    float: "left",
    height: "138px",
    width: "460px",
    margin: "10px 30px 10px 45px",
    padding: "5px",
    color: "#ffffff",
    userSelect: "none",
    cursor: "pointer"
  },
  item: {
    float: "left",
    height: "138px",
    width: "138px"
  },
  info: {
    float: "left",
    height: "138px",
    width: "287px",
    marginLeft: "35px",
    textAlign: "left"
  },
  mainTitle: {
    height: "28px",
    lineHeight: "28px",
    fontSize: "24px",
    color: "#575757"
  },
  subInfo: {
    height: "21px",
    lineHeight: "21px",
    marginTop: "13px",
    color: "#353535",
    fontSize: "15px"
  },
  authorAndTime: {
    height: "21px",
    lineHeight: "21px",
    color: "#353535",
    fontSize: "15px"
  },
  author: {
    display: "inline-block",
    height: "21px",
    width: "180px"
  },
  time: {
    display: "inline-block",
    height: "21px",
    width: "107px"
  },
  abstract: {
    height: "42px",
    lineHeight: "14px",
    marginTop: "15px",
    color: "#5d5d5d",
    fontSize: "12px",
    overflow: "hidden"
  }
};

CollectionItem = Radium(CollectionItem);

class CollectionPage extends React.Component {
  constructor (props) {
    super(props);
  }

  renderItemArray () {
    return (
      this.props.pageArray.map(function (item, index) {
        return (
          <CollectionItem key={"collectionItem" + item.expId}
                          {...item}
          />
        )
      })
    )
  }

  render () {
    return (
      <div style={expPageStyle.base}>
        <div style={expPageStyle.separator}/>
        <div style={expPageStyle.content}>
          {this.renderItemArray()}
        </div>
      </div>
    )
  }
}

CollectionPage.propTypes = {
  pageArray: PropTypes.array
};

let expPageStyle = {
  base: {
    position: "relative",
    width: "1090px",
    height: "840px",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden"
  },
  content: {
    position: "absolute",
    width: "1090px",
    height: "840px",
    top: "0",
    left: "0"
  },
  separator: {
    width: "2px",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#979797"
  }

};

CollectionPage = Radium(CollectionPage);

class CollectionSlick extends React.Component {
  constructor (props) {
    super(props);

    this.pageSize = 10;
    this.indexSize = 10;
    this.state = {
      currPageIndex: 1
    }
  }

  handleIndexClick (index) {

    let newState = {};
    newState.currPageIndex = index;
    this.setState(newState);
  }

  renderPageArray () {
    let pageDataArray = [];

    for (let index = 0; index < this.props.expArray.length; index += this.pageSize) {
      pageDataArray.push(this.props.expArray.slice(index, Math.min(index + this.pageSize, this.props.expArray.length)));
    }

    let pageIndex = this.state.currPageIndex - 1;
    if (pageIndex < pageDataArray.length) {
      return (
        <CollectionPage key={"exhibitionPage" + pageIndex}
                        pageArray={pageDataArray[pageIndex]}/>
      )
    } else {
      return null;
    }
  }

  renderSlickIndex () {
    let count = Math.ceil(this.props.expArray.length / this.pageSize);

    let countComponent = [];

    let startIndex = Math.max(1, Math.floor(this.state.currPageIndex - this.indexSize / 2));
    let maxStartIndex = count - this.indexSize + 1;
    startIndex = Math.min(startIndex, maxStartIndex);

    for (let index = startIndex; index < startIndex + this.indexSize; ++index) {
      countComponent.push(index);
    }

    let self = this;

    return (
      countComponent.map(function (item, index) {

        if (self.state.currPageIndex === item) {
          return (
            <span key={"slickIndex" + item} style={expSlickStyle.slickIndexItem}
                  onClick={() => { self.handleIndexClick(item) }}>
              <u>
                {item}
              </u>
            </span>
          )
        } else {
          return (
            <span key={"slickIndex" + item} style={expSlickStyle.slickIndexItem}
                  onClick={() => { self.handleIndexClick(item) }}>
              {item}
            </span>
          )
        }
      })
    )
  }

  renderSlickIndexBackward () {
    let arrowStyle = [(this.state.currPageIndex === 1) && expSlickStyle.slickArrowDisplay];

    return (
      <span key={"slickbackward"} style={expSlickStyle.slickIndexItem}>
        <p style={arrowStyle} onClick={(event) => { this.handleIndexClick(Math.max(0, this.state.currPageIndex - 1)) }}>
          {"<"}
        </p>
      </span>
    )

  }

  renderSlickIndexForward () {
    let maxPage = Math.ceil(this.props.expArray.length / this.pageSize);

    let arrowStyle = [(this.state.currPageIndex === maxPage) && expSlickStyle.slickArrowDisplay];

    return (
      <span key={"slickforward"} style={expSlickStyle.slickIndexItem}>
        <p style={arrowStyle}
           onClick={(event) => { this.handleIndexClick(Math.min(maxPage, this.state.currPageIndex + 1)) }}>
          {">"}
        </p>
      </span>
    )
  }

  render () {
    return (
      <div style={expSlickStyle.base}>
        {this.renderPageArray()}
        <div style={expSlickStyle.slickIndex}>
          {this.renderSlickIndexBackward()}
          {this.renderSlickIndex()}
          {this.renderSlickIndexForward()}
        </div>
      </div>
    )
  }
}

CollectionSlick.propTypes = {
  expArray: PropTypes.array
};

let expSlickStyle = {
  base: {
    width: "1090px",
    height: "920px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    textAlign: "center"
  },
  slickIndex: {
    display: "inline-block",
    height: "23px",
    lineHeight: "23px",
    marginTop: "56px",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "16px",
    color: "#282828",
    userSelect: "none",

  },
  slickIndexItem: {
    display: "inline-block",
    width: "48px",
    height: "23px",
    cursor: "pointer",

    ":hover": {
      color: "#000000"
    }
  },
  slickArrowDisplay: {
    color: "rgba(0,0,0,0)"
  }
};

CollectionSlick = Radium(CollectionSlick);

class Collection extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <CollectionSlick expArray={this.props.expArray}/>
      </div>
    )
  }
}

Collection.propTypes = {
  expArray: PropTypes.array
};

Collection = Radium(Collection);

export default Collection;
