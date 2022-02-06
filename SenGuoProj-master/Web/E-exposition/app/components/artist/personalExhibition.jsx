import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";

let DeleteModal = (props) => {
  return <div style={deleteStyle.base} onClick={props.goBack}>
    <div style={deleteStyle.modal} onClick={(event) => {event.stopPropagation()}}>
      <span style={deleteStyle.title}>您确认要删除展览 {props.name} 吗</span>

      <div style={deleteStyle.btnWrapper}>
        <div style={deleteStyle.cancel}>取消</div>
        <div style={deleteStyle.confirm}>确认</div>
      </div>
    </div>
  </div>
}

let deleteStyle = {
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
    padding: "133px 65px 38px 65px",
    textAlign: "center",
    borderRadius: "8px"
  },
  title: {
    marginBottom: "103px",
    fontFamily: "PingFangSC-Semibold",
    fontSize: "14px",
    color: "#000000"
  },
  btnWrapper: {
    marginTop: "103px"
  },
  cancel: {
    cursor: "pointer",
    float: "left",
    background: "#D8D8D8",
    borderRadius: "8px",
    fontFamily: "PingFangSC-Semibold",
    fontSize: "14px",
    color: "#FFFFFF",
    width: "121px",
    height: "35px",
    lineHeight: "35px",
  },
  confirm: {
    cursor: "pointer",
    float: "right",
    border: "1px solid #979797",
    borderRadius: "8px",
    fontFamily: "PingFangSC-Semibold",
    fontSize: "14px",
    color: "#141414",
    marginLeft: "125px",
    width: "121px",
    height: "35px",
    lineHeight: "35px",
  }
}

class ExhibitionItem extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hover: false
    }
  }

  handleMouseEnter () {
    let newState = {};
    newState.hover = true;
    this.setState(newState);
  }

  handleMouseLeave () {
    let newState = {};
    newState.hover = false;
    this.setState(newState);
  }

  goBack () {
    this.setState({askDelete: false})
  }

  handleEditClick (event) {
  }

  render () {
    let itemImageStyle = expItemStyle.item;
    itemImageStyle.backgroundImage = "url(" + this.props.image + ")";

    let time = this.props.startTime + "-" + this.props.endTime;

    return (
      <div>
        {this.state.askDelete ?
          <DeleteModal name={this.props.mainTitle} goBack={this.goBack.bind(this)} id={this.props.expId}/> : null}

        <div style={expItemStyle.base} onClick={()=>{this.props.history.push("/exhibition/individual/" + this.props.expId)}}>
          <div style={itemImageStyle}>
            <div key={"exhibitionItem_" + this.props.expId + "_FullInfo"}
                 style={expItemStyle.infoFull}
                 onMouseEnter={() => { this.handleMouseEnter() }}
                 onMouseLeave={() => { this.handleMouseLeave() }}>

              {this.props.isSelf ? <div>
                <div style={expItemStyle.edit} onClick={(event) => { event.stopPropagation(); this.handleEditClick(event) }}>
                  <img src={require('./edit.png')}/>
                </div>
                <div style={expItemStyle.del} onClick={(event) => { event.stopPropagation(); this.setState({askDelete: true}) }}>
                  <img src={require('./close.png')}/>
                </div>
              </div> : null}

              <div style={expItemStyle.details}>
                <div style={expItemStyle.likeHint}>
                  <img src={require('./like.png')}/>
                </div>
                <div style={expItemStyle.countInfo}>
                  {this.props.likeCount}
                </div>
                <div style={expItemStyle.watchHint}>
                  <img src={require('./seen.png')}/>
                </div>
                <div style={expItemStyle.countInfo}>
                  {this.props.watchCount}
                </div>
                <div style={expItemStyle.commentHint}>
                  <img src={require('./comment.png')}/>
                </div>
                <div style={expItemStyle.countInfo}>
                  {this.props.commentCount}
                </div>
              </div>
            </div>
          </div>
          <div style={expItemStyle.baseInfo}>
            <div style={expItemStyle.title}>
              {this.props.mainTitle}
            </div>
            <div style={expItemStyle.time}>
              {time}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ExhibitionItem.propTypes = {
  isSelf: PropTypes.bool,
  expId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  mainTitle: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  likeCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  watchCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  commentCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

let expItemStyle = {
  base: {
    float: "left",
    height: "455px",
    width: "300px",
    margin: "20px",
    color: "#ffffff",
    userSelect: "none",
    cursor: "pointer",
    textDecoration: "none"
  },
  item: {
    height: "406px",
    width: "300px",
    position: "relative",
    backgroundSize: "cover"
  },
  infoFull: {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "406px",
    width: "300px",
    backgroundColor: "rgba(0,0,0,0)",
    textAlign: "center",
    opacity: "0",
    transition: "all 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      opacity: "1",
      backgroundColor: "rgba(0,0,0,0.46)"
    }
  },
  edit: {
    float: "left",
    height: "30px",
    width: "30px",
    marginLeft: "213px",
    marginTop: "15px"
  },
  del: {
    float: "left",
    height: "30px",
    width: "30px",
    marginLeft: "18px",
    marginTop: "15px"
  },
  details: {
    height: "44px",
    width: "300px",
    marginTop: "362px",
    backgroundColor: "rgba(195,195,195,0.66)"
  },
  likeHint: {
    float: "left",
    height: "20px",
    width: "20px",
    marginLeft: "48px",
    marginTop: "12px",
  },
  watchHint: {
    float: "left",
    height: "20px",
    width: "20px",
    marginTop: "12px",
  },
  commentHint: {
    float: "left",
    height: "20px",
    width: "20px",
    marginTop: "12px",
  },
  countInfo: {
    float: "left",
    height: "22px",
    lineHeight: "22px",
    width: "55px",
    marginTop: "12px",
    marginLeft: "5px",
    textAlign: "left",
    fontSize: "14px"
  },
  baseInfo: {
    height: "29px",
    marginTop: "20px"
  },
  title: {
    float: "left",
    height: "29px",
    lineHeight: "29px",
    width: "145px",
    fontSize: "23px",
    color: "#000000"
  },
  time: {
    float: "left",
    height: "17px",
    lineHeight: "17px",
    width: "155px",
    marginTop: "10px",
    fontSize: "13px",
    color: "#656565"
  }
};

import {withRouter} from "react-router-dom";
ExhibitionItem = withRouter(Radium(ExhibitionItem));

class ExhibitionPage extends React.Component {
  constructor (props) {
    super(props);
  }

  renderItemArray () {
    return (
      this.props.pageArray.map((item, index) => {
        return (
          <ExhibitionItem key={"exhibitionItem" + item.expId} isSelf={this.props.isSelf} {...item}/>
        )
      })
    )
  }

  render () {
    return (
      <div style={expPageStyle.base}>
        {this.renderItemArray()}
      </div>
    )
  }
}

ExhibitionPage.propTypes = {
  pageArray: PropTypes.array,
  isSelf: PropTypes.bool
};

let expPageStyle = {
  base: {
    width: "1020px",
    height: "990px",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden"
  }
};

ExhibitionPage = Radium(ExhibitionPage);

class ExhibitionSlick extends React.Component {

  constructor (props) {
    super(props);

    this.pageSize = 6;
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
        <ExhibitionPage
          isSelf={this.props.isSelf}
          key={"exhibitionPage" + pageIndex}
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
                  onClick={(event) => { self.handleIndexClick(item) }}>
              <u>{item}</u>
            </span>
          )
        } else {
          return (
            <span key={"slickIndex" + item} style={expSlickStyle.slickIndexItem}
                  onClick={(event) => { self.handleIndexClick(item) }}>
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

ExhibitionSlick.propTypes = {
  expArray: PropTypes.array
};

let expSlickStyle = {
  base: {
    width: "1020px",
    height: "1070px",
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

ExhibitionSlick = Radium(ExhibitionSlick);

class PersonalExhibition extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <ExhibitionSlick {...this.props}/>
      </div>
    )
  }
}

PersonalExhibition.propTypes = {
  expArray: PropTypes.array,
  isSelf: PropTypes.bool
};

PersonalExhibition = Radium(PersonalExhibition);

export default PersonalExhibition;
