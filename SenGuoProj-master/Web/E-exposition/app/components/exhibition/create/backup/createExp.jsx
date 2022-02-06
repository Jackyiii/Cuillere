/**
 * Created by zhaojunbo on 2017/7/21.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";
import Intl from "../../../intl/intl.jsx";
import Exhibit from "../../index.jsx";
import CreateExpBaseInfo from "./createExpBaseInfo.jsx";
import CreateExpAbstract from "./createExpAbstract.jsx";
import ShowExpInfo from "./showExpInfo.jsx";
import CreateExpCatalog from "./createExpCatalog.jsx";
import EditExpContent from "./editExpContent.jsx";

class CreateExp extends React.Component {

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

  constructor (props) {
    super(props);

    this.minChildIndex = 0;
    this.maxChildIndex = 4;
    this.uploading = false;
    /*
     * currComponentIndex: child component needs to show now.
     * catalogArray: array stores all catalogs of current exhibition
     * catalogImageMap: stores images of each catalog, witch key is catalogId
     * in catalogArray, value is image array of related catalog
     */
    this.state = {
      currComponentIndex: 0,
      catalogArray: [],
      catalogImageMap: {},
      selectedCatalogId: ""
    }
  }

  setExpType (typeStr) {
    //console.log("createExp::setExpType: " + typeStr);
    this.data.expType = typeStr;
  }

  setExpStartTime (startTimeStr) {
    //console.log("createExp::setExpStartTime: " + startTimeStr);
    this.data.expStartTime = startTimeStr;
  }

  setExpEndTime (endTimeStr) {
    //console.log("createExp::setExpEndTime: " + endTimeStr);
    this.data.expEndTime = endTimeStr;
  }

  setExpCost (costNum) {
    //console.log("createExp::setExpCost: " + costNum);
    this.data.expCost = costNum;
  }

  setExpTag (tagList) {

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

  setExpTitle (titleStr) {
    //console.log("createExp::setExpTitle: " + titleStr);
    this.data.expTitle = titleStr;
  }

  setExpSubject (subjectStr) {
    this.data.expSubject = subjectStr;
  }

  setExpAbstract (abstractStr) {
    //console.log("createExp::setExpAbstract: " + abstractStr);
    this.data.expAbstract = abstractStr;
  }

  addNewCatalog (event) {
    let newCatalogItem = {};
    newCatalogItem["expCatalogId"] = "catalogId_" + Math.random().toString(36);
    newCatalogItem["expCatalogTitle"] = "";
    newCatalogItem["expCatalogAbstract"] = "";
    newCatalogItem["expCatalogCoverImage"] = "";

    let newState = {};
    newState.catalogArray.push(newCatalogItem);
    newState.catalogImageMap[newCatalogItem["expCatalogId"]] = [];
    this.setState(newState);
  }

  deleteCatalog (catalogId) {

  }

  catalogSelected (catalogId) {

    let newState = {};
    newState.selectedCatalogId = catalogId;
    newState.currComponentIndex = 4; //go to selected catalog edit interface
    this.setState(newState);
  }

  catalogTitleChanged (catalogId, catalogTitle) {
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

  catalogAbstractChanged (catalogId, catalogAbstract) {
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

  addNewImageToCatalog (catalogId, imageData) {

    let newState = {};

    if (!this.state.catalogImageMap.hasOwnProperty(catalogId)) {
      newState.catalogImageMap[catalogId] = [];
    }

    // create new image and add it to catalog with catalogId
    let newImageItem = {};
    newImageItem["expItemId"] = "imageId_" + Math.random().toString(36);
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

  deleteImageFromCatalog (catalogId, imageId) {

  }

  imageTitleChanged (catalogId, imageId, imageTitle) {
    let newState = {};

    let findCatalog = false;

    if (newState.catalogImageMap.hasOwnProperty(catalogId)) {
      for (let i = 0; i < newState.catalogImageMap[catalogId].length; ++i) {
        if (newState.catalogImageMap[catalogId][i]["expItemId"] === imageId) {
          //console.log("image title of " + imageId + " is : " + imageTitle);
          newState.catalogImageMap[catalogId][i]["expItemTitle"] = imageTitle;
          findCatalog = true;
        }
      }
    }

    if (findCatalog) {
      this.setState(newState);
    }
  }

  imageAbstractChanged (catalogId, imageId, imageAbstract) {
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

  createExpCallback (statusCode, statusMsg, statusData) {
    if (statusCode === 20000) {
      this.data.expId = statusData.id;
    }
    console.log("createExp::createExpCallback status code: " + statusCode);
  }

  arrangeExhibition () {
    // call server to save exhibition base info and abstract info
    Exhibit.fetchExhibitionCreate(this.data, this.createExpCallback.bind(this));
  }

  createExpDetailCallback (statusCode, statusMsg) {
    // uploading ended
    this.uploading = false;

    if (statusCode === 20000) {
      history.back();
    }
    console.log("createExp::createExpDetailCallback status code: " + statusCode);
  }

  exitCreateExhibition () {

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

      Exhibit.fetchExhibitionDetailCreate(this.data.expId, expCatalogArray, this.createExpDetailCallback.bind(this));
    }
  }

  componentToGo (fromIndex, toIndex) {

    if (this.minChildIndex <= toIndex && toIndex <= this.maxChildIndex) {
      let newState = {};
      newState.currComponentIndex = toIndex;
      this.setState(newState);
    }
  }

  render () {
    return (
      <div>
        <CreateExpBaseInfo componentIndex={0}
                           contentToShow={this.state.currComponentIndex}
                           componentToGo={this.componentToGo.bind(this)}
                           setExpType={this.setExpType.bind(this)}
                           setExpStartTime={this.setExpStartTime.bind(this)}
                           setExpEndTime={this.setExpEndTime.bind(this)}
                           setExpCost={this.setExpCost.bind(this)}
        />
        <CreateExpAbstract componentIndex={1}
                           contentToShow={this.state.currComponentIndex}
                           componentToGo={this.componentToGo.bind(this)}
                           setExpTag={this.setExpTag.bind(this)}
                           setExpSubject={this.setExpSubject.bind(this)}
                           setExpTitle={this.setExpTitle.bind(this)}
                           setExpAbstract={this.setExpAbstract.bind(this)}
        />
        <ShowExpInfo componentIndex={2}
                     contentToShow={this.state.currComponentIndex}
                     componentToGo={this.componentToGo.bind(this)}
                     expType={this.data.expType}
                     expStartTime={this.data.expStartTime}
                     expEndTime={this.data.expEndTime}
                     expCost={this.data.expCost}
                     expTagList={this.data.expTagList}
                     expSubject={this.data.expSubject}
                     expTitle={this.data.expTitle}
                     expAbstract={this.data.expAbstract}
                     arrangeExhibition={this.arrangeExhibition.bind(this)}
        />
        <CreateExpCatalog componentIndex={3}
                          contentToShow={this.state.currComponentIndex}
                          componentToGo={this.componentToGo.bind(this)}
                          addNewCatalog={this.addNewCatalog.bind(this)}
                          deleteCatalog={this.deleteCatalog.bind(this)}
                          catalogSelected={this.catalogSelected.bind(this)}
                          catalogTitleChanged={this.catalogTitleChanged.bind(this)}
                          catalogAbstractChanged={this.catalogAbstractChanged.bind(this)}
                          exitCreateExhibition={this.exitCreateExhibition.bind(this)}
                          catalogArray={this.state.catalogArray}
        />
        <EditExpContent componentIndex={4}
                        contentToShow={this.state.currComponentIndex}
                        componentToGo={this.componentToGo.bind(this)}
                        addNewImageToCatalog={this.addNewImageToCatalog.bind(this)}
                        deleteImageFromCatalog={this.deleteImageFromCatalog.bind(this)}
                        imageAbstractChanged={this.imageAbstractChanged.bind(this)}
                        imageTitleChanged={this.imageTitleChanged.bind(this)}
                        exitCreateExhibition={this.exitCreateExhibition.bind(this)}
                        catalogBelongsTo={this.state.selectedCatalogId}
                        imageArray={this.state.catalogImageMap[this.state.selectedCatalogId]}
        />
      </div>
    );
  }
}

CreateExp = Radium(CreateExp);

export default CreateExp;
