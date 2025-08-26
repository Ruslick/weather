import { promises } from "fs";
import path from "path";

const dataFilePath = path.resolve("data", "storage.json");

export const saveInStorage = async (key: string, value: unknown) => {
	if (!(await isExist(path.resolve("data")))) {
		await promises.mkdir(path.resolve("data"));
	}

	if (!(await isExist(dataFilePath))) {
		const data: Record<string, unknown> = {};
		data[key] = value;
		await promises.writeFile(dataFilePath, JSON.stringify(data));
		return;
	}

	const data = await promises.readFile(dataFilePath, "utf-8");
	const dataParsed = JSON.parse(data);

	dataParsed[key] = value;

	const preparedData = JSON.stringify(dataParsed);
	await promises.writeFile(dataFilePath, preparedData);
};

export const getFromStorage = async <T extends unknown>(
	key: string
): Promise<T | undefined> => {
	if (!(await isExist(dataFilePath))) {
		return undefined;
	}
	const dataString = await promises.readFile(dataFilePath, "utf-8");
	const data = JSON.parse(dataString);
	return data[key];
};

const isExist = async (path: string) => {
	try {
		await promises.stat(path);
		return true;
	} catch {
		return false;
	}
};
