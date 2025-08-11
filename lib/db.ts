// import { PrismaClient } from '../src/app/generated/prisma';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaClient 인스턴스를 전역적으로 관리하고 내보내는 파일입니다.
 * 개발 환경에서는 핫 리로딩 시 새로운 PrismaClient 인스턴스가 계속 생성되는 것을 방지하기 위해
 * 전역 객체에 저장하여 재사용합니다.
 *
 * @remarks
 * 프로덕션 환경에서는 매번 새로운 인스턴스를 생성합니다.
 */
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;