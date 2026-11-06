#!/usr/bin/env bash
# Gera as fontes do site (decisão T2) a partir do repositório oficial google/fonts.
#
# Uso:   scripts/build-fonts.sh <checkout-do-google/fonts>
# Fonte: https://github.com/google/fonts (pastas ofl/manrope, ofl/inter, ofl/jetbrainsmono)
# Requer (fora do projeto, só para gerar): Python com fonttools 4.68.0 e brotli 1.2.1.
#
# O que faz, para cada família e peso da especificação (DESIGN-SPEC §4):
#   1. fixa o peso da fonte variável (varLib.instancer);
#   2. mantém só os caracteres "latin" e "latin-ext", nos mesmos intervalos do Google Fonts;
#   3. salva em WOFF2 e copia a licença OFL da família.
# O site nunca executa este script: os arquivos gerados ficam versionados em assets/fonts/.
set -euo pipefail

SRC="${1:?informe o caminho do checkout de google/fonts}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/assets/fonts"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Intervalos "latin" + "latin-ext" do Google Fonts (CSS API, consultada em 2026-11-06).
LATIN="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
LATIN_EXT="U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF"

# build <arquivo variável> <eixos> <pasta de saída> <nome do arquivo>
build() {
  local static="$TMP/$4.ttf"
  fonttools varLib.instancer "$1" $2 --quiet --output "$static"
  pyftsubset "$static" \
    --unicodes="$LATIN,$LATIN_EXT" \
    --layout-features='*' \
    --flavor=woff2 \
    --output-file="$OUT/$3/$4.woff2"
}

mkdir -p "$OUT/manrope" "$OUT/inter" "$OUT/jetbrains-mono"

build "$SRC/ofl/manrope/Manrope[wght].ttf" "wght=500" manrope Manrope-500
build "$SRC/ofl/manrope/Manrope[wght].ttf" "wght=600" manrope Manrope-600
# Inter tem eixo de tamanho óptico: 14 é o padrão da fonte, desenhado para texto.
build "$SRC/ofl/inter/Inter[opsz,wght].ttf" "opsz=14 wght=400" inter Inter-400
build "$SRC/ofl/inter/Inter[opsz,wght].ttf" "opsz=14 wght=500" inter Inter-500
build "$SRC/ofl/jetbrainsmono/JetBrainsMono[wght].ttf" "wght=400" jetbrains-mono JetBrainsMono-400

cp "$SRC/ofl/manrope/OFL.txt" "$OUT/manrope/OFL.txt"
cp "$SRC/ofl/inter/OFL.txt" "$OUT/inter/OFL.txt"
cp "$SRC/ofl/jetbrainsmono/OFL.txt" "$OUT/jetbrains-mono/OFL.txt"

echo "Fontes geradas em $OUT"
