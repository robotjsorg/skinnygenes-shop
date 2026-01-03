import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Stars, Line } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import './InteractiveStrainExplorer.css';

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

const CameraRig = ({ targetNode }: { targetNode: RenderNode | null }) => {
  const { camera, controls } = useThree();
  const vec = new THREE.Vector3();
  useFrame((state, delta) => {
    if (targetNode) {
      const { x, y, z } = targetNode.position;
      const offset = new THREE.Vector3(0, 0, 25); 
      const targetPos = new THREE.Vector3(x, y-5, z);
      const desiredCamPos = targetPos.clone().add(offset);
      state.camera.position.lerp(desiredCamPos, 4 * delta);
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
          color={isDimmed ? new THREE.Color("#444").getHex() : new THREE.Color("white").getHex()}
          lineWidth={isDimmed ? 0.5 : 1}
          opacity={isDimmed ? 0.1 : 0.3}
          transparent attachArray={undefined} attachObject={undefined} alphaWrite={undefined} derivatives={undefined}/>
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
          emissive={new THREE.Color(baseColor)}
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
        fillOpacity={isDimmed ? 0.1 : 1} attachArray={undefined} attachObject={undefined}> 
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
        <Text position={[5.5, 0, 0]} fontSize={0.5} color="#666" anchorX="left" anchorY="middle" attachArray={undefined} attachObject={undefined}>
          {year}
        </Text>
      </group>
    );
  }
  return <group>{markers}</group>;
};

export default function CannabisEvolutionApp() {
  const nodes = useMemo(() => calculateTreeLayout(cannabisEvolutionData), []);
  const [search, setSearch] = useState('');
  const [focusedNode, setFocusedNode] = useState<RenderNode | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFocusedNode(null);
        setSearch('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredNodes = useMemo(() => {
    if (!search) return [];
    return nodes.filter(n => n.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, nodes]);
  const handleSelect = (node: RenderNode) => {
    setFocusedNode(node);
    setSearch(node.name);
  };

  const handleClearSearch = () => {
    setFocusedNode(null);
    setSearch('');
  }

  const height = window.innerHeight - 76;

  return (
    <div className="explorer-container" style={{ height: height }}>
      <div className="info-panel" onClick={(e) => e.stopPropagation()}>
        <h3>Phylogenetic Tree</h3>
        <p>
          Explore the historical evolution of genetic strains with the 3D phylogenetic tree.
        </p>
        <div className="search-container">
          <div className="chatgpt-input-wrapper">
            <input
              type="text"
              placeholder="Search strains..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if(e.target.value === '') setFocusedNode(null);
              }}
              className="search-input"
            />
            <button className="microphone-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 3C10.3431 3 9 4.34315 9 6V11C9 12.6569 10.3431 14 12 14C13.6569 14 15 12.6569 15 11V6C15 4.34315 13.6569 3 12 3ZM7 11C7 13.7614 9.23858 16 12 16C14.7614 16 17 13.7614 17 11H19C19 14.4183 16.2091 17.2091 13 17.7231V21H11V17.7231C7.79086 17.2091 5 14.4183 5 11H7Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          {search && (
            <button className="clear-search" onClick={handleClearSearch}>
              &times;
            </button>
          )}
        </div>

        {filteredNodes.length > 0 && search !== focusedNode?.name && (
          <div className="search-results">
            {filteredNodes.map(node => (
              <div 
                key={node.id}
                onClick={(e) => { e.stopPropagation(); handleSelect(node); }}
                className="result-item"
              >
                <span>{node.name}</span>
                <span className="result-item-year">{node.year}</span>
              </div>
            ))}
          </div>
        )}

        <div className="legend">
          <div className="legend-item">
            <div className="legend-color-box" style={{ background: '#ff6b6b' }}></div> Sativa
          </div>
          <div className="legend-item">
            <div className="legend-color-box" style={{ background: '#4ecdc4' }}></div> Indica
          </div>
          <div className="legend-item">
            <div className="legend-color-box" style={{ background: '#ffe66d' }}></div> Hybrid
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [15, 20, 25], fov: 45 }} onPointerMissed={handleClearSearch}>
        <color attach="background" args={['#050505']} />
        <CameraRig targetNode={focusedNode} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[0, 50, 0]} angle={0.5} penumbra={1} intensity={2} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade={true} />
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

        <OrbitControls 
          makeDefault 
          enablePan={true} 
          enableZoom={true} 
          maxPolarAngle={Math.PI / 1.5} 
          autoRotate={!focusedNode && search === ''}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
