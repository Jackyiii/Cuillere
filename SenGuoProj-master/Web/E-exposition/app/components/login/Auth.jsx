/**
 * Created by zhaojunbo on 2017/5/29.
 */

//singleton of Auth in es6
class Auth {
  constructor () {
    this.data = {
      apiToken: "", // aip_token on server
      userId: 0, // user_info.id on server
      listener: []
    };
  }

  addAuthListener (callback) {
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

  removeAuthListener (callback) {
    // remove very callback from array
    this.data.listener = this.data.listener.filter(function (item) {
      return item.name !== callback.name;
    });
  }

  updateAuthData (apiToken, userId) {
    // change data
    this.data.apiToken = apiToken;
    this.data.userId = userId;

    // notify all listeners
    this.data.listener.forEach(function (callback) {
      return callback(userId);
    })
  }

  getAuthData() {
    return this.data;
  }
}

const AuthInstance = new Auth();
Object.freeze(AuthInstance);

export default AuthInstance;
