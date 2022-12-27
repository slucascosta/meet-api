import { fileURLToPath } from "url";
import path from "path";

export function fullPath(url, endPath) {
  return path.join(path.dirname(fileURLToPath(url)), endPath)
}