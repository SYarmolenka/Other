import firebase from 'firebase';

class Local {
  write (name, data, uid) {
    if (uid) {
      firebase.database().ref('users/' + uid).set(data.data);
    } else {
      window.localStorage.setItem(name, JSON.stringify(data));
    }
  };
  read (name, uid) {
    if (uid) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('users/' + uid).once('value').then(result => {
          result = result.val();
          let data = result ? {data: result} : {data: []};
          resolve(data);
        });
      });
    };
    return new Promise((resolve, reject) => {
      let result = JSON.parse(window.localStorage.getItem(name));
      if (result === null) {
        result = {data: [
          {key: `1518520353709`, done: false, title: `The data of localStorage`, priority: `3`, date: `12.02.2018`, description: `LocalStorage`}
        ]};
      };
      setTimeout(resolve, 0, result);
    });
  }
};

export default new Local();
