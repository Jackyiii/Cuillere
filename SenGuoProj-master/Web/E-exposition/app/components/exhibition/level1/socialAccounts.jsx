import React from "react";
import Radium from "radium";
import {Link} from "react-router-dom";
import Intl from "../../intl/intl.jsx";

class SocialAccounts extends React.Component {
  render () {
    return (
      <div style={style.base}>
        <div style={style.buttons}>{
          ["weibo", "wechat", "facebook", "twitter"].map((name, index) => {
            return (
              <img key={"SocialAccounts" + name}
                   style={{...style.button}} src={require("./" + name + ".png")}/>
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
    width: "37px",
    height: "37px",
    float: "left",
    textAlign: "center",
    cursor: "pointer",
    margin: "0 5px 0 5px",
    userSelect: "none",
    textDecoration: "none"
  }
};

export default Radium(SocialAccounts);
