'use strict';

const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./credentials.json');

const sheetId = '1BGEDAeI3OTbLQwSBlZHicx8y_jQfzsov_RkSQ_fPmg4';

const doc = new GoogleSpreadsheet(sheetId);

async function processSpreadsheet() {
    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
    });

    await doc.loadInfo();
    
    // gets first sheet of doc
    const sheet = doc.sheetsByIndex[0];

    try {

      await sheet.loadCells('A3:H3');
      let matriculaHeader = sheet.getCellByA1('A3');
      let alunoHeader = sheet.getCellByA1('B3');
      let faltasHeader = sheet.getCellByA1('C3');
      let p1Header = sheet.getCellByA1('D3');
      let p2Header = sheet.getCellByA1('E3');
      let p3Header = sheet.getCellByA1('F3');
      let situacaoHeader = sheet.getCellByA1('G3');
      let nafHeader = sheet.getCellByA1('H3');

      console.log(
          matriculaHeader.value + '\t' + alunoHeader.value + '\t\t' +
          faltasHeader.value + '\t' + p1Header.value + '\t' +
          p2Header.value + '\t' + p3Header.value + '\t' +
          situacaoHeader.value + '\t' + nafHeader.value + '\t'
      );


      await sheet.loadCells('A2');
      let rawTotalAulas = sheet.getCellByA1('A2');
      let totalAulas = rawTotalAulas.value.substr(-2, 2);

      const rows = await sheet.getRows();
      const length = rows.length;

      for(let i = 4; i <= length + 1; ++i) {

          // load range of cells based on iterator
          await sheet.loadCells(`A${i}:H${i}`);

          let matricula = sheet.getCellByA1(`A${i}`)
          let aluno = sheet.getCellByA1(`B${i}`);
          let faltas = sheet.getCellByA1(`C${i}`);
          let p1 = sheet.getCellByA1(`D${i}`);
          let p2 = sheet.getCellByA1(`E${i}`);
          let p3 = sheet.getCellByA1(`F${i}`);
          let naf = sheet.getCellByA1(`H${i}`);

          let faltasPercentual = ((faltas.value / totalAulas) * 100).toFixed(2);
          let total = p1.value + p2.value + p3.value;
          let media = Math.round((total) / 3);

          let situacao = sheet.getCellByA1(`G${i}`);
          switch (true) {
            case (faltasPercentual > 25):
              situacao.value = 'Reprovado por falta';
              // update naf cell
              naf.value = '0';
              break;
            case (media < 50):
              situacao.value = 'Reprovado por Nota';
              // update naf cell
              naf.value = '0';
              break;
            case (media >= 50 && media < 70):
              situacao.value = 'Exame Final';
              // update naf cell
              let nafCalculate = ((50 - (media/2)) * 2);
              naf.value = `${nafCalculate}`;
              break;
            case (media >= 70):
              situacao.value = 'Aprovado';
              // update naf cell
              naf.value = '0';
              break;
          }

          let notaAprovacaofinal =

          await sheet.saveUpdatedCells();

          console.log(
            matricula.value + '\t\t' + aluno.value + '\t\t' +
            faltas.value + '\t' + p1.value + '\t' +
            p2.value + '\t' + p3.value + '\t' +
            situacao.value + '\t'+ naf.value
            );
        }
    } catch(error) {

      console.log('Error:\n', error);
    }
  }

processSpreadsheet();
