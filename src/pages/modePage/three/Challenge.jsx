import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

export default function Challenge({ area }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef();

    const gltf = useGLTF('/models/challenge.glb');
    gltf.scene.castShadow = true;
    gltf.scene.receiveShadow = true;
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    const navigate = useNavigate();

    useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered]);
    const onPointerOver = useCallback(() => setHovered(true), []);
    const onPointerOut = useCallback(() => setHovered(false), []);

    useFrame((state, delta) => {
        easing.damp3(ref.current.scale, area === 1 ? 1 : 0.2, 0.1, 0.01);
        easing.damp(ref.current.position, 'y', area === 1 ? -1.3 : 1, 0.1, 0.01);
        easing.damp(state.camera.position, 'y', area != -1 ? 2 : 5, 0.5, 0.02);
    });

    return (
        <group ref={ref} position={[-8, -1.3, -8]}>
            <primitive
                object={gltf.scene}
                scale={1.0}
                rotation={[0, 0.2 * Math.PI, 0]}
                castShadow
                receiveShadow
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
            </primitive>

            {area === 1 && (
                <group>
                    <spotLight position={[-4, 8, -1]} intensity={1} color="pink" castShadow />
                    <spotLight position={[0, 8, -4]} intensity={1} color="pink" castShadow />
                </group>
            )}
        </group>
    );
}
