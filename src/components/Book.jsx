import { BackSide, BoxGeometry } from "three"
import {pages} from "./UI"
import { useRef } from "react"
import { Box } from "@react-three/drei";

const PAGE_WIDTH = 1.28;
const PAGE_HEGHT = 1.71;
const PAGE_DEPTH = 0.4;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;
const pageGeometry = new BoxGeometry(PAGE_WIDTH, PAGE_HEGHT, PAGE_DEPTH, PAGE_SEGMENTS, 2);

const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes = [];
const skinWeights = [];

for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);
    const x = vertex.x;
    const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
    let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;
    skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
}

pageGeometry.setAttribute("skinIndex", new Uint16BufferAttribute(skinIndexes, 4));
pageGeometry.setAttribute("skinWeight", new Float32BufferAttribute(skinWeights, 4));

const Page = ({number, front, back, ...props}) => {
    const group = useRef()
    return (
        <group {...props}>
            <mesh>
            <primitive attach="geometry" object={pageGeometry}/>
                <meshBasicMaterial color="white"/>
            </mesh>
        </group>
    )
}

export const Book = ({...props}) => {
    return (
        <group {...props}> 
        {[...pages].map((pageData, index) => 
            index === 0 ? (
                <Page
                    position-x={index * 0.15}
                    key={index}
                    number={index}
                    {...pageData}
                />
            ) : null
        )}
    </group>
    )
}