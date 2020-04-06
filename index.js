'use strict';

const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./credentials.json');

const sheetId = '1BGEDAeI3OTbLQwSBlZHicx8y_jQfzsov_RkSQ_fPmg4';

const doc = new GoogleSpreadsheet(sheetId);

async function accessSpreadsheet() {
    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      });

      await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    console.log(sheet.title);
}

accessSpreadsheet();
