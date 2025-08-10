// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id             String          @id @default(cuid())
  email          String          @unique
  name           String
  picture        String
  role           UserRole        @default(USER)
  programs       Program[]
  records        Record[]
  sharedPrograms SharedProgram[]
  sessions       Session[] // ✅ 1:N 관계로 변경
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  Post           Post[]
  Comment        Comment[]
}

enum UserRole {
  USER
  PREMIUM
  ADMIN
}

model Session {
  id              String   @id @default(cuid())
  userId          String
  browserDeviceId String // 브라우저별 식별 ID
  expiresAt       DateTime
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId]) // 인덱스를 두면 유저별 세션 조회가 빨라집니다
  @@index([userId, browserDeviceId]) // 유저별 브라우저 조회용
  @@index([browserDeviceId]) // 브라우저별 세션 조회용
}

model Program {
  id                String             @id @default(cuid())
  title             String
  difficulty        ProgramDifficulty?
  totalDays         Int
  executeCount      Int                @default(0)
  latestExecuteDate DateTime?
  description       String?
  divide            String? // 분할 방식 (예: 상하체분할, PPL 등)
  routines          Json // { day: string, exercises: Exercise[] }[]
  isShared          Boolean            @default(false)
  isPublic          Boolean            @default(false)
  authorId          String
  author            User               @relation(fields: [authorId], references: [id])
  shared            SharedProgram?
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
  Record            Record[]
}

enum ProgramDifficulty {
  숙련자
  중급자
  초보자
}

model SharedProgram {
  id        String   @id @default(cuid())
  programId String   @unique
  program   Program  @relation(fields: [programId], references: [id])
  sharedBy  String
  user      User     @relation(fields: [sharedBy], references: [id])
  likes     Int      @default(0)
  tags      String[] // ex) ['하체', '초보', '30분']
  createdAt DateTime @default(now())
}

model Record {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  programId String
  program   Program  @relation(fields: [programId], references: [id])
  records   Json
  memo      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String    @id @default(cuid())
  title     String
  content   String
  category  String
  likes     Int       @default(0)
  views     Int       @default(0)
  isPopular Boolean   @default(false)
  authorId  String
  author    User      @relation(fields: [authorId], references: [id])
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  comments  Comment[]
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
