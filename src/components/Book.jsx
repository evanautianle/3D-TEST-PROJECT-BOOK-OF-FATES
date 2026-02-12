import { BackSide } from "three"
import {pages} from "./UI"
import { useRef } from "react"

const Page = ({number, front, back, ...props}) => {
    const group = useRef()
    return (
        <group {...props}>
            <mesh>
                <boxGeometry/>
                <meshBasicMaterial color="white"/>
            </mesh>
        </group>
    )
}

export const Book = ({...props}) => {
    return (
        <group {...props}> 
        {[...pages].map((page, index) => (
                <Page key={index} number={index} {...page}/>
            ))}
    </group>
    )
}