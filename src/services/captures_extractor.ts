import { exec } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const nvIpMap: Record<string, string> = {
    "NV01": "192.168.1.101",
    "NV02": "192.168.1.102",
    "NV03": "192.168.1.103",
    "NV04": "192.168.1.104"

}

const extractionFoldersMap: Record<string, string> = {
    "119_Asc": "e-Curuzu-LBA-119__ascendente",
    "119_Asc__PRUEBA": "e-Curuzu-LBA-119__ascendente",

    "119_Desc": "e-Curuzu-LBA-119__descendente",
    "Derqui_ASC": "e-Derqui-LBA-1__ascendente",
    "Derqui_DESC": "e-Derqui-LBA-1__descendente",
    "RP7_GasparriNorte": "e-FS01-Gasparri-Norte",
    "RP7_GasparriSur": "e-FS02-Gasparri-Sur",
    "RP7_Picada4_Desc_Semaforo": "e-FS03-Gasparri-Descendente",
    "RP7_Picada4_Asc": "e-FS05-Luces-Ascendente",
    "RP7_Picada4_Desc_Luces": "e-FS06-Luces-Descendente",
    "RP7_ASC_Gasparri": "e-FS04-Gasparri-Ascendente",
    "Saladas_ASC": "e-Saladas-LBA__ascendente",
    "Saladas_DESC": "e-Saladas-LBA__descendente",
    "SanLorenzo_ASC": "e-SanLorenzo-LBA-1__ascendente",
    "SanLorenzo_DESC": "e-SanLorenzo-LBA-1__descendente"
    //TABAY?

};

async function moveVideoToExtractionFolder(video: string, nv: string) {
    console.log("Moviendo video para procesar: ", video, nv);
    const device = path.basename(path.dirname(path.dirname(video)));
    const extractionFolder = extractionFoldersMap[device];
    if (!extractionFolder) {
        throw new Error(`No se encontro una carpeta de extraccion para el dispositivo ${device}`);
    }
    const newPath = path.join(MAIN_VITE_NV_PATH, nv, extractionFolder, path.basename(video));
    await fs.mkdir(path.dirname(newPath), { recursive: true });
    await fs.rename(video, newPath);
    return newPath;

}

function restartNvProcess(nv: string) {
    //Ejecuta el comando sshpass -p B460mS5h2. ssh -t neuralvision@192.168.1.102 "echo 'pass.' | sudo -S docker restart neuralvision" pero lee la pass desde el .env
    const host = nvIpMap[nv];
    const pass = NV_PASSWORD;
    const user = NV_USER;

    if (!pass || !user || !host) {
        throw new Error(`No se encontro una pass, usuario o host para el dispositivo ${nv}`);
    }

    const command = `sshpass -p ${pass} ssh -t ${user}@${host} "echo '${pass}' | sudo -S docker restart neuralvision"`;
    exec(command);
    //sshpass -p B460mS5h2. ssh -t neuralvision@192.168.1.102 "echo 'B460mS5h2.' | sudo -S docker restart neuralvision"
}

export default async function extractCaptures(video: string, nv: string) {
    moveVideoToExtractionFolder(video, nv);
    console.log("Reiniciando proceso de NV: ", nv);
    await restartNvProcess(nv);
    return "";
}