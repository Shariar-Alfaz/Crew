export interface IExam {
  id: number;
  title: string;
  startTime: any;
  endTime: any;
  description: string;
  totalMarks: number;
  classId: number;
}
export interface IQuestion {
  id: number;
  title: string;
  answer: string;
  examId: number;
}

export interface IOption {
  id: number;
  name: string;
  questionId: number;
}

export interface IFinalQuestion {
  question: IQuestion;
  option: IOption[];
}
export interface IShowQuestion {
  id: number;
  title: string;
  answer: string;
  examId: number;
  options: IOption[];
}
export interface IAnswerScript {
  id: number;
  questionId: number;
  answer: string;
}
