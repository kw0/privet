'use strict'

const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const getPage = (url) => {
    request(url, {
        timeout: 3000
    }, (error, response, body) => {
        if (!error) {
            const $ = cheerio.load(body)
            let mapName = $('#PageTitle').html()
            let picUrl = $('.Gallery').children().first().attr('href')
            if (picUrl) {
                download(picUrl, mapName, function () {
                    console.log('Done:', mapName, picUrl)
                })
            } else {
                console.log('!!! No image for', mapName, ' ', url)
            }
        } else {
            console.log('!!! Error on ', url)
        }
    })
}

var download = function (uri, filename, callback) {
    console.log('Downloading ', filename, ' from ', uri)
    uri = uri.replace("https", "http")
    request.head(uri, function (err, res, body) {
        if (!err) {
            request(uri).pipe(fs.createWriteStream(`images/${filename}.jpg`)).on('close', callback)
        } else {
            console.log('!!! Error on ', filename, ' from ', uri)
        }
    })
}

const urls = [
    'https://gamebanana.com/maps/214678',
    'https://gamebanana.com/maps/214581',
    'https://gamebanana.com/maps/214578',
    'https://gamebanana.com/maps/214478',
    'https://gamebanana.com/maps/214464',
    'https://gamebanana.com/maps/214426',
    'https://gamebanana.com/maps/214400',
    'https://gamebanana.com/maps/214384',
    'https://gamebanana.com/maps/214360',
    'https://gamebanana.com/maps/214354',
    'https://gamebanana.com/maps/214340',
    'https://gamebanana.com/maps/214281',
    'https://gamebanana.com/maps/214278',
    'https://gamebanana.com/maps/214231',
    'https://gamebanana.com/maps/214225',
    'https://gamebanana.com/maps/214180'
]

urls.forEach(url => {
    getPage(url)
})