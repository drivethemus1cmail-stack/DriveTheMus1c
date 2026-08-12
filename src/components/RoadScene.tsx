/**
 * Hero road loop: the car carries the wordmark, the road surface is the wordmark
 * repeating, and the exhaust is musical notes. It closes the hero by literally
 * driving the music forward.
 *
 * Decorative — the hero already states the brand twice (3D wordmark, headline),
 * so this is aria-hidden rather than a third announcement of the same words.
 *
 * The source artwork defined a third full copy of the wordmark purely to tint it
 * for the road. Here the two letter paths carry no fill of their own and are
 * recoloured through <use>, so the geometry is declared once and the palette
 * comes from CSS custom properties instead of baked-in hex.
 */

// DRIVE + MUS + C — the letters set in white
const WM_WHITE =
  "M0 21L8 21L8.9 21L9.7 20.9L10.3 20.7L10.9 20.4L11.4 20.1L12 19.7L12.4 19.2L12.8 18.7L13.2 18.1L13.6 17.4L13.9 16.7L14.1 15.9L14.3 15.1L14.5 14.1L14.6 13.1L14.7 12L14.7 10.5L14.7 9L14.6 7.9L14.5 6.9L14.3 5.9L14.1 5.1L13.9 4.3L13.6 3.6L13.2 2.9L12.8 2.3L12.4 1.8L12 1.3L11.4 0.9L10.9 0.6L10.3 0.3L9.7 0.1L8.9 0L8 0L0 0Z M4.6 16.8L8 16.8L8.5 16.8L8.8 16.7L9.2 16.5L9.5 16.3L9.7 16L10 15.6L10.2 15.2L10.4 14.8L10.5 14.3L10.7 13.7L10.8 13L10.9 12.3L10.9 11.5L10.9 10.5L10.9 9.5L10.9 8.7L10.8 8L10.7 7.3L10.5 6.7L10.4 6.2L10.2 5.8L10 5.4L9.7 5L9.5 4.7L9.2 4.5L8.8 4.3L8.5 4.2L8 4.2L4.6 4.2ZM16.3 21L20.9 21L20.9 11.3L25.9 21L30.6 21L27.8 10.8L28.2 10.5L28.6 10.2L29 9.8L29.3 9.4L29.5 8.9L29.8 8.4L29.9 7.8L30 7.3L30.1 6.6L30.1 5.7L30.1 5L30 4.3L29.9 3.8L29.7 3.2L29.5 2.7L29.2 2.3L28.9 1.9L28.5 1.5L28.1 1.1L27.6 0.8L27.1 0.6L26.6 0.4L26 0.2L25.4 0.1L24.7 0L23.8 0L16.3 0Z M20.9 8L23.8 8L24.3 8L24.7 7.9L25.1 7.8L25.4 7.7L25.7 7.5L26 7.3L26.2 7.1L26.3 6.8L26.5 6.6L26.5 6.2L26.6 5.9L26.5 5.5L26.5 5.2L26.3 4.9L26.2 4.7L26 4.4L25.7 4.2L25.4 4.1L25.1 4L24.7 3.9L24.3 3.8L23.8 3.8L20.9 3.8ZM32.1 21L36.8 21L36.8 0L32.1 0ZM38.3 0L42.9 0L45.3 15.5L47.6 0L52.2 0L47.8 21L42.7 21ZM53.8 21L65.9 21L65.9 16.6L58.4 16.6L58.4 12.8L64.3 12.8L64.3 8.4L58.4 8.4L58.4 4.4L65.9 4.4L65.9 0L53.8 0ZM121.6 21L126.2 21L126.2 8.8L130.8 16.8L135.5 8.8L135.5 21L140.1 21L140.1 0L135.5 0L130.8 8.4L126.2 0L121.6 0ZM146.1 0L146.1 12.6L146.1 12.5L146.1 13.1L146.1 13.5L146.2 13.9L146.4 14.4L146.5 14.7L146.7 15.1L146.9 15.4L147.2 15.7L147.4 16L147.7 16.2L147.9 16.3L148.2 16.4L148.5 16.5L148.7 16.6L149 16.6L149.3 16.6L149.5 16.5L149.8 16.4L150 16.3L150.3 16.2L150.6 16L150.8 15.7L151.1 15.4L151.3 15.1L151.5 14.7L151.6 14.4L151.8 13.9L151.9 13.5L151.9 13.1L151.9 12.6L151.9 0L156.3 0L156.3 12.6L156.3 13.4L156.2 14.3L156 15.1L155.8 15.9L155.4 16.7L155 17.4L154.6 18.1L154.1 18.7L153.5 19.3L152.8 19.8L152.1 20.2L151.4 20.5L150.6 20.8L149.8 20.9L149 21L148.2 20.9L147.4 20.8L146.6 20.5L145.9 20.2L145.2 19.8L144.5 19.3L143.9 18.7L143.4 18.1L142.9 17.4L142.6 16.7L142.2 15.9L142 15.1L141.8 14.3L141.7 13.4L141.6 12.7L141.6 12.6L141.6 0ZM167.4 6L167.4 5.7L167.3 5.5L167.3 5.4L167.3 5.3L167.3 5.2L167.2 5.1L167.2 5.1L167.2 5L167.1 5L167.1 4.9L167 4.9L166.9 4.8L166.8 4.8L166.7 4.7L166.6 4.7L166.4 4.6L166.3 4.6L166.1 4.5L165.9 4.5L165.7 4.5L165.5 4.4L165.2 4.4L165 4.4L164.8 4.4L164.5 4.4L164.3 4.4L164.1 4.5L163.9 4.5L163.8 4.5L163.6 4.6L163.5 4.6L163.3 4.7L163.2 4.7L163.1 4.8L163 4.8L162.9 4.9L162.9 4.9L162.8 5L162.8 5.1L162.7 5.1L162.7 5.2L162.6 5.2L162.6 5.3L162.6 5.4L162.6 5.4L162.6 5.5L162.5 5.7L162.5 5.8L162.5 6L162.6 6.1L162.6 6.2L162.6 6.4L162.6 6.5L162.7 6.6L162.7 6.7L162.8 6.8L162.9 6.8L162.9 6.9L163 7L163.1 7.1L163.2 7.2L163.4 7.3L163.5 7.4L163.7 7.6L163.9 7.7L164.1 7.8L164.3 7.9L164.6 8L164.8 8.1L165.1 8.2L165.3 8.3L165.6 8.4L166 8.6L166.3 8.7L166.6 8.8L167 9L167.3 9.1L167.6 9.3L168 9.5L168.3 9.7L168.6 9.9L168.9 10.1L169.2 10.3L169.5 10.6L169.8 10.9L170.1 11.2L170.4 11.5L170.6 11.8L170.8 12.2L171 12.6L171.2 13L171.3 13.4L171.4 13.9L171.5 14.3L171.6 14.8L171.6 15.2L171.6 15.7L171.5 16.1L171.4 16.5L171.3 16.9L171.2 17.3L171 17.7L170.8 18.1L170.6 18.4L170.4 18.7L170.1 19L169.8 19.3L169.5 19.6L169.2 19.8L168.8 20L168.5 20.2L168.1 20.4L167.7 20.5L167.4 20.7L167 20.8L166.6 20.9L166.2 20.9L165.8 21L165.4 21L165 21L164.6 21L164.2 21L163.8 21L163.5 20.9L163.1 20.9L162.7 20.8L162.3 20.7L162 20.6L161.6 20.5L161.2 20.3L160.8 20.1L160.5 19.9L160.1 19.7L159.8 19.4L159.4 19.1L159.1 18.8L158.8 18.4L158.6 18L158.4 17.5L158.2 17.1L158.1 16.6L158 16.1L157.9 15.6L157.9 15.2L162.3 15L162.3 15.3L162.4 15.5L162.4 15.6L162.4 15.7L162.4 15.8L162.5 15.9L162.5 15.9L162.5 16L162.6 16L162.6 16.1L162.7 16.1L162.8 16.2L162.9 16.2L163 16.3L163.1 16.3L163.3 16.4L163.4 16.4L163.6 16.5L163.8 16.5L164 16.5L164.2 16.6L164.5 16.6L164.7 16.6L164.9 16.6L165.2 16.6L165.4 16.6L165.6 16.5L165.8 16.5L165.9 16.5L166.1 16.4L166.2 16.4L166.4 16.3L166.5 16.3L166.6 16.2L166.7 16.2L166.8 16.1L166.8 16.1L166.9 16L166.9 15.9L167 15.9L167 15.8L167.1 15.8L167.1 15.7L167.1 15.6L167.1 15.6L167.1 15.5L167.2 15.3L167.2 15.2L167.2 15L167.1 14.9L167.1 14.8L167.1 14.6L167.1 14.5L167 14.4L167 14.3L166.9 14.2L166.8 14.2L166.8 14.1L166.7 14L166.6 13.9L166.5 13.8L166.3 13.7L166.2 13.6L166 13.4L165.8 13.3L165.6 13.2L165.4 13.1L165.1 13L164.9 12.9L164.6 12.8L164.4 12.7L164.1 12.6L163.7 12.4L163.4 12.3L163.1 12.2L162.7 12L162.4 11.9L162.1 11.7L161.7 11.5L161.4 11.3L161.1 11.1L160.8 10.9L160.5 10.7L160.2 10.4L159.9 10.1L159.6 9.8L159.3 9.5L159.1 9.2L158.9 8.8L158.7 8.4L158.5 8L158.4 7.6L158.3 7.1L158.2 6.7L158.1 6.2L158.1 5.8L158.1 5.3L158.2 4.9L158.3 4.5L158.4 4.1L158.5 3.7L158.7 3.3L158.9 2.9L159.1 2.6L159.3 2.3L159.6 2L159.9 1.7L160.2 1.4L160.5 1.2L160.9 1L161.2 0.8L161.6 0.6L162 0.5L162.3 0.3L162.7 0.2L163.1 0.1L163.5 0.1L163.9 0L164.3 0L164.7 0L165.1 0L165.5 0L165.9 0L166.2 0.1L166.6 0.1L167 0.2L167.4 0.3L167.7 0.4L168.1 0.5L168.5 0.7L168.9 0.9L169.2 1.1L169.6 1.3L169.9 1.6L170.3 1.9L170.6 2.2L170.9 2.6L171.1 3L171.3 3.5L171.5 3.9L171.6 4.4L171.7 4.9L171.8 5.4L171.8 5.8ZM196.2 5.6L195.9 5.2L195.7 4.9L195.5 4.7L195.3 4.6L195.1 4.5L195 4.4L194.8 4.4L194.7 4.4L194.6 4.4L194.5 4.4L194.3 4.4L194.1 4.5L194 4.6L193.7 4.8L193.5 5.1L193.3 5.3L193.1 5.7L192.8 6.1L192.6 6.5L192.5 7L192.3 7.5L192.1 8.1L192 8.7L192 9.3L191.9 9.9L191.9 10.5L191.9 11.1L192 11.7L192 12.3L192.1 12.9L192.3 13.5L192.5 14L192.6 14.5L192.8 14.9L193.1 15.3L193.3 15.7L193.5 15.9L193.7 16.2L194 16.4L194.1 16.5L194.3 16.6L194.5 16.6L194.6 16.6L194.7 16.6L194.8 16.6L195 16.6L195.1 16.5L195.3 16.4L195.5 16.3L195.7 16.1L195.9 15.8L196.2 15.4L199.8 18L199.4 18.5L198.9 19.1L198.3 19.6L197.7 20.1L197.1 20.5L196.4 20.8L195.6 21L194.9 21L194.1 21L193.4 20.9L192.6 20.6L192 20.3L191.3 19.9L190.7 19.4L190.2 18.9L189.7 18.3L189.3 17.6L188.9 16.9L188.6 16.2L188.3 15.5L188 14.7L187.8 13.9L187.7 13L187.6 12.2L187.5 11.4L187.5 10.5L187.5 9.6L187.6 8.8L187.7 8L187.8 7.1L188 6.3L188.3 5.5L188.6 4.8L188.9 4.1L189.3 3.4L189.7 2.7L190.2 2.1L190.7 1.6L191.3 1.1L192 0.7L192.6 0.4L193.4 0.1L194.1 0L194.9 0L195.6 0L196.4 0.2L197.1 0.5L197.7 0.9L198.3 1.4L198.9 1.9L199.4 2.5L199.8 3Z";

// THE + the numeral 1 — the letters set in gold
const WM_GOLD =
  "M76.4 21L81.1 21L81.1 4.4L85.7 4.4L85.7 0L71.8 0L71.8 4.4L76.4 4.4ZM87.3 21L91.9 21L91.9 12.8L97.3 12.8L97.3 21L102 21L102 0L97.3 0L97.3 8.4L91.9 8.4L91.9 0L87.3 0ZM103.5 21L115.7 21L115.7 16.6L108.2 16.6L108.2 12.8L114 12.8L114 8.4L108.2 8.4L108.2 4.4L115.7 4.4L115.7 0L103.5 0ZM174.4 21L184.9 21L184.9 16.8L182 16.8L182 0L177.8 0L174.4 2.9L174.4 7.1L177.3 4.6L177.3 16.8L174.4 16.8Z";

const CAR_BODY =
  "M322 118L338 72L390 84L478 42L614 40L682 78L856 88L880 116L880 148L872 172L822.1 172L825.9 164.7L828.6 156.9L829.9 148.8L829.8 140.6L828.4 132.5L825.7 124.7L821.8 117.5L816.7 111L810.6 105.5L803.7 101L796.2 97.7L788.2 95.7L780 95L771.8 95.7L763.8 97.7L756.3 101L749.4 105.5L743.3 111L738.2 117.5L734.3 124.7L731.6 132.5L730.2 140.6L730.1 148.8L731.4 156.9L734.1 164.7L737.9 172L462.1 172L465.9 164.7L468.6 156.9L469.9 148.8L469.8 140.6L468.4 132.5L465.7 124.7L461.8 117.5L456.7 111L450.6 105.5L443.7 101L436.2 97.7L428.2 95.7L420 95L411.8 95.7L403.8 97.7L396.3 101L389.4 105.5L383.3 111L378.2 117.5L374.3 124.7L371.6 132.5L370.2 140.6L370.1 148.8L371.4 156.9L374.1 164.7L377.9 172L330 172Z";

/** Road surface tiles, one wordmark repeat every 180 units. */
const STRIP_OFFSETS = [-180, 0, 180, 360, 540, 720, 900, 1080, 1260, 1440];

const EXHAUST = [
  { x: 308, y: 120, note: 1, delay: "rd-d1", settle: "s1", variant: "" },
  { x: 290, y: 104, note: 2, delay: "rd-d2", settle: "s2", variant: " b" },
  { x: 320, y: 134, note: 1, delay: "rd-d3", settle: "s3", variant: "" },
  { x: 278, y: 114, note: 2, delay: "rd-d4", settle: "s4", variant: " b" },
  { x: 298, y: 94, note: 1, delay: "rd-d5", settle: "s5", variant: "" },
];

function Wheel({ cx }: { cx: number }) {
  return (
    <g className="rd-wheel">
      <circle cx={cx} cy="145" r="40" />
      <circle cx={cx} cy="145" r="11" strokeWidth="3.5" />
      <path
        strokeWidth="3.5"
        d={`M${cx} 133L${cx} 113M${cx + 11.4} 141.3L${cx + 30.4} 135.1M${cx + 7.1} 154.7L${cx + 18.8} 170.9M${cx - 7.1} 154.7L${cx - 18.8} 170.9M${cx - 11.4} 141.3L${cx - 30.4} 135.1`}
      />
    </g>
  );
}

export default function RoadScene({ className = "" }: { className?: string }) {
  return (
    <div className={`dtm-road ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1400 220"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        focusable="false"
      >
        <defs>
          {/* No fill on the letter paths, so <use> can recolour them per context */}
          <path id="rd-wm-w" fillRule="evenodd" d={WM_WHITE} />
          <path id="rd-wm-g" fillRule="evenodd" d={WM_GOLD} />

          {/* One road tile: the same letters, dimmed to asphalt */}
          <g id="rd-wm-tile">
            <g transform="scale(0.619)" className="rd-tile">
              <use href="#rd-wm-w" />
              <use href="#rd-wm-g" />
            </g>
          </g>

          <g id="rd-note-1" className="rd-note-ink" strokeWidth="2.6" strokeLinecap="round">
            <ellipse rx="5.4" ry="4.1" transform="rotate(-20)" />
            <path fill="none" d="M5.3 -1.6V-22" />
            <path fill="none" d="M5.3 -22c6.4 1.9 8.4 6.4 6.9 11.6" />
          </g>
          <g id="rd-note-2" className="rd-note-ink" strokeWidth="2.6" strokeLinecap="round">
            <ellipse rx="5.2" ry="3.9" transform="rotate(-20)" />
            <ellipse cx="17" cy="-4" rx="5.2" ry="3.9" transform="rotate(-20 17 -4)" />
            <path fill="none" d="M5.1 -1.6V-23.5M22.1 -5.6V-26M5.1 -23.5 22.1 -26" />
          </g>
        </defs>

        {/* Road: solid edge, scrolling centre dashes, wordmark surface */}
        <path className="rd-edge" d="M0 185H1400" strokeWidth="3.5" />
        <path className="rd-edge rd-dash" d="M0 190H1400" strokeWidth="3" strokeDasharray="42 21" />
        <g className="rd-strip">
          {STRIP_OFFSETS.map((x) => (
            <use key={x} href="#rd-wm-tile" x={x} y="198" />
          ))}
        </g>

        {/* Car */}
        <g className="rd-car" fill="none" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          <g className="rd-body">
            <path d={CAR_BODY} />
            <path d="M394 82L480 45L610 43L674 76Z" opacity=".55" />
            <path d="M540 44L540 77" opacity=".5" strokeWidth="3.5" />
            {/* Wordmark on the door, raked to follow the body line */}
            <g transform="translate(600 120.5) skewX(-8) translate(-600 -120.5)" stroke="none">
              <use href="#rd-wm-w" className="rd-door-w" x="499.1" y="110" />
              <use href="#rd-wm-g" className="rd-door-g" x="499.1" y="110" />
              <rect className="rd-rule" x="499.1" y="136" width="201.8" height="3" />
              <rect className="rd-rule" x="499.1" y="143" width="125.1" height="2" opacity=".55" />
            </g>
          </g>
          <Wheel cx={420} />
          <Wheel cx={780} />
        </g>

        {/* Exhaust, as notes */}
        {EXHAUST.map((n) => (
          <g key={`${n.x}-${n.y}`} transform={`translate(${n.x} ${n.y})`}>
            <g className={`rd-nt${n.variant} ${n.delay} ${n.settle}`}>
              <use href={`#rd-note-${n.note}`} />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
