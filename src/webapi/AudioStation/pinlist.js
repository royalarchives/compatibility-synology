module.exports = async (catalog, req, res) => {
  let response
  switch (req.postData.method) {
    case 'list':
      response = await listPinnedItems(catalog)
      break
    case 'pin':
      response = await pinItem(catalog, req.postData)
      break
    case 'unpin':
      response = await unpinItem(catalog, req.postData)
      break
    case 'rename':
      response = await renameItem(catalog, req.postData)
      break
    case 'reorder':
      response = await reorderPinnedItems(catalog, req.postData)
      break
  }
  if (response) {
    return res.end(JSON.stringify(response))
  }
  res.statusCode = 404
  return res.end('{ "success": false }')
}

async function listPinnedItems (catalog) {
  const response = {
    data: {
      items: catalog.pinList
    },
    success: true
  }
  return response
}

async function pinItem (catalog, options) {
  const items = JSON.parse(options.items)
  for (const item of items) {
    item.id = (catalog.pinList.length + 1).toString()
    item.name = item.genre || item.composer || item.artist || item.folder
    catalog.pinList.push(item)
  }
  catalog.rewritePins()
  return { success: true }
}

async function unpinItem (catalog, options) {
  const items = JSON.parse(options.items)
  for (const id of items) {
    const pin = catalog.pinList.filter(pin => pin.id === id)[0]
    catalog.pinList.splice(catalog.pinList.indexOf(pin.id), 1)
  }
  catalog.rewritePins()
  return { success: true }
}

async function renameItem (catalog, options) {
  const items = JSON.parse(options.items)
  for (const id of items) {
    const pin = catalog.pinList.filter(pin => pin.id === id)[0]
    pin.name = options.name
  }
  catalog.rewritePins()
  return { success: true }
}

async function reorderPinnedItems (catalog, options) {
  const newArray = []
  const newOrder = JSON.parse(options.items)
  for (const id of newOrder) {
    const pin = catalog.pinList.filter(pin => pin.id === id)[0]
    newArray.push(pin)
  }
  catalog.pinList.length = 0
  for (const pin of newArray) {
    pin.id = (catalog.pinList.length + 1).toString()
    catalog.pinList.push(pin)
  }
  return { success: true }
}
