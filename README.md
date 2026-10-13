# Water Demand Scenarios

Сценарии потребности в поливной воде

**Research prototype · synthetic demo data · no validated field impact**

## Research question

How do irrigation efficiency and reference evapotranspiration affect a simplified seasonal water budget?

## Why this matters

This tool supports transparent exploration of a public-interest planning question. It can be adapted to Kazakhstan after obtaining appropriate local data. It does not establish outcomes for any real community.

## Run in two minutes

Requires Node.js 22 or newer. No external packages, credentials or network needed.

```sh
node --test
node cli.mjs data/demo.json results
```

Open [the demo report](results/report.html) in a browser, or inspect [machine-readable results](results/result.json). To use your own data: `node cli.mjs my-data.json my-results`. Paths resolve relative to the current directory. Run commands from the repository root.

## Method

For each period, ETc = ETo × Kc; net irrigation = max(0, ETc − effective rainfall). Gross irrigation = net / efficiency. One mm over one hectare equals 10 m³. Low and high scenarios multiply ETo by (1 ± uncertaintyFraction); these are sensitivity bounds, NOT statistical confidence intervals. Each period is independent: soil storage, runoff, groundwater, salinity and conveyance losses are excluded. The model uses the FAO-56 (1998) single-coefficient relationship, not a full FAO operational irrigation model.

Reference: [primary method documentation](https://www.fao.org/4/X0490E/x0490e0b.htm). The reference supports the method, not this prototype's validity or impact.

## Input contract

areaHa: positive hectares; efficiency and alternativeEfficiency: fractions in (0,1]; uncertaintyFraction: ETo perturbation in [0,1]; periods: [{etoMm,kc,effectiveRainMm}] with nonnegative values. ETo and effective rainfall are TOTAL depths for the same period; Kc is the representative coefficient for that period. Effective rainfall must be estimated upstream and documented.

See [example input](data/demo.json), [model](src/model.mjs), [methodology](docs/METHODOLOGY.md), and [tests](test/model.test.mjs). Inputs fail explicitly when required numeric values are invalid. JSON does not support NaN or Infinity.

## Evidence and next study

The committed example is a hand-constructed fixture, not an empirical study. Test outputs check arithmetic and edge cases; they do not validate applicability to Kazakhstan. Before real use, document provenance and licensing, compare results with an independent implementation, assess data completeness and bias, and have a domain specialist review assumptions. Publish validation results including negative findings.

## Для портфолио

Прототип помогает показать понимание методики и воспроизводимости. Его нельзя описывать как завершённое полевое исследование, внедрение или доказанное улучшение жизни людей. Следующий шаг — реальные открытые данные, проверка с профильным специалистом и документированный личный вклад.

## Development and attribution

Initial implementation and documentation were generated with AI assistance at the portfolio owner's request. No prior research history, institutional affiliation or individual scientific contribution is asserted. The owner should review, understand and extend the work before making personal contribution claims.

MIT licensed code and synthetic fixtures. Third-party sources retain their own terms. See [contribution guide](CONTRIBUTING.md).
