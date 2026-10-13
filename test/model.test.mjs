import test from 'node:test';
import assert from 'node:assert/strict';
import {analyze} from '../src/model.mjs';

const base={areaHa:1,efficiency:0.5,alternativeEfficiency:1,uncertaintyFraction:0.1,periods:[{etoMm:100,kc:1,effectiveRainMm:20}]};
test('unit conversion and efficiency',()=>{const r=analyze(base);assert.equal(r.baselineGrossM3,1600);assert.equal(r.alternativeGrossM3,800);assert.equal(r.modeledReductionFraction,0.5);});
test('rain surplus never yields negative demand',()=>{const r=analyze({...base,periods:[{etoMm:10,kc:1,effectiveRainMm:20}]});assert.equal(r.baselineGrossM3,0);assert.equal(r.modeledReductionFraction,null);});
test('sensitivity encloses baseline',()=>{const r=analyze(base);assert.ok(r.sensitivityGrossM3[0]<=r.baselineGrossM3&&r.sensitivityGrossM3[1]>=r.baselineGrossM3);});
test('invalid efficiencies and nonfinite inputs rejected',()=>{for(const efficiency of [0,-1,1.1,NaN])assert.throws(()=>analyze({...base,efficiency}));assert.throws(()=>analyze({...base,areaHa:Infinity}));});