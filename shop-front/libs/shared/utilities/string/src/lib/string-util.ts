export class StringUtil {
  static convertKeysFromCamelCaseToSnakeCase(obj: any): any {
    if (obj instanceof Array) {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = StringUtil.convertKeysFromCamelCaseToSnakeCase(obj[i]);
      }
    } else if (obj instanceof Object) {
      for (const prop in obj) {
        const value = obj[prop];
        const snakeProp = prop.replace(/([A-Z])/g, '_$1').toLowerCase();
        delete obj[prop];
        obj[snakeProp] = StringUtil.convertKeysFromCamelCaseToSnakeCase(value);
      }
    }
    return obj;
  }

  static convertKeysFromSnakeCaseToCamelCase(obj: any): any {
    if (obj instanceof Array) {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = StringUtil.convertKeysFromSnakeCaseToCamelCase(obj[i]);
      }
    } else if (obj instanceof Object) {
      for (const prop in obj) {
        const value = obj[prop];
        const camelProp = prop.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        delete obj[prop];
        obj[camelProp] = StringUtil.convertKeysFromSnakeCaseToCamelCase(value);
      }
    }
    return obj;
  }
}
