import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authSlice } from "./authReduser";
import { updateProfile, onAuthStateChanged, signOut } from "firebase/auth";

// import db from "../../firebase/config";

export const registerDB =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      console.log("displayName!!!!!", user.displayName);

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickName: user.displayName,
          email: user.email,
        })
      );
      console.log("user", user);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const loginDB =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      console.log("auth", auth);
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user.user);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const logoutDB = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSlice.actions.authLogout());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickName: user.displayName,
        email: user.email,
      };
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};
