// ─── SceneBackground.tsx ──────────────────────────────────────────────────
//
// This is the SWAP POINT for the 3D background scene.
//
// TO USE YOUR OWN VR MOUNTAINSCAPE (or any custom Three.js scene):
//
//   1. Create your scene component in this folder, e.g.:
//        src/components/3d/MountainScene.tsx
//
//   2. Your component must:
//        - Render a <Canvas> that fills its container
//            style={{ width: "100%", height: "100%" }}
//        - Listen to window.scrollY to drive camera position along a path
//            (see WorldScene.tsx → CameraRig for the scroll → spline pattern)
//        - Handle window.mousemove / window.touchmove for parallax if desired
//
//   3. Change the export below to point at your new component:
//        export { default } from "@/components/3d/MountainScene";
//
// ─────────────────────────────────────────────────────────────────────────
export { default } from "@/components/3d/WorldScene";
