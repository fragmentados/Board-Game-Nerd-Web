import requests
import json


def save_request_on_file(request_name, file_name):
    response = requests.get("http://localhost:8080/" + request_name)
    response.raise_for_status()
    file = open(file_name + ".json", "w", encoding='utf8')
    file.write(response.text)
    file.close()


gameIds = json.loads(requests.get("http://localhost:8080/games/ids").text)
save_request_on_file("games", "games")
save_request_on_file("masters", "masters")
save_request_on_file("constants", "constants")
save_request_on_file("purchases", "purchases")
for gameId in gameIds:
    save_request_on_file("games/" + str(gameId), "game" + str(gameId))

