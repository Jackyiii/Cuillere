import React from "react";
import Radium from "radium";
import {Link} from "react-router-dom";
import Intl from "../intl/intl.jsx";

class SocialAccounts extends React.Component {
  render () {
    return (
      <div style={style.base}>

        <div style={style.split}>
          <span style={style.splitText}>社交账号登录</span>
        </div>

        <div style={style.buttons}>{
          ["weibo", "wechat", "facebook", "twitter"].map((name, index) => {
            return (
              <div key={"SocialAccounts" + name}
                   style={{...style.button, background: "url('" + require("./" + name + ".png") + "')"}}/>
            );
          })}
        </div>
      </div>
    );
  }
}

let style = {
  base: {},
  buttons: {
    display: "inline-block"
  },
  split: {
    marginTop: "24px",
    marginBottom: "14px",
    height: "1px",
    borderTop: "1px solid #ddd",
    textAlign: "center"
  },
  splitText:{
    fontSize: "6px",
    position: "relative",
    top: "-13px",
    background: "#fff",
    padding: "0 10px"
  },
  button: {
    width: "26px",
    height: "26px",
    float: "left",
    textAlign: "center",
    cursor: "pointer",
    margin: "2.5px",
    userSelect: "none",
    textDecoration: "none"
  }
};

export default Radium(SocialAccounts);
