export const api = <T>(data: T, delay: number = 800): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error("Network error occurred"));
      } else {
        resolve(data);
      }
    }, delay);
  });
};
