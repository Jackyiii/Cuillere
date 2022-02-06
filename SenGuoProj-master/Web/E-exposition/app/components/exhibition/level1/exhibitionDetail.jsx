/**
 * Created by zhaojunbo on 2017/7/27.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import Intl from "../../intl/intl.jsx";
import Nav from "../../navbar/normalNav"
import SocialAccounts from "./socialAccounts"
import Comments from "../comments"

class ExhibitionDetail extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps (nextProps) {
    try {
      if (nextProps.state.exhibitionDetails[nextProps.id]) return
    } catch (err) {}

    this.props.actions.fetchExhibitionDetails(nextProps.section, nextProps.id);
  }

  goTo (i) {
    this.props.history.push(`/exhibition/${this.props.section}/${i}`)
  }

  render () {
    let state = this.props.state;
    if (state.fetching) {
      return null
    }

    let item = this.props.state.exhibitionDetails[this.props.id];
    if (!item) return null;

    let shouldPay = !item.free && !item.paid;
    let squared = item.expMode === "squared";

    if (shouldPay) item.images = item.images.slice(0, squared ? 6 : 4);  // simulate backend
    let hallStyle = style[squared ? "squared" : "portrait"];

    return (
      <div style={style.base}>
        <Nav/>

        {item.prev ? <div style={style.prev} onClick={(event) => {
          event.stopPropagation();
          this.goTo(item.prev)
        }}/> : null}

        {item.next ? <div style={style.next} onClick={(event) => {
          event.stopPropagation();
          this.goTo(item.next)
        }}/> : null}

        <div style={style.modal} onClick={() => {this.props.history.push("/exhibitions/" + this.props.section)}}>
          <div onClick={(event) => {event.stopPropagation()}}>
            <div style={style.optionWrapper}>
              <div style={style.option.base}>
                <img style={style.option.icon} src={require('./like.png')}/>
                <div style={style.option.info}>
                  {item.expLikeCount}
                </div>
                <img style={style.option.icon} src={require('./seen.png')}/>
                <div style={style.option.info}>
                  {item.expSeenCount}
                </div>
                <img style={style.option.icon} src={require('./comment.png')}/>
                <div style={style.option.info}>
                  {item.expSeenCount}
                </div>
                <img style={[style.option.icon, {cursor: "pointer"}]}
                     src={item.marked ? require('./mark.png') : require('./mark.png')}/>
              </div>
            </div>

            <div style={style.title}>
              {item.expTitle} {shouldPay ? "should pay" : null}
            </div>

            <div style={style.subtitle}>
              {item.expAuthor} {item.expStartTime}-{item.expStopTime}
            </div>

            <div style={style.category}>
              <i>{item.about}</i>
            </div>

            <div style={style.abstract}>
              {item.abstract}
            </div>

            <div style={hallStyle.wrapper}>
              {item.images.map((item, i) => {
                let link = this.props.history.location.pathname + "/detail/" + (i + 1);
                if (shouldPay) link += "/pay";
                return <Link to={link} key={"keyToDetail/" + i}>
                  <img src={item} style={hallStyle.img}/>
                </Link>
              })}

              {shouldPay ? <div style={style.payHint.base}>
                <div style={style.payHint.text}>
                  如果您想查看展览的全部内容，
                  请进行付费，非常感谢您对原创作品的支付！
                </div>
              </div> : null}
            </div>

            <div style={style.tagsWrapper}>
              {item.tags.map((item, i) => {
                return <span style={style.tag} key={"tags/" + i}>
                {item}
              </span>
              })}
            </div>

            <div style={style.gift}>
              赏
            </div>
          </div>

          <div>
            <div style={style.author.options.base}>
              <div style={style.author.options.social}>
                <SocialAccounts/>
              </div>

              <div style={style.author.options.button.base}>
                <img style={style.author.options.button.icon} src={require('./like.png')}/>
                <span style={style.author.options.button.info}>点赞</span>

                <img style={style.author.options.button.icon}
                     src={item.marked ? require('./mark.png') : require('./mark.png')}/>
                <span style={style.author.options.button.info}>收藏</span>

                <img style={style.author.options.button.icon} src={require('./edit.png')}/>
                <span style={style.author.options.button.info}>编辑</span>
              </div>
            </div>

            <div style={style.author.about.base}>
              <img style={style.author.about.avatar} src={item.authorAvatar}/>
              <div>
                <div style={style.author.about.title.base}>
                  <div style={style.author.about.title.name}>
                    {item.expAuthor}
                  </div>
                  <div style={style.author.about.title.location}>
                    {item.authorLocation}
                  </div>
                </div>
                <div style={style.author.about.buttonWrapper}>
                  <div key={"exp/" + item.expId+ "/follow"} style={style.author.about.button}>关注</div>
                  <div key={"exp/" + item.expId+ "/msg"} style={style.author.about.button}>私信</div>
                </div>
              </div>
            </div>

            <Comments comments={item.comments}/>
          </div>
        </div>
      </div>
    );
  }
}

let style = {
  base: {
    position: "absolute",
    width: "100%",
    top: "70px",
    backgroundColor: "#9c9c9c",
  },
  prev: {
    position: "fixed",
    height: "100%",
    width: "100px",
    margin: "0px",
    left: "0px",
    backgroundImage: `url(${require("../prev.png")})`,
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no-repeat",

    userSelect: "none",
    cursor: "pointer",
  },
  next: {
    position: "fixed",
    height: "100%",
    width: "100px",
    margin: "0px",
    right: "0px",
    backgroundImage: `url(${require("../next.png")})`,
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no-repeat",

    userSelect: "none",
    cursor: "pointer",
  },
  modal: {
    position: "relative",
    backgroundColor: "#ffffff",
    margin: "38px 100px 100px 100px",
    textAlign: "center"
  },
  optionWrapper: {
    height: "22px",
    padding: "62px 100px 0 0",
  },
  option: {
    base: {
      float: "right"
    },
    icon: {
      float: "left",
      height: "22px",
      userSelect: "none",
      paddingRight: "3px"
    },
    info: {
      float: "left",
      height: "22px",
      width: "48px",
      textAlign: "left",
      fontSize: "14px",
      color: "#9c9c9c",
      paddingRight: "15px"
    },
  },
  title: {
    paddingTop: "55px",
    fontFamily: "ArialMT",
    fontSize: "40px",
    color: "#000000",
    textAlign: "center"
  },
  subtitle: {
    paddingTop: "18px",
    fontFamily: "ArialMT",
    fontSize: "18px",
    color: "#000000",
    textAlign: "center"
  },
  category: {
    fontFamily: "Arial-ItalicMT",
    fontSize: "13px",
    color: "#868686",
    paddingTop: "14px",
    textAlign: "center"
  },
  abstract: {
    display: "inline-block",
    paddingLeft: "auto",
    paddingRight: "auto",
    paddingTop: "40px",
    textAlign: "left",
    width: "770px",
    fontFamily: "ArialMT",
    fontSize: "17px",
    color: "#727272"
  },
  squared: {
    wrapper: {
      width: "1134px",
      paddingTop: "55px",
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative"
    },
    img: {
      width: "364px",
      height: "364px",
      padding: "7px",
    }
  },
  portrait: {
    wrapper: {
      width: "1120px",
      paddingTop: "55px",
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative"
    },
    img: {
      width: "1120px",
      marginTop: "14px"
    }
  },
  tagsWrapper: {
    marginTop: "52px",
    fontFamily: "MicrosoftYaHei",
    fontSize: "14px",
    color: "#5F5F5F",
    textAlign: "center",
  },
  tag: {
    background: "#ECECEC",
    borderRadius: "3px",
    padding: "4px 8px 4px 8px",
    margin: "5px",
  },
  gift: {
    marginTop: "35px",
    marginBottom: "63px",
    display: "inline-block",
    paddingLeft: "auto",
    paddingRight: "auto",
    borderRadius: "54px",
    width: "108px", height: "108px", lineHeight: "108px",
    background: "#ACACAC",
    fontFamily: "MicrosoftYaHei",
    fontSize: "50px",
    color: "#FFFFFF",
    cursor: "pointer",
    userSelect: "none",
    textDecoration: "none"
  },
  author: {
    options: {
      base: {
        height: "35px",
        opacity: "0.67",
        background: "#D8D8D8",
        border: "1px solid #979797",
        padding: "15px 99px 13px 99px"
      },
      social: {
        float: "left",
      },
      button: {
        base: {
          float: "right"
        },
        icon: {
          float: "left",
          height: "37px",
          paddingRight: "3px",
          userSelect: "none",
          cursor: "pointer",
          textDecoration: "none"
        },
        info: {
          float: "left",
          height: "37px",
          lineHeight: "37px",
          width: "48px",
          textAlign: "left",
          fontSize: "16px",
          color: "#585858",
          paddingRight: "15px"
        },
      },
    },
    about: {
      base: {
        height: "217px",
        background: "#ACACAC",
        fontFamily: "MicrosoftYaHei",
        fontSize: "34px",
        color: "#FFFFFF",
      },
      avatar: {
        marginTop: "23px",
        float: "left",
        borderRadius: "84px",
        height: "168px",
        width: "168px",
        marginLeft: "98px"
      },
      title: {
        base: {
          paddingTop: "39px",
          fontFamily: "'San Francisco',Helvetica,Arial,serif",
          color: "#FFFFFF",
          textAlign: "left",
          marginLeft: "293px"
        },
        name: {
          fontSize: "34px",
        },
        location: {
          fontSize: "16px",
        }
      },
      buttonWrapper: {
        height: "44px",
        marginLeft: "293px",
        marginTop: "37px"
      },
      button: {
        userSelect: "none",
        cursor: "pointer",
        float: "left",
        border: "1px solid #C2C2C2",
        borderRadius: "17px",
        backgroundColor: "#ffffff",
        height: "34px",
        width: "79px",
        fontFamily: "'AppleSystemUIFont',Helvetica,Arial,serif",
        fontSize: "16px",
        color: "#585858",
        textAlign: "center",
        lineHeight: "34px",
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
    }
  },
  payHint: {
    base: {
      position: "absolute",
      bottom: "0",
      paddingLeft: "390px",
      paddingRight: "390px",
      height: "378px",
      fontSize: "23px",
      color: "#FFFFFF",
      opacity: "0.72",
      background: "#8C929C",
      display: "table"
    },
    text: {
      opacity: "1",
      display: "table-cell",
      verticalAlign: "middle",
    }
  }
};

import {connect} from 'react-redux';
import * as actionCreators from '../../../actions';
import {bindActionCreators} from "redux";

ExhibitionDetail = connect(
  state => ({state: state.exhibition}),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  })
)(Radium(ExhibitionDetail));

ExhibitionDetail = withRouter(ExhibitionDetail);

export default ExhibitionDetail;
