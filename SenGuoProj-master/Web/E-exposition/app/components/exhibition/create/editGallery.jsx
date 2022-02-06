import React from "react";
import ReactDOM from 'react-dom';
import Radium from "radium";
import PropTypes from 'prop-types';
import { Route, Link } from "react-router-dom";

class EmptyGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={emptyGalleryStyle.base}>
        <div style={emptyGalleryStyle.upload}>
          <input style={emptyGalleryStyle.fileInput} type="file" id={"editGallery_uploadImage"}
            accept="image/png, image/jpeg, image/gif, image/jpg" multiple="multiple"
            onChange={(event) => { this.props.addNewImages(event) }}
          />
          <label style={emptyGalleryStyle.label} htmlFor={"editGallery_uploadImage"} >
            {"上传作品"}
          </label>
        </div>
        <div style={emptyGalleryStyle.hintText}>
          {"每张图片大小不超过2M，格式仅限JPG/PNG/GIF"}
        </div>
      </div>
    )
  }
}

EmptyGallery.propTypes = {
  addNewImages: PropTypes.func
};

let emptyGalleryStyle = {
  base: {
    height: "100%",
    width: "100%"
  },
  upload: {
    width: "212px",
    height: "40px",
    lineHeight: "40px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "273px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    fontSize: "18px",
    color: "#979797",
    textAlign: "center",
    cursor: "pointer",
    userSelect: "none",
    border: "1px solid #979797",
    transition: "all 300ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s",

    ":hover": {
      backgroundColor: "#8895A5",
      color: "#ffffff"
    },
    ":active": {
      backgroundColor: "#404040",
      color: "#ffffff"
    }
  },
  label: {
    display: "inline-block",
    width: "212px",
    height: "40px",
    borderRadius: "20px"
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
  hintText: {
    width: "100%",
    height: "17px",
    lineHeight: "17px",
    marginTop: "23px",
    fontSize: "13px",
    color: "#aeaeae",
    textAlign: "center"
  }
};

EmptyGallery = Radium(EmptyGallery);

class ImageItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditAbstract: false
    };
  }

  abstractClicked(event) {
    event.stopPropagation();

    let newState = {};
    newState.showEditAbstract = true;
    this.setState(newState);
  }

  abstractInputBlur(event) {
    let newState = {};
    newState.showEditAbstract = false;
    this.setState(newState);

    this.props.imageAbstractChanged(this.props.catalogBelongsTo, this.props.id, event.target.value);
  }

  setFocus(component) {
    if (ReactDOM.findDOMNode(component)) {
      ReactDOM.findDOMNode(component).focus();
    }
  }

  renderCatalogAbstract() {
    if (!this.state.showEditAbstract) {
      return (
        <div style={imageItemStyle.abstract} onClick={(event) => { this.abstractClicked(event) }}>
          {this.props.abstract}
        </div>
      )
    } else {
      return (
        <textarea style={imageItemStyle.abstractInput}
          ref={(component) => { this.setFocus(component) }}
          onBlur={(event) => { this.abstractInputBlur(event) }}
          onClick={(event) => { event.stopPropagation() }}
        />
      )
    }
  }

  render() {
    return (
      <div style={imageItemStyle.base} onClick={(event) => { this.props.catalogSelected(this.props.id) }}>
        <div style={imageItemStyle.imageWrapper}>
          <img style={imageItemStyle.image} src={this.props.imageData} alt={this.props.imageData} />
          <div style={imageItemStyle.deleteImage}>
            {"X"}
          </div>
        </div>
        <div style={imageItemStyle.abstractWrapper}>
          {this.renderCatalogAbstract()}
        </div>
      </div>
    )
  }
}

ImageItem.propTypes = {
  id: PropTypes.string,
  catalogBelongsTo: PropTypes.string,
  title: PropTypes.string,
  abstract: PropTypes.string,
  imageData: PropTypes.string,
  imageTitleChanged: PropTypes.func,
  imageAbstractChanged: PropTypes.func,
  deleteImageFromCatalog: PropTypes.func
};

let imageItemStyle = {
  base: {
    float: "left",
    width: "148px",
    height: "248px",
    margin: "8px"
  },
  imageWrapper: {
    width: "148px",
    height: "148px",
    border: "1px solid #979797",
    backgroundColor: "#ececec"
  },
  image: {
    width: "148px",
    height: "148px",
    outline: "none",
    border: "none"
  },
  abstractWrapper: {
    width: "148px",
    height: "80px",
    marginTop: "16px",
    border: "1px solid #979797",
    backgroundColor: "#ffffff"
  },
  abstract: {
    width: "148px",
    height: "80px",
    lineHeight: "18px"
  },
  abstractInput: {
    width: "148px",
    height: "80px",
    lineHeight: "18px",
    overflow: "hidden",
    resize: "none",
    outline: "none",
    border: "none"
  },
  deleteImage: {
    float: "right",
    width: "18px",
    height: "18px",
    lineHeight: "18px",
    marginTop: "8px",
    marginRight: "8px",
    borderRadius: "50%",
    color: "#ffffff"
  }
};

ImageItem = Radium(ImageItem);

class GalleryContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileSelected: false
    }
  }

  renderImageList() {

    let self = this;
    return (
      this.props.imageArray.map(
        function (content, index) {
          return (
            <ImageItem key={content.expItemId}
              id={content.expItemId}
              catalogBelongsTo={self.props.catalogBelongsTo}
              title={content.expItemTitle}
              abstract={content.expItemAbstract}
              imageData={content.expItemImage}
              imageTitleChanged={self.props.imageTitleChanged}
              imageAbstractChanged={self.props.imageAbstractChanged}
              deleteImageFromCatalog={self.props.deleteImageFromCatalog}
            />
          );
        }
      )
    );
  }

  render() {
    return (
      <div style={galleryContentStyle.base}>
        <div style={galleryContentStyle.content}>
          {this.renderImageList()}
          <div style={galleryContentStyle.addImage}>
            <input style={galleryContentStyle.fileInput} type="file" id={"editCallery_addImages"}
              accept="image/png, image/jpeg, image/gif, image/jpg" multiple="multiple"
              onChange={(event) => { this.props.addNewImages(event) }}
            />
            <label style={galleryContentStyle.imageSelector} htmlFor={"editCallery_addImages"} >
              {"+"}
            </label>
          </div>
        </div>
      </div>
    )
  }
}

GalleryContent.propTypes = {
  catalogBelongsTo: PropTypes.string,
  addNewImages: PropTypes.func,
  imageTitleChanged: PropTypes.func,
  imageAbstractChanged: PropTypes.func,
  deleteImageFromCatalog: PropTypes.func
};

let galleryContentStyle = {
  base: {
    height: "634px",
    width: "860px",
  },
  content: {
    height: "614px",
    width: "840px",
    overflow: "auto",
    margin: "10px"
  },
  addImage: {
    float: "left",
    width: "148px",
    height: "148px",
    margin: "8px",
    color: "#979797",
    border: "1px solid #979797",
    backgroundColor: "#ececec",

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
  imageSelector: {
    display: "inline-block",
    width: "148px",
    height: "148px",
    lineHeight: "148px",
    textAlign: "center",
    fontSize: "50px",
    cursor: "pointer",
    userSelect: "none"
  },
  fileInput: {
    clear: "both",
    width: "0.1px",
    height: "0.1px",
    opacity: "0",
    overflow: "hidden",
    position: "absolute",
    zIndex: "-1"
  }
};

GalleryContent = Radium(GalleryContent);

class EditGallery extends React.Component {

  constructor(props) {
    super(props);
  }

  addNewImages(event) {
    do {
      if (!event.target.files) {
        break;
      }

      let newCatalogId = this.props.addNewCatalog();

      let self = this;
      let selectImageArray = [];
      let fileLength = event.target.files.length;

      for (let index = 0; index < fileLength; ++index) {
        if (!event.target.files[index]) {
          continue;
        }

        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[index]);

        reader.onload = function (e, index) {
          self.props.addNewImageToCatalog(newCatalogId, e.target.result);
        };
      }

    } while (false);
  }

  renderContent() {
    if (this.props.catalogArray.length === 0) {
      return (
        <EmptyGallery addNewImages={this.addNewImages.bind(this)} />
      )
    } else {
      return (
        <GalleryContent addNewImages={this.addNewImages.bind(this)} />
      )
    }
  }

  render() {
    return (
      <div style={editGalleryStyle.base}>
        {this.renderContent()}
      </div>
    )
  }
}

EditGallery.propTypes = {
  addNewCatalog: PropTypes.func,
  addNewImageToCatalog: PropTypes.func,
  deleteImageFromCatalog: PropTypes.func,

  imageTitleChanged: PropTypes.func,
  imageAbstractChanged: PropTypes.func,
  exitCreateExhibition: PropTypes.func,
  catalogArray: PropTypes.array,
  imageArray: PropTypes.array
};

let editGalleryStyle = {
  base: {
    height: "634px",
    width: "860px",
    border: "1px solid #979797"
  }
};

EditGallery = Radium(EditGallery);

export default EditGallery;
