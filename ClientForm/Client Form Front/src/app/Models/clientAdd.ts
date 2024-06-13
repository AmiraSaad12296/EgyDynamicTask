export class ClientAdd {

  constructor
  (
    public name: string,
    public description: string ,
    public  job: string,
    public enteredBy: string,
    public entryDate: Date,
    public lastModificationBy: string,
    public lastModificationIn: Date,
    public salesMan: string,
    public clientSource: string,
    public clientClass:string
  )
  {}
}
