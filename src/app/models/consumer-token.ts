export interface ConsumerToken {
  id:string,
  organismId:number,
  consumerId:string,
  duration:number,
  deleted:boolean,
  value:string,
  lastActivity:string,
  expirationDate:string,
}
