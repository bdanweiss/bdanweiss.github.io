import os
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

'''
def imageFinder():
  image_list = []
  directory = "./intro_images"
  for root, dirs, files in os.walk(directory):
      for file_ in files:
          image_list.append(os.path.join(root, file_))

  return image_list

if __name__ == "__main__":
	test = imageFinder()
	test.pop(0)
	print test
'''