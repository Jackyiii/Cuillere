/**
 * Created by zhaojunbo on 2017/7/14.
 */
import React from "react";
import Radium from "radium";
import PropTypes from 'prop-types';
import {Route, Link} from "react-router-dom";
import Intl from "../../intl/intl.jsx";
import Profile from "./profile.jsx";
import PersonalImageEditor from "./personalImageEditor.jsx";
import PersonalInfoEditor from "./personalInfoEditor.jsx";
import PersonalAuthEditor from "./personalAuthEditor.jsx";

class Personal extends React.Component {
  // personal info data
  data = {
    familyName: "",
    firstName: "",
    weChart: "",
    facebook: "",
    phoneNumber: [],
    emailAddress: [],
    education: [],
    jobs: [],
    languages: [],
    skill: [],
    cvFile: {}
  };

  constructor (props) {
    super(props);

    this.state = {

      placeHolder: {
        firstNamePlaceHolder: "",
        familyNamePlaceHolder: "",
        weChartPlaceHolder: "",
        facebookPlaceHolder: "",
        phoneNumberPlaceHolder: [],
        emailAddressPlaceHolder: [],
        educationPlaceHolder: [],
        jobsPlaceHolder: [],
        languagesPlaceHolder: [],
        skillsPlaceHolder: []
      }
    }
  }

  /*
  *   personal Info editor related functions
  */

  componentWillMount () {
    this.getPersonInfo();
  }

  setFirstName (index, nameStr) {
    this.data.firstName = nameStr;
    //console.log("set first name called: " + showHint + " " + nameStr + " " + this.data);
  }

  setFamilyName (index, nameStr) {
    this.data.familyName = nameStr;
    //console.log("set family name called: " + showHint + " " + nameStr + " " + this.data);
  }

  setPhoneNumber (index, phoneStr) {
    if (this.data.phoneNumber.length > index) {
      this.data.phoneNumber[index] = phoneStr;
    } else {
      this.data.phoneNumber.push(phoneStr);
    }
    //console.log("set phone number called: " + showHint + " " + phoneStr + " " + this.data);
  }

  setEmailAddress (index, emailStr) {
    if (this.data.emailAddress.length > index) {
      this.data.emailAddress[index] = emailStr;
    } else {
      this.data.emailAddress.push(emailStr);
    }
    //console.log("set email address called: " + showHint + " " + emailStr + " " + this.data);
  }

  setWeChart (index, wechartStr) {
    this.data.weChart = wechartStr;
  }

  setFacebook (index, facebookStr) {
    this.data.facebook = facebookStr;
  }

  setEducation (index, educationStr) {
    if (this.data.education.length > index) {
      this.data.education[index] = educationStr;
    } else {
      this.data.education.push(educationStr);
    }
  }

  setJobs (index, jobStr) {
    if (this.data.jobs.length > index) {
      this.data.jobs[index] = jobStr;
    } else {
      this.data.jobs.push(jobStr);
    }
  }

  setLanguages (index, languageStr) {
    if (this.data.languages.length > index) {
      this.data.languages[index] = languageStr;
    } else {
      this.data.languages.push(languageStr);
    }
  }

  setSkills (index, skillStr) {
    if (this.data.skill.length > index) {
      this.data.skill[index] = skillStr;
    } else {
      this.data.skill.push(skillStr);
    }
  }

  setCVFile (file) {
    this.data.cvFile = file;
  }

  savePersonalInfoCallback (statusCode, statusMsg) {

    if (statusCode === 20000) {
      history.back();
    }
    console.log("Artist::savePersonalInfoCallback statusCode: " + statusCode);
  }

  saveCVFileCallback (statusCode, statusMsg, statusData) {
    console.log("Artist::savePersonalInfoCallback statusCode: " + statusCode);
  }

  savePersonalInfo () {
    console.log("Artist::savePersonalInfo " + this.data);
    Profile.fetchUpdatePersonalInfo(this.data, this.savePersonalInfoCallback.bind(this));
    Profile.fetchUploadCVFile(this.data.cvFile, this.saveCVFileCallback.bind(this));
  }

  getPersonInfoCallback (statusCode, statusMsg, statusData) {

    if (statusCode === 20000) {

      let newState = {};

      newState.placeHolder.familyNamePlaceHolder = statusData.surname;
      newState.placeHolder.firstNamePlaceHolder = statusData.givenname;
      newState.placeHolder.facebookPlaceHolder = statusData.facebook;
      newState.placeHolder.weChartPlaceHolder = statusData.wechat;

      statusData.emails.forEach((content) => {
        newState.placeHolder.emailAddressPlaceHolder.push(content.email);
      });

      statusData.telephones.forEach((content) => {
        newState.placeHolder.phoneNumberPlaceHolder.push(content.telephone);
      });

      statusData.educations.forEach((content) => {
        newState.placeHolder.educationPlaceHolder.push(content.education);
      });

      statusData.languages.forEach((content) => {
        newState.placeHolder.languagesPlaceHolder.push(content.lang);
      });

      statusData.professionals.forEach((content) => {
        newState.placeHolder.jobsPlaceHolder.push(content.profession);
      });

      statusData.skills.forEach((content) => {
        newState.placeHolder.skillsPlaceHolder.push(content.skill);
      });

      this.setState(newState);
    }

    console.log("Artist::getPersonInfoCallback statusCode: " + statusCode);
  }

  getPersonInfo () {
    console.log("Artist::getPersonInfo called");
    Profile.fetchPersonalInfo(this.getPersonInfoCallback.bind(this));
  }

  /*
   *  personal Image Editor related functions
   */

  setImageData (imageData) {
    this.userImageData = imageData;
    console.log("Artist::setImageData set new image data");
  }

  imageUploadCallback (statusCode, statusMsg) {
    console.log("Artist::imageUploadCallback statusCode: " + statusCode);
    // image upload complete, then quit current page
    Profile.fetchPersonalInfo();
    history.back();
  }

  confirmImageEdit () {
    console.log("Artist::confirmImageEdit called upload image to server");
    Profile.fetchUploadUserImage(this.userImageData, this.imageUploadCallback.bind(this));
  }

  PersonalImageEditorComponent () {
    return (
      <PersonalImageEditor setImageData={this.setImageData.bind(this)}
                           confirmImageEdit={this.confirmImageEdit.bind(this)}
      />
    );
  };

  PersonalInfoEditorComponent () {

    return (
      <PersonalInfoEditor
        setFirstName={this.setFirstName.bind(this)}
        setFamilyName={this.setFamilyName.bind(this)}
        setPhoneNumber={this.setPhoneNumber.bind(this)}
        setEmailAddress={this.setEmailAddress.bind(this)}
        setWeChart={this.setWeChart.bind(this)}
        setFacebook={this.setFacebook.bind(this)}
        setEducation={this.setEducation.bind(this)}
        setJobs={this.setJobs.bind(this)}
        setLanguages={this.setLanguages.bind(this)}
        setSkills={this.setSkills.bind(this)}
        setCVFile={this.setCVFile.bind(this)}
        savePersonalInfo={this.savePersonalInfo.bind(this)}


        firstNamePlaceHolder={this.state.placeHolder.firstNamePlaceHolder}
        familyNamePlaceHolder={this.state.placeHolder.familyNamePlaceHolder}
        phoneNumberPlaceHolder={this.state.placeHolder.phoneNumberPlaceHolder}
        emailAddressPlaceHolder={this.state.placeHolder.emailAddressPlaceHolder}
        weChartPlaceHolder={this.state.placeHolder.weChartPlaceHolder}
        facebookPlaceHolder={this.state.placeHolder.facebookPlaceHolder}
        educationPlaceHolder={this.state.placeHolder.educationPlaceHolder}
        jobsPlaceHolder={this.state.placeHolder.jobsPlaceHolder}
        languagesPlaceHolder={this.state.placeHolder.languagesPlaceHolder}
        skillsPlaceHolder={this.state.placeHolder.skillsPlaceHolder}
      />
    );
  };

  PersonalInfoAuthEditorComponent () {
    return (
      <PersonalAuthEditor/>
    );
  };

  back = (event) => {
    event.stopPropagation();
    //console.log(this.props.from);
    history.back();
  };

  render () {
    return (
      <div>
        <Route path="/personal/image" component={this.PersonalImageEditorComponent.bind(this)}/>
        <Route path="/personal/info" component={this.PersonalInfoEditorComponent.bind(this)}/>
        <Route path="/personal/auth" component={this.PersonalInfoAuthEditorComponent.bind(this)}/>
      </div>
    );
  }
}

Personal = Radium(Personal);

export default Personal;
