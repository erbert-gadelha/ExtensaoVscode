function generateDict(dict: Record<string, string>): any {
  const result: any = {};

  for (const [key, value] of Object.entries(dict)) {
    const keyParts = key.split('.');
    const valueParts = value.split('.');
    let current = result;

    for (let i = 0; i < keyParts.length; i++) {
      const part = keyParts[i];
      if (i === keyParts.length - 1) {
        current[part] = valueParts[valueParts.length - 1];
      } else {
        if (!(part in current))
          current[part] = {};        
        current = current[part];
      }
    }
  }
  return result;
}


export default generateDict;