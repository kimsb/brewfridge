
// This #include statement was automatically added by the Particle IDE.
#include "spark-dallas-temperature/spark-dallas-temperature.h"

// This #include statement was automatically added by the Particle IDE.
#include "OneWire/OneWire.h"

// This #include statement was automatically added by the Particle IDE.
#include "HttpClient/HttpClient.h"

#define ONE_WIRE_BUS D2
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensor(&oneWire);

double temperature = 0;
int numberOfDevices;
DeviceAddress tempDeviceAddress;

void setup()
{
  // register the cloud function
 // Particle.function("temp", getTemperature);

    Particle.variable("temp", &temperature, DOUBLE);

    Serial.begin(9600);
    sensor.begin();
    sensor.getAddress(tempDeviceAddress, 0);
    sensor.setResolution(tempDeviceAddress, 12);

}

void loop()
{
  // this loops forever
    sensor.requestTemperatures();
    temperature=sensor.getTempCByIndex( 0 );
    delay(200);
}

// this function automagically gets called upon a matching POST request
float getTemperature(String command)
{
  sensor.requestTemperatures();
  delay(100);
  temperature=sensor.getTempCByIndex( 0 );
   Serial.println(temperature);
  return temperature;

}
float getAddr(String command) {

  // Grab a count of devices on the wire

  numberOfDevices = sensor.getDeviceCount();



  // locate devices on the bus

  Serial.print("Locating devices...");



  Serial.print("Found ");

  Serial.print(numberOfDevices, DEC);

  Serial.println(" devices.");
  sensor.getAddress(tempDeviceAddress, 0);
  Serial.print("Found device ");

    Serial.print(1, DEC);

    Serial.print(" with address: ");

   Serial.print(*tempDeviceAddress, HEX);

    Serial.println();
          return 42;
}
