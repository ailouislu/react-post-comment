import http from "./httpService";
import url from "../config.json";

const apiEndpoint = url.apiUrl + "/posts";

function postUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPosts() {
  return http.get(apiEndpoint);
}

export function getPost(postId) {
  return http.get(postUrl(postId));
}

export function savePost(post) {
  if (post.id) {
    const body = { ...post };
    delete body.id;
    return http.put(postUrl(post.id), body);
  }

  return http.post(apiEndpoint, post);
}

export function deletePost(postId) {
  return http.delete(postUrl(postId));
}
