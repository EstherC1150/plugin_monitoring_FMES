import requests
import os
import zipfile
from config import ACCOUNT_ID, PLUGIN_ID, SSID

ENV = "UAT"
ZIP_LOCATION = "./tmp"
ZIP_NAME = "plugin.zip"
PLUGIN_LOCATION = "./plugin"

# Zips contents of plugin location into the zip location.
def createZip():
    # Ensure the ZIP_LOCATION directory exists.
    if not os.path.exists(ZIP_LOCATION):
        os.makedirs(ZIP_LOCATION)

    zipPath = os.path.join(ZIP_LOCATION, ZIP_NAME)

    # Delete the existing zip file if it exists.
    if os.path.exists(zipPath):
        os.remove(zipPath)

    # Create a zip file.
    with zipfile.ZipFile(zipPath, "w") as zipf:
        for root, dirs, files in os.walk(PLUGIN_LOCATION):
            for file in files:
                filePath = os.path.join(root, file)
                relativePath = os.path.relpath(filePath, PLUGIN_LOCATION)
                zipf.write(filePath, arcname=relativePath)

    print(f"Plugin zipped successfully at: {zipPath}")

# Uploads the zip file to the server.
def deploy():
    guardianUrl = "https://guardian.nextspace.host/"
    if (ENV == "UAT"):
        guardianUrl = "https://guardian.nextspace-uat.net/"
    elif (ENV == "STG"):
        guardianUrl = "https://guardian.nextspace-stg.net/"
    elif (ENV == "DEV"):
        guardianUrl = "https://guardian.nextspace-dev.net/"

    # Request account info from guardian.
    account = requests.get(guardianUrl + "account/" + ACCOUNT_ID)
    accountInfo = account.json()
    apiUrl = accountInfo["URL"]["Base"]

    # Upload the plugin to the server.
    uploadUrl = apiUrl + "ui.plugin/" + PLUGIN_ID + "/file"
    headers = {
        "x-sessionid": SSID
    }
    files = {
        "file": open(ZIP_LOCATION + "/" + ZIP_NAME, "rb")
    }
    response = requests.post(uploadUrl, headers=headers, files=files)
    print(response.text)

def main():
    createZip()
    deploy()

if __name__ == "__main__":
    main()