import path from "node:path";
import { backupVideo } from "./backup_services";
import { loadVideosInPath } from "./dir_explorer";
import { deleteOriginalVideo, reconstructVideo } from "./video_services";
import extractCaptures from "./captures_extractor";

export async function startVideoCapturesExtraction(video: string, nv: string) {
    await backupVideo(video);
    const reconstructedVideo = await reconstructVideo(video);
    await deleteOriginalVideo(video);
    await extractCaptures(reconstructedVideo, nv);
    // procesar con ia
    // clasificar
    // mover a precarga
}

export async function startVideosCapturesExtraction(paths: string[], nv: string) {
    for (const relativePath of paths) {
        const absPath = path.join(MAIN_VITE_DEVICE_VIDEOS_PATH, relativePath);
        console.log(`Cargando videos en ${absPath}`, paths);
        const videos = await loadVideosInPath(absPath);
        for (const video of videos) {
            const absVideo = path.join(absPath, video);
            console.log(`Procesando video: ${absVideo}`);
            await startVideoCapturesExtraction(absVideo, nv);
            console.log(`Video procesado: ${absVideo}`);
        }
    }
}


