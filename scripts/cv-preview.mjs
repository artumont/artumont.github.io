#!/usr/bin/env node
/**
 * scripts/cv-preview.mjs
 *
 * Renderiza el CV (`en` y `es`) a PDF y a PNG (una imagen por página) dentro de
 * `.pi/cv/preview/`. Reejecutable con:
 *
 *   node scripts/cv-preview.mjs
 *
 * Cómo funciona:
 *   - Transpila `src/components/CvPdf.tsx` y `src/data/cv-data.ts` a ESM con la API de
 *     TypeScript (mismo compilador que usa el proyecto) dentro de `.pi/cv/preview/.generated/`.
 *   - Renderiza con `renderToBuffer` de `@react-pdf/renderer` (API de Node).
 *   - Convierte cada PDF a PNG con `pdftoppm` (poppler-utils); si no está instalado,
 *     deja los PDF y avisa.
 *
 * Los PNG renderizados son la evidencia visual que un humano revisa; los PDF son el
 * artefacto que el usuario descarga desde `/cv`.
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, '.pi', 'cv', 'preview');
const GEN_DIR = path.join(OUT_DIR, '.generated');

const LANGUAGES = [
    { code: 'en', fileName: 'Arturo-Montes-Backend-DevOps-Engineer-EN.pdf' },
    { code: 'es', fileName: 'Arturo-Montes-Backend-DevOps-Engineer-ES.pdf' },
];

const COMPILER_OPTIONS = {
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    esModuleInterop: true,
    isolatedModules: true,
};

function transpile(fromRelative, toName, rewriteSpecifiers = {}) {
    const sourcePath = path.join(ROOT, fromRelative);
    const source = readFileSync(sourcePath, 'utf8');
    const { outputText, diagnostics } = ts.transpileModule(source, {
        compilerOptions: COMPILER_OPTIONS,
        fileName: sourcePath,
        reportDiagnostics: true,
    });

    if (diagnostics?.length) {
        const messages = diagnostics
            .map(d => ts.flattenDiagnosticMessageText(d.messageText, ' '))
            .join('; ');
        throw new Error(`Error al transpilar ${fromRelative}: ${messages}`);
    }

    let output = outputText;
    for (const [specifier, replacement] of Object.entries(rewriteSpecifiers)) {
        output = output.split(`"${specifier}"`).join(`"${replacement}"`);
        output = output.split(`'${specifier}'`).join(`"${replacement}"`);
    }

    const target = path.join(GEN_DIR, toName);
    writeFileSync(target, output, 'utf8');
    return target;
}

function countPdfPages(pdfPath) {
    const raw = readFileSync(pdfPath, 'latin1');
    const typePage = /\/Type\s*\/Page[^s]/g;
    return (raw.match(typePage) ?? []).length;
}

function renderPng(pdfPath) {
    const prefix = pdfPath.replace(/\.pdf$/, '');
    try {
        execFileSync('pdftoppm', ['-r', '150', '-png', pdfPath, prefix], { stdio: 'pipe' });
    } catch (error) {
        return { ok: false, reason: error.message.split('\n')[0] };
    }
    return { ok: true };
}

async function main() {
    rmSync(GEN_DIR, { recursive: true, force: true });
    mkdirSync(GEN_DIR, { recursive: true });

    transpile('src/data/cv-data.ts', 'cv-data.mjs');
    transpile('src/components/CvPdf.tsx', 'CvPdf.mjs', {
        '@/data/cv-data': './cv-data.mjs',
    });

    const React = (await import('react')).default;
    const { renderToBuffer } = await import('@react-pdf/renderer');
    const generatedCvUrl = pathToFileURL(path.join(GEN_DIR, 'CvPdf.mjs')).href;

    const CvPdf = (await import(generatedCvUrl)).default;

    const report = [];
    for (const { code, fileName } of LANGUAGES) {
        const pdfPath = path.join(OUT_DIR, fileName);
        const buffer = await renderToBuffer(React.createElement(CvPdf, { language: code }));
        writeFileSync(pdfPath, buffer);

        const pages = countPdfPages(pdfPath);
        const png = renderPng(pdfPath);
        report.push({
            language: code,
            pdf: path.relative(ROOT, pdfPath),
            pages,
            bytes: buffer.length,
            png: png.ok ? 'ok' : `omitido (${png.reason})`,
        });
    }

    const previewDir = path.relative(ROOT, OUT_DIR);
    console.log(`\nPrevisualizaciones en ${previewDir}/`);
    for (const item of report) {
        console.log(
            `  ${item.language}: ${item.pages} página(s) — ${item.pdf} (${item.bytes} bytes) — PNG: ${item.png}`,
        );
        if (item.pages !== 1) {
            console.log(`  AVISO: ${item.language} no cabe en 1 página A4 (${item.pages}).`);
        }
    }
    const generated = readdirSync(OUT_DIR).filter(name => name.endsWith('.png'));
    if (generated.length === 0) {
        console.log('  (sin PNG: instala poppler-utils para `pdftoppm`)');
    }
    console.log('');
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
