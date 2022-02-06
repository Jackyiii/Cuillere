/**
 * Created by zhaojunbo on 2017/5/22.
 */

import React from "react"
import Radium from "radium"
import PropTypes from 'prop-types';

class SearchListItem extends React.Component {
  render () {
    return (
      <div>
        <span>{this.props.content}</span>
      </div>
    );
  }
}

SearchListItem.propTypes = {
  content: PropTypes.string
};

class SearchList extends React.Component {
  render () {
    let style = [searchListStyle.base,
      (!this.props.showMenu) && searchListStyle.hidden];

    let searchItems = this.props.contents.map(
      function (content, index) {
        return (
          <SearchListItem key={"searchListItem_" + index} content={content}/>
        );
      }
    );

    return (
      <div style={style}>
        {searchItems}
      </div>
    );
  }
}

SearchList.propTypes = {
  showMenu: PropTypes.bool,
  contents: PropTypes.array
}

var searchListStyle = {
  base: {
    position: "absolute",
    zIndex: "2",
    width: "200px",
    padding: "0px 10px 0px 15px",
    marginTop: "30px",
    overflow: "hidden",
    background: "#272727",
    borderRadius: "5px",
    display: "block",
    color: "#cccccc"
  },

  hidden: {
    display: "none"
  }
};

SearchList = Radium(SearchList);

class SearchBar extends React.Component {
  handleBlur () {
    console.log("searchbar blured!");
  }

  handleFocus () {
    console.log("searchbar focused!");
  }

  handleChange (event) {
    console.log("searchbar changed!");
    this.props.callbackContentChange(event.target.value);
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log("searchbar submitted!");
  }

  render () {
    return (
      <form className="searchBar" onSubmit={this.handleSubmit}>
        <input style={searchBarSubmitStyle.base} type="submit" key="submit" value=""/>
        <input style={searchBarTextStyle.base} type="text" key="text" placeholder="Search Q&A"
               onBlur={this.handleBlur.bind(this)}
               onFocus={this.handleFocus.bind(this)}
               onChange={this.handleChange.bind(this)}
        />
      </form>
    );
  }
}

SearchBar.propTypes = {
  callbackContentChange: PropTypes.func
};

var searchBarTextStyle = {
  base: {
    float: "right",
    padding: "0px 10px 0px 15px",
    width: "160px",
    height: "25px",
    border: "none",
    outline: "none",
    marginTop: "1px",
    transition: "all 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      width: "200px"
    }
  }
};

var searchBarSubmitStyle = {
  base: {
    float: "right",
    width: "38px",
    height: "25px",
    border: "none",
    outline: "none",
    marginTop: "2px",
    marginLeft: "1px",
    background: "url('src/res/searchBtn.png') center no-repeat",
    cursor: "pointer",
    transition: "all 300ms linear"
  }
};

SearchBar = Radium(SearchBar);

class SearchBtn extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showMenu: false,
      menuLength: 6,
      savedSearchResult: []
    };
  }

  handleWindowClick = () => {
    this.setState({showMenu: false});
  }

  componentDidMount () {
    window.addEventListener("click", this.handleWindowClick);
  }

  componentWillUnmount () {
    window.removeEventListener("click", this.handleWindowClick);
  }

  callbackContentChange = (value) => {
    if (value.length == 0) {
      return;
    }

    let newResults = this.state.savedSearchResult;
    newResults.unshift(value);

    if (newResults.length >= this.state.menuLength) {
      newResults = newResults.slice(0, this.state.menuLength);
    }

    this.setState({showMenu: true});
    this.setState({savedSearchResult: newResults});
    console.log("callback content change %s", value);
  }

  render () {
    return (
      <div style={searchBtnStyle.base}>
        <div style={searchBtnStyle.searchIcon}/>
        <div style={searchBtnStyle.searchText}>SEARCH</div>
      </div>
      //
      // <div style={searchBtnStyle.base}>
      //   <SearchBar callbackContentChange={this.callbackContentChange} />
      //   <SearchList showMenu={this.state.showMenu}
      //     contents={this.state.savedSearchResult} />
      // </div>
    );
  }
}

import searchBtn from "./searchBtn.png"

const searchBtnStyle = {
  base: {
    userSelect: "none",
    cursor: "pointer",
    textDecoration: "none",
  },
  searchIcon: {
    height: "20px",
    width: "20px",
    background: "url('" + searchBtn + "') center no-repeat",
    float: "left"
  },
  searchText: {
    float: "left",
    marginLeft: "2px"
  }
};

SearchBtn = Radium(SearchBtn);

export default SearchBtn;
