export interface ITestFormValues {
  name: string;
  description: string;
  id: string;
  testsIDs: Array<string>;
  questions: {
    id: string,
    description: string,
    isMultipleAnswer: boolean,
    options: {
      id: string,
      description: string,
      isCorrect: boolean,
    }[]
  }[],
}
