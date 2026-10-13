# Study protocol

## Status

Exploratory computational prototype; no collected human-subject data and no field deployment.

## Estimand and assumptions

How do irrigation efficiency and reference evapotranspiration affect a simplified seasonal water budget?

For each period, ETc = ETo × Kc; net irrigation = max(0, ETc − effective rainfall). Gross irrigation = net / efficiency. One mm over one hectare equals 10 m³. Low and high scenarios multiply ETo by (1 ± uncertaintyFraction); these are sensitivity bounds, NOT statistical confidence intervals. Each period is independent: soil storage, runoff, groundwater, salinity and conveyance losses are excluded. The model uses the FAO-56 (1998) single-coefficient relationship, not a full FAO operational irrigation model.

## Data dictionary

areaHa: positive hectares; efficiency and alternativeEfficiency: fractions in (0,1]; uncertaintyFraction: ETo perturbation in [0,1]; periods: [{etoMm,kc,effectiveRainMm}] with nonnegative values. ETo and effective rainfall are TOTAL depths for the same period; Kc is the representative coefficient for that period. Effective rainfall must be estimated upstream and documented.

## Reproduction

Run `node --test` and `node cli.mjs data/demo.json results`. The demo is deterministic and uses no network services. The result embeds input values. Synthetic data were manually constructed to exercise the model; no location names refer to real observations.

## Validation plan

1. Register the real study question and analysis window before inspecting outcomes.
2. Record source URL, retrieval date, license, units, spatial/temporal resolution and missingness.
3. Compare calculations against hand calculations and an independent reference implementation.
4. Vary assumptions and report sensitivity; distinguish scenario bounds from sampling uncertainty.
5. Have a domain specialist assess external validity. Report failures and limitations.

## Ethics and interpretation

Use public aggregate data with compatible terms; avoid personal records. Do not treat computed rankings or scenarios as operational recommendations. There are no established beneficiary counts, publications, partnerships or impact claims.

## Reference

https://www.fao.org/4/X0490E/x0490e0b.htm
