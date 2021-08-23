import { utilService } from "../utilService";

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
};

async function query(entityType) {
  let entities = await JSON.parse(localStorage.getItem(entityType)) || [];
  return entities;
}

async function get(entityType, entityId) {
  const entities = await query(entityType);
  return entities.find(entity => entity._id === entityId);
}

async function post(entityType, newEntity) {
  newEntity._id = utilService.makeId();
  const entities = await query(entityType);
  entities.unshift(newEntity);
  _save(entityType, entities);
  return entities;
}

async function put(entityType, updatedEntity) {
  const entities = await query(entityType);
  const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
  entities.splice(idx, 1, updatedEntity);
  _save(entityType, entities);
  return entities;
}

async function remove(entityType, entityId) {
  const entities = await query(entityType);
  const idx = entities.findIndex(entity => entity._id === entityId);
  entities.splice(idx, 1);
  _save(entityType, entities);
  return entities;
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}
