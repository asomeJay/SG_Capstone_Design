int led[3] = {15, 4, 17};
int gnd[3] = {2, 16, 5};
const int trigPin = 26;    //Trig 핀 Assign
const int echoPin = 27;    //Echo 핀 Assign
 
void setup() {
    Serial.begin(115200);
  // put your setup code here, to run once:
    pinMode(trigPin, OUTPUT);    //Trig = output
    pinMode(echoPin, INPUT);    //Echo = input

  for (int i=0; i<3; i++) {
    pinMode(led[i], OUTPUT);
    digitalWrite(led[i], 1);
    
    pinMode(gnd[i], OUTPUT);
    digitalWrite(gnd[i], 0);
  }
}

void loop() {
  static int j=30;
  // put your main code here, to run repeatedly:

    long duration, distance;    //기본 변수 선언
 
    //Trig 핀으로 10us의 pulse 발생
    digitalWrite(trigPin, LOW);        //Trig 핀 Low
    delayMicroseconds(2);            //2us 유지
    digitalWrite(trigPin, HIGH);    //Trig 핀 High
    delayMicroseconds(10);            //10us 유지
    digitalWrite(trigPin, LOW);        //Trig 핀 Low
 
    duration = pulseIn(echoPin, HIGH);        
 
    distance = duration / 29 / 2;       
 
    Serial.print(distance);
    Serial.print("cm");
    Serial.println();

    int limit;
    if(distance < 10){
      for(int k = 0; k < 3; k++){
        digitalWrite(led[k], 1);
      }
    }
    else{
      if(distance < 20) {
      limit = 3;  
    }
    else if(distance < 50) {
      limit = 2;
    }
    else {
      limit = 1;
    }
    for (int k=0; k<limit; k++) {
      digitalWrite(led[k], 1);
      delay(100);
      digitalWrite(led[k], 0);
      delay(100);
    }  
    }
    
}
