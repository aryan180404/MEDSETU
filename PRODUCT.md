# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Plain static HTML, CSS and JavaScript (no build step), deployed as static sites. The live dashboard (repo medsetuecg) loads Chart.js, marked and html2pdf from CDNs.

## Users
People Aryan presents the project to: recruiters, professors, judges and peers, usually opening it from his portfolio on a laptop. Confirmed by Aryan: "it should look like a project meant to be presented"; no patient/doctor split.

## Product Purpose
MEDSETU is an ECG monitoring project from COEP Technological University. An Arduino-based ECG reads the heart's signal; a Python script streams filtered readings to Google Sheets; a web dashboard (https://medsetuecg.vercel.app/dashboard.html) shows the live trace, heart rate, R-peaks and signal range, keeps 50 synthetic demo patient recordings, and asks Gemini for a written report downloadable as PDF. Success: a visitor understands what was built and opens the live dashboard.

## Positioning
A working, end-to-end ECG pipeline built by an Instrumentation & Control student: hardware, signal cleanup, live streaming and an AI-assisted reading, not a mockup.

## Operating Context
Two repos share one identity: medsetu (project site: story, how it works, FAQ, help) and medsetuecg (home + the live dashboard). The project site links into the dashboard.

## Capabilities and Constraints
- Dashboard features must keep working: live polling every 2 s, stream states (active / inactive / error), patient database, Generate report, Review case, Download PDF.
- The ECG stream is only live when the device runs; "no active stream" is a normal state.
- Patient records are synthetic; the AI report is informational, not a diagnosis. MEDSETU is not a medical device.
- Patient/doctor login portals are retired (Aryan's request). Old URLs should not 404.

## Brand Commitments
Name: MEDSETU. Must look distinct from Aryan's personal portfolio (cream ground, electric blue, condensed caps display is the anti-reference). No photographs: illustration through animated SVG.

## Evidence on Hand
From Aryan's resume: Arduino ECG prototype with advanced grounding for high-fidelity ADC; EMF/EMI mitigation; Python script streaming real-time data over the web; validated with 8–10 users; Jan 2025 – Apr 2026. Built at COEP Technological University. No real testimonials or usage numbers exist; none may be invented.

## Product Principles
1. Show the working pipeline, not product theatre.
2. The live dashboard is the proof; every page leads to it.
3. Honest about prototype limits.
