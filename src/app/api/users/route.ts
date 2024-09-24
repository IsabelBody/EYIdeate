// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Define the path to the JSON file
  const filePath = path.join(process.cwd(), '_data', 'users.json');

  // Read the user data from the JSON file
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const usersData = JSON.parse(jsonData);

  return NextResponse.json(usersData); // Return the users data
}
