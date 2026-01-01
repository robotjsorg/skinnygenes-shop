import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

// --- 1. Types & Interfaces ---

type StrainType = 'Sativa' | 'Indica' | 'Hybrid' | 'Ruderalis';

interface StrainNode {
  id: string;
  name: string;
  year: number;
  type: StrainType;
  children?: StrainNode[];
}

interface RenderNode extends StrainNode {
  position: THREE.Vector3;
  parentPosition?: THREE.Vector3;
}

// --- 2. Mock Data ---
const cannabisEvolutionData: StrainNode = {
  id: 'root',
  name: 'Ancient Progenitor',
  year: 1960,
  type: 'Ruderalis',
  children: [
    {
      id: 'thai',
      name: 'Thai (Landrace)',
      year: 1970,
      type: 'Sativa',
      children: [
        {
          id: 'haze',
          name: 'Original Haze',
          year: 1975,
          type: 'Sativa',
          children: [
            { id: 'jack', name: 'Jack Herer', year: 1990, type: 'Sativa', children: [] },
            { id: 'silver-haze', name: 'Super Silver Haze', year: 1995, type: 'Sativa', children: [] }
          ]
        }
      ]
    },
    {
      id: 'afghani',
      name: 'Afghani (Landrace)',
      year: 1970,
      type: 'Indica',
      children: [
        {
          id: 'nl',
          name: 'Northern Lights',
          year: 1985,
          type: 'Indica',
          children: [
            { id: 'shiva', name: 'Shiva Skunk', year: 1987, type: 'Indica', children: [] }
          ]
        },
        {
          id: 'skunk1',
          name: 'Skunk #1',
          year: 1978,
          type: 'Hybrid',
          children: [
            { id: 'cheese', name: 'UK Cheese', year: 1995, type: 'Hybrid', children: [] },
            { id: 'sour-diesel', name: 'Sour Diesel', year: 1992, type: 'Sativa', children: [] }
          ]
        }
      ]
    },
    {
      id: 'kush-line',
      name: 'Hindu Kush',
      year: 1970,
      type: 'Indica',
      children: [
        {
          id: 'og-kush',
          name: 'OG Kush',
          year: 1992,
          type: 'Hybrid',
          children: [
            {
              id: 'gsc',
              name: 'Girl Scout Cookies',
              year: 2010,
              type: 'Hybrid',
              children: [
                {
                  id: 'sherbert',
                  name: 'Sunset Sherbert',
                  year: 2014,
                  type: 'Hybrid',
                  children: [
                    { id: 'gelato', name: 'Gelato', year: 2016, type: 'Hybrid', children: [] }
                  ]
                }
              ]
            },
            { id: 'bubba', name: 'Bubba Kush', year: 1996, type: 'Indica', children: [] }
          ]
        }
      ]
    }
  ]
};

// --- 3. Layout Logic ---

const calculateTreeLayout = (
  node: StrainNode, 
  depth: number = 0, 
  angleStart: number = 0, 
  angleRange: number = Math.PI * 2,
  parentPos?: THREE.Vector3
): RenderNode[] => {
  const nodes: RenderNode[] = [];
  const HEIGHT_PER_YEAR = 0.5;
  const BASE_YEAR = 1960;
  const RADIUS_INCREMENT = 1.5; 
  
  const y = (node.year - BASE_YEAR) * HEIGHT_PER_YEAR;
  const currentAngle = angleStart + angleRange / 2;
  const radius = depth * RADIUS_INCREMENT; 
  
  const x = Math.cos(currentAngle) * radius;
  const z = Math.sin(currentAngle) * radius;
  const currentPos = new THREE.Vector3(x, y, z);

  nodes.push({ ...node, position: currentPos, parentPosition: parentPos });

  if (node.children && node.children.length > 0) {
    const step = angleRange / node.children.length;
    node.children.forEach((child, index) => {
      const childNodes = calculateTreeLayout(
        child, 
        depth + 1, 
        angleStart + (step * index), 
        step,
        currentPos
      );
      nodes.push(...childNodes);
    });
  }
  return nodes;
};

// --- 4. Camera & Interaction Components ---

// This component handles the "Flight" logic
const CameraRig = ({ targetNode }: { targetNode: RenderNode | null }) => {
  const { camera, controls } = useThree();
  const vec = new THREE.Vector3();

  useFrame((state, delta) => {
    // If we have a target, fly to it
    if (targetNode) {
      const { x, y, z } = targetNode.position;
      
      // 1. Calculate ideal camera position (offset by some amount so we aren't INSIDE the node)
      // We start 4 units back (z) and 2 units up (y) from the node
      const offset = new THREE.Vector3(0, 2, 6); 
      
      // Calculate target position in world space
      const targetPos = new THREE.Vector3(x, y, z);
      const desiredCamPos = targetPos.clone().add(offset);

      // 2. Smoothly interpolate (Lerp) camera position
      // The 4 * delta controls the speed of the flight
      state.camera.position.lerp(desiredCamPos, 4 * delta);

      // 3. Smoothly interpolate the OrbitControls target (where the camera looks)
      // We need to cast controls to OrbitControlsImpl to access 'target' in TS
      const ctrl = controls as unknown as OrbitControlsImpl;
      if(ctrl) {
        ctrl.target.lerp(targetPos, 4 * delta);
        ctrl.update();
      }
    }
  });

  return null;
};

interface StrainOrbProps {
  node: RenderNode;
  searchQuery: string;
  isFocused: boolean;
  onSelect: (node: RenderNode) => void;
}

const StrainOrb = ({ node, searchQuery, isFocused, onSelect }: StrainOrbProps) => {
  const [hovered, setHover] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  const isMatch = searchQuery === '' || node.name.toLowerCase().includes(searchQuery.toLowerCase());
  const isDimmed = !isMatch;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      
      // Pulsate if matched or focused
      if (isFocused) {
        const scale = 1.5 + Math.sin(state.clock.elapsedTime * 8) * 0.2;
        meshRef.current.scale.setScalar(scale);
      } else if (isMatch && searchQuery !== '') {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
        meshRef.current.scale.setScalar(scale);
      } else if (hovered) {
        meshRef.current.scale.setScalar(1.3);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const getColor = (type: StrainType) => {
    switch (type) {
      case 'Sativa': return '#ff6b6b';
      case 'Indica': return '#4ecdc4';
      case 'Hybrid': return '#ffe66d';
      default: return '#f7fff7';
    }
  };
  const baseColor = getColor(node.type);

  return (
    <group position={node.position}>
      {node.parentPosition && (
        <Line
          points={[
            new THREE.Vector3(node.parentPosition.x - node.position.x, node.parentPosition.y - node.position.y, node.parentPosition.z - node.position.z),
            new THREE.Vector3(0, 0, 0)
          ]}
          color={isDimmed ? "#444" : "white"}
          lineWidth={isDimmed ? 0.5 : 1}
          opacity={isDimmed ? 0.1 : 0.3}
          transparent
        />
      )}

      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onSelect(node); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={() => setHover(false)}
      >
        <icosahedronGeometry args={[0.4, 1]} /> 
        <meshStandardMaterial 
          color={isFocused ? '#fff' : baseColor} 
          emissive={baseColor}
          emissiveIntensity={isFocused ? 1 : (hovered ? 0.6 : 0.2)}
          transparent
          opacity={isDimmed ? 0.1 : 1}
          wireframe={!hovered && !isFocused}
        />
      </mesh>

      <Text
        position={[0, 0.7, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        fillOpacity={isDimmed ? 0.1 : 1}
        outlineWidth={isDimmed ? 0 : 0.02}
        outlineColor="#000"
      >
        {node.name}
      </Text>
    </group>
  );
};

const YearMarkers = () => {
  const markers = [];
  const startYear = 1960;
  const endYear = 2020;
  const step = 10;
  const HEIGHT_PER_YEAR = 0.5;
  const BASE_YEAR = 1960;

  for (let year = startYear; year <= endYear; year += step) {
    const y = (year - BASE_YEAR) * HEIGHT_PER_YEAR;
    markers.push(
      <group key={year} position={[0, y, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[5, 5.05, 32]} />
          <meshBasicMaterial color="white" opacity={0.05} transparent side={THREE.DoubleSide} />
        </mesh>
        <Text position={[5.5, 0, 0]} fontSize={0.5} color="#666" anchorX="left" anchorY="middle">
          {year}
        </Text>
      </group>
    );
  }
  return <group>{markers}</group>;
};

// --- 5. Main App Component ---

export default function CannabisEvolutionApp() {
  const nodes = useMemo(() => calculateTreeLayout(cannabisEvolutionData), []);
  const [search, setSearch] = useState('');
  const [focusedNode, setFocusedNode] = useState<RenderNode | null>(null);

  // Filter nodes for the UI list
  const filteredNodes = useMemo(() => {
    if (!search) return [];
    return nodes.filter(n => n.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, nodes]);

  const handleSelect = (node: RenderNode) => {
    setFocusedNode(node);
    setSearch(node.name); // Fill search bar
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050505', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      
      {/* UI Overlay */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, color: 'white', maxWidth: '300px' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', letterSpacing: '-0.5px' }}>Phylogenetic Tree</h1>
        
        {/* Search Input */}
        <input 
          type="text" 
          placeholder="Search strains..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            // If user clears search, reset focus
            if(e.target.value === '') setFocusedNode(null); 
          }}
          style={{
            width: '100%',
            padding: '10px 15px',
            borderRadius: '20px',
            border: '1px solid #333',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            fontSize: '14px',
            outline: 'none',
            backdropFilter: 'blur(5px)',
          }}
        />

        {/* Results Dropdown */}
        {filteredNodes.length > 0 && search !== focusedNode?.name && (
          <div style={{
            marginTop: '5px',
            background: 'rgba(0,0,0,0.8)',
            border: '1px solid #333',
            borderRadius: '10px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {filteredNodes.map(node => (
              <div 
                key={node.id}
                onClick={() => handleSelect(node)}
                style={{
                  padding: '8px 15px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #222',
                  fontSize: '0.9rem',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#222'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span>{node.name}</span>
                <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>{node.year}</span>
              </div>
            ))}
          </div>
        )}

        {/* Legend */}
        <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem', marginTop: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff6b6b' }}></div> Sativa
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ecdc4' }}></div> Indica
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffe66d' }}></div> Hybrid
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [15, 20, 25], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        {/* The Camera Rig handles the flying animation */}
        <CameraRig targetNode={focusedNode} />

        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[0, 50, 0]} angle={0.5} penumbra={1} intensity={2} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <YearMarkers />

        <group position={[0, -5, 0]}>
          <mesh position={[0, 15, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 40, 8]} />
            <meshBasicMaterial color="#222" transparent opacity={0.5} />
          </mesh>

          {nodes.map((node) => (
            <StrainOrb 
              key={node.id} 
              node={node} 
              searchQuery={search} 
              isFocused={focusedNode?.id === node.id}
              onSelect={handleSelect}
            />
          ))}
        </group>

        {/* makeDefault ensures this controls instance is accessible via useThree() */}
        <OrbitControls 
          makeDefault 
          enablePan={true} 
          enableZoom={true} 
          maxPolarAngle={Math.PI / 1.5} 
          autoRotate={!focusedNode && search === ''} // Stop rotation if focused or searching
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}