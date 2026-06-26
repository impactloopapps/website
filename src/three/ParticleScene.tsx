import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Particles from './Particles'

interface Props {
  active: boolean
  lowPower: boolean
}

export default function ParticleScene({ active, lowPower }: Props) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={lowPower ? [1, 1.5] : [1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <Particles count={lowPower ? 14000 : 42000} size={lowPower ? 20 : 28} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={1.2} luminanceThreshold={0.04} luminanceSmoothing={0.4} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
