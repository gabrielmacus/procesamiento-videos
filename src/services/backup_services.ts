import fs from 'fs-extra';
import path from 'node:path';

export async function backupVideo(sourcePath: string) {
    const video = path.basename(sourcePath);
    const destinationPath = path.join(MAIN_VITE_BACKUP_PATH, video);

    console.log(`Iniciando backup de ${video}...`);
    console.log(`Origen: ${sourcePath}`);
    console.log(`Destino: ${destinationPath}`);

    await fs.copy(sourcePath, destinationPath, { overwrite: true });

    console.log(`Backup completado para ${video}`);
}