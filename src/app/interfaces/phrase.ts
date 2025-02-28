export interface Phrase {
  id?:string;
  title:string;
  description:string;
  example?:string;
  seen:boolean;
  needToReview:boolean;
  hide:boolean;
  isOpen?:boolean;
  createdAt:Date;
  updatedAt:Date;
}
