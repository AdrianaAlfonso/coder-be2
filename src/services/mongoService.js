export async function createItem(item, model) {
  const result = new model(item);
  await result.save();
  return result;
}

export async function updateItem(id, item, model) {
  const result = await model.findByIdAndUpdate(id, item, { new: true });
  return result;
}

export async function deleteItem(id, model) {
  const result = await model.findByIdAndDelete(id);
  return result;
}

export async function getItem(id, model) {
  const result = await model.findById(id).exec();
  return result;
}

export async function getItems(model, query) {
  const result = await model.find(query);
  return result;
}
