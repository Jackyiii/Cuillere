/**
 * Created by zhaojunbo on 2017/5/26.
 */
import IntlMessageFormat from "intl-messageformat";
import zh_CN from "./locale/zh_CN.jsx"
import en_US from "./locale/en_US.jsx"
import fr_FR from "./locale/fr_FR.jsx"

const MESSAGE = { en_US, zh_CN, fr_FR };

class Intl {
  static LOCALE = "en_US";

  static chooseLocale() {
    switch (navigator.language.split('_')[0]) {
      case 'en':
        return 'en_US';
        break;
      case 'zh':
        return 'zh_CN';
        break;
      case 'fr':
        return 'fr_FR';
        break;
      default:
        return 'en_US';
        break;
    }
  }

  static updateLanguage(language = null) {
    if (language == null) {
      this.LOCALE = this.chooseLocale();
    } else {
      this.LOCALE = language;
    }

    console.log("LOCALE：" + this.LOCALE);
  }

  static get(key, defaultMessage = null, options = null) {
    let result = (defaultMessage == null) ? key : defaultMessage;

    do {
      let loc = MESSAGE[this.LOCALE];
      if ("undefined" === typeof loc || loc == null) {
        break;
      }

      let msg = loc[key];
      if ("undefined" === typeof msg || msg == null) {
        break;
      }

      if (options) {
        msg = new IntlMessageFormat(msg, this.LOCALE);
        msg = msg.format(options);
      }

      result = msg;

    } while (false);

    return result;
  }
}

export default Intl;