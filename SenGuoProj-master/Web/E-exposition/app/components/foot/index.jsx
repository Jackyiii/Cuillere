/**
 * Created by zhaojunbo on 2017/5/22.
 */

import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Intl from "../intl/intl.jsx";

class FootBanner extends React.Component {
  render() {
    return (
      <div>
        <img style={footBannerStyle.base} src={this.props.bannerImage} alt="" />
      </div>
    );
  }
}

let footBannerStyle = {
  base: {
    width: "100%"
  }
};

FootBanner.protoTypes = {
  bannerImage: PropTypes.string
};

FootBanner = Radium(FootBanner);

class Partner extends React.Component {
  renderLinkItem(linkUrl, linkImage) {
    let linkStyle = partnerStyle.linkItemContent;
    linkStyle["background"] = "url(" + linkImage + "）";

    return (
      <div style={partnerStyle.linkItemWrapper}>
        <Link to={linkUrl}>
          <div style={partnerStyle.linkItemContent}>

          </div>
        </Link>
      </div>
    )
  }

  render() {
    return (
      <div style={partnerStyle.base}>
        <div style={partnerStyle.title}>
          合作伙伴
                </div>
        <div style={partnerStyle.partnerLink}>
          {this.renderLinkItem("url 1", "image 1")}
          {this.renderLinkItem("url 2", "image 1")}
          {this.renderLinkItem("url 3", "image 1")}
          {this.renderLinkItem("url 4", "image 1")}
          {this.renderLinkItem("url 5", "image 1")}
        </div>
      </div>
    );
  }
}

let partnerStyle = {
  base: {
    width: "750px",
    marginTop: "95px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  title: {
    height: "31px",
    lineHeight: "31px",
    textAlign: "center"
  },
  partnerLink: {
    height: "90px",
    width: "100%",
    marginTop: "56px"
  },
  linkItemWrapper: {
    float: "left",
    width: "90px",
    height: "90px",
    marginLeft: "30px",
    marginRight: "30px"
  },
  linkItemContent: {
    width: "90px",
    height: "90px"
  }
};

Partner = Radium(Partner);

class AboutUs extends React.Component {
  render() {
    return (
      <div style={aboutUsStyle.base}>
        <div style={aboutUsStyle.content}>
          <div style={aboutUsStyle.footLink}>
            关于
                    </div>
          <div style={aboutUsStyle.footLink}>
            联系方式
                    </div>
          <div style={aboutUsStyle.footLink}>
            加入我们
                    </div>
          <div style={aboutUsStyle.footLink}>
            帮助中心
                    </div>
        </div>
        <div style={aboutUsStyle.info}>
          <div style={aboutUsStyle.leftInfo}>
            <div style={aboutUsStyle.infoTitle}>
              KORA STUDIO
                        </div>
            <div style={aboutUsStyle.infoBody}>
              Données personnelles
                            Mentions légales
                            Qui sommes-nous ?
                        </div>
            <div style={aboutUsStyle.infoBottom}>
              look on map
                        </div>
          </div>
          <div style={aboutUsStyle.rightInfo}>
            <div style={aboutUsStyle.infoTitle} />
            <div style={aboutUsStyle.infoBody}>
              p.123.4556.789-91
                            E.porter@gmail.com
                            corrige@kora.com
                        </div>
            <div style={aboutUsStyle.infoBottom}>
              to us
                        </div>
          </div>
          <div style={aboutUsStyle.centerLogo} />
          <div style={aboutUsStyle.centerArrow} />
        </div>
      </div>
    )
  }

  /*
  render() {
      return (
          <div style={aboutUsStyle.base}>
              <div style={aboutUsStyle.content}>
                  <Link style={aboutUsStyle.footLink} to={"/about"} >
                          关于
                  </Link>
                  <Link style={aboutUsStyle.footLink} to={"/contact"}>
                          联系方式
                  </Link>
                  <Link style={aboutUsStyle.footLink} to={"/joinus"}>
                          加入我们
                  </Link>
                  <Link style={aboutUsStyle.footLink} to={"/helpcenter"}>
                          帮助中心
                  </Link>
              </div>
          </div>
      )
  }
  */
}

let aboutUsStyle = {
  base: {
    height: "322px",
    width: "100%",
    marginTop: "80px",
    paddingTop: "55px",
    backgroundColor: "#ECECEC"
  },
  content: {
    height: "24px",
    width: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#000000"
  },
  footLink: {
    float: "left",
    marginLeft: "40px",
    marginRight: "40px",
    fontSize: "18px"
  },
  info: {
    width: "880px",
    height: "140px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  centerLogo: {
    height: "100px",
    width: "100px",
    marginTop: "50px",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "50%",
    backgroundColor: "#ffffff"
  },
  centerArrow: {
    height: "12px",
    width: "12px",
    marginTop: "23px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#747474"
  },
  leftInfo: {
    float: "left",
    height: "140px",
    width: "130px",
    textAlign: "left",
  },
  rightInfo: {
    float: "right",
    height: "140px",
    width: "130px",
    textAlign: "right",
  },
  infoTitle: {
    height: "16px",
    fontSize: "12px",
    color: "#747474"
  },
  infoBody: {
    height: "60px",
    marginTop: "12px",
    fontSize: "10px",
    color: "#282828"
  },
  infoBottom: {
    height: "18px",
    marginTop: "30px",
    fontSize: "10px",
    color: "#282828"
  }
};

AboutUs = Radium(AboutUs);

class Foot extends React.Component {
  render() {
    return (
      <div style={footStyle.base}>
        <FootBanner bannerImage="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505625050487&di=7ea599ae15612c76589927312f666b81&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F13%2F56%2F79%2F63M58PICIBY_1024.jpg" />
        <Partner />
        <AboutUs />
      </div>
    );
  }
}

let footStyle = {
  base: {
    width: "100%",
    minWidth: "900px",
    clear: "both",
  },
  footBanner: {
    width: "100%",
    height: "305px"
  }
};

export default Foot;
