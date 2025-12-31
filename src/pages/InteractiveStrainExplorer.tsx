import React, { useRef, useEffect, useState } from 'react';
import { Container, Title, Text, Paper } from '@mantine/core';
import './InteractiveStrainExplorer.css';

const InteractiveStrainExplorer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [startPan, setStartPan] = useState({ x: 0, y: 0 });

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.save();
        ctx.translate(pan.x, pan.y);
        ctx.scale(zoom, zoom);

        // Dummy genetic tree
        const nodes = {
            'root': { x: 400, y: 50, children: ['child1', 'child2'] },
            'child1': { x: 250, y: 150, children: ['grandchild1'] },
            'child2': { x: 550, y: 150, children: [] },
            'grandchild1': { x: 250, y: 250, children: [] },
        };

        // Draw lines
        Object.keys(nodes).forEach(key => {
            const node = nodes[key];
            node.children.forEach(childKey => {
                const child = nodes[childKey];
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(child.x, child.y);
                ctx.stroke();
            });
        });

        // Draw nodes
        Object.keys(nodes).forEach(key => {
            const node = nodes[key];
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
            ctx.fillStyle = 'skyblue';
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText(key, node.x, node.y + 5);
        });

        ctx.restore();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                draw(context);
            }
        }
    }, [draw, pan, zoom]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsPanning(true);
        setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isPanning) {
            setPan({
                x: e.clientX - startPan.x,
                y: e.clientY - startPan.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        const scaleAmount = -e.deltaY * 0.001;
        setZoom(prevZoom => Math.max(0.1, prevZoom + scaleAmount));
    };

    return (
        <Container size="xl" py="xl">
            <Title order={1} mb="md" ta="center">
                Interactive Strain Explorer
            </Title>
            <Text size="lg" mb="xl" ta="center" color="dimmed">
                Pan and zoom to explore the genetic evolution of our cannabis strains.
            </Text>
            <Paper shadow="sm" p="lg" radius="md" withBorder style={{ height: '60vh' }}>
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={400}
                    className="strain-explorer-canvas"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onWheel={handleWheel}
                />
            </Paper>
        </Container>
    );
};

export default InteractiveStrainExplorer;