import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Stars, Line } from '@react-three/drei';
import { Badge } from '@mantine/core';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { FaTimes } from 'react-icons/fa';
import * as THREE from 'three';
import './InteractiveStrainExplorer.css';

type StrainType = 'Sativa' | 'Indica' | 'Hybrid' | 'Ruderalis' | 'Invisible';

const BASE_YEAR = 2000;

interface StrainNode {
  id: string;
  name: string;
  year: number;
  type: StrainType;
  description?: string;
  link?: string;
  parents?: StrainNode[];
}

interface RenderNodeWithConnections extends StrainNode {
  position: THREE.Vector3;
}

interface Connection {
  parentId: string;
  childId: string;
}

const cannabisEvolutionData: StrainNode = {
  id: 'root',
  name: 'Skinny Genes Breeds',
  year: 2026,
  type: 'Invisible',
  parents: [
    {
      id: 'chem-91-problem-child',
      name: 'Chem 91 x Problem Child',
      year: 2025,
      type: 'Hybrid',
      description: "This strain is the result of a long-term breeding project by \
      Jay Hershfield, aiming to combine the legendary Chem 91 with the robust genetics \
      of Problem Child. The goal was to create a high-potency strain with a unique \
      terpene profile and vigorous growth. After several generations of selection, \
      this stable F2 hybrid was born.",
      parents: [
        {
          id: 'chem-91-auto',
          name: 'Chem 91 Auto',
          year: 2024,
          type: 'Hybrid',
          description: "Chem 91 Auto is an ruderalis / indica / sativa from Night Owl \
          Seeds and can be cultivated indoors, outdoors and greenhouse (Where the \
          plants will need a flowering time of ±85 days) Night Owl Seeds's Chem 91 \
          Auto is only available as feminized seeds. \
          Lineage: Chem 91 Clone Only x Chemdogging F3 \
          Generation: F4 Feminized Autoflower \
          Quantity: 3 Feminized Autoflower Seeds \
          Height: Up to 3.5 Feet \
          Yield: 2 - 4 Ounces \
          Harvest Time: 75 - 85 Days from Sprout",
          link: "https://seedfinder.eu/en/strain-info/chem-91-auto/night-owl-seeds"
        },
        {
          id: 'problem-child',
          name: 'Problem Child',
          year: 2022,
          type: 'Indica',
          description: "Problem Child is an mostly indica from Jinxproof Genetics \
          and can be cultivated indoors, outdoors and greenhouse (Where the plants \
          will need a flowering time of ±60 days) Jinxproof Genetics's Problem Child \
          is/was never available as feminized seeds.",
          link: "https://seedfinder.eu/en/strain-info/problem-child/jinxproof-genetics"
        }
      ]
    },
    {
      id: 'pulp',
      name: 'Pulp',
      year: 2023,
      type: 'Hybrid',
      description: "Approximately 60% Indica/40% Sativa. Phenotypes tend to show either \
      a slight dominance leaning more toward a Sativa direction stemming from the Tangie \
      and Maui Haze in the Problem Child F2 father, or take an Indica-leaning and more \
      Narcotic/ heavy-eyed dominant effect from the Cherry Ghostenade mother （also \
      from the nature of everything 9lb Hammer touches）. Was intentionally bred to \
      reduce/eliminate \"thought salad\". Best of both worlds effects-wise. \
      Exceptionally potent, and the flavor is off-the-charts delicious. Think Cherry & \
      Orange fun dip, accompanied by tart Lemon, Lime, candy Grape and deep bold \
      Blackberries. This strain is aptly named... It smells and tastes like PULP! One \
      of the least demanding plants I have ever grown by a clear mile （gets that from \
      the parent genetics）. Typically finishes in 56-63 days, including the more \
      sativa-dominant phenotypes which don't need to go much further than the 63 day \
      mark, even after stress or shock.",
      link: "https://skinnygenes.com/strain/pulp-skinny-genes/",
      parents: [
        {
          id: 'cherry-ghostenade',
          name: 'Cherry Ghostenade',
          year: 2020,
          type: 'Indica',
          description: "Cherry Ghostenade is an mostly indica from Clone Only Strains \
          and can be cultivated indoors and outdoors Clone Only Strains's Cherry \
          Ghostenade is/was clone only available as feminized seeds.",
          link: "https://seedfinder.eu/en/strain-info/cherry-ghostenade/clone-only-strains"
        },
        {
          id: 'problem-child',
          name: 'Problem Child',
          year: 2022,
          type: 'Indica'
        }
      ]
    },
    {
      id: 'skunk-hammer',
      name: 'Skunk Hammer',
      year: 2019,
      type: 'Indica',
      description: "Skunk Hammer is an mostly indica from Strainger Seeds and can be \
      cultivated indoors (Where the plants will need a flowering time of ±63 days) \
      Strainger Seeds's Skunk Hammer is/was never available as feminized seeds. 9lb \
      Hammer x Big Buddha Blue Cheese） Super heavy onset, some haziness, heavy \
      sedative/narcotic high in both mind and body. Some giggles, followed by a \
      catatonic couch lock high that will ease patients to sleep, regardless of \
      tolerance. Bred for pain, insomnia, and reducing 'thought salad'.",
      link: "https://seedfinder.eu/en/strain-info/skunk-hammer/strainger-seeds",
      parents: [
        {
          id: '9lb-hammer',
          name: '9lb Hammer',
          year: 2014,
          type: 'Indica',
          description: "9lb Hammer is an mostly indica from Jinxproof Genetics and can be cultivated indoors and outdoors (Where the plants will need a flowering time of ±55 days) Jinxproof Genetics's 9lb Hammer is/was never available as feminized seeds. \
          This strain was distributed from TGA genetics until 2019. \
          Parents: Gooberry （Afgooey x Blackberry） & Jesus OG Kush \
          Havest: 50-60 days \
          Yield: Heavy",
          link: "https://seedfinder.eu/en/strain-info/9lb-hammer/jinxproof-genetics"
        },
        {
          id: 'blue-cheese',
          name: 'Blue Cheese',
          year: 2006,
          type: 'Hybrid',
          description: "Blue Cheese is an indica / sativa from Big Buddha Seeds and can be cultivated indoors and outdoors (Where the plants will need a flowering time of ±63 days) Big Buddha Seeds's Blue Cheese also available as feminized seeds. Genetics: (Skunk No. 1 (Cheese) x Afghani) x Blueberry \
          Type: f1 Hybrid \
          Harvest Date: October/November \
          Flowering Period: 8-10 Weeks \
          THC Content: Unknown \
          No. of Seeds Per Packet: 10 \
          Characteristics: A Sweet, Fruity, Berry scent, with musky undertone of the original cheese.",
          link: "https://seedfinder.eu/en/strain-info/blue-cheese/big-buddha-seeds"
        }
      ]
    }
  ]
};

const collectLayoutData = (
  node: StrainNode,
  depth: number,
  angleStart: number,
  angleRange: number,
  effectiveParentId: string | undefined,
  nodesMap: Map<string, RenderNodeWithConnections>,
  connections: Connection[]
) => {
  const WIDTH_PER_YEAR = 0.5;
  const RADIUS_INCREMENT = 1.5;

  if (!nodesMap.has(node.id)) {
    const x = (node.year - BASE_YEAR) * WIDTH_PER_YEAR;
    const currentAngle = angleStart + angleRange / 2;
    const radius = depth * RADIUS_INCREMENT;
    const y = Math.cos(currentAngle) * radius;
    const z = Math.sin(currentAngle) * radius;
    const currentPos = new THREE.Vector3(x, y, z);
    nodesMap.set(node.id, { ...node, position: currentPos });
  }

  if (effectiveParentId && node.type !== 'Invisible' && effectiveParentId !== 'root') {
    connections.push({ parentId: effectiveParentId, childId: node.id });
  }

  if (node.parents && node.parents.length > 0) {
    const step = angleRange / node.parents.length;
    node.parents.forEach((child, index) => {
      collectLayoutData(
        child,
        depth + 1,
        angleStart + (step * index),
        step,
        node.id,
        nodesMap,
        connections
      );
    });
  }
};

const getUniqueRenderNodesAndConnections = (
  rootNode: StrainNode
): {
  uniqueRenderNodes: RenderNodeWithConnections[];
  connections: Connection[];
  nodesMap: Map<string, RenderNodeWithConnections>
} => {
  const nodesMap = new Map<string, RenderNodeWithConnections>();
  const connections: Connection[] = [];
  collectLayoutData(rootNode, 0, 0, Math.PI * 2, undefined, nodesMap, connections);
  return { uniqueRenderNodes: Array.from(nodesMap.values()), connections, nodesMap };
};

const CameraRig = ({ targetNode }: { targetNode: RenderNodeWithConnections | null }) => {
  const { camera, controls } = useThree();
  const vec = new THREE.Vector3();
  useFrame((state, delta) => {
    if (targetNode) {
      const { x, y, z } = targetNode.position;
      const offset = new THREE.Vector3(0, 5, 10);
      const targetPos = new THREE.Vector3(x, y, z);
      const desiredCamPos = targetPos.clone().add(offset);
      state.camera.position.lerp(desiredCamPos, 4 * delta);
      const ctrl = controls as unknown as OrbitControlsImpl;
      if (ctrl) {
        ctrl.target.lerp(targetPos, 4 * delta);
        ctrl.update();
      }
    }
  });
  return null;
};

interface StrainOrbProps {
  node: RenderNodeWithConnections;
  searchQuery: string;
  isFocused: boolean;
  onSelect: (node: RenderNodeWithConnections) => void;
  isHighlighted: boolean;
}

const StrainOrb = ({ node, searchQuery, isFocused, onSelect, isHighlighted }: StrainOrbProps) => {
  const [hovered, setHover] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const { gl } = useThree();
  const isMatch = searchQuery === '' || node.name.toLowerCase().includes(searchQuery.toLowerCase());
  const isDimmed = !isMatch;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (isFocused) {
        const scale = 1.5 + Math.sin(state.clock.elapsedTime * 8) * 0.2;
        meshRef.current.scale.setScalar(scale);
      } else if (isHighlighted) {
        const scale = 1.2 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
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
  const orbColor = isHighlighted ? '#fff' : baseColor;
  const emissiveColor = isHighlighted ? new THREE.Color('#fff') : new THREE.Color(baseColor);
  const emissiveIntensity = isHighlighted ? 1.5 : (hovered ? 0.6 : 0.2);
  const opacity = (isDimmed && !isHighlighted) ? 0.1 : 1;
  const wireframe = !hovered && !isFocused && !isHighlighted;

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onSelect(node); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); gl.domElement.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); gl.domElement.style.cursor = 'default'; }}
      >
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial
          color={orbColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          wireframe={wireframe}
        />
      </mesh>
      <Text
        position={[0, 0.7, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        fillOpacity={(isDimmed && !isHighlighted) ? 0.1 : 1}>
        {node.name}
      </Text>
    </group>
  );
};

const YearMarkers = () => {
  const markers = [];
  const endYear = 2020;
  const step = 10;
  const WIDTH_PER_YEAR = 0.5;
  for (let year = BASE_YEAR; year <= endYear; year += step) {
    const x = (year - BASE_YEAR) * WIDTH_PER_YEAR;
    markers.push(
      <group key={year} position={[x, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, Math.PI / 2]}>
          <ringGeometry args={[5, 5.05, 32]} />
          <meshBasicMaterial color="white" opacity={0.05} transparent side={THREE.DoubleSide} />
        </mesh>
        <Text position={[0, 5.5, 0]} fontSize={0.5} color="#666" anchorX="center" anchorY="bottom">
          {year}
        </Text>
      </group>
    );
  }
  return <group>{markers}</group>;
};

const CustomAutoRotate = ({ rotationDirection, setRotationDirection, autoRotateActive, rotationSpeed = 0.005 }:
  {
    rotationDirection: number;
    setRotationDirection: React.Dispatch<React.SetStateAction<number>>;
    autoRotateActive: boolean;
    rotationSpeed?: number
  }) => {
  const { controls } = useThree();
  const orbitControls = controls as OrbitControlsImpl;

  useFrame(() => {
    if (autoRotateActive && orbitControls) {
      const currentAzimuth = orbitControls.getAzimuthalAngle();
      const minAzimuth = orbitControls.minAzimuthAngle;
      const maxAzimuth = orbitControls.maxAzimuthAngle;
      if (currentAzimuth <= minAzimuth + 0.01 && rotationDirection === -1) {
        setRotationDirection(1);
      } else if (currentAzimuth >= maxAzimuth - 0.01 && rotationDirection === 1) {
        setRotationDirection(-1);
      }
      orbitControls.setAzimuthalAngle(currentAzimuth + rotationDirection * rotationSpeed);
      orbitControls.update();
    }
  });
  return null;
};

export default function CannabisEvolutionApp() {
  const { uniqueRenderNodes, connections, nodesMap } = useMemo(() =>
    getUniqueRenderNodesAndConnections(cannabisEvolutionData)
    , []);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentFocusIndex, setCurrentFocusIndex] = useState<number>(-1);
  const [focusedNode, setFocusedNode] = useState<RenderNodeWithConnections | null>(null);
  const [focusedNodesAndParentsIds, setFocusedNodesAndParentsIds] = useState<Set<string>>(new Set());
  const [rotationDirection, setRotationDirection] = useState<number>(1);
  const height = window.innerHeight - 76;

  const sortedNodes = useMemo(() => {
    return [...uniqueRenderNodes]
      .filter(node => node.type !== 'Invisible')
      .sort((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        }
        return a.name.localeCompare(b.name);
      });
  }, [uniqueRenderNodes]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearch('');
        setCurrentFocusIndex(-1);
        setFocusedNode(null);
        setFocusedNodesAndParentsIds(new Set());
        setIsSearching(false);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        setIsSearching(false);
        setCurrentFocusIndex(prevIndex => {
          if (prevIndex === -1) return sortedNodes.length - 1;
          return (prevIndex - 1 + sortedNodes.length) % sortedNodes.length;
        });
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        setIsSearching(false);
        setCurrentFocusIndex(prevIndex => {
          if (prevIndex === -1) return 0;
          return (prevIndex + 1) % sortedNodes.length;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearching, search, sortedNodes, setIsSearching, setCurrentFocusIndex, setFocusedNode, setSearch]);

  useEffect(() => {
    if (currentFocusIndex !== -1 && sortedNodes[currentFocusIndex]) {
      const node = sortedNodes[currentFocusIndex];
      setFocusedNode(node);
      setSearch(node.name);
    } else {
      setFocusedNode(null);
      setSearch('');
    }
  }, [currentFocusIndex, sortedNodes]);

  useEffect(() => {
    if (focusedNode) {
      handleSelect(focusedNode);
    }
  }, [focusedNode, nodesMap]);

  const filteredNodes = useMemo(() => {
    if (!search) return [];
    return uniqueRenderNodes.filter(n => n.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, uniqueRenderNodes]);

  const handleSelect = (node: RenderNodeWithConnections) => {
    setIsSearching(false);
    setSearch(node.name);
    const index = sortedNodes.findIndex(n => n.id === node.id);
    setCurrentFocusIndex(index);
    setFocusedNode(node);

    const getAncestors = (
      startNodeId: string,
      nodesMap: Map<string, RenderNodeWithConnections>,
      ancestorSet: Set<string> = new Set()
    ): Set<string> => {
      const node = nodesMap.get(startNodeId);
      if (!node) {
        return ancestorSet;
      }

      if (node.parents && node.parents.length > 0) {
        for (const parentStrainNode of node.parents) {
          if (!ancestorSet.has(parentStrainNode.id)) {
            ancestorSet.add(parentStrainNode.id);
            getAncestors(parentStrainNode.id, nodesMap, ancestorSet);
          }
        }
      }
      return ancestorSet;
    };

    const ancestors = getAncestors(node.id, nodesMap);
    const allFocusedIds = new Set(ancestors);
    allFocusedIds.add(node.id);
    setFocusedNodesAndParentsIds(allFocusedIds);
  };

  const handleClearSearch = () => {
    setFocusedNode(null);
    setSearch('');
    setIsSearching(false);
    setCurrentFocusIndex(-1);
    setFocusedNodesAndParentsIds(new Set());
  }

  return (
    <div className="explorer-container" style={{ height: height }}>
      <div className="info-panel" onClick={(e) => e.stopPropagation()}>
        <h3>Phylogenetic Tree</h3>
        <p>
          Explore cannabis strains bred by Skinny Genes with the 3D phylogenetic tree.
        </p>
        <div className="search-container">
          <div className="chatgpt-input-wrapper">
            <input
              name="search"
              type="text"
              placeholder="Search strains..."
              value={search}
              onChange={(e) => {
                const newSearch = e.target.value;
                setSearch(newSearch);
                setIsSearching(newSearch !== '');
                setCurrentFocusIndex(-1);
                if (newSearch === '') setFocusedNode(null);
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
                position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer'
              }} />
            )}
          </div>
        </div>
        {filteredNodes.length > 0 && search !== focusedNode?.name && (
          <div className="search-results">
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
      <Canvas camera={{ position: [7.5, 7.5, 15], fov: 45 }} onPointerMissed={handleClearSearch}>
        <color attach="background" args={['#050505']} />
        <CameraRig targetNode={focusedNode} />
        <CustomAutoRotate
          rotationDirection={rotationDirection}
          setRotationDirection={setRotationDirection}
          autoRotateActive={!focusedNode && search === ''}
        />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[0, 50, 0]} angle={0.5} penumbra={1} intensity={2} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade={true} />
        <YearMarkers />
        <group>
          <mesh position={[15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 30, 8]} />
            <meshBasicMaterial color="#222" transparent opacity={0.5} />
          </mesh>
          {uniqueRenderNodes.map((node) => (
            node.type !== 'Invisible' && (
              <StrainOrb
                key={node.id}
                node={node}
                searchQuery={search}
                isFocused={focusedNode?.id === node.id}
                onSelect={handleSelect}
                isHighlighted={focusedNodesAndParentsIds.has(node.id)}
              />
            )
          ))}
          {connections.map((conn, index) => {
            const parentNode = nodesMap.get(conn.parentId);
            const childNode = nodesMap.get(conn.childId);

            if (parentNode && childNode) {
              const isParentHighlighted = focusedNodesAndParentsIds.has(conn.parentId);
              const isChildHighlighted = focusedNodesAndParentsIds.has(conn.childId);
              const isConnectionHighlighted = isParentHighlighted && isChildHighlighted;

              const isParentDimmed = search !== '' && !parentNode.name.toLowerCase().includes(search.toLowerCase());
              const isChildDimmed = search !== '' && !childNode.name.toLowerCase().includes(search.toLowerCase());
              const isConnectionDimmed = isParentDimmed || isChildDimmed;

              const lineColor = isConnectionHighlighted ? "white" : (isConnectionDimmed ? "#444" : "white");
              const lineWidth = isConnectionHighlighted ? 2 : (isConnectionDimmed ? 0.5 : 1);
              const lineOpacity = isConnectionHighlighted ? 1 : (isConnectionDimmed ? 0.1 : 0.3);

              return (
                <Line
                  key={index}
                  points={[parentNode.position, childNode.position]}
                  color={lineColor}
                  lineWidth={lineWidth}
                  opacity={lineOpacity}
                  transparent
                />
              );
            }
            return null;
          })}
        </group>
        <OrbitControls
          makeDefault
          enablePan={true}
          enableZoom={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={3 * Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minDistance={2}
          maxDistance={25}
          target={[7.5, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
