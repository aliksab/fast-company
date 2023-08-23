import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { getUserID } from "../services/localStorage.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequesFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsCreate(state, action) {
            state.entities.push(action.payload);
        },
        commentsDelete(state, action) {
            state.entities = state.entities.filter(c => c._id !== action.payload);
        }
    }
});
const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceved, commentsRequesFiled, commentsCreate, commentsDelete } = actions;
const newCommentsRequested = createAction("comments/newCommentsRequested");
const deleteCommentsRequested = createAction("comments/deleteCommentsRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequesFiled(error.message));
    }
};
export const createComments = (payload) => async (dispatch) => {
    dispatch(newCommentsRequested(payload));
    try {
        const comment = {
            ...payload,
            _id: nanoid(),
            created_at: Date.now(),
            userId: getUserID()
        };
        // console.log(comment);
        const { content } = await commentService.createComment(comment);
        // console.log(content);
        dispatch(commentsCreate(content));
    } catch (error) {
        dispatch(commentsRequesFiled(error.message));
    }
};
export const removeComments = (commentId) => async (dispatch) => {
    dispatch(deleteCommentsRequested());
    console.log(commentId);
    try {
        await commentService.removeComment(commentId);
        // dispatch(commentsDelete(content));
        dispatch(commentsDelete(commentId));
    } catch (error) {
        dispatch(commentsRequesFiled(error.message));
    }
};
export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
