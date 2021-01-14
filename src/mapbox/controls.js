import * as dat from 'dat.gui';
import { heatLayer, windLayer } from './wind-main';

const gui = new dat.GUI({ autoPlace: false });

export const windcontrol = {
  Wind: false,
  '2021-01-02+h': 0,
  retina: false,
  numParticles: 65536,
  fadeOpacity: 0.95,
  speedFactor: 0.25,
  dropRate: 0.03,
  dropRateBump: 0.01,
  Heat: false,
  showMesh: false,
  resolution: 256,
  scale: 0.1,
  offset: 0.0,
  opacity: 0.6,
};

function showWindLayer(map) {
  if (windcontrol.Wind) { map.addLayer(windLayer); } else { map.removeLayer(windLayer.id); }
}

function showHeatLayer(map) {
  if (windcontrol.Heat) { map.addLayer(heatLayer); } else { map.removeLayer(heatLayer.id); }
}

function updateWind(name) {
  if (windLayer.wind) { windLayer.wind.updateWind(name); } else { console.log('windLayer.wind is NULL'); }
}

function updateHeat(name) {
  if (heatLayer.heat) { heatLayer.heat.updateHeat(name); } else { console.log('heatLayer.wind is NULL'); }
}

function updateParameters(param) {
  if (windLayer.wind) {
    windLayer.wind.numParticles = windcontrol.numParticles;
    windLayer.wind.fadeOpacity = windcontrol.fadeOpacity;
    windLayer.wind.speedFactor = windcontrol.speedFactor;
    windLayer.wind.dropRate = windcontrol.dropRate;
    windLayer.wind.dropRateBump = windcontrol.dropRateBump;
  }
  if (heatLayer.heat) {
    heatLayer.heat.resolution = windcontrol.resolution;
    heatLayer.heat.scale = windcontrol.scale;
    heatLayer.heat.offset = windcontrol.offset;
    heatLayer.heat.showMesh = windcontrol.showMesh;
    heatLayer.heat.opacity = windcontrol.opacity;
  }
}

function updateRetina() {
  if (windLayer.wind) { windLayer.wind.updateRetina(windcontrol.retina); } else { console.log('windLayer.wind is NULL'); }
}

export function loadControls(map) {
  document.getElementById('controls').appendChild(gui.domElement);

  // Wind Controls
  gui.add(windcontrol, 'Wind').onFinishChange(() => showWindLayer(map));
  gui.add(windcontrol, '2021-01-02+h', 0, 162, 6).onFinishChange((name) => { updateWind(name); updateHeat(name); });
  gui.add(windcontrol, 'numParticles', 1024, 589824).onFinishChange(updateParameters);
  gui.add(windcontrol, 'fadeOpacity', 0.96, 0.999).step(0.001).onFinishChange(updateParameters);
  gui.add(windcontrol, 'speedFactor', 0.05, 1.0).onFinishChange(updateParameters);
  gui.add(windcontrol, 'dropRate', 0, 0.1).onFinishChange(updateParameters);
  gui.add(windcontrol, 'dropRateBump', 0, 0.2).onFinishChange(updateParameters);

  gui.add(windcontrol, 'Heat').onFinishChange(() => showHeatLayer(map));
  gui.add(windcontrol, 'showMesh').onFinishChange(updateParameters);
  gui.add(windcontrol, 'resolution', 4, 1024).step(2).onFinishChange(updateParameters);
  gui.add(windcontrol, 'scale', 0.01, 0.2, 0.1).step(0.001).onFinishChange(updateParameters);
  gui.add(windcontrol, 'offset', -0.1, 0.1, 0.0).step(0.001).onFinishChange(updateParameters);
  gui.add(windcontrol, 'opacity', 0.0, 1.0, 0.6).step(0.01).onFinishChange(updateParameters);
  // gui.add(windcontrol, 'retina').onFinishChange(updateRetina);  // not work

  // if (windcontrol.Wind) { showWindLayer(map); }
  // if (windcontrol.Heat) { showWindLayer(map); }
  // Heat Controls
}
