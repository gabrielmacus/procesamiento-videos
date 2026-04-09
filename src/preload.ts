// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    loadDevices: () => ipcRenderer.invoke('loadDevices'),
    loadDaysInDevice: (device: string) => ipcRenderer.invoke('loadDaysInDevice', device),
    startVideosCapturesExtraction: (paths: string[], nv: string) => ipcRenderer.invoke('startVideosCapturesExtraction', paths, nv)
});

