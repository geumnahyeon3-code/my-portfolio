import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { portfolio, projects, getProject } from '../data/projects.js'

const [html, app, css] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../app.js', import.meta.url), 'utf8'),
  readFile(new URL('../style.css', import.meta.url), 'utf8'),
])

assert.match(html, /\/app\.js/)
assert.match(html, /\/style\.css/)
assert.equal(projects.length, 6)
assert.equal(new Set(projects.map(project => project.id)).size, 6)
assert.equal(getProject('invalid'), undefined)
assert.equal(portfolio.contacts.length, 4)
for (const project of projects) {
  assert.ok(project.roles.length && project.tools.length && project.contribution && project.year)
  assert.equal(project.keyFrames.length, 6)
}
for (const section of ['SELECTED WORK', 'FEATURED PROJECT', 'ABOUT', 'CONTACT', 'PROJECT INFO', 'MY CONTRIBUTION', 'PROCESS / BREAKDOWN', 'KEY FRAMES', 'NEXT PROJECT']) {
  assert.ok(app.includes(section), `missing section: ${section}`)
}
assert.match(app, /data-filter/)
assert.match(css, /\.project-card:hover/)
assert.match(css, /\.video-shell/)
console.log('PASS: vanilla entry point, portfolio sections, six project records, detail template, and interaction hooks.')
