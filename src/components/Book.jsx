import {
    Bone,
    BoxGeometry,
    Float32BufferAttribute,
    MeshStandardMaterial,
    Skeleton,
    SkeletonHelper,
    SkinnedMesh,
    Uint16BufferAttribute,
    Vector3,
} from "three"
import { degToRad } from "three/src/math/MathUtils"
import {pages} from "./UI"
import { useMemo, useRef } from "react"
import { Box, useHelper, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"

const PAGE_WIDTH = 1.28;
const PAGE_HEGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;
const HALF_PAGE_WIDTH = PAGE_WIDTH / 2;
const whiteColor = "#ffffff";

const Page = ({number, front, back, ...props}) => {
    const [picture, picture2, pictureRoughness] = useTexture([
        `/textures/${front}.jpg`,
        `/textures/${back}.jpg`,
        ...(number === 0 || number === pages.length - 1) ? ['/textures/book-cover-roughness.jpg'] : [],
    ]);
    const group = useRef()
    const skinnedMeshRef = useRef()

    const manualSkinnedMesh = useMemo(() => {
        // Create a NEW geometry for each page
        const pageGeometry = new BoxGeometry(PAGE_WIDTH, PAGE_HEGHT, PAGE_DEPTH, PAGE_SEGMENTS, 2);

        const position = pageGeometry.attributes.position;
        const vertex = new Vector3();
        const skinIndexes = [];
        const skinWeights = [];

        for (let i = 0; i < position.count; i++) {
            vertex.fromBufferAttribute(position, i);
            const x = vertex.x + HALF_PAGE_WIDTH;
            const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
            let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;
            skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
            skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
        }

        pageGeometry.setAttribute("skinIndex", new Uint16BufferAttribute(skinIndexes, 4));
        pageGeometry.setAttribute("skinWeight", new Float32BufferAttribute(skinWeights, 4));

        const bones = [];
        for(let i = 0; i < PAGE_SEGMENTS + 1; i++) {
            let bone = new Bone();
            bones.push(bone);
            if (i===0) {
                bone.position.x = -HALF_PAGE_WIDTH;
            } else {
                bone.position.x = SEGMENT_WIDTH;
            }
            if (i > 0) {
                bones[i-1].add(bone);
            }
        }
        const skeleton = new Skeleton(bones);
        
        // Create NEW materials for each page to avoid sharing
        const pageMaterials = [
            new MeshStandardMaterial({
                color: whiteColor,
            }),
            new MeshStandardMaterial({
                color: "#26a75aff",
            }),
            new MeshStandardMaterial({
                color: whiteColor,
            }),
            new MeshStandardMaterial({
                color: whiteColor,
            }),
        ];
        
        const materials = [...pageMaterials,
            new MeshStandardMaterial({
                color: whiteColor,
                map: picture,
                ...(number === 0
                    ? {
                        roughnessMap: pictureRoughness,
                        roughness: 0.1,
                    }
                    : {
                        roughness: 0.1,
                    }),
            }),
            new MeshStandardMaterial({
                color: whiteColor,
                map: picture2,
                ...(number === pages.length - 1
                       ? {
                        roughnessMap: pictureRoughness,
                        roughness: 0.1,
                    }
                    : {
                        roughness: 0.1,
                    }),
            }),
        ];
        const mesh = new SkinnedMesh(pageGeometry, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
        mesh.add(skeleton.bones[0]);
        mesh.bind(skeleton);
        return mesh;
    }, [number, picture, picture2, pictureRoughness]); // Add dependencies


    useFrame(() => {
        if (!skinnedMeshRef.current) return;
        const bones = skinnedMeshRef.current.skeleton.bones;
    })

    return (
        <group {...props}>
            <primitive object={manualSkinnedMesh} ref={skinnedMeshRef} />
        </group>
    )
}

export const Book = ({...props}) => {
    return (
        <group {...props}> 
        {[...pages].map((pageData, index) => (
            <Page
                position-z={-index * PAGE_DEPTH * 10}
                key={index}
                number={index}
                {...pageData}
            />
        ))}
    </group>
    )
}