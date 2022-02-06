import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link, withRouter} from "react-router-dom";

let Follow = Radium((props) => {
  return <div style={followStyle.base}>
    <img style={followStyle.avatar} src={props.avatar}/>
    <div >
      <div style={followStyle.title.base}>
        <div style={followStyle.title.name}>
          {props.name}
        </div>
        <div style={followStyle.title.location}>
          {props.location}
        </div>
        <div style={followStyle.buttonWrapper}>
          <div key={"exp/" + props.id + "/follow"} style={followStyle.button}>关注</div>
          <div key={"exp/" + props.id + "/msg"} style={followStyle.button}>私信</div>
        </div>
      </div>
    </div>

    <div style={followStyle.expWrapper}>
      {props.exhibitions.map((item) => {
        return <Link key={"/exhibition/individual/" + item.id} to={"/exhibition/individual/" + item.id} style={followStyle.exp}><img style={followStyle.exp} src={item.img}/></Link>
      })}
    </div>

    <div style={{clear: "both"}}/>
  </div>
});

let followStyle = {
  expWrapper: {
    float: "left",
    marginLeft: "100px",
  },
  exp: {
    width: "95px",
    height: "95px",
    padding: "2.5px"
  },
  base: {
    backgroundColor: "#ffffff",
    height: "100px",
    fontFamily: "MicrosoftYaHei",
    borderBottom: "1px solid #D8D8D8",
    padding: "10px"
  },
  avatar: {
    padding: "3px",
    float: "left",
    borderRadius: "84px",
    height: "94px",
    width: "94px",
  },
  title: {
    base: {
      paddingLeft: "10px",
      float: "left",
      fontFamily: "'San Francisco',Helvetica,Arial,serif",
      color: "#000000",
      textAlign: "left",
    },
    name: {
      paddingTop: "10px",
      fontSize: "19px",
    },
    location: {
      paddingTop: "5px",
      fontSize: "11px",
    }
  },
  buttonWrapper: {
    paddingTop: "10px",
  },
  button: {
    userSelect: "none",
    cursor: "pointer",
    float: "left",
    border: "1px solid #C2C2C2",
    borderRadius: "17px",
    backgroundColor: "#ffffff",
    height: "25px",
    width: "60px",
    fontFamily: "'AppleSystemUIFont',Helvetica,Arial,serif",
    fontSize: "11px",
    color: "#585858",
    textAlign: "center",
    lineHeight: "25px",
    marginRight: "10px",

    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",
    ":hover": {
      backgroundColor: "#8895A5",
      color: "#ffffff"
    },
    ":active": {
      backgroundColor: "#404040",
      color: "#ffffff"
    },
  }
};

class FollowSlick extends React.Component {
  constructor (props) {
    super(props);

    this.pageSize = 4;
    this.indexSize = 10;
    this.state = {
      currPageIndex: 1,
    }
  }

  handleIndexClick (index) {
    let newState = {};
    newState.currPageIndex = index;
    this.setState(newState);
  }

  renderPageArray () {
    let list = this.props.list;

    let pageDataArray = [];

    for (let index = 0; index < list.length; index += this.pageSize) {
      pageDataArray.push(list.slice(index, Math.min(index + this.pageSize, list.length)));
    }

    let pageIndex = this.state.currPageIndex - 1;
    if (pageIndex < pageDataArray.length) {
      return (
        <div>
          {pageDataArray[pageIndex].map((item, i) => {return <Follow {...item}/>})}
        </div>
      )
    } else {
      return null;
    }
  }

  renderSlickIndex () {
    let list = this.props.list;
    let count = Math.ceil(list.length / this.pageSize);

    let countComponent = [];

    let startIndex = Math.max(1, Math.floor(this.state.currPageIndex - this.indexSize / 2));
    let maxStartIndex = count - this.indexSize + 1;
    startIndex = Math.max(1, Math.min(startIndex, maxStartIndex));
    let endIndex = Math.min(startIndex + this.indexSize - 1, count);

    for (let index = startIndex; index <= endIndex; ++index) {
      countComponent.push(index);
    }

    let self = this;

    return (
      countComponent.map(function (item, index) {
        if (self.state.currPageIndex === item) {
          return (
            <span key={"slickIndex" + item} style={slickStyle.slickIndexItem}
                  onClick={(event) => { self.handleIndexClick(item) }}>
              <u>{item}</u>
            </span>
          )
        } else {
          return (
            <span key={"slickIndex" + item} style={slickStyle.slickIndexItem}
                  onClick={(event) => { self.handleIndexClick(item) }}>
              {item}
            </span>
          )
        }
      })
    )
  }

  renderSlickIndexBackward () {
    let arrowStyle = [(this.state.currPageIndex === 1) && slickStyle.slickArrowDisplay];

    return (
      <span key={"slickbackward"} style={slickStyle.slickIndexItem}>
        <p style={arrowStyle} onClick={(event) => { this.handleIndexClick(Math.max(0, this.state.currPageIndex - 1)) }}>
          {"<"}
        </p>
      </span>
    )
  }

  renderSlickIndexForward () {
    let list = this.props.list;
    let maxPage = Math.ceil(list.length / this.pageSize);
    let arrowStyle = [(this.state.currPageIndex === maxPage) && slickStyle.slickArrowDisplay];

    return (
      <span key={"slickforward"} style={slickStyle.slickIndexItem}>
        <p style={arrowStyle}
           onClick={(event) => { this.handleIndexClick(Math.min(maxPage, this.state.currPageIndex + 1)) }}>
          {">"}
        </p>
      </span>
    )
  }

  render () {
    let list = this.props.list;
    if (!list) return null;

    return (
      <div style={slickStyle.base}>
        {this.renderPageArray()}
        <div style={slickStyle.slickIndex}>
          {this.renderSlickIndexBackward()}
          {this.renderSlickIndex()}
          {this.renderSlickIndexForward()}
        </div>
      </div>
    )
  }
}

let slickStyle = {
  base: {
  },
  slickIndex: {
    display: "inline-block",
    height: "23px",
    lineHeight: "23px",
    marginTop: "30px",
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

FollowSlick.propTypes = {
  list: PropTypes.array,
};

FollowSlick = Radium(FollowSlick);

let FollowModal = (props) => {
  return <div style={style.base} onClick={props.goBack}>
    <div style={style.modal} onClick={(event) => {event.stopPropagation()}}>
      <div style={style.title}>{props.type.toUpperCase()}</div>
      <div style={style.cnt}>-{props.cnt}-</div>

      <div style={style.followWrapper}>
        <FollowSlick list={props.list}/>
      </div>
    </div>
  </div>
};

let style = {
  base: {
    height: "100%",
    width: "100%",
    position: "fixed",
    top: "0px",
    left: "0px",
    zIndex: "1000",
    userSelect: "none",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.20)",
    border: "1px solid #979797"
  },
  modal: {
    position: "relative",
    backgroundColor: "#ffffff",
    width: "820px",
    padding: "50px 100px",
    textAlign: "center",
    borderRadius: "8px"
  },
  title: {
    fontFamily: "Arial",
    fontSize: "28px",
    color: "#000000"
  },
  cnt: {
    fontFamily: "Arial",
    fontSize: "21px",
    color: "#000000",
    margin: "7px 0 40px 0"
  },
}

export default withRouter(Radium(FollowModal));
