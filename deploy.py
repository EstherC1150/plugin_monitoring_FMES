import requests
import os
import zipfile
import shutil
import subprocess
from config import ACCOUNT_ID, PLUGIN_ID, SSID

ENV = "UAT"
ZIP_LOCATION = "./tmp"
ZIP_NAME = "plugin.zip"
PLUGIN_LOCATION = "./plugin"
STAGE_LOCATION = "./tmp/plugin_stage"

# Zips contents of plugin location into the zip location.
def createZip():
    # Ensure the ZIP_LOCATION directory exists.
    if not os.path.exists(ZIP_LOCATION):
        os.makedirs(ZIP_LOCATION)

    # Build deploy-time single-file index.js (no serve.py required)
    # Windows: bare "npm" fails under subprocess (WinError 2); use resolved path.
    npm = shutil.which("npm")
    if not npm:
        raise RuntimeError("npm을 찾을 수 없습니다. Node.js 설치 후 PATH를 확인하세요.")
    subprocess.check_call([npm, "run", "build:deploy-index"])

    # Stage plugin folder so we can swap index.js without touching dev files
    if os.path.exists(STAGE_LOCATION):
        shutil.rmtree(STAGE_LOCATION)
    shutil.copytree(PLUGIN_LOCATION, STAGE_LOCATION)

    # Replace staged index.js with generated deploy index
    generated_index = os.path.join(ZIP_LOCATION, "index.deploy.js")
    staged_index = os.path.join(STAGE_LOCATION, "index.js")
    shutil.copyfile(generated_index, staged_index)

    # (Optional) Don't ship helper entry
    deploy_entry = os.path.join(STAGE_LOCATION, "deployEntry.js")
    if os.path.exists(deploy_entry):
        os.remove(deploy_entry)

    zipPath = os.path.join(ZIP_LOCATION, ZIP_NAME)

    # Delete the existing zip file if it exists.
    if os.path.exists(zipPath):
        os.remove(zipPath)

    # Create a zip file.
    with zipfile.ZipFile(zipPath, "w") as zipf:
        for root, dirs, files in os.walk(STAGE_LOCATION):
            for file in files:
                filePath = os.path.join(root, file)
                relativePath = os.path.relpath(filePath, STAGE_LOCATION)
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