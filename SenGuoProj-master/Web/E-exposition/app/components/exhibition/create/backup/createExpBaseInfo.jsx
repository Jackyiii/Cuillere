/**
 * Created by zhaojunbo on 2017/7/21.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";
import Intl from "../../../intl/intl.jsx";

class TypeSelection extends React.Component {

  constructor (props) {
    super(props);

    this.dropDownContent = ["个人", "企业", "学生"];

    this.state = {
      showDropDown: false,
      selectedText: this.dropDownContent[0]
    };
  }

  dropDownBtnClick (event) {
    let newState = {};
    newState.showDropDown = !this.state.showDropDown;
    this.setState(newState);
  }

  dropDownItemClick (event) {
    let newState = {};
    newState.selectedText = event.target.textContent;
    newState.showDropDown = false;
    this.setState(newState);

    this.props.setExpType(event.target.textContent);
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
                  {content}
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
      <div style={typeSelectionStyle.base}>
        <div style={typeSelectionStyle.title}>
          {"please choose exhibition type"}
        </div>
        <div style={typeSelectionStyle.selector}>
          <div style={typeSelectionStyle.dropDownItem}>
            {this.state.selectedText}
          </div>
          <div style={typeSelectionStyle.dropDownBtn} onClick={(event) => this.dropDownBtnClick(event)}/>
          {this.renderDropDownList()}
        </div>
      </div>
    );
  }
}

TypeSelection.propTypes = {
  setExpType: PropTypes.func
};

let typeSelectionStyle = {
  base: {
    width: "570px",
    height: "110px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px"
  },
  title: {
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
    color: "#000000"
  },
  selector: {
    height: "60px",
    backgroundColor: "#ffffff",
    borderRadius: "3px",
  },
  dropDownBtn: {
    position: "absolute",
    width: "40px",
    height: "20px",
    marginLeft: "500px",
    marginTop: "-40px",
    backgroundColor: "#ff0000"
  },
  dropDownItem: {
    height: "60px",
    lineHeight: "60px",
    textAlign: "center",
    color: "#000000"
  },
  dropDownList: {
    position: "absolute",
    marginLeft: "0px",
    marginTop: "10px",
    width: "570px",
    height: "180px",
    backgroundColor: "#00ff00"
  }
};

TypeSelection = Radium(TypeSelection);

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

    return (
      <div style={dateSelectInputStyle.base}>
        <div style={dateSelectInputStyle.hintImage}/>
        <div style={dateSelectInputStyle.dateWrapper}>
          <input style={dateSelectInputStyle.dateInput} placeholder={this.props.placeholder} type={inputType}
                 min={this.props.minDate}
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
    width: "220px",
    height: "55px",
    backgroundColor: "#e0e0e0",
    border: "5px"
  },
  hintImage: {
    float: "left",
    width: "40px",
    height: "40px",
    marginLeft: "10px",
    marginTop: "7px",
    backgroundColor: "#00ff00"
  },
  dateWrapper: {
    float: "left",
    height: "40px",
    width: "150px",
    marginLeft: "5px",
    marginTop: "7px",
  },
  dateInput: {
    height: "40px",
    width: "150px",
    backgroundColor: "#e0e0e0",
    appearance: "none",
    border: "none",
    fontFamily: "Helvetica arial, sans-serif",
    fontSize: "18px"
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
          {"exhibition duration"}
        </div>
        <div style={dateSelectionStyle.selector}>
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
    width: "570px",
    height: "125px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px"
  },
  title: {
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
    color: "#000000"
  },
  selector: {
    height: "75px",
    backgroundColor: "#ffffff",
    borderRadius: "3px",
  },
  startTIme: {
    float: "left",
    width: "220px",
    height: "55px",
    marginLeft: "20px",
    marginTop: "10px",
    backgroundColor: "#ff00ff",
  },
  endTime: {
    float: "right",
    width: "220px",
    height: "55px",
    marginRight: "20px",
    marginTop: "10px",
    backgroundColor: "#ffff00",
  }
};

DateSelection = Radium(DateSelection);

class CostSelection extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      needCost: true
    };
  }

  onClickFree (event) {
    if (this.state.needCost) {
      let newState = {};
      newState.needCost = !this.state.needCost;
      this.setState(newState);

      this.props.setExpCost(0);
    }
  }

  onClickPay (event) {
    if (!this.state.needCost) {
      let newState = {};
      newState.needCost = !this.state.needCost;
      this.setState(newState);
    }
  }

  onPayChanged (event) {
    let cost = parseInt(event.target.value, 10);
    this.props.setExpCost(cost);
  }

  onPayBlur (event) {
    let cost = parseInt(event.target.value, 10);
    this.props.setExpCost(cost);
  }

  render () {
    let payStyle = [costSelectionStyle.pay,
      (!this.state.needCost) && costSelectionStyle.unSelect];

    let freeStyle = [costSelectionStyle.free,
      (this.state.needCost) && costSelectionStyle.unSelect];

    return (
      <div style={costSelectionStyle.base}>
        <div style={costSelectionStyle.title}>
          {"exhibition cost"}
        </div>
        <div style={costSelectionStyle.costType}>
          <div style={freeStyle} onClick={(event) => this.onClickFree(event)}>
            {"free"}
          </div>
          <div style={payStyle} onClick={(event) => this.onClickPay(event)}>
            {"pay"}
          </div>
        </div>
        <div style={costSelectionStyle.costInputWrapper}>
          <input style={costSelectionStyle.costInput} type="number" disabled={this.state.needCost}
            //onChange={(event)=>{this.onPayChanged(event)}}
                 onBlur={(event) => {this.onPayBlur(event)}}
                 placeholder={"Please enter an amount"}/>
        </div>
      </div>
    );
  }
}

CostSelection.propTypes = {
  setExpCost: PropTypes.func
};

let costSelectionStyle = {
  base: {
    width: "570px",
    height: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px"
  },
  title: {
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
    color: "#000000"
  },
  costType: {
    height: "60px",
    backgroundColor: "#ffffff",
    borderRadius: "3px",
  },
  free: {
    float: "left",
    width: "180px",
    height: "60px",
    lineHeight: "60px",
    marginLeft: "40px",
    textAlign: "center",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#ffffff"
  },
  pay: {
    float: "right",
    width: "180px",
    height: "60px",
    lineHeight: "60px",
    marginRight: "40px",
    textAlign: "center",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#ffffff"
  },
  unSelect: {
    backgroundColor: "#d1d0cf"
  },
  costInputWrapper: {
    height: "55px",
    lineHeight: "55px",
    marginTop: "20px"
  },
  costInput: {
    height: "55px",
    width: "570px",
    lineHeight: "55px",
    borderRadius: "5px"
  }
};

CostSelection = Radium(CostSelection);

class CreateExpBaseInfo extends React.Component {

  nextStep () {
    this.props.componentToGo(this.props.componentIndex, this.props.componentIndex + 1);
  }

  render () {

    if (this.props.componentIndex === this.props.contentToShow) {
      return (
        <div style={createBaseInfoStyle.base} onClick={(event) => {
          event.stopPropagation();
          history.back()
        }}>
          <div style={createBaseInfoStyle.modal} onClick={(event) => {event.stopPropagation()}}>
            <TypeSelection setExpType={this.props.setExpType}/>
            <DateSelection setExpStartTime={this.props.setExpStartTime} setExpEndTime={this.props.setExpEndTime}/>
            <CostSelection setExpCost={this.props.setExpCost}/>
            <div style={createBaseInfoStyle.nextStep}>
              <div style={createBaseInfoStyle.nextStepBtn} onClick={this.nextStep.bind(this)}/>
              <div style={createBaseInfoStyle.nextStepText} onClick={this.nextStep.bind(this)}>
                {"next"}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

CreateExpBaseInfo.propTypes = {
  componentIndex: PropTypes.number,
  contentToShow: PropTypes.number,
  componentToGo: PropTypes.func,
  setExpType: PropTypes.func,
  setExpStartTime: PropTypes.func,
  setExpEndTime: PropTypes.func,
  setExpCost: PropTypes.func,
};

let createBaseInfoStyle = {
  base: {
    position: "fixed",
    height: "100%",
    width: "100%",
    top: "0px",
    left: "0px",
    zIndex: "1000",
    color: "#880000",
    backgroundColor: "rgba(0,230,0,0.5)",
    userSelect: "none",
    clear: "both"
  },
  modal: {
    width: "850px",
    height: "600px",
    position: "absolute",
    left: "50%",
    top: "50%",
    marginTop: "-300px",
    marginLeft: "-425px",
    borderRadius: "10px",
    backgroundColor: "rgba(255,255,255,0.5)",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
  },
  nextStep: {
    width: "130px",
    height: "60px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "35px",
  },
  nextStepBtn: {
    float: "left",
    width: "60px",
    height: "60px",
    backgroundColor: "#ff0000",
    borderRadius: "50%",
    cursor: "pointer"
  },
  nextStepText: {
    float: "left",
    width: "60px",
    height: "30px",
    lineHeight: "30px",
    marginTop: "15px",
    marginLeft: "10px",
    color: "#000000",
    cursor: "pointer"
  }
};

CreateExpBaseInfo = Radium(CreateExpBaseInfo);

export default CreateExpBaseInfo;
