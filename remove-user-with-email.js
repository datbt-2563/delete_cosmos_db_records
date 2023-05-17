const readlineSync = require('readline-sync');

exports.removeUserWithEmail = async (container) => {
  const email = readlineSync.question('Input email:');
  console.log(email)
  const user = await container.items
    .query("SELECT * FROM c where c['value']['type'] = 'user' and c['value']['profile']['email'] = '" + email + "'")
    .fetchAll();

  const peerConneId = user.resources[0].value.peer_conne_id
  // deleted point-status
  const pointStatus = await container.items
    .query("SELECT * FROM c where c['value']['type'] = 'point-status' and c['value']['peer_conne_id'] = '" + peerConneId + "'")
    .fetchAll();

  for (const resource of pointStatus.resources) {
    await container.item(resource.id, resource.partitionKey).delete();
  }

  // deleted point-history
  const pointHistorys = await container.items
    .query("SELECT * FROM c where c['value']['type'] = 'point-history' and c['value']['metadata']['peer_conne_id'] = '" + peerConneId + "'")
    .fetchAll();

  for (const resource of pointHistorys.resources) {
    await container.item(resource.id, resource.partitionKey).delete();
  }

  console.log('deleted point history done')

  // deleted lottery-application 
  const lotteryApplications = await container.items
    .query("SELECT * FROM c where c['value']['type'] = 'lottery-application' and c['value']['peer_conne_id'] = '" + peerConneId + "'")
    .fetchAll();

  for (const resource of lotteryApplications.resources) {
    await container.item(resource.id, resource.partitionKey).delete();
  }

  console.log('deleted lottery application done')

  // deleted redirect-log
  const redirectLogs = await container.items
    .query("SELECT * FROM c where c['value']['type'] = 'redirect-log' and c['value']['peer_conne_id'] = '" + peerConneId + "'")
    .fetchAll();

  for (const resource of redirectLogs.resources) {
    await container.item(resource.id, resource.partitionKey).delete();
  }

  console.log('deleted redirect log done')


  // deleted checkin-log
  const checkinLogs = await container.items
    .query("SELECT * FROM c where c['value']['type'] = 'checkin-log' and c['value']['peer_conne_id'] = '" + peerConneId + "'")
    .fetchAll();

  for (const resource of checkinLogs.resources) {
    await container.item(resource.id, resource.partitionKey).delete();
  }

  console.log('deleted checkin log done')

  // deletd user
  const users = await container.items
    .query("SELECT * FROM c where c['value']['type'] = 'user' and c['value']['peer_conne_id'] = '" + peerConneId + "'")
    .fetchAll();
  for (const resource of users.resources) {
    await container.item(resource.id, resource.partitionKey).delete();
  }
}
