import {NextApiRequest, NextApiResponse} from 'next'; 
import { google } from "googleapis";
import keys from "../../key.json";
import jwt from "jsonwebtoken"

export default function handler(req: any, res: any): void {
    try {
        const client = new google.auth.JWT({
            // keys.client_email, null!, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
            email: keys.client_email,
            key: keys.private_key,
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });
        client.authorize(async function(err: any, tokens: any): Promise<void> {
            // if (err) {
            //     return res.status(400).send(JSON.stringify({error: true}));
            // }
            
            const gsapi = google.sheets({version:'v4', auth: client});
            
            // return res.status(200).send(JSON.stringify({error: false, data: data.data.values}));
            const opt = {
                spreadsheetId: '1Le5gEylvcypo8OsHeUiQ_6MPzrmjBJKB5lBhsx3WYRQ',
                range: 'Sheet1!A2:A'
            };
            // return res.status(200).send(JSON.stringify({error: false, data: data.data.values}));

            let data = await gsapi.spreadsheets.values.get(opt);
            return res.status(200).send(JSON.stringify({error: false, data: data.data.values}));
        });
    } catch (e) {
        return res.status(400).send(JSON.stringify({error: true}));
    }
}