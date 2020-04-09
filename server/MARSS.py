#import feedparser
import sys
import time, datetime
import json
import urllib3
import requests
time.localtime(time.time())

serviceKey = "2e94d446841490938ff729b4eb940b76"
lat = "37.5471"
lon = "126.9352"
urls = "http://api.openweathermap.org/data/2.5/weather?lat=37.5471&lon=126.9352&appid=7482c8ad606636908336a13e80510e5f"
my_url = "http://ec2-54-81-185-130.compute-1.amazonaws.com:8000/sensor"

def crawling_rss(url) :
    r = requests.get(url)

    j = r.json()
    temp = (j['main']['temp'] - 273)
    time = j['dt']
    my_obj = {'time' : time, 'temp' : temp}
    d = requests.post(my_url, data = my_obj)
    
def main() :
    crawling_rss(urls)
    
if __name__ == "__main__":
    main()
