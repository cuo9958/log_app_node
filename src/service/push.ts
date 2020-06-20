import GeTui from "gt-push-sdk";
import config from "config";
import ListMessage from "gt-push-sdk/getui/message/ListMessage";
import NotificationTemplate from "gt-push-sdk/getui/template/NotificationTemplate";
import Target from "gt-push-sdk/getui/Target";
import ProjectClientModel from "../model/project_client";

const cfg: ICFG = config.get("getui");

interface ICFG {
    host: string;
    appid: string;
    appkey: string;
    mastersecret: string;
    appsecret: string;
}
const gtServer = new GeTui(cfg.host, cfg.appkey, cfg.mastersecret);

interface IPushModel {
    uuid: string;
    title: string;
    txts: string;
    link: string;
    create_time: number;
}

function getTemplate(title, txts, id) {
    return new NotificationTemplate({
        appId: cfg.appid,
        appKey: cfg.appkey,
        title: title,
        text: txts,
        logoUrl: "https://img2.daling.com/zin/public/specialTopic/2020/05/25/10/38/57/525400B9EA93AXKAD000007430100.png",
        isRing: true,
        isVibrate: true,
        isClearable: false,
        transmissionType: 2,
        transmissionContent: `{"id":${id}}`,
    });
}

async function pushNotice(data: IPushModel) {
    const list: any[] = await ProjectClientModel.searchProject(data.uuid);
    console.log(list.length);
    // Getui
    const template = getTemplate(data.title, data.txts, data.uuid);
    const message = new ListMessage({
        isOffline: true,
        offlineExpireTime: 3600 * 2 * 1000,
        data: template,
    });
    gtServer.getContentId(message, data.uuid, function (err, contentId) {
        console.log(err, contentId);
        if (err) return;
        const targetList: any[] = [];
        list.forEach((item) => {
            targetList.push(
                new Target({
                    appId: cfg.appid,
                    clientId: item.clientid,
                })
            );
        });
        console.log("getContentId", contentId);
        gtServer.pushMessageToList(contentId, targetList, function (err, res) {
            console.log(err, res);
        });
    });
}

export default {
    pushNotice,
};
