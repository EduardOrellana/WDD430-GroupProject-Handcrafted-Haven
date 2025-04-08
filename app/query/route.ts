import { productSearchByName, getUsers } from '../lib/data';

const test ="hand";

export async function GET() {
  try {
  	// return Response.json(await productSearchByName(test));
    return Response.json(await getUsers());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}