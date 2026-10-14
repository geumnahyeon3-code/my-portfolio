# 금나현 Aqua Tech Portfolio

React 없이 HTML, CSS, JavaScript 모듈로 만든 영상편집자·모션디자이너 포트폴리오입니다. Vite는 개발 서버와 정적 파일 빌드에만 사용합니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 터미널에 표시된 주소를 엽니다. 배포용 파일은 `npm run build`로 `dist/`에 생성됩니다.

## 작품 바꾸기

프로젝트 목록과 상세 정보는 `data/projects.js`에서 관리합니다. 실제 영상은 `public/media/`에 넣고 각 항목의 `video`, `thumbnail`, `keyFrames` 경로를 지정하면 됩니다. 연락처와 프로필은 같은 파일의 `portfolio` 객체에서 수정할 수 있습니다.

## 주요 파일

- `index.html`: 문서 진입점
- `style.css`: 전체 디자인과 responsive 스타일
- `app.js`: Home, 프로젝트 상세 화면 렌더링과 필터·영상 안내 상호작용
- `data/projects.js`: 작품 및 포트폴리오 데이터
- `public/assets/`: 데모 썸네일과 Y2K 액세서리 이미지
