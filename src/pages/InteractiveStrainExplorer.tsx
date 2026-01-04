import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Stars, Line } from '@react-three/drei';
import { Badge } from '@mantine/core';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { FaTimes } from 'react-icons/fa';
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
      case 'Indica': return 'purple';
      case 'Sativa': return 'orange';
      case 'Hybrid': return 'green';
      default: return 'gray';
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
          transparent />
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
        fillOpacity={isDimmed ? 0.1 : 1}>
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
              name="search"
              type="text"
              placeholder="Search strains..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if(e.target.value === '') setFocusedNode(null);
              }}
              className="search-input"
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
            {search && (
              <FaTimes className="clear-search-icon" onClick={handleClearSearch} style={{
                position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#aaa'
              }} />
            )}
          </div>
        </div>

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
                onClick={(e) => { e.stopPropagation(); handleSelect(node); }}

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
                <span>{node.year}</span>
              </div>
            ))}
          </div>
        )}

        <div className="legend">
          <Badge color="orange" variant="light">Sativa</Badge>
          <Badge color="purple" variant="light">Indica</Badge>
          <Badge color="green" variant="light">Hybrid</Badge>
          <Badge color="gray" variant="light">Ruderalis</Badge>
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
