import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
let code = readFileSync("archive/aitch-nyc-base.js", "utf8");
const notice = 'return x.jsxs("div",{style:{color:"#FBF5E5",padding:"28px",textAlign:"center",fontFamily:"sans-serif",lineHeight:1.6},children:[x.jsx("h2",{children:"Reservations coming soon"}),x.jsx("p",{children:"Aitch is opening soon at 418 West 13th Street, NYC. Online reservations are not available yet."}),x.jsx("a",{href:"mailto:info@aitchnyc.com",style:{color:"#E6D1A2",textDecoration:"underline"},children:"info@aitchnyc.com"})]})';
for (const name of ["j3", "uv"]) {
  const pattern = new RegExp(`function ${name}\\(\\)\\{const t=R\\.useRef\\(null\\);return R\\.useEffect\\(.*?\\},\\[\\]\\),x\\.jsx\\("div",\\{ref:t\\}\\)\\}`);
  if (!pattern.test(code)) throw new Error(`Aitch booking component ${name} changed; inspect before patching.`);
  code = code.replace(pattern, `function ${name}(){${notice}}`);
}
const frameStart = code.indexOf('V3=()=>');
const frameEnd = code.indexOf(',Fh=[', frameStart);
if (frameStart < 0 || frameEnd < 0) throw new Error("Aitch table-service component changed.");
code = code.slice(0, frameStart) + 'V3=()=>x.jsxs("main",{style:{background:"black",minHeight:"70vh",paddingTop:"120px"},children:[x.jsx("a",{href:"/aitch/",style:{color:"#E6D1A2",display:"block",textAlign:"center"},children:"Back to Aitch"}),(()=>{'+notice+'})()]})' + code.slice(frameEnd);
const feedStart = code.indexOf('R.useEffect(()=>{async function u(){const{data:h,error:d}=await $T.from("dj_events")');
const feedEnd = code.indexOf('u()},[]);', feedStart);
if (feedStart < 0 || feedEnd < 0) throw new Error("Aitch DJ feed changed.");
code = code.slice(0, feedStart) + 'R.useEffect(()=>{i(!1)},[]);' + code.slice(feedEnd + 'u()},[]);'.length);
// Only change literal URLs and text: never touch SVG numeric geometry.
const replacements = [
  [/https:\/\/www\.opentable\.ca\/r\/aitch-reservations-toronto\?[^"\s]+/g, "/reservations"],
  ["https://www.instagram.com/aitch.to/?hl=en", "https://www.instagram.com/aitchnyc/"],
  ["https://facebook.com/aitch.Toronto", "https://www.instagram.com/aitchnyc/"],
  ["on King West in Toronto", "in NYC’s Meatpacking District"],
  ["on King West, Toronto", "in NYC’s Meatpacking District"],
  ["Below Silent H at 461 King Street West, in Toronto's Entertainment District.", "Next door to Silent H at 418 West 13th Street, New York, NY 10014."],
  ["461 king st. w", "418 west 13th st · nyc"],
  ["+1647 822 5367", "+1 406 284 0019"],
  ["+1 647 822 5367", "+1 406 284 0019"],
  ["aitch@silenth.ca", "info@aitchnyc.com"],
  ["Walk-ins are welcome; larger groups and private bookings are best reserved ahead.", "Reservations are coming soon. Contact info@aitchnyc.com for opening and private-event enquiries."],
  ["Thursday to Sunday from 9pm, with guest DJs.", "Opening soon. Planned hours after opening: Thursday to Sunday from 9pm. Final hours will be confirmed before opening."],
  ['children:"reserve"', 'children:"coming soon"'],
  ['children:"BOOK TABLE SERVICE"', 'children:"RESERVATIONS COMING SOON"'],
  ["Reserve through", "Reservations are coming soon. See"],
  ["Book table service here", "Reservations coming soon"],
  ["and we'll take care of the rest.", "for updates before opening."],
  ["The lounge is invite only with limited spots available.", "The lounge is opening soon. Follow our NYC account"],
  ["for access.", "for opening updates."],
  ["INVITE ONLY - limited spots available", "OPENING SOON IN NYC"],
  ['children:"DM FOR ACCESS"', 'children:"OPENING UPDATES"'],
  ["open Thursday to Sunday", "Thursday to Sunday · after opening"],
  ["open thursday to sunday", "Thursday to Sunday · after opening"],
  ["open thur - sun", "opening soon"],
  ["from 9pm to late", "planned from 9pm"],
  ["Toronto", "NYC"],
  ['children:"DM for access"', 'children:"opening updates"'],
  ["Mezcal vs tequila", "Mexican food and cocktails"],
  ["smoked chesse", "smoked cheese"],
  ["gucamole", "guacamole"],
  ["/blogs/what-is-a-speakeasy", "/blogs/date-night-nyc"],
  ["What is a speakeasy?", "Dinner and drinks in NYC"],
  ["/blogs/mezcal-vs-tequila", "/blogs/best-tacos-nyc"],
  ["Mezcal vs Tequila", "Mexican food and cocktails"],
];
for (const [before, after] of replacements) code = before instanceof RegExp ? code.replace(before, after) : code.split(before).join(after);
if (/opentable\.ca|themrblack|dj_events|461 king|silenth\.ca|Toronto|toronto/.test(code)) throw new Error("Aitch still contains a wrong-location dependency.");
// Aitch's lazy slider imports shared exports from the entry module. Rewrite
// both ends of that cycle so it cannot load the uncorrected app a second time.
const sliderBase = readFileSync("archive/aitch-slider-base.js", "utf8");
const hash = createHash("sha256").update(code + sliderBase).digest("hex").slice(0, 12);
const filename = `index-nyc-${hash}.js`;
const sliderFilename = `slider-nyc-${hash}.js`;
code = code.split("index-Cr2I7om7.js").join(sliderFilename);
const slider = sliderBase.split("index-D8gvWyIt.js").join(filename);
writeFileSync(`public/aitch/assets/${filename}`, code);
writeFileSync(`public/aitch/assets/${sliderFilename}`, slider);
let html = readFileSync("public/aitch/index.html", "utf8");
html = html.replace(/<a[^>]+href="[^"]*happy-hour[^"]*"[^>]*>[^<]*<\/a>\s*/gi, "");
html = html.replace(/(<script type="module"[^>]*src=")[^"]+/, `$1/aitch/assets/${filename}`);
writeFileSync("public/aitch/index.html", html);
for (const route of ["faq", "booking"]) {
  const canonical = `https://www.silenthnyc.com/aitch/${route}`;
  const routeHtml = html.replace(/(<link rel="canonical" href=")[^"]+/, `$1${canonical}`);
  writeFileSync(`public/aitch/${route}/index.html`, routeHtml);
}
console.log(`Aitch NYC bundle: ${filename}`);
