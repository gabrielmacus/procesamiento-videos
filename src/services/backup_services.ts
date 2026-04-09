import fs from 'fs-extra';
import path from 'node:path';

export async function backupVideo(sourcePath: string) {
    const baseFolder =path.join(path.basename(path.dirname(path.dirname(sourcePath))), path.basename(path.dirname(sourcePath)));
    const video = path.basename(sourcePath);
    const destinationPath = path.join(MAIN_VITE_BACKUP_PATH, baseFolder, video);

    console.log(`Iniciando backup de ${video}...`);
    console.log(`Origen: ${sourcePath}`);
    console.log(`Destino: ${destinationPath}`);

    await fs.copy(sourcePath, destinationPath, { overwrite: true });

    console.log(`Backup completado para ${video}`);
}