
// This #include statement was automatically added by the Particle IDE.
#include "spark-dallas-temperature/spark-dallas-temperature.h"

// This #include statement was automatically added by the Particle IDE.
#include "OneWire/OneWire.h"

// This #include statement was automatically added by the Particle IDE.
#include "HttpClient/HttpClient.h"

#define ONE_WIRE_BUS D2
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensor(&oneWire);

float temperature;


void setup()
{
  // register the cloud function
  Particle.function("temp", getTemperature);
  Serial.begin(9600);
  sensor.begin();
}

void loop()
{
  // this loops forever
}

// this function automagically gets called upon a matching POST request
float getTemperature(String command)
{
  sensor.requestTemperatures();
  temperature=sensor.getTempCByIndex( 0 );
  return temperature;

}
