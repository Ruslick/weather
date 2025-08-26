var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promises } from "fs";
import path from "path";
const dataFilePath = path.resolve("data", "storage.json");
export const saveInStorage = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield isExist(path.resolve("data")))) {
        yield promises.mkdir(path.resolve("data"));
    }
    if (!(yield isExist(dataFilePath))) {
        const data = {};
        data[key] = value;
        yield promises.writeFile(dataFilePath, JSON.stringify(data));
        return;
    }
    const data = yield promises.readFile(dataFilePath, "utf-8");
    const dataParsed = JSON.parse(data);
    dataParsed[key] = value;
    const preparedData = JSON.stringify(dataParsed);
    yield promises.writeFile(dataFilePath, preparedData);
});
export const getFromStorage = (key) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield isExist(dataFilePath))) {
        return undefined;
    }
    const dataString = yield promises.readFile(dataFilePath, "utf-8");
    const data = JSON.parse(dataString);
    return data[key];
});
const isExist = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promises.stat(path);
        return true;
    }
    catch (_a) {
        return false;
    }
});
