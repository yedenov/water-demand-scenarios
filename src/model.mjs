export function analyze(input){
  const {areaHa,efficiency,alternativeEfficiency,uncertaintyFraction,periods}=input;
  if(!Number.isFinite(areaHa)||areaHa<=0)throw Error('areaHa must be positive');
  for(const e of [efficiency,alternativeEfficiency])if(!Number.isFinite(e)||e<=0||e>1)throw Error('Efficiency must be in (0,1]');
  if(!Number.isFinite(uncertaintyFraction)||uncertaintyFraction<0||uncertaintyFraction>1)throw Error('Uncertainty must be in [0,1]');
  if(!Array.isArray(periods)||!periods.length||periods.some(p=>!p||['etoMm','kc','effectiveRainMm'].some(k=>!Number.isFinite(p[k])||p[k]<0)))throw Error('Periods require nonnegative finite inputs');
  const volume=(factor,e)=>periods.reduce((s,p)=>s+Math.max(0,p.etoMm*factor*p.kc-p.effectiveRainMm),0)*areaHa*10/e;
  const baseline=volume(1,efficiency),alternative=volume(1,alternativeEfficiency);
  return {baselineGrossM3:baseline,alternativeGrossM3:alternative,modeledReductionM3:baseline-alternative,modeledReductionFraction:baseline===0?null:(baseline-alternative)/baseline,sensitivityGrossM3:[volume(1-uncertaintyFraction,efficiency),volume(1+uncertaintyFraction,efficiency)]};
}
