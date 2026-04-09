import path from 'node:path';
import { exec } from 'node:child_process';
import fs from 'node:fs/promises';

export async function deleteOriginalVideo(video: string) {
    /*if (video.endsWith('_reconstructed.mp4')) {
        throw new Error('No se puede eliminar un video reconstruido');
    }*/
    console.log("Eliminando video: ", video);
    if (path.extname(video) !== '.mp4') {
        throw new Error('El archivo a eliminar no es un video');
    }
    await fs.unlink(video);
}

export function reconstructVideo(video: string) {
    //execute ffmpeg command to reconstruct video
    console.log("Reconstruyendo video: ", video);
    const ext = path.extname(video);
    const output = path.join(path.dirname(video), `${path.basename(video, ext)}_reconstructed${ext}`);
    const cmd = `ffmpeg -i ${video} -vcodec copy  -an  ${output} -y`

    return new Promise<string>((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al reconstruir el video: ${error}`, stderr);
                reject(error);
            }
            console.debug(stdout);
            console.log(`Video reconstruido exitosamente: ${output}`);
            resolve(output);
        });
    });
}

