/**
 * Created by zhaojunbo on 2017/7/16.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";
import Intl from "../../intl/intl.jsx";

class EditorAddInput extends React.Component {
  render () {
    return (
      <div style={editorAddInputStyle.base}>
        <span style={editorAddInputStyle.inputWapper}>
            <input style={editorAddInputStyle.input} type="text" placeholder={this.props.placeHolder}
                   onChange={event => this.props.setValueFunction(this.props.id, event.target.value)}
            />
        </span>
      </div>
    );
  }
}

EditorAddInput.propTypes = {
  id: PropTypes.number,
  placeHolder: PropTypes.string
};

let editorAddInputStyle = {
  base: {
    height: "30px",
    width: "700px",
    marginLeft: "20px",
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "#888888"
  },
  inputWapper: {
    float: "left",
    width: "400px",
    height: "26px",
    marginLeft: "179px",
    borderRadius: "3px",
    border: "2px solid #d4d4d4",
    backgroundColor: "#ffffff",
    cursor: "text"
  },
  input: {
    width: "380px",
    lineHeight: "20px",
    height: "20px",
    border: "none",
    outline: "none",
    verticalAlign: "middle",
    userSelect: "none"
  }
};

EditorAddInput = Radium(EditorAddInput);

class EditorInput extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      // user personal  info
      dataList: [{id: 0, data: ""}]
    };
  }

  addChild () {

    console.log("add child clicked");
    let newIndex = this.state.dataList[this.state.dataList.length - 1].id + 1;
    if (newIndex <= this.props.maxChild) {
      let newState = {};
      newState.dataList = this.state.dataList.concat([{id: newIndex, data: ""}]);
      this.setState(newState);
    }
  };

  componentWillMount () {

    if (this.props.placeHolders.length > 0) {

      let newState = {};

      for (let index = 0; index < this.props.placeHolders.length; ++index) {
        if (newState.dataList.length <= index) {
          newState.dataList.push({id: index, data: ""});
        }
      }

      this.setState(newState);
    }
  }

  rendMoreChildComponent () {
    return (
      <div style={editorInputStyle.addMore} onClick={this.addChild.bind(this)}/>
    );
  };

  rendChildrenComponent () {

    let self = this;

    return (

      self.state.dataList.map(function (item, index) {

        if (index === 0) {
          return null;
        }

        let placeHolder = self.props.title;

        if (self.props.placeHolders.length > index && self.props.placeHolders[index] !== "") {
          placeHolder = self.props.placeHolders[index];
        }

        return (
          <EditorAddInput key={"EditorAddInput" + item.id} id={item.id}
                          data={item.data}
                          setValueFunction={self.props.setValueFunction}
                          placeHolder={placeHolder}
          />
        );
      })
    );
  };

  render () {

    //{(this.props.maxChild > 0) ? this.rendMoreChildComponent : null}
    /*
     <input style={editorInputStyle.input} type="text" placeholder={"family name"}
     onChange={event =>this.inputDataChanged(event.target.value)}/>
     */

    let inputPlaceHolder = this.props.title;

    if (this.props.placeHolders.length > 0 && this.props.placeHolders[0] !== "") {
      inputPlaceHolder = this.props.placeHolders[0];
    }

    return (
      <div>
        <div style={editorInputStyle.base}>
          <div style={editorInputStyle.hintImage}/>
          <div style={editorInputStyle.hintText}>
            {this.props.title}
          </div>
          <span style={editorInputStyle.inputWapper}>
                        <input style={editorInputStyle.input} type="text" placeholder={inputPlaceHolder}
                               onChange={event => this.props.setValueFunction(0, event.target.value)}/>
                    </span>
          {(this.props.maxChild > 0) ? this.rendMoreChildComponent() : null}
        </div>
        {this.rendChildrenComponent()}
      </div>
    );
  }
}

EditorInput.propTypes = {
  title: PropTypes.string,
  maxChild: PropTypes.number,
  setValueFunction: PropTypes.func,
  placeHolders: PropTypes.array
};

let editorInputStyle = {
  base: {
    height: "30px",
    width: "700px",
    marginTop: "10px",
    marginLeft: "20px",
    marginBottom: "5px",
    backgroundColor: "#888888"
  },
  hintImage: {
    float: "left",
    height: "30px",
    width: "24px",
    backgroundColor: "#ff0000"
  },
  hintText: {
    float: "left",
    height: "30px",
    width: "130px",
    marginLeft: "20px",
    backgroundColor: "#00ff00"
  },
  inputWapper: {
    float: "left",
    width: "400px",
    height: "26px",
    marginLeft: "5px",
    borderRadius: "3px",
    border: "2px solid #d4d4d4",
    backgroundColor: "#ffffff",
    cursor: "text"
  },
  input: {
    width: "380px",
    lineHeight: "20px",
    height: "20px",
    border: "none",
    outline: "none",
    verticalAlign: "middle",
    userSelect: "none"
  },
  addMore: {
    float: "left",
    width: "30px",
    height: "30px",
    marginLeft: "50px",
    backgroundColor: "#0000ff",
    cursor: "pointer"
  }
};

EditorInput = Radium(EditorInput);

class Title extends React.Component {

  back = (event) => {
    event.stopPropagation();
    history.back();
  };

  render () {
    return (
      <div style={titleStyle.base}>
        <div style={titleStyle.titleWapper}>
          <div style={titleStyle.titleText}>
            this is title text
          </div>
          <div style={titleStyle.back} onClick={this.back}>
          </div>
        </div>
      </div>
    );
  }
}

let titleStyle = {
  base: {
    height: "100px",
    marginLeft: "65px",
    backgroundColor: "#ff0000",
  },
  titleWapper: {
    height: "65px",
    backgroundColor: "#ffff00"
  },
  titleText: {
    float: "left",
    width: "200px",
    marginTop: "35px",
    color: "#222222",
    backgroundColor: "#880000"
  },
  back: {
    float: "right",
    width: "36px",
    height: "36px",
    marginRight: "15px",
    marginTop: "15px",
    backgroundColor: "#008800"
  }
};

Title = Radium(Title);

class FileUpload extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      uploadFileName: "",
      chooseFile: false
    };
  }

  uploadFileChange (event) {

    if (event.target.files && event.target.files.length > 0) {
      let fileName = "{count} files selected";

      if (event.target.files.length > 1) {
        fileName = (event.getAttribute("data-multiple-caption") || "").replace("{count}", event.target.files.length.toString());
      }
      // event.target.files.length === 0
      else {
        fileName = event.target.value.split('\\').pop();
      }

      // save first file as cv file
      this.props.setCVFile(event.target.files[0]);

      let newState = {};
      newState.chooseFile = true;
      newState.uploadFileName = fileName;
      this.setState(newState);
    }
  };

  deleteUploadFile () {

    console.log("delete upload file");
    let newState = {};
    newState.chooseFile = false;
    newState.uploadFileName = "";

    this.setState(newState);
    console.log(this.state);
  };

  render () {
    //<input style={fileUploadStyle.fileInput} id="fileUpLoad" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" onChange={this.uploadFileChange(this)}/>
    return (
      <div style={fileUploadStyle.base}>
        <div style={fileUploadStyle.hintImage}/>
        <div style={fileUploadStyle.hintText}>
          {"CV:"}
        </div>
        <div style={fileUploadStyle.inputWapper}>
          <input style={fileUploadStyle.fileInput} id="fileUpLoad" type="file"
                 onChange={event => this.uploadFileChange(event)}/>
          <label htmlFor="fileUpLoad" style={fileUploadStyle.fileInputLabel}>
            <span style={fileUploadStyle.fileInputHint}/>
            <span style={fileUploadStyle.fileInputText}>
                            {this.state.chooseFile ? this.state.uploadFileName : this.props.uploadHolder}
                        </span>
          </label>
        </div>
        <div style={fileUploadStyle.deleteFile} onClick={event => this.deleteUploadFile()}/>
      </div>
    )
  }
}

FileUpload.propTypes = {
  uploadHolder: PropTypes.string,
  setCVFile: PropTypes.func
};

let fileUploadStyle = {
  base: {
    height: "40px",
    width: "700px",
    marginTop: "10px",
    marginLeft: "20px",
    marginBottom: "5px",
    backgroundColor: "#888888"
  },
  hintImage: {
    float: "left",
    height: "30px",
    width: "24px",
    marginTop: "5px",
    backgroundColor: "#ff0000"
  },
  hintText: {
    float: "left",
    height: "30px",
    width: "130px",
    marginLeft: "20px",
    marginTop: "5px",
    backgroundColor: "#00ff00"
  },
  inputWapper: {
    float: "left",
    width: "400px",
    height: "40px",
    lineHeight: "40px",
    marginLeft: "10px",
    backgroundColor: "#ffffff"
  },
  fileInput: {
    clear: "both",
    width: "0.1px",
    height: "0.1px",
    opacity: "0",
    overflow: "hidden",
    position: "absolute",
    zIndex: "-1"
  },
  fileInputLabel: {
    display: "inline-block",
    width: "350px",
    height: "40px",
    backgroundColor: "#4d948a",
    borderRadius: "3px",
    cursor: "pointer",
    userSelect: "none"
  },
  fileInputHint: {
    float: "left",
    display: "inline-block",
    width: "30px",
    height: "20px",
    marginLeft: "15px",
    marginTop: "10px",
    backgroundColor: "#ff0000"
  },
  fileInputText: {
    float: "left",
    display: "inline-block",
    width: "280px",
    height: "20px",
    lineHeight: "20px",
    marginLeft: "10px",
    marginTop: "10px",
    color: "#ffffff",
    textAlign: "center",
    backgroundColor: "#00ff00"
  },
  deleteFile: {
    float: "left",
    width: "30px",
    height: "30px",
    marginLeft: "50px",
    backgroundColor: "#0000ff",
    cursor: "pointer"
  }
};

FileUpload = Radium(FileUpload);

class SavePersonalInfo extends React.Component {

  render () {
    return (
      <div style={savePersonalInfoStyle.base} onClick={this.props.savePersonalInfo}>
        save info
      </div>
    );
  }
}

SavePersonalInfo.propTypes = {
  savePersonalInfo: PropTypes.func
};

let savePersonalInfoStyle = {
  base: {
    width: "200px",
    height: "60px",
    lineHeight: "60px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "70px",
    borderRadius: "5px",
    backgroundColor: "#4d948a",
    color: "#ffffff",
    textAlign: "center",
    cursor: "pointer",
    userSelect: "none",

    ":hover": {
      backgroundColor: "#409080"
    }
  }
};

SavePersonalInfo = Radium(SavePersonalInfo);

class PersonalInfoEditor extends React.Component {

  back = (event) => {
    event.stopPropagation();
    //console.log(this.props.from);
    history.back();
  };

  render () {

    return (
      <div>
        <div style={infoEditorStyle.base} onClick={(event) => this.back(event)}/>
        <div style={infoEditorStyle.modal}>
          <div style={infoEditorStyle.content} onClick={(event) => {event.stopPropagation()}}>
            <Title/>
            <EditorInput title={"first name"} maxChild={0}
                         setValueFunction={this.props.setFirstName}
                         placeHolders={[this.props.firstNamePlaceHolder]}/>
            <EditorInput title={"family name"} maxChild={0}
                         setValueFunction={this.props.setFamilyName}
                         placeHolders={[this.props.familyNamePlaceHolder]}/>
            <EditorInput title={"phone number"} maxChild={3}
                         setValueFunction={this.props.setPhoneNumber}
                         placeHolders={this.props.phoneNumberPlaceHolder}/>
            <EditorInput title={"E-Mail address"} maxChild={3}
                         setValueFunction={this.props.setEmailAddress}
                         placeHolders={this.props.emailAddressPlaceHolder}/>
            <EditorInput title={"we chart"} maxChild={0}
                         setValueFunction={this.props.setWeChart}
                         placeHolders={[this.props.weChartPlaceHolder]}/>
            <EditorInput title={"facebook"} maxChild={0}
                         setValueFunction={this.props.setFacebook}
                         placeHolders={[this.props.facebookPlaceHolder]}/>
            <div style={infoEditorStyle.separator}/>
            <EditorInput title={"education"} maxChild={3}
                         setValueFunction={this.props.setEducation}
                         placeHolders={this.props.educationPlaceHolder}/>
            <EditorInput title={"jobs"} maxChild={3}
                         setValueFunction={this.props.setJobs}
                         placeHolders={this.props.jobsPlaceHolder}/>
            <EditorInput title={"language"} maxChild={3}
                         setValueFunction={this.props.setLanguages}
                         placeHolders={this.props.languagesPlaceHolder}/>
            <EditorInput title={"skills"} maxChild={3}
                         setValueFunction={this.props.setSkills}
                         placeHolders={this.props.skillsPlaceHolder}/>
            <FileUpload uploadHolder="choose a file .... "
                        setCVFile={this.props.setCVFile}/>
            <SavePersonalInfo savePersonalInfo={this.props.savePersonalInfo}/>
          </div>
        </div>
      </div>
    );
  }
}

PersonalInfoEditor.propTypes = {
  // set functions
  setFirstName: PropTypes.func,
  setFamilyName: PropTypes.func,
  setPhoneNumber: PropTypes.func,
  setEmailAddress: PropTypes.func,
  setWeChart: PropTypes.func,
  setFacebook: PropTypes.func,
  setEducation: PropTypes.func,
  setJobs: PropTypes.func,
  setLanguages: PropTypes.func,
  setSkills: PropTypes.func,
  setCVFile: PropTypes.func,
  savePersonalInfo: PropTypes.func,
  // place holders of each input
  firstNamePlaceHolder: PropTypes.string,
  familyNamePlaceHolder: PropTypes.string,
  weChartPlaceHolder: PropTypes.string,
  facebookPlaceHolder: PropTypes.string,
  phoneNumberPlaceHolder: PropTypes.array,
  emailAddressPlaceHolder: PropTypes.array,
  educationPlaceHolder: PropTypes.array,
  jobsPlaceHolder: PropTypes.array,
  languagesPlaceHolder: PropTypes.array,
  skillsPlaceHolder: PropTypes.array
};

let infoEditorStyle = {

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
    position: "absolute",
    zIndex: "2000",
    left: "50%",
    top: "50%"
  },
  content: {
    width: "860px",
    paddingBottom: "50px",
    position: "absolute",
    left: "50%",
    top: "50%",
    marginTop: "-276px",
    marginLeft: "-430px",
    backgroundColor: "#ffffff",
    borderRadius: "3px",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
  },
  separator: {
    width: "800px",
    height: "4px",
    borderRadius: "2px",
    backgroundColor: "#e3e3e3",
    marginLeft: "30px",
    marginRight: "30px",
    marginTop: "30px",
    marginBottom: "30px"
  }
};

PersonalInfoEditor = Radium(PersonalInfoEditor);

export default PersonalInfoEditor;
