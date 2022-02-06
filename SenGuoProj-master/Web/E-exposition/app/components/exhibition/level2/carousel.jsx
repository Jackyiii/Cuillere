import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import Intl from "../../intl/intl.jsx";

let imgSize = 112;

class CarouselImageItem extends React.Component {
  constructor (props) {
    super(props);
  }

  mouseEnter (event) {
    this.setState({hover: true});
  }

  mouseLeave () {
    this.setState({hover: false});
  }

  render () {
    return (
      <div style={carouselImageItemStyle.base} onClick={this.props.onClick}>
        <img key={`CarouselImage` + Math.random()} draggable={false}
             onMouseEnter={(event) => { this.mouseEnter(event) }}
             onMouseLeave={(event) => { this.mouseLeave(event) }}
             style={[carouselImageItemStyle.image, this.props.curr ? {border: "1px solid #000000"} : null]}
             src={this.props.image}/>
      </div>
    );
  }
}

let carouselImageItemStyle = {
  base: {
    float: "left",
    padding: "5px 2.5px",
    width: imgSize + "px",
    height: imgSize + "px",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",
    ":hover": {
      padding: "0 2.5px",
      width: imgSize + 8 + "px",
      height: imgSize + 8 + "px",
    },
  },
  image: {
    userDrag: "none",
    userSelect: "none",
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
};

CarouselImageItem = Radium(CarouselImageItem);

class CarouselImageList extends React.Component {
  itemWidth = 300;
  listWidthOffset = 60;

  constructor (props) {
    super(props);

    this.dragState = {
      enableDrag: false,
      enterList: false,
      mouseDown: false,
      dragStartPosX: 0,
      MarginLeftStartPosX: 0
    };

    this.state = {
      itemArray: [0, 1, 2, 3, 4, 5],
      listWidth: 0,
      contentMarginLeft: 0
    }
  }

  componentDidMount () {
    window.addEventListener("resize", this.updateListWidth.bind(this));
    this.getListWidth();
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.updateListWidth.bind(this));
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps (props) {
    this.setState({contentMarginLeft: -((imgSize + 5) * (props.index - 3))});
  }

  getListWidth () {
    let newListWidth = Math.max((this.state.itemArray.length * this.itemWidth), window.innerWidth) + this.listWidthOffset;

    if (this.state.listWidth > newListWidth || this.state.listWidth < newListWidth) {
      let newState = {};
      newState.listWidth = newListWidth;
      this.setState(newState);
    }

    return newListWidth;
  }

  updateListWidth () {
    if (window.innerWidth > this.state.listWidth) {
      let newState = {};
      newState.windowWidth = this.getListWidth();

      this.setState(newState);
    }
  }

  mouseDown (event) {
    if (this.dragState.enterList) {
      this.dragState.enableDrag = true;
      this.dragState.dragStartPosX = event.pageX;
      this.dragState.MarginLeftStartPosX = this.state.contentMarginLeft;
    }
  }

  mouseUp (event) {
    this.dragState.enableDrag = false;
  }

  mouseEnter (event) {
    this.dragState.enterList = true;
  }

  mouseLeave (event) {
    this.dragState.enterList = false;
  }

  mouseMove (event) {
    do {
      if (!this.dragState.enableDrag)
        break;

      if (!this.dragState.enterList)
        break;

      if (this.state.listWidth < window.innerWidth)
        break;

      let maxMargin = 0;
      let minMargin = (window.innerWidth - this.state.listWidth);
      let newMarginLeft = this.dragState.MarginLeftStartPosX + (event.pageX - this.dragState.dragStartPosX);

      if (newMarginLeft > maxMargin) {
        this.dragState.MarginLeftStartPosX = maxMargin;
        this.dragState.dragStartPosX = event.pageX;
        newMarginLeft = maxMargin;
      } else if (newMarginLeft < minMargin) {
        this.dragState.MarginLeftStartPosX = minMargin;
        this.dragState.dragStartPosX = event.pageX;
        newMarginLeft = minMargin;
      }

      if (newMarginLeft < this.state.contentMarginLeft || newMarginLeft > this.state.contentMarginLeft) {
        let newState = {};
        newState.contentMarginLeft = newMarginLeft;
        this.setState(newState);
      }
    } while (false);
  }

  listContentRender () {
    let contentListStyle = carouselImageListStyle.listContent;
    contentListStyle["marginLeft"] = this.state.contentMarginLeft + "px";
    contentListStyle["width"] = this.state.listWidth + "px";

    return (
      <div style={contentListStyle}>
        {
          this.props.images.map((image, index) => {
              return (
                <CarouselImageItem key={"CarouselImageItem/" + index} image={image}
                                   curr={this.props.index === index}
                                   onClick={() => {this.props.onChange(index)}}/>
              )
            }
          )
        }
      </div>
    );
  }

  render () {
    return (
      <div style={carouselImageListStyle.base}
           onMouseMove={(event) => { this.mouseMove(event) }}
           onMouseEnter={(event) => { this.mouseEnter(event) }}
           onMouseLeave={(event) => { this.mouseLeave(event) }}
           onMouseDown={(event) => { this.mouseDown(event) }}
           onMouseUp={(event) => { this.mouseUp(event) }}>
        {this.listContentRender()}
      </div>
    );
  }
}

let carouselImageListStyle = {
  base: {
    width: "100%",
    height: imgSize + 10 + "px",
    marginLeft: "0",
    marginRight: "0",
    overflow: "hidden"
  },
  listContent: {
    width: "100%",
    height: imgSize + 10 + "px",
    userSelect: "none",
  }
};

CarouselImageList = Radium(CarouselImageList);
export default CarouselImageList;
