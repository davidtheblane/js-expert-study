const { error } = require('./src/constants.js')
const File = require('./src/file.js')
const assert = require('assert');

(async () => {
    //   try {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, rejection)
    }

    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, rejection)
    }

    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            { id: '123', name: 'Davi Bernardo', profession: 'Backend Developer', age: '38' },
            { id: '321', name: 'Xuxa da Silva', profession: 'Host', age: '42' },
            { id: '432', name: 'Robson Cruzoe', profession: 'Carpenter', age: '35' }
        ]

        assert.deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }

    console.log('All tests passed')
    //   } catch (err) { 
    //     console.error('Test failed')
    //     console.error(err)
    //     process.exit(1)
    //   }
})()
