import requests, json
from random import *
import time
data = {'name1': 'jaewon', 'param2': 'value'}
url = "http://ec2-54-81-185-130.compute-1.amazonaws.com:8000"
res = requests.post(url, data = data).text
print(res)
#for i in range(20):
 #   value = randint(0, 30)
  #  requests.post("http://ec2-54-81-185-130.compute-1.amazonaws.com:8000/")
   # time.sleep(20)

