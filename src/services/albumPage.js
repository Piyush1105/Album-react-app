import { apiVersion } from "../config/config";
import ApiService from "./../utils/api-service";

export function getAlbumListApi(data) {
  let apiUrl = `${apiVersion}`;

  //   if (data?.pageOffset !== undefined) {
  //     apiUrl += `&pageOffset=${data?.pageOffset}`;
  //   }

  const options = {
    method: "GET",
    url: apiUrl,
    data: data,
  };
  return ApiService(options);
}

export function deleteAlbumApi(data) {
  let apiUrl = `${apiVersion}/id=${data?.deleteId}`;

  const options = {
    method: "DELETE",
    url: apiUrl,
  };
  return ApiService(options);
}

export function addAlbumApi(data) {
  let apiUrl = `${apiVersion}`;

  const options = {
    method: "POST",
    url: apiUrl,
    data: data,
  };
  return ApiService(options);
}

export function updateAlbumApi(data) {
  let apiUrl = `${apiVersion}/id=${data?.id}`;

  const options = {
    method: "PATCH",
    url: apiUrl,
    data: data,
  };
  return ApiService(options);
}
