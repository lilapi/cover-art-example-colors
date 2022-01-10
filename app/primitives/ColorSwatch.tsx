import chroma from 'chroma-js';

export function ColorSwatch({ size, fill, text = fill, textColor }: { size: number, fill: string; text?: string; textColor?: string; }): JSX.Element {
  const fillChroma = chroma(fill);
  textColor = textColor ?? (fillChroma.luminance() >= 0.4 ? fillChroma.luminance(0, 'lab') : fillChroma.luminance(1, 'lab')).hex();

  return <svg viewBox="0 0 1 1" width={size} height={size} style={{ display: 'block', margin: 'auto', border: '1px solid black', borderRadius: '0.5rem' }}>
    <rect fill={fill} width={1} height={1} />
    <text y={0.5} x={0.5} dominantBaseline="middle" textAnchor="middle" fontSize={0.15} letterSpacing={0.003} fontWeight='bold' fill={textColor}>{text}</text>
  </svg>
}
