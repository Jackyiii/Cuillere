import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";


class SingleLineEditor extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      content: "",
      maxLength: 50
    }
  }

  contentChange (titleString) {
    let newState = {};
    newState.content = titleString;
    this.setState(newState);

    this.props.setContent(titleString);
  }

  renderCount () {
    if (this.props.maxLength <= 0) {
      return null;
    } else {
      let countText = this.state.content.length + "/" + this.state.maxLength;
      return (
        <div style={singleLineEditorStyle.count}>
          {countText}
        </div>
      )
    }
  }

  render () {
    return (
      <div style={singleLineEditorStyle.base}>
        <div style={singleLineEditorStyle.title}>
          {this.props.title}
        </div>
        <div style={singleLineEditorStyle.inputWrapper}>
          <input style={singleLineEditorStyle.titleInput} type="text" maxLength={this.state.maxLength}
                 placeholder={this.props.placeHolder}
                 onChange={(event) => { this.contentChange(event.target.value) }}
                 onBlur={(event) => { this.props.setTitle(event.target.value) }}
          />
          {this.renderCount()}
        </div>
      </div>
    )
  }
}

SingleLineEditor.propTypes = {
  setContent: PropTypes.func,
  title: PropTypes.string,
  placeHolder: PropTypes.string,
  maxLength: PropTypes.number
};

let singleLineEditorStyle = {
  base: {
    position: "relative",
    width: "310px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px"
  },
  title: {
    height: "17px",
    lineHeight: "17px",
    marginTop: "20px",
    marginBottom: "10px",
    textAlign: "left",
    color: "#404040"
  },
  inputWrapper: {
    height: "40px",
    border: "1px solid #979797"
  },
  titleInput: {
    height: "30px",
    lineHeight: "30px",
    width: "240px",
    marginLeft: "10px",
    marginTop: "5px",
    outline: "none",
    border: "none"
  },
  count: {
    float: "right",
    height: "20px",
    lineHeight: "20px",
    width: "40px",
    marginTop: "10px",
    marginRight: "10px",
    color: "#a1a1a1",
    fontSize: "12px",
    textAlign: "right"
  }
};

SingleLineEditor = Radium(SingleLineEditor);

class DateSelectInput extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      timeText: "",
      showInputDate: false
    };
  }

  /*
   inputChanged(event){
   let newState = {};
   newState.timeText = event.target.value;
   this.setState(newState);
   this.props.timeChanged(event.target.value);
   }
   */

  inputFocused (event) {
    if (!this.state.showInputDate) {
      let newState = {};
      newState.showInputDate = true;
      this.setState(newState);
    }
  }

  inputBlurred (event) {
    let newState = {};
    newState.timeText = event.target.value;

    if (this.state.timeText === "") {
      let newState = {};
      newState.showInputDate = false;
    }

    this.setState(newState);
    this.props.timeChanged(event.target.value);
  }

  render () {
    let inputType = this.state.showInputDate ? "date" : "text";

    let inputId = "timeSelect " + this.props.placeholder;

    //<label style={dateSelectInputStyle.hintImage} htmlFor={inputId}/>
    return (
      <div style={dateSelectInputStyle.base}>
        <div style={dateSelectInputStyle.dateWrapper}>
          <input style={dateSelectInputStyle.dateInput}
                 type={inputType}
                 placeholder={this.props.placeholder}
                 min={this.props.minDate}
                 id={inputId}
            //onChange={(event)=>this.inputChanged(event)}
                 onFocus={(event) => this.inputFocused(event)}
                 onBlur={(event) => this.inputBlurred(event)}
          />
        </div>
      </div>
    );
  }
}

DateSelectInput.PropTypes = {
  minDate: PropTypes.string,
  placeholder: PropTypes.string,
  timeChanged: PropTypes.func
};

let dateSelectInputStyle = {
  base: {
    width: "148px",
    height: "40px",
    border: "1px solid #979797"
  },
  hintImage: {
    float: "right",
    width: "16px",
    height: "8px",
    marginRight: "10px",
    marginTop: "16px",
    backgroundColor: "#00ff00"
  },
  dateWrapper: {
    float: "left",
    height: "30px",
    width: "140px",
    marginLeft: "5px",
    marginTop: "5px",
  },
  dateInput: {
    height: "30px",
    width: "140px",
    appearance: "none",
    border: "none",
    fontFamily: "Helvetica arial, sans-serif",
    fontSize: "18px",
    outline: "none"
  }
};

DateSelectInput = Radium(DateSelectInput);

class DateSelection extends React.Component {
  constructor (props) {
    super(props);

    let today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() + 1);
    let day = today.getDate();

    let todayText = year.toString() + "-" +
      (month >= 10 ? month.toString() : "0" + month.toString()) + "-" +
      (day >= 10 ? day.toString() : "0" + day.toString());

    this.state = {
      startDate: todayText,
      endDate: todayText
    };
  }

  startTimeChanged (startTime) {
    let newState = {};
    newState.endDate = startTime;
    this.setState(newState);

    this.props.setExpStartTime(startTime);
  }

  endTimeChanged (endTime) {
    this.props.setExpEndTime(endTime);
  }

  render () {
    return (
      <div style={dateSelectionStyle.base}>
        <div style={dateSelectionStyle.title}>
          {"展览时间"}
        </div>
        <div style={dateSelectionStyle.wrapper}>
          <div style={dateSelectionStyle.startTIme}>
            <DateSelectInput minDate={this.state.startDate} placeholder={"state time"}
                             timeChanged={this.startTimeChanged.bind(this)}/>
          </div>
          <div style={dateSelectionStyle.endTime}>
            <DateSelectInput minDate={this.state.endDate} placeholder={"end time"}
                             timeChanged={this.endTimeChanged.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

DateSelection.propTypes = {
  setExpStartTime: PropTypes.func,
  setExpEndTime: PropTypes.func
};

let dateSelectionStyle = {
  base: {
    width: "310px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  title: {
    height: "17px",
    lineHeight: "17px",
    marginTop: "20px",
    marginBottom: "10px",
    textAlign: "left",
    color: "#404040"
  },
  wrapper: {
    height: "40px",
    width: "310px"
  },
  startTIme: {
    float: "left",
    width: "148px",
    height: "40px"
  },
  endTime: {
    float: "right",
    width: "148px",
    height: "40px"
  }
};

DateSelection = Radium(DateSelection);

class AbstractEditor extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      abstract: "",
      maxLength: 300
    }
  }

  titleChange (titleString) {
    let newState = {};
    newState.abstract = titleString;
    this.setState(newState);
  }

  render () {
    let countText = this.state.abstract.length + "/" + this.state.maxLength;

    return (
      <div style={abstractEditorStyle.base}>
        <div style={abstractEditorStyle.title}>
          {"简介"}
        </div>
        <div style={abstractEditorStyle.inputWrapper}>
          <textarea style={abstractEditorStyle.abstractInput} maxLength={this.state.maxLength}
                    placeholder={""}
                    onChange={(event) => { this.titleChange(event.target.value) }}
                    onBlur={(event) => { this.props.setTitle(event.target.value) }}
          />
          <div style={abstractEditorStyle.count}>
            {countText}
          </div>
        </div>
      </div>
    )
  }
}

AbstractEditor.propTypes = {
  setAbstract: PropTypes.func
};

let abstractEditorStyle = {
  base: {
    position: "relative",
    width: "310px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px"
  },
  title: {
    height: "17px",
    lineHeight: "17px",
    marginTop: "20px",
    marginBottom: "10px",
    textAlign: "left",
    color: "#404040"
  },
  inputWrapper: {
    position: "relative",
    height: "124px",
    border: "1px solid #979797"
  },
  abstractInput: {
    height: "100px",
    width: "280px",
    marginLeft: "10px",
    marginTop: "5px",
    overflow: "hidden",
    resize: "none",
    outline: "none",
    border: "none"
  },
  count: {
    position: "absolute",
    height: "20px",
    lineHeight: "20px",
    width: "80px",
    top: "100px",
    right: "10px",
    color: "#a1a1a1",
    fontSize: "12px",
    textAlign: "right"
  }
};

AbstractEditor = Radium(AbstractEditor);

class CostSelection extends React.Component {
  constructor (props) {
    super(props);

    this.dropDownContent = ["免费", "付费"];
    this.freeContentIndex = 0;

    this.state = {
      needCost: false,
      showDropDown: false,
      selectedText: this.dropDownContent[0]
    };
  }

  componentDidMount () {
    window.addEventListener("click", event => { this.handleWindowClick(event) });
  }

  componentWillUnmount () {
    window.removeEventListener("click", event => { this.handleWindowClick(event) });
  }

  handleWindowClick (event) {
    let newState = {};
    newState.showDropDown = false;
    this.setState(newState);
  }

  dropDownBtnClick (event) {
    let newState = {};
    newState.showDropDown = !this.state.showDropDown;
    this.setState(newState);

    event.stopPropagation();
  }

  dropDownItemClick (event) {
    let selectText = event.target.textContent;

    let newState = {};
    newState.selectedText = selectText;
    newState.showDropDown = false;
    newState.needCost = (selectText === this.dropDownContent[this.freeContentIndex]) ? false : true;
    this.setState(newState);

    event.stopPropagation();

    this.props.setExpType(selectText);
  }

  onPayChanged (event) {
    let cost = parseInt(event.target.value, 10);
    this.props.setExpCost(cost);
  }

  onPayBlur (event) {
    let cost = parseInt(event.target.value, 10);
    this.props.setExpCost(cost);
  }

  renderDropDownList () {
    if (!this.state.showDropDown) {
      return null;
    } else {
      let self = this;
      return (
        <div style={typeSelectionStyle.dropDownList}>
          {this.dropDownContent.map(
            function (content, index) {
              return (
                <div key={"baseInfoDropDownItem_" + index} style={typeSelectionStyle.dropDownItem}
                     onClick={(event) => self.dropDownItemClick(event)}>
                  <p style={typeSelectionStyle.text}>
                    {content}
                  </p>
                </div>
              );
            }
          )}
        </div>
      )
    }
  }

  renderCostEditor () {
    if (!this.state.needCost) {
      return null;
    } else {
      return (
        <div style={typeSelectionStyle.costWrapper}>
          <input style={typeSelectionStyle.costInput} type="number" maxLength={this.state.maxLength}
                 placeholder={"Please enter cost"}
                 onChange={(event) => {
                   this.titleChange(event.target.value)
                 }}
                 onBlur={(event) => {
                   this.props.setTitle(event.target.value)
                 }}
          />
        </div>
      )
    }
  }

  render () {
    return (
      <div style={typeSelectionStyle.base}>
        <div style={typeSelectionStyle.title}>
          {"门票"}
        </div>
        <div style={typeSelectionStyle.selector}>
          <div style={typeSelectionStyle.selectItem}>
            <p style={typeSelectionStyle.text}>
              {this.state.selectedText}
            </p>
          </div>
          <div style={typeSelectionStyle.dropDownBtn} onClick={(event) => this.dropDownBtnClick(event)}/>
          {this.renderDropDownList()}
          {this.renderCostEditor()}
        </div>
      </div>
    );
  }
}

CostSelection.propTypes = {
  setExpType: PropTypes.func
};

let typeSelectionStyle = {
  base: {
    width: "310px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  title: {
    height: "17px",
    lineHeight: "17px",
    textAlign: "left",
    marginTop: "20px",
    marginBottom: "10px",
    color: "#404040"
  },
  selector: {
    position: "relative",
    width: "310px",
    display: "relative"
  },
  dropDownBtn: {
    position: "absolute",
    right: "10px",

    display: "block",
    transform: "translate(0, -200%)",
    borderColor: "#999 transparent transparent",
    borderStyle: "solid",
    borderWidth: "10px 5px 0",
    content: "' '",
  },
  openArrow: {
    borderColor: "transparent transparent #999",
    borderWidth: "0 5px 10px",
  },
  selectItem: {
    height: "40px",
    lineHeight: "40px",
    textAlign: "left",
    color: "#404040",
    border: "1px solid #979797",
  },
  text: {
    height: "30px",
    lineHeight: "30px",
    width: "280px",
    marginLeft: "10px",
    marginTop: "5px"
  },
  dropDownItem: {
    height: "40px",
    lineHeight: "40px",
    textAlign: "left",
    color: "#404040",
    borderTop: "1px solid #979797"
  },
  dropDownList: {
    position: "absolute",
    width: "308px",
    height: "80px",
    backgroundColor: "#ffffff",
    borderLeft: "1px solid #979797",
    borderRight: "1px solid #979797",
    borderBottom: "1px solid #979797",
    cursor: "pointer",
    userSelect: "none"
  },
  costWrapper: {
    height: "40px",
    marginTop: "20px",
    border: "1px solid #979797"
  },
  costInput: {
    height: "30px",
    lineHeight: "30px",
    width: "240px",
    marginLeft: "10px",
    marginTop: "5px",
    outline: "none",
    border: "none"
  }
};

CostSelection = Radium(CostSelection);

class ModuleSelect extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div style={moduleSelectStyle.base}>
        <div style={moduleSelectStyle.title}>
          {"模版"}
        </div>
        <div style={moduleSelectStyle.content}>
          <div style={moduleSelectStyle.gridType}>
            <div style={moduleSelectStyle.typeTitle}>
              {"竖列"}
            </div>
            <div style={moduleSelectStyle.typeContent}>
              <div style={moduleSelectStyle.gridItem}/>
              <div style={moduleSelectStyle.gridItem}/>
              <div style={moduleSelectStyle.gridItem}/>
              <div style={moduleSelectStyle.gridItem}/>
              <div style={moduleSelectStyle.gridItem}/>
              <div style={moduleSelectStyle.gridItem}/>
              <div style={moduleSelectStyle.gridItem}/>
              <div style={moduleSelectStyle.gridItem}/>
              <div style={moduleSelectStyle.gridItem}/>
            </div>
          </div>
          <div style={moduleSelectStyle.listType}>
            <div style={moduleSelectStyle.typeTitle}>
              {"平铺"}
            </div>
            <div style={moduleSelectStyle.typeContent}>
              <div style={moduleSelectStyle.listItem}/>
              <div style={moduleSelectStyle.listItem}/>
              <div style={moduleSelectStyle.listItem}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

let moduleSelectStyle = {
  base: {
    width: "310px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  title: {
    height: "17px",
    lineHeight: "17px",
    textAlign: "left",
    marginTop: "20px",
    marginBottom: "10px",
    color: "#404040"
  },
  content: {
    width: "310px",
    height: "200px"
  },
  gridType: {
    float: "left",
    height: "200px",
    width: "150px",
    border: "1px solid #979797"
  },
  listType: {
    float: "right",
    height: "200px",
    width: "150px",
    border: "1px solid #979797"
  },
  typeTitle: {
    height: "16px",
    marginTop: "15px",
    color: "#a1a1a1",
    fontSize: "12px",
    textAlign: "center"
  },
  typeContent: {
    width: "138px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  gridItem: {
    float: "left",
    height: "38px",
    width: "38px",
    marginTop: "10px",
    marginLeft: "3px",
    marginRight: "3px",
    backgroundColor: "#ececec",
    border: "1px solid #979797"
  },
  listItem: {
    float: "left",
    height: "38px",
    width: "132px",
    marginTop: "10px",
    marginLeft: "3px",
    marginRight: "3px",
    backgroundColor: "#ececec",
    border: "1px solid #979797"
  }
};

ModuleSelect = Radium(ModuleSelect);

class CommonSelection extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showDropDown: false,
      selectedText: this.props.dropDownArray[0]
    };
  }

  componentDidMount () {
    window.addEventListener("click", event => { this.handleWindowClick(event) });
  }

  componentWillUnmount () {
    window.removeEventListener("click", event => { this.handleWindowClick(event) });
  }

  handleWindowClick (event) {
    let newState = {};
    newState.showDropDown = false;
    this.setState(newState);
  }

  dropDownBtnClick (event) {
    let newState = {};
    newState.showDropDown = !this.state.showDropDown;
    this.setState(newState);

    event.stopPropagation();
  }

  dropDownItemClick (event) {

    let selectText = event.target.textContent;

    let newState = {};
    newState.selectedText = selectText;
    newState.showDropDown = false;
    this.setState(newState);

    event.stopPropagation();

    this.props.selectTypeFunc(selectText);
  }

  renderDropDownList () {
    if (!this.state.showDropDown) {
      return null;
    } else {
      let self = this;
      return (
        <div style={commonSelectionStyle.dropDownList}>
          {this.props.dropDownArray.map(
            function (content, index) {
              return (
                <div key={"baseInfoDropDownItem_" + index} style={commonSelectionStyle.dropDownItem}
                     onClick={(event) => self.dropDownItemClick(event)}>
                  <p style={commonSelectionStyle.text}>
                    {content}
                  </p>
                </div>
              );
            }
          )}
        </div>
      )
    }
  }

  render () {
    return (
      <div style={commonSelectionStyle.base}>
        <div style={commonSelectionStyle.title}>
          {this.props.title}
        </div>
        <div style={commonSelectionStyle.selector}>
          <div style={commonSelectionStyle.selectItem}>
            <p style={commonSelectionStyle.text}>
              {this.state.selectedText}
            </p>
          </div>
          <div
            style={[commonSelectionStyle.dropDownBtn, this.state.showDropDown ? commonSelectionStyle.openArrow : null]}
            onClick={(event) => this.dropDownBtnClick(event)}/>
          {this.renderDropDownList()}
        </div>
      </div>
    );
  }
}

CommonSelection.propTypes = {
  title: PropTypes.string,
  dropDownArray: PropTypes.array,
  selectTypeFunc: PropTypes.func
};

let commonSelectionStyle = {
  base: {
    width: "310px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  title: {
    height: "17px",
    lineHeight: "17px",
    textAlign: "left",
    marginTop: "20px",
    marginBottom: "10px",
    color: "#404040"
  },
  selector: {
    position: "relative",
    width: "310px",
    height: "40px",
    border: "1px solid #979797",
    display: "relative"
  },
  dropDownBtn: {
    position: "absolute",
    right: "10px",

    display: "block",
    transform: "translate(0, -250%)",
    borderColor: "#999 transparent transparent",
    borderStyle: "solid",
    borderWidth: "10px 5px 0",
    content: "' '",
  },
  openArrow: {
    borderColor: "transparent transparent #999",
    borderWidth: "0 5px 10px",
  },
  selectItem: {
    height: "40px",
    lineHeight: "40px",
    textAlign: "left",
    color: "#404040"
  },
  text: {
    height: "30px",
    lineHeight: "30px",
    width: "280px",
    marginLeft: "10px",
    marginTop: "5px"
  },
  dropDownItem: {
    height: "40px",
    lineHeight: "40px",
    textAlign: "left",
    color: "#404040",
    borderTop: "1px solid #979797",
    cursor: "pointer",
    userSelect: "none"
  },
  dropDownList: {
    position: "absolute",
    width: "310px",
    backgroundColor: "#ffffff",
    borderLeft: "1px solid #979797",
    borderRight: "1px solid #979797",
    borderBottom: "1px solid #979797",
    zIndex: "10"
  }
};

CommonSelection = Radium(CommonSelection);

class CoverEditor extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      coverImage: ""
    }
  }

  renderCoverImage () {
    if (this.state.coverImage === "" || this.state.coverImage === null) {
      return null;
    } else {
      return (
        <div key={"coverEditor_" + "coverImage"} style={coverEditorStyle.coverImage}>
          <img src="" alt=""/>
        </div>
      )
    }
  }

  render () {
    return (
      <div key={"coverEditor_" + "base"} style={coverEditorStyle.base}>
        <div key={"coverEditor_" + "title"} style={coverEditorStyle.titleWrapper}>
          <span style={coverEditorStyle.title}>
            {"设置封面"}
          </span>
          <span style={coverEditorStyle.subTitle}>
            {"（图片长宽比为3:2）"}
          </span>
        </div>
        <div key={"coverEditor_" + "action"} style={coverEditorStyle.content}>
          <div style={coverEditorStyle.actionWrapper}>
            <div key={"coverEditor_" + "localSelect"} style={coverEditorStyle.localSelect}>
              {"本地上传"}
            </div>
            <div key={"coverEditor_" + "gallerySelect"} style={coverEditorStyle.gallerySelect}>
              {"图片库选择"}
            </div>
          </div>
        </div>
        {this.renderCoverImage()}
      </div>
    )
  }
}

CoverEditor.propTypes = {
  setCoverImage: PropTypes.func
};

let coverEditorStyle = {
  base: {
    width: "310px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  titleWrapper: {
    width: "100%",
    height: "17px",
    marginTop: "20px",
    marginBottom: "10px"
  },
  title: {
    fontSize: "13px",
    color: "#404040"
  },
  subTitle: {
    fontSize: "12px",
    color: "#747474"
  },
  content: {
    width: "310px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  actionWrapper: {
    width: "100%",
    height: "40px"
  },
  localSelect: {
    float: "left",
    height: "40px",
    lineHeight: "40px",
    width: "148px",
    textAlign: "center",
    fontSize: "17px",
    border: "1px solid #979797",
    userSelect: "none",
    cursor: "pointer",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      backgroundColor: "#979797",
      color: "#ffffff"
    },
    ":active": {
      backgroundColor: "#404040",
      color: "#ffffff"
    }
  },
  gallerySelect: {
    float: "right",
    height: "40px",
    lineHeight: "40px",
    width: "148px",
    textAlign: "center",
    fontSize: "17px",
    border: "1px solid #979797",
    userSelect: "none",
    cursor: "pointer",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      backgroundColor: "#979797",
      color: "#ffffff"
    },
    ":active": {
      backgroundColor: "#404040",
      color: "#ffffff"
    }
  },
  coverImage: {
    height: "222px",
    width: "148px",
    marginTop: "20px"
  }
};

CoverEditor = Radium(CoverEditor);

class GalleryView extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div style={galleryViewStyle.base}>
        <div style={galleryViewStyle.modal}>
          <div key={"galleryView_content"} style={galleryViewStyle.content}>

          </div>
          <div key={"galleryView_actions"} style={galleryViewStyle.actions}>
            <div key={"galleryView_cancel"} style={galleryViewStyle.cancel}>
              {"取消"}
            </div>
            <div key={"galleryView_confirm"} style={galleryViewStyle.confirm}>
              {"确定"}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

let galleryViewStyle = {
  base: {
    height: "100%",
    width: "100%",
    position: "fixed",
    top: "0px",
    left: "0px",
    zIndex: "1000",
    userSelect: "none",
    backgroundColor: "rgba(89,89,89,0.64)"
  },
  modal: {
    height: "712px",
    width: "786px",
    position: "absolute",
    left: "50%",
    top: "50%",
    marginTop: "-356px",
    marginLeft: "-393px",
    border: "1px solid #979797",
    backgroundColor: "#ffffff",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
  },
  content: {
    width: "698px",
    height: "565px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "43px",
    padding: "10px",
    border: "1px solid #979797"
  },
  actions: {
    height: "30px",
    width: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
    marginBottom: "30px"
  },
  cancel: {
    float: "left",
    width: "80px",
    height: "30px",
    lineHeight: "30px",
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    textAlign: "center",
    color: "#979797",
    cursor: "pointer",
    userSelect: "none",
    border: "1px solid #979797",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      backgroundColor: "#979797",
      color: "#ffffff"
    },
    ":active": {
      backgroundColor: "#404040",
      color: "#ffffff"
    }
  },
  confirm: {
    float: "right",
    width: "80px",
    height: "30px",
    lineHeight: "30px",
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    textAlign: "center",
    color: "#979797",
    cursor: "pointer",
    userSelect: "none",
    border: "1px solid #979797",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      backgroundColor: "#979797",
      color: "#ffffff"
    },
    ":active": {
      backgroundColor: "#404040",
      color: "#ffffff"
    }
  }
};

GalleryView = Radium(GalleryView);

class EditDetail extends React.Component {
  constructor (props) {
    super(props);

    this.regionContent = ["全球", "中国", "美国", "法国", "英国"];

    this.subjectContent = [
      "毕业设计展", "摄影作品", "旅行博主", "美食博主", "插画作品", "独立设计师作品",
      "艺术家作品", "模特展示", "服装设计", "首饰设计", "皮具设计", "陶瓷设计",
      "香味设计", "产品设计", "电子音乐"
    ];

    this.organizationContent = ["个人", "官方", "企业"];
  }

  render () {
    SingleLineEditor.propTypes = {
      setContent: PropTypes.func,
      title: PropTypes.string,
      placeHolder: PropTypes.string,
      maxLength: PropTypes.number
    };

    return (
      <div style={editDetailStyle.base}>
        <div>
          <SingleLineEditor title={"名称"} maxLength={50} placeHolder={""}
                            setContent={this.props.setTitle}
          />
          <DateSelection/>
          <AbstractEditor/>
          <CostSelection/>
          <ModuleSelect/>
          <CommonSelection title={"国家"}
                           dropDownArray={this.regionContent}
                           selectTypeFunc={this.props.selectCountry}
          />
          <CommonSelection title={"专业"}
                           dropDownArray={this.subjectContent}
                           selectTypeFunc={this.props.selectSubject}
          />
          <CommonSelection title={"策展方"}
                           dropDownArray={this.organizationContent}
                           selectTypeFunc={this.props.selectOrganization}
          />
          <SingleLineEditor title={"标签"} maxLength={0} placeHolder={"至多用用5个标签，请用空格键隔开"}
                            setContent={this.props.setTags}
          />
          <CoverEditor/>

          <div style={editDetailStyle.actions}>
            <div key={"editDetail_preview"} style={editDetailStyle.preview}>
              {"预览"}
            </div>
            <div key={"editDetail_confirm"} style={editDetailStyle.confirm}>
              {"发布"}
            </div>
          </div>
        </div>
      </div>

    )
  }
}

EditDetail.propTypes = {
  setTitle: PropTypes.func,
  selectCountry: PropTypes.func,
  selectSubject: PropTypes.func,
  selectOrganization: PropTypes.func,
  setTags: PropTypes.func,
  setCover: PropTypes.func,
  previewExhibition: PropTypes.func,
  confirmExhibition: PropTypes.func
};

let editDetailStyle = {
  base: {
    height: "634px",
    width: "360px",
    overflow: "auto",
    border: "1px solid #979797"
  },
  actions: {
    height: "30px",
    width: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
    marginBottom: "30px"
  },
  preview: {
    float: "left",
    width: "80px",
    height: "30px",
    lineHeight: "30px",
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    textAlign: "center",
    color: "#979797",
    cursor: "pointer",
    userSelect: "none",
    border: "1px solid #979797",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      backgroundColor: "#979797",
      color: "#ffffff"
    },
    ":active": {
      backgroundColor: "#404040",
      color: "#ffffff"
    }
  },
  confirm: {
    float: "right",
    width: "80px",
    height: "30px",
    lineHeight: "30px",
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    textAlign: "center",
    color: "#979797",
    cursor: "pointer",
    userSelect: "none",
    border: "1px solid #979797",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      backgroundColor: "#979797",
      color: "#ffffff"
    },
    ":active": {
      backgroundColor: "#404040",
      color: "#ffffff"
    }
  }
};

EditDetail = Radium(EditDetail);

export default EditDetail;
