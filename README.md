# 🏋️ 피트니스 기록 애플리케이션

이 프로젝트는 Next.js App Router로 구축된 풀스택 웹 애플리케이션으로, 사용자가 피트니스 프로그램과 운동 기록을 추적하고 관리할 수 있도록 설계되었습니다.

## ✨ 주요 기능

- 사용자 인증 (로그인/로그아웃)
- 프로그램 생성 및 관리
- 운동 기록 추적
- 커뮤니티 기능 (예: 게시물 작성)
- 사용자 프로필 관리

## 🚀 사용 기술 스택

이 프로젝트는 최신 웹 개발 스택을 활용합니다:

- **프레임워크**: [Next.js](https://nextjs.org/) (App Router)
- **언어**: [TypeScript](https://www.typescriptlang.org/)
- **프론트엔드**: [React](https://react.dev/)
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
- **데이터베이스 ORM**: [Prisma](https://www.prisma.io/)
- **데이터베이스**: PostgreSQL (Prisma 설정에서 유추)
- **데이터 페칭/상태 관리**: [Tanstack Query](https://tanstack.com/query/latest)
- **유효성 검사**: [Zod](https://zod.dev/)
- **테스팅**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/react)

## ⚙️ 로컬 개발 환경 설정

로컬 머신에서 프로젝트를 설정하고 실행하려면 다음 단계를 따르세요.

### 필수 조건

- Node.js (v18.x 이상)
- npm (v8.x 이상) 또는 Yarn / pnpm / Bun
- PostgreSQL 데이터베이스 인스턴스 (또는 Prisma와 호환되는 다른 데이터베이스)

### 설치

1.  **저장소 복제:**

    ```bash
    git clone <저장소-URL>
    cd fitness
    ```

2.  **의존성 설치:**

    ```bash
    npm install
    # 또는 yarn install
    # 또는 pnpm install
    # 또는 bun install
    ```

3.  **환경 변수 설정:**
    루트 디렉토리에 `.env` 파일을 생성하고 `.env.example` (있는 경우) 또는 필요한 변수를 기반으로 설정합니다.

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/fitnessdb"
    NEXTAUTH_SECRET="your_nextauth_secret"
    NEXTAUTH_URL="http://localhost:3000"
    # 기타 필요한 환경 변수 추가 (예: OAuth 자격 증명)
    ```

4.  **데이터베이스 설정:**
    Prisma 마이그레이션을 실행하여 데이터베이스 스키마를 생성합니다.

    ```bash
    npx prisma migrate dev --name init
    ```

5.  **개발 서버 시작:**

    ```bash
    npm run dev
    ```

    브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 📜 사용 가능한 스크립트

프로젝트 디렉토리에서 다음 스크립트를 실행할 수 있습니다:

- `npm run dev`: Turbopack으로 개발 서버를 시작합니다.
- `npm run db`: Prisma 개발 명령을 실행합니다 (예: `npx prisma dev`).
- `npm run build`: 프로덕션용 애플리케이션을 빌드합니다.
- `npm run start`: 프로덕션 서버를 시작합니다.
- `npm run lint`: ESLint를 실행하여 코드 스타일 문제를 확인합니다.
- `npm run lint:fix`: ESLint를 실행하고 수정 가능한 문제를 자동으로 수정합니다.
- `npm run format`: Prettier를 사용하여 코드를 포맷합니다.
- `npm test`: Jest 테스트를 실행합니다.

## 📁 프로젝트 구조

```
.next/             # Next.js 빌드 결과물
app/              # App Router 라우트, 페이지, 레이아웃 및 API 라우트
├── (auth)/       # 인증 관련 라우트 (로그인, 관리자)
├── (home)/       # 주요 애플리케이션 라우트 (대시보드, 커뮤니티, 프로필, 프로그램)
├── (workout)/    # 운동 기록 라우트
└── api/          # 백엔드 API 라우트
components/       # 재사용 가능한 React 컴포넌트
├── features/     # 기능별 컴포넌트 (예: 인증, 커뮤니티, 프로그램)
├── modal/        # 모달 컴포넌트
└── ui/           # 일반 UI 컴포넌트 (shadcn/ui 기반)
hooks/            # 커스텀 React 훅
lib/              # 유틸리티 함수, 서버 측 로직, 데이터베이스 설정, 인증 로직
├── auth/         # 인증 관련 유틸리티
├── db.ts         # Prisma 클라이언트 인스턴스
├── programs/     # 프로그램 관련 서버 로직 및 스키마
└── utils.ts      # 일반 유틸리티 함수
prisma/           # Prisma 스키마 및 마이그레이션
public/           # 정적 자산 (폰트, 이미지)
provider/         # React Context 프로바이더 (예: Tanstack Query, 모달)
types/            # TypeScript 타입 정의
```

## 🧪 테스팅

이 프로젝트는 테스팅을 위해 [Jest](https://jestjs.io/)와 [React Testing Library](https://testing-library.com/react)를 사용합니다.

- **단위 테스트**: 테스트 대상 코드와 함께 위치합니다 (예: `lib/utils.test.ts`, `hooks/use-mobile.test.ts`).
- **통합 테스트**: API 라우트의 경우 라우트 파일 옆에 위치합니다 (예: `app/api/program/route.test.ts`).

모든 테스트를 실행하려면:

```bash
npm test
```

## 🤝 기여하기

기여를 환영합니다! 이슈를 열거나 풀 리퀘스트를 제출해주세요.

## 📄 라이선스

[MIT](https://choosealicense.com/licenses/mit/) (또는 프로젝트의 라이선스를 명시하세요)
