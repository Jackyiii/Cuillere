/**
 * Created by zhaojunbo on 2017/7/27.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";
import Intl from "../../intl/intl.jsx";
import Exhibition from "./exhibition";

class ExhibitionList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      listData: []
    }
  }

  listItems () {
    return (
      this.props.list.map((content, index) => {
        return (
          <Exhibition key={content.expId} {...content}/>
        )
      }))
  }

  render () {
    return (
      <div style={exhibitionListStyle.base}>
        <div style={exhibitionListStyle.imageList}>
          {this.listItems()}
          <div style={exhibitionListStyle.imageListEnd}/>
        </div>
      </div>
    );
  }
};

ExhibitionList.propTypes = {
  list: PropTypes.array
};

let exhibitionListStyle = {
  base: {
  },
  wrapper: {
    display: "flex",
    justifyContent: "center"
  },
  imageList: {
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)"
  },
  imageListEnd: {
    clear: "both",
    width: "100%",
    height: "0.1px"
  }
};

ExhibitionList = Radium(ExhibitionList);

export default ExhibitionList;
