import { EntityFromName, EntityName } from "../../types/entity";

export const getAllEntities = async <T extends EntityName>(entityName: T) => {
  try {
    const entityFile = await import(`../../data/${entityName}.json`, {
      with: { type: "json" },
    });

    return entityFile.default as EntityFromName<T>[];
  } catch (error) {
    return [] as EntityFromName<T>[];
  }
};
