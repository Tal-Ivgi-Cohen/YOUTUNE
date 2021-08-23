
export const storageService = {
  updateUser,

};

//UPDATE
async function updateUser(updatedUser) {
  _saveLocalUser(updatedUser);
  return;
}

function _saveLocalUser(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
  return user;
}

