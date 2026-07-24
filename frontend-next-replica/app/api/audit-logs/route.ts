import { NextResponse } from 'next/server';
import { mockAuditLogs } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockAuditLogs);
}
