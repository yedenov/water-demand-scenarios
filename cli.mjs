import fs from 'node:fs';
import path from 'node:path';
import {analyze} from './src/model.mjs';
const [input,output]=process.argv.slice(2);
if(!input){console.error('Usage: node cli.mjs INPUT.json [OUTPUT_DIRECTORY]');process.exit(1);}
try {
 const data=JSON.parse(fs.readFileSync(input,'utf8'));
 const result=analyze(data);
 const artifact={project:"water-demand-scenarios",dataStatus:path.resolve(input)===path.resolve('data/demo.json')?'SYNTHETIC DEMONSTRATION':'USER SUPPLIED — provenance not verified',input:data,result};
 const json=JSON.stringify(artifact,null,2)+'\n';
 if(output){fs.mkdirSync(output,{recursive:true});fs.writeFileSync(path.join(output,'result.json'),json);const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');fs.writeFileSync(path.join(output,'report.html'),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Water Demand Scenarios — report</title><style>body{font:17px/1.6 system-ui;margin:48px auto;padding:0 24px;max-width:960px;color:#143143;background:#f4f8fa}h1{font-size:42px;line-height:1.15}strong{color:#985400}pre{background:white;padding:24px;overflow:auto;border:1px solid #cbdde5;border-radius:12px}a{color:#006a83}</style><h1>Water Demand Scenarios</h1><strong>'+esc(artifact.dataStatus)+'</strong><p>How do irrigation efficiency and reference evapotranspiration affect a simplified seasonal water budget?</p><h2>Method and interpretation</h2><p>For each period, ETc = ETo × Kc; net irrigation = max(0, ETc − effective rainfall). Gross irrigation = net / efficiency. One mm over one hectare equals 10 m³. Low and high scenarios multiply ETo by (1 ± uncertaintyFraction); these are sensitivity bounds, NOT statistical confidence intervals. Each period is independent: soil storage, runoff, groundwater, salinity and conveyance losses are excluded. The model uses the FAO-56 (1998) single-coefficient relationship, not a full FAO operational irrigation model.</p><h2>Inputs and results</h2><pre>'+esc(json)+'</pre><p>Research prototype • no verified field impact • <a href="https://www.fao.org/4/X0490E/x0490e0b.htm">Method reference</a></p></html>');}
 process.stdout.write(json);
}catch(e){console.error('Analysis failed: '+e.message);process.exit(1);}
