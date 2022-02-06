import 'whatwg-fetch';
import testData from './testData.jsx';
import PropTypes from "prop-types";

let serverAddress = "https://senguoproj.herokuapp.com/api/";
let fakeData = true;

let API = {
  fetch: {
    home: () => {
      if (fakeData) {
        return Promise.resolve({
          nav: {
            backgroundImage: "url(https://cdn-images-1.medium.com/max/2000/1*278tqw9zNPe2WCAz29Wzdw.jpeg)",
          },
          poster: testData.testPosterData,
          publicExhibitions: testData.testPublicExpData,
          individualExhibition: testData.testIndividualExhibitionData,
          event: testData.testEventsData,
          schoolExhibition: testData.testSchoolExhibition,
          person: testData.testRecommendPerson()
        });
      } else {
        throw "";
      }
    },
    exhibitionOptions: () => {
      if (fakeData) {
        return Promise.resolve([
          [{label: "全球", value: "global"}, {label: "中国", value: "china"},],    //"美国", "法国", "英国"
          [{label: "热度", value: "hottest"}, {label: "最新", value: "newest"},],  //"评论最多", "免费", "付费"
          [{label: "综合", value: "sum"},],
          [{label: "个人", value: "individual"}, {label: "学校", value: "school"},]   //"官方", "企业"
        ]);
      } else {
        throw "";
      }
    },
    exhibitions: (section) => {
      if (fakeData) {
        let exhibitionArray = [];
        for (let i = 0; i < 100; i++) {
          exhibitionArray.push({
            expSection: section,
            expId: "expListItem" + i.toString(),
            coverImage: require("./placeholder.png"),
            expAuthor: "Zachary" + section,
            expTitle: "BRONZE" + i.toString(),
            expStartTime: '10/10/2017',
            expStopTime: '23/11/2017',
            expSeenCount: 5235,
            expLikeCount: 2134,
            marked: false,
          })
        }

        let result = {};
        result[section] = exhibitionArray;
        return Promise.resolve(result);
      } else {
        throw "";
      }
    },
    exhibitionDetails: (section, id) => {
      if (fakeData) {
        let i = id.replace(/[^0-9]/ig, "");
        i = parseInt(i);

        return Promise.resolve({
          prev: i === 0 ? null : "expListItem" + (i - 1),
          next: i === 20 ? null : "expListItem" + (i + 1),
          expSection: section,
          expId: "expListItem" + i,
          coverImage: require("./placeholder.png"),
          expAuthor: "Zachary" + section,
          expTitle: "BRONZE" + i,
          expStartTime: '10/10/2017',
          expStopTime: '23/11/2017',
          expSeenCount: 5235,
          expLikeCount: 2134,
          marked: false,

          // below are level1 data
          about: "paris, FRANCE//Art//Artist",
          abstract: "Se pose la question de la miniaturisation de la bombe et, du côté du missile intercontinental, celle du véhicule de rentrée dans l’atmosphère (soumis à des chaleurs et pressions extrêmes) qui accueille la bombe.C’est pour ça que la Corée du Nord aura besoin de réaliser d’autres essais balistiques intercontinentaux pour améliorer sa technologie et tenter de nous convaincre qu’elle la maîtrise.",
          images: [...new Array(9).keys()].map(() => { return "https://cdn-images-1.medium.com/max/2000/1*278tqw9zNPe2WCAz29Wzdw.jpeg"}),
          expMode: ["portrait", "squared", "squared", "portrait", "squared",][i % 5],
          free: [true, false][i % 2],
          paid: [null, true, null, false][i % 4],
          tags: ["Assumait", "Positions", "Irrespect", "Positions", "Assumait"],
          authorAvatar: require("./placeholder.png"),
          authorLocation: "Paris, FRANCE",
          comments: [
            {
              authorAvatar: require("./placeholder.png"),
              author: "Martin Hoang",
              time: "10 months ago",
              likeCount: "13",
              comments: [{
                likeCount: "13",
                authorAvatar: require("./placeholder.png"),
                author: "Martin Hoang",
                time: "10 months ago",
                content: "Se pose la question de la miniaturisation de la bombe et, du côté du missile intercontinental, celle du véhicule de rentrée dans l’atmosphère (soumis à des chaleurs et pressions extrêmes) qui accueille la bombe.C’est pour ça que la Corée du Nord aura besoin de réaliser d’autres essais balistiques intercontinentaux pour améliorer sa technologie et tenter de nous convaincre qu’elle la maîtrise.",
              }, {
                likeCount: "13", comments: [],
                authorAvatar: require("./placeholder.png"),
                author: "Martin Hoang",
                time: "10 months ago",
                content: "Se pose la question de la miniaturisation de la bombe et, du côté du missile intercontinental, celle du véhicule de rentrée dans l’atmosphère (soumis à des chaleurs et pressions extrêmes) qui accueille la bombe.C’est pour ça que la Corée du Nord aura besoin de réaliser d’autres essais balistiques intercontinentaux pour améliorer sa technologie et tenter de nous convaincre qu’elle la maîtrise.",
              }],
              content: "Se pose la question de la miniaturisation de la bombe et, du côté du missile intercontinental, celle du véhicule de rentrée dans l’atmosphère (soumis à des chaleurs et pressions extrêmes) qui accueille la bombe.C’est pour ça que la Corée du Nord aura besoin de réaliser d’autres essais balistiques intercontinentaux pour améliorer sa technologie et tenter de nous convaincre qu’elle la maîtrise.",
            }, {
              likeCount: "13", comments: [],
              authorAvatar: require("./placeholder.png"),
              author: "Martin Hoang",
              time: "10 months ago",
              content: "Se pose la question de la miniaturisation de la bombe et, du côté du missile intercontinental, celle du véhicule de rentrée dans l’atmosphère (soumis à des chaleurs et pressions extrêmes) qui accueille la bombe.C’est pour ça que la Corée du Nord aura besoin de réaliser d’autres essais balistiques intercontinentaux pour améliorer sa technologie et tenter de nous convaincre qu’elle la maîtrise.",
            }, {
              likeCount: "13", comments: [],
              authorAvatar: require("./placeholder.png"),
              author: "Martin Hoang",
              time: "10 months ago",
              content: "Se pose la question de la miniaturisation de la bombe et, du côté du missile intercontinental, celle du véhicule de rentrée dans l’atmosphère (soumis à des chaleurs et pressions extrêmes) qui accueille la bombe.C’est pour ça que la Corée du Nord aura besoin de réaliser d’autres essais balistiques intercontinentaux pour améliorer sa technologie et tenter de nous convaincre qu’elle la maîtrise.",
            }]
        });
      } else {
        throw "";
      }
    },
    exhibitionSubDetails: (section, expId, hallId) => {
      if (fakeData) {
        return Promise.resolve({
          expId: expId,
          hallIndex: hallId,
          end: hallId === 8 ? true : null,
          comments: [
            {
              authorAvatar: require("./placeholder.png"),
              author: "Martin Hoang",
              time: "10 months ago",
              likeCount: "13",
              comments: [{
                likeCount: "13",
                authorAvatar: require("./placeholder.png"),
                author: "Martin Hoang",
                time: "10 months ago",
                content: "Se pose la question de la miniaturisation de la bombe et, du côté du missile intercontinental, celle du véhicule de rentrée dans l’atmosphère (soumis à des chaleurs et pressions extrêmes) qui accueille la bombe.C’est pour ça que la Corée du Nord aura besoin de réaliser d’autres essais balistiques intercontinentaux pour améliorer sa technologie et tenter de nous convaincre qu’elle la maîtrise.",
              }, {
                likeCount: "13",
                authorAvatar: require("./placeholder.png"),
                author: "Martin Hoang",
                time: "10 months ago",
                content: "Se pose la question de la miniaturisation de la bombe et, du côté du missile intercontinental, celle du véhicule de rentrée dans l’atmosphère (soumis à des chaleurs et pressions extrêmes) qui accueille la bombe.C’est pour ça que la Corée du Nord aura besoin de réaliser d’autres essais balistiques intercontinentaux pour améliorer sa technologie et tenter de nous convaincre qu’elle la maîtrise.",
              }],
              content: "Se pose la question de la miniaturisation de la bombe et, du côté du missile intercontinental, celle du véhicule de rentrée dans l’atmosphère (soumis à des chaleurs et pressions extrêmes) qui accueille la bombe.C’est pour ça que la Corée du Nord aura besoin de réaliser d’autres essais balistiques intercontinentaux pour améliorer sa technologie et tenter de nous convaincre qu’elle la maîtrise.",
            }, {
              likeCount: "13", comments: [],
              authorAvatar: require("./placeholder.png"),
              author: "Martin Hoang",
              time: "10 months ago",
              content: "Se pose la question de la miniaturisation de la bombe et, du côté du missile intercontinental, celle du véhicule de rentrée dans l’atmosphère (soumis à des chaleurs et pressions extrêmes) qui accueille la bombe.C’est pour ça que la Corée du Nord aura besoin de réaliser d’autres essais balistiques intercontinentaux pour améliorer sa technologie et tenter de nous convaincre qu’elle la maîtrise.",
            }, {
              likeCount: "13", comments: [],
              authorAvatar: require("./placeholder.png"),
              author: "Martin Hoang",
              time: "10 months ago",
              content: "Se pose la question de la miniaturisation de la bombe et, du côté du missile intercontinental, celle du véhicule de rentrée dans l’atmosphère (soumis à des chaleurs et pressions extrêmes) qui accueille la bombe.C’est pour ça que la Corée du Nord aura besoin de réaliser d’autres essais balistiques intercontinentaux pour améliorer sa technologie et tenter de nous convaincre qu’elle la maîtrise.",
            }],
          images: [require("../components/exhibition/level2/exp.png"), "https://cdn-images-1.medium.com/max/2000/1*278tqw9zNPe2WCAz29Wzdw.jpeg", require("../components/exhibition/level2/exp.png"), require("../components/exhibition/level2/exp.png"), require("../components/exhibition/level2/exp.png"), require("../components/exhibition/level2/exp.png"), require("../components/exhibition/level2/exp.png"), require("../components/exhibition/level2/exp.png"), require("../components/exhibition/level2/exp.png"),]
        });
      } else {
        throw "";
      }
    },
    artistOptions: () => {
      if (fakeData) {
        return Promise.resolve({
          mainMotto: "To see a world in a grain of sand, And a heaven in a wild flower,",
          subMotto: "Hold infinity in the palm of your hand, And eternity.",

          options: [
            [{label: "全球", value: "global"}, {label: "中国", value: "china"},],
            [{label: "旅行博主", value: "travel"}, {label: "美食博主", value: "food"},],
            [{label: "热度", value: "hottest"}, {label: "最新", value: "newest"},],
          ]
        });
      } else {
        throw "";
      }
    },
    artists: (section, segment) => {
      if (fakeData) {
        let sec = section || "";

        let artists = {};
        artists[section] = [...new Array(450).keys()].map((item, i) => {
          return {
            personId: i,
            personName: sec + " Person " + i,
            personAbstract: i + "To see a world in a grain of sand, And a heaven in a wild flower,",
            imageUrl: ["http://mpic.tiankong.com/969/80a/96980ab18d9a2166118b090cca0f6ed5/640.jpg", "http://mpic.tiankong.com/8c4/e2e/8c4e2efe015886f2002be551bd60fcf9/640.jpg", "http://mpic.tiankong.com/969/80a/96980ab18d9a2166118b090cca0f6ed5/640.jpg"][i % 3]
          }
        });

        return Promise.resolve({
          section: section,
          segmentId: segment,
          artists
        });
      } else {
        throw "";
      }
    },
    artist: (id) => {
      if (fakeData) {
        let collections = [];
        let personalExhibitions = [];

        for (let i = 0; i < 100; i++) {
          collections.push({
            expired: Math.random() < 0.2,
            expId: "expListItem" + i.toString(),
            image: require("./placeholder.png"),
            author: "Zachary",
            mainTitle: "BRONZE" + i.toString(),
            subTitle: "This is a subtitle",
            startTime: '10/10/2017',
            endTime: '23/11/2017',
            abstract: "This is an abstract"
          });

          personalExhibitions.push({
            expId: "expListItem" + i.toString(),
            image: require("./placeholder.png"),
            author: "Zachary",
            mainTitle: "BRONZE" + i.toString(),
            subTitle: "This is a subtitle",
            startTime: '10/10/2017',
            endTime: '23/11/2017',
            likeCount: 3323,
            watchCount: "231万",
            commentCount: "321"
          })
        }

        return Promise.resolve({
          id, collections, personalExhibitions,
          avatar: require("./placeholder.png"),
          name: "Zhang zhasndgasl",
          country: "Paris, FRANCE",
          info: "Par son enfance au contact de différentes sociétés aux formes",
          followerCount: "300万",
          followingCount: "30",
          exhibitionCount: personalExhibitions.length,
          isSelf: (+id & 1) === 0
        });
      } else {
        throw "";
      }
    },
    country: () => {
      if (fakeData) {
        return Promise.resolve([
          {label: "Country", value: "-"},
          {label: "China", value: "China"},
          {label: "France", value: "France"},
          {label: "America", value: "America"}
        ]);
      } else {
        throw "";
      }
    },
    area: (country) => {
      if (fakeData) {
        return Promise.resolve(
          country == "China" ? [{label: "Beijing", value: "Beijing"}, {
              label: "Nanjing",
              value: "Nanjing"
            }, {label: "Shanghai", value: "Shanghai"}] :
            country == "France" ? [{label: "Paris", value: "Paris"}, {label: "Another", value: "Another"}] :
              country == "America" ? [{label: "New York", value: "New York"}, {
                label: "Washington DC",
                value: "Washington DC"
              }] : [{label: "Area", value: "-"}]);
      } else {
        throw "";
      }
    },
    follower: (id) => {
      if (fakeData) {
        let followers = [];

        for (let i = 0; i < 100; i++) {
          followers.push({
            id: i,
            avatar: require("./placeholder.png"),
            name: "Zhang zhasndgasl",
            location: "Paris, FRANCE",
            info: "Par son enfance au",
            followed: (i & 1) === 0,
            exhibitions: [
              {id: "expListItem1", img: require("./placeholder.png")},
              {id: "expListItem2", img: require("./placeholder.png")},
              {id: "expListItem3", img: require("./placeholder.png")},
              {id: "expListItem4", img: require("./placeholder.png")},
            ]
          })
        }

        return Promise.resolve(followers);
      } else {
        throw "";
      }
    },
    following: (id) => {
      if (fakeData) {
        let following = [];

        for (let i = 0; i < 100; i++) {
          following.push({
            id: i,
            avatar: require("./placeholder.png"),
            name: "Zhang zhasndgasl",
            location: "Paris, FRANCE",
            info: "Par son enfance au",
            followed: (i & 1) === 0,
            exhibitions: [
              {id: "expListItem1", img: require("./placeholder.png")},
              {id: "expListItem2", img: require("./placeholder.png")},
              {id: "expListItem3", img: require("./placeholder.png")},
              {id: "expListItem4", img: require("./placeholder.png")},
            ]
          })
        }

        return Promise.resolve(following);
      } else {
        throw "";
      }
    },
  },
  notification: (id) => {
    if (fakeData) {
      let all = [];
      let follow = [];
      let message = [];

      for (let i = 0; i < 100; i++) {
        all.push({
          expId: "expListItem" + i.toString(),
          image: require("./placeholder.png"),
          author: "Zachary",
          mainTitle: "BRONZE" + i.toString(),
          subTitle: "This is a subtitle",
          startTime: '10/10/2017',
          endTime: '23/11/2017',
          abstract: "This is an abstract"
        });

        follow.push({
          expId: "expListItem" + i.toString(),
          image: require("./placeholder.png"),
          author: "Zachary",
          mainTitle: "BRONZE" + i.toString(),
          subTitle: "This is a subtitle",
          startTime: '10/10/2017',
          endTime: '23/11/2017',
          likeCount: 3323,
          watchCount: "231万",
          commentCount: "321"
        });

        message.push({})
      }

      return Promise.resolve({
        id, all, follow, message
      });
    } else {
      throw "";
    }
  },
  userLogin: (userEmail, userPassword, resultCallback) => {
    let self = this;
    fetch(serverAddress + "v1/user/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
          //'Content-Type':'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword
        })
      }
    ).then(
      function (response) {
        return response.json();
      }
    ).then(
      function (stories) {
        if (stories.code === 20000) {
          self.updateAuthData(stories.data.api_token, stories.data.user_info.id);

          console.log("get user token from server :" + self.data.apiToken);
          console.log("get user id from server :" + self.data.userId);
        }

        if (resultCallback) {
          resultCallback(stories.code, stories.msg);
        }

        console.log("Auth::fetchUserLogin" + stories.msg);
      }
    );
  },
  userRegister: (userFamilyName, userGivenName, userEmail, userPassword, resultCallback) => {
    let self = this;

    fetch(serverAddress + "v1/user/register", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        //'Content-Type':'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        surname: userFamilyName,
        givenname: userGivenName
      })
    }).then(function (response) {
      return response.json();
    }).then(function (stories) {
      if (stories.code === 20000) {
        self.updateAuthData(stories.data.api_token, stories.data.user_info.id);

        resultCallback(stories.code, stories.msg);

        console.log("get user token from server :" + self.data.apiToken);
        console.log("get user id from server :" + self.data.userId);
      } else {
        resultCallback(stories.code, stories.msg);

        console.log("user register :" + stories.msg);
      }
    });
  },
  userVerifyEmail: (userEmail, resultCallback) => {
    fetch(serverAddress + "v1/user/email/verify", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        //'Content-Type':'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        email: userEmail
      })
    }).then(function (response) {
      return response.json();
    }).then(function (stories) {
      resultCallback(stories.code, stories.msg);
      console.log("user verify email :" + userEmail + " status code" + stories.code);
    });
  },
  userUpdateEmail: (newUserEmail) => {
    console.log("user update email :" + newUserEmail);
  },
  uploadExpImage: (userImageUrl, resultCallback) => {
    let fileForm = new FormData();
    fileForm.append("file", userImageUrl);
    fileForm.append("apitoken", Auth.data.apiToken);

    fetch(serverAddress + "v1/user/cv", {
      method: "POST",
      body: fileForm
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (stories) {
        resultCallback(stories.code, stories.msg);
        console.log("Exhibit::fetchUploadUserImage status code" + stories.code);
      });
  },
  exhibitionCreate (expData, resultCallback) {
    let dataJson = JSON.stringify({
      apitoken: Auth.data.apiToken,
      expType: expData.expType,
      expStartTime: expData.expStartTime,
      expEndTime: expData.expEndTime,
      expCost: expData.expCost,
      expTagList: expData.expTagList,
      expTitle: expData.expTitle,
      expSubject: expData.expSubject,
      expAbstract: expData.expAbstract,
    });

    fetch(serverAddress + "v1/expo/create", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        //'Content-Type':'application/x-www-form-urlencoded'
      },
      body: dataJson
    }).then(function (response) {
      return response.json();
    }).then(function (stories) {

      resultCallback(stories.code, stories.msg, stories.data);
      console.log("Exhibit::fetchExhibitionCreate status code" + stories.code);
    });
  },

  exhibitionDetailCreate: (expId, expCatalogArray, resultCallback) => {
    let dataJson = JSON.stringify({
      apitoken: Auth.data.apiToken,
      expId: expId,
      expCatalogArray: expCatalogArray
    });

    fetch(serverAddress + "v1/expo/detail/create", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        //'Content-Type':'application/x-www-form-urlencoded'
      },
      body: dataJson
    }).then(function (response) {
      return response.json();
    }).then(function (stories) {

      resultCallback(stories.code, stories.msg);
      console.log("Exhibit::fetchExhibitionCreate status code" + stories.code);
    });
  },

  recentExhibition: (limit, offset, resultCallback) => {
    let dataJson = JSON.stringify({
      apitoken: Auth.data.apiToken,
      action: "recent",
      limit: limit,
      offset: offset,
    });

    fetch(serverAddress + "v1/expo", {
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
        console.log("Exhibit::fetchRecentExhibition status code" + stories.code);
      });
  },
  selfExhibition: (limit, offset, resultCallback) => {
    let queryUrl = serverAddress + "v1/expo" +
      "?" + "apitoken=" + Auth.data.apiToken +
      "&" + "limit=" + limit +
      "&" + "offset=" + offset;

    fetch(queryUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (stories) {

        if (stories.code === 20000) {
          resultCallback(stories.code, stories.msg, stories.data);
        }

        console.log("Exhibit::fetchSelfExhibition " + stories.code);
      });
  },
  catalogDetail: (expId, resultCallback) => {
    let queryUrl = serverAddress + "v1/expo/" + expId + "/detail?apitoken=" + Auth.data.apiToken;

    fetch(queryUrl).then(function (response) {
      return response.json();
    }).then(function (stories) {
      if (stories.code === 20000) {
        resultCallback(stories.code, stories.msg, stories.data);
      }

      console.log("Exhibit::fetchCatalogDetail " + stories.code);
    });
  }
};

export {serverAddress, API};
