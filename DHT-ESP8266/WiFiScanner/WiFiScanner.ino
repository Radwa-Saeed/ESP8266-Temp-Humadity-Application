/*
    This sketch demonstrates how to scan WiFi networks.
    The API is almost the same as with the WiFi Shield library,
    the most obvious difference being the different file you need to include:
*/

#include <ESP8266WiFi.h>
#include <string.h>
char* serial_tochar(int choose_data);
char* username;
char* password;
char* data[]={"username","password"};

void setup() {
  Serial.begin(9600);         // Start the Serial communication to send messages to the computer
  delay(3000);
  Serial.println("scan start");

  // WiFi.scanNetworks will return the number of networks found
  int n = WiFi.scanNetworks();
  Serial.println("scan done");
  if (n == 0) {
      Serial.println("no networks found");
  } else {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      // Print SSID and RSSI for each network found
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.print(")");
      Serial.println((WiFi.encryptionType(i) == AUTH_OPEN)?" ":"*");
      delay(10);
    }
  Serial.print("Please Enter SSID:\n");
  username = strtok(serial_tochar(0)," ");
  Serial.print("Please Enter Password:\n");
  password = strtok(serial_tochar(1), " ");
  // WIFI CONNECTION !!
  WiFi.begin(username, password);             // Connect to the network
  Serial.print("Connecting to \n");
  Serial.print(username); Serial.println(" ...");
   int i=0;
   while(WiFi.status() != WL_CONNECTED){
    delay(1000);
    Serial.print(++i);
    Serial.print("");}

    Serial.print("\n");
    Serial.print("Connection established");
}
WiFi.disconnect();
}
void loop() {}
char* serial_tochar(int choose_data) {
    while(Serial.available()==0) { }
    String str =Serial.readString();
    str.toCharArray(data[choose_data], str.length());
    return data[choose_data];
}
