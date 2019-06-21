const { ipcMain } = require('electron');

const fs = require('fs');
const path = require('path');

const dirPG5 = "O:\\saj\\versoes\\Interna\\fPG5"
const PG5 = "\\PG5"
const PG5ADM = "\\PG5ADM"
const PRO = "\\PRO"
const dirIND = "O:\\saj\\versoes\\interna\\fIND"
const SGC = "\\SGC"
const ARC = "\\ARC"
const PSS5 = "\\PSS5"

var numEnum = {
  LOWER: 1,
  IQUAL: 2,
  HIGHER: 3,
};

function numIs(v, f) {
  if (v < f) return numEnum.LOWER
  if (v === f) return numEnum.IQUAL
  if (v > f) return numEnum.HIGHER
};

function isValidVersion(folder) {
  let reg = folder.match(/(\d*)\.(\d*)\.(\d*)/);
  if (reg) {
    const master = numIs(parseInt(reg[1], 10), 1);
    const minor = numIs(parseInt(reg[2], 10), 9);
    const defect = numIs(parseInt(reg[3], 10), 3);
    if (
      !((master === numEnum.HIGHER) ||
        (master === numEnum.IQUAL && minor === numEnum.HIGHER) ||
        (master === numEnum.IQUAL && minor === numEnum.IQUAL &&
          [numEnum.IQUAL, numEnum.HIGHER].includes(defect)))
    ) return false;
  }
  return true;
};

function getProjects() {
  fs.readdir(path.join(dirPG5, PG5), function (err, files) {
    const listProjects = [];
    //handling error
    console.log('entrou readdir');
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(async function (folder) {
      // Do whatever you want to do with the file  
      if (!isValidVersion(folder)) return
      const project = {}
      project.dirPG5 = dirPG5;
      project.PG5ADM = PG5ADM;
      project.PRO = PRO;
      project.dirIND = dirIND;
      project.SGC = SGC;
      project.ARC = ARC;
      project.PSS5 = PSS5;
      project.path = path.join(dirPG5, PG5, folder);
      project.folder = folder;

      let file = path.join(project.dirPG5, PG5, folder, 'servidor', 'pg5servidor.exe');
      try {
        project.birthtime = fs.statSync(file).birthtime;
      } catch (error) {
        return
      }
      listProjects.push(project);
    });
    console.log(listProjects);
    ipcMain.emit('sendProjects', listProjects);
  });
}

module.exports = getProjects;