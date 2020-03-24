export const thunk = store => next => action => {
  const { dispatch, getState } = store;
  return typeof action === "function"
    ? action(dispatch, getState)
    : next(action);
};
