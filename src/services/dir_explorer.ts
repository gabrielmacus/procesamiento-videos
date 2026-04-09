import fs from 'fs-extra';

export async function loadDevices() {
    const files = await fs.readdir(MAIN_VITE_DEVICE_VIDEOS_PATH);
    //check if is dir
    const dirs = files.filter((file) => fs.statSync(`${MAIN_VITE_DEVICE_VIDEOS_PATH}/${file}`).isDirectory());
    return dirs;
}

export async function loadDaysInDevice(device: string) {
    const files = await fs.readdir(`${MAIN_VITE_DEVICE_VIDEOS_PATH}/${device}`);
    //check if is dir
    const dirs = files.filter((file) => fs.statSync(`${MAIN_VITE_DEVICE_VIDEOS_PATH}/${device}/${file}`).isDirectory());
    return dirs.sort();
}

export async function loadVideosInPath(path: string) {
    const files = await fs.readdir(path);
    const videos = files.filter((file) => file.endsWith('.mp4'));
    return videos.sort();
}