import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";


function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black/60 backdrop-blur-md text-white flex justify-between items-center px-8 py-4 shadow-lg">
      <div className="flex flex-col">
        <span className="font-bold text-2xl tracking-widest uppercase">BOOK OF FATES</span>
        <span className="text-sm text-teal-300 mt-1">three js project</span>
      </div>
      <ul className="flex gap-8 text-lg uppercase">
        <li><a href="https://github.com/evanautianle" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/evan-au-01667630a/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition">LinkedIn</a></li>
        <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition">Portfolio Website</a></li>
      </ul>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen flex flex-col justify-center items-center">
      <UI />
      <Loader />
      <Canvas shadows camera={{ position: [-2.5, -0.2, 6.5], fov: 45 }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
        <EffectComposer>
          <DepthOfField
            target={[0, 0.3, 0]}
            worldFocusDistance={4.2}
            worldFocusRange={8.0}
            focalLength={0.015}
            bokehScale={0.35}
            height={480}
          />
          <Bloom
            luminanceThreshold={0.35}
            luminanceSmoothing={0.25}
            intensity={0.6}
            mipmapBlur
            radius={0.7}
          />
        </EffectComposer>
      </Canvas>
    </section>
  );
}

function TextSection() {
  return (
    <section id="about" className="w-full py-24 px-6 flex flex-col items-center bg-black text-white shadow-lg font-sans">
      <h2 className="text-5xl font-extrabold mb-8 tracking-tight font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>About This Project</h2>
      <div className="max-w-2xl text-left">
        <p className="text-xl leading-relaxed mb-6 font-light" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <span className="block text-2xl font-semibold text-teal-300 mb-2">Book of Fates</span>
          This site is a fun project, inspired by a comic book I read. I wanted to create a digital book with interactive 3D visuals, so I used React and Three.js to bring it to life.
        </p>
        <p className="text-lg leading-relaxed mb-6 font-light" style={{ fontFamily: 'Poppins, sans-serif' }}>
          I followed <a href="https://www.youtube.com/@WawaSensei" target="_blank" rel="noopener noreferrer" className="underline text-teal-300">Wawa Sensei's YouTube tutorials</a> to learn the basics of 3D animation and web graphics. The style direction, backdrop, and camera effects are my own take, and I experimented a lot to try bring the otherworldly vision to life.
        </p>
        <p className="text-lg leading-relaxed mb-6 font-light" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <span className="font-medium text-teal-300">Tech Stack:</span> React, @react-three/fiber, @react-three/drei, @react-three/postprocessing, Three.js, Tailwind CSS, Vite, Jotai, Leva.
        </p>
        <div className="flex flex-col items-start">
          <span className="text-teal-300 text-lg font-medium mb-2">Try the controls and explore the book!</span>
          <span className="text-xs text-gray-400">Credit: Comic book inspiration & <a href="https://github.com/wass08/r3f-animated-book-slider-final" target="_blank" rel="noopener noreferrer" className="underline">Wawa Sensei's tutorials</a></span>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TextSection />
    </>
  );
}

export default App;
