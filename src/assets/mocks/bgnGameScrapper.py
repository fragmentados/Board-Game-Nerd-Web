import requests


def save_request_on_file(request_name, file_name):
    response = requests.get("http://localhost:8080/" + request_name)
    response.raise_for_status()
    file = open(file_name + ".json", "w", encoding='utf8')
    file.write(response.text)
    file.close()


gameIds = [1, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
           34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 60, 62, 63,
           64, 65, 66, 67, 68, 70, 71, 72, 73, 75, 76, 102, 103, 104, 105, 110, 111, 112, 113, 114, 115, 116]
save_request_on_file("games", "games")
save_request_on_file("masters", "masters")
save_request_on_file("constants", "constants")
save_request_on_file("purchases", "purchases")
for gameId in gameIds:
    save_request_on_file("games/" + str(gameId), "game" + str(gameId))

