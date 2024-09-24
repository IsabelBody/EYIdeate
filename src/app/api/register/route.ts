import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const userData = await req.json(); // Get the JSON data from the request

  // Define the path to the JSON file
  const filePath = path.join(process.cwd(), '_data', 'users.json');

  // Read the current data from the JSON file
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const usersData = JSON.parse(jsonData);

  // Add the new user to the existing data
  usersData.users.push(userData);

  // Write the updated data back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2));

  return NextResponse.json({ message: 'User registered successfully' });
}
