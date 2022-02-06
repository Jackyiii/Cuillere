/**
 * Created by zhaojunbo on 2017/7/16.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";
import Intl from "../../intl/intl.jsx";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from "rc-slider";
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import Profile from "./profile.jsx";

class Title extends React.Component {
  back = (event) => {
    event.stopPropagation();
    history.back();
  };

  render () {
    return (
      <div style={titleStyle.base}>
        <div style={titleStyle.text}>
          personal image
        </div>
        <div style={titleStyle.cancel} onClick={this.back}>
        </div>
      </div>
    );
  }
}

let titleStyle = {
  base: {
    height: "50px",
    backgroundColor: "rgba(230,230,230,1)",
    borderBottom: "1px",
    borderBottomColor: "#222222"
  },
  text: {
    float: "left",
    width: "200px",
    height: "20px",
    marginTop: "15px",
    marginLeft: "30px",
    backgroundColor: "#ff0000",
    color: "#222222"
  },
  cancel: {
    float: "right",
    width: "20px",
    height: "20px",
    marginTop: "15px",
    marginRight: "30px",
    backgroundColor: "#222222"
    //background:"url('src/res/sample.png') center no-repeat",
  }
};

Title = Radium(Title);

class ImageEditorArea extends React.Component {

  constructor (props) {
    super(props);

    this.imageData = "";

    this.imageDataChanged = false;

    this.state = {
      zoomValue: 0,
      rotateValue: 0
    }
  }

  handleClickReset () {
    console.log("ImageEditorArea::handleClickReset");
  }

  handleImageLoadReady () {
    let newState = {};
    newState.loadReady = true;
    this.setState(newState);
  }

  handleRotateValueChange (value) {
    let newState = {};
    newState.rotateValue = value;
    this.setState(newState);

    this.refs.cropper.rotateTo(value, value);
  }

  handleZoomValueChange (value) {
    let newState = {};
    newState.zoomValue = value;
    this.setState(newState);

    this.refs.cropper.scale(value * 0.01);
  }

  handleRecordCropImage () {
    // convert images to base64

    if (this.refs.cropper.getCroppedCanvas() && this.imageDataChanged) {
      let imageUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
      this.props.setImageData(imageUrl);
    }

    this.imageDataChanged = false;
  }

  handleCropChange () {
    this.imageDataChanged = true;
  }

  render () {

    return (
      <div style={imageEditorAreaStyle.base} onClick={(event) => {event.stopPropagation()}}
           onMouseLeave={(event) => {this.handleRecordCropImage()}}>

        <Cropper ref="cropper" style={imageEditorAreaStyle.cropper}
                 src={this.props.imageDataUrl}
          //crop={(event)=>{this.handleRecordCropImage()}}
                 crop={(event) => {this.handleCropChange()}}
                 aspectRatio={1 / 1}/>

        <div style={imageEditorAreaStyle.sliderArea}>
          <div style={imageEditorAreaStyle.rangeEditor}>
            <div style={imageEditorAreaStyle.rangeTitleWrapper}>
              <div style={imageEditorAreaStyle.rangeTitle}>
                {"zoom"}
              </div>
              <div style={imageEditorAreaStyle.rangeValue}>
                {this.state.zoomValue}
              </div>
            </div>
            <div style={imageEditorAreaStyle.rangeBar}>
              <Slider min={1} max={200} defaultValue={100} onChange={(value) => {this.handleZoomValueChange(value)}}/>
            </div>
          </div>
          <div style={imageEditorAreaStyle.rangeEditor}>
            <div style={imageEditorAreaStyle.rangeTitleWrapper}>
              <div style={imageEditorAreaStyle.rangeTitle}>
                {"rotate"}
              </div>
              <div style={imageEditorAreaStyle.rangeValue}>
                {this.state.rotateValue}
              </div>
            </div>
            <div style={imageEditorAreaStyle.rangeBar}>
              <Slider min={-90} max={90} defaultValue={0} onChange={(value) => {this.handleRotateValueChange(value)}}/>
            </div>
          </div>
          <div style={imageEditorAreaStyle.reset} onClick={this.handleClickReset.bind(this)}>

          </div>
        </div>
      </div>
    );
  }
}

ImageEditorArea.propTyoe = {
  imageDataUrl: PropTypes.string,
  setImageData: PropTypes.func
};

let imageEditorAreaStyle = {
  base: {
    position: "relative",
    height: "370px",
    backgroundColor: "#000000",
    borderBottom: "1px solid #ececec"
  },
  sliderArea: {
    position: "absolute",
    height: "75px",
    width: "100%",
    top: "295px",
    backgroundColor: "rgba(100,100,100,0.5)",
    borderTop: "solid 2px rgba(100,100,100,0.8)"
  },
  cropper: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0000ff"
  },
  rangeEditor: {
    float: "left",
    height: "45px",
    width: "310px",
    marginLeft: "20px",
    marginTop: "15px",
    backgroundColor: "#ff9999"
  },
  rangeTitleWrapper: {
    height: "15px",
    lineHeight: "15px",
    backgroundColor: "#9999ff"
  },
  rangeTitle: {
    float: "left",
    height: "15px",
    width: "250px",
    marginLeft: "0px",
    backgroundColor: "#55ff55"
  },
  rangeValue: {
    float: "right",
    height: "15px",
    width: "50px",
    marginRight: "0px",
    textAlign: "right",
    backgroundColor: "#55ff55"
  },
  rangeBar: {
    height: "20px",
    marginTop: "10px",
    backgroundColor: "#ff22ff"
  },
  reset: {
    float: "right",
    height: "30px",
    width: "30px",
    marginTop: "25px",
    marginRight: "25px",
    backgroundColor: "#99ff99",
    cursor: "pointer"
  }
};

ImageEditorArea = Radium(ImageEditorArea);

class ImageAdjust extends React.Component {
  render () {

    /*
     let containerStyle = [registerInputWapperStyle.base,
     (this.state.edited && this.props.errMsg === "") && registerInputWapperStyle.correct,
     (this.state.edited && this.props.errMsg !== "") && registerInputWapperStyle.error];
     */

    return (
      <div style={imageAdjustStyle.base}>

        <div style={imageAdjustStyle.cut}>
          <div style={imageAdjustStyle.hintImage}>

          </div>
          <div style={imageAdjustStyle.hintText}>

          </div>
        </div>
        <div style={imageAdjustStyle.filter}>
          <div style={imageAdjustStyle.hintImage}>

          </div>
          <div style={imageAdjustStyle.hintText}>

          </div>
        </div>
        <div style={imageAdjustStyle.adjust}>
          <div style={imageAdjustStyle.hintImage}>

          </div>
          <div style={imageAdjustStyle.hintText}>

          </div>
        </div>
        <div style={imageAdjustStyle.visible}>
          <div style={imageAdjustStyle.hintImage}>

          </div>
          <div style={imageAdjustStyle.hintText}>

          </div>
        </div>
      </div>
    );
  }
}

let imageAdjustStyle = {
  base: {
    height: "70px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #ececec"
  },
  cut: {
    float: "left",
    width: "70px",
    height: "40px",
    marginLeft: "24px",
    marginTop: "10px",
    backgroundColor: "#ff0000",
  },
  filter: {
    float: "left",
    width: "70px",
    height: "40px",
    marginTop: "10px",
    backgroundColor: "#00ff00"
  },
  adjust: {
    float: "left",
    width: "70px",
    height: "40px",
    marginTop: "10px",
    backgroundColor: "#0000ff"
  },
  visible: {
    float: "right",
    width: "70px",
    height: "40px",
    marginTop: "10px",
    marginRight: "24px",
    backgroundColor: "#ff00ff"
  },
  hintImage: {
    height: "20px",
    width: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#ffff00"
  },
  hintText: {
    height: "20px",
    textAlign: "center",
    color: "#7d7d7d",
    backgroundColor: "#00ffff"
  }
};

ImageAdjust = Radium(ImageAdjust);

class ImageConfirm extends React.Component {

  handleConfirm () {
    this.props.confirmImageEdit();
  }

  handleSelectImageChanged (event) {
    console.log("ImageConfirm::handleSelectImageChanged clicked url: " + event.target.files);

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      let self = this;

      reader.onload = function (e) {
        self.props.selectImageFile(e.target.result);
      };
    }
  }

  handleDeleteImage () {
    this.props.selectImageFile("");
  }

  render () {
    return (
      <div style={imageConfirmStyle.base}>
        <div style={imageConfirmStyle.delete} onClick={(event) => {this.handleDeleteImage()}}>
          {"delete"}
        </div>
        <div style={imageConfirmStyle.confirm} onClick={(event) => {this.handleConfirm()}}>
          {"confirm"}
        </div>
        <div style={imageConfirmStyle.changeWrapper}>
          <input style={imageConfirmStyle.fileInput} type="file" id={"userImageEditInput"}
                 accept="image/png, image/jpeg, image/gif, image/jpg" multiple="multiple"
                 onChange={(event) => {this.handleSelectImageChanged(event)}}
          />
          <label style={imageConfirmStyle.imageSelector} htmlFor={"userImageEditInput"}>
            {"change"}
          </label>
        </div>
      </div>
    );
  }
}

ImageConfirm.propTypes = {
  selectImageFile: PropTypes.func,
  confirmImageEdit: PropTypes.func
};

let imageConfirmStyle = {
  base: {
    height: "60px",
    backgroundColor: "#ffffff"
  },
  delete: {
    float: "left",
    height: "30px",
    lineHeight: "30px",
    width: "100px",
    marginLeft: "30px",
    marginTop: "16px",
    fontSize: "15px",
    textAlign: "center",
    backgroundColor: "#ff0000",
    color: "#737373"
  },
  changeWrapper: {
    float: "right",
    position: "relative",
    height: "30px",
    lineHeight: "30px",
    width: "84px",
    marginTop: "15px",
    marginRight: "15px",
    borderRadius: "2px",
    borderWidth: "1px",
    backgroundColor: "#00ff00"
  },
  imageSelector: {
    display: "inline-block",
    height: "30px",
    width: "84px",
    backgroundColor: "#4d948a",
    fontSize: "15px",
    textAlign: "center",
    cursor: "pointer",
    userSelect: "none"
  },
  fileInput: {
    width: "0.1px",
    height: "0.1px",
    opacity: "0",
    overflow: "hidden",
    position: "absolute",
    zIndex: "-1"
  },
  confirm: {
    float: "right",
    height: "30px",
    lineHeight: "30px",
    width: "64px",
    marginTop: "15px",
    marginRight: "30px",
    fontSize: "15px",
    textAlign: "center",
    borderRadius: "2px",
    backgroundColor: "#0000ff"
  }
};

ImageConfirm = Radium(ImageConfirm);

class PersonalImageEditor extends React.Component {
  constructor (props) {
    super(props);

    this.userImageData = "";

    this.state = {
      imageZoom: 0,
      imageStretch: 0,
      imageDataUrl: ""
    }
  }

  back (event) {
    event.stopPropagation();
    //console.log(this.props.from);
    history.back();
  };

  selectImageFile (imageFileUrl) {
    let newState = {};
    newState.imageDataUrl = imageFileUrl;
    this.setState(newState);
  }

  render () {
    return (
      <div style={personalImageEditorStyle.base} onClick={(event) => {this.back(event)}}>
        <div style={personalImageEditorStyle.modal} onClick={(event) => {event.stopPropagation()}}>
          <Title/>
          <ImageEditorArea imageDataUrl={this.state.imageDataUrl}
                           setImageData={this.props.setImageData}/>
          <ImageAdjust/>
          <ImageConfirm selectImageFile={this.selectImageFile.bind(this)}
                        confirmImageEdit={this.props.confirmImageEdit}/>
        </div>
      </div>
    );
  }
}

PersonalImageEditor.propTypes = {
  setImageData: PropTypes.func,
  confirmImageEdit: PropTypes.func
};

let personalImageEditorStyle = {

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
    width: "730px",
    height: "552px",
    position: "absolute",
    left: "50%",
    top: "50%",
    marginTop: "-276px",
    marginLeft: "-365px",
    backgroundColor: "rgba(230,230,230,0.3)",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s"
  }
};

PersonalImageEditor = Radium(PersonalImageEditor);

export default PersonalImageEditor;
