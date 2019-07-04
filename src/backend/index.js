import events from "../constants/events";

const fs = require("fs");
const path = require("path");

const basePath = "O:\\saj\\versoes";
const evolucao = "\\interna";
const correcao = "\\features";
const dirPG5 = "\\fPG5";
const PG5 = "\\PG5";
const PG5ADM = "\\ADMPG5";
const PRO = "\\PRO";
const dirIND = "\\fIND";
const SGC = "\\SGC";
const ARC = "\\ARC";
const PSS5 = "\\PSS5";

const interna = {
  SAJ: path.join(basePath, evolucao, dirPG5, PG5),
  ADM: path.join(basePath, evolucao, dirPG5, PG5ADM),
  PRO: path.join(basePath, evolucao, dirPG5, PRO),
  SGC: path.join(basePath, evolucao, dirIND, SGC),
  ARC: path.join(basePath, evolucao, dirIND, ARC),
  PSS5: path.join(basePath, evolucao, dirIND, PSS5)
};

const feature = {
  SAJ: path.join(basePath, correcao, dirPG5, PG5),
  ADM: path.join(basePath, correcao, dirPG5, PG5ADM),
  PRO: path.join(basePath, correcao, dirPG5, PRO),
  SGC: path.join(basePath, correcao, dirIND, SGC),
  ARC: path.join(basePath, correcao, dirIND, ARC),
  PSS5: path.join(basePath, correcao, dirIND, PSS5)
};

// const numEnum = {
//   LOWER: 1,
//   IQUAL: 2,
//   HIGHER: 3
// };

// function numIs(v, f) {
//   if (v < f) return numEnum.LOWER;
//   if (v === f) return numEnum.IQUAL;
//   if (v > f) return numEnum.HIGHER;
// }

// function isValidVersion(folder) {
//   const reg = folder.match(/(\d*)\.(\d*)\.(\d*)/);
//   if (reg) {
//     const master = numIs(parseInt(reg[1], 10), 1);
//     const minor = numIs(parseInt(reg[2], 10), 9);
//     const defect = numIs(parseInt(reg[3], 10), 3);
//     if (
//       !(
//         master === numEnum.HIGHER ||
//         (master === numEnum.IQUAL && minor === numEnum.HIGHER) ||
//         (master === numEnum.IQUAL &&
//           minor === numEnum.IQUAL &&
//           [numEnum.IQUAL, numEnum.HIGHER].includes(defect))
//       )
//     )
//       return false;
//   }
//   return true;
// }

// ipcRenderer.on(events.UPDATE, (event, args) => {
//   getProjects(args);
// });

function getPATHS(origem) {
  if (origem === "interna") {
    return interna;
  }
  return feature;
}

function isValidFolder(folder, filter) {
  if (!filter) return true;
  return folder.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
}

const { ipcRenderer } = require("electron");

function getProjects(data) {
  // console.log(require('electron'));
  // console.log(ipcRenderer);
  const listProjects = [];
  const paths = getPATHS(data.origem);
  fs.readdir(paths.SAJ, (err, folders) => {
    // fs.readdirSync(paths.SAJ).forEach(folder => {
    folders.forEach(folder => {
      if (!isValidFolder(folder, data.filtro)) return;
      // if (!isValidVersion(folder)) return;
      const project = {};
      project.paths = paths;
      project.path = path.join(project.paths.SAJ, folder);
      project.folder = folder;

      const file = path.join(project.path, "servidor", "pg5servidor.exe");
      try {
        project.birthtime = fs.statSync(file).birthtime;
      } catch (error) {
        return;
      }
      listProjects.push(project);
    });
    // console.log(listProjects.length);
    ipcRenderer.send(events.UPDATED, listProjects);
    return listProjects;
  });
}
// getProjects({ origem: 'interna', filtro: '1.9.3' });

// declare module 'getProjects'{
//   module.exports = getProjects
// }

export default getProjects;

// module.exports = getProjects;
