// Replace content here; put local media files in public/media and use /media/name.mp4.
export const portfolio = {
  name: '금나현', role: 'Video Editor & Motion Designer',
  headline: '아이디어는 자유롭게, 마감은 정확하게.',
  showreel: { src: '', poster: '' },
  about: 'ABOUT TEXT PLACEHOLDER', profile: '',
  contacts: [
    { label: 'EMAIL', text: 'Email placeholder', href: '' },
    { label: 'INSTAGRAM', text: 'Instagram placeholder', href: '' },
    { label: 'RESUME', text: 'Resume PDF placeholder', href: '' },
    { label: 'PORTFOLIO', text: 'Portfolio PDF placeholder', href: '' },
  ],
}
const makeProject = (id, category, content = {}) => ({
  id, year: '2026', title: `Project Title ${id}`,
  category, roles: ['Editing', 'Motion', 'Color'], tools: ['TOOLS PLACEHOLDER'],
  duration: 'DURATION PLACEHOLDER', type: 'TYPE PLACEHOLDER',
  contribution: 'CONTRIBUTION PLACEHOLDER', description: '프로젝트 한 줄 설명 PLACEHOLDER',
  overview: '프로젝트 목적과 방향 PLACEHOLDER', thumbnail: '', video: '',
  contributions: ['Editing', 'Motion', 'Color'].map(title => ({ title, text: '내가 수행한 역할과 기여도 PLACEHOLDER' })),
  process: ['PLAN', 'EDIT', 'FINISH'].map(title => ({ title, text: 'PROCESS TEXT PLACEHOLDER', image: '' })),
  breakdownVideo: '', keyFrames: Array.from({ length: 6 }, (_, i) => ({ src: '', alt: `Key frame ${i + 1}` })),
  result: '결과 및 회고 PLACEHOLDER', resultImage: '',
  ...content,
})
// Each third argument overrides just this project's fields. All content stays in this file.
export const projects = [
  makeProject('01', 'Brand Film', {}),
  makeProject('02', 'Motion', {}),
  makeProject('03', 'Short Form', {}),
  makeProject('04', 'Brand Film', {}),
  makeProject('05', 'Motion', {}),
  makeProject('06', 'Short Form', {}),
]
export const getProject = id => projects.find(project => project.id === id)
