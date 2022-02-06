/**
 * Created by zhaojunbo on 2017/8/2.
 */
import 'whatwg-fetch'
import {serverAddress} from "../../../externalStates/api.jsx";
import Auth from "../../login/Auth.jsx";

//singleton of Auth in es6
class Profile {
  constructor () {
    this.data = {
      apiToken: "", // aip_token on server
      userId: 0, // user_info.id on server
      listener: []
    };
  }

  addProfileListener (callback) {

    let exists = false;
    for (let index = 0; index < this.data.listener.length; ++index) {
      if (callback.name === this.data.listener[index].name) {
        exists = true;
      }
    }

    if (!exists) {
      this.data.listener.push(callback);
    }
  }

  removeProfileListener (callback) {

    // remove very callback from array
    this.data.listener = this.data.listener.filter(function (item) {
      return item.name !== callback.name;
    });
  }

  updateProfileData (statusCode, statusMsg, profileData) {
    this.data.listener.forEach(function (func) {
      func(statusCode, statusMsg, profileData);
    })
  }

  fetchUpdatePersonalInfo (userInfo, resultCallback) {

    let fetchBody = {};
    if (userInfo.familyName !== "") {
      fetchBody.surname = userInfo.familyName;
    }

    if (userInfo.firstName !== "") {
      fetchBody.givenname = userInfo.firstName;
    }

    if (userInfo.weChart !== "") {
      fetchBody.wechat = userInfo.weChart;
    }

    if (userInfo.facebook !== "") {
      fetchBody.facebook = userInfo.facebook;
    }

    if (userInfo.phoneNumber.length !== 0) {
      let phoneArray = [];

      userInfo.phoneNumber.forEach((phone) => {
        if (phone !== "") {
          phoneArray.push({telephone: phone});
        }
      });

      if (phoneArray.length !== 0) {
        fetchBody.telephones = phoneArray;
      }
    }

    if (userInfo.emailAddress.length !== 0) {
      let addressArray = [];

      userInfo.emailAddress.forEach((address) => {
        if (address !== "") {
          addressArray.push({email: address});
        }
      });

      if (addressArray.length !== 0) {
        fetchBody.emails = addressArray;
      }
    }

    if (userInfo.education.length !== 0) {
      let eduArray = [];

      userInfo.education.forEach((edu) => {
        if (edu !== "") {
          eduArray.push({education: edu});
        }
      });

      if (eduArray.length !== 0) {
        fetchBody.educations = eduArray;
      }
    }

    if (userInfo.languages.length !== 0) {
      let langArray = [];

      userInfo.languages.forEach((lang) => {
        if (lang !== "") {
          langArray.push({language: lang});
        }
      });

      if (langArray.length !== 0) {
        fetchBody.languages = langArray;
      }
    }

    if (userInfo.jobs.length !== 0) {
      let jobArray = [];

      userInfo.jobs.forEach((j) => {
        if (j !== "") {
          jobArray.push({job: j});
        }
      });

      if (jobArray.length !== 0) {
        fetchBody.jobs = jobArray;
      }
    }

    if (userInfo.skill.length !== 0) {
      let skillArray = [];

      userInfo.skill.forEach((skl) => {
        if (skl !== "") {
          skillArray.push({skill: skl});
        }
      });

      if (skillArray.length !== 0) {
        fetchBody.skills = skillArray;
      }
    }

    fetchBody.apitoken = Auth.data.apiToken;

    let fetchJson = JSON.stringify(fetchBody);

    fetch(serverAddress + "v1/user", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        //'Content-Type':'application/x-www-form-urlencoded'
      },
      body: fetchJson
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (stories) {

        resultCallback(stories.code, stories.msg);
        console.log("user change profile status code" + stories.code);
      });
  }

  fetchPersonalInfo (resultCallback) {

    let queryUrl = serverAddress + "v1/user" + "?" + "apitoken=" + Auth.data.apiToken;

    let self = this;
    fetch(queryUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (stories) {

        if (stories.code === 20000) {
          self.updateProfileData(stories.code, stories.msg, stories.data);
        }

        if (resultCallback) {
          resultCallback(stories.code, stories.msg, stories.data);
        }

        console.log("user change profile status code" + stories.code);
      });
  }

  fetchUploadCVFile (fileData, resultCallback) {

    let dataJson = JSON.stringify({
      apitoken: Auth.data.apiToken,
      filedata: fileData
    });

    let fileForm = new FormData();
    fileForm.append("file", fileData);
    fileForm.append("apitoken", Auth.data.apiToken);

    fetch(serverAddress + "v1/user/cv", {
      method: "POST",
      body: fileForm
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (stories) {

        resultCallback(stories.code, stories.msg, stories.data);
        console.log("Profile::fetchUploadCVFile status code" + stories.code);
      });
  }

  fetchUploadUserImage (userImageUrl, resultCallback) {

    let dataJson = JSON.stringify({
      apitoken: Auth.data.apiToken,
      avatar: userImageUrl
    });

    fetch(serverAddress + "v1/user/avatar", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        //'Content-Type':'application/x-www-form-urlencoded'
      },
      body: dataJson
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (stories) {

        resultCallback(stories.code, stories.msg, stories.data);
        console.log("Profile::fetchUploadUserImage status code" + stories.code);
      });
  }
}

const ProfileInstance = new Profile();
Object.freeze(ProfileInstance);

export default ProfileInstance;
