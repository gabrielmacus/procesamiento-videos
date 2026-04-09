import { Button, Select, Tree, TreeDataNode } from 'antd';
import React, { useEffect, useMemo } from 'react';

export default function HomeSection() {
    const [devices, setDevices] = React.useState<string[]>([]);
    const [days, setDays] = React.useState<Record<string, string[]>>({});
    const [checkedPaths, setCheckedPaths] = React.useState<string[]>([]);
    const nvList = useMemo(() => {
        return ["NV01", "NV02", "NV03", "NV04"]
    }, []);
    const [selectedNv, setSelectedNv] = React.useState<string>(nvList[0]);

    const devicesTree: TreeDataNode[] = useMemo(() => devices.map((device) => ({
        title: device,
        key: device,
        children: days[device]?.map((day) => ({
            isLeaf: true,
            title: day,
            key: `${device}/${day}`
        })) || []
    })), [devices, days]);

    useEffect(() => {
        window.electron.loadDevices().then(async (devices) => {
            setDevices(devices);
            // Cargar días de forma eager para cada dispositivo
            for (const device of devices) {
                await loadDaysInDevice(device);
            }
        });
    }, []);

    const loadDaysInDevice = async (device: string) => {
        const days = await window.electron.loadDaysInDevice(device);
        setDays((prev) => ({ ...prev, [device]: days }));
    }

    const startVideosCapturesExtraction = async () => {
        await window.electron.startVideosCapturesExtraction(checkedPaths.filter((path) => !devices.includes(path)), selectedNv);
    }

    return (
        <div>
            {JSON.stringify(checkedPaths)}
            <Tree
                checkable
                checkedKeys={checkedPaths}
                onCheck={(checkedKeys) => setCheckedPaths(checkedKeys as string[])}
                treeData={devicesTree}
            />

            <Select
                value={selectedNv}
                onChange={(value) => setSelectedNv(value)}
                options={nvList.map((nv) => ({ value: nv, label: nv }))}
            />

            <Button type='primary' onClick={startVideosCapturesExtraction}>Iniciar procesamiento</Button>
        </div>
    )
}