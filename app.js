import { portfolio, projects, getProject } from "./data/projects.js";

const app = document.querySelector("#app");
const crops = {
  camera: [24, 60, 512, 450],
  phone: [620, 20, 330, 490],
  disc: [1060, 60, 450, 450],
  star: [30, 515, 460, 450],
  heart: [550, 560, 455, 410],
  chain: [1030, 660, 495, 230],
};

const esc = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );

function decoration(kind = "star", className = "") {
  const [x, y, w, h] = crops[kind];
  const assetRoot = new URL("../", import.meta.url).pathname;
  src = "${assetRoot}assets/chrome-accessories-v3.png";
  return `<span aria-hidden="true" class="decoration decoration-${kind} ${className}" style="aspect-ratio:${w}/${h}"><img src="/assets/chrome-accessories-v3.png" alt="" draggable="false" style="width:${(1536 / w) * 100}%;left:${(-x / w) * 100}%;top:${(-y / h) * 100}%"></span>`;
}

const sparkle = (className = "") =>
  `<span aria-hidden="true" class="sparkle ${className}"></span>`;

function mediaImage({
  src = "",
  alt = "",
  index = 0,
  className = "",
  label = true,
} = {}) {
  const n = ((index % 6) + 6) % 6;
  if (src)
    return `<div class="media-image real-media ${className}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy"></div>`;
  return `<div class="media-image demo-media ${className}"><div class="demo-tile" role="img" aria-label="${esc(alt || "교체용 이미지")} — AI 생성 데모" style="background-position:${(n % 3) * 50}% ${Math.floor(n / 3) * 100}%"></div>${label ? '<span class="demo-label">DEMO / 교체용 이미지</span>' : ""}</div>`;
}

function videoPlaceholder({
  label = "SHOWREEL",
  src = "",
  poster = "",
  index = 0,
  playerId = "",
} = {}) {
  const inner = src
    ? `<video src="${esc(src)}" ${poster ? `poster="${esc(poster)}"` : ""} controls preload="metadata" aria-label="${esc(label)}"></video>`
    : `${mediaImage({ src: poster, alt: label, index })}<span class="video-caption">${esc(label)}<small>VIDEO PLACEHOLDER</small></span><button class="play-button" type="button" aria-label="${esc(label)} 재생 안내"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3 17 10 6 17Z" fill="currentColor"/></svg></button><div class="player-controls" aria-hidden="true"><span>▶</span><span>00:00 / —:—</span><i></i><span>16:9</span><span>⌗</span></div>`;
  return `<div class="video-shell" ${playerId ? `id="${esc(playerId)}"` : ""}><div class="video-surface">${inner}</div><div class="frame-screw screw-left" aria-hidden="true"></div><div class="frame-screw screw-right" aria-hidden="true"></div></div>`;
}

function sectionHeading(title, number, note = "", trailing = "") {
  return `<div class="section-heading"><div class="heading-line"><h2>${esc(title)}</h2><span class="section-number">(${esc(number)})</span>${note ? `<span class="handwritten">${esc(note)}</span>` : ""}</div>${trailing}</div>`;
}

function header() {
  return `<header class="site-header shell"><a class="brand" href="/" aria-label="금나현 포트폴리오 홈">GEUM NAHYEON<span>VIDEO / MOTION</span></a><nav aria-label="주 메뉴"><a href="/#work">WORK</a><a href="/#about">ABOUT</a><a href="/#contact">CONTACT</a></nav><span class="header-edition">PORTFOLIO / 2026${sparkle()}</span></header>`;
}

function projectCard(p) {
  return `<a class="project-card" data-treatment="${Number(p.id) % 3}" href="/project/${esc(p.id)}" aria-label="${esc(p.title)} 상세 보기"><div class="card-filebar"><span>FILE_${esc(p.id)}.MOV</span><span>${esc(p.year)} / HD</span></div><div class="card-image">${mediaImage({ src: p.thumbnail, alt: p.title, index: Number(p.id) - 1 })}<span class="card-play" aria-hidden="true">▶</span></div><div class="card-info"><span class="chrome-badge">${esc(p.id)}</span><div><span class="card-category">${esc(p.category)}</span><h3>${esc(p.title)}</h3></div><span class="card-arrow" aria-hidden="true">↗</span></div><div class="tags">${p.roles.map((role) => `<span>${esc(role)}</span>`).join("")}</div>${sparkle("card-sparkle")}</a>`;
}

function hero() {
  return `<section class="hero shell" aria-labelledby="hero-title"><div class="hero-system"><span><i></i> PERSONAL MEDIA ARCHIVE</span><span>VOL. 01 — PORTFOLIO 2026</span><span>MODE / EDIT</span></div><h1 id="hero-title" class="hero-display"><span>GEUM</span><span>NAHYEON<span class="name-period">.</span></span></h1>${decoration("star", "hero-star-large")}${decoration("heart", "hero-heart")}<div class="hero-copy"><span class="eyebrow">금나현 / IDEAS INTO FRAMES</span><h2>VIDEO EDITOR<br><span>&amp; MOTION DESIGNER</span></h2><p class="hero-korean">아이디어는 자유롭게,<br>마감은 정확하게.</p><div class="hero-actions"><a href="#work" class="btn">VIEW WORK</a><a href="#showreel" class="btn btn-glass">PLAY SHOWREEL</a></div><p class="handwritten hero-memo">edit / play / repeat ♡</p>${sparkle("hero-sparkle-one")}${sparkle("hero-sparkle-two")}</div><div class="hero-media"><div class="media-topline"><span>◉ REEL_001.MOV</span><span>— □ ×</span></div>${videoPlaceholder({ label: "SHOWREEL 2026", src: portfolio.showreel.src, poster: portfolio.showreel.poster, playerId: "showreel" })}<div class="timeline-strip"><span>V1</span><i></i><i></i><i></i><i></i><i></i><span>00:01:24</span></div>${decoration("camera", "hero-camera")}${decoration("star", "hero-star-bottom")}${sparkle("hero-sparkle-three")}</div><div class="hero-bottom"><span>SCROLL TO EXPLORE ↓</span><span class="hero-barcode" aria-hidden="true"></span><span>INPUT: IDEAS / OUTPUT: MOTION</span></div></section>`;
}

function selectedWork() {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  return `<section id="work" class="work-section shell">${sectionHeading("SELECTED WORK", "01", "a collection of my works ♡", `<span class="micro">${String(projects.length).padStart(2, "0")} PROJECTS</span>`)}<div class="work-filter-row"><p class="placeholder-notice">임시 이미지로 구성된 작품 영역입니다.</p><div class="filters" role="group" aria-label="작품 카테고리">${categories.map((c, i) => `<button type="button" data-filter="${esc(c)}" class="${i === 0 ? "active" : ""}" aria-pressed="${i === 0}">${esc(c.toUpperCase())}</button>`).join("")}</div></div><div class="project-grid">${projects.map(projectCard).join("")}</div>${decoration("star", "work-star")}${sparkle("work-sparkle")}<span class="row-metal row-metal-one" aria-hidden="true"></span><span class="row-metal row-metal-two" aria-hidden="true"></span></section>`;
}

function featuredProject() {
  const p = projects[0];
  return `<section class="featured-section shell">${sectionHeading("FEATURED PROJECT", "02", "main project ♡")}<div class="featured-grid">${videoPlaceholder({ label: "FEATURED PROJECT", src: p.video, poster: p.thumbnail, index: 3 })}<div class="featured-copy"><span class="eyebrow">${esc(p.category)} / ${esc(p.year)} / FILE ${esc(p.id)}</span><h3>${esc(p.title)}</h3><p class="overview-text">${esc(p.overview)}</p><div class="contribution-callout"><span>MY CONTRIBUTION</span><strong>${esc(p.contribution)}</strong></div><dl class="metadata-list">${[
    ["ROLE", p.roles.join(" / ")],
    ["TOOLS", p.tools.join(" / ")],
    ["DURATION", p.duration],
  ]
    .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
    .join(
      "",
    )}</dl><a class="btn btn-glass" href="/project/${esc(p.id)}">VIEW PROJECT <span>↗</span></a></div></div>${decoration("disc", "featured-disc")}${decoration("star", "featured-star")}${sparkle("featured-sparkle")}</section>`;
}

function about() {
  return `<section id="about" class="about-section shell">${sectionHeading("ABOUT", "03")}<div class="about-grid"><div class="polaroid-wrap"><div class="polaroid"><div class="profile-image">${portfolio.profile ? `<img src="${esc(portfolio.profile)}" alt="${esc(portfolio.name)}">` : '<span class="profile-monogram">NH</span><span>PROFILE IMAGE<br>PLACEHOLDER</span>'}</div><span class="handwritten">Geum Nahyeon ♡</span></div>${decoration("heart", "about-heart")}${decoration("star", "about-star")}<span class="handwritten profile-memo">behind<br>the edit</span></div><div class="about-copy"><span class="eyebrow">${esc(portfolio.name)} / ${esc(portfolio.role)}</span><h3>아이디어는 자유롭게,<br>마감은 정확하게.</h3><p class="about-placeholder">${esc(portfolio.about)}</p><div class="about-status"><span>INPUT / IDEAS</span><span>OUTPUT / MOTION</span></div><span class="micro">CAPABILITIES</span><div class="tags skills">${["Video Editing", "Motion Graphic", "Color Grading", "Visual Storytelling"].map((s) => `<span>${s}</span>`).join("")}</div><div class="software-list">${["Premiere Pro", "After Effects", "Photoshop", "Illustrator"].map((s, i) => `<span><b>${["Pr", "Ae", "Ps", "Ai"][i]}</b>${s}</span>`).join("")}</div></div></div></section>`;
}

function contact() {
  const marks = { EMAIL: "✉", INSTAGRAM: "◎", RESUME: "↓", PORTFOLIO: "↗" };
  return `<section id="contact" class="contact-section shell">${sectionHeading("CONTACT", "04", "let’s create something together ♡")}<h3 class="contact-headline">LET’S MAKE<br><span>SOMETHING</span><br>MOVE.</h3><div class="contact-grid">${portfolio.contacts
    .map((c) => {
      const tag = c.href ? "a" : "div";
      return `<${tag} ${c.href ? `href="${esc(c.href)}"` : ""} class="contact-item"><span class="contact-icon" aria-hidden="true">${marks[c.label] || "↗"}</span><div><span>${esc(c.label)}</span><strong>${esc(c.text)}</strong></div><small>${c.href ? "↗" : "준비 중"}</small></${tag}>`;
    })
    .join(
      "",
    )}</div><div class="contact-signature"><p class="signature-text">END OF TIMELINE.<br>START OF SOMETHING NEW.</p>${decoration("phone", "contact-phone")}${decoration("chain", "contact-chain")}${decoration("heart", "contact-heart")}</div></section>`;
}

function footer(detail = false) {
  return `<footer class="site-footer shell"><span>© 2026 GEUM NAHYEON</span>${detail ? '<a href="/#work">BACK TO WORK ↑</a>' : '<span>VIDEO EDITOR &amp; MOTION DESIGNER</span><a href="#">BACK TO TOP ↑</a>'}</footer>`;
}

function homePage() {
  return `<div class="site-page">${header()}<main>${hero()}<div class="motion-ticker" aria-hidden="true"><div>${Array.from({ length: 4 }, () => "<span>CUT. CREATE. REPEAT. <b>✦</b> IDEAS INTO MOTION <b>✦</b> </span>").join("")}</div></div>${selectedWork()}${featuredProject()}${about()}${contact()}</main>${footer()}</div>`;
}

function detailPage(p) {
  const index = projects.findIndex((x) => x.id === p.id);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return `<div class="site-page detail-page">${header()}<main class="detail-main shell"><a class="back-link" href="/#work">← ALL WORK</a><section class="detail-hero"><div class="detail-title"><div><span class="eyebrow">PROJECT ${esc(p.id)} / ${esc(p.category)} / ${esc(p.year)}</span><h1>${esc(p.title)}</h1></div><p>${esc(p.description)}<span class="detail-role">${p.roles.map(esc).join(" / ")}</span></p></div>${videoPlaceholder({ label: "PROJECT FILM", src: p.video, poster: p.thumbnail, index })}</section><section class="detail-info">${sectionHeading("PROJECT INFO", "01")}<dl>${[
    ["ROLE", p.roles.join(" / ")],
    ["TOOLS", p.tools.join(" / ")],
    ["DURATION", p.duration],
    ["CONTRIBUTION", p.contribution],
    ["TYPE", p.type],
  ]
    .map(
      ([k, v]) =>
        `<div class="${k === "CONTRIBUTION" ? "info-contribution" : ""}"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`,
    )
    .join(
      "",
    )}</dl></section><section class="detail-overview"><div>${sectionHeading("OVERVIEW", "02")}<p>${esc(p.overview)}</p></div>${mediaImage({ src: p.keyFrames[0]?.src, alt: "Overview visual placeholder", index: 2 })}</section><section class="detail-contribution">${sectionHeading("MY CONTRIBUTION", "03")}<div class="contribution-layout"><div class="contribution-text">${p.contributions.map((c, i) => `<article><span class="micro">0${i + 1} / ${esc(c.title)}</span><p>${esc(c.text)}</p></article>`).join("")}</div>${mediaImage({ src: p.keyFrames[1]?.src, alt: "Contribution visual placeholder", index })}</div></section><section class="detail-process">${sectionHeading("PROCESS / BREAKDOWN", "04")}<div class="process-grid">${p.process.map((s, i) => `<article><span class="process-step">0${i + 1}<i></i></span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>${mediaImage({ src: s.image, alt: `${s.title} image placeholder`, index: i + 3 })}</article>`).join("")}</div>${videoPlaceholder({ label: "BREAKDOWN", src: p.breakdownVideo, index: 4 })}</section><section class="detail-keyframes">${sectionHeading("KEY FRAMES", "05")}<div class="keyframe-grid">${p.keyFrames.map((f, i) => `<figure>${mediaImage({ src: f.src, alt: f.alt, index: i })}<figcaption>${String(i + 1).padStart(2, "0")} / ${esc(f.alt)}</figcaption></figure>`).join("")}</div></section><section class="detail-result">${sectionHeading("RESULT", "06")}<p>${esc(p.result)}</p>${mediaImage({ src: p.resultImage, alt: "Result visual placeholder", index: 5 })}</section><section class="detail-next">${sectionHeading("NEXT PROJECT", "07")}<div class="next-layout"><a class="next-image" href="/project/${esc(next.id)}" aria-label="다음 프로젝트 ${esc(next.title)}">${mediaImage({ src: next.thumbnail, alt: next.title, index: Number(next.id) - 1 })}<span>↗</span></a><div><span class="eyebrow">${esc(next.category)}</span><h3>${esc(next.title)}</h3><a class="btn btn-glass" href="/project/${esc(next.id)}">NEXT PROJECT →</a><a class="previous-link" href="/project/${esc(previous.id)}">← PREVIOUS PROJECT</a></div></div></section></main>${footer(true)}</div>`;
}

const match = location.pathname.match(/^\/project\/([^/]+)\/?$/);
if (match) {
  const p = getProject(decodeURIComponent(match[1]));
  if (p) app.innerHTML = detailPage(p);
  else {
    app.innerHTML = `<div class="site-page">${header()}<main class="not-found shell"><span class="eyebrow">404 / NOT FOUND</span><h1>프로젝트를 찾을 수 없습니다.</h1><a class="btn btn-primary" href="/#work">작품 목록으로 돌아가기 ↗</a></main></div>`;
  }
} else if (location.pathname === "/" || location.pathname === "/index.html") {
  app.innerHTML = homePage();
} else {
  app.innerHTML = `<div class="site-page">${header()}<main class="not-found shell"><span class="eyebrow">404 / NOT FOUND</span><h1>페이지를 찾을 수 없습니다.</h1><a class="btn btn-primary" href="/">포트폴리오로 돌아가기 ↗</a></main></div>`;
}

if (match && getProject(decodeURIComponent(match[1])))
  document.title = `${getProject(decodeURIComponent(match[1])).title} — 금나현`;

document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    const visible =
      category === "All"
        ? projects
        : projects.filter((p) => p.category === category);
    const grid = document.querySelector(".project-grid");
    if (grid) grid.innerHTML = visible.map(projectCard).join("");
  }),
);

document.querySelectorAll(".play-button").forEach((button) =>
  button.addEventListener("click", () => {
    const label =
      button.getAttribute("aria-label")?.replace(" 재생 안내", "") || "VIDEO";
    const dialog = document.createElement("dialog");
    dialog.className = "media-dialog";
    dialog.innerHTML = `<span class="micro">${esc(label)}</span><h2>영상을 준비하고 있어요.</h2><p>현재 이미지는 디자인 확인용 데모입니다.<br>실제 작업물이 추가되면 이 자리에서 재생됩니다.</p><button class="btn" type="button">닫기 <span>×</span></button>`;
    document.body.append(dialog);
    dialog
      .querySelector("button")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => dialog.remove(), { once: true });
    dialog.showModal();
  }),
);

const revealTargets = document.querySelectorAll(
  "main > section, main > .section-shell",
);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.05 },
  );
  revealTargets.forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
  });
} else revealTargets.forEach((section) => section.classList.add("is-visible"));

if (location.hash)
  requestAnimationFrame(() =>
    document.querySelector(location.hash)?.scrollIntoView(),
  );
