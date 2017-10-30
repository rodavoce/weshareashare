import * as SessionAPI from './api';
import * as SessionRedux from './redux'

const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

let sessionTimeout = null;

const setSessionTimeout = (duration) => {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(
    refreshToken,
    (duration - SESSION_TIMEOUT_THRESHOLD) * 1000
  );
};

const clearSession = (dispatch) => {
  clearTimeout(sessionTimeout);
  dispatch(SessionRedux.update(SessionRedux.initialState));
};

const onRequestSuccess = (response, dispatch) => {
  const tokens = response.tokens.reduce((prev, item) => ({
    ...prev,
    [item.type]: item,
  }), {});
  dispatch(SessionRedux.update({ tokens, user: response.user }));
  setSessionTimeout(tokens.access.expiresIn);
};

const onRequestFailed = (exception) => {
  clearSession();
  throw exception;
};

export const refreshToken = () => {
  return (dispatch, getState) => {
    const session = getState().session;

    if (!session.tokens.refresh.value || !session.user.id) {
      return Promise.reject();
    } else {
      SessionAPI.refresh(session.tokens.refresh, session.user, session.tokens.access)
        .then(onRequestSuccess(dispatch))
        .catch(onRequestFailed);
    }
  }
};

export const authenticate = (email, password) => {
  return (dispatch, getState) => {
    const session = getState().session;
    SessionAPI.authenticate(email, password, session.tokens.access)
      .then(onRequestSuccess)
      .catch(onRequestFailed);
  }
}

export const revoke = () => {
  return (dispatch, getState) => {
    const session = getState().session;
    SessionAPI.revoke(Object.keys(session.tokens).map(tokenKey => ({
      type: session.tokens[tokenKey].type,
      value: session.tokens[tokenKey].value,
    })), session.tokens.access)
      .then(clearSession(dispatch))
      .catch(() => {});
  }
};