import {
  GET_ROLE_DATA,
  GET_ROLE_DATA_SUCCESS,
  GET_ROLE_DATA_FAILURE,
  PUT_ROLE_DATA,
  PUT_ROLE_DATA_SUCCESS,
  PUT_ROLE_DATA_FAILURE,
  FETCH_ROLE_USERS,
  FETCH_ROLE_USERS_SUCCESS,
  FETCH_ROLE_USERS_FAILURE,
} from '../constants/actionTypes';

export const getRoleData  = () => ({
  type: GET_ROLE_DATA,
});

export const getRoleDataSuccess = (response) => ({
  type: GET_ROLE_DATA_SUCCESS,
  response,
});

export const getRoleDataFailure = (error) => ({
  type: GET_ROLE_DATA_FAILURE,
  error,
});

export const putRoleData  = (roleData) => ({
  type: PUT_ROLE_DATA,
  roleData,
});

export const putRoleDataSuccess = (roleData) => ({
  type: PUT_ROLE_DATA_SUCCESS,
  roleData,
});

export const putRoleDataFailure = (error) => ({
  type: PUT_ROLE_DATA_FAILURE,
  error,
});

export const fetchRoleUsers = roleId => ({
  type: FETCH_ROLE_USERS,
  roleId
});

export const fetchRoleUsersSuccess = ({roleName, users}) => ({
  type: FETCH_ROLE_USERS_SUCCESS,
  users,
  roleName
});

export const fetchRoleUsersFailure = error => ({
  type: FETCH_ROLE_USERS_FAILURE,
  error
});
