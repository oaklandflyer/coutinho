// ─── SceneBackground.tsx ──────────────────────────────────────────────────
//
// SWAP POINT — change the one export line below to switch scenes.
//
// Current scene:  MountainScene  (aurora + procedural mountains + mist)
// Alt scene:      WorldScene     (starfield + nebulae + floating shapes)
//
// To build your own scene, create a new file in this folder, then:
//   export { default } from "@/components/3d/YourScene";
//
// Requirements for a custom scene component:
//   - Renders a <Canvas style={{ width:"100%", height:"100%" }}>
//   - Listens to window.scrollY inside useFrame (see CameraRig in each scene)
//   - Uses THREE.CatmullRomCurve3 WAYPOINTS with the same 6 section order
//
// ─────────────────────────────────────────────────────────────────────────
export { default } from "@/components/3d/MountainScene";
