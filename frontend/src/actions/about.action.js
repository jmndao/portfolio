import axios from "axios";
import {
    ABOUT_PROFILE_INFO_FAIL,
    ABOUT_PROFILE_INFO_REQUEST,
    ABOUT_PROFILE_INFO_SUCCESS,
    ABOUT_PROFILE_UPDATE_REQUEST,
    ABOUT_PROFILE_UPDATE_SUCCESS,
    ABOUT_PROFILE_UPDATE_FAIL,
    FIREBASE_UPLOAD_PROGRESS,
    FIREBASE_UPLOAD_END,
    FIREBASE_UPLOAD_ERROR
} from "../constants/about.constant";
import { storage } from "../fireStore";

const fetchAbout = () => async(dispatch) => {

    try {
        dispatch({ type: ABOUT_PROFILE_INFO_REQUEST });
        const { data } = await axios.get("/api/about/jmndao");

        dispatch({ type: ABOUT_PROFILE_INFO_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: ABOUT_PROFILE_INFO_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
};


const updateAbout = (profileInfo) => async(dispatch, getState) => {

    try {
        dispatch({ type: ABOUT_PROFILE_UPDATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put('/api/about/jmndao', profileInfo, config);

        dispatch({ type: ABOUT_PROFILE_UPDATE_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: ABOUT_PROFILE_UPDATE_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message : err.message,
        });
    }
}

const firebaseUpload = (file, key) => (dispatch) => {

    const id = key;

    const storageRef = storage.ref(`portfolio/${file.name}`);

    const task = storageRef.put(file);

    task.on(
        "state_changed",

        function progress(snapshot) {
            //var percentage = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes).toFixed(2) * 100;
            dispatch({ type: FIREBASE_UPLOAD_PROGRESS, payload: id });
        },

        function error(err) {
            dispatch({ type: FIREBASE_UPLOAD_ERROR, payload: err })
        },

        function complete() {
            task.snapshot.ref.getDownloadURL().then(fileUrl => {
                dispatch({ type: FIREBASE_UPLOAD_END, payload: fileUrl })
            });
        }
    )
}

export { fetchAbout, updateAbout, firebaseUpload };