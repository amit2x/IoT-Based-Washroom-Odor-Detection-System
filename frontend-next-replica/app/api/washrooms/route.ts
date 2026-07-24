import { NextResponse } from 'next/server';
import { mockWashrooms } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockWashrooms);
}
