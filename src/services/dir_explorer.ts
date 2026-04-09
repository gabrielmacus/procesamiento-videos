import fs from 'fs-extra';

export async function loadDevices() {
    const files = await fs.readdir(MAIN_VITE_DEVICE_VIDEOS_PATH);
    return files;
}

export async function loadDaysInDevice(device: string) {
    const files = await fs.readdir(`${MAIN_VITE_DEVICE_VIDEOS_PATH}/${device}`);
    return files.sort();
}

export async function loadVideosInPath(path: string) {
    const files = await fs.readdir(path);
    const videos = files.filter((file) => file.endsWith('.mp4'));
    return videos.sort();
}