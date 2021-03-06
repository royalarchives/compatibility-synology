module.exports = async (library, req, res) => {
  let response
  switch (req.postData.method) {
    case 'list':
      response = await listContents(library, req.postData)
      break
  }
  if (response) {
    return res.end(JSON.stringify(response))
  }
  res.statusCode = 404
  return res.end('{ "success": false }')
}

async function listContents (library, options) {
  const response = {
    data: {
      offset: options.offset || 0,
      limit: options.limit || 1000,
      total: options.total || 0
    },
    success: true
  }
  if (options.id) {
    const item = await library.getTreeObject(options.id)
    response.data.items = []
    for (const child of item.contents) {
      response.data.items.push({
        id: child.id,
        is_personal: false,
        path: child.path,
        title: child.path,
        type: child.type
      })
    }
  } else {
    const unfilteredItems = []
    for (const item of library.tree.contents) {
      unfilteredItems.push({
        id: item.id,
        is_personal: false,
        path: item.path,
        title: item.path,
        type: item.type
      })
    }
    response.data.items = await library.getObjects(unfilteredItems, options).data
  }
  if (response.data.items) {
    const foldersAndTracks = []
    for (const i in response.data.items) {
      const item = response.data.items[i]
      if (item.type === 'file') {
        console.log('converting item to track', item)
        const track = await library.getObject(item.id.replace('file_', 'track_'))
        console.log('track', track)
        if (track) {
          foldersAndTracks.push(track)
        }
      } else {
        foldersAndTracks.push(item)
      }
    }
    response.data.items = foldersAndTracks
    response.data.total = response.data.items.length
    response.data.folder_total = response.data.items.filter(item => item.type === 'folder').length
  } else {
    response.data.items = []
    response.data.total = 0
    response.data.folder_total = 0
  }
  return response
}
