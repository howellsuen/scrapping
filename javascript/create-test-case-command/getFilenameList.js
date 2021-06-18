const fs = require('fs')

const getFilenameList = () => {
    const directoryList = fs.readdirSync('./integration')
    console.log('directoryList', directoryList)
    directoryList.map(e => {
        let filenameList = fs.readdirSync(`./integration/${e}`)
        filenameList = filenameList.map(x => `${e}/${x}`)
        console.log('filenameList', filenameList)
    })
}

getFilenameList()