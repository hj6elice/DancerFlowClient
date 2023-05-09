import React from 'react';
import { useTexture } from '@react-three/drei';
import grid from './material/grid.png';
import * as THREE from 'three';

export default function Floor({ setDestinatioPoint }) {
    const texture = useTexture(grid);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 4;
    texture.repeat.y = 4;

    const handleFloorClick = (e) => {
        const { x, y, z } = e.point;
        console.log(x, y, z);
        setDestinatioPoint([x, y, z]);
    };

    return (
        <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1, 0]} receiveShadow onClick={(e) => handleFloorClick(e)}>
            <planeBufferGeometry args={[20, 20, 1, 1]} />
            <shadowMaterial transparent opacity={0.2} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
}
