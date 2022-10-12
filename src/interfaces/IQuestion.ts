export interface IQuestion {
  id: string,
  description: string,
  options: {
    id: string,
    description: string,
    isCorrect?: boolean,
  }[]
}
