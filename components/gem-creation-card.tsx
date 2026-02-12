"use client"

import { useEffect, useRef } from "react"
import type { SajuChart } from "@/lib/saju"
import { metaphorDictionary } from "@/lib/data/metaphor-dictionary"

interface GemCreationCardProps {
  saju?: SajuChart | null
}

export function GemCreationCard({ saju }: GemCreationCardProps) {
  const gemCanvasRef = useRef<HTMLCanvasElement>(null)
  const gemAnimFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = gemCanvasRef.current
    if (!canvas) return

    let gemScene: ReturnType<typeof import("three").Scene> | null = null
    let gemRenderer: ReturnType<typeof import("three").WebGLRenderer> | null = null
    let gemCurrentMesh: import("three").LineSegments | null = null
    let gemTime = 0
    let gemLastMorphTime = Date.now()
    let gemNextShapeIndex = 1
    let gemCurrentShapeIndex = 0

    const GEM_MORPH_INTERVAL = 3000
    const GEM_COLOR = 0xd4a574

    import("three").then((THREE) => {
      gemScene = new THREE.Scene()
      const gemCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      gemCamera.position.z = 4

      gemRenderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      })
      gemRenderer.setSize(280, 280)
      gemRenderer.setClearColor(0x000000, 0)

      const gemShapes = [
        new THREE.LatheGeometry(
          [
            new THREE.Vector2(0, -1.2),
            new THREE.Vector2(0.5, -0.8),
            new THREE.Vector2(0.7, 0),
            new THREE.Vector2(0.5, 0.8),
            new THREE.Vector2(0, 1.2),
          ],
          6
        ),
        new THREE.ConeGeometry(0.8, 2, 6),
        new THREE.BoxGeometry(1.2, 1.2, 1.2, 2, 2, 2),
        new THREE.IcosahedronGeometry(0.9, 0),
        new THREE.OctahedronGeometry(1, 0),
      ]

      function createGemWireframe(geometry: import("three").BufferGeometry) {
        const edges = new THREE.EdgesGeometry(geometry, 15)
        const material = new THREE.LineBasicMaterial({
          color: GEM_COLOR,
          transparent: true,
          opacity: 1,
        })
        return new THREE.LineSegments(edges, material)
      }

      gemCurrentMesh = createGemWireframe(gemShapes[gemCurrentShapeIndex])
      gemScene.add(gemCurrentMesh)

      function animateGem() {
        gemAnimFrameRef.current = requestAnimationFrame(animateGem)
        gemTime += 0.01

        if (gemCurrentMesh && gemScene && gemRenderer) {
          gemCurrentMesh.rotation.x = Math.sin(gemTime * 0.3) * 0.2 + 0.3
          gemCurrentMesh.rotation.y = gemTime * 0.4

          const now = Date.now()
          if (now - gemLastMorphTime > GEM_MORPH_INTERVAL) {
            if (gemCurrentMesh) {
              const mat = gemCurrentMesh.material as import("three").LineBasicMaterial
              mat.opacity -= 0.05
              if (mat.opacity <= 0) {
                gemScene.remove(gemCurrentMesh)
                gemCurrentMesh = null

                gemCurrentShapeIndex = gemNextShapeIndex
                gemNextShapeIndex = (gemNextShapeIndex + 1) % gemShapes.length

                gemCurrentMesh = createGemWireframe(gemShapes[gemCurrentShapeIndex])
                ;(gemCurrentMesh.material as import("three").LineBasicMaterial).opacity = 0
                gemCurrentMesh.rotation.x = 0.3
                gemCurrentMesh.rotation.y = gemTime * 0.4
                gemScene.add(gemCurrentMesh)

                gemLastMorphTime = now
              }
            }
          } else if (gemCurrentMesh) {
            const mat = gemCurrentMesh.material as import("three").LineBasicMaterial
            if (mat.opacity < 1) mat.opacity += 0.05
          }

          gemRenderer.render(gemScene, gemCamera)
        }
      }

      animateGem()
    })

    return () => {
      cancelAnimationFrame(gemAnimFrameRef.current)
    }
  }, [])

  const dayPillar = saju ? `${saju.day.stem}${saju.day.branch}` : "?"

  function handleStartRefining() {
    console.log("제련 시작!")
  }

  return (
    <div className="gem-creation-card">
      <div className="gem-container">
        <div className="gem-glow" />
        <canvas ref={gemCanvasRef} className="gem-canvas" />
      </div>

      <h2 className="gem-title">당신의 {metaphorDictionary.core.saju.simple}을 보석으로</h2>
      <p className="gem-subtitle">Refine Your Elements</p>

      <div className="gem-pillar">{dayPillar}</div>

      <p className="gem-desc">
        당신이 태어난 찰나의 기운을
        <br />
        <strong>정밀하게 제련</strong>하면
        <br />
        하나의 보석 형상으로 드러납니다
      </p>

      <button type="button" className="btn-refine" onClick={handleStartRefining}>
        ✨ 제련 시작하기
      </button>
    </div>
  )
}
