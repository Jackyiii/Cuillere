/**
 * Created by zhaojunbo on 2017/9/26.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Switch} from "react-router-dom";
import PersonalExhibition from "./personalExhibition.jsx";
import Collection from "./collection.jsx";
import NavBar from "../navbar/normalNav";
import Tabs from "./tabs"
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';
import {bindActionCreators} from "redux";
import FollowModal from "./follow"
import {API as api} from "../../externalStates/api";

class Title extends React.Component {
  constructor (props) {
    super(props);
    this.state = {show: null}
  }

  showFollow (type) {
    if(type)
      api.fetch[type](this.props.id).then((list)=> {
        this.setState({list})
      });

    this.setState({show: type});
  }

  render () {
    let avatarStyle = style.avatar;
    avatarStyle.backgroundImage = "url(" + this.props.avatar + ")";

    let statisticInfo = <div>
      <span key={"FOLLOWING"} style={style.btn} onClick={() => {this.showFollow("following")}}>{"FOLLOWING"}
        <span style={{paddingLeft: "8px"}}/> {this.props.followingCount}</span>
      <span style={{paddingLeft: "16px"}}/>
      <span key={"FOLLOWER"} style={style.btn} onClick={() => {this.showFollow("follower")}}>{"FOLLOWER"}
        <span style={{paddingLeft: "8px"}}/> {this.props.followerCount}</span>
      <span style={{paddingLeft: "16px"}}/>
      {"EXHIBITION"} <span style={{paddingLeft: "8px"}}/> {this.props.exhibitionCount}
    </div>;

    return (
      <div style={style.base}>
        {this.props.isSelf ? null :
          <div style={style.option.base}>
            <div key={"mark"} style={style.option.button}>关注</div>
            <div key={"msg"} style={style.option.button}>私信</div>
          </div>}

        <div style={{clear: "both"}}/>
        <div style={style.center}>
          <div style={avatarStyle}>

          </div>
          <div style={style.name}>
            {this.props.name}
          </div>
          <div style={style.country}>
            {this.props.country}
          </div>
          <div style={style.info}>
            {this.props.info}
          </div>
          <div style={style.statistic}>
            {statisticInfo}
          </div>
        </div>

        {this.state.show ? <FollowModal type={this.state.show} cnt={this.props[this.state.show + "Count"]}
                                        list={this.state.list} goBack={() => {this.setState({show: null})}}/>
          : null}
      </div>
    )
  }
}

Title.propTypes = {
  isSelf: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
  country: PropTypes.string,
  info: PropTypes.string,
  followerCount: PropTypes.string,
  followingCount: PropTypes.string,
  exhibitionCount: PropTypes.string
};

let style = {
  btn: {
    userSelect: "none",
    cursor: "pointer",
    textDecoration: "none",

    transition: "all 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      color: "#303030",
      borderBottom: "1px solid #303030",
    }
  },
  base: {
    marginTop: "105px",
  },
  center: {
    height: "350px",
    width: "1020px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center"
  },
  avatar: {
    height: "164px",
    width: "164px",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "50%",
    backgroundSize: "cover"
  },
  name: {
    height: "36px",
    marginTop: "23px",
    fontSize: "32px",
    color: "#000000"
  },
  country: {
    height: "15px",
    marginTop: "20px",
    fontSize: "13px",
    color: "#868686"
  },
  info: {
    height: "20px",
    marginTop: "32px",
    fontSize: "17px",
    textAlign: "center",
    color: "#5d5d5d"
  },
  statistic: {
    height: "15px",
    lineHeight: "15px",
    width: "450px",
    marginTop: "16px",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "13px",
    color: "#939393",
    textAlign: "center"
  },
  option: {
    base: {
      paddingTop: "22px",
      paddingBottom: "34px",
      float: "right"
    },
    button: {
      border: "2px solid #626363",
      fontFamily: "PingFangSC-Regular",
      fontSize: "13px",
      color: "#868686",

      userSelect: "none",
      cursor: "pointer",
      textDecoration: "none",
      float: "left",
      borderRadius: "17px",
      backgroundColor: "#ffffff",
      height: "34px",
      width: "79px",
      textAlign: "center",
      lineHeight: "34px",
      marginRight: "38px",

      transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",
      ":hover": {
        backgroundColor: "#8895A5",
        color: "#ffffff"
      },
      ":active": {
        backgroundColor: "#404040",
        color: "#ffffff"
      }
    }
  },
};

Title = Radium(Title);
Title = connect(
  state => ({state: state.artist}),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  })
)(Title);

let ArtistHome = (props) => {
  return <div>
    <Tabs text={["展览", "介绍", "收藏"]} index={props.index}
          handleIndexChanged={props.handleIndexChanged}/>
    {
      props.index === 1 ? <Collection expArray={props.collections}/> :
        props.index === 2 ? <Collection expArray={props.collections}/> :
          <PersonalExhibition isSelf={props.isSelf} expArray={props.personalExhibitions}/>
    }
  </div>
};

class Artist extends React.Component {
  constructor (props) {
    super(props);

    this.state = {index: 0};
  }

  componentWillMount () {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps (nextProps) {
    try {
      if (nextProps.id === this.props.id && nextProps.state.artists[nextProps.id] || nextProps.state.fetching) return
    } catch (err) {}

    this.props.actions.fetchArtist(nextProps.id);
  }

  handleIndexChanged (index) {
    this.setState({index})
  }

  render () {
    let state = this.props.state;
    if (state.fetching) {
      return null
    }
    let id = this.props.id;

    let artist = this.props.state.artists[id];
    if (!artist) return null;

    return (
      <div>
        <NavBar/>
        <Title {...artist}/>

        <Switch>
          <Route exact path="/home" render={() => {
            return <ArtistHome handleIndexChanged={this.handleIndexChanged.bind(this)}{...artist}
                               index={this.state.index}/>
          }}/>
          <Route exact path="/artist/:id" render={() => {
            return <ArtistHome handleIndexChanged={this.handleIndexChanged.bind(this)}{...artist}
                               index={this.state.index}/>
          }}/>

          <Route path="/notification" component={(props) => {
            return <div>
              <Tabs text={["全部", "关注", "私信"]} index={this.state.index}
                    handleIndexChanged={this.handleIndexChanged.bind(this)}/>
              {
                this.state.index === 1 ? <Collection expArray={artist.collections}/> :
                  this.state.index === 2 ? <Collection expArray={artist.collections}/> :
                    <PersonalExhibition expArray={artist.personalExhibitions}/>
              }
            </div>
          }}/>
        </Switch>

        <div style={{padding: "40px"}}/>
      </div>
    )
  }
}

Artist.propTypes = {
  id: PropTypes.string
};

Artist = Radium(Artist);
Artist = connect(
  state => ({state: state.artist}),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  })
)(Artist);


export default Artist;
