import requests
from random import *
import time
for i in range(20):
    value = randint(0, 30)
    requests.get("https://api.thingspeak.com/update?api_key=R62VDH4YIFYYP382&field1=" + str(value))
    time.sleep(20)

