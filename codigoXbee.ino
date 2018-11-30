#include <ArduinoJson.h>
#include <XBee.h>
#include <Wire.h>
#include <Servo.h>
#include <SoftwareSerial.h>; // Arduino RX, TX (XBee Dout, Din)
#include <stdio.h>

SoftwareSerial xb = SoftwareSerial(0, 1);
XBee xbee = XBee();


Servo myservo;

Servo myservo1;

Servo myservo2;

int pos = 0;
int pos1 = 0;

//Leds branco
int PINA = 4;
int PINBR = 12;

//Leds Vermelho
int PINVA = 7;
int PINVB = 13;


uint8_t payload[] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

//Armazena os valores recebidos da serial
char valores;
//Armazena o estado do led
String estado;

// SH + SL Address of receiving XBee
XBeeAddress64 addr64 = XBeeAddress64(0x0013a200, 0x40D6A852);
ZBTxRequest zbTx = ZBTxRequest(addr64, payload, sizeof(payload));
ZBTxStatusResponse txStatus = ZBTxStatusResponse();

//Endereco I2C do MPU6050
const int MPU = 0x68;
//Variaveis para armazenar valores dos sensores
int AcX, AcY;

int posicao = 25;

StaticJsonBuffer<512> jsonBuffer;
JsonObject& object = jsonBuffer.createObject();
JsonObject& data = object.createNestedObject("data");

JsonObject& accel = data.createNestedObject("accel");

JsonObject& accelX = accel.createNestedObject("accelX");
JsonObject& accelY = accel.createNestedObject("accelY");


void setup()
{
  myservo.attach(9);
  myservo1.attach(10);
  myservo2.attach(5);
  Wire.begin();
  Wire.beginTransmission(MPU);
  Wire.write(0x6B);

  //Inicializa o MPU-6050
  Wire.write(0);
  Wire.endTransmission(true);
  pinMode(4, OUTPUT);
  pinMode(PINBR, OUTPUT);
  pinMode(PINVA, OUTPUT);
  pinMode(PINVB, OUTPUT);
  pinMode(11, OUTPUT);
  Serial.begin(9600);
  xb.begin(9600);
  analogWrite(11, 255);

  myservo1.write(90);
  myservo2.write(90);
}

void lerAcelerometro()
{
  Wire.beginTransmission(MPU);
  Wire.write(0x3B);  // starting with register 0x3B (ACCEL_XOUT_H)
  Wire.endTransmission(false);
  //Solicita os dados do sensor
  Wire.requestFrom(MPU, 14, true);
  //Armazena o valor dos sensores nas variaveis correspondentes
  AcX = Wire.read() << 8 | Wire.read(); //0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)
  AcY = Wire.read() << 8 | Wire.read(); //0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)

  //Envia valor X do acelerometro para a serial
  //Serial.print("AcX = "); Serial.print(AcX);

  //Envia valor Y do acelerometro para a serial
  //Serial.print(" | AcY = "); Serial.print(AcY);

  //Aguarda 300 ms e reinicia o processo
  delay(300);

}
void populateJSON()
{
  accel["accelX"] = AcX;
  accel["accelY"] = AcY;
}

void loop()
{
  //  xbee.setSerial(Serial);
  //  char  dmy[8];
  lerAcelerometro();
  populateJSON();

  //object.prettyPrintTo(Serial);
  object.printTo(Serial);
  Serial.print("\n");

  if (Serial.available() > 0)
  {
    valores = Serial.read();
    xbee.setSerial(Serial);

    switch (valores)
    {
      case '0': //vermelhoOff
        digitalWrite(PINA, LOW);
        digitalWrite(PINBR, LOW);
        break;

      case '1': //vermelhoOn
        digitalWrite(PINA, HIGH);
        digitalWrite(PINBR, HIGH);
        break;

      case '2': //brancoOff
        digitalWrite(PINVB, LOW);
        digitalWrite(PINVA, LOW);
        break;

      case '3': //brancoOn
        digitalWrite(PINVA, HIGH);
        digitalWrite(PINVB, HIGH);
        break;

      case '4': //buzzer
        tone(8, 1500);
        delay(500);
        noTone(8);
        break;

      case '5': //pousoDesce
        for (pos = 90; pos <= 180; pos += 1)
        {
          // in steps of 1 degree
          myservo.write(pos);
          delay(15);
        }
        break;

      case '6': //pousoSobe
        for (pos = 180; pos >= 90; pos -= 1)
        {
          // in steps of 1 degree
          myservo.write(pos);
          delay(15);
        }
        break;

      case '7': //heliceon
        analogWrite(11, 128);
        break;

      case '8': //heliceoff
        analogWrite(11, 255);
        break;

      case '9': //para frente

        for (pos = 110; pos >= 70; pos -= 1)
        { // goes from 180 degrees to 0 degrees
          myservo1.write(pos);              // tell servo to go to position in variable 'pos'
          delay(5);                       // waits 15ms for the servo to reach the position
        }
        // posicao = posicao + 5;
        // myservo1.write(posicao);
        break;

      case 'x': //para tras

        for (pos = 70; pos <= 110; pos += 1)
        { // goes from 0 degrees to 180 degrees
          // in steps of 1 degree
          myservo1.write(pos);              // tell servo to go to position in variable 'pos'
          delay(5);                       // waits 15ms for the servo to reach the position
        }
        // posicao = posicao - 5;
        // myservo1.write(posicao);
        break;

      case 'y': // lateral esquerda

        for (pos = 70; pos <= 110; pos += 1)
          // goes from 0 degrees to 180 degrees
          // in steps of 1 degree
          myservo2.write(pos);              // tell servo to go to position in variable 'pos'
        delay(5);                       // waits 15ms for the servo to reach the position
        //posicao = posicao + 5;
        break;
      //myservo2.write(posicao);

      case 'z': // lateral direita

        for (pos = 110; pos >= 70; pos -= 1)
          // goes from 180 degrees to 0 degrees
          myservo2.write(pos);              // tell servo to go to position in variable 'pos'
        delay(5);                       // waits 15ms for the servo to reach the position
        //posicao = posicao - 5;
        //myservo2.write(posicao);
        break;

    }
  }
}

