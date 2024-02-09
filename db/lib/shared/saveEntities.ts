import { writeFile } from "fs/promises";
import path from "path";
import { EntityName } from "../../types/entity";

export const saveEntities = async <T>(
  entities: T[],
  entityName: EntityName,
) => {
  const pathToFile = path.resolve(
    process.cwd(),
    "src",
    "db",
    "data",
    `${entityName}.json`,
  );

  await writeFile(pathToFile, JSON.stringify(entities, null, 2), "utf-8");
};
