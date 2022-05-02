
type ThreadSleepConstructor = (milliseconds: number) => Promise<void>;

export const threadSleep: ThreadSleepConstructor = async (milliseconds: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};
