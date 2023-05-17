exports.removeRichMenu = async (container) => {
  const richMenus = await container.items.query("SELECT * FROM c where c['value']['type'] = 'rich-menus'").fetchAll();
  for (const resource of richMenus.resources) {
    await container.item(resource.id, resource.partitionKey).delete();
  }
  console.log('deleted rich menu done')
}