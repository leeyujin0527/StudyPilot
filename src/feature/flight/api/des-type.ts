export interface DesType {
  studyMinutes : number;
  origin : string;
}

export interface recommendations{
    country : string;
    city : string;
    estimatedMinutes : number;
    difference : number;

}

export interface DesResponse {
  studyMinutes : number;
  origin : string;
  recommendations : recommendations[];
}