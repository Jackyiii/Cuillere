import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import { Route, Link } from "react-router-dom";
import EditGallery from "./editGallery.jsx";
import EditDetail from "./editDetail.jsx";
import NavBar from "../../navbar/normalNav";

class CreateExhibition extends React.Component {
  // personal info data
  data = {
    expId: 0,
    expType: "",
    expStartTime: "",
    expEndTime: "",
    expCost: 0,
    expTagList: [],
    expTitle: "default Title",
    expSubject: "",
    expAbstract: ""
  };

  constructor(props) {
    super(props);

    this.uploading = false;
    /*
     * currComponentIndex: child component needs to show now.
     * catalogArray: array stores all catalogs of current exhibition
     * catalogImageMap: stores images of each catalog, witch key is catalogId
     * in catalogArray, value is image array of related catalog
     */
    this.state = {
      catalogArray: [],
      catalogImageMap: {},
      selectedCatalogId: ""
    }
  }

  setExpType(typeStr) {
    //console.log("createExp::setExpType: " + typeStr);
    this.data.expType = typeStr;
  }

  setExpStartTime(startTimeStr) {
    //console.log("createExp::setExpStartTime: " + startTimeStr);
    this.data.expStartTime = startTimeStr;
  }

  setExpEndTime(endTimeStr) {
    //console.log("createExp::setExpEndTime: " + endTimeStr);
    this.data.expEndTime = endTimeStr;
  }

  setExpCost(costNum) {
    //console.log("createExp::setExpCost: " + costNum);
    this.data.expCost = costNum;
  }

  setExpTag(tagList) {
    let tagString = tagList.split(" ");
    let stringArray = [];
    for (let i = 0; i < tagString.length; i++) {
      stringArray.push(tagString[i]);
      /*if(i !== tagString.length-1){
       stringArray.push(" ");
       }*/
    }

    this.data.expTagList = stringArray;

    //console.log("createExp::setExpTag: " + stringArray);
  }

  setExpTitle(titleStr) {
    //console.log("createExp::setExpTitle: " + titleStr);
    this.data.expTitle = titleStr;
  }

  setExpSubject(subjectStr) {
    this.data.expSubject = subjectStr;
  }

  setExpAbstract(abstractStr) {
    //console.log("createExp::setExpAbstract: " + abstractStr);
    this.data.expAbstract = abstractStr;
  }

  addNewCatalog() {
    let newCatalogItem = {};
    newCatalogItem["expCatalogId"] = "catalogId_" + 　Math.random().toString(36);
    newCatalogItem["expCatalogTitle"] = "";
    newCatalogItem["expCatalogAbstract"] = "";
    newCatalogItem["expCatalogCoverImage"] = "";

    let newState = {};
    newState.catalogArray.push(newCatalogItem);
    newState.catalogImageMap[newCatalogItem["expCatalogId"]] = [];

    this.setState(newState);

    return newCatalogItem["expCatalogId"];
  }

  deleteCatalog(catalogId) {
  }

  catalogSelected(catalogId) {
    let newState = {};
    newState.selectedCatalogId = catalogId;
    newState.currComponentIndex = 4; //go to selected catalog edit interface
    this.setState(newState);
  }

  catalogTitleChanged(catalogId, catalogTitle) {
    let newState = {};

    let findCatalog = false;
    for (let i = 0; i < newState.catalogArray.length; ++i) {
      if (newState.catalogArray[i]["expCatalogId"] === catalogId) {
        //console.log("catalog title of " + catalogId + " is : " + catalogTitle);
        newState.catalogArray[i]["expCatalogTitle"] = catalogTitle;
        findCatalog = true;
      }
    }

    if (findCatalog) {
      this.setState(newState);
    }
  }

  catalogAbstractChanged(catalogId, catalogAbstract) {
    let newState = {};

    let findCatalog = false;
    for (let i = 0; i < newState.catalogArray.length; ++i) {
      if (newState.catalogArray[i]["expCatalogId"] === catalogId) {
        console.log("catalog abstract of " + catalogId + " is : " + catalogAbstract);
        newState.catalogArray[i]["expCatalogAbstract"] = catalogAbstract;
        findCatalog = true;
      }
    }

    if (findCatalog) {
      this.setState(newState);
    }
  }

  addNewImageToCatalog(catalogId, imageData) {
    let newState = {};

    if (!this.state.catalogImageMap.hasOwnProperty(catalogId)) {
      newState.catalogImageMap[catalogId] = [];
    }

    // create new image and add it to catalog with catalogId
    let newImageItem = {};
    newImageItem["expItemId"] = "imageId_" + 　Math.random().toString(36);
    newImageItem["expItemTitle"] = "";
    newImageItem["expItemAbstract"] = "";
    newImageItem["expItemImage"] = imageData;

    newState.catalogImageMap[catalogId].push(newImageItem);

    // change catalog cover
    for (let i = 0; i < newState.catalogArray.length; ++i) {
      if (newState.catalogArray[i]["expCatalogId"] === catalogId) {
        newState.catalogArray[i]["expCatalogCoverImage"] = imageData;
      }
    }

    this.setState(newState);
  }

  deleteImageFromCatalog(catalogId, imageId) {
    let newState = {};
    let findCatalog = false;

    for (let i = 0; i < newState.catalogImageMap[catalogId].length; ++i) {
      if (newState.catalogImageMap[catalogId][i]["expItemId"] === imageId) {
        newState.catalogImageMap[catalogId].splice(i, 1);
        findCatalog = true;
        break;
      }
    }

    if (findCatalog) {
      this.setState(newState);
    }
  }

  imageTitleChanged(catalogId, imageId, imageTitle) {
    let newState = {};
    let findCatalog = false;

    if (newState.catalogImageMap.hasOwnProperty(catalogId)) {
      for (let i = 0; i < newState.catalogImageMap[catalogId].length; ++i) {
        if (newState.catalogImageMap[catalogId][i]["expItemId"] === imageId) {
          //console.log("image title of " + imageId + " is : " + imageTitle);
          newState.catalogImageMap[catalogId][i]["expItemTitle"] = imageTitle;
          findCatalog = true;
          break;
        }
      }
    }

    if (findCatalog) {
      this.setState(newState);
    }
  }

  imageAbstractChanged(catalogId, imageId, imageAbstract) {
    let newState = {};
    let findCatalog = false;

    if (newState.catalogImageMap.hasOwnProperty(catalogId)) {
      for (let i = 0; i < newState.catalogImageMap[catalogId].length; ++i) {
        if (newState.catalogImageMap[catalogId][i]["expItemId"] === imageId) {
          //console.log("image abstract of " + imageId + " is : " + imageAbstract);
          newState.catalogImageMap[catalogId][i]["expItemAbstract"] = imageAbstract;
          findCatalog = true;
        }
      }
    }

    if (findCatalog) {
      this.setState(newState);
    }
  }

  createExpCallback(statusCode, statusMsg, statusData) {
    if (statusCode === 20000) {
      this.data.expId = statusData.id;
    }
    console.log("createExp::createExpCallback status code: " + statusCode);
  }

  arrangeExhibition() {
    // call server to save exhibition base info and abstract info
    // Exhibit.fetchExhibitionCreate(this.data, this.createExpCallback.bind(this));
  }

  createExpDetailCallback(statusCode, statusMsg) {
    // uploading ended
    this.uploading = false;

    if (statusCode === 20000) {
      history.back();
    }
    console.log("createExp::createExpDetailCallback status code: " + statusCode);
  }

  exitCreateExhibition() {
    if (!this.uploading) {
      this.uploading = true;

      // call server to save exhibition catalog and exp content
      let expCatalogArray = [];

      let self = this;
      this.state.catalogArray.forEach(function (catalog, index) {
        let catalogItem = {
          expCatalogId: catalog.expCatalogId,
          expCatalogTitle: catalog.expCatalogTitle,
          expCatalogAbstract: catalog.expCatalogAbstract,
          expCatalogCoverImage: catalog.expCatalogCoverImage,
          expItemArray: self.state.catalogImageMap[catalog.expCatalogId]
        };

        expCatalogArray.push(catalogItem);
      });

      //Exhibit.fetchExhibitionDetailCreate(this.data.expId, expCatalogArray,this.createExpDetailCallback.bind(this));
    }
  }

  render() {
    return (
      <div style={createExpStyle.base}>
        <NavBar/>
        <div style={createExpStyle.title}>
          上传展览</div>
        <div style={createExpStyle.content}>
          <div style={createExpStyle.editGallery}>
            <EditGallery addNewCatalog={this.addNewCatalog.bind(this)}
              catalogArray={this.state.catalogArray}
              addNewImageToCatalog={this.addNewImageToCatalog.bind(this)}
              deleteImageFromCatalog={this.deleteImageFromCatalog.bind(this)}
              imageAbstractChanged={this.imageAbstractChanged.bind(this)}
              imageTitleChanged={this.imageTitleChanged.bind(this)}
              catalogBelongsTo={this.state.selectedCatalogId}
              imageArray={this.state.catalogImageMap[this.state.selectedCatalogId]} />
          </div>
          <div style={createExpStyle.editDetail}>
            <EditDetail setExpTitle={this.setExpTitle.bind(this)}
              setExpAbstract={this.setExpAbstract.bind(this)}
              setExpType={this.setExpType.bind(this)}
              setExpStartTime={this.setExpStartTime.bind(this)}
              setExpEndTime={this.setExpEndTime.bind(this)}
              setExpCost={this.setExpCost.bind(this)}
              setExpTag={this.setExpTag.bind(this)}
              setExpSubject={this.setExpSubject.bind(this)}

              addNewCatalog={this.addNewCatalog.bind(this)}
              deleteCatalog={this.deleteCatalog.bind(this)}
              catalogSelected={this.catalogSelected.bind(this)}
              catalogTitleChanged={this.catalogTitleChanged.bind(this)}
              catalogAbstractChanged={this.catalogAbstractChanged.bind(this)}
              exitCreateExhibition={this.exitCreateExhibition.bind(this)}
              catalogArray={this.state.catalogArray} />
          </div>
        </div>
      </div>
    )
  }
}

let createExpStyle = {
  base: {
    width: "1270px",
    height: "710px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "135px",
    marginBottom: "50px",
  },
  title: {
    height: "40px",
    lineHeight: "40px",
    fontSize: "30px",
    color: "#000000",
    textAlign: "left",
    marginBottom: "30px",
  },
  content: {
    height: "640px",
    width: "100%"
  },
  editGallery: {
    float: "left"
  },
  editDetail: {
    float: "left",
    marginLeft: "30px"
  }
};

CreateExhibition = Radium(CreateExhibition);

export default CreateExhibition;
