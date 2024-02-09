/**
* @author SKy - manhG
* @SKyBot Do not edit code or edit credits
*/

import axios from "axios";
import * as fs from "fs";

export const config = {
    name: 'event',
    version: '1.0.0',
    role: '0',
    author: ['manhG'],
    category: ['Hệ thống', 'System'],
    viDesc: 'Tự động check link download video.',
    enDesc: 'Auto check link download video.',
    usage: '',
    timestamp: 1
}
export const languages = {
    "vi_VN": {
        "content": "〉Nhập link video bất kỳ."
    },
    "en_US": {
        "content": " 〉Enter any video link."
    }
}

var pathMp4 = 'eventDownload_' + Date.now() + '.mp4';
var pathMp3 = 'eventDownload_' + Date.now() + '.mp3';
export async function onEvent({ event, message, Config, Threads }) {
    const webapi = Config['WEBAPI'], apikey = Config['APIKEY'];
    const prefix = (await Threads.getData(event.threadID)).prefix || Config.PREFIX;
    if (!event.body || event.body == null) return;
    if ((event.body.slice(0, 2)).indexOf(prefix) == 0) return;
    await checkLink(event.body, webapi, apikey, message);
}

function getLinkMp3(URL, webapi, apikey, message) {
    axios.get(`${webapi}/allinonedl?url=${URL}&apikey=${apikey}`)
        .then(async (res) => {
            let title = res.data.result.desc;
            let audio = res.data.result.music.play_url;
            await global.utils.downloadFileHttps(audio, pathMp3)
            await message.send({ body: title, attachment: fs.createReadStream(pathMp3) });
            await fs.unlinkSync(pathMp3);
        })
        .catch(err => { });
}

function getLinkMp4(URL, webapi, apikey, message) {
    axios.get(`${webapi}/allinonedl?url=${URL}&apikey=${apikey}`)
        .then(async (res) => {
            let data = res.data.result.video;
            let title = res.data.result.desc;
            let video = data.hd || data.sd || data.nowatermark || data.watermark;
            await global.utils.downloadFileHttps(video, pathMp4)
            await message.send({ body: title, attachment: fs.createReadStream(pathMp4) });
            await fs.unlinkSync(pathMp4);
        })
        .catch(err => { });
}

function checkLink(URLinput, webapi, apikey, message) {
    const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
    const found = (URLinput).match(regex);
    const urlRegex = String(found);
    if (isUrlValid(urlRegex)) {
        console.log('URLinput: ' + urlRegex);
        if ((urlRegex).includes("douyin") || (urlRegex).includes("tiktok") || (urlRegex).includes("facebook") || (urlRegex).includes("fb") ||
            (urlRegex).includes("youtube") || (urlRegex).includes("youtu") || (urlRegex).includes("twitter") ||
            (urlRegex).includes("kuaishou") || (urlRegex).includes("instagram")) {
            return getLinkMp4(urlRegex, webapi, apikey, message);
        }
        else if ((urlRegex).includes("soundcloud") || (urlRegex).includes("spotify") || (urlRegex).includes("zingmp3")) {
            return getLinkMp3(urlRegex, webapi, apikey, message);
        }
    }
}

function isUrlValid(link) {
    var res = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null)
        return !1;
    else return !0
};

export async function onMessage({ message, getText }) {
    message.send(getText('content'))
}