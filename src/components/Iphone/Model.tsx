/*
https://sketchfab.com/3d-models/iphone-14-pro-max-95f11f5a06604c8b9fd44046ae52a9cc

Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useEffect, useMemo, useRef } from "react";

const glbUrl = new URL("/iphone14promax.glb", import.meta.url).href;

type GLTFResult = GLTF & {
  nodes: {
    lxsKwuOPNvmzBKg_0: THREE.Mesh;
    FjhETOCBEeiBmch: THREE.Mesh;
    AbxQOpRbGREHXRG: THREE.Mesh;
    alSOKOYgFKIcUtR: THREE.Mesh;
    tWfjYtMZCfucxRt: THREE.Mesh;
    rrqFqyfckTuyRuI: THREE.Mesh;
    XbtrdVaOWYmkEiU: THREE.Mesh;
    screen: THREE.Mesh;
    JUTNJcWwqyxbGDZ_0: THREE.Mesh;
    BDLCJBydsNjizog_0: THREE.Mesh;
    GWEiavWnRxbogtw_0: THREE.Mesh;
    RFqaqXLpuCDBIGV_0: THREE.Mesh;
    tWBbDznHihIxXam: THREE.Mesh;
    PLFTnNQeqVAxicS: THREE.Mesh;
    tQCDizUpBYNcvFA: THREE.Mesh;
    CAQeTxdpUcbxQyT: THREE.Mesh;
    lgnGJJmNebyRbHq_0: THREE.Mesh;
    aVmapfDgqkPkjUf: THREE.Mesh;
    qsTxqfACkdoWeLQ: THREE.Mesh;
    zPPSOvNamLQVyvv: THREE.Mesh;
    YPGjoywokSeoQFr: THREE.Mesh;
    mZxrNiCtMrMjOMv: THREE.Mesh;
    MoTJNOoMxqdxNvQ: THREE.Mesh;
    BeQtuLXtpSTrzAH: THREE.Mesh;
    QaGkMzxNzKPcqRy: THREE.Mesh;
    RUMRNTkptJGDMpy: THREE.Mesh;
    KUDomTaVduCyevu: THREE.Mesh;
    QOfJIBEXOvXfSUh: THREE.Mesh;
    aYjPeBrpBRopJbp: THREE.Mesh;
    nJYGEbPQybRBbiN: THREE.Mesh;
    RGbIswEcCTzqNsn_0: THREE.Mesh;
    XeFHhVBtRZWPGxR: THREE.Mesh;
    dNDonqESZOxUcei_0: THREE.Mesh;
    IuMgFUHIyRWENxG_0: THREE.Mesh;
    oCklTGvTZoDWJrC_0: THREE.Mesh;
    nxFoHsySvfcSLvp: THREE.Mesh;
    JyAbjubWrOdfygC_0: THREE.Mesh;
    BhvzCWikxrVeDTV: THREE.Mesh;
    ePYqawqlCJbCsNi: THREE.Mesh;
    FGDSbHbILfUmiaH: THREE.Mesh;
    MMkajxMNWrwGQfi: THREE.Mesh;
    qjXEDwnnBYwWcJn: THREE.Mesh;
    YnrVhXEUDbStWCs: THREE.Mesh;
    FaUtifOQSMTXiZM: THREE.Mesh;
    knexoFNknstHgiO: THREE.Mesh;
    jQXfQpudiYObSGp: THREE.Mesh;
    KABLQLZRuEbcLWk: THREE.Mesh;
    DLfIUIalXuQjJsL: THREE.Mesh;
    OMkeKbwVHRBkBwM: THREE.Mesh;
    rJeCWUNsVVXXAbI: THREE.Mesh;
    vauUojKrKkLLDtY: THREE.Mesh;
    wjSYkRykuFHJNPw: THREE.Mesh;
    yqmgDmvGsmuPwXx_0: THREE.Mesh;
    rqSonbcVVSPWFfa_0: THREE.Mesh;
    UCttAeyROPsgmix: THREE.Mesh;
  };
  materials: {
    KhJiSWFcsscOusf: THREE.MeshStandardMaterial;
    KtvhjlxyToKjYkE: THREE.MeshStandardMaterial;
    IDdMwJVCyuFpUnA: THREE.MeshStandardMaterial;
    sWxYOtHGWTcXRMx: THREE.MeshStandardMaterial;
    fdfRsQCrfvPBPfQ: THREE.MeshStandardMaterial;
    CSNzlRnZuvCyxNL: THREE.MeshStandardMaterial;
    YiceMpFVTpnmoaq: THREE.MeshStandardMaterial;
    GFNYbWjyDVGUwJd: THREE.MeshStandardMaterial;
    LJBezuBxKRoHnAp: THREE.MeshStandardMaterial;
    fGwijctGaiRaYJC: THREE.MeshStandardMaterial;
    FsunUcGyajFpQmW: THREE.MeshStandardMaterial;
    nJRBoEsOhzMSqCz: THREE.MeshStandardMaterial;
    OStzgRHtVBLWwiD: THREE.MeshStandardMaterial;
    BLpVAsLWNICZYGG: THREE.MeshStandardMaterial;
    LtesZnUOMbBEAoi: THREE.MeshStandardMaterial;
    rNCplyWedyfORFh: THREE.MeshStandardMaterial;
    WqbAhnIPgrrhfXS: THREE.MeshStandardMaterial;
    IBtgGxCVyZhjKZM: THREE.MeshStandardMaterial;
    qEGySvwsouNnVcn: THREE.MeshStandardMaterial;
    initialShadingGroup: THREE.MeshStandardMaterial;
    iEhZxWeNLTDdgxm: THREE.MeshStandardMaterial;
    vsSJQngPxBJTVZb: THREE.MeshStandardMaterial;
    xHgtbqndQshkTKG: THREE.MeshStandardMaterial;
    tDZQoaroJfCIQtF: THREE.MeshStandardMaterial;
    FlDKBWPodPcEeGy: THREE.MeshStandardMaterial;
    tfbCjiZQaZkmtHx: THREE.MeshStandardMaterial;
    LUbRMhkIhuekQRK: THREE.MeshStandardMaterial;
    LcWBQfBvCzxThpp: THREE.MeshStandardMaterial;
    jFPFAvCbiqflbQV: THREE.MeshStandardMaterial;
    EJpkIDZfhPDUzel: THREE.MeshStandardMaterial;
    pBMikDFQfUOsKkr: THREE.MeshStandardMaterial;
    IkWzRHNnDaKQXIi: THREE.MeshStandardMaterial;
    psePdsxZprlxGrw: THREE.MeshStandardMaterial;
    HvAGJeQTAiWbceX: THREE.MeshStandardMaterial;
    KxzouvBYEgdZhMo: THREE.MeshStandardMaterial;
    bmOZLlCkCKhIIVe: THREE.MeshStandardMaterial;
  };
};

type ModelProps = JSX.IntrinsicElements["group"] & {
  children?: React.ReactNode;
  screenTexture?: THREE.Texture;
};

export function Model({ children, screenTexture, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF(glbUrl) as unknown as GLTFResult;

  // const screenRef = useRef<THREE.Mesh>(null);
  // globalThis.screenRef = screenRef;

  // const size = useMemo(() => {
  //   // compute the size of the screen
  //   const bbox = nodes.screen.geometry.boundingBox;
  //   if (!bbox) return null;

  //   const size = bbox.getSize(new THREE.Vector3());
  //   console.log("screen size", size);
  //   return size;
  // }, [nodes.screen.geometry]);

  return (
    <>
      <group {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <mesh
              // ref={screenRef}
              castShadow
              receiveShadow
              geometry={nodes.screen.geometry}
              // material={nodes.screen.material}
            >
              <meshStandardMaterial map={screenTexture} />

              <group position-y={15.4926 / 2}>{children}</group>
            </mesh>
            <>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.lxsKwuOPNvmzBKg_0.geometry}
                material={materials.KhJiSWFcsscOusf}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.FjhETOCBEeiBmch.geometry}
                material={materials.KtvhjlxyToKjYkE}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.AbxQOpRbGREHXRG.geometry}
                material={materials.IDdMwJVCyuFpUnA}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.alSOKOYgFKIcUtR.geometry}
                material={materials.sWxYOtHGWTcXRMx}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tWfjYtMZCfucxRt.geometry}
                material={materials.fdfRsQCrfvPBPfQ}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.rrqFqyfckTuyRuI.geometry}
                material={materials.CSNzlRnZuvCyxNL}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.XbtrdVaOWYmkEiU.geometry}
                material={materials.YiceMpFVTpnmoaq}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.JUTNJcWwqyxbGDZ_0.geometry}
                material={materials.LJBezuBxKRoHnAp}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.BDLCJBydsNjizog_0.geometry}
                material={materials.fGwijctGaiRaYJC}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.GWEiavWnRxbogtw_0.geometry}
                material={materials.FsunUcGyajFpQmW}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.RFqaqXLpuCDBIGV_0.geometry}
                material={materials.nJRBoEsOhzMSqCz}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tWBbDznHihIxXam.geometry}
                material={materials.OStzgRHtVBLWwiD}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.PLFTnNQeqVAxicS.geometry}
                material={materials.BLpVAsLWNICZYGG}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.tQCDizUpBYNcvFA.geometry}
                material={materials.LtesZnUOMbBEAoi}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.CAQeTxdpUcbxQyT.geometry}
                material={materials.KtvhjlxyToKjYkE}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.lgnGJJmNebyRbHq_0.geometry}
                material={materials.rNCplyWedyfORFh}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.aVmapfDgqkPkjUf.geometry}
                material={materials.WqbAhnIPgrrhfXS}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.qsTxqfACkdoWeLQ.geometry}
                material={materials.IBtgGxCVyZhjKZM}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.zPPSOvNamLQVyvv.geometry}
                material={materials.qEGySvwsouNnVcn}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.YPGjoywokSeoQFr.geometry}
                material={materials.KtvhjlxyToKjYkE}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.mZxrNiCtMrMjOMv.geometry}
                material={materials.WqbAhnIPgrrhfXS}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.MoTJNOoMxqdxNvQ.geometry}
                material={materials.IBtgGxCVyZhjKZM}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.BeQtuLXtpSTrzAH.geometry}
                material={materials.initialShadingGroup}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.QaGkMzxNzKPcqRy.geometry}
                material={materials.iEhZxWeNLTDdgxm}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.RUMRNTkptJGDMpy.geometry}
                material={materials.LJBezuBxKRoHnAp}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.KUDomTaVduCyevu.geometry}
                material={materials.KtvhjlxyToKjYkE}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.QOfJIBEXOvXfSUh.geometry}
                material={materials.vsSJQngPxBJTVZb}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.aYjPeBrpBRopJbp.geometry}
                material={materials.xHgtbqndQshkTKG}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.nJYGEbPQybRBbiN.geometry}
                material={materials.tDZQoaroJfCIQtF}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.RGbIswEcCTzqNsn_0.geometry}
                material={materials.FlDKBWPodPcEeGy}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.XeFHhVBtRZWPGxR.geometry}
                material={materials.tfbCjiZQaZkmtHx}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.dNDonqESZOxUcei_0.geometry}
                material={materials.LUbRMhkIhuekQRK}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.IuMgFUHIyRWENxG_0.geometry}
                material={materials.LcWBQfBvCzxThpp}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.oCklTGvTZoDWJrC_0.geometry}
                material={materials.tfbCjiZQaZkmtHx}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.nxFoHsySvfcSLvp.geometry}
                material={materials.KtvhjlxyToKjYkE}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.JyAbjubWrOdfygC_0.geometry}
                material={materials.jFPFAvCbiqflbQV}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.BhvzCWikxrVeDTV.geometry}
                material={materials.LtesZnUOMbBEAoi}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.ePYqawqlCJbCsNi.geometry}
                material={materials.CSNzlRnZuvCyxNL}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.FGDSbHbILfUmiaH.geometry}
                material={materials.tfbCjiZQaZkmtHx}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.MMkajxMNWrwGQfi.geometry}
                material={materials.LtesZnUOMbBEAoi}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.qjXEDwnnBYwWcJn.geometry}
                material={materials.tfbCjiZQaZkmtHx}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.YnrVhXEUDbStWCs.geometry}
                material={materials.EJpkIDZfhPDUzel}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.FaUtifOQSMTXiZM.geometry}
                material={materials.KtvhjlxyToKjYkE}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.knexoFNknstHgiO.geometry}
                material={materials.KtvhjlxyToKjYkE}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.jQXfQpudiYObSGp.geometry}
                material={materials.sWxYOtHGWTcXRMx}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.KABLQLZRuEbcLWk.geometry}
                material={materials.fdfRsQCrfvPBPfQ}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.DLfIUIalXuQjJsL.geometry}
                material={materials.pBMikDFQfUOsKkr}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.OMkeKbwVHRBkBwM.geometry}
                material={materials.IkWzRHNnDaKQXIi}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.rJeCWUNsVVXXAbI.geometry}
                material={materials.psePdsxZprlxGrw}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.vauUojKrKkLLDtY.geometry}
                material={materials.HvAGJeQTAiWbceX}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.wjSYkRykuFHJNPw.geometry}
                material={materials.KxzouvBYEgdZhMo}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.yqmgDmvGsmuPwXx_0.geometry}
                material={materials.bmOZLlCkCKhIIVe}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.rqSonbcVVSPWFfa_0.geometry}
                material={materials.jFPFAvCbiqflbQV}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.UCttAeyROPsgmix.geometry}
                material={materials.KtvhjlxyToKjYkE}
              />
            </>
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload(glbUrl);
